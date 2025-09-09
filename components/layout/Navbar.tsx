'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import CurrencySwitcher from '@/components/ui/CurrencySwitcher';
import { useCurrency } from '@/contexts/CurrencyContext';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Heart, 
  ShoppingBag,
  Crown,
  LogOut,
  Settings,
  Plus
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const { t } = useTranslation();
  const { currentCurrency, setCurrentCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: t('categories.realEstate'), href: '/categories/real-estate', icon: '🏰' },
    { name: t('categories.cars'), href: '/categories/cars', icon: '🚗' },
    { name: t('categories.watches'), href: '/categories/watches', icon: '⌚' },
    { name: t('categories.jewelry'), href: '/categories/jewelry', icon: '💎' },
    { name: t('categories.yachts'), href: '/categories/yachts', icon: '🛥️' },
    { name: t('categories.privateJets'), href: '/categories/private-jets', icon: '✈️' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Crown className="h-8 w-8 text-gold-500" />
            <span className="font-luxury text-2xl font-bold bg-gradient-to-r from-gold-600 to-gold-400 bg-clip-text text-transparent">
              Luxury Market
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            <div className="relative group">
              <button className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
                {t('navigation.categories')}
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="flex items-center space-x-3 rtl:space-x-reverse p-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-gray-700 hover:text-gold-600">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/listings" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
              {t('navigation.listings')}
            </Link>

            <Link href="/about" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
              {t('navigation.about')}
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
              {t('navigation.contact')}
            </Link>

            <LanguageSwitcher />
            <CurrencySwitcher 
              currentCurrency={currentCurrency}
              onCurrencyChange={setCurrentCurrency}
            />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {status === 'loading' ? (
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 rtl:space-x-reverse">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || ''}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gold-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span className="hidden md:block font-medium text-gray-700">
                    {session.user.name}
                  </span>
                </button>
                
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>لوحة التحكم</span>
                    </Link>
                    
                    {(session.user.role === 'seller' || session.user.role === 'admin') && (
                      <Link
                        href="/dashboard/listings/new"
                        className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>إضافة إعلان</span>
                      </Link>
                    )}
                    
                    <Link
                      href="/favorites"
                      className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span>المفضلة</span>
                    </Link>
                    
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-md hover:bg-gray-50 transition-colors w-full text-right"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-gold-600 font-medium transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
              <div className="md:hidden mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث..."
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
              
              <Link
                href="/listings"
                className="block px-3 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                جميع الإعلانات
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
