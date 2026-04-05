import React from 'react';
import { FaInbox } from 'react-icons/fa';

const EmptyState = ({ title = "No data available", description = "There's nothing to show here at the moment." }) => {
  return (
    <div className="text-center py-12">
      <FaInbox className="mx-auto text-gray-400 text-6xl mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default EmptyState;