import React, { useContext, useEffect, useRef, useState } from 'react'
import { TodoContext } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
    const inputRef = useRef();
    const { updateTodo, deleteTodo, completed } = useContext(TodoContext);
    const [edit, setEdit] = useState(false);
    const [msg, setMsg] = useState(null);
    const [done, setDone] = useState(todo.isComplete);
    useEffect(() => {
        completed(todo.id, done)
    }, [done])
    const handleChange = function () {
        if (msg != null) {
            updateTodo(todo.id, msg)
        }
        setEdit(!edit);
    };
    const handleDelete = function () {
        deleteTodo(todo.id);
    }
    const handleInput = function (e) {
        setMsg(e.target.value);
    }
    return (
        <div className='text-center m-4'>
            <input className='mr-3' type='checkbox' defaultChecked={todo.isComplete} onChange={() => { setDone(done => !done) }} />
            {todo.isComplete ?
                <input className=' line-through bg-green-300 border border-black rounded p-2 mr-3' ref={inputRef} defaultValue={todo.msg} type='text' readOnly={!edit} onChange={handleInput} /> :
                <input className='border border-black rounded p-2 mr-3' ref={inputRef} defaultValue={todo.msg} type='text' readOnly={!edit} onChange={handleInput} />}
            {edit ? <button disabled={todo.isComplete} className='mr-2 cursor-pointer border border-black rounded p-1' onClick={
                handleChange}>Save</button> : <button disabled={done} className='mr-2 cursor-pointer border border-black rounded p-1' onClick={() => {
                    setEdit(!edit); inputRef.current.focus()
                }}>Edit</button>}
            <button className='mr-2 cursor-pointer border border-black rounded p-1' onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default TodoItem
