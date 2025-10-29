import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('Work');
  const [deadline, setDeadline] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ condition: 'clear', temp: 25 });
  const [location] = useState('Vijayawada, IN');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    fetchWeather();
    fetchTodos();
    return () => clearInterval(timer);
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Unable to connect to server');
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=16.5062&longitude=80.6480&current=temperature_2m,weathercode&timezone=Asia/Kolkata`
      );
      const data = await response.json();
      const weatherCode = data.current.weathercode;
      const temp = Math.round(data.current.temperature_2m);
      
      let condition = 'clear';
      if (weatherCode >= 61 && weatherCode <= 67) condition = 'rainy';
      else if (weatherCode >= 80 && weatherCode <= 99) condition = 'rainy';
      else if (weatherCode >= 51 && weatherCode <= 57) condition = 'rainy';
      else if (weatherCode >= 71 && weatherCode <= 77) condition = 'rainy';
      else if (weatherCode >= 2 && weatherCode <= 3) condition = 'cloudy';
      
      setWeather({ condition, temp });
    } catch (error) {
      console.error('Weather fetch failed:', error);
    }
  };

  const getBackgroundClass = () => {
    const hour = currentTime.getHours();
    const isNight = hour < 6 || hour >= 19;
    
    if (isNight) return 'night';
    if (weather.condition === 'rainy') return 'rainy';
    if (weather.condition === 'cloudy') return 'cloudy';
    return 'sunny';
  };

  const getWeatherIcon = () => {
    const hour = currentTime.getHours();
    const isNight = hour < 6 || hour >= 19;
    
    if (weather.condition === 'rainy') return '🌧️';
    if (weather.condition === 'cloudy') return '☁️';
    if (isNight) return '🌙';
    return '☀️';
  };

  const addTodo = async () => {
    if (!newTask.trim()) return;
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const newTodo = {
      task: newTask,
      category,
      deadline: deadline || endOfDay.toISOString(),
      completed: false
    };
    
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      });
      
      if (!response.ok) throw new Error('Failed to add todo');
      
      const data = await response.json();
      setTodos([data, ...todos]);
      setNewTask('');
      setDeadline('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(t => t._id === id);
    
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      });
      
      if (!response.ok) throw new Error('Failed to update todo');
      
      const data = await response.json();
      setTodos(todos.map(t => t._id === id ? data : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) throw new Error('Failed to delete todo');
      
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const categories = ['Work', 'Upskilling', 'Side Quests'];

  if (loading) {
    return (
      <div className="app sunny">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="container">
        <div className="header-card">
          {error && (
            <div className="error-banner">⚠️ {error}</div>
          )}
          <div className="header-content">
            <div>
              <h1>Task Manager</h1>
              <p className="location">{location}</p>
            </div>
            <div className="weather-info">
              <span className="weather-icon">{getWeatherIcon()}</span>
              <span className="temp">{weather.temp}°C</span>
            </div>
          </div>
          <div className="date">{formatDate(currentTime)}</div>
          <div className="time">{formatTime(currentTime)}</div>
        </div>

        <div className="add-task-card">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter your task..."
            className="task-input"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          
          <div className="task-controls">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="deadline-input"
            />
            
            <button onClick={addTodo} className="add-button">
              ➕ Add Task
            </button>
          </div>
        </div>

        {categories.map(cat => {
          const categoryTodos = todos.filter(todo => todo.category === cat);
          if (categoryTodos.length === 0) return null;
          
          return (
            <div key={cat} className="category-section">
              <h2 className="category-title">
                <span className={`category-dot ${cat.toLowerCase().replace(' ', '-')}`}></span>
                {cat}
              </h2>
              <div className="todos-list">
                {categoryTodos.map(todo => (
                  <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <button
                      onClick={() => toggleComplete(todo._id)}
                      className="checkbox"
                    >
                      {todo.completed && '✓'}
                    </button>
                    
                    <div className="todo-content">
                      <p className="todo-task">{todo.task}</p>
                      <div className="todo-meta">
                        <span className={`category-badge ${cat.toLowerCase().replace(' ', '-')}`}>
                          {todo.category}
                        </span>
                        <span className="deadline">Due: {formatDeadline(todo.deadline)}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="delete-button"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {todos.length === 0 && (
          <div className="empty-state">
            No tasks yet. Add one to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;