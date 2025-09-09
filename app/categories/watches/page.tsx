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
  Clock,
  Star,
  Shield,
  Award,
  ChevronLeft,
  Watch,
  Gem,
  Zap,
  Timer,
  Droplets,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { allLuxuryWatches, luxuryWatchSubcategories } from '@/data/luxuryWatchesData';

const LuxuryWatchesPage = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const brands = [
    { value: 'all', label: 'جميع الماركات' },
    { value: 'Rolex', label: 'رولكس' },
    { value: 'Patek Philippe', label: 'باتيك فيليب' },
    { value: 'Audemars Piguet', label: 'أوديمار بيغيه' },
    { value: 'Richard Mille', label: 'ريتشارد ميل' },
    { value: 'Vacheron Constantin', label: 'فاشيرون كونستانتين' },
    { value: 'Jaeger-LeCoultre', label: 'جايغر لوكولتر' }
  ];

  const watchTypes = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'ساعة رياضية', label: 'ساعات رياضية' },
    { value: 'ساعة فاخرة', label: 'ساعات فاخرة' },
    { value: 'ساعة غوص', label: 'ساعات غوص' },
    { value: 'ساعة عتيقة', label: 'ساعات عتيقة' },
    { value: 'إصدار محدود', label: 'إصدار محدود' }
  ];

  const conditions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'new', label: 'جديدة' },
    { value: 'like_new', label: 'كالجديدة' },
    { value: 'excellent', label: 'ممتازة' },
    { value: 'good', label: 'جيدة' },
    { value: 'vintage', label: 'عتيقة' }
  ];

  const priceRanges = [
    { value: 'all', label: 'جميع الأسعار' },
    { value: '0-500000', label: 'أقل من 500 ألف درهم' },
    { value: '500000-1000000', label: '500 ألف - مليون درهم' },
    { value: '1000000-2000000', label: '1-2 مليون درهم' },
    { value: '2000000+', label: 'أكثر من 2 مليون درهم' }
  ];

  const formatPrice = (price: number, currency: string) => {
    const formatted = new Intl.NumberFormat('ar-AE', {
      minimumFractionDigits: 0,
    }).format(price);
    
    const currencySymbol = currency === 'AED' ? 'د.إ' : currency === 'SAR' ? 'ر.س' : '$';
    return `${formatted} ${currencySymbol}`;
  };

  const filteredWatches = allLuxuryWatches.filter(watch => {
    if (selectedBrand !== 'all' && watch.brand !== selectedBrand) return false;
    if (selectedType !== 'all' && watch.type !== selectedType) return false;
    if (selectedCondition !== 'all' && watch.condition !== selectedCondition) return false;
    
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        if (watch.price < min || watch.price > max) return false;
      } else {
        if (watch.price < min) return false;
      }
    }
    
    return true;
  });

  const sortedWatches = [...filteredWatches].sort((a, b) => {
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

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'text-green-600 bg-green-100';
      case 'like_new': return 'text-blue-600 bg-blue-100';
      case 'excellent': return 'text-purple-600 bg-purple-100';
      case 'good': return 'text-yellow-600 bg-yellow-100';
      case 'vintage': return 'text-amber-600 bg-amber-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'new': return 'جديدة';
      case 'like_new': return 'كالجديدة';
      case 'excellent': return 'ممتازة';
      case 'good': return 'جيدة';
      case 'vintage': return 'عتيقة';
      default: return condition;
    }
  };

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
            <span className="text-gold-600">الساعات الفاخرة</span>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Watch className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-luxury font-bold text-gray-900">
                الساعات الفاخرة
              </h1>
              <p className="text-gray-600 mt-2">
                ساعات سويسرية حصرية ومحدودة الإصدار من أرقى الماركات العالمية
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
            <div className="text-2xl font-bold text-blue-600">{allLuxuryWatches.length}</div>
            <div className="text-sm text-gray-600">ساعة متاحة</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-gold-600">{brands.length - 1}</div>
            <div className="text-sm text-gray-600">ماركة فاخرة</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">أصلية مضمونة</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600">خدمة خبراء</div>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brands.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الساعة</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {watchTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {conditions.map((condition) => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>عرض {sortedWatches.length} من أصل {allLuxuryWatches.length} ساعة</span>
            <span>آخر تحديث: اليوم</span>
          </div>
        </motion.div>

        {/* Watch Listings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {sortedWatches.map((watch, index) => (
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-96 h-64' : 'h-64'} overflow-hidden`}>
                <img
                  src={watch.images[0]}
                  alt={watch.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {watch.featured && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-3 w-3 ml-1 fill-current" />
                    مميزة
                  </div>
                )}

                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <div className="bg-gold-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {watch.brand}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getConditionColor(watch.condition)}`}>
                    {getConditionText(watch.condition)}
                  </div>
                  {watch.limited && (
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                      محدودة
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Eye className="h-4 w-4" />
                        <span>{watch.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Heart className="h-4 w-4" />
                        <span>{watch.likes}</span>
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
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
                    {watch.type}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 ml-1" />
                    {watch.location.area}, {watch.location.city}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/categories/watches/${watch.id}`}>
                    {watch.title}
                  </Link>
                </h3>

                <div className="text-sm text-gray-600 mb-3">
                  {watch.model} - المرجع {watch.referenceNumber}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {watch.description}
                </p>

                {/* Watch Specs */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>{watch.specs.caseSize}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Gem className="h-4 w-4 text-purple-500" />
                    <span>{watch.specs.caseMaterial}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Timer className="h-4 w-4 text-green-500" />
                    <span>{watch.specs.powerReserve}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Droplets className="h-4 w-4 text-cyan-500" />
                    <span>{watch.specs.waterResistance}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {watch.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {watch.features.length > 3 && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      +{watch.features.length - 3} المزيد
                    </span>
                  )}
                </div>

                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {formatPrice(watch.price, watch.currency)}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {watch.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {watch.seller.name}
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {watch.seller.verified && (
                          <Shield className="h-3 w-3 text-green-500" />
                        )}
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 mr-1">{watch.seller.rating}</span>
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
                      href={`/categories/watches/${watch.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            عرض المزيد من الساعات
          </button>
        </motion.div>

        {/* Featured Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">الماركات السويسرية المميزة</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.slice(1).map((brand) => (
              <button
                key={brand.value}
                onClick={() => setSelectedBrand(brand.value)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Watch className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">{brand.label}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Watch Care Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">نصائح العناية بالساعات الفاخرة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">الحماية</h4>
              <p className="text-blue-100 text-sm">احم ساعتك من الصدمات والخدوش بتخزينها في علبة مناسبة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">الصيانة</h4>
              <p className="text-blue-100 text-sm">صيانة دورية كل 3-5 سنوات لضمان الأداء الأمثل</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Droplets className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">التنظيف</h4>
              <p className="text-blue-100 text-sm">تنظيف لطيف بقطعة قماش ناعمة وتجنب المواد الكيميائية</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryWatchesPage;
