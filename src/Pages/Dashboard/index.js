import React, { PureComponent } from 'react';
import Header from '../../Layout/Header';
import Button from '../../Component/Button';
import { IdConstant } from '../../Constant/appConstant';
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

  handleAddTask = () => {
    const { tasks, taskName, description, assignee, editIndex } = this.state;
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { name: taskName, assignee, description } : task
      );
      this.setState({ tasks: updatedTasks, editIndex: null });
    } else {
      this.setState({ tasks: [...tasks, { name: taskName, assignee, description }] });
    }
    this.setState({ taskName: '', assignee: '', description: '', addTask: false });
  };

  handleEditTask = (index) => {
    const { tasks } = this.state;
    this.setState({
      addTask: true,
      taskName: tasks[index].name,
      assignee: tasks[index].assignee,
      description: tasks[index].description,
      editIndex: index,
    });
  };

  handleDeleteTask = (index) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    this.setState({ tasks: updatedTasks });
  };

  render() {
    const { tasks, addTask, taskName, description, assignee, editIndex } = this.state;

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
                    <Input
                      label='Assigned To Person'
                      type='text'
                      placeholder='Assignee'
                      value={assignee}
                      onChange={(e) => this.setState({ assignee: e.target.value })}
                    />
                    <Button onClick={this.handleAddTask} label={editIndex !== null ? 'Edit Task' : 'Add Task'} />
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
