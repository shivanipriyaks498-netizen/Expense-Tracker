
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

function ExpenseChart({ expenses }) {

  const monthlyTotals = expenses.reduce((result, expense) => {
    if (!expense.date) return result;

    const monthKey = expense.date.slice(0, 7);

    const monthLabel = new Date(
      `${monthKey}-01T00:00:00`
    ).toLocaleDateString('en-IN', {
      month: 'short',
      year: 'numeric'
    });

    if (!result[monthKey]) {
      result[monthKey] = {
        monthKey,
        month: monthLabel,
        total: 0
      };
    }

    result[monthKey].total += expense.amount;

    return result;
  }, {});

  const chartData = Object.values(monthlyTotals).sort(
    (a, b) => a.monthKey.localeCompare(b.monthKey)
  );

  return (
    <div className="expense-chart">
      <h2>Monthly Expense Overview</h2>

      {chartData.length === 0 ? (
        <p className="empty-message">
          Add expenses with dates to view your monthly chart.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toFixed(2)}`,
                'Total Spending'
              ]}
            />

            <Bar
              dataKey="total"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseChart;
