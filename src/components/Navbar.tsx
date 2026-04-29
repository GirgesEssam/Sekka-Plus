import NavLink from "./NavLink";
import {Link} from "react-router";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const navLinks =[
   {
    text:"Home",
    href:"/home"
   },
   {
    text:"Book Tickets",
    href:"/book"
   },
   {
    text:"My Bookings",
    href:"/my"
   },
   {
    text:"Settings",
    href:"/settings"
   },
   {
    text:"Login",
    href:"/login",
    className:"px-5 py-[10px] bg-red-700 text-white rounded-[10px] font-[900] hover:bg-white hover:text-red-700 transition duration-300 "
   },
   {
    text:"Sign Up",
    href:"/sign",
    className:"px-4 py-[10px] bg-white text-red-700 rounded-[10px] font-[900] hover:bg-red-700 hover:text-white transition duration-300 "
   },
]

 function Navbar() {
   const [menuOpen,setMenuOpen]=useState(false);
    return(
       <nav className="fixed  top-0 left-0 z-50 w-full flex justify-around items-center py-3 px-6 bg-gradient-to-r from-red-950 via-red-900 to-red-700">
        <div className="text-white text-3xl ">
            <Link to="/home" className="text-red-700 font-bold">ENR<span className="text-white"> TICKETS</span></Link>
        </div>
        <button className="text-white text-3xl sm:hidden hover:text-red-600 transition duration-200" onClick={()=>setMenuOpen(!menuOpen)}>
            <FaBars/>
        </button>
         <ul className={`absolute sm:static top-[70px] left-0 w-full sm:w-auto  sm:bg-none bg-gradient-to-r from-red-950 via-red-900 to-red-700 sm:bg-transparent flex flex-col sm:flex-row items-center gap-6 sm:py-0 ${menuOpen ? "block" :"hidden"} sm:flex `}>
            {
                navLinks.map(
                    (link)=>(<NavLink text={link.text} href={link.href} className={link.className}/>)
                )
            }
         </ul>
       </nav>
    );
 }

 export default Navbar;