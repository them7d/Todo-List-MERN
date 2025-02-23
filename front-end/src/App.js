import React, {useEffect, useState} from "react"
import Task from "./components/task"
import PlusIcon from "./components/plus_icon"
import pathToBacknd from "./path_To_Backend.js"
function App() {
  
  // initialize path to backend
  const pathToBackend = pathToBacknd();

  // request all tasks from the backend and store them in tasks
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await fetch(pathToBackend,{
          method:"GET",
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setTasks(data);
      }catch(error){
        console.log(error);
      }
    }
    fetchData();
  },[]);

  // add new task to data base
  const handleAddTask = async ()=>{
    const task = {title: "", completed: false};
    try{
      const response = await fetch(pathToBackend,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      })
      if(response.ok){
        const addedTask = await response.json();
        // Use the functional form of setTasks to ensure the latest state
        setTasks((prevTasks) => [...prevTasks, addedTask]);
      }
    }catch(error){
      console.log(error);
    }
  }

  // update task
  // task param - Object
  //            - title : String
  //            - id    : String
  //            - completed : Boolean
  const onUpdate = async (task)=>{
    try{
      await fetch(pathToBackend,{
        method:"PUT",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      })
    }catch(error){
      console.log(error);
    }
  }
  
  // add delete request to server
  const handleDelete = async (task)=>{
    try{
      const response = await fetch(pathToBackend,{
        method:"DELETE",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      })
      if(response.ok){        
        setTasks(prevtasks=>prevtasks.filter((t)=>t._id !== task._id));
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="bg-slate-700 text-white">
      <header className="App-header mx-auto text-center mt-5 mb-8">
        <h1 className="text-3xl font-bold">taskList</h1>
      </header>
      <div className="tasks-container mx-auto max-w-[1000px]">
        {tasks.length === 0 && <div className="text-center font-bold my-4 text-gray-400">No tasks found</div>}
        {tasks.map((child, index) => {
          return <Task key={child._id} child={child} onUpdate={onUpdate} onDelete={handleDelete}/>
        })} 
        <div className="addTask flex mx-3 shadow-md rounded-md bg-gray-500 hover:bg-gray-700">
          <button className="flex py-3 w-full items-center justify-center" onClick={handleAddTask}>
            <div className="mx-2 flex items-center mb-[-2px]">
                <PlusIcon x={20} y={20} fill={"#fff"}/>
              </div>
              <div>Add Task</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
