import { useEffect, useState } from 'react'
import { TodoContextProvider } from './context/TodoContext'
import Form from './components/Form'
import TodoItem from './components/TodoItem'

function App() {
  const [todos,setTodos]=useState([])
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem('todos'));
    if(todos.length>0){
      setTodos(todos);
    }
  },[])
  
  const deleteTodo=function(id){
    setTodos(todos=>{
      return todos.filter(todo=>{
        return todo.id!=id
      })
    })
  }
  const addTodo=function(msg){
    setTodos(todo=>{
      return [...todo,{
        id:Date.now(),
        msg:msg,
        isComplete:false
      }]
    })
  }
  const updateTodo=function(id,msg){
   setTodos(todos=>{
    return todos.map(todo=>{
      if(todo.id==id){
        return {...todo,msg:msg}
      }
      return todo;
     })
   })
  }
  
  const completed=function(id,done){
    setTodos(todos=>{
      return todos.map(todo=>{
       if(todo.id==id){
        return {...todo,isComplete:done}
       }
       return todo
      })
    })
  }
  useEffect(()=>{
    const storeTodos=JSON.stringify(todos)
    localStorage.setItem('todos',storeTodos);
  },[todos])
  return (
    <TodoContextProvider value={{todos,updateTodo,addTodo,deleteTodo,completed}}>
      <Form/>
      {todos.map(todo=>{
         return <TodoItem todo={todo} key={todo.id} />
      })}
    </TodoContextProvider>
  )
}

export default App
