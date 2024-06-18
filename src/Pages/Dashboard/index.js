// src/components/TaskManager.js
import React, { useState } from 'react';
import Header from '../../Layout/Header';
import Button from '../../Component/Button';
import { IdConstant } from '../../Constant/appConstant';
import './index.scss'
import Input from '../../Component/Input';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleaAddTask = () =>{
    setAddTask(true)
  }

  const handleAddTask = () => {
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { name: taskName, assignee } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { name: taskName, assignee }]);
    }
    setTaskName('');
    setAssignee('');
  };

  const handleEditTask = (index) => {
    setTaskName(tasks[index].name);
    setAssignee(tasks[index].assignee);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Header />
      <div className=' dashboard w-full py-6'>
        <div className='dashboard-container'>
          <div className='add-task flex justify-end'>
            <Button label={IdConstant.ADD_TASK} onClick={handleaAddTask} />
          </div>
          {
            addTask && <div className='dashboard-task p-8'>
            <h1 className='text-center'>Task Manager</h1>
              <div className='dashboard-form flex flex-col'>
                <Input
                label='Enter Task'
                type='text'
                placeholder='Enter Task'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                 />
              <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          <button onClick={handleAddTask}>
            {editIndex !== null ? 'Edit Task' : 'Add Task'}
          </button>
              </div>
            </div>
          }
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task.name} - {task.assignee}
                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
