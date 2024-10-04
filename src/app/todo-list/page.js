"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AddTodo } from "./form";

export default function TodoPage() {
  const [todoList, setTodoList] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

 
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        setTodoList(response.data);
      } catch (err) {
        console.error(err);
      } 
    };
    

  useEffect(()=>{
    fetchTodos();
    },[]);
  
  const handleCheck = async (todoItem) => {
    await axios.put(`http://localhost:5000/todos/${todoItem._id}`,{
      name : todoItem.name,
      completed : !todoItem.completed
    });
    await fetchTodos();
    // .then(() => {
    //   const newTodoList = todoList.map (todo => {
    //     return todo._id === todoItem._id
    //     ? {
    //       ...todo,
    //       completed : !todoItem.completed,
    //     }
    //     : todo;
    //   });
    //   setTodoList(newTodoList);
    // });
  };

  const handleAddTodo = async (todoData) => {
    await axios.post("http://localhost:5000/todos",todoData);
    // .then((response) =>{
    //   setTodoList([...todoList,response.data]);
    //   setIsOpen(false);
    await fetchTodos();
    setIsOpen(false);
    };
   
  
 const handleDelete = async (todoData)=>{
   await axios.delete(`http://localhost:5000/todos/${todoData._id}`);
   await fetchTodos();
    // .then(()=>{
    //     setTodoList(todoList.filter(todo =>{
    //         return todo._id !== todoData._id;
    //     }));
    // });
  };
    return(
      <div className="w-screen h-screen ">
        <div className="p-4 mx-auto my-20 w-[70vw] shadow-md ">
          <h1 className="text-2xl text-center">Todo List</h1>
          {/* <button className="border rounded px-2 py-1 bg-gray-200 hover:bg-gray-400">Add todo</button> */}
          <button className="border fixed rounded-full p-2 shadow-2xl z-20 bottom-10 right-10 animate-bounce"
           onClick={() => setIsOpen(true)}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={2.5} stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</button>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-transparent">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                  <DialogTitle className="font-bold">Add a new Todo item</DialogTitle>
                  <AddTodo onSubmit={handleAddTodo}/>
                </DialogPanel>
              </div>
          </Dialog>
          {
            todoList.map(todoItem => (
                <div key={todoItem._id} className="flex items-center pb-2 border-b-2">
                      <Checkbox
                checked={todoItem.completed}
                onChange={() =>handleCheck(todoItem)}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500 mr-2"
              >
                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Checkbox>
                    <span className="grow">{todoItem.name} </span>
             
            <button className=" border-2  text-red-500 rounded border-1 hover:bg-slate-100 px-1 mt-2 py-0.5"
            onClick={()=>handleDelete(todoItem)}
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          

            </button>
            </div> 
            ))
          }
        </div>
        </div>
    );
}