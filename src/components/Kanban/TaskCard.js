import React from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task, columnId }) => {
  
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 mb-4 bg-white rounded shadow-md ${isDragging ? 'opacity-50' : ''}`}
    >
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;