
import GoalItem from './GoalItem'

export default function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  return (
    <div className="goal-list">
      <h2>Your Savings Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add your first goal!</p>
      ) : (
        <ul>
          {goals.map(goal => (
            <GoalItem 
              key={goal.id} 
              goal={goal} 
              onUpdate={onUpdateGoal} 
              onDelete={onDeleteGoal} 
            />
          ))}
        </ul>
      )}
    </div>
  )
}