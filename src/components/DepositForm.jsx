import { useState } from 'react';

export default function DepositForm({ goals, onDeposit }) {
  const [deposit, setDeposit] = useState({
    goalId: '',
    amount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deposit.goalId || !deposit.amount) return;
    
    onDeposit(deposit.goalId, deposit.amount);
    setDeposit({
      goalId: '',
      amount: ''
    });
  };

  return (
    <form className="deposit-form" onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      
      <div className="form-group">
        <label>Select Goal:</label>
        <select
          value={deposit.goalId}
          onChange={(e) => setDeposit({...deposit, goalId: e.target.value})}
          required
        >
          <option value="">-- Select a goal --</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.savedAmount} of ${goal.targetAmount})
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Amount ($):</label>
        <input
          type="number"
          value={deposit.amount}
          onChange={(e) => setDeposit({...deposit, amount: e.target.value})}
          required
          min="1"
        />
      </div>
      
      <button type="submit">Deposit</button>
    </form>
  );
}
