import React from 'react';

type SeatStatus = "available" | "selected" | "booked";

interface SeatProps {
  number: number;
  status: SeatStatus;
  onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ number, status, onClick }) => {
  const statusColors = {
    available: {
      svg: "fill-white stroke-gray-400 hover:fill-red-50 hover:stroke-[#b32121]",
      text: "text-gray-600",
      container: "cursor-pointer"
    },
    selected: {
      svg: "fill-[#b32121] stroke-[#b32121] drop-shadow-md",
      text: "text-white",
      container: "cursor-pointer scale-105"
    },
    booked: {
      // تم تغيير الألوان هنا للأسود
      svg: "fill-black stroke-black opacity-90", 
      text: "text-white", // وخلينا النص أبيض عشان يبان فوق الأسود
      container: "cursor-not-allowed"
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-200 ${statusColors[status].container}`}
      onClick={status !== "booked" ? onClick : undefined}
    >
      <svg width="55" height="55" viewBox="0 0 80 70" className={`${statusColors[status].svg} transition-colors duration-300`}>
        <rect x="4" y="22" width="8" height="22" rx="3" />
        <rect x="14" y="10" width="52" height="42" rx="10" />
        <rect x="68" y="22" width="8" height="22" rx="3" />
        <path d="M18 52 L14 62 L66 62 L62 52 Z" fillOpacity="0.8" />
      </svg>
      <span className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[12px] pointer-events-none ${statusColors[status].text}`}>
        {number}
      </span>
    </div>
  );
};

export default Seat;