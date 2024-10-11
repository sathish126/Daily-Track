import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [theme, setTheme] = useState('light');

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() && taskDate) {
      setTasks([...tasks, { text: newTask, date: taskDate, completed: false }]);
      setNewTask('');
      setTaskDate('');
    }
  };

  const handleDeleteTask = (taskIndex) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  };

  const toggleTaskCompletion = (taskIndex) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddIncome = (event) => {
    event.preventDefault();
    const income = parseFloat(incomeAmount);
    if (!isNaN(income) && income > 0) {
      setTotalIncome(totalIncome + income);
      setIncomeAmount('');
    }
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    const expense = parseFloat(expenseAmount);
    if (expenseDescription.trim() && !isNaN(expense) && expense > 0) {
      setTotalExpenses(totalExpenses + expense);
      setExpenseDescription('');
      setExpenseAmount('');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="app-container">
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      {/* To-Do List Section */}
      <div className="card">
        <h1 className="card-title">My To-Do List</h1>
        <form onSubmit={handleAddTask} className="form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="input"
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="input"
          />
          <button type="submit" className="button primary">Add Task</button>
        </form>

        <div className="task-list">
          {tasks.map((task, index) => (
            <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="task-checkbox"
                />
                {task.text} <span className="text-sm ml-2">({task.date})</span>
              </label>
              <button onClick={() => handleDeleteTask(index)} className="delete-button">✖</button>
            </div>
          ))}
        </div>
      </div>

      {/* Income & Expense Tracker Section */}
      <div className="card">
        <h1 className="card-title">Income & Expense Tracker</h1>
        <div className="balance-container">
          <div className="balance-item">
            Total Income: <span className="balance-amount positive">₹{totalIncome}</span>
          </div>
          <div className="balance-item">
            Total Expenses: <span className="balance-amount negative">₹{totalExpenses}</span>
          </div>
          <div className="balance-item">
            Balance: <span className={`balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>₹{balance}</span>
          </div>
        </div>

        {/* Add Income Form */}
        <form onSubmit={handleAddIncome} className="form">
          <input
            type="number"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            placeholder="Add Income"
            className="input"
          />
          <button type="submit" className="button success">Add Income</button>
        </form>

        {/* Add Expense Form */}
        <form onSubmit={handleAddExpense} className="form">
          <input
            type="text"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            placeholder="Expense Description"
            className="input"
          />
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Expense Amount"
            className="input"
          />
          <button type="submit" className="button danger">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default App;
