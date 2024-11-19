import React, { useReducer, useState } from 'react';
import './Todo.css';

const initialState = {
  tasks: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'Add':
      return {
        ...state,
        tasks: [...state.tasks, action.response],
      };
    case 'Update':
      const updatedTasks = [...state.tasks];
      updatedTasks[action.response.index] = action.response.task;
      return {
        ...state,
        tasks: updatedTasks,
      };
    case 'Delete':
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.response),
      };
    default:
      return state;
  }
};

function Todo() {
  const [task, setTask] = useState('');
  const [taskIndex, setTaskIndex] = useState(null);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = () => {
    if (task !== '') {
      dispatch({ type: 'Add', response: task });
      setTask('');
    }
  };

  const updateTask = () => {
    if (task !== '' && taskIndex !== null) {
      dispatch({ type: 'Update', response: { index: taskIndex, task } });
      setTask('');
      setTaskIndex(null);
    }
  };

  const deleteTask = (index) => {
    dispatch({ type: 'Delete', response: index });
  };

  const editTask = (index) => {
    setTask(state.tasks[index]);
    setTaskIndex(index);
  };

  return (
    <div className="Todo">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add or update a task"
        />
        <button className='update' onClick={taskIndex === null ? addTask : updateTask}>
          {taskIndex === null ? 'Add Task' : 'Update Task'}
        </button>
      </div>

      <ul>
        {state.tasks.map((taskItem, index) => (
          <li key={index}>
            {taskItem}
            <button className='edit' onClick={() => editTask(index)}>Edit</button>
            <button className='delete' onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
