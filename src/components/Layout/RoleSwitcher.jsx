import React from 'react';
import { useRole } from '../../contexts/RoleContext';
import { FaUser, FaUserShield } from 'react-icons/fa';

const RoleSwitcher = () => {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
      <span className="text-base font-medium text-gray-600 dark:text-gray-300">Role:</span>
      <button
        onClick={() => setRole('viewer')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-base ${
          role === 'viewer'
            ? 'bg-primary-500 text-white shadow-md'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        <FaUser size={16} />
        <span className="font-medium">Viewer</span>
      </button>
      <button
        onClick={() => setRole('admin')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-base ${
          role === 'admin'
            ? 'bg-primary-500 text-white shadow-md'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        <FaUserShield size={16} />
        <span className="font-medium">Admin</span>
      </button>
    </div>
  );
};

export default RoleSwitcher;