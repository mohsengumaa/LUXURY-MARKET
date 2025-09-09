// نظام إدارة العملات المتعددة

export interface Currency {
  code: string;
  name: string;
  nameEn: string;
  nameTr: string;
  symbol: string;
  rate: number; // سعر الصرف مقابل الدرهم الإماراتي
  locale: string;
  flag: string;
}

export const currencies: Currency[] = [
  {
    code: 'AED',
    name: 'الدرهم الإماراتي',
    nameEn: 'UAE Dirham',
    nameTr: 'BAE Dirhemi',
    symbol: 'د.إ',
    rate: 1,
    locale: 'ar-AE',
    flag: '🇦🇪'
  },
  {
    code: 'USD',
    name: 'الدولار الأمريكي',
    nameEn: 'US Dollar',
    nameTr: 'ABD Doları',
    symbol: '$',
    rate: 0.27,
    locale: 'en-US',
    flag: '🇺🇸'
  },
  {
    code: 'TRY',
    name: 'الليرة التركية',
    nameEn: 'Turkish Lira',
    nameTr: 'Türk Lirası',
    symbol: '₺',
    rate: 8.5,
    locale: 'tr-TR',
    flag: '🇹🇷'
  },
  {
    code: 'EUR',
    name: 'اليورو',
    nameEn: 'Euro',
    nameTr: 'Euro',
    symbol: '€',
    rate: 0.25,
    locale: 'de-DE',
    flag: '🇪🇺'
  },
  {
    code: 'SYP',
    name: 'الليرة السورية',
    nameEn: 'Syrian Pound',
    nameTr: 'Suriye Lirası',
    symbol: 'ل.س',
    rate: 1350,
    locale: 'ar-SY',
    flag: '🇸🇾'
  }
];

// دالة تحويل العملة
export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const from = currencies.find(c => c.code === fromCurrency);
  const to = currencies.find(c => c.code === toCurrency);
  
  if (!from || !to) return amount;
  
  // تحويل إلى الدرهم الإماراتي أولاً
  const amountInAED = amount / from.rate;
  // ثم تحويل إلى العملة المطلوبة
  return amountInAED * to.rate;
};

// دالة تنسيق السعر
export const formatPrice = (amount: number, currency: string, locale?: string): string => {
  const currencyInfo = currencies.find(c => c.code === currency);
  if (!currencyInfo) return `${amount} ${currency}`;
  
  const useLocale = locale || currencyInfo.locale;
  
  try {
    return new Intl.NumberFormat(useLocale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: currency === 'SYP' ? 0 : 2,
    }).format(amount);
  } catch (error) {
    // في حالة فشل التنسيق، استخدم التنسيق اليدوي
    return `${currencyInfo.symbol}${amount.toLocaleString(useLocale)}`;
  }
};

// دالة الحصول على معلومات العملة
export const getCurrencyInfo = (code: string): Currency | undefined => {
  return currencies.find(c => c.code === code);
};

// دالة الحصول على جميع العملات
export const getAllCurrencies = (): Currency[] => {
  return currencies;
};

// دالة تحديث أسعار الصرف (محاكاة)
export const updateExchangeRates = async (): Promise<void> => {
  // في التطبيق الحقيقي، ستكون هذه استدعاء API لأسعار الصرف الحقيقية
  console.log('Updating exchange rates...');
  
  // محاكاة تحديث الأسعار
  currencies.forEach(currency => {
    if (currency.code !== 'AED') {
      // إضافة تغيير عشوائي صغير في السعر
      const change = (Math.random() - 0.5) * 0.1; // ±5%
      currency.rate = currency.rate * (1 + change);
    }
  });
};

// دالة الحصول على العملة الافتراضية حسب اللغة
export const getDefaultCurrency = (locale: string): string => {
  switch (locale) {
    case 'ar':
      return 'AED';
    case 'en':
      return 'USD';
    case 'tr':
      return 'TRY';
    default:
      return 'AED';
  }
};
