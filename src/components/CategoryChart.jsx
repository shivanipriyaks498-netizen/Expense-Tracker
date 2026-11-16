
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

function CategoryChart({ expenses }) {
  const categoryTotals = expenses.reduce((result, expense) => {
    const category = expense.category;

    result[category] = (result[category] || 0) + expense.amount;

    return result;
  }, {});

  const chartData = Object.entries(categoryTotals).map(
    ([category, total]) => ({
      category,
      total
    })
  );

  const COLORS = [
    '#2563eb',
    '#16a34a',
    '#f59e0b',
    '#dc2626',
    '#9333ea'
  ];

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>

      {chartData.length === 0 ? (
        <p className="empty-message">
          Add expenses to see category statistics.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({ category, percent }) =>
                `${category} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toFixed(2)}`,
                'Total Spending'
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategoryChart;
