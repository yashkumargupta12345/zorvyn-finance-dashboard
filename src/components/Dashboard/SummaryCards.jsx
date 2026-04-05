import React from 'react';
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useTransactions } from '../../contexts/TransactionContext';
import { calculateFinancials } from '../../utils/calculations';

const SummaryCards = () => {
  const { transactions } = useTransactions();
  const { balance, totalIncome, totalExpenses } = calculateFinancials(transactions);

  const cards = [
    {
      title: 'Total Balance',
      value: `$${balance.toLocaleString()}`,
      icon: FaWallet,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Income',
      value: `$${totalIncome.toLocaleString()}`,
      icon: FaArrowUp,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      icon: FaArrowDown,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="card p-6 md:p-8 transform hover:scale-105 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg font-medium mb-2">
                {card.title}
              </p>
              <p className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-2 ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`bg-gradient-to-r ${card.color} p-4 rounded-full text-white`}>
              <card.icon size={28} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;