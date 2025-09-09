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
  Car,
  Gauge,
  Fuel,
  Settings,
  Zap,
  Users,
  DoorOpen,
  Navigation,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { allLuxuryCars } from '@/data/luxuryCarsData';

const CarDetailPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // العثور على السيارة بناءً على ID
  const car = allLuxuryCars.find(c => c.id === parseInt(params.id as string));

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">السيارة غير موجودة</h1>
          <Link href="/categories/cars" className="text-red-600 hover:text-red-700">
            العودة إلى السيارات
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
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Car },
    { id: 'specs', name: 'المواصفات', icon: Settings },
    { id: 'features', name: 'المميزات', icon: Star },
    { id: 'history', name: 'تاريخ السيارة', icon: FileText }
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
              <Link href="/categories/cars" className="text-gray-500 hover:text-gray-700">السيارات الفاخرة</Link>
            </li>
            <li className="flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-500 mx-2" />
              <span className="text-gray-900 font-medium">{car.title}</span>
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
                  src={car.images[currentImageIndex]}
                  alt={car.title}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setShowImageGallery(true)}
                />
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
                  {car.featured && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-3 w-3 ml-1 fill-current" />
                      مميزة
                    </div>
                  )}
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {car.brand}
                  </div>
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {car.year}
                  </div>
                </div>

                {/* Condition Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    car.condition === 'new' ? 'bg-green-500 text-white' :
                    car.condition === 'certified' ? 'bg-blue-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {car.condition === 'new' ? 'جديدة' :
                     car.condition === 'certified' ? 'معتمدة' : 'مستعملة'}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {car.images.length > 1 && (
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
                  {currentImageIndex + 1} / {car.images.length}
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-4 rtl:space-x-reverse text-white text-sm">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
                    <Eye className="h-4 w-4" />
                    <span>{car.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
                    <Heart className="h-4 w-4" />
                    <span>{car.likes}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {car.images.length > 1 && (
                <div className="flex space-x-4 rtl:space-x-reverse mt-4 overflow-x-auto">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-red-500' : 'border-gray-200'
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

            {/* Car Details */}
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
                        <span>{car.location.area}, {car.location.city}, {car.location.country}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 ml-1" />
                        <span>موديل {car.year}</span>
                      </div>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {car.title}
                    </h1>

                    <div className="text-4xl font-bold text-red-600 mb-6">
                      {formatPrice(car.price, car.currency)}
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
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                      <Gauge className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{car.specs.horsepower}</div>
                    <div className="text-sm text-gray-600">حصان</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{car.specs.acceleration}</div>
                    <div className="text-sm text-gray-600">0-100 كم/س</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <Navigation className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{car.specs.topSpeed}</div>
                    <div className="text-sm text-gray-600">كم/س سرعة قصوى</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                      <Fuel className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{car.specs.mileage.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">كيلومتر</div>
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
                            ? 'border-red-500 text-red-600'
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">وصف السيارة</h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {car.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">معلومات أساسية</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الماركة</span>
                            <span className="font-medium text-gray-900">{car.brand}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الموديل</span>
                            <span className="font-medium text-gray-900">{car.model}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">سنة الصنع</span>
                            <span className="font-medium text-gray-900">{car.year}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">نوع الوقود</span>
                            <span className="font-medium text-gray-900">{car.specs.fuelType}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">حالة السيارة</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الحالة</span>
                            <span className={`font-medium flex items-center ${
                              car.condition === 'new' ? 'text-green-600' :
                              car.condition === 'certified' ? 'text-blue-600' : 'text-yellow-600'
                            }`}>
                              <CheckCircle className="h-4 w-4 ml-1" />
                              {car.condition === 'new' ? 'جديدة' :
                               car.condition === 'certified' ? 'معتمدة' : 'مستعملة'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">الضمان</span>
                            <span className={`font-medium flex items-center ${car.warranty ? 'text-green-600' : 'text-red-600'}`}>
                              {car.warranty ? <CheckCircle className="h-4 w-4 ml-1" /> : <XCircle className="h-4 w-4 ml-1" />}
                              {car.warranty ? 'متوفر' : 'غير متوفر'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">سجل الصيانة</span>
                            <span className={`font-medium flex items-center ${car.serviceHistory ? 'text-green-600' : 'text-red-600'}`}>
                              {car.serviceHistory ? <CheckCircle className="h-4 w-4 ml-1" /> : <XCircle className="h-4 w-4 ml-1" />}
                              {car.serviceHistory ? 'متوفر' : 'غير متوفر'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">حوادث</span>
                            <span className={`font-medium flex items-center ${!car.accidents ? 'text-green-600' : 'text-red-600'}`}>
                              {!car.accidents ? <CheckCircle className="h-4 w-4 ml-1" /> : <AlertTriangle className="h-4 w-4 ml-1" />}
                              {!car.accidents ? 'خالية من الحوادث' : 'تعرضت لحوادث'}
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">مواصفات المحرك</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">نوع المحرك</span>
                          <span className="font-medium text-gray-900">{car.specs.engine}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">القوة</span>
                          <span className="font-medium text-gray-900">{car.specs.horsepower} حصان</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">التسارع</span>
                          <span className="font-medium text-gray-900">{car.specs.acceleration}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">السرعة القصوى</span>
                          <span className="font-medium text-gray-900">{car.specs.topSpeed} كم/س</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">مواصفات عامة</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">ناقل الحركة</span>
                          <span className="font-medium text-gray-900">{car.specs.transmission}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">نظام الدفع</span>
                          <span className="font-medium text-gray-900">{car.specs.drivetrain}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">عدد الأبواب</span>
                          <span className="font-medium text-gray-900">{car.specs.doors}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">عدد المقاعد</span>
                          <span className="font-medium text-gray-900">{car.specs.seats}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">المميزات والتجهيزات</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">معلومات السيارة</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">رقم السيارة</span>
                          <span className="font-medium text-gray-900">{car.carId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">تاريخ الإعلان</span>
                          <span className="font-medium text-gray-900">
                            {new Date(car.createdAt).toLocaleDateString('ar-AE')}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">المسافة المقطوعة</span>
                          <span className="font-medium text-gray-900">{car.specs.mileage.toLocaleString()} كم</span>
                        </div>
                      </div>
                    </div>

                    {car.vin && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">رقم الهيكل (VIN)</h5>
                        <p className="text-blue-700 font-mono">{car.vin}</p>
                      </div>
                    )}
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
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Car className="h-8 w-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{car.seller.name}</h4>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                    {car.seller.verified && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Shield className="h-4 w-4 ml-1" />
                        <span>بائع موثق</span>
                      </div>
                    )}
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-gray-600 mr-1">{car.seller.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {car.seller.type === 'dealer' ? 'معرض سيارات' :
                     car.seller.type === 'showroom' ? 'صالة عرض' : 'بائع فردي'}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
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

              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <div className="flex items-center text-red-700 text-sm mb-2">
                  <Award className="h-4 w-4 ml-1" />
                  <span className="font-medium">ضمان الجودة</span>
                </div>
                <p className="text-red-600 text-sm">
                  جميع سياراتنا مفحوصة ومضمونة الجودة مع خدمة ما بعد البيع
                </p>
              </div>
            </motion.div>

            {/* Car Value */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">تقييم السيارة</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر المطلوب</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(car.price, car.currency)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">متوسط السوق</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(Math.round(car.price * 0.92), car.currency)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الفرق</span>
                  <span className="font-medium text-green-600">+8% أعلى من المتوسط</span>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600 mb-2">تقييم الحالة</div>
                  <div className="flex items-center">
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 mr-2">ممتازة</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Safety Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
                <Shield className="h-5 w-5 ml-2" />
                نصائح الأمان
              </h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• تحقق من هوية البائع قبل أي دفعة</li>
                <li>• اطلب معاينة السيارة شخصياً</li>
                <li>• تأكد من صحة الأوراق والرخص</li>
                <li>• افحص السيارة عند خبير</li>
                <li>• لا تدفع مبالغ كبيرة دون ضمانات</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
