import { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ fetchTasks }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = taskData;

  const onChange = (e) =>
    setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const body = JSON.stringify({ title, description, status: 'To Do' });

      // Make API call to create a task
      await axios.post('/api/tasks', body, config);

      // Fetch updated tasks after creating
      fetchTasks();
    } catch (err) {
      console.error('Error creating task:', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        placeholder="Task Title"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={description}
        onChange={onChange}
        placeholder="Task Description"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
