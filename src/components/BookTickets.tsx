import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Filters from './Filters'
import Results from './Results'
import img from "../assets/WhatsApp Image9 2026-04-01 at 7.14.56 AM.jpeg"

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

type FiltersType = {
  class?: string;
  time?: string;
};

const MOCK_TRAINS: Train[] = [
  { id: 1, name: "Talgo Train", class: "VIP", from: "Cairo", to: "Sohag", fromTime: "08:00 AM", toTime: "01:00 PM", duration: "5h" },
  { id: 2, name: "Special Service VIP", class: "First Class", from: "Alexandria", to: "Aswan", fromTime: "10:30 AM", toTime: "04:30 PM", duration: "6h" },
  { id: 3, name: "Spanish Express", class: "VIP", from: "Cairo", to: "Sohag", fromTime: "02:00 PM", toTime: "08:00 PM", duration: "6h" },
  { id: 4, name: "Russian Dynamic", class: "Third Class", from: "Port Said", to: "Cairo", fromTime: "09:00 PM", toTime: "01:00 AM", duration: "4h" },
  { id: 5, name: "Talgo Train", class: "Third Class", from: "Asyat", to: "Sohag", fromTime: "09:00 PM", toTime: "01:00 AM", duration: "4h" },
];

const Book = () => {
  const [filters, setFilters] = useState<FiltersType>({});
  const [results, setResults] = useState<Train[]>([]);
  const [allTrains, setAllTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (data: { from: string; to: string; date: string; }) => {
    setLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const filteredResults = MOCK_TRAINS.filter(train => {
        
        const matchFrom = data.from ? train.from.toLowerCase() === data.from.toLowerCase() : true;
        const matchTo = data.to ? train.to.toLowerCase() === data.to.toLowerCase() : true;
        return matchFrom && matchTo;
      });


      setAllTrains(filteredResults);
      setResults(filteredResults);

      if (filteredResults.length === 0) {
        setError("No trains found for this route.");
      }
    } catch {
      setError("Failed to load trains");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allTrains];
    if (filters.class) filtered = filtered.filter((t) => t.class === filters.class);
    if (filters.time) {
      if (filters.time === "Morning") filtered = filtered.filter((t) => t.fromTime.includes("AM"));
      if (filters.time === "Afternoon") filtered = filtered.filter((t) => t.fromTime.includes("PM") && (parseInt(t.fromTime) < 6 || parseInt(t.fromTime) === 12));
      if (filters.time === "Night") filtered = filtered.filter((t) => t.fromTime.includes("PM") && parseInt(t.fromTime) >= 6 && parseInt(t.fromTime) !== 12);
    }
    setResults(filtered);
  };

  return (
    <div>
      <div className='w-full h-[100vh] shadow-2xl flex items-end justify-center bg-cover bg-center mt-16 ' style={{ backgroundImage: `url(${img})` }}>
        <h2 className='text-[#ffffff] text-center sm:text-[65px] text-[25px] font-semibold mb-10'>
          Easy Search <span className='text-amber-300'>for Your Trip</span>
        </h2>
      </div>

      <div className="w-[80%] m-auto mt-15">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col md:flex-row gap-6 mt-15">
          <div className="md:w-1/4">
            <Filters filters={filters} setFilters={setFilters} />
            <button onClick={applyFilters} className="mt-4 bg-red-600 w-full py-2 rounded-lg text-white hover:bg-red-700 mb-5">
              Apply Filters
            </button>
          </div>
          <div className="flex-1 mb-5">
            {loading && <p className="text-gray-400 animate-pulse text-center mt-10">Loading trains...</p>}
            {error && <p className="text-red-500 text-center mt-10 font-bold">{error}</p>}
            {!loading && results.length > 0 && <Results data={results} />}
            {!loading && results.length === 0 && !error && allTrains.length === 0 && (
              <p className="text-gray-500 text-center mt-10">Use the search bar above to find your train.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book;