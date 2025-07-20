export function calculateDaysLeft(deadline) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getGoalStatus(goal, daysLeft) {
  if (goal.savedAmount >= goal.targetAmount) return 'completed';
  if (daysLeft < 0) return 'overdue';
  if (daysLeft <= 30) return 'warning';
  return 'active';
}