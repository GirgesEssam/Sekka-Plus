import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import type { PaymentProps } from "./types";
import { FaCreditCard, FaWallet } from "react-icons/fa";

const Payment: React.FC<PaymentProps> = ({ toggleLang, toggleTheme, theme, paymentAmount = 150 }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  // --- بيانات Paymob المحدثة بناءً على صورتك ---
  // ملاحظة: تأكد من نسخ الـ API Key كاملاً من Profile Settings
  const PAYMOB_API_KEY = "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRFME56VXdPU3dpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5xNkxTTWpvd0hMZWw0RHgxMHlERWxqcEltTjZzeTBvdFJWNUlydUJMVzFZMlBqU0V6OWZiNlFFRmNYZE11b0k3MnVBT0NLOG1jeXVJTkFpY2VNVVpsdw==";
  const CARD_ID = 5598973; 
  const WALLET_ID = 5599322; 
  const IFRAME_ID = "1024472"; // التعديل بناءً على الصورة (Iframe 1024472)

  const handlePayment = async (integrationId: number) => {
    setLoading(true);
    console.log("--- بدء عملية الدفع ---");
    
    try {
      // 1. طلب الـ Auth Token
      const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: PAYMOB_API_KEY }),
      });
      
      const authData = await authRes.json();
      if (!authData.token) throw new Error("فشل في الحصول على Auth Token - تأكد من الـ API Key");

      // 2. إنشاء الطلب (Order)
      const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: authData.token,
          delivery_needed: "false",
          amount_cents: (paymentAmount * 100).toString(),
          currency: "EGP",
          items: [],
        }),
      });
      const orderData = await orderRes.json();
      if (!orderData.id) throw new Error("فشل في إنشاء الطلب");

      // 3. طلب مفتاح الدفع (Payment Key)
      const keyRes = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: authData.token,
          amount_cents: (paymentAmount * 100).toString(),
          expiration: 3600,
          order_id: orderData.id,
          billing_data: {
            first_name: "Guest",
            last_name: "User",
            email: "test@test.com",
            phone_number: "01012345678",
            apartment: "NA", floor: "NA", street: "NA", building: "NA",
            shipping_method: "NA", postal_code: "NA", city: "Cairo",
            country: "EG", state: "Cairo",
          },
          currency: "EGP",
          integration_id: integrationId,
        }),
      });
      
      const keyData = await keyRes.json();
      if (!keyData.token) {
        throw new Error(keyData.detail || "فشل في إنشاء مفتاح الدفع - تأكد من الـ Integration ID");
      }

      // 4. التوجيه النهائي بناءً على نوع الوسيلة
      if (integrationId === CARD_ID) {
        window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${keyData.token}`;
      } else {
        window.location.href = `https://accept.paymob.com/api/acceptance/payments/pay?payment_token=${keyData.token}`;
      }

    } catch (error: unknown) {
      console.error("خطأ تقني:", error);
      const message = error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      alert(`عذراً: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`mt-20 min-h-screen py-10 px-4 transition-all duration-300 ${theme === 'dark' ? 'bg-[#252525eb]' : 'bg-[#fdfdfde0]'}`}>
      <div className="max-w-[1170px] mx-auto bg-[#f5f5f5] dark:bg-[#252525] rounded-[30px] shadow-2xl border border-[#9c2121a8] p-10 md:p-14 relative overflow-hidden">
        <div className="p-2 border border-transparent rounded-[30px] shadow-[inset_0_0_5px_1px_#e56510] relative">
          
          <button onClick={toggleLang} className="absolute top-6 right-8 w-10 h-10 bg-[#b30606] text-white rounded-full font-bold flex items-center justify-center hover:scale-110 transition-transform">
            {i18n.language === "en" ? "AR" : "EN"}
          </button>
          
          <button onClick={toggleTheme} className="absolute top-20 right-8 w-10 h-10 bg-[#b30606] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <i className={theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
          </button>

          <div className="text-center mb-10">
            <span className="text-4xl font-bold dark:text-white">{paymentAmount}</span>
            <span className="text-lg dark:text-white ml-2">{t("egp")}</span>
            <p className="dark:text-white font-bold mt-5 text-2xl">
              {loading ? "جاري الاتصال بـ Paymob..." : t("choose")}
            </p>
          </div>

          <div className="space-y-5">
            <button 
              disabled={loading} 
              onClick={() => handlePayment(CARD_ID)} 
              className="w-full block group text-left disabled:opacity-50"
            >
              <div className="flex justify-between items-center p-4 md:px-6 rounded-xl shadow-[inset_0_0_5px_1px_#e56510] group-hover:scale-[1.01] transition-all">
                <p className="text-black dark:text-white text-xl font-bold">{t("Bcard")}</p>
                <FaCreditCard className='text-[25px] text-[#e56510]'/>
              </div>
            </button>

            <button 
              disabled={loading} 
              onClick={() => handlePayment(WALLET_ID)} 
              className="w-full block group text-left disabled:opacity-50"
            >
              <div className="flex justify-between items-center p-4 md:px-6 rounded-xl shadow-[inset_0_0_5px_1px_#e56510] group-hover:scale-[1.01] transition-all">
                <p className="text-black dark:text-white text-xl font-bold">{t("Mwallet")}</p>
                <div className="flex gap-2">
                  <FaWallet className='text-[25px] text-[#e56510]'/>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-8">
            <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 px-5 py-2 bg-[#570707] text-white rounded-md border-2 border-[#ff5b2a7d] shadow-[inset_0_0_9px_6px_#812104] font-bold hover:brightness-125 transition-all">
              {t("back")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;