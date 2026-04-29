import React from 'react'
// import axios from 'axios'
import bgimg from '../assets/WhatsApp Image 2026-04-03 at 7.41.56 PM.jpeg'
import Card from "./Card"
import Work from './Work'
import img1 from "../assets/8-removebg-preview.png"
import img2 from "../assets/6-removebg-preview.png"
import img3 from "../assets/2.jpeg"
import img4 from "../assets/4-removebg-preview.png"
import img5 from "../assets/3-removebg-preview.png"
import img6 from "../assets/5-removebg-preview.png"
import img7 from "../assets/WhatsApp1 Image 2026-04-05 at 12.56.07 AM.jpeg"
import img8 from "../assets/WhatsApp3 Image 2026-04-05 at 8.35.05 PM.jpeg"
import img9 from "../assets/WhatsApp Image 2026-04-05 at 8.35.05 PM.jpeg"
import {FaPlus} from "react-icons/fa"
const Home = () => {
    const daily = 0;
    const users = 0;
    const stations = 0;

    const cards=[
        {id:1,postName:"Modern Trains",postTitle:" Travel With Modern And Comfortable Trains Across Egypt ",c:<img src={img1} alt="" className='bg-cover bg-center w-full h-full'/>,},
        {id:2,postName:"Fast Booking",postTitle:"Book Your Train Ticket In Secounds",c:<img src={img2} alt="" className='object-contain bg-center  w-[200px] h-full '/>},
        {id:3,postName:"Secure Payment",postTitle:"Your Payment And Personal Data Are Protected",c:<img src={img3} alt="" className='bg-cover bg-center  w-full h-full'/>},
    ];
    const postList =cards.map((card) =>{
            return <Card id={card.id} postName={card.postName} postTitle={card.postTitle}>{card.c}</Card>;
        });

    const works=[
        {id:1,postName:"Search For Your Trip",postTitle:" Lorem ipsum dolor sit amet consectetur adipisicing elit. ",c:<img src={img4} alt="" className='w-[250px] object-contain bg-center '/>,},
        {id:2,postName:"Select Your Seat",postTitle:"Lorem ipsum dolor sit amet.",c:<img src={img5} alt="" className='object-center bg-cover bg-center  w-[250px]  '/>},
        {id:3,postName:"Pay And Receive Your Tickets",postTitle:"Your Payment And Personal Data Are Protected",c:<img src={img6} alt="" className='bg-contain bg-center  w-[80px]  object-center'/>},
    ];

    
    const workList =works.map((work) =>{
        return <Work id={work.id} postName={work.postName} postTitle={work.postTitle}>{work.c}</Work>;
    });

  return (
    <div>
        {/* Start Hero Section */}
        <div className=" w-full h-[100vh]  bgimg bg-cover bg-center flex justify-center items-end pb-5 shadow-2xl mt-16" style={{backgroundImage:`URL(${bgimg})`}}>
            <div>
                <h2 className='sm:text-[40px] font-bold text-white text-[20px] text-center'>Book Your Train Ticket Easily And Secureiy</h2>
                <p className='text-center py-[30px] sm:text-[17px] text-gray-200 font-[400] text-[15px]'>Travel Smarter With Egyption National Railways And Enjoy A Modern Booking Experience</p>
            </div>
        </div>
        {/* End Hero Section */}

        {/* Start Features Section */}
        <div className='w-full h-auto mt-40 sm:h-[120vh]' >
            <h2 className='text-[#7a1618] text-center text-[45px] font-[700] py-2'>Why Choose ENR TicKets</h2>
            <div className='w-[80%] block h-auto m-auto  justify-between items-center my-10 sm:flex sm:h-[350px] '>
                {postList}
            </div>
            <h2 className='text-[#7a1618] text-center text-[45px] font-[700] py-4'>How It Works</h2>
            <div className='w-[80%] sm:h-[150px] m-auto block justify-between items-center my-10 sm:flex h-auto'>
                {workList}
            </div>
        </div>
        
        {/* End Features Section */}

        {/* Start Users Section */}
        <div className='w-[80%] sm:h-[60vh] m-auto sm:flex relative mt-20 block h-auto '>
            <div className='w-full sm:w-[65%] sm:h-[60vh] h-auto '>
                <div className='w-full h-auto  flex justify-between items-center sm:h-[35%]'>
                    <div className='w-[30%] h-full '>
                        <h2 className='text-center pt-8 flex justify-center items-center text-[40px] text-amber-500 font-bold'>{daily}<span className='text-[20px]'><FaPlus/></span></h2>
                        <p className='text-center text-[#6b6b6bc2] text-[20px]'>Daily Trips</p>
                    </div>
                    <div className='w-[1px] h-[60px] bg-[#cacaca] shadow'></div>
                    <div className='w-[30%] h-full '>
                        <h2 className='text-center pt-8 flex justify-center items-center text-[40px] text-amber-500 font-bold'>{users}<span className='text-[20px]'><FaPlus/></span></h2>
                        <p className='text-center text-[#6b6b6bc2] text-[20px]'>Users</p>
                    </div>
                    <div className='w-[1px] h-[60px] bg-[#cacaca] shadow'></div>
                    <div className='w-[30%] h-full '>
                        <h2 className='text-center pt-8 flex justify-center items-center text-[40px] text-amber-500 font-bold'>{stations}<span className='text-[20px]'><FaPlus/></span></h2>
                        <p className='text-center text-[#6b6b6bc2] text-[20px]'>Stations Across Egypt</p>
                    </div>
                </div>
                <div className='w-full h-auto sm:h-[65%]'>
                    <h2 className='text-[#2a2a2a] text-[30px]  sm:text-[40px] sm:pl-18.5 sm:pt-5 pt-7 pb-3'>Get The <span className='font-bold text-red-700'>ENR <span>TICKET</span></span> App</h2>
                    <p className='text-[#474747c2] text-[20px] sm:text-[22px] sm:pl-18.5 pt-2 pb-3'>Book Tickets Faster Using Our Mobile App</p>
                    <div className='flex justify-around items-center w-full sm:w-[60%] mt-5 sm:ml-10 '>
                        <img src={img8} alt=""  className='w-[200px] sm:ml-5 rounded-[8px] shadow-2xl'/>
                        <img src={img9} alt="" className='w-[200px] rounded-[8px] shadow-2xl ml-2'/>
                    </div>
                </div>
            </div>
            <div style={{backgroundImage:`url(${img7})`}} className='w-[260px] h-[520px] sm:absolute bg-cover object-center right-20 rounded-[45px] shadow-2xl m-auto my-5 sm:my-0'>

            </div>
        </div>
        {/* End Users Section */}

    </div>
  )
}

export default Home