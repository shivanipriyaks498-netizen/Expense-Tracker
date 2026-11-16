
import { useMemo, useState } from 'react';

function ExpenseReport({ expenses }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showReport, setShowReport] = useState(false);

  const filteredExpenses = useMemo(() => {
    if (!showReport || !startDate || !endDate || startDate > endDate) {
      return [];
    }

    return expenses.filter((expense) => {
      return (
        expense.date &&
        expense.date >= startDate &&
        expense.date <= endDate
      );
    });
  }, [expenses, startDate, endDate, showReport]);

  const totalAmount = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('Please select both dates.');
      return;
    }

    if (startDate > endDate) {
      alert('Start date cannot be after end date.');
      return;
    }

    setShowReport(true);
  };

  const resetReport = () => {
    setStartDate('');
    setEndDate('');
    setShowReport(false);
  };

  return (
    <div className="report-card">
      <h2>Expense Date Range Report</h2>

      <form className="report-form" onSubmit={handleSubmit}>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setShowReport(false);
            }}
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setShowReport(false);
            }}
            required
          />
        </div>

        <button type="submit">Generate Report</button>

        <button type="button" className="reset-report-btn" onClick={resetReport}>
          Reset
        </button>
      </form>

      {showReport && (
        <div className="report-results">
          <h3>Report Results</h3>

          <p>
            Period: {startDate} to {endDate}
          </p>

          <p>Total Expenses: {filteredExpenses.length}</p>

          <h2>Total Spending: ₹{totalAmount.toFixed(2)}</h2>

          {filteredExpenses.length === 0 ? (
            <p>No expenses found for this date range.</p>
          ) : (
            <div className="report-list">
              {filteredExpenses.map((expense) => (
                <div className="report-item" key={expense.id}>
                  <span>
                    {expense.title} ({expense.category})
                  </span>
                  <strong>₹{expense.amount.toFixed(2)}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExpenseReport;
