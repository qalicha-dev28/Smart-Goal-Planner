export default function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="overview">
      <h2>Savings Overview</h2>
      
      <div className="progress-container" style={{ margin: '15px 0' }}>
        <div 
          className="progress-bar" 
          style={{ 
            width: `${overallProgress}%`,
            backgroundColor: overallProgress >= 100 ? 'var(--success)' : 'var(--primary)'
          }}
        ></div>
        <span className="progress-text">
          ${totalSaved.toLocaleString()} / ${totalTarget.toLocaleString()} ({Math.round(overallProgress)}%)
        </span>
      </div>
      
      <div className="overview-stats">
        <div className="stat">
          <div className="stat-value">${totalSaved.toLocaleString()}</div>
          <div className="stat-label">Total Saved</div>
        </div>
        <div className="stat">
          <div className="stat-value">{goals.length}</div>
          <div className="stat-label">Total Goals</div>
        </div>
        <div className="stat">
          <div className="stat-value">{completedGoals}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>
    </div>
  );
}
