import { useState } from 'react';
import { calculateDaysLeft, getGoalStatus } from '../utils/goalUtils';

export default function GoalItem({ goal, onUpdate, onDelete }) {  // Removed onDeposit prop
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });
  const daysLeft = calculateDaysLeft(goal.deadline);
  const status = getGoalStatus(goal, daysLeft);
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);

  const handleSave = () => {
    const updatedGoal = {
      ...editedGoal,
      targetAmount: Number(editedGoal.targetAmount),
      savedAmount: Number(editedGoal.savedAmount)
    };
    onUpdate(goal.id, updatedGoal);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(goal.id);
  };

  return (
    <div className={`goal-card ${status}`}>
      {isEditing ? (
        <div className="edit-form form-section">
          <div className="form-group">
            <label>Goal Name</label>
            <input
              type="text"
              value={editedGoal.name}
              onChange={(e) => setEditedGoal({...editedGoal, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Target Amount ($)</label>
            <input
              type="number"
              value={editedGoal.targetAmount}
              onChange={(e) => setEditedGoal({...editedGoal, targetAmount: e.target.value})}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              value={editedGoal.category}
              onChange={(e) => setEditedGoal({...editedGoal, category: e.target.value})}
              required
            >
              <option value="Travel">Travel</option>
              <option value="Emergency">Emergency</option>
              <option value="Electronics">Electronics</option>
              <option value="Education">Education</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={editedGoal.deadline}
              onChange={(e) => setEditedGoal({...editedGoal, deadline: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div className="form-actions">
            <button className="success-btn" onClick={handleSave}>Save</button>
            <button className="secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="goal-header">
            <div>
              <h3>{goal.name}</h3>
              <span className="category">{goal.category}</span>
            </div>
            <span className={`status ${status}`}>
              {status === 'completed' ? '✓ Completed' : 
               status === 'warning' ? '⚠️ Soon' : 
               status === 'overdue' ? '⌛ Overdue' : '● Active'}
            </span>
          </div>
          
          <p className="deadline">
            Deadline: {new Date(goal.deadline).toLocaleDateString()} • {daysLeft} days left
          </p>
          
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <span className="progress-text">
              ${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()} ({Math.round(progress)}%)
            </span>
          </div>
          
          <div className="goal-actions">
            <div className="action-buttons" style={{ marginLeft: 'auto' }}>
              <button 
                className="secondary-btn" 
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button 
                className="danger-btn" 
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}