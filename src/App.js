import './App.css';
import React, {useState} from 'react';

function App() {
  const [task, setTask] = useState("");
  const [taskArray, setTaskArray] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      name: task,
      completed: false
    };
    setTaskArray([...taskArray, newTask]);
    setTask("");
  };

  const updateTask = (taskIndex) => {
    const selectedTask = {...taskArray[taskIndex]};
    selectedTask.completed = !selectedTask.completed;
    console.log(selectedTask);

    setTaskArray([...taskArray.slice(0,taskIndex), selectedTask].concat(taskArray.slice(taskIndex + 1)));
  };

  const killTask = (taskIndex) => {
    const cleanedTasks = taskArray.filter((task, index) => {
      return taskIndex !== index;
    });
    setTaskArray(cleanedTasks);
  };

  const DisplayTasks = (props) => {
    const {taskArray} = props;
    return taskArray.map((task, index) => {
      return (
      <div className="d-flex fs-4 mt-1">
        <div className="col-3 d-flex align-items-start ">
          <input class="form-check-input me-1" type="checkbox" checked={task.completed} aria-label="..." onClick={() => updateTask(index)}>
          </input> <span style={{ textDecoration: task.completed && 'line-through' }}>{task.name}</span>
        </div>
        <button className="btn btn-danger" onClick={() => killTask(index)}>Delete</button>
      </div>
      // <div key={index} className="row d-flex mx-auto" >
      //   <div className="col-4">
      //   <p className="fs-4">{task.name}</p>
      //   </div>
      // </div>
      );
    });
  };

  return (
    <div className="App">
      <div className="container">
        <form className="col-6" onSubmit={addTask}>
          <div className="row d-flex mx-auto justify-content-between mt-3">
            <div className="input-group mt-3">
              <lable htmlFor="taskName">Add Task: </lable>
              <input type="text" className="form-control" name="taskName" value={task} onChange={(e) => setTask(e.target.value)}></input>
              <div className="input-group-append">
                <button className="btn btn-primary">Add</button>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-4">
          <DisplayTasks taskArray={taskArray}/>
        </div>
      </div>
    </div>
  );
}

export default App;
