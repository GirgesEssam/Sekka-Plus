import React from 'react';
import { useNavigate } from 'react-router-dom';

type Train = {
  id: number;
  name: string;
  class: string;
  from: string;
  to: string;
  fromTime: string;
  toTime: string;
  duration: string;
};

interface ResultsProps {
  data: Train[];
}

const Results: React.FC<ResultsProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleViewSeats = (id: number) => {
    // تأكد أن المسار /seats/:id معرف في App.tsx
    navigate(`/seats/${id}`);
  };

  if (data.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No trains available for the selected criteria.</p>;
  }

  return (
    <div className="space-y-6">
      {data.map((train) => (
        <div key={train.id} className="bg-white dark:bg-[#252525] p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-xl transition-shadow">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-red-600 mb-2">{train.name}</h3>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              <span className="font-semibold">{train.class}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{train.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-center">
            <div>
              <p className="text-xl font-bold dark:text-white">{train.fromTime}</p>
              <p className="text-sm text-gray-500 uppercase">{train.from}</p>
            </div>
            <div className="text-red-600">
              <i className="fa-solid fa-train"></i>
              <div className="w-16 h-[2px] bg-gray-200 mt-1"></div>
            </div>
            <div>
              <p className="text-xl font-bold dark:text-white">{train.toTime}</p>
              <p className="text-sm text-gray-500 uppercase">{train.to}</p>
            </div>
          </div>

          <button 
            onClick={() => handleViewSeats(train.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-transform active:scale-95"
          >
            View Seats
          </button>
        </div>
      ))}
    </div>
  );
};

export default Results;