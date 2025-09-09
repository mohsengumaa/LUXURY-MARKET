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
  Star,
  Shield,
  Award,
  ChevronLeft,
  Gem,
  Crown,
  Sparkles,
  FileCheck,
  Scale
} from 'lucide-react';
import Link from 'next/link';
import { allLuxuryJewelry, luxuryJewelrySubcategories } from '@/data/luxuryJewelryData';

const LuxuryJewelryPage = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const brands = [
    { value: 'all', label: 'جميع الماركات' },
    { value: 'Tiffany & Co.', label: 'تيفاني آند كو' },
    { value: 'Cartier', label: 'كارتييه' },
    { value: 'Bulgari', label: 'بولغاري' },
    { value: 'Harry Winston', label: 'هاري ونستون' },
    { value: 'Van Cleef & Arpels', label: 'فان كليف آند آربلز' },
    { value: 'Mikimoto', label: 'ميكيموتو' },
    { value: 'Graff', label: 'غراف' }
  ];

  const categories = [
    { value: 'all', label: 'جميع الأحجار' },
    { value: 'الماس', label: 'الماس' },
    { value: 'الزمرد', label: 'الزمرد' },
    { value: 'الياقوت', label: 'الياقوت الأزرق' },
    { value: 'الياقوت الأحمر', label: 'الياقوت الأحمر' },
    { value: 'اللؤلؤ', label: 'اللؤلؤ' }
  ];

  const jewelryTypes = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'خاتم', label: 'خواتم' },
    { value: 'عقد', label: 'عقود' },
    { value: 'أقراط', label: 'أقراط' },
    { value: 'إسوارة', label: 'أساور' },
    { value: 'بروش', label: 'بروشات' }
  ];

  const conditions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'new', label: 'جديدة' },
    { value: 'like_new', label: 'كالجديدة' },
    { value: 'excellent', label: 'ممتازة' },
    { value: 'good', label: 'جيدة' },
    { value: 'vintage', label: 'تراثية' }
  ];

  const priceRanges = [
    { value: 'all', label: 'جميع الأسعار' },
    { value: '0-1000000', label: 'أقل من مليون درهم' },
    { value: '1000000-3000000', label: '1-3 مليون درهم' },
    { value: '3000000-5000000', label: '3-5 مليون درهم' },
    { value: '5000000+', label: 'أكثر من 5 مليون درهم' }
  ];

  const formatPrice = (price: number, currency: string) => {
    const formatted = new Intl.NumberFormat('ar-AE', {
      minimumFractionDigits: 0,
    }).format(price);
    
    const currencySymbol = currency === 'AED' ? 'د.إ' : currency === 'SAR' ? 'ر.س' : '$';
    return `${formatted} ${currencySymbol}`;
  };

  const filteredJewelry = allLuxuryJewelry.filter(jewelry => {
    if (selectedBrand !== 'all' && jewelry.brand !== selectedBrand) return false;
    if (selectedCategory !== 'all' && jewelry.category !== selectedCategory) return false;
    if (selectedType !== 'all' && jewelry.type !== selectedType) return false;
    if (selectedCondition !== 'all' && jewelry.condition !== selectedCondition) return false;
    
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        if (jewelry.price < min || jewelry.price > max) return false;
      } else {
        if (jewelry.price < min) return false;
      }
    }
    
    return true;
  });

  const sortedJewelry = [...filteredJewelry].sort((a, b) => {
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
      case 'vintage': return 'تراثية';
      default: return condition;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'الماس': return Sparkles;
      case 'الزمرد': return Gem;
      case 'الياقوت': return Star;
      case 'اللؤلؤ': return Crown;
      default: return Gem;
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
            <span className="text-gold-600">المجوهرات الفاخرة</span>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="p-3 bg-purple-100 rounded-full">
              <Gem className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl font-luxury font-bold text-gray-900">
                المجوهرات الفاخرة
              </h1>
              <p className="text-gray-600 mt-2">
                قطع مجوهرات نادرة وأحجار كريمة من أرقى دور المجوهرات العالمية
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
            <div className="text-2xl font-bold text-purple-600">{allLuxuryJewelry.length}</div>
            <div className="text-sm text-gray-600">قطعة متاحة</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-gold-600">{brands.length - 1}</div>
            <div className="text-sm text-gray-600">دار مجوهرات</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">أحجار طبيعية</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600">خبراء معتمدون</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الماركة</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {brands.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الحجر</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع القطعة</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {jewelryTypes.map((type) => (
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>عرض {sortedJewelry.length} من أصل {allLuxuryJewelry.length} قطعة</span>
            <span>آخر تحديث: اليوم</span>
          </div>
        </motion.div>

        {/* Jewelry Listings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {sortedJewelry.map((jewelry, index) => {
            const CategoryIcon = getCategoryIcon(jewelry.category);
            return (
              <motion.div
                key={jewelry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-96 h-64' : 'h-64'} overflow-hidden`}>
                  <img
                    src={jewelry.images[0]}
                    alt={jewelry.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {jewelry.featured && (
                    <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-3 w-3 ml-1 fill-current" />
                      مميزة
                    </div>
                  )}

                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <div className="bg-gold-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {jewelry.brand}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getConditionColor(jewelry.condition)}`}>
                      {getConditionText(jewelry.condition)}
                    </div>
                    {jewelry.certificate && (
                      <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                        <FileCheck className="h-3 w-3 ml-1" />
                        {jewelry.certificate.issuer}
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Eye className="h-4 w-4" />
                          <span>{jewelry.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Heart className="h-4 w-4" />
                          <span>{jewelry.likes}</span>
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
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {(() => {
                        const CategoryIcon = getCategoryIcon(jewelry.category);
                        return <CategoryIcon className="h-4 w-4 text-purple-600" />;
                      })()}
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm font-medium">
                        {jewelry.category}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 ml-1" />
                      {jewelry.location.area}, {jewelry.location.city}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    <Link href={`/categories/jewelry/${jewelry.id}`}>
                      {jewelry.title}
                    </Link>
                  </h3>

                  <div className="text-sm text-gray-600 mb-3">
                    {jewelry.collection && `${jewelry.collection} - `}
                    {jewelry.type}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {jewelry.description}
                  </p>

                  {/* Jewelry Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    {jewelry.specs.mainStone && (
                      <>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                          <span>{jewelry.specs.mainStone.carat > 0 ? `${jewelry.specs.mainStone.carat} قيراط` : jewelry.specs.mainStone.type}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Sparkles className="h-4 w-4 text-gold-500" />
                          <span>{jewelry.specs.mainStone.color}</span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Scale className="h-4 w-4 text-gray-500" />
                      <span>{jewelry.specs.metal.type} {jewelry.specs.metal.purity}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>{jewelry.year}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {jewelry.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {jewelry.features.length > 3 && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                        +{jewelry.features.length - 3} المزيد
                      </span>
                    )}
                  </div>

                  <div className="text-3xl font-bold text-purple-600 mb-4">
                    {formatPrice(jewelry.price, jewelry.currency)}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-medium text-sm">
                          {jewelry.seller.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {jewelry.seller.name}
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {jewelry.seller.verified && (
                            <Shield className="h-3 w-3 text-green-500" />
                          )}
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 mr-1">{jewelry.seller.rating}</span>
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
                        href={`/categories/jewelry/${jewelry.id}`}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        التفاصيل
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            عرض المزيد من المجوهرات
          </button>
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">الأحجار الكريمة المميزة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1).map((category) => {
              const CategoryIcon = getCategoryIcon(category.value);
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <CategoryIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{category.label}</div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Jewelry Care Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">نصائح العناية بالمجوهرات الفاخرة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">الحماية</h4>
              <p className="text-purple-100 text-sm">احفظ مجوهراتك في علب منفصلة لتجنب الخدوش والتلف</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">التنظيف</h4>
              <p className="text-purple-100 text-sm">تنظيف لطيف بمحلول مخصص وفرشاة ناعمة للحفاظ على البريق</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileCheck className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">الفحص الدوري</h4>
              <p className="text-purple-100 text-sm">فحص دوري عند خبير معتمد للتأكد من سلامة الأحجار والمعادن</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryJewelryPage;
