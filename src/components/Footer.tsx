import {FaPhone} from "react-icons/fa";
import {Link} from "react-router";
import { FaEnvelope } from "react-icons/fa";

function Footer() {

const phone ="123-456-7890";
const email="info@enrtickets.com";

    return(
        <div className="block justify-around items-center w-full  bg-gradient-to-r from-red-950 via-red-900 to-red-700 sm:flex">
           <div className="text-white text-4xl py-9 w-full sm:w-[30%] m-auto sm:m-0">
            <div className="text-center m-auto">
                <Link to="/home" className="text-red-700 font-bold">ENR<span className="text-white"> TICKETS</span></Link>
            </div>
            
            <p className="text-center py-[30px] text-[17px] text-[#ffffffaa] font-[300] my-[-15px]">Egyption National Radways Booking System</p>
           </div>
           <div className="w-[80%] h-auto py-9 sm:w-[24%] m-auto sm:m-0">
                <div className="flex justify-between items-center">
                    <Link to="/home" className=" font-bold text-[18px] hover:text-red-700 transition duration-300 delay-50 text-white">Home</Link>
                    <div className="w-[1px] h-[20px] bg-[#ecebebcb]"></div>
                    <Link to="/settings" className=" font-bold text-[18px] hover:text-red-700 transition duration-300 delay-50 text-white">Settings</Link>
                    <div className="w-[1px] h-[20px] bg-[#ecebebcb] "></div>
                    <a href={`tel:${phone}`} className="flex  items-center gap-2 group"><FaPhone className="rotate-90 text-[#ffffffbf] group-hover:text-red-700 transition-colors duration-300"/><span className="text-[#ffffffbf] group-hover:text-red-700 transition-colors duration-300">{phone}</span></a>
                </div>
                <div>
                    <a href={`mailto:${email}`} className="flex  items-center gap-2 mt-4 group"><FaEnvelope className="text-[#ffffffbf] group-hover:text-red-700 transition-colors duration-300"/><span className="text-[#ffffffbf] group-hover:text-red-700 transition-colors duration-300">{email}</span></a>
                </div>
           </div>
           <div className="w-[30%] h-[50px]"></div>
        </div>
    )
}

export default Footer