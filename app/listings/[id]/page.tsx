'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Eye, 
  MapPin, 
  Calendar, 
  Share2, 
  Phone, 
  Mail, 
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield
} from 'lucide-react';
import Link from 'next/link';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  subcategory?: string;
  images: string[];
  videos?: string[];
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
  };
  seller: {
    _id: string;
    name: string;
    email: string;
    image?: string;
    phone?: string;
  };
  specifications?: { [key: string]: any };
  tags: string[];
  views: number;
  favorites: string[];
  featured: boolean;
  status: string;
  createdAt: string;
}

const ListingDetailPage = () => {
  const params = useParams();
  const { data: session } = useSession();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchListing();
    }
  }, [params.id]);

  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listings/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setListing(data.listing);
        setIsFavorited(data.listing.favorites.includes(session?.user?.id));
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!session) {
      alert('يجب تسجيل الدخول أولاً');
      return;
    }

    try {
      const response = await fetch(`/api/listings/${params.id}/favorite`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setIsFavorited(data.favorited);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ar-AE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    if (listing) {
      setCurrentImageIndex((prev) => 
        prev === listing.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (listing) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? listing.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">الإعلان غير موجود</h1>
          <Link href="/listings" className="text-gold-600 hover:text-gold-700">
            العودة إلى الإعلانات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4 rtl:space-x-reverse">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                الرئيسية
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-500 mx-2" />
              <Link href="/listings" className="text-gray-500 hover:text-gray-700">
                الإعلانات
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-500 mx-2" />
              <span className="text-gray-900 font-medium">{listing.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-2xl overflow-hidden">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-96 object-cover"
                />
                
                {listing.featured && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    مميز
                  </div>
                )}

                {listing.images.length > 1 && (
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

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
                  {listing.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {listing.images.length > 1 && (
                <div className="flex space-x-4 rtl:space-x-reverse mt-4 overflow-x-auto">
                  {listing.images.map((image, index) => (
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
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="bg-gold-100 text-gold-600 px-3 py-1 rounded-full text-sm font-medium">
                    {listing.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="h-4 w-4 ml-1" />
                    {listing.views} مشاهدة
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Heart className="h-4 w-4 ml-1" />
                    {listing.favorites.length} إعجاب
                  </div>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={handleFavorite}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorited ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {listing.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 ml-2" />
                <span>{listing.location.address}, {listing.location.city}, {listing.location.country}</span>
              </div>

              <div className="text-4xl font-bold text-gold-600 mb-8">
                {formatPrice(listing.price, listing.currency)}
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">الوصف</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Specifications */}
              {listing.specifications && Object.keys(listing.specifications).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">المواصفات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(listing.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {listing.tags.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">العلامات</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Seller */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">تواصل مع البائع</h3>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                  {listing.seller.image ? (
                    <img
                      src={listing.seller.image}
                      alt={listing.seller.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gold-600 font-semibold text-lg">
                      {listing.seller.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{listing.seller.name}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 ml-1 text-green-500" />
                    <span>بائع موثق</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {session ? (
                  <>
                    <button className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 ml-2" />
                      إرسال رسالة
                    </button>
                    
                    {listing.seller.phone && (
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                        <Phone className="h-5 w-5 ml-2" />
                        اتصال هاتفي
                      </button>
                    )}
                    
                    <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                      <Mail className="h-5 w-5 ml-2" />
                      إرسال إيميل
                    </button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">يجب تسجيل الدخول للتواصل مع البائع</p>
                    <Link
                      href="/auth/signin"
                      className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      تسجيل الدخول
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Listing Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">معلومات الإعلان</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ النشر</span>
                  <span className="font-medium text-gray-900">
                    {new Date(listing.createdAt).toLocaleDateString('ar-AE')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">رقم الإعلان</span>
                  <span className="font-medium text-gray-900">
                    #{listing._id.slice(-6)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد المشاهدات</span>
                  <span className="font-medium text-gray-900">
                    {listing.views.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">الحالة</span>
                  <span className="font-medium text-green-600">
                    متاح
                  </span>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
                <Shield className="h-5 w-5 ml-2" />
                نصائح الأمان
              </h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• تأكد من هوية البائع قبل الشراء</li>
                <li>• اطلب معاينة السلعة شخصياً</li>
                <li>• لا تدفع مبالغ مقدماً دون ضمانات</li>
                <li>• استخدم وسائل دفع آمنة</li>
                <li>• أبلغ عن أي نشاط مشبوه</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
