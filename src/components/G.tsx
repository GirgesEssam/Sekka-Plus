// import { useState } from "react";
// import axios from "axios";
// import SearchBar from "../components/SearchBar";
// import Filters from "../components/Filters";
// import Results from "../components/Results";

// 🔹 Types
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

const Book = () => {
  const [filters, setFilters] = useState<FiltersType>({});
  const [results, setResults] = useState<Train[]>([]);
  const [allTrains, setAllTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 🔥 API URL (غيره بعدين)
  const BASE_URL = "http://localhost:3000/trains";

  // 🔥 Search (API CALL)
  const handleSearch = async (data: {
    from: string;
    to: string;
    date: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get<Train[]>(BASE_URL, {
        params: {
          from: data.from,
          to: data.to,
          date: data.date,
        },
      });

      setAllTrains(res.data);
      setResults(res.data);

    } catch (err) {
      setError("Failed to fetch trains");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Filters
  const applyFilters = () => {
    let filtered = [...allTrains];

    if (filters.class) {
      filtered = filtered.filter((t) => t.class === filters.class);
    }

    if (filters.time) {
      if (filters.time === "Morning") {
        filtered = filtered.filter((t) => t.fromTime.includes("AM"));
      }
      if (filters.time === "Afternoon") {
        filtered = filtered.filter(
          (t) =>
            t.fromTime.includes("PM") &&
            parseInt(t.fromTime) < 6
        );
      }
      if (filters.time === "Night") {
        filtered = filtered.filter(
          (t) =>
            t.fromTime.includes("PM") &&
            parseInt(t.fromTime) >= 6
        );
      }
    }

    setResults(filtered);
  };

  return (
    <div className="w-[90%] m-auto mt-10">

      {/* 🔥 Search */}
      <SearchBar onSearch={handleSearch} />

      {/* 🔥 Layout */}
      <div className="flex flex-col md:flex-row gap-6 mt-10">

        {/* Filters */}
        <div>
          <Filters filters={filters} setFilters={setFilters} />

          <button
            onClick={applyFilters}
            className="mt-4 bg-red-600 w-full py-2 rounded-lg text-white hover:bg-red-700"
          >
            Apply Filters
          </button>
        </div>

        {/* Results */}
        <div className="flex-1">

          {loading && (
            <p className="text-gray-400">Loading trains...</p>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          {!loading && results.length === 0 && (
            <p className="text-gray-400">No trains found</p>
          )}

          {!loading && <Results data={results} />}

        </div>

      </div>

    </div>
  );
};

export default Book;