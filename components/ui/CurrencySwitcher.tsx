'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { currencies, Currency, formatPrice } from '@/lib/currency';

interface CurrencySwitcherProps {
  currentCurrency: string;
  onCurrencyChange: (currency: string) => void;
  className?: string;
}

const CurrencySwitcher = ({ currentCurrency, onCurrencyChange, className = '' }: CurrencySwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCurrencyInfo, setCurrentCurrencyInfo] = useState<Currency | undefined>();

  useEffect(() => {
    const currencyInfo = currencies.find(c => c.code === currentCurrency);
    setCurrentCurrencyInfo(currencyInfo);
  }, [currentCurrency]);

  const handleCurrencySelect = (currencyCode: string) => {
    onCurrencyChange(currencyCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200"
      >
        <Globe className="h-3 w-3 text-gray-600" />
        <span className="text-sm">{currentCurrencyInfo?.flag}</span>
        <span className="text-sm font-medium text-gray-700">{currentCurrencyInfo?.symbol}</span>
        <span className="text-xs text-gray-600">{currentCurrencyInfo?.code}</span>
        <ChevronDown 
          className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                اختر العملة
              </div>
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency.code)}
                  className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-right hover:bg-gray-50 transition-colors duration-150 ${
                    currentCurrency === currency.code ? 'bg-gold-50 text-gold-700' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{currency.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{currency.symbol} {currency.code}</span>
                      <span className="text-sm text-gray-500">
                        {formatPrice(1000, currency.code)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {currency.name}
                    </div>
                  </div>
                  {currentCurrency === currency.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-gold-500 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="text-xs text-gray-500 text-center">
                الأسعار محدثة تلقائياً
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CurrencySwitcher;
