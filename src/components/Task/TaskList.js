import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskFilters from './TaskFilters'; // Import TaskFilters component
import TaskSorter from './TaskSorter'; // Import TaskSorter component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      const res = await axios.get('/api/tasks', config);
      setTasks(res.data); // Set tasks to state
      setFilteredTasks(res.data); // Initially, no filters applied
    } catch (err) {
      console.error('Error fetching tasks:', err.response.data);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <TaskFilters tasks={tasks} setFilteredTasks={setFilteredTasks} filter={filter} setFilter={setFilter} />
      <TaskSorter tasks={tasks} setFilteredTasks={setFilteredTasks} sortBy={sortBy} setSortBy={setSortBy} />
      
      <div className="grid grid-cols-1 gap-4 mt-4">
        {filteredTasks.map((task) => (
          <div key={task._id} className="p-4 bg-gray-100 rounded shadow-md">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
