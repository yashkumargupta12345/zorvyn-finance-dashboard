# Finance Dashboard - Frontend Developer Intern Assignment

## 🚀 Live Demo
https://zorvyn-finance-dashboard-drab.vercel.app/

## 📋 Project Overview
A comprehensive finance dashboard application built with React and Tailwind CSS that helps users track their financial activities, visualize spending patterns, and gain valuable insights. The application features role-based access control, data persistence, and responsive design.

## ✨ Features Implemented

### Core Requirements ✅
1. **Dashboard Overview**
   - Summary cards showing Total Balance, Income, and Expenses
   - Balance trend visualization over time (Line/Area chart)
   - Spending breakdown by category (Pie chart)

2. **Transactions Section**
   - Complete transaction list with date, amount, category, and type
   - Search functionality
   - Filtering by type and category
   - Sorting by date and amount
   - Add/Edit/Delete operations (Admin only)

3. **Role-Based UI**
   - Viewer role: Read-only access to all data
   - Admin role: Full CRUD operations on transactions
   - Easy role switching via dropdown

4. **Insights Section**
   - Highest spending category
   - Monthly spending comparison
   - Average transaction amount
   - Savings rate calculation
   - Personalized financial advice

5. **State Management**
   - React Context API for global state
   - Separate contexts for transactions and role management
   - Efficient filtering and sorting logic

6. **UI/UX Excellence**
   - Clean, modern design with smooth animations
   - Fully responsive layout
   - Empty state handling
   - Loading states and transitions

### Optional Enhancements 🎯
- ✅ Dark mode toggle with persistence
- ✅ Local storage data persistence
- ✅ CSV export functionality
- ✅ Smooth animations and transitions
- ✅ Advanced filtering system

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: React Icons
- **Date Handling**: date-fns
- **Notifications**: react-hot-toast
- **State Management**: React Context API

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone [zorvyn-finance-dashboard]
cd finance-dashboard
npm install
npm run dev
