import { Checkbox, Switch } from "@headlessui/react";
import { useState } from "react";

export function AddTodo({onSubmit}){
    const [name, setName] = useState("");
    const [completed,setCompleted] = useState(false); 
    const [enabled, setEnabled] = useState(false)

    const handleSubmit = (e) =>{
       e.preventDefault();
       onSubmit({name,completed});  
    };

    return(
        <form onSubmit={handleSubmit}
               className="flex flex-col gap-2 rounded  " 
        >
        <label className="flex items-center justify-between w-full">
                <div>
                Name:
                </div>
                
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border rounded-lg border-black focus:outline-blue-500"
                />
            </label>

            <label className="flex items-center justify-between w-full">
                <div>
                Completed:
                </div>
                <Switch
      checked={completed}
      onChange={setCompleted}
      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
    </Switch>
                {/* <input
                  type= "checkbox"
                  value={completed}
                  onChange={e => setCompleted(e.target.value)}
                /> */}
            </label>
            <div className="flex  justify-between w-full"> 
            <button
                className="px-2 py-0.5 rounded-md bg-gray-500 text-white hover:bg-gray-700 hover:px-2 hover:py-2" 
                type="reset" >
                Cancel
            </button>
            <button
                className="px-2 py-0.5 rounded-md bg-gray-500 text-white hover:bg-gray-700 hover:px-2 hover:py-2" 
                type="submit"
            >
                Save
            </button>
            </div>
        </form>
    );
}