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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
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
      
      let success = false;
      
      // Try API first with single attempt
      try {
        const response = await axios.post(`${API_BASE_URL}/goals`, goalToAdd, {
          timeout: 8000,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // Notify parent component with API response
        onAddGoal(response.data);
        success = true;
        console.log('Goal added successfully via API');
        
      } catch (apiError) {
        console.error('API failed:', apiError.message);
        
        // Fallback to localStorage
        try {
          const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
          const newGoals = [...existingGoals, goalToAdd];
          localStorage.setItem('goals', JSON.stringify(newGoals));
          
          // Notify parent component with local data
          onAddGoal(goalToAdd);
          success = true;
          
          setError('Goal saved locally. Server is temporarily unavailable.');
          setTimeout(() => setError(''), 4000);
          console.log('Goal added successfully via localStorage');
          
        } catch (localError) {
          console.error('localStorage failed:', localError);
          throw new Error('Failed to save goal. Please try again.');
        }
      }
      
      // Reset form only if successful
      if (success) {
        setNewGoal({
          name: '',
          targetAmount: '',
          category: '',
          deadline: '',
          initialDeposit: ''
        });
      }

    } catch (error) {
      console.error('Error adding goal:', error);
      
      let errorMessage = 'Failed to add goal: ';
      
      if (error.message.includes('required') || error.message.includes('greater than')) {
        errorMessage = error.message;
      } else if (error.message.includes('Failed to save goal')) {
        errorMessage = error.message;
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
