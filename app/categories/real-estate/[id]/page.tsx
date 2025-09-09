'use client';

import { useState, useEffect } from 'react';
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
  Bed,
  Bath,
  Square,
  Car,
  Waves,
  Trees,
  Calendar,
  Crown,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Camera,
  Shield,
  Award,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { allRealEstate } from '@/data/realEstateData';

const PropertyDetailPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // العثور على العقار بناءً على ID
  const property = allRealEstate.find(p => p.id === parseInt(params.id as string));

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">العقار غير موجود</h1>
          <Link href="/categories/real-estate" className="text-gold-600 hover:text-gold-700">
            العودة إلى العقارات
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    const formatted = new Intl.NumberFormat('ar-AE', {
      minimumFractionDigits: 0,
    }).format(price);
    
    let currencySymbol = '';
    switch (currency) {
      case 'AED':
        currencySymbol = 'د.إ';
        break;
      case 'SAR':
        currencySymbol = 'ر.س';
        break;
      case 'EUR':
        currencySymbol = '€';
        break;
      default:
        currencySymbol = '$';
    }
    
    return `${formatted} ${currencySymbol}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

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
              <Link href="/categories/real-estate" className="text-gray-500 hover:text-gray-700">العقارات الفاخرة</Link>
            </li>
            <li className="flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-500 mx-2" />
              <span className="text-gray-900 font-medium">{property.title}</span>
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
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setShowImageGallery(true)}
                />
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
                  {property.featured && (
                    <div className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Crown className="h-3 w-3 ml-1" />
                      مميز
                    </div>
                  )}
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.type}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {property.images.length > 1 && (
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
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-4 rtl:space-x-reverse text-white text-sm">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
                    <Eye className="h-4 w-4" />
                    <span>{property.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
                    <Heart className="h-4 w-4" />
                    <span>{property.likes}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <div className="flex space-x-4 rtl:space-x-reverse mt-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-gold-500' : 'border-gray-200'
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

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 ml-1" />
                      <span>{property.location.area}, {property.location.city}, {property.location.country}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 ml-1" />
                      <span>بُني عام {property.yearBuilt}</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {property.title}
                  </h1>

                  <div className="text-4xl font-bold text-gold-600 mb-6">
                    {formatPrice(property.price, property.currency)}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                    <Bed className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.specs.bedrooms}</div>
                  <div className="text-sm text-gray-600">غرف نوم</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                    <Bath className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.specs.bathrooms}</div>
                  <div className="text-sm text-gray-600">حمام</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                    <Square className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.specs.area.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">متر مربع</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                    <Car className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.specs.parking}</div>
                  <div className="text-sm text-gray-600">موقف سيارة</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">وصف العقار</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">المميزات والخدمات</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">تفاصيل إضافية</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">عدد الطوابق</span>
                      <span className="font-medium text-gray-900">{property.specs.floors || 'غير محدد'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">مفروش</span>
                      <span className="font-medium text-gray-900">{property.specs.furnished ? 'نعم' : 'لا'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">مسبح</span>
                      <span className="font-medium text-gray-900">{property.specs.pool ? 'نعم' : 'لا'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">حديقة</span>
                      <span className="font-medium text-gray-900">{property.specs.garden ? 'نعم' : 'لا'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">إطلالة على البحر</span>
                      <span className="font-medium text-gray-900">{property.specs.beachfront ? 'نعم' : 'لا'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">معلومات العقار</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">رقم العقار</span>
                      <span className="font-medium text-gray-900">{property.propertyId}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">تاريخ الإعلان</span>
                      <span className="font-medium text-gray-900">
                        {new Date(property.createdAt).toLocaleDateString('ar-AE')}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">الحالة</span>
                      <span className={`font-medium ${
                        property.status === 'available' ? 'text-green-600' :
                        property.status === 'sold' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {property.status === 'available' ? 'متاح' :
                         property.status === 'sold' ? 'مباع' : 'محجوز'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">عدد المشاهدات</span>
                      <span className="font-medium text-gray-900">{property.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">تواصل مع المطور</h3>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center">
                  <Home className="h-8 w-8 text-gold-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{property.seller.name}</h4>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                    {property.seller.verified && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Shield className="h-4 w-4 ml-1" />
                        <span>مطور موثق</span>
                      </div>
                    )}
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-gray-600 mr-1">{property.seller.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
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

              <div className="mt-6 p-4 bg-gold-50 rounded-lg">
                <div className="flex items-center text-gold-700 text-sm mb-2">
                  <Award className="h-4 w-4 ml-1" />
                  <span className="font-medium">ضمان الجودة</span>
                </div>
                <p className="text-gold-600 text-sm">
                  جميع عقاراتنا مفحوصة ومضمونة الجودة مع خدمة ما بعد البيع
                </p>
              </div>
            </motion.div>

            {/* Property Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">إحصائيات العقار</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر لكل متر مربع</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(Math.round(property.price / property.specs.area), property.currency)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">متوسط المنطقة</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(Math.round(property.price / property.specs.area * 0.85), property.currency)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الفرق</span>
                  <span className="font-medium text-green-600">+15% أعلى من المتوسط</span>
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
                <li>• تحقق من هوية المطور قبل أي دفعة</li>
                <li>• اطلب معاينة العقار شخصياً</li>
                <li>• تأكد من صحة الأوراق القانونية</li>
                <li>• لا تدفع مبالغ كبيرة دون ضمانات</li>
                <li>• استعن بخبير قانوني للعقود</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
