'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { currencies, Currency, convertCurrency, getDefaultCurrency } from '@/lib/currency';

interface CurrencyContextType {
  currentCurrency: string;
  setCurrentCurrency: (currency: string) => void;
  convertPrice: (amount: number, fromCurrency?: string) => number;
  getCurrentCurrencyInfo: () => Currency | undefined;
  formatPrice: (amount: number, fromCurrency?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
  defaultCurrency?: string;
}

export const CurrencyProvider = ({ children, defaultCurrency }: CurrencyProviderProps) => {
  const [currentCurrency, setCurrentCurrencyState] = useState<string>(
    defaultCurrency || 'AED'
  );

  // حفظ العملة المختارة في localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency && currencies.find(c => c.code === savedCurrency)) {
      setCurrentCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrentCurrency = (currency: string) => {
    setCurrentCurrencyState(currency);
    localStorage.setItem('selectedCurrency', currency);
  };

  const convertPrice = (amount: number, fromCurrency: string = 'AED'): number => {
    if (fromCurrency === currentCurrency) return amount;
    return convertCurrency(amount, fromCurrency, currentCurrency);
  };

  const getCurrentCurrencyInfo = (): Currency | undefined => {
    return currencies.find(c => c.code === currentCurrency);
  };

  const formatPrice = (amount: number, fromCurrency: string = 'AED'): string => {
    const convertedAmount = convertPrice(amount, fromCurrency);
    const currencyInfo = getCurrentCurrencyInfo();
    
    if (!currencyInfo) return `${convertedAmount} ${currentCurrency}`;
    
    try {
      return new Intl.NumberFormat(currencyInfo.locale, {
        style: 'currency',
        currency: currentCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: currentCurrency === 'SYP' ? 0 : 2,
      }).format(convertedAmount);
    } catch (error) {
      return `${currencyInfo.symbol}${convertedAmount.toLocaleString()}`;
    }
  };

  const value: CurrencyContextType = {
    currentCurrency,
    setCurrentCurrency,
    convertPrice,
    getCurrentCurrencyInfo,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
