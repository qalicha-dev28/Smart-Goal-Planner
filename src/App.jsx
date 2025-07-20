import { useState, useEffect } from 'react';
import axios from 'axios';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const addGoal = async (newGoal) => {
    try {
      const response = await axios.post('http://localhost:3001/goals', {
        ...newGoal,
        savedAmount: 0
      });
      setGoals([...goals, response.data]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const updateGoal = async (id, updatedGoal) => {
    try {
      await axios.put(`http://localhost:3001/goals/${id}`, updatedGoal);
      setGoals(goals.map(goal => goal.id === id ? updatedGoal : goal));
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/goals/${id}`);
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const makeDeposit = async (id, amount) => {
    try {
      const response = await axios.patch(`http://localhost:3001/goals/${id}`, {
        savedAmount: goals.find(g => g.id === id).savedAmount + Number(amount)
      });
      setGoals(goals.map(goal => goal.id === id ? response.data : goal));
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      
      <div className="dashboard">
        <div className="forms-section">
          <GoalForm onAddGoal={addGoal} />
          <DepositForm goals={goals} onDeposit={makeDeposit} />
        </div>
        
        <Overview goals={goals} />
        
        <GoalList 
          goals={goals} 
          onUpdateGoal={updateGoal} 
          onDeleteGoal={deleteGoal} 
          onDeposit={makeDeposit}
        />
      </div>
    </div>
  );
}

export default App;