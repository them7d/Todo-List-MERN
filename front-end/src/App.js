import React, {useEffect, useState} from "react"
import Task from "./components/task"
import PlusIcon from "./components/plus_icon"
function App() {
  
  // request to get all tasks
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        let response = await fetch("http://localhost:3025/task",{
          method:"GET",
          headers:{
            'Content-Type': 'application/json'
          }
        });
        let data = await response.json();
        setTasks(data);
      }catch(error){
        console.log(error);
      }
    }
    fetchData();
  },[]);

  // add new task to data base
  const handleAddTask = async (e)=>{
    e.preventDefault();
    const task = {name: e.target.value, completed: false};
    try{
      const response = await fetch("http://localhost:3025/task",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      })
      if(response.ok){
        const addedchildern = await response.json();
        setTasks((prevChildrens)=>[...prevChildrens, addedchildern]);
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
      const response = await fetch("http://localhost:3025/task",{
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

  return (
    <div className="bg-slate-700 text-white">
      <header className="App-header mx-auto text-center mt-5 mb-8">
        <h1 className="text-3xl font-bold">taskList</h1>
      </header>
      <div className="tasks-container mx-auto max-w-[1000px]">
        {tasks.map((child, index) => {
          return <Task key={index} child={child} onUpdate={onUpdate}/>
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
