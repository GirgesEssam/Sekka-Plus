import React from 'react'
import TodoItem from './TodoItem';

interface TodoListProps{
    todos:string[];
}

const TodoList = ({todos}:TodoListProps) => {
  return (
    <div className="flex flex-col w-1/4 ps-4 ">
        { 
            todos.map((todo) => (
               <TodoItem todoText={todo} />
            ))
        } 
    </div>
  )
}

export default TodoList