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

  const wakeUpServer = async () => {
    try {
      await axios.get(`${API_BASE_URL}/goals`, { timeout: 10000 });
      return true;
    } catch (error) {
      console.warn('Server wake-up failed:', error);
      return false;
    }
  };

  const submitGoal = async (goalData, retryCount = 0) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/goals`, goalData, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) {
      if (retryCount < 2 && (error.code === 'ECONNABORTED' || error.response?.status >= 500)) {
        console.log(`Retry attempt ${retryCount + 1}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return submitGoal(goalData, retryCount + 1);
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Format the data for json-server
      const goalToAdd = {
        id: Date.now().toString(),
        name: newGoal.name.trim(),
        category: newGoal.category,
        deadline: newGoal.deadline,
        targetAmount: Number(newGoal.targetAmount),
        savedAmount: Number(newGoal.initialDeposit) || 0, 
        createdAt: new Date().toISOString().split('T')[0] 
      };

      // Validate data
      if (!goalToAdd.name || !goalToAdd.category || !goalToAdd.deadline || goalToAdd.targetAmount <= 0) {
        throw new Error('Please fill in all required fields correctly');
      }

      // Try to wake up server first
      console.log('Waking up server...');
      await wakeUpServer();

      // API call to add the goal with retry logic
      console.log('Submitting goal:', goalToAdd);
      const response = await submitGoal(goalToAdd);
      
      // Notify parent component
      onAddGoal(response.data);
      
      // Reset form
      setNewGoal({
        name: '',
        targetAmount: '',
        category: '',
        deadline: '',
        initialDeposit: ''
      });

      setError('');
      console.log('Goal added successfully');

    } catch (error) {
      console.error('Error adding goal:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      });
      
      let errorMessage = 'Failed to add goal. ';
      
      if (error.response?.status === 500) {
        errorMessage += 'Server error. The backend may be starting up. Please wait a moment and try again.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. Please check your connection and try again.';
      } else if (error.response?.status === 404) {
        errorMessage += 'API endpoint not found. Please check the backend URL.';
      } else if (error.message.includes('fill in all required fields')) {
        errorMessage = error.message;
      } else {
        errorMessage += 'Please try again in a few moments.';
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
          color: 'red', 
          marginBottom: '1rem', 
          padding: '0.5rem', 
          border: '1px solid red', 
          borderRadius: '4px',
          backgroundColor: '#ffebee'
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
          placeholder="Add a goal"
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
          placeholder="Target amount"
          required
          min="1"
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
          disabled={isSubmitting}
        />
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding Goal...' : 'Add Goal'}
      </button>
    </form>
  );
}
