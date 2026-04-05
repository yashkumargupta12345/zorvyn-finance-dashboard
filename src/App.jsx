import React from 'react';
import { TransactionProvider } from './contexts/TransactionContext';
import { RoleProvider } from './contexts/RoleContext';
import Header from './components/Layout/Header';
import SummaryCards from './components/Dashboard/SummaryCards';
import BalanceTrend from './components/Dashboard/BalanceTrend';
import SpendingBreakdown from './components/Dashboard/SpendingBreakdown';
import TransactionsList from './components/Transactions/TransactionsList';
import TransactionFilters from './components/Transactions/TransactionFilters';
import InsightsPanel from './components/Insights/InsightsPanel';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <RoleProvider>
      <TransactionProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              {/* Dashboard Overview Section */}
              <section>
                <SummaryCards />
              </section>
              
              {/* Visualizations Section */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BalanceTrend />
                <SpendingBreakdown />
              </section>
              
              {/* Insights Section */}
              <section>
                <InsightsPanel />
              </section>
              
              {/* Transactions Section */}
              <section>
                <TransactionFilters />
                <TransactionsList />
              </section>
            </div>
          </main>
          
          <Toaster position="top-right" />
        </div>
      </TransactionProvider>
    </RoleProvider>
  );
}

export default App;