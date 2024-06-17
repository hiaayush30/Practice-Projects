import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext';

const Form = () => {
    const {addTodo}=useContext(TodoContext);
    const [msg,setMsg]=useState("")
    const handleSubmit=function(e){
     e.preventDefault();
     if(msg!=""){
     addTodo(msg);
    }else{
        alert('Enter something first!')
    }
     setMsg("");
    }

    const handleChange=function(e){
         setMsg(e.target.value);
    }
  return (
    <form className='text-center m-2'>
        <div className='font-bold m-3 bg-blue-400'>Todo Manager</div>
        <div>
        <input onChange={handleChange} value={msg} type='text' placeholder='Enter todo here' className='mr-3 pt-2 pb-2 border rounded pl-2'/>
        <button className='border p-1 rounded border-black' onClick={handleSubmit}>Add</button>
        </div>
    </form>
  )
}

export default Form
