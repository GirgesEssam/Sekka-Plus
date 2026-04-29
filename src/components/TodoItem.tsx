import React from 'react'

interface TodoItemProps{
    todoText:string;
}
const TodoItem = ({todoText}:TodoItemProps) => {
  return (
    <div className='bg-green-600 text-gray-800 text-lg rounded-lg py-2 my-1 text-center hover:bg-gray-800 hover:text-green-600 transition-0.5'>
        {
            <div>{todoText}</div>
        }
    </div>
  )
}

export default TodoItem