
function Summary({ expenses }) {
  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const highestExpense = expenses.reduce(
    (highest, expense) =>
      expense.amount > highest ? expense.amount : highest,
    0
  );

  return (
    <div className="summary">
      <h2>Expense Summary</h2>

      <div className="summary-cards">

        <div className="summary-card">
          <h3>Total Spending</h3>
          <p>₹{totalAmount.toFixed(2)}</p>
        </div>

        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p>{expenses.length}</p>
        </div>

        <div className="summary-card">
          <h3>Highest Expense</h3>
          <p>₹{highestExpense.toFixed(2)}</p>
        </div>

      </div>
    </div>
  );
}

export default Summary;
