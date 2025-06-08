import { useEffect, useState } from 'react';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
  try {
    const stored = localStorage.getItem('tasks');
    const parsed = stored ? JSON.parse(stored) : [];
    setTasks(Array.isArray(parsed) ? parsed : []);
  } catch (e) {
    console.error('Failed to load tasks from localStorage:', e);
    setTasks([]);
  }
}, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
  try {
    const stored = localStorage.getItem('tasks');
    const parsed = stored ? JSON.parse(stored) : [];
    console.log('Loaded from localStorage:', parsed);
    setTasks(Array.isArray(parsed) ? parsed : []);
  } catch (e) {
    console.error('Failed to load tasks from localStorage:', e);
    setTasks([]);
  }
}, []);

useEffect(() => {
  console.log('Saving to localStorage:', tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-4">📝 To-Do List</h1>
        <div className="flex mb-4">
          <input
            className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.length === 0 && (
            <p className="text-center text-gray-500">No tasks yet.</p>
          )}
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 border rounded px-3 py-2 mb-2"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                {task.text}
              </span>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => deleteTask(task.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
