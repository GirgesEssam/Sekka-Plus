import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seat from "./Seats"; 


export default function Chair(): React.ReactElement {
  const navigate = useNavigate();
  const totalSeats = 88;
  const [selected, setSelected] = useState<number[]>([]);
  const booked = [10, 11, 25, 26, 40, 41]; 

  const toggleSeat = (num: number): void => {
    if (booked.includes(num)) return;
    setSelected(prev => 
      prev.includes(num) ? prev.filter(s => s !== num) : [...prev, num]
    );
  };

  const renderRows = () => {
    const rows = [];
    let seatNum = 1;

    for (let i = 0; i < totalSeats / 4; i++) {
      rows.push(
        <div key={i} className="flex items-center justify-between mb-2 w-full max-w-[350px] mx-auto">
          {/* الجانب الأيسر */}
          <div className="flex gap-1">
            {[1, 2].map(() => {
              const num = seatNum++;
              return (
                <Seat 
                  key={num} 
                  number={num} 
                  status={booked.includes(num) ? "booked" : selected.includes(num) ? "selected" : "available"}
                  onClick={() => toggleSeat(num)}
                />
              );
            })}
          </div>

          <div className="text-[10px] text-gray-300 font-bold uppercase rotate-90">Aisle</div>

          {/* الجانب الأيمن */}
          <div className="flex gap-1">
            {[1, 2].map(() => {
              const num = seatNum++;
              return (
                <Seat 
                  key={num} 
                  number={num} 
                  status={booked.includes(num) ? "booked" : selected.includes(num) ? "selected" : "available"}
                  onClick={() => toggleSeat(num)}
                />
              );
            })}
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Cairo'] mt-15">
      <header className="bg-red-800 text-white p-6 rounded-b-[30px] shadow-lg">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-xl font-black italic">COACH 01</h1>
          <div className="w-10"></div>
        </div>
      </header>
        <div className="w-[50%] m-auto py-10 bg-white mt-2 flex justify-center items-center">
            <div className="w-5 h-5 rounded-[5px] bg-white border-gray-700 border-[1px]"></div>
            <h2 className="text-[22px] text-[#383838] mr-10 ml-1">Available</h2>
            <div className="w-5 h-5 rounded-[5px] bg-red-600 border-gray-700 border-[1px]"></div>
            <h2 className="text-[22px] text-[#383838] mr-10 ml-1">Selected</h2>
            <div className="w-5 h-5 rounded-[5px] bg-black border-gray-700 border-[1px]"></div>
            <h2 className="text-[22px] text-[#383838]  ml-1">Booked</h2>
        </div>
      {/* منطقة الكراسي */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50/50 mt-4 shadow-inner">
        <div className="flex flex-col items-center">
           {renderRows()}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-bold text-gray-300">Selected: <span className="text-[#b32121]">{selected.length}</span></div>
          <div className="text-xl font-black">{selected.length * 150} EGP</div>
        </div>
        <button 
          disabled={selected.length === 0}
          onClick={() => navigate("/passenger")}
          className="w-full py-4 bg-[#b32121] disabled:bg-gray-300 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 uppercase"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}