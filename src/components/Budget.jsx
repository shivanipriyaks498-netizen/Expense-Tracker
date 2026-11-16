
import { useState, useEffect } from 'react';

function Budget({ expenses }) {
  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem('monthlyBudget')) || 0;
  });

  const [budgetInput, setBudgetInput] = useState(
    budget > 0 ? String(budget) : ''
  );

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyExpenses = expenses
    .filter((expense) => expense.date?.slice(0, 7) === currentMonth)
    .reduce((total, expense) => total + expense.amount, 0);

  const remaining = budget - monthlyExpenses;

  const percentage =
    budget > 0 ? Math.min((monthlyExpenses / budget) * 100, 100) : 0;

  useEffect(() => {
    localStorage.setItem('monthlyBudget', String(budget));
  }, [budget]);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();

    const value = Number(budgetInput);

    if (!budgetInput || !Number.isFinite(value) || value <= 0) {
      alert('Please enter a valid monthly budget.');
      return;
    }

    setBudget(value);
  };

  return (
    <div className="budget-card">
      <h2>Monthly Budget</h2>

      <form onSubmit={handleBudgetSubmit} className="budget-form">
        <input
          type="number"
          placeholder="Enter monthly budget"
          min="1"
          step="0.01"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
          required
        />

        <button type="submit">Set Budget</button>
      </form>

      {budget > 0 ? (
        <div className="budget-details">
          <div className="budget-numbers">
            <p>Budget: ₹{budget.toFixed(2)}</p>
            <p>Spent: ₹{monthlyExpenses.toFixed(2)}</p>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <h3 className={remaining < 0 ? 'over-budget' : 'within-budget'}>
            {remaining >= 0
              ? `Remaining: ₹${remaining.toFixed(2)}`
              : `Over budget by: ₹${Math.abs(remaining).toFixed(2)}`}
          </h3>

          {remaining < 0 && (
            <p className="budget-warning">
              ⚠️ You have exceeded your monthly budget!
            </p>
          )}
        </div>
      ) : (
        <p className="empty-message">
          Set a monthly budget to track your spending.
        </p>
      )}
    </div>
  );
}

export default Budget;
