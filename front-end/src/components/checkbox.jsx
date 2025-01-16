import { useState } from "react";
import Svg from "./mark.jsx"

export default function ChechBox({w,x,y,onChange,status}){
  const [checked, setChecked] = useState();
  const handleChange =(e)=>{
    onChange(e.target.checked);
  }
    return(
        <div className={`${w} inline-flex items-center`}>
        <label className="w-full h-full flex items-center cursor-pointer relative">
          <input checked={status} onChange={handleChange} type="checkbox" className="w-full h-full peer cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check-custom-style" />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Svg x={x} y={y} className="mark-img" alt="mark"/>
          </span>
        </label>
      </div>
    );
}