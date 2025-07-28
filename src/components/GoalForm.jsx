import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function GoalForm({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
    initialDeposit: ''  
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fallback to localStorage if backend fails
  const addGoalLocally = (goalData) => {
    try {
      const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
      const newGoals = [...existingGoals, goalData];
      localStorage.setItem('goals', JSON.stringify(newGoals));
      return goalData;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      throw error;
    }
  };

  const submitGoal = async (goalData, retryCount = 0) => {
    try {
      // First try to check if server is responsive
      await axios.get(`${API_BASE_URL}/goals`, { timeout: 5000 });
      
      // If server responds, try to post
      const response = await axios.post(`${API_BASE_URL}/goals`, goalData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return { data: response.data, source: 'api' };
    } catch (error) {
      console.error(`API attempt ${retryCount + 1} failed:`, error.message);
      
      // If it's a 500 error or connection issue, try localStorage fallback
      if (error.response?.status === 500 || error.code === 'ECONNABORTED' || !error.response) {
        if (retryCount < 1) {
          console.log(`Retrying API call... attempt ${retryCount + 2}`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          return submitGoal(goalData, retryCount + 1);
        } else {
          console.log('API failed, using localStorage fallback');
          const savedGoal = addGoalLocally(goalData);
          return { data: savedGoal, source: 'localStorage' };
        }
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate inputs first
      if (!newGoal.name.trim()) {
        throw new Error('Goal name is required');
      }
      if (!newGoal.targetAmount || Number(newGoal.targetAmount) <= 0) {
        throw new Error('Target amount must be greater than 0');
      }
      if (!newGoal.category) {
        throw new Error('Category is required');
      }
      if (!newGoal.deadline) {
        throw new Error('Deadline is required');
      }

      // Format the data
      const goalToAdd = {
        id: Date.now().toString(),
        name: newGoal.name.trim(),
        category: newGoal.category,
        deadline: newGoal.deadline,
        targetAmount: Number(newGoal.targetAmount),
        savedAmount: Number(newGoal.initialDeposit) || 0, 
        createdAt: new Date().toISOString().split('T')[0] 
      };

      console.log('Submitting goal:', goalToAdd);
      
      // Try to submit with fallback
      const result = await submitGoal(goalToAdd);
      
      // Notify parent component
      onAddGoal(result.data);
      
      // Show success message based on source
      if (result.source === 'localStorage') {
        setError('Goal saved locally. Will sync when server is available.');
        setTimeout(() => setError(''), 3000);
      }
      
      // Reset form
      setNewGoal({
        name: '',
        targetAmount: '',
        category: '',
        deadline: '',
        initialDeposit: ''
      });

      console.log(`Goal added successfully via ${result.source}`);

    } catch (error) {
      console.error('Error adding goal:', error);
      
      let errorMessage = 'Failed to add goal: ';
      
      if (error.message.includes('required') || error.message.includes('greater than')) {
        errorMessage = error.message;
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error. Please try again later.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage += 'Connection timeout. Please check your internet.';
      } else if (error.response?.status === 404) {
        errorMessage += 'API not found. Please contact support.';
      } else {
        errorMessage += 'Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      
      {error && (
        <div style={{ 
          color: error.includes('saved locally') ? '#ff9800' : 'red', 
          marginBottom: '1rem', 
          padding: '0.5rem', 
          border: `1px solid ${error.includes('saved locally') ? '#ff9800' : 'red'}`, 
          borderRadius: '4px',
          backgroundColor: error.includes('saved locally') ? '#fff3e0' : '#ffebee'
        }}>
          {error}
        </div>
      )}
      
      <div className="form-group">
        <label>Goal Name:</label>
        <input
          type="text"
          value={newGoal.name}
          onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
          placeholder="Enter goal name"
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div className="form-group">
        <label>Target Amount ($):</label>
        <input
          type="number"
          value={newGoal.targetAmount}
          onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
          placeholder="Enter target amount"
          required
          min="1"
          step="0.01"
          disabled={isSubmitting}
        />
      </div>
     
      <div className="form-group">
        <label>Category:</label>
        <select
          value={newGoal.category}
          onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
          required
          disabled={isSubmitting}
        >
          <option value="">Select a category</option>
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
          <option value="Electronics">Electronics</option>
          <option value="Education">Education</option>
          <option value="Retirement">Retirement</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Deadline:</label>
        <input
          type="date"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
          required
          min={new Date().toISOString().split('T')[0]}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label>Initial Deposit ($):</label>
        <input
          type="number"
          value={newGoal.initialDeposit}
          onChange={(e) => setNewGoal({...newGoal, initialDeposit: e.target.value})}
          placeholder="Optional initial deposit"
          min="0"
          step="0.01"
          disabled={isSubmitting}
        />
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding Goal...' : 'Add Goal'}
      </button>
    </form>
  );
}
