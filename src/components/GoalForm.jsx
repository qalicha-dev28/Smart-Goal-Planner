import { useState } from 'react';
import axios from 'axios';

export default function GoalForm({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
    initialDeposit: ''  
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format the data for json-server
      const goalToAdd = {
        name: newGoal.name,
        category: newGoal.category,
        deadline: newGoal.deadline,
        targetAmount: Number(newGoal.targetAmount),
        savedAmount: Number(newGoal.initialDeposit) || 0, 
        createdAt: new Date().toISOString().split('T')[0] 
      };

      // API call to add the goal
      const response = await axios.post('http://localhost:3001/goals', goalToAdd);
      
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

    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      
      <div className="form-group">
        <label>Goal Name:</label>
        <input
          type="text"
          value={newGoal.name}
          onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
          placeholder="Add a goal"
          required
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
        />
      </div>
     
      <div className="form-group">
        <label>Category:</label>
        <select
          value={newGoal.category}
          onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
          required
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
          min={new Date().toISOString().split('T')[0]} // No past dates
        />
      </div>
      
      <button type="submit">Add Goal</button>
    </form>
  );
}