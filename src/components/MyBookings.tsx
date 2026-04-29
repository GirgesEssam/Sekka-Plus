import React, { useRef } from 'react'; // تأكد من وجود useRef
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from 'qrcode.react';

// 1. حل أرور Cannot find name 'html2canvas' و 'jsPDF'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import type { MyBookingsProps } from "./types";

const MyBookings: React.FC<MyBookingsProps> = ({ bookings = [], onBack, theme }) => {
  const { t } = useTranslation();

  // 2. حل أرور Cannot find name 'ticketRef'
  // لازم يكون جوه الكومبوننت وقبل أي فانكشن بتستخدمه
  const ticketRef = useRef<HTMLDivElement>(null);

  // 3. حل أرور 'handleDownloadPDF' is assigned a value but never used
  // ده معناه إن الفانكشن موجودة بس الزرار مش بينادي عليها
  const handleDownloadPDF = async () => {
    const element = ticketRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        // حل أرور Cannot find name 'theme' (تأكدنا إنها موجودة فوق في الـ Props)
        backgroundColor: theme === 'dark' ? '#252525' : '#f5f5f5',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save('ENR-Ticket.pdf');
    } catch (error) {
      console.error("PDF Error:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ENR Ticket',
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={`min-h-screen  mt-16 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-red-800 text-[35px] p-[25px] text-white font-bold relative flex justify-center items-center">
        <span>{t("Your ticket")}</span>
        {onBack && <button className="absolute left-[30px]" onClick={onBack}><i className="fa-solid fa-arrow-left"></i></button>}
      </div>

      {/* الربط الصحيح للـ ref */}
      <div ref={ticketRef} className="max-w-[1170px] mx-auto bg-[#f5f5f5] dark:bg-[#252525] rounded-[30px] overflow-hidden mt-10 border border-[#9c2121a8] shadow-[inset_0_0_5px_1px_#e56510]">
        <div className="bg-[#c70505fc] p-[50px_20px] text-white text-center">
          <div className="text-[30px] font-bold">ENR Tickets</div>
          <div className="flex justify-between items-center mt-12 px-10 text-[25px]">
            <span>{t("")}</span>
            <i className="fa-solid fa-arrow-right"></i>
            <span>{t("")}</span>
          </div>
        </div>

        <div className="border-y-[3px] border-dashed border-black dark:border-white m-[50px_30px] flex justify-center py-10">
          <QRCodeSVG value="Ticket-123" size={150} />
        </div>

        <div className="mx-[30px] space-y-2 pb-10">
          <div className="flex justify-between font-bold text-[22px] py-4 border-b dark:border-gray-700">
            <span className="text-[#877878]">{t("Passenger Name")}</span>
            <span className="dark:text-white">{t("")}</span>
            <span className="text-red-600">{t("train_ar")}</span>
          </div>
          <div className="flex justify-between font-bold text-[22px] py-4 border-b dark:border-gray-700">
            <span className="text-[#877878]">{t("Number Of Tickets")}</span>
            <span className="dark:text-white">{t("")}</span>
            <span className="text-red-600">{t("train_ar")}</span>
          </div>
          <div className="flex justify-between font-bold text-[22px] py-4 border-b dark:border-gray-700">
            <span className="text-[#877878]">{t("train")}</span>
            <span className="dark:text-white">{t("")}</span>
            <span className="text-red-600">{t("train_ar")}</span>
          </div>
          {/* يمكنك إضافة باقي الصفوف هنا بنفس الطريقة */}
        </div>
      </div>

      <div className="max-w-[1170px] mx-auto m-10 flex justify-center gap-6 pb-10">
        {/* نداء الفانكشن في الـ onClick هو اللي بيحل أرور 'never used' */}
        <button 
          onClick={handleDownloadPDF} 
          className="bg-[#c70505fc] text-white p-4 rounded-xl flex-1 text-2xl font-bold"
        >
          {t("download")}
        </button>
        <button 
          onClick={handleShare} 
          className="bg-black text-white p-4 rounded-xl flex-1 text-2xl font-bold"
        >
          {t("share")}
        </button>
      </div>

      {bookings.length > 0 && <div className="hidden">{bookings.length}</div>}
    </div>
  );
};

export default MyBookings;