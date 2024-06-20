import React, { PureComponent } from 'react';
import Select from 'react-select';
import Header from '../../Layout/Header';
import Button from '../../Component/Button';
import { IdConstant } from '../../Constant/appConstant';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPersonDashFill } from "react-icons/bs";
import './index.scss'
import Input from '../../Component/Input';

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      addTask: false,
      taskName: '',
      description: '',
      assignee: '',
      editIndex: null,
      assigneeOptions: [
        { value: 'John Doe', label: 'John Doe' },
        { value: 'Jane Smith', label: 'Jane Smith' },
        { value: 'Alice Johnson', label: 'Alice Johnson' },
        { value: 'Suresh', label: 'Suresh' },
      ],
    };
  }

  componentDidMount() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.setState({ tasks: storedTasks });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
  }

  handleaAddTask = () => {
    this.setState({ addTask: true });
  };

  handleCloseTask =()=>{
    this.setState({ addTask: false });
  }

  handleAddTask = () => {
    const { tasks, taskName, description, assignee, editIndex } = this.state;
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { name: taskName, assignee: assignee.value, description } : task
      );
      this.setState({ tasks: updatedTasks, editIndex: null });
    } else {
      this.setState({ tasks: [...tasks, { name: taskName, assignee: assignee.value, description }] });
    }
    this.setState({ taskName: '', assignee: '', description: '', addTask: false });
  };

  handleEditTask = (index) => {
    const { tasks, assigneeOptions } = this.state;
    const selectedAssignee = assigneeOptions.find(option => option.value === tasks[index].assignee);
    this.setState({
      addTask: true,
      taskName: tasks[index].name,
      assignee: selectedAssignee,
      description: tasks[index].description,
      editIndex: index,
    });
  };

  handleDeleteTask = (index) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    this.setState({ tasks: updatedTasks });
  };

  isAddTaskDisabled = () => {
    const { taskName, description, assignee } = this.state;
    return taskName.trim() === '' || description.trim() === '' || !assignee;
  };

  render() {
    const { tasks, addTask, taskName, description, assignee, assigneeOptions, editIndex } = this.state;

    return (
      <div>
        <Header />
        <div className='dashboard w-full py-6'>
          <div className='dashboard-container'>
            <div className='add-task flex justify-end'>
              <Button label={IdConstant.ADD_TASK} onClick={this.handleaAddTask} />
            </div>
            {
              addTask && (
                <div className='dashboard-task p-8'>
                  <div className='dashboard-close-icon flex justify-end' onClick={this.handleCloseTask}>
                  <AiOutlineClose />
                  </div>
                  <h2 className='text-center pb-2'>Task Manager</h2>
                  <div className='dashboard-form flex flex-col'>
                    <Input
                      label='Enter Task'
                      type='text'
                      placeholder='Task'
                      value={taskName}
                      onChange={(e) => this.setState({ taskName: e.target.value })}
                    />
                    <Input
                      label='Description'
                      type='text'
                      placeholder='Description'
                      value={description}
                      onChange={(e) => this.setState({ description: e.target.value })}
                    />
                    <label>Assigned To Person</label>
                    <Select
                      options={assigneeOptions}
                      value={assignee}
                      onChange={(selectedOption) => this.setState({ assignee: selectedOption })}
                      className='mb-4'
                    />
                    <Button 
                      onClick={this.handleAddTask} 
                      label={editIndex !== null ? 'Edit Task' : 'Add Task'} 
                      disabled={this.isAddTaskDisabled()} 
                    />
                  </div>
                </div>
              )
            }
            <div className='w-full rounded-md my-4'>
              {tasks.map((task, index) => (
                <div key={index} className='dashboard-list flex justify-between p-4 mb-4 items-center'>
                  <div>
                    <h4>{task.name}</h4>
                    <p>{task.description}</p>
                  </div>
                  <div>
                    <h4 className='flex items-center'>
                      <BsFillPersonDashFill /> {task.assignee}
                    </h4>
                  </div>
                  <div className='flex'>
                    <Button onClick={() => this.handleEditTask(index)} className='dashboard-edit-button' label='Edit' />
                    <Button onClick={() => this.handleDeleteTask(index)} className='dashboard-delete-button ms-2' label='Delete' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
