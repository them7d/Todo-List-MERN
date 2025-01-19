import React, {useState, useRef, useEffect} from "react"
import { debounce } from "lodash"
import CheckBox from "./checkbox"
import Trash from "./trash"
import Edit from "./edit"
import Svg from "./mark";
export default function Task(props){
  
  // editting state
  const [isEditing, setIsEditing] = useState(false);
  
  // title of task
  const [content, setContent] = useState(props.child.title);

  // status of the task
  const [completed, setCompleted] = useState(props.child.completed); 

  // Reference input
  const input = useRef(null);
  
  // handle edit mode
  function handleIsEditing(){
    setIsEditing(true);
  }
  
  // update title on Change
  function updateTitle(e){
    setContent(e.target.value);
  }

  // add latency to request to make it more smooth
  const debounceUpdate = debounce((task)=>{
    let onUpdate = props.onUpdate;
    if(onUpdate){
      onUpdate(task);
    }
  },500);

  // handle save button click
  function handleSaveChanges(){
    let newTitle = input.current.value;
    let onUpdate = props.onUpdate;
    setContent(newTitle);
    setIsEditing(false);
    debounceUpdate({id:props.child._id, title:newTitle, completed:completed});
  }

  // handle completed check
  const handleCompleted = (value)=>{
    setCompleted(value);
    debounceUpdate({id:props.child._id, title:content, completed:value});
  }
  
  // handle delete button
  const handleDelete = ()=>{
    let onDelete = props.onDelete;
    if(onDelete){
      onDelete({
        _id: props.child._id
      });
    }
  }
  // icons Size of tasks
  let icons_size = 15;
  
  // return two modes of task: editting and reading
  return (isEditing ?
    (
      <div className="task flex bg-slate-900 rounded-lg my-4 mx-3">
        <div className="max-w-14 mx-4 flex items-center">
          <CheckBox status={completed} w={"w-6 h-6"} x={icons_size} y={icons_size} onChange={handleCompleted}/>
        </div>
        <div className="flex items-center flex-grow">
          <input type="text" ref={input} value={content} onChange={updateTitle} className="text-white w-full bg-transparent focus-visible:outline-none"/>
        </div>
        <div className="control flex">
          <button className="m-3 p-2 rounded-sm bg-green-600" onClick={handleSaveChanges}>
            <Svg w={"w-6 h-6"} x={icons_size} y={icons_size}/>
          </button>
        </div>
      </div>
    ):(
      <div className="task flex bg-slate-900 rounded-lg my-4 mx-3">
        <div className="max-w-14 mx-4 flex items-center">
          <CheckBox status={completed} w={"w-6 h-6"} x={icons_size} y={icons_size} onChange={handleCompleted}/>
        </div>
        <div className="flex items-center flex-grow">
          {content}
        </div>
        <div className="control flex">
          <button className="m-3 p-2 rounded-sm bg-orange-400" onClick={handleIsEditing}>
            <Edit x={icons_size} y={icons_size}/>
          </button>
          <button className="m-3 p-2 rounded-sm bg-red-600" onClick={handleDelete}>
            <Trash x={icons_size} y={icons_size}/>
          </button>
        </div>
      </div>
    )
  )
    
}