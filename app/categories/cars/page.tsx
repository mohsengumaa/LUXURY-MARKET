'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import {
  MapPin,
  Heart,
  Eye,
  Share2,
  Phone,
  MessageCircle,
  Filter,
  Grid,
  List,
  Search,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Zap,
  Star,
  Shield,
  Award,
  ChevronLeft,
  Car
} from 'lucide-react';
import Link from 'next/link';
import { allLuxuryCars, luxuryCarSubcategories } from '@/data/luxuryCarsData';

const LuxuryCarsPage = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const brands = [
    { value: 'all', label: 'جميع الماركات' },
    { value: 'Lamborghini', label: 'لامبورغيني' },
    { value: 'Ferrari', label: 'فيراري' },
    { value: 'McLaren', label: 'مكلارين' },
    { value: 'Rolls-Royce', label: 'رولز رويس' },
    { value: 'Bentley', label: 'بنتلي' },
    { value: 'Porsche', label: 'بورش' },
    { value: 'Bugatti', label: 'بوغاتي' }
  ];

  const carTypes = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'سيارة رياضية', label: 'سيارات رياضية' },
    { value: 'سيارة فاخرة SUV', label: 'سيارات فاخرة SUV' },
    { value: 'سيارة كلاسيكية', label: 'سيارات كلاسيكية' },
    { value: 'محدودة الإصدار', label: 'محدودة الإصدار' },
    { value: 'سيارة رياضية مكشوفة', label: 'سيارات مكشوفة' }
  ];

  const yearRanges = [
    { value: 'all', label: 'جميع السنوات' },
    { value: '2023-2024', label: '2023-2024' },
    { value: '2020-2022', label: '2020-2022' },
    { value: '2015-2019', label: '2015-2019' },
    { value: '2010-2014', label: '2010-2014' },
    { value: '1990-2009', label: 'كلاسيكية (1990-2009)' }
  ];

  const priceRanges = [
    { value: 'all', label: 'جميع الأسعار' },
    { value: '0-1000000', label: 'أقل من مليون درهم' },
    { value: '1000000-2000000', label: '1-2 مليون درهم' },
    { value: '2000000-5000000', label: '2-5 مليون درهم' },
    { value: '5000000+', label: 'أكثر من 5 مليون درهم' }
  ];

  const formatPrice = (price: number, currency: string) => {
    const formatted = new Intl.NumberFormat('ar-AE', {
      minimumFractionDigits: 0,
    }).format(price);
    
    const currencySymbol = currency === 'AED' ? 'د.إ' : currency === 'SAR' ? 'ر.س' : '$';
    return `${formatted} ${currencySymbol}`;
  };

  const filteredCars = allLuxuryCars.filter(car => {
    if (selectedBrand !== 'all' && car.brand !== selectedBrand) return false;
    if (selectedType !== 'all' && car.type !== selectedType) return false;
    
    if (selectedYear !== 'all') {
      const [minYear, maxYear] = selectedYear.split('-').map(Number);
      if (maxYear) {
        if (car.year < minYear || car.year > maxYear) return false;
      } else {
        if (car.year < minYear) return false;
      }
    }
    
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        if (car.price < min || car.price > max) return false;
      } else {
        if (car.price < min) return false;
      }
    }
    
    return true;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'year-new':
        return b.year - a.year;
      case 'year-old':
        return a.year - b.year;
      case 'popular':
        return b.views - a.views;
      case 'featured':
      default:
        return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gold-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-gold-600">الفئات</Link>
            <span>/</span>
            <span className="text-gold-600">السيارات الفاخرة</span>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="p-3 bg-red-100 rounded-full">
              <Car className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-luxury font-bold text-gray-900">
                السيارات الفاخرة
              </h1>
              <p className="text-gray-600 mt-2">
                سيارات رياضية وكلاسيكية نادرة من أفضل الماركات العالمية
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-red-600">{allLuxuryCars.length}</div>
            <div className="text-sm text-gray-600">سيارة متاحة</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{brands.length - 1}</div>
            <div className="text-sm text-gray-600">ماركة فاخرة</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">رضا العملاء</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-gold-600">24/7</div>
            <div className="text-sm text-gray-600">خدمة عملاء</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الماركة</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {brands.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع السيارة</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {carTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">سنة الصنع</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {yearRanges.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="featured">المميزة أولاً</option>
                <option value="price-high">الأعلى سعراً</option>
                <option value="price-low">الأقل سعراً</option>
                <option value="year-new">الأحدث</option>
                <option value="year-old">الأقدم</option>
                <option value="popular">الأكثر مشاهدة</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>عرض {sortedCars.length} من أصل {allLuxuryCars.length} سيارة</span>
            <span>آخر تحديث: اليوم</span>
          </div>
        </motion.div>

        {/* Cars Listings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {sortedCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-96 h-64' : 'h-64'} overflow-hidden`}>
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {car.featured && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-3 w-3 ml-1 fill-current" />
                    مميزة
                  </div>
                )}

                <div className="absolute top-4 left-4 flex space-x-2 rtl:space-x-reverse">
                  <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {car.brand}
                  </div>
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {car.year}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Eye className="h-4 w-4" />
                        <span>{car.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Heart className="h-4 w-4" />
                        <span>{car.likes}</span>
                      </div>
                    </div>
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                    {car.type}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 ml-1" />
                    {car.location.area}, {car.location.city}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  <Link href={`/categories/cars/${car.id}`}>
                    {car.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {car.description}
                </p>

                {/* Car Specs */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Gauge className="h-4 w-4 text-red-500" />
                    <span>{car.specs.horsepower} حصان</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span>{car.specs.acceleration}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span>{car.specs.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Fuel className="h-4 w-4 text-green-500" />
                    <span>{car.specs.mileage.toLocaleString()} كم</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {car.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {car.features.length > 3 && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      +{car.features.length - 3} المزيد
                    </span>
                  )}
                </div>

                <div className="text-3xl font-bold text-red-600 mb-4">
                  {formatPrice(car.price, car.currency)}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-medium text-sm">
                        {car.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {car.seller.name}
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {car.seller.verified && (
                          <Shield className="h-3 w-3 text-green-500" />
                        )}
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 mr-1">{car.seller.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                    <Link
                      href={`/categories/cars/${car.id}`}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            عرض المزيد من السيارات
          </button>
        </motion.div>

        {/* Featured Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">الماركات المميزة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {brands.slice(1).map((brand) => (
              <button
                key={brand.value}
                onClick={() => setSelectedBrand(brand.value)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Car className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">{brand.label}</div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryCarsPage;
