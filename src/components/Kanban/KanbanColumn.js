import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';

const KanbanColumn = ({ title, tasks, columnId, moveTask }) => {
  
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, item.columnId, columnId),
  });

  return (
    <div ref={drop} className="w-1/3 p-4 bg-gray-200 rounded">
      <h2 className="font-bold text-xl mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} columnId={columnId} />
      ))}
    </div>
  );
};

export default KanbanColumn;
