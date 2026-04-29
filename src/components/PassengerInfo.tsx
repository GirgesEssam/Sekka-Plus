import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PassengerPage() {
  const [isSelf, setIsSelf] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  // الدالة الذكية للفحص قبل الدفع
  const handleConfirmAction = () => {
    // 1. هل المستخدم مسجل حساب أصلاً؟ (بنفحص وجود بياناته)
    const hasAccount = localStorage.getItem("userAccount"); 
    
    // 2. هل المستخدم مسجل دخول حالياً؟ (بنفحص وجود التوكن)
    const isLoggedIn = localStorage.getItem("userToken");

    if (!hasAccount) {
      // لو ملوش حساب خالص -> واديه يسجل (Sign Up)
      alert("Please create an account first to save your booking.");
      navigate("/sign");
    } else if (!isLoggedIn) {
      // لو ليه حساب بس مش عامل Login -> واديه يسجل دخول (Login)
      alert("Please login to continue to payment.");
      navigate("/login");
    } else {
      // لو عامل الاتنين -> واديه للدفع بسلام
      navigate("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center mt-15">
      {/* بطاقة إدخال المعلومات الرئيسية */}
      <div className="w-full max-w-xl bg-white dark:bg-[#252525] rounded-[30px] shadow-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-12 transition-all">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Passenger <span className="text-[#b32121]">Information</span>
        </h2>

        {/* اختيارات الحجز لنفسي أو لغيري */}
        <div className="flex gap-6 mb-8 justify-center">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              className="w-5 h-5 accent-[#b32121] cursor-pointer"
              checked={isSelf}
              onChange={() => setIsSelf(true)}
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-[#b32121] transition-colors">
              Book for myself
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              className="w-5 h-5 accent-[#b32121] cursor-pointer"
              checked={!isSelf}
              onChange={() => setIsSelf(false)}
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-[#b32121] transition-colors">
              Book for someone else
            </span>
          </label>
        </div>

        {/* الحقول (Inputs) */}
        <div className="space-y-5">
          <div className="relative">
            <input 
              className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#b32121] focus:ring-1 focus:ring-[#b32121] outline-none transition-all dark:text-white"
              placeholder="Full Name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <input 
            className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#b32121] focus:ring-1 focus:ring-[#b32121] outline-none transition-all dark:text-white"
            placeholder="Phone Number" 
          />
          
          <input 
            className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#b32121] focus:ring-1 focus:ring-[#b32121] outline-none transition-all dark:text-white"
            placeholder="Email Address" 
          />

          {!isSelf && (
            <input 
              className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#b32121] focus:ring-1 focus:ring-[#b32121] outline-none transition-all animate-fade-in dark:text-white"
              placeholder="National ID (14 digits)" 
            />
          )}

          <select className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#b32121] outline-none dark:text-white cursor-pointer">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <button 
            className="w-full mt-6 bg-[#b32121] hover:bg-[#8e1a1a] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all text-lg"
            onClick={() => setShowModal(true)}
          >
            Continue to Selection
          </button>
        </div>
      </div>

      {/* المودال (Modal) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#252525] w-[50%] max-md rounded-[25px] overflow-hidden shadow-2xl animate-scale-up">
            <div className="bg-[#b32121] p-6 text-white text-center">
              <h3 className="text-xl font-bold">Select Passengers</h3>
              <p className="text-sm opacity-80 mt-1">Sohag → Cairo</p>
            </div>

            <div className="p-8">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Select up to 3 passengers</p>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border-2 border-[#b32121]">
                <div className="flex flex-col">
                  <span className="font-bold dark:text-white">
                    {fullName || "Guest Passenger"}
                  </span>
                  <small className="text-[#b32121]">Full Ticket</small>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#b32121] flex items-center justify-center">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                onClick={handleConfirmAction} // تم تغييرها لتنفيذ الفحص
                className="flex-1 px-4 py-3 rounded-xl bg-[#b32121] text-white font-bold hover:bg-[#8e1a1a] shadow-md transition-all">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}