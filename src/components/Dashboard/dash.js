import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      const res = await axios.get('/api/tasks', config);
      setTasks(res.data); // Store fetched tasks in state
    } catch (err) {
      console.error('Error fetching tasks:', err.response.data);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Render tasks in Kanban columns
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kanban Dashboard</h1>
      <AddTaskForm fetchTasks={fetchTasks} />

      {/* Kanban Columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* To Do */}
        <div>
          <h2 className="font-bold text-xl">To Do</h2>
          {tasks
            .filter((task) => task.status === 'To Do')
            .map((task) => (
              <div key={task._id} className="p-4 bg-gray-100 rounded shadow-md">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            ))}
        </div>

        {/* In Progress */}
        <div>
          <h2 className="font-bold text-xl">In Progress</h2>
          {tasks
            .filter((task) => task.status === 'In Progress')
            .map((task) => (
              <div key={task._id} className="p-4 bg-yellow-100 rounded shadow-md">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            ))}
        </div>

        {/* Done */}
        <div>
          <h2 className="font-bold text-xl">Done</h2>
          {tasks
            .filter((task) => task.status === 'Done')
            .map((task) => (
              <div key={task._id} className="p-4 bg-green-100 rounded shadow-md">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;