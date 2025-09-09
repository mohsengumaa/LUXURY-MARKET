'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import {
  MapPin,
  Heart,
  Eye,
  Share2,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Camera,
  Shield,
  Award,
  Gem,
  Crown,
  Sparkles,
  Scale,
  FileCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Package,
  Ruler
} from 'lucide-react';
import Link from 'next/link';
import { allLuxuryJewelry } from '@/data/luxuryJewelryData';

const JewelryDetailPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // العثور على القطعة بناءً على ID
  const jewelry = allLuxuryJewelry.find(j => j.id === parseInt(params.id as string));

  if (!jewelry) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">القطعة غير موجودة</h1>
          <Link href="/categories/jewelry" className="text-purple-600 hover:text-purple-700">
            العودة إلى المجوهرات
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    const formatted = new Intl.NumberFormat('ar-AE', {
      minimumFractionDigits: 0,
    }).format(price);
    
    const currencySymbol = currency === 'AED' ? 'د.إ' : currency === 'SAR' ? 'ر.س' : '$';
    return `${formatted} ${currencySymbol}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === jewelry.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? jewelry.images.length - 1 : prev - 1
    );
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

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

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Gem },
    { id: 'stones', name: 'الأحجار والمعادن', icon: Sparkles },
    { id: 'features', name: 'المميزات', icon: Star },
    { id: 'certificates', name: 'الشهادات والأصالة', icon: FileCheck }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">الرئيسية</Link>
            </li>
            <li className="flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-500 mx-2" />
              <Link href="/categories" className="text-gray-500 hover:text-gray-700">الفئات</Link>
            </li>
            <li className="flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-500 mx-2" />
              <Link href="/categories/jewelry" className="text-gray-500 hover:text-gray-700">المجوهرات الفاخرة</Link>
            </li>
            <li className="flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-500 mx-2" />
              <span className="text-gray-900 font-medium">{jewelry.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-8"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-2xl overflow-hidden">
                <img
                  src={jewelry.images[currentImageIndex]}
                  alt={jewelry.title}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setShowImageGallery(true)}
                />
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
                  {jewelry.featured && (
                    <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-3 w-3 ml-1 fill-current" />
                      مميزة
                    </div>
                  )}
                  <div className="bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {jewelry.brand}
                  </div>
                </div>

                {/* Condition and Certificate Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(jewelry.condition)}`}>
                    {getConditionText(jewelry.condition)}
                  </div>
                  {jewelry.certificate && (
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <FileCheck className="h-3 w-3 ml-1" />
                      {jewelry.certificate.issuer}
                    </div>
                  )}
                  {jewelry.limited && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      إصدار محدود
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                {jewelry.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Camera className="h-4 w-4 ml-1" />
                  {currentImageIndex + 1} / {jewelry.images.length}
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-4 rtl:space-x-reverse text-white text-sm">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
                    <Eye className="h-4 w-4" />
                    <span>{jewelry.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
                    <Heart className="h-4 w-4" />
                    <span>{jewelry.likes}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {jewelry.images.length > 1 && (
                <div className="flex space-x-4 rtl:space-x-reverse mt-4 overflow-x-auto">
                  {jewelry.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`صورة ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Jewelry Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 ml-1" />
                        <span>{jewelry.location.area}, {jewelry.location.city}, {jewelry.location.country}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 ml-1" />
                        <span>صُنعت عام {jewelry.year}</span>
                      </div>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {jewelry.title}
                    </h1>

                    <div className="text-lg text-gray-600 mb-4">
                      {jewelry.collection && `${jewelry.collection} - `}
                      {jewelry.type} - {jewelry.category}
                    </div>

                    <div className="text-4xl font-bold text-purple-600 mb-6">
                      {formatPrice(jewelry.price, jewelry.currency)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={handleFavorite}
                      className={`p-3 rounded-full transition-colors ${
                        isFavorited ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-3 bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl">
                  {jewelry.specs.mainStone && (
                    <>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                          <Sparkles className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {jewelry.specs.mainStone.carat > 0 ? `${jewelry.specs.mainStone.carat}` : jewelry.specs.mainStone.type}
                        </div>
                        <div className="text-sm text-gray-600">
                          {jewelry.specs.mainStone.carat > 0 ? 'قيراط' : 'الحجر الرئيسي'}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-gold-100 rounded-full mx-auto mb-2">
                          <Sparkles className="h-6 w-6 text-gold-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{jewelry.specs.mainStone.color}</div>
                        <div className="text-sm text-gray-600">اللون</div>
                      </div>
                    </>
                  )}
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                      <Scale className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{jewelry.specs.metal.type}</div>
                    <div className="text-sm text-gray-600">{jewelry.specs.metal.purity}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <Crown className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{jewelry.specs.metal.weight}g</div>
                    <div className="text-sm text-gray-600">وزن المعدن</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-100">
                <nav className="flex space-x-8 rtl:space-x-reverse px-8">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 rtl:space-x-reverse py-4 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">وصف القطعة</h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {jewelry.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">معلومات أساسية</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الماركة</span>
                            <span className="font-medium text-gray-900">{jewelry.brand}</span>
                          </div>
                          {jewelry.collection && (
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">المجموعة</span>
                              <span className="font-medium text-gray-900">{jewelry.collection}</span>
                            </div>
                          )}
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">النوع</span>
                            <span className="font-medium text-gray-900">{jewelry.type}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الفئة</span>
                            <span className="font-medium text-gray-900">{jewelry.category}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">سنة الصنع</span>
                            <span className="font-medium text-gray-900">{jewelry.year}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">حالة القطعة</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الحالة</span>
                            <span className={`font-medium px-2 py-1 rounded-full text-sm ${getConditionColor(jewelry.condition)}`}>
                              {getConditionText(jewelry.condition)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الضمان</span>
                            <span className={`font-medium flex items-center ${jewelry.warranty ? 'text-green-600' : 'text-red-600'}`}>
                              {jewelry.warranty ? <CheckCircle className="h-4 w-4 ml-1" /> : <XCircle className="h-4 w-4 ml-1" />}
                              {jewelry.warranty ? 'متوفر' : 'غير متوفر'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">العلبة والأوراق</span>
                            <span className={`font-medium flex items-center ${jewelry.boxPapers ? 'text-green-600' : 'text-red-600'}`}>
                              {jewelry.boxPapers ? <CheckCircle className="h-4 w-4 ml-1" /> : <XCircle className="h-4 w-4 ml-1" />}
                              {jewelry.boxPapers ? 'متوفر' : 'غير متوفر'}
                            </span>
                          </div>
                          {jewelry.appraisal && (
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">تقييم معتمد</span>
                              <span className="font-medium text-green-600 flex items-center">
                                <CheckCircle className="h-4 w-4 ml-1" />
                                {formatPrice(jewelry.appraisal.value, jewelry.currency)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'stones' && (
                  <div className="space-y-8">
                    {jewelry.specs.mainStone && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">الحجر الرئيسي</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-purple-50 rounded-xl">
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-purple-100">
                              <span className="text-gray-600">النوع</span>
                              <span className="font-medium text-gray-900">{jewelry.specs.mainStone.type}</span>
                            </div>
                            {jewelry.specs.mainStone.carat > 0 && (
                              <div className="flex justify-between py-2 border-b border-purple-100">
                                <span className="text-gray-600">الوزن</span>
                                <span className="font-medium text-gray-900">{jewelry.specs.mainStone.carat} قيراط</span>
                              </div>
                            )}
                            <div className="flex justify-between py-2 border-b border-purple-100">
                              <span className="text-gray-600">اللون</span>
                              <span className="font-medium text-gray-900">{jewelry.specs.mainStone.color}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-purple-100">
                              <span className="text-gray-600">النقاء</span>
                              <span className="font-medium text-gray-900">{jewelry.specs.mainStone.clarity}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-purple-100">
                              <span className="text-gray-600">القطع</span>
                              <span className="font-medium text-gray-900">{jewelry.specs.mainStone.cut}</span>
                            </div>
                            {jewelry.specs.mainStone.origin && (
                              <div className="flex justify-between py-2 border-b border-purple-100">
                                <span className="text-gray-600">المنشأ</span>
                                <span className="font-medium text-gray-900">{jewelry.specs.mainStone.origin}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">المعدن</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gold-50 rounded-xl">
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gold-100">
                            <span className="text-gray-600">النوع</span>
                            <span className="font-medium text-gray-900">{jewelry.specs.metal.type}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gold-100">
                            <span className="text-gray-600">النقاء</span>
                            <span className="font-medium text-gray-900">{jewelry.specs.metal.purity}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gold-100">
                            <span className="text-gray-600">الوزن</span>
                            <span className="font-medium text-gray-900">{jewelry.specs.metal.weight} جرام</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {jewelry.specs.additionalStones && jewelry.specs.additionalStones.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">الأحجار الإضافية</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {jewelry.specs.additionalStones.map((stone, index) => (
                            <div key={index} className="p-4 bg-blue-50 rounded-lg">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">النوع</span>
                                  <span className="font-medium text-gray-900">{stone.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">العدد</span>
                                  <span className="font-medium text-gray-900">{stone.count}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">الوزن الإجمالي</span>
                                  <span className="font-medium text-gray-900">{stone.totalCarat} قيراط</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {jewelry.specs.dimensions && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">الأبعاد</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {jewelry.specs.dimensions.length && (
                            <div className="p-4 bg-gray-50 rounded-lg text-center">
                              <Ruler className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                              <div className="font-medium text-gray-900">{jewelry.specs.dimensions.length} مم</div>
                              <div className="text-sm text-gray-600">الطول</div>
                            </div>
                          )}
                          {jewelry.specs.dimensions.width && (
                            <div className="p-4 bg-gray-50 rounded-lg text-center">
                              <Ruler className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                              <div className="font-medium text-gray-900">{jewelry.specs.dimensions.width} مم</div>
                              <div className="text-sm text-gray-600">العرض</div>
                            </div>
                          )}
                          {jewelry.specs.dimensions.diameter && (
                            <div className="p-4 bg-gray-50 rounded-lg text-center">
                              <Ruler className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                              <div className="font-medium text-gray-900">{jewelry.specs.dimensions.diameter} مم</div>
                              <div className="text-sm text-gray-600">القطر</div>
                            </div>
                          )}
                          {jewelry.specs.dimensions.thickness && (
                            <div className="p-4 bg-gray-50 rounded-lg text-center">
                              <Ruler className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                              <div className="font-medium text-gray-900">{jewelry.specs.dimensions.thickness} مم</div>
                              <div className="text-sm text-gray-600">السُمك</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">المميزات والخصائص</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {jewelry.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'certificates' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">معلومات الأصالة</h4>
                      <div className="space-y-3">
                        {jewelry.jewelryId && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">رقم القطعة</span>
                            <span className="font-medium text-gray-900">{jewelry.jewelryId}</span>
                          </div>
                        )}
                        {jewelry.serialNumber && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الرقم التسلسلي</span>
                            <span className="font-medium text-gray-900 font-mono">{jewelry.serialNumber}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">تاريخ الإعلان</span>
                          <span className="font-medium text-gray-900">
                            {new Date(jewelry.createdAt).toLocaleDateString('ar-AE')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {jewelry.certificate && (
                      <div className="p-6 bg-green-50 rounded-xl">
                        <h5 className="font-medium text-green-900 mb-4 flex items-center">
                          <FileCheck className="h-5 w-5 ml-2" />
                          شهادة الأصالة
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-green-700 text-sm">الجهة المُصدرة</span>
                            <div className="font-medium text-green-900">{jewelry.certificate.issuer}</div>
                          </div>
                          <div>
                            <span className="text-green-700 text-sm">رقم الشهادة</span>
                            <div className="font-medium text-green-900 font-mono">{jewelry.certificate.number}</div>
                          </div>
                          <div>
                            <span className="text-green-700 text-sm">تاريخ الإصدار</span>
                            <div className="font-medium text-green-900">
                              {new Date(jewelry.certificate.date).toLocaleDateString('ar-AE')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {jewelry.appraisal && (
                      <div className="p-6 bg-blue-50 rounded-xl">
                        <h5 className="font-medium text-blue-900 mb-4 flex items-center">
                          <Scale className="h-5 w-5 ml-2" />
                          التقييم المعتمد
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-blue-700 text-sm">القيمة المقدرة</span>
                            <div className="font-medium text-blue-900">{formatPrice(jewelry.appraisal.value, jewelry.currency)}</div>
                          </div>
                          <div>
                            <span className="text-blue-700 text-sm">المقيم</span>
                            <div className="font-medium text-blue-900">{jewelry.appraisal.appraiser}</div>
                          </div>
                          <div>
                            <span className="text-blue-700 text-sm">تاريخ التقييم</span>
                            <div className="font-medium text-blue-900">
                              {new Date(jewelry.appraisal.date).toLocaleDateString('ar-AE')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {jewelry.limited && (
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h5 className="font-medium text-red-900 mb-2 flex items-center">
                          <Award className="h-5 w-5 ml-2" />
                          إصدار محدود
                        </h5>
                        {jewelry.limitedNumber && (
                          <p className="text-red-700">رقم القطعة: {jewelry.limitedNumber}</p>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg ${jewelry.warranty ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className={`flex items-center mb-2 ${jewelry.warranty ? 'text-green-700' : 'text-gray-600'}`}>
                          {jewelry.warranty ? <CheckCircle className="h-5 w-5 ml-2" /> : <XCircle className="h-5 w-5 ml-2" />}
                          <span className="font-medium">الضمان</span>
                        </div>
                        <p className={`text-sm ${jewelry.warranty ? 'text-green-600' : 'text-gray-500'}`}>
                          {jewelry.warranty ? 'ضمان ساري المفعول' : 'لا يوجد ضمان'}
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${jewelry.boxPapers ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className={`flex items-center mb-2 ${jewelry.boxPapers ? 'text-green-700' : 'text-gray-600'}`}>
                          {jewelry.boxPapers ? <Package className="h-5 w-5 ml-2" /> : <XCircle className="h-5 w-5 ml-2" />}
                          <span className="font-medium">العلبة والأوراق</span>
                        </div>
                        <p className={`text-sm ${jewelry.boxPapers ? 'text-green-600' : 'text-gray-500'}`}>
                          {jewelry.boxPapers ? 'علبة وأوراق أصلية' : 'بدون علبة أو أوراق'}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-blue-50">
                        <div className="flex items-center mb-2 text-blue-700">
                          <Shield className="h-5 w-5 ml-2" />
                          <span className="font-medium">ضمان الأصالة</span>
                        </div>
                        <p className="text-sm text-blue-600">
                          100% أصلية ومضمونة
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Seller */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">تواصل مع البائع</h3>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gem className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{jewelry.seller.name}</h4>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                    {jewelry.seller.verified && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Shield className="h-4 w-4 ml-1" />
                        <span>بائع موثق</span>
                      </div>
                    )}
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-gray-600 mr-1">{jewelry.seller.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {jewelry.seller.type === 'authorized_dealer' ? 'وكيل معتمد' :
                     jewelry.seller.type === 'boutique' ? 'بوتيك فاخر' :
                     jewelry.seller.type === 'jeweler' ? 'صائغ محترف' :
                     jewelry.seller.type === 'collector' ? 'جامع مجوهرات' : 'بائع فردي'}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <Phone className="h-5 w-5 ml-2" />
                  اتصال مباشر
                </button>
                
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 ml-2" />
                  واتساب
                </button>
                
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <Mail className="h-5 w-5 ml-2" />
                  إرسال إيميل
                </button>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center text-purple-700 text-sm mb-2">
                  <Shield className="h-4 w-4 ml-1" />
                  <span className="font-medium">ضمان الأصالة</span>
                </div>
                <p className="text-purple-600 text-sm">
                  جميع مجوهراتنا مفحوصة من خبراء معتمدين ومضمونة الأصالة 100%
                </p>
              </div>
            </motion.div>

            {/* Jewelry Value */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">تقييم القطعة</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر المطلوب</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(jewelry.price, jewelry.currency)}
                  </span>
                </div>
                
                {jewelry.appraisal && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">التقييم المعتمد</span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(jewelry.appraisal.value, jewelry.currency)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">الفرق</span>
                      <span className={`font-medium ${jewelry.price < jewelry.appraisal.value ? 'text-green-600' : 'text-red-600'}`}>
                        {jewelry.price < jewelry.appraisal.value ? 'سعر مناسب' : 'أعلى من التقييم'}
                      </span>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600 mb-2">تقييم الحالة</div>
                  <div className="flex items-center">
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 mr-2">{getConditionText(jewelry.condition)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Jewelry Care Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
                <Shield className="h-5 w-5 ml-2" />
                نصائح العناية
              </h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• احفظ القطعة في علبة منفصلة لتجنب الخدوش</li>
                <li>• تنظيف لطيف بمحلول مخصص للمجوهرات</li>
                <li>• تجنب التعرض للمواد الكيميائية والعطور</li>
                <li>• فحص دوري عند خبير معتمد</li>
                <li>• تأمين شامل ضد السرقة والفقدان</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryDetailPage;
