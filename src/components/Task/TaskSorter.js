const TaskSorter = ({ tasks, setFilteredTasks, sortBy, setSortBy }) => {
  
    // Handle sort change
    const handleSortChange = (e) => {
      const { value } = e.target;
      setSortBy(value);
  
      const sortedTasks = [...tasks];
  
      if (value === 'dueDate') {
        sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else if (value === 'priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      }
  
      setFilteredTasks(sortedTasks);
    };
  
    return (
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="">None</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    );
  };
  
  export default TaskSorter;
  