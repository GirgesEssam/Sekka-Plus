import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
type SearchData = {
  from: string;
  to: string;
  date: string;
};

type Props = {
  onSearch: (data: SearchData) => void;
};

const egyptCities: string[] = [
  "Alexandria", "Aswan", "Asyut", "Beheira",
  "Beni Suef", "Cairo", "Dakahlia", "Damietta",
  "Faiyum","Gharbia","Giza","Ismailia","Kafr El Sheikh",
  "Suez","Luxor","Matrouh","Minya","Monufia","New Valley",
  "North Sinai","Port Said","Qalyubia","Qena","Red Sea",
  "Sharqia","Sohag","South Sinai",
];

const SearchBar = ({ onSearch }: Props) => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSearch = () => {
    onSearch({ from, to, date });
  };

  return (
    <div className="bg-red-900 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-center ">
            
      <input
        list="cities"
        value={from}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFrom(e.target.value)
        }
        placeholder="From"
        className="p-3 rounded-lg bg-white text-left"
      />
        <div className="w-[40px] h-[40px] rounded-[50%] bg-red-600 mx-4 flex items-center justify-center text-white"> <FaArrowRight/></div>
      <input
        list="cities"
        value={to}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTo(e.target.value)
        }
        placeholder="To"
        className="p-3 rounded-lg bg-white "
      />

      <input
        type="date"
        lang="en"
        value={date}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDate(e.target.value)
        }
        className="p-3 rounded-lg bg-white px-8 "
      />

      <button
        onClick={handleSearch}
        className="bg-red-600 text-white px-15 rounded-lg py-2 text-[25px] font-semibold"
      >
        Search
      </button>

      <datalist id="cities">
        {egyptCities.map((city, i) => (
          <option key={i} value={city} />
        ))}
      </datalist>
    </div>
  );
};

export default SearchBar;