'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import {
  MapPin,
  Heart,
  Eye,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Waves,
  Trees,
  Crown,
  Filter,
  Grid,
  List,
  Search
} from 'lucide-react';
import Link from 'next/link';

const RealEstatePage = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // بيانات العقارات الفاخرة الحقيقية
  const realEstateListings = [
    {
      id: 1,
      title: 'قصر ملكي في جميرا - دبي',
      titleEn: 'Royal Palace in Jumeirah - Dubai',
      titleTr: 'Jumeirah\'da Kraliyet Sarayı - Dubai',
      price: 45000000,
      currency: 'AED',
      location: {
        city: 'دبي',
        area: 'جميرا',
        country: 'الإمارات العربية المتحدة'
      },
      type: 'قصر',
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      specs: {
        bedrooms: 8,
        bathrooms: 12,
        area: 2500,
        parking: 6,
        pool: true,
        garden: true,
        beachfront: true
      },
      features: [
        'إطلالة على البحر',
        'مسبح خاص',
        'حديقة واسعة',
        'مصعد خاص',
        'نظام أمان متطور',
        'مطبخ إيطالي فاخر',
        'غرفة سينما',
        'جيم خاص'
      ],
      description: 'قصر ملكي استثنائي في أرقى مناطق دبي، يجمع بين الفخامة والحداثة. يتميز بتصميم معماري فريد وإطلالة خلابة على الخليج العربي.',
      views: 15420,
      likes: 342,
      featured: true,
      seller: {
        name: 'شركة الإمارات للعقارات الفاخرة',
        verified: true,
        rating: 4.9
      },
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'فيلا حديثة في البحيرات - دبي',
      titleEn: 'Modern Villa in The Lakes - Dubai',
      titleTr: 'The Lakes\'te Modern Villa - Dubai',
      price: 8500000,
      currency: 'AED',
      location: {
        city: 'دبي',
        area: 'البحيرات',
        country: 'الإمارات العربية المتحدة'
      },
      type: 'فيلا',
      images: [
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600563438938-a42d1efb1b3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      specs: {
        bedrooms: 5,
        bathrooms: 6,
        area: 850,
        parking: 3,
        pool: true,
        garden: true,
        beachfront: false
      },
      features: [
        'تصميم حديث',
        'مسبح خاص',
        'حديقة مناظر طبيعية',
        'مطبخ مفتوح',
        'غرفة خادمة',
        'تكييف مركزي',
        'أنظمة ذكية'
      ],
      description: 'فيلا حديثة في مجتمع البحيرات الهادئ، تتميز بالتصميم العصري والمساحات الواسعة المثالية للعائلات.',
      views: 8750,
      likes: 198,
      featured: false,
      seller: {
        name: 'أحمد العلي العقارية',
        verified: true,
        rating: 4.7
      },
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      title: 'بنتهاوس فاخر في وسط دبي',
      titleEn: 'Luxury Penthouse in Downtown Dubai',
      titleTr: 'Dubai Downtown\'da Lüks Çatı Katı',
      price: 12000000,
      currency: 'AED',
      location: {
        city: 'دبي',
        area: 'وسط دبي',
        country: 'الإمارات العربية المتحدة'
      },
      type: 'بنتهاوس',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      specs: {
        bedrooms: 4,
        bathrooms: 5,
        area: 650,
        parking: 2,
        pool: false,
        garden: false,
        beachfront: false
      },
      features: [
        'إطلالة على برج خليفة',
        'تشطيبات فاخرة',
        'شرفة واسعة',
        'مصعد خاص',
        'كونسيرج 24/7',
        'جيم وسبا',
        'أمان متطور'
      ],
      description: 'بنتهاوس حصري في قلب دبي مع إطلالة مذهلة على برج خليفة ونافورة دبي، يوفر أسلوب حياة فاخر لا مثيل له.',
      views: 12340,
      likes: 287,
      featured: true,
      seller: {
        name: 'مجموعة الذهب العقارية',
        verified: true,
        rating: 4.8
      },
      createdAt: '2024-01-08'
    },
    {
      id: 4,
      title: 'قصر تراثي في الرياض',
      titleEn: 'Heritage Palace in Riyadh',
      titleTr: 'Riyad\'da Miras Sarayı',
      price: 25000000,
      currency: 'SAR',
      location: {
        city: 'الرياض',
        area: 'حي السفارات',
        country: 'المملكة العربية السعودية'
      },
      type: 'قصر',
      images: [
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      specs: {
        bedrooms: 10,
        bathrooms: 15,
        area: 3200,
        parking: 8,
        pool: true,
        garden: true,
        beachfront: false
      },
      features: [
        'تصميم تراثي أصيل',
        'حدائق واسعة',
        'مجلس رجال فاخر',
        'مجلس نساء منفصل',
        'مسبح مغطى',
        'ملاعب رياضية',
        'بيت ضيافة',
        'مسجد خاص'
      ],
      description: 'قصر تراثي فخم في أرقى أحياء الرياض، يجمع بين الأصالة والحداثة، مثالي للعائلات الكبيرة واستقبال الضيوف.',
      views: 9870,
      likes: 156,
      featured: true,
      seller: {
        name: 'قصور الرياض العقارية',
        verified: true,
        rating: 4.9
      },
      createdAt: '2024-01-05'
    },
    {
      id: 5,
      title: 'منتجع خاص في جزيرة النخلة',
      titleEn: 'Private Resort on Palm Island',
      titleTr: 'Palm Island\'da Özel Tatil Köyü',
      price: 85000000,
      currency: 'AED',
      location: {
        city: 'دبي',
        area: 'جزيرة النخلة',
        country: 'الإمارات العربية المتحدة'
      },
      type: 'منتجع',
      images: [
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      specs: {
        bedrooms: 12,
        bathrooms: 18,
        area: 5000,
        parking: 15,
        pool: true,
        garden: true,
        beachfront: true
      },
      features: [
        'شاطئ خاص 200 متر',
        'مرسى لليخوت',
        'مهبط طائرات هليكوبتر',
        'سبا ومركز صحي',
        'مطاعم متعددة',
        'ملاعب تنس',
        'نادي شاطئي',
        'أجنحة ضيوف متعددة'
      ],
      description: 'منتجع خاص استثنائي على جزيرة النخلة، يوفر خصوصية تامة وتجربة حياة فاخرة لا تُنسى مع جميع المرافق الترفيهية.',
      views: 25680,
      likes: 512,
      featured: true,
      seller: {
        name: 'مجموعة الإمارات الفاخرة',
        verified: true,
        rating: 5.0
      },
      createdAt: '2024-01-01'
    },
    {
      id: 6,
      title: 'شقة فاخرة في برج خليفة',
      titleEn: 'Luxury Apartment in Burj Khalifa',
      titleTr: 'Burj Khalifa\'da Lüks Daire',
      price: 18000000,
      currency: 'AED',
      location: {
        city: 'دبي',
        area: 'وسط دبي',
        country: 'الإمارات العربية المتحدة'
      },
      type: 'شقة فاخرة',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      specs: {
        bedrooms: 3,
        bathrooms: 4,
        area: 450,
        parking: 2,
        pool: false,
        garden: false,
        beachfront: false
      },
      features: [
        'الطابق 124',
        'إطلالة بانورامية',
        'تشطيبات أرماني',
        'خدمة كونسيرج',
        'مرافق 5 نجوم',
        'أمان متطور',
        'مواقف مخصصة'
      ],
      description: 'شقة حصرية في أطول برج في العالم، تقع في الطابق 124 مع إطلالة خلابة على دبي وتشطيبات أرماني الفاخرة.',
      views: 18950,
      likes: 398,
      featured: true,
      seller: {
        name: 'إعمار العقارية',
        verified: true,
        rating: 4.8
      },
      createdAt: '2024-01-03'
    }
  ];

  const subcategories = [
    { value: 'all', label: 'جميع الأنواع', count: realEstateListings.length },
    { value: 'قصر', label: 'قصور ملكية', count: 3 },
    { value: 'فيلا', label: 'فيلات فاخرة', count: 1 },
    { value: 'بنتهاوس', label: 'بنتهاوس', count: 1 },
    { value: 'منتجع', label: 'منتجعات خاصة', count: 1 },
    { value: 'شقة فاخرة', label: 'شقق فاخرة', count: 1 }
  ];

  const locations = [
    { value: 'all', label: 'جميع المواقع' },
    { value: 'دبي', label: 'دبي' },
    { value: 'الرياض', label: 'الرياض' },
    { value: 'الدوحة', label: 'الدوحة' },
    { value: 'الكويت', label: 'الكويت' }
  ];

  const priceRanges = [
    { value: 'all', label: 'جميع الأسعار' },
    { value: '0-5000000', label: 'أقل من 5 مليون' },
    { value: '5000000-15000000', label: '5-15 مليون' },
    { value: '15000000-50000000', label: '15-50 مليون' },
    { value: '50000000+', label: 'أكثر من 50 مليون' }
  ];

  const formatPrice = (price: number, currency: string) => {
    const formatted = new Intl.NumberFormat('ar-AE', {
      minimumFractionDigits: 0,
    }).format(price);
    
    const currencySymbol = currency === 'AED' ? 'د.إ' : 'ر.س';
    return `${formatted} ${currencySymbol}`;
  };

  const filteredListings = realEstateListings.filter(listing => {
    if (selectedSubcategory !== 'all' && listing.type !== selectedSubcategory) return false;
    if (selectedLocation !== 'all' && listing.location.city !== selectedLocation) return false;
    
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        if (listing.price < min || listing.price > max) return false;
      } else {
        if (listing.price < min) return false;
      }
    }
    
    return true;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
            <span className="text-gold-600">العقارات الفاخرة</span>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="p-3 bg-gold-100 rounded-full">
              <Crown className="h-8 w-8 text-gold-600" />
            </div>
            <div>
              <h1 className="text-4xl font-luxury font-bold text-gray-900">
                العقارات الفاخرة
              </h1>
              <p className="text-gray-600 mt-2">
                قصور وفيلات استثنائية في أفضل المواقع حول العالم
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع العقار</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {subcategories.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label} ({sub.count})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="featured">المميزة أولاً</option>
                <option value="price-high">الأعلى سعراً</option>
                <option value="price-low">الأقل سعراً</option>
                <option value="newest">الأحدث</option>
                <option value="popular">الأكثر مشاهدة</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gold-100 text-gold-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gold-100 text-gold-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>عرض {sortedListings.length} من أصل {realEstateListings.length} عقار</span>
            <span>آخر تحديث: اليوم</span>
          </div>
        </motion.div>

        {/* Listings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {sortedListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-96 h-64' : 'h-64'} overflow-hidden`}>
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {listing.featured && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Crown className="h-3 w-3 ml-1" />
                    مميز
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Eye className="h-4 w-4" />
                        <span>{listing.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Heart className="h-4 w-4" />
                        <span>{listing.likes}</span>
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
                    {listing.type}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 ml-1" />
                    {listing.location.area}, {listing.location.city}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                  <Link href={`/listings/${listing.id}`}>
                    {listing.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {listing.description}
                </p>

                {/* Specs */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Bed className="h-4 w-4" />
                    <span>{listing.specs.bedrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Bath className="h-4 w-4" />
                    <span>{listing.specs.bathrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Square className="h-4 w-4" />
                    <span>{listing.specs.area} م²</span>
                  </div>
                  {listing.specs.pool && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-blue-600">
                      <Waves className="h-4 w-4" />
                    </div>
                  )}
                  {listing.specs.garden && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-green-600">
                      <Trees className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {listing.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {listing.features.length > 3 && (
                    <span className="text-xs bg-gold-100 text-gold-600 px-2 py-1 rounded">
                      +{listing.features.length - 3} المزيد
                    </span>
                  )}
                </div>

                <div className="text-3xl font-bold text-gold-600 mb-4">
                  {formatPrice(listing.price, listing.currency)}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                      <span className="text-gold-600 font-medium text-sm">
                        {listing.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {listing.seller.name}
                      </div>
                      {listing.seller.verified && (
                        <div className="text-xs text-green-600">موثق ✓</div>
                      )}
                    </div>
                  </div>
                  
                  <Link
                    href={`/listings/${listing.id}`}
                    className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    عرض التفاصيل
                  </Link>
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
          <button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            عرض المزيد من العقارات
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default RealEstatePage;
