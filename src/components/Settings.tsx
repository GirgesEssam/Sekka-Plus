import React, { useEffect, useState } from "react";



const Settings = () => {

  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true"; 
  });

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [enabled]);

  // وظيفة تبديل اللغة عشان نبعتها للـ Payment

  return (
    <div className="w-[75%] m-auto mt-16 transition duration-300 h-[100vh]">
      <div className="flex items-center justify-between pt-10">
        <h2 className="text-[30px] font-bold !text-[#5f5f5f] dark:text-white">
          Dark Mode
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-sm !text-black dark:text-white">
            {enabled ? "On" : "Off"}
          </span>
          <div
            onClick={() => setEnabled((prev) => !prev)}
            className={`w-[50px] h-[20px] border-[2px] rounded-full cursor-pointer flex items-center px-[2px] transition duration-300
            ${enabled ? "bg-green-500 border-green-500" : "bg-gray-300 border-gray-600"}`}
          >
            <div
              className={`w-[18px] h-[16px] bg-white rounded-full transition duration-300
              ${enabled ? "translate-x-[26px]" : "translate-x-0"}`}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="w-full h-[1px] bg-[#ccc] mt-4 dark:bg-gray-600"></div>
      <h2 className="text-[30px] font-bold !text-[#5f5f5f] dark:text-white mt-5">
          Language
      </h2>
      <div className="w-full h-[1.5px] bg-[#ccc] mt-4 dark:bg-gray-600"></div>
     
    </div>
  );
};

export default Settings;