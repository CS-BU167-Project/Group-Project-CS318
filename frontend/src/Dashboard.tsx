import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import { Expense, DailyReport, WeeklyReport, MonthlyReport, CategorySummary } from './types';
import { expenseAPI, reportAPI } from './api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const categories = ['Food', 'Transport', 'Entertainment', 'Other'];

function Main() {
  const navigate = useNavigate();
  const { user, expenses, summary, monthlyTotal, loading, refreshData } = useDashboardData();
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    categoryName: categories[0],
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [dailyReport, setDailyReport] = useState<DailyReport>({});
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport>({});
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport>({});
  const [categorySummary, setCategorySummary] = useState<CategorySummary>({});

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleAddExpense = () => {
    setEditingExpense(null);
    setFormData({
      description: '',
      amount: '',
      date: '',
      categoryName: categories[0],
    });
    setShowModal(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      categoryName: expense.category.name,
    });
    setShowModal(true);
  };

  const handleDeleteExpense = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseAPI.deleteExpense(id);
        refreshData();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const amount = parseFloat(formData.amount);
    if (amount <= 0) {
      setErrorMessage('Amount must be greater than 0');
      return;
    }
    setErrorMessage('');

    const expenseData = {
      description: formData.description,
      amount: amount,
      date: formData.date,
      user: user,
      category: { name: formData.categoryName },
    };

    try {
      if (editingExpense) {
        await expenseAPI.updateExpense(editingExpense.id, expenseData);
      } else {
        await expenseAPI.createExpense(expenseData);
      }
      setShowModal(false);
      refreshData();
    } catch (error) {
      console.error('Error saving expense:', error);
      setErrorMessage('Error saving expense. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user) {
      const fetchReports = async () => {
        try {
          const daily = await reportAPI.getDailyReport(user.id);
          setDailyReport(daily);
          const weekly = await reportAPI.getWeeklyReport(user.id);
          setWeeklyReport(weekly);
          const monthly = await reportAPI.getMonthlyReport(user.id);
          setMonthlyReport(monthly);
          const summary = await reportAPI.getSummary(user.id);
          const catSummary: CategorySummary = {};
          for (const [key, value] of Object.entries(summary)) {
            catSummary[key] = typeof value === 'number' ? value : parseFloat(String(value));
          }
          setCategorySummary(catSummary);
        } catch (error) {
          console.error('Error fetching reports:', error);
        }
      };
      fetchReports();
    }
  }, [user]);

  const dailyData = Object.entries(dailyReport).map(([date, expenses]) => ({
    date: new Date(date).toLocaleDateString(),
    amount: expenses.reduce((sum, exp) => sum + exp.amount, 0)
  }));

  const weeklyData = Object.entries(weeklyReport).map(([date, expenses]) => ({
    date: new Date(date).toLocaleDateString(),
    amount: expenses.reduce((sum, exp) => sum + exp.amount, 0)
  }));

  const monthlyData = Object.entries(monthlyReport).map(([date, expenses]) => ({
    date: new Date(date).toLocaleDateString(),
    amount: expenses.reduce((sum, exp) => sum + exp.amount, 0)
  }));

  const pieData = Object.entries(categorySummary).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const totalExpenses = expenses.reduce((sum: number, exp: Expense) => sum + exp.amount, 0);
  const categoryCount = Object.keys(summary).length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Personal Finance Tracker</h2>
        <div className="header-buttons">
          <button onClick={handleProfile} className="profile-button">
            Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <div className="dashboard-grid" style={{marginTop: '15px'}}>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p className="amount">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h3>This Month</h3>
            <p className="amount">${monthlyTotal.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h3>Categories</h3>
            <p>{categoryCount} active</p>
          </div>
        </div>
      </header>
      
      <section className="transactions-section">
        <div className="transactions-header">
          <h3>Your Transactions</h3>
          <button onClick={handleAddExpense} className="add-expense-button">
            Add Expense
          </button>
        </div>
        <div className="transactions-list">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div key={expense.id} className="transaction-item">
                <div className="transaction-info">
                  <strong>{expense.description}</strong>
                  <p>{expense.category.name} - {new Date(expense.date).toLocaleDateString()}</p>
                </div>
                <div className="transaction-actions">
                  <div className="transaction-amount">${expense.amount.toFixed(2)}</div>
                  <button onClick={() => handleEditExpense(expense)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteExpense(expense.id)} className="delete-button">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>No transactions yet. Add your first expense!</p>
          )}
        </div>
      </section>

      <section className="charts-section">
        <h3>Expense Reports</h3>
        <div className="charts-grid" style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px'}}>
          <div className="chart-card">
            <h4>Daily Expenses</h4>
            <LineChart width={300} height={200} data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </div>
          <div className="chart-card">
            <h4>Weekly Expenses</h4>
            <LineChart width={300} height={200} data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
            </LineChart>
          </div>
          <div className="chart-card">
            <h4>Monthly Expenses</h4>
            <LineChart width={300} height={200} data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#ffc658" />
            </LineChart>
          </div>
          <div className="chart-card">
            <h4>Expenses by Category</h4>
            <PieChart width={300} height={200}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => percent != null ? `${name} ${(percent * 100).toFixed(0)}%` : name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
              <button type="button" className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form className="expense-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} required className="form-input" style={{color: 'black'}} />
              </div>
              <div className="form-group">
                <label>Amount:</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required step="0.01" className="form-input" style={{color: 'black', WebkitAppearance: 'none', MozAppearance: 'textfield'}} />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="form-input" style={{color: 'black'}} />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select name="categoryName" value={formData.categoryName} onChange={handleInputChange} className="form-select" style={{color: 'black'}}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              {errorMessage && <p style={{color: 'red', marginTop: '10px'}}>{errorMessage}</p>}
              <div className="modal-buttons">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingExpense ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
