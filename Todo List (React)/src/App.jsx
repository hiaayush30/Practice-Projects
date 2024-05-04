//To Do list using React and Tailwind (used uuid)
import React, { useEffect, useReducer, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [todos, setTodo] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [showFinished, setShowFinished] = useState(true)
    const inputRef = useRef();
    const todoRef = useRef();

    function toggleFinished() {
        setShowFinished(e => !e)
    }

    function handleEdit(e) {
        const id = e.target.name;
        console.log(id);
        const target = todos.filter((element) => {
            return element.id == e.target.name
        })
        console.log(target);
        inputRef.current.value = target[0].input
        handleDelete(e);
    }
    function handleDelete(e) {
        const id = e.target.name;
        const newTodos = todos.filter((element) => {
            return element.id != id;
        });
        setTodo(newTodos);
    }
    function handleDone(e) {
        // todoRef.current.style.textDecorationLine = "line-through"; se bhi kar sakte the(if else condition lagake)
        const id = e.target.name;
        const updatedTodos = todos.map((e) => {
            if (e.id == id) {
                return { ...e, isComplete: !e.isComplete }
            }
            return e;
        })
        setTodo(updatedTodos);
    }

    function handleSubmit() {
        const input = inputRef.current.value;
        if (input.trim() !== "") {   //can also use 'disabled' property of button
            setTodo(prevTodo => [...prevTodo, {
                id: uuidv4(),
                isComplete: false,
                input: input
            }]);  //setter fn of setState 
            alert("Todo added!");
            inputRef.current.value = "";
        }
        else {
            alert("Enter the Todo first!")
        }
    }

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("todos", JSON.stringify(todos))
        }
        else {
            setMounted(true);
        }
    }, [todos])

    useEffect(() => {
        const myTodos = localStorage.getItem("todos")
        if (myTodos) {
            let todos = JSON.parse(localStorage.getItem("todos"));
            setTodo(todos);
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className='container mx-auto my-5 rounded-xl bg-violet-500  p-5 min-h-[80vh]'>   {/*or min-h-screen to get full screen height*/}

                <div className="addTodo my-5 ">
                    <h2 className="addTodo text-lg font-bold">Add a Todo</h2>
                    <input ref={inputRef} className='w-80 p-1 rounded-sm' type='text' placeholder='Enter Todo here'></input>
                    <button onClick={handleSubmit} className='bg-violet-600 hover:bg-violet-700 p-1 rounded-lg text-white mx-2 text-sm hover:font-bold'>Submit</button>
                </div>
                <div className='flex gap-1'>
                    <input type='checkbox' checked={showFinished} onChange={toggleFinished}></input>
                    <div>Show Finished</div>
                </div>
                <h2 className='text-lg font-bold'>Your Todos</h2>
                <div className="todos flex flex-col gap-3">
                    {todos.length == 0 ? "No Todos here!" : todos.map((e) => {
                        if(e.isComplete && showFinished || !e.isComplete){
                        return (
                            <div key={e.id} className="todo flex w-3/4 justify-between">
                                <div className='flex max-w-screen'>
                                    <input name={e.id} className='m-1' type='checkbox' onClick={handleDone} />
                                    {e.isComplete ? <div ref={todoRef} className="line-through ">{e.input}</div> : <div ref={todoRef}>{e.input}</div>}
                                </div>
                                <div className="buttons flex h-full">
                                    {!e.isComplete && <button name={e.id} onClick={handleEdit} className='bg-violet-600 hover:bg-violet-700 p-1 rounded-lg text-white mx-1 text-sm hover:scale-125'>Edit</button>}
                                    <button name={e.id} onClick={handleDelete} className='bg-violet-600 hover:bg-violet-700 p-1 rounded-lg text-white mx-1 text-sm hover:scale-125'>Delete</button>
                                </div>
                            </div>
                        )}
                    })}
                </div>
            </div>
        </>
    )
}
export default App
