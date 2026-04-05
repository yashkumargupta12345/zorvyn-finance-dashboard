export const generateMockTransactions = () => {
  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education'];
  const types = ['expense', 'income'];
  
  const transactions = [];
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-03-31');
  
  for (let i = 0; i < 50; i++) {
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    const type = types[Math.random() > 0.7 ? 1 : 0];
    const amount = type === 'income' 
      ? Math.floor(Math.random() * 5000) + 1000
      : Math.floor(Math.random() * 500) + 20;
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    transactions.push({
      id: i + 1,
      date: randomDate.toISOString().split('T')[0],
      amount: type === 'income' ? amount : -amount,
      category,
      type,
      description: `${type === 'income' ? 'Received' : 'Paid for'} ${category.toLowerCase()}`,
    });
  }
  
  // Sort by date descending
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const initialTransactions = generateMockTransactions();

export const categories = {
  expense: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education'],
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Refund']
};