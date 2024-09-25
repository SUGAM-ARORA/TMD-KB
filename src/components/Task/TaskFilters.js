const TaskFilters = ({ tasks, setFilteredTasks, filter, setFilter }) => {
  
    // Handle filter change
    const handleFilterChange = (e) => {
      const { value } = e.target;
      setFilter(value);
  
      if (value === '') {
        setFilteredTasks(tasks);
      } else {
        const filtered = tasks.filter((task) => task.status === value || task.priority === value);
        setFilteredTasks(filtered);
      }
    };
  
    return (
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter by Status/Priority:</label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Tasks</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
      </div>
    );
  };
  
  export default TaskFilters;
  