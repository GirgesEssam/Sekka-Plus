import React from 'react'


type WorkProps ={
  id:number;
  postName:string;
  postTitle:string;
  children:React.ReactNode
}
const Work = ({postName,postTitle,children}:WorkProps) => {

  return (
    <div className='rounded-[10px] shadow-2xl overflow-hidden flex justify-between items-center h-full w-full sm:w-[32%] mt-15 sm:m-0'>
        <div className='w-[30%] h-full flex justify-center items-center '>
            {children}
        </div>
        <div className='w-[1px] h-[65px] bg-[#cacaca] shadow'></div>
        <div className='w-[72%] rounded-[10px] h-full'>
            <h2 className='text-[#333333] font-bold text-center text-[18px] pt-8'>{postName}</h2>
            <p className='text-[#5252528c]  text-center text-[17px] w-[80%] m-auto pt-3'>{postTitle}</p>
        </div>
    </div>
  )
}

export default Work