
function exportToCSV(expenses) {
  if (!expenses || expenses.length === 0) {
    alert('No expenses available to export!');
    return;
  }

  const headers = ['Expense Name', 'Amount', 'Category', 'Date'];

  const rows = expenses.map((expense) => [
    expense.title,
    expense.amount,
    expense.category,
    expense.date || 'Not specified'
  ]);

  const escapeCSV = (value) => {
    const text = String(value ?? '');
    return `"${text.replace(/"/g, '""')}"`;
  };

  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map((row) => row.map(escapeCSV).join(','))
  ].join('\n');

  const blob = new Blob(
    ['\uFEFF' + csvContent],
    { type: 'text/csv;charset=utf-8;' }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'my-expenses.csv';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export default exportToCSV;
