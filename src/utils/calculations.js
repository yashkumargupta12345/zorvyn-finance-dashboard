export const calculateFinancials = (transactions) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const balance = totalIncome - totalExpenses;
  
  return { totalIncome, totalExpenses, balance };
};

export const getMonthlyData = (transactions) => {
  const monthlyMap = new Map();
  
  transactions.forEach(transaction => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, { income: 0, expenses: 0 });
    }
    const data = monthlyMap.get(month);
    if (transaction.type === 'income') {
      data.income += Math.abs(transaction.amount);
    } else {
      data.expenses += Math.abs(transaction.amount);
    }
  });
  
  return Array.from(monthlyMap.entries()).map(([month, data]) => ({
    month,
    ...data,
  }));
};

export const getCategoryBreakdown = (transactions) => {
  const categoryMap = new Map();
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      const amount = Math.abs(transaction.amount);
      categoryMap.set(
        transaction.category,
        (categoryMap.get(transaction.category) || 0) + amount
      );
    });
  
  return Array.from(categoryMap.entries()).map(([category, amount]) => ({
    category,
    amount,
  }));
};

export const getInsights = (transactions) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryTotals = new Map();
  
  expenses.forEach(expense => {
    categoryTotals.set(
      expense.category,
      (categoryTotals.get(expense.category) || 0) + Math.abs(expense.amount)
    );
  });
  
  let highestCategory = '';
  let highestAmount = 0;
  for (let [category, amount] of categoryTotals) {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  }
  
  // Monthly comparison
  const currentMonth = new Date().getMonth();
  const currentMonthExpenses = expenses.filter(t => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const lastMonthExpenses = expenses.filter(t => new Date(t.date).getMonth() === currentMonth - 1)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const monthlyChange = lastMonthExpenses ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100) : 0;
  
  const averageExpense = expenses.length ? expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0) / expenses.length : 0;
  
  return {
    highestCategory,
    highestAmount,
    monthlyChange,
    averageExpense,
    totalTransactions: transactions.length,
    savingsRate: calculateFinancials(transactions).balance / (calculateFinancials(transactions).totalIncome || 1) * 100,
  };
};