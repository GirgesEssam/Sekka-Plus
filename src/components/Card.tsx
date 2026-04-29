import React from 'react'


type CardProps ={
  id:number;
  postName:string;
  postTitle:string;
  children:React.ReactNode
}
const Card = ({postName,postTitle,children}:CardProps) => {

  return (
    <div className='w-full h-full pt-5 rounded-[10px] shadow-2xl sm:w-[32%] sm:mt-0'>
        <div className='w-full h-[62%] bg-gradient-to-r from-red-950 via-red-900 to-red-700 flex justify-center items-center'>
            {children}
        </div>
        <div className='w-full h-[38%]  rounded-[10px]'>
            <h2 className='text-[#333333] font-bold text-center text-[30px] pt-4 '>{postName}</h2>
            <p className='text-[#5f5f5f8c]  text-center text-[17px] w-[80%] m-auto pt-3'>{postTitle}</p>
        </div>
    </div>
  )
}

export default Card