// src/types.ts

/**
 * البيانات الأساسية لأي حجز (تذكرة)
 */
export interface BookingData {
  id: string | number;
  trainNumber: string;
  passengerName: string;
  from: string;
  to: string;
  seat: string;
  coach: string;
  price: string;
  date: string;
}

/**
 * الخصائص المطلوبة لصفحة الدفع (Payment Page)
 */
export interface PaymentProps {
  toggleLang: () => void;
  toggleTheme: () => void;
  theme: string;
  paymentAmount?: number; // السعر بالجنيه (افتراضي 150)
}

/**
 * الخصائص المطلوبة لصفحة عرض التذاكر (MyBookings Page)
 */
export interface MyBookingsProps {
  bookings?: BookingData[];
  onBack?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  theme?: string;
}

/**
 * أنواع طرق الدفع المدعومة (اختياري للتوسعة)
 */
export type PaymentMethod = 'CARD' | 'WALLET' | 'INSTAPAY' | 'FAWRY';