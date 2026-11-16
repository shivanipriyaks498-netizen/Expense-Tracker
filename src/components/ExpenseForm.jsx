
import { useState, useEffect } from 'react';

function getTodayDate() {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(getTodayDate());

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(String(editingExpense.amount));
      setCategory(editingExpense.category);
      setDate(editingExpense.date || getTodayDate());
    } else {
      setTitle('');
      setAmount('');
      setCategory('Food');
      setDate(getTodayDate());
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0 || !date) {
      alert('Please enter valid expense details');
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      category,
      date
    };

    if (editingExpense) {
      onUpdateExpense({
        ...editingExpense,
        ...expenseData
      });
    } else {
      onAddExpense({
        id: Date.now(),
        ...expenseData
      });
    }

    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate(getTodayDate());
  };

  return (
    <div className="expense-form">
      <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">
          {editingExpense ? 'Update Expense' : 'Add Expense'}
        </button>

        {editingExpense && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => onUpdateExpense(null)}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ExpenseForm;
