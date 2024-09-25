import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';

const initialTasks = {
  todo: [
    { id: 1, title: 'Task 1', description: 'Description for task 1' },
    { id: 2, title: 'Task 2', description: 'Description for task 2' },
  ],
  inProgress: [
    { id: 3, title: 'Task 3', description: 'Description for task 3' },
  ],
  done: [
    { id: 4, title: 'Task 4', description: 'Description for task 4' },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Function to move tasks between columns
  const moveTask = (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find((task) => task.id === taskId);

    setTasks({
      ...tasks,
      [fromColumn]: tasks[fromColumn].filter((task) => task.id !== taskId),
      [toColumn]: [...tasks[toColumn], taskToMove],
    });
  };

  return (
    <div className="flex space-x-4">
      <KanbanColumn title="To Do" tasks={tasks.todo} columnId="todo" moveTask={moveTask} />
      <KanbanColumn title="In Progress" tasks={tasks.inProgress} columnId="inProgress" moveTask={moveTask} />
      <KanbanColumn title="Done" tasks={tasks.done} columnId="done" moveTask={moveTask} />
    </div>
  );
};

export default KanbanBoard;
