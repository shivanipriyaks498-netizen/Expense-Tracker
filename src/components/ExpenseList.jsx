
function ExpenseList({
  expenses,
  onDeleteExpense,
  onEditExpense,
  searchTerm,
  selectedCategory
}) {
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="expense-list">
      <h2>Expense History</h2>

      {filteredExpenses.length === 0 ? (
        <p className="empty-message">
          No matching expenses found.
        </p>
      ) : (
        filteredExpenses.map((expense) => (
          <div className="expense-item" key={expense.id}>

            <div className="expense-details">
              <h3>{expense.title}</h3>
              <p>{expense.category}</p>
            </div>

            <div className="expense-actions">
              <strong>₹{expense.amount.toFixed(2)}</strong>

              <button
                className="edit-btn"
                onClick={() => onEditExpense(expense)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDeleteExpense(expense.id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;
