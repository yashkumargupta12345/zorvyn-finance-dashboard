import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import { useTransactions } from '../../contexts/TransactionContext';
import { getMonthlyData } from '../../utils/calculations';

const BalanceTrend = () => {
  const { transactions } = useTransactions();
  const monthlyData = getMonthlyData(transactions);

  const data = monthlyData.map(item => ({
    month: item.month,
    Income: item.income,
    Expenses: item.expenses,
    Balance: item.income - item.expenses,
  }));

  return (
    <div className="card p-6">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Balance Trend Over Time
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af" 
            tick={{ fontSize: 14, fill: '#9ca3af' }}
            tickMargin={10}
          />
          <YAxis 
            stroke="#9ca3af" 
            tick={{ fontSize: 14, fill: '#9ca3af' }}
            tickMargin={10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              fontSize: '14px',
              color: '#fff',
            }}
          />
          <Area
            type="monotone"
            dataKey="Balance"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#balanceGradient)"
          />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Expenses"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-4 text-center">
        Monthly income vs expenses comparison
      </p>
    </div>
  );
};

export default BalanceTrend;