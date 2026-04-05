import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useTransactions } from '../../contexts/TransactionContext';
import { useRole } from '../../contexts/RoleContext';
import TransactionForm from './TransactionForm';
import EmptyState from '../Common/EmptyState';

const TransactionsList = () => {
  const { transactions, filteredTransactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { isAdmin } = useRole();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleSubmit = (transactionData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }
    setEditingTransaction(null);
  };

  const getAmountColor = (amount) => {
    return amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
          Recent Transactions
        </h3>
        {isAdmin && (
          <button
            onClick={() => {
              setEditingTransaction(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-lg transition-all duration-200 text-base font-semibold"
          >
            <FaPlus size={16} />
            Add Transaction
          </button>
        )}
      </div>
      
      {filteredTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">Date</th>
                <th className="px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">Description</th>
                <th className="px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">Category</th>
                <th className="px-4 py-4 text-right text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                {isAdmin && <th className="px-4 py-4 text-center text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredTransactions.slice(0, 10).map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-4 py-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-base md:text-lg font-medium text-gray-800 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right text-base md:text-lg font-bold ${getAmountColor(transaction.amount)}`}>
                    ${Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length > 10 && (
            <p className="text-center text-sm md:text-base text-gray-500 mt-4">
              Showing 10 of {filteredTransactions.length} transactions
            </p>
          )}
        </div>
      ) : (
        <EmptyState
          title="No transactions found"
          description="Try adjusting your filters or add a new transaction"
        />
      )}
      
      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
        />
      )}
    </div>
  );
};

export default TransactionsList;