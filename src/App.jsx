
import { useState, useEffect } from 'react';
import './App.css';

import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import ExpenseChart from './components/ExpenseChart';
import exportToCSV from './utils/exportToCSV';
import CategoryChart from './components/CategoryChart';
import Budget from './components/Budget';
import ExpenseReport from './components/ExpenseReport';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [editingExpense, setEditingExpense] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((previousExpenses) => [
      ...previousExpenses,
      expense
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );

    if (editingExpense?.id === id) {
      setEditingExpense(null);
    }
  };

  const updateExpense = (updatedExpense) => {
    if (updatedExpense === null) {
      setEditingExpense(null);
      return;
    }

    setExpenses((previousExpenses) =>
      previousExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setEditingExpense(null);
  };

  return (
    <div className="dashboard">

      <header className="navbar">
        <h2>💰 Expense Tracker</h2>
        <span>Personal Finance Dashboard</span>
      </header>

      <main className="container">

        <section className="welcome">
          <h1>Welcome Back!</h1>
          <p>Track your money. Manage your future.</p>
        </section>

        <Summary expenses={expenses} />
        <ExpenseChart expenses={expenses} />
        <CategoryChart expenses={expenses} />
        <Budget expenses={expenses} />
        <ExpenseReport expenses={expenses} />

        <div className="main-content">

          <ExpenseForm
            onAddExpense={addExpense}
            editingExpense={editingExpense}
            onUpdateExpense={updateExpense}
          />

          <div className="expense-section">
            <div className="export-section">
              <button
                className="export-btn"
                onClick={() => exportToCSV(expenses)}
              >
                📥 Export Expenses to CSV
              </button>
            </div>

            <div className="filter-section">

              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>

            </div>

            <ExpenseList
              expenses={expenses}
              onDeleteExpense={deleteExpense}
              onEditExpense={setEditingExpense}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />

          </div>

        </div>

      </main>

      <footer>
        <p>© 2026 Expense Tracker | Built with React</p>
      </footer>

    </div>
  );
}

export default App;
