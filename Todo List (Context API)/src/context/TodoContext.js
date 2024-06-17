import { createContext, useContext } from "react";

export const TodoContext=createContext({
    todos:[
        // {id,
        // msg,
        // isComplete}
    ],
    updateTodo:()=>{},
    deleteTodo:()=>{},
    addTodo:()=>{},
    completed:()=>{}
})

export const TodoContextProvider=TodoContext.Provider