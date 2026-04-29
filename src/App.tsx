import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

// استيراد المكونات
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Book from "./components/BookTickets";
import MyBookings from "./components/MyBookings"; // استيراد واحد فقط باسم واضح
import Settings from "./components/Settings";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Chair from "./components/Chair";
import Payment from "./components/Payment";
import PassengerPage from "./components/PassengerInfo";

function App() {
  const { i18n } = useTranslation();
  
  // 1. إدارة حالة الثيم (Light / Dark)
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    // إضافة كلاس dark للـ body عشان الـ Tailwind dark: يشتغل
    if (theme === "light") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  // 2. إدارة حالة اللغة
  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    // إضافة كلاس الثيم لضمان عمل Tailwind
    <div className={theme === "dark" ? "dark" : ""}>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<Book />} />
        
        {/* صفحة حجوزاتي */}
        <Route path="/my" element={<MyBookings bookings={[]} />} />
        
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/seats" element={<Chair />} />
        <Route path="/book" element={<Book />} />
        <Route path="/seats/:id" element={<Chair />} /> {/* تأكد من وجود :id */}
        <Route path="/passenger" element={<PassengerPage />} />
        <Route 
          path="/payment" 
          element={
            <Payment 
              theme={theme} 
              toggleTheme={toggleTheme} 
              toggleLang={toggleLang} 
            />
          } 
        />

        {/* صفحة التذكرة (تستخدم نفس مكون MyBookings) */}
        <Route 
          path="/ticket" 
          element={
            <MyBookings 
              onBack={() => window.history.back()} 
              onShare={() => console.log("Shared!")} 
              onDownload={() => window.print()} 
            />
          } 
        />

        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;