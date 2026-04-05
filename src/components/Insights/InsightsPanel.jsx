import React from 'react';
import { FaTrophy, FaChartLine, FaArrowUp, FaArrowDown, FaLightbulb } from 'react-icons/fa';
import { useTransactions } from '../../contexts/TransactionContext';
import { getInsights } from '../../utils/calculations';

const InsightsPanel = () => {
  const { transactions } = useTransactions();
  const insights = getInsights(transactions);

  const insightCards = [
    {
      title: 'Highest Spending Category',
      value: insights.highestCategory || 'N/A',
      subtitle: `$${insights.highestAmount.toLocaleString()}`,
      icon: FaTrophy,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Monthly Comparison',
      value: `${Math.abs(insights.monthlyChange).toFixed(1)}%`,
      subtitle: insights.monthlyChange > 0 ? 'Increase in spending' : 'Decrease in spending',
      icon: insights.monthlyChange > 0 ? FaArrowUp : FaArrowDown,
      color: insights.monthlyChange > 0 ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600',
    },
    {
      title: 'Average Transaction',
      value: `$${insights.averageExpense.toFixed(0)}`,
      subtitle: 'per expense',
      icon: FaChartLine,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Savings Rate',
      value: `${insights.savingsRate.toFixed(1)}%`,
      subtitle: 'of total income',
      icon: FaLightbulb,
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Smart Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((insight, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`bg-gradient-to-r ${insight.color} p-2 rounded-lg text-white`}>
                <insight.icon size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{insight.title}</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white mb-1">{insight.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{insight.subtitle}</p>
          </div>
        ))}
      </div>
      
      {transactions.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 {insights.savingsRate > 20 
              ? "Great job! Your savings rate is excellent. Keep up the good financial habits!"
              : insights.savingsRate > 10
              ? "Good savings rate! Consider reducing discretionary spending to save more."
              : "Try to increase your savings by reducing non-essential expenses."}
          </p>
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;