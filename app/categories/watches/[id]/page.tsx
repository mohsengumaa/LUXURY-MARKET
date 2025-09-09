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
  Watch,
  Clock,
  Gem,
  Timer,
  Droplets,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Package
} from 'lucide-react';
import Link from 'next/link';
import { allLuxuryWatches } from '@/data/luxuryWatchesData';

const WatchDetailPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // العثور على الساعة بناءً على ID
  const watch = allLuxuryWatches.find(w => w.id === parseInt(params.id as string));

  if (!watch) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">الساعة غير موجودة</h1>
          <Link href="/categories/watches" className="text-blue-600 hover:text-blue-700">
            العودة إلى الساعات
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
      prev === watch.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? watch.images.length - 1 : prev - 1
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
      case 'vintage': return 'عتيقة';
      default: return condition;
    }
  };

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Watch },
    { id: 'specs', name: 'المواصفات التقنية', icon: Settings },
    { id: 'features', name: 'المميزات', icon: Star },
    { id: 'authenticity', name: 'الأصالة والضمان', icon: Shield }
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
              <Link href="/categories/watches" className="text-gray-500 hover:text-gray-700">الساعات الفاخرة</Link>
            </li>
            <li className="flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-500 mx-2" />
              <span className="text-gray-900 font-medium">{watch.title}</span>
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
                  src={watch.images[currentImageIndex]}
                  alt={watch.title}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setShowImageGallery(true)}
                />
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
                  {watch.featured && (
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-3 w-3 ml-1 fill-current" />
                      مميزة
                    </div>
                  )}
                  <div className="bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {watch.brand}
                  </div>
                </div>

                {/* Condition Badge */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(watch.condition)}`}>
                    {getConditionText(watch.condition)}
                  </div>
                  {watch.limited && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      إصدار محدود
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                {watch.images.length > 1 && (
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
                  {currentImageIndex + 1} / {watch.images.length}
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-4 rtl:space-x-reverse text-white text-sm">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
                    <Eye className="h-4 w-4" />
                    <span>{watch.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
                    <Heart className="h-4 w-4" />
                    <span>{watch.likes}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {watch.images.length > 1 && (
                <div className="flex space-x-4 rtl:space-x-reverse mt-4 overflow-x-auto">
                  {watch.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
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

            {/* Watch Details */}
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
                        <span>{watch.location.area}, {watch.location.city}, {watch.location.country}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 ml-1" />
                        <span>موديل {watch.year}</span>
                      </div>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {watch.title}
                    </h1>

                    <div className="text-lg text-gray-600 mb-4">
                      {watch.model} - المرجع {watch.referenceNumber}
                    </div>

                    <div className="text-4xl font-bold text-blue-600 mb-6">
                      {formatPrice(watch.price, watch.currency)}
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
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{watch.specs.caseSize}</div>
                    <div className="text-sm text-gray-600">حجم العلبة</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                      <Gem className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{watch.specs.caseMaterial}</div>
                    <div className="text-sm text-gray-600">مادة العلبة</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <Timer className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{watch.specs.powerReserve}</div>
                    <div className="text-sm text-gray-600">احتياطي الطاقة</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-full mx-auto mb-2">
                      <Droplets className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{watch.specs.waterResistance}</div>
                    <div className="text-sm text-gray-600">مقاومة الماء</div>
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
                            ? 'border-blue-500 text-blue-600'
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">وصف الساعة</h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {watch.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">معلومات أساسية</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الماركة</span>
                            <span className="font-medium text-gray-900">{watch.brand}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الموديل</span>
                            <span className="font-medium text-gray-900">{watch.model}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">المرجع</span>
                            <span className="font-medium text-gray-900">{watch.referenceNumber}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">سنة الصنع</span>
                            <span className="font-medium text-gray-900">{watch.year}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">حالة الساعة</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الحالة</span>
                            <span className={`font-medium px-2 py-1 rounded-full text-sm ${getConditionColor(watch.condition)}`}>
                              {getConditionText(watch.condition)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الضمان</span>
                            <span className={`font-medium flex items-center ${watch.warranty ? 'text-green-600' : 'text-red-600'}`}>
                              {watch.warranty ? <CheckCircle className="h-4 w-4 ml-1" /> : <XCircle className="h-4 w-4 ml-1" />}
                              {watch.warranty ? 'متوفر' : 'غير متوفر'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">العلبة والأوراق</span>
                            <span className={`font-medium flex items-center ${watch.boxPapers ? 'text-green-600' : 'text-red-600'}`}>
                              {watch.boxPapers ? <CheckCircle className="h-4 w-4 ml-1" /> : <XCircle className="h-4 w-4 ml-1" />}
                              {watch.boxPapers ? 'متوفر' : 'غير متوفر'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">سجل الصيانة</span>
                            <span className={`font-medium flex items-center ${watch.serviceHistory ? 'text-green-600' : 'text-red-600'}`}>
                              {watch.serviceHistory ? <CheckCircle className="h-4 w-4 ml-1" /> : <XCircle className="h-4 w-4 ml-1" />}
                              {watch.serviceHistory ? 'متوفر' : 'غير متوفر'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">مواصفات العلبة</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">الحجم</span>
                          <span className="font-medium text-gray-900">{watch.specs.caseSize}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">المادة</span>
                          <span className="font-medium text-gray-900">{watch.specs.caseMaterial}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">الزجاج</span>
                          <span className="font-medium text-gray-900">{watch.specs.crystal}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">مقاومة الماء</span>
                          <span className="font-medium text-gray-900">{watch.specs.waterResistance}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">مواصفات الحركة</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">نوع الحركة</span>
                          <span className="font-medium text-gray-900">{watch.specs.movement}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">احتياطي الطاقة</span>
                          <span className="font-medium text-gray-900">{watch.specs.powerReserve}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">عدد الأحجار</span>
                          <span className="font-medium text-gray-900">{watch.specs.jewels}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">لون الميناء</span>
                          <span className="font-medium text-gray-900">{watch.specs.dialColor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">الوظائف</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {watch.specs.functions.map((func, index) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-800 font-medium">{func}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">المميزات والخصائص</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {watch.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'authenticity' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">معلومات الأصالة</h4>
                      <div className="space-y-3">
                        {watch.watchId && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">رقم الساعة</span>
                            <span className="font-medium text-gray-900">{watch.watchId}</span>
                          </div>
                        )}
                        {watch.serialNumber && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الرقم التسلسلي</span>
                            <span className="font-medium text-gray-900 font-mono">{watch.serialNumber}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">تاريخ الإعلان</span>
                          <span className="font-medium text-gray-900">
                            {new Date(watch.createdAt).toLocaleDateString('ar-AE')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {watch.limited && (
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h5 className="font-medium text-red-900 mb-2 flex items-center">
                          <Award className="h-5 w-5 ml-2" />
                          إصدار محدود
                        </h5>
                        {watch.limitedNumber && (
                          <p className="text-red-700">رقم القطعة: {watch.limitedNumber}</p>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg ${watch.warranty ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className={`flex items-center mb-2 ${watch.warranty ? 'text-green-700' : 'text-gray-600'}`}>
                          {watch.warranty ? <CheckCircle className="h-5 w-5 ml-2" /> : <XCircle className="h-5 w-5 ml-2" />}
                          <span className="font-medium">الضمان</span>
                        </div>
                        <p className={`text-sm ${watch.warranty ? 'text-green-600' : 'text-gray-500'}`}>
                          {watch.warranty ? 'ضمان ساري المفعول' : 'لا يوجد ضمان'}
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${watch.boxPapers ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className={`flex items-center mb-2 ${watch.boxPapers ? 'text-green-700' : 'text-gray-600'}`}>
                          {watch.boxPapers ? <Package className="h-5 w-5 ml-2" /> : <XCircle className="h-5 w-5 ml-2" />}
                          <span className="font-medium">العلبة والأوراق</span>
                        </div>
                        <p className={`text-sm ${watch.boxPapers ? 'text-green-600' : 'text-gray-500'}`}>
                          {watch.boxPapers ? 'علبة وأوراق أصلية' : 'بدون علبة أو أوراق'}
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${watch.serviceHistory ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className={`flex items-center mb-2 ${watch.serviceHistory ? 'text-green-700' : 'text-gray-600'}`}>
                          {watch.serviceHistory ? <FileText className="h-5 w-5 ml-2" /> : <XCircle className="h-5 w-5 ml-2" />}
                          <span className="font-medium">سجل الصيانة</span>
                        </div>
                        <p className={`text-sm ${watch.serviceHistory ? 'text-green-600' : 'text-gray-500'}`}>
                          {watch.serviceHistory ? 'سجل صيانة موثق' : 'لا يوجد سجل صيانة'}
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Watch className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{watch.seller.name}</h4>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                    {watch.seller.verified && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Shield className="h-4 w-4 ml-1" />
                        <span>بائع موثق</span>
                      </div>
                    )}
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-gray-600 mr-1">{watch.seller.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {watch.seller.type === 'authorized_dealer' ? 'وكيل معتمد' :
                     watch.seller.type === 'boutique' ? 'بوتيك فاخر' :
                     watch.seller.type === 'collector' ? 'جامع ساعات' : 'بائع فردي'}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
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

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-blue-700 text-sm mb-2">
                  <Shield className="h-4 w-4 ml-1" />
                  <span className="font-medium">ضمان الأصالة</span>
                </div>
                <p className="text-blue-600 text-sm">
                  جميع ساعاتنا مفحوصة من خبراء معتمدين ومضمونة الأصالة 100%
                </p>
              </div>
            </motion.div>

            {/* Watch Value */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">تقييم الساعة</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر المطلوب</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(watch.price, watch.currency)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">متوسط السوق</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(Math.round(watch.price * 0.95), watch.currency)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الفرق</span>
                  <span className="font-medium text-green-600">+5% أعلى من المتوسط</span>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600 mb-2">تقييم الحالة</div>
                  <div className="flex items-center">
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 mr-2">{getConditionText(watch.condition)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Watch Care Tips */}
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
                <li>• تجنب التعرض للمغناطيسية القوية</li>
                <li>• صيانة دورية كل 3-5 سنوات</li>
                <li>• تجنب الصدمات والسقوط</li>
                <li>• تنظيف لطيف بقطعة قماش ناعمة</li>
                <li>• تخزين آمن في علبة مناسبة</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchDetailPage;
