'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const Hero = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const categories = [
    { value: 'real-estate', label: t('categories.realEstate') },
    { value: 'cars', label: t('categories.cars') },
    { value: 'watches', label: t('categories.watches') },
    { value: 'jewelry', label: t('categories.jewelry') },
    { value: 'yachts', label: t('categories.yachts') },
    { value: 'private-jets', label: t('categories.privateJets') },
  ];

  const locations = [
    { value: 'dubai', label: 'دبي' },
    { value: 'abu-dhabi', label: 'أبوظبي' },
    { value: 'riyadh', label: 'الرياض' },
    { value: 'doha', label: 'الدوحة' },
    { value: 'kuwait', label: 'الكويت' },
    { value: 'beirut', label: 'بيروت' },
  ];

  const priceRanges = [
    { value: '0-100000', label: 'حتى 100,000$' },
    { value: '100000-500000', label: '100,000$ - 500,000$' },
    { value: '500000-1000000', label: '500,000$ - 1,000,000$' },
    { value: '1000000-5000000', label: '1,000,000$ - 5,000,000$' },
    { value: '5000000+', label: 'أكثر من 5,000,000$' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-luxury font-bold text-white leading-tight">
              {t('hero.title')}
              <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
          </div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                                      placeholder={t('hero.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none"
                >
                  <option value="" className="text-gray-900">{t('hero.allCategories')}</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value} className="text-gray-900">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none"
                >
                  <option value="" className="text-gray-900">{t('hero.allLocations')}</option>
                  {locations.map((location) => (
                    <option key={location.value} value={location.value} className="text-gray-900">
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="relative">
                <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none"
                >
                  <option value="" className="text-gray-900">{t('hero.allPrices')}</option>
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value} className="text-gray-900">
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t('hero.searchButton')}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">10K+</div>
              <div className="text-gray-300">إعلان فاخر</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">2.5K+</div>
              <div className="text-gray-300">عميل راضي</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">50+</div>
              <div className="text-gray-300">دولة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">24/7</div>
              <div className="text-gray-300">دعم العملاء</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
