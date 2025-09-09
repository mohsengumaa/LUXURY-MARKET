'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MapPin, Eye, Star } from 'lucide-react';

const FeaturedListings = () => {
  // Mock data - في التطبيق الحقيقي سيتم جلب البيانات من API
  const featuredListings = [
    {
      id: 1,
      title: 'فيلا فاخرة في جميرا',
      price: 15000000,
      currency: 'AED',
      location: 'دبي، الإمارات',
      category: 'عقارات',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      seller: {
        name: 'أحمد العلي',
        rating: 4.9,
        verified: true,
      },
      views: 2341,
      likes: 89,
      featured: true,
      specifications: {
        bedrooms: 6,
        bathrooms: 8,
        area: '800 م²',
      },
    },
    {
      id: 2,
      title: 'لامبورغيني أفينتادور 2023',
      price: 500000,
      currency: 'USD',
      location: 'الرياض، السعودية',
      category: 'سيارات',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      seller: {
        name: 'محمد الخالد',
        rating: 4.8,
        verified: true,
      },
      views: 1876,
      likes: 156,
      featured: true,
      specifications: {
        year: 2023,
        mileage: '5,000 كم',
        engine: 'V12',
      },
    },
    {
      id: 3,
      title: 'ساعة رولكس ديتونا ذهبية',
      price: 45000,
      currency: 'USD',
      location: 'الكويت، الكويت',
      category: 'ساعات',
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      seller: {
        name: 'فاطمة الزهراء',
        rating: 5.0,
        verified: true,
      },
      views: 934,
      likes: 67,
      featured: true,
      specifications: {
        brand: 'رولكس',
        model: 'ديتونا',
        material: 'ذهب 18 قيراط',
      },
    },
  ];

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ar-AE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-luxury font-bold text-gray-900 mb-4">
            إعلانات مميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف أفضل العروض المنتقاة بعناية من مجموعتنا الحصرية
          </p>
        </motion.div>

        {/* Listings Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredListings.map((listing) => (
            <motion.div
              key={listing.id}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 overflow-hidden">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Featured Badge */}
                  {listing.featured && (
                    <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      مميز
                    </div>
                  )}

                  {/* Actions */}
                  <div className="absolute top-4 left-4 flex space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-4 rtl:space-x-reverse text-white text-sm">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Eye className="h-4 w-4" />
                      <span>{listing.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Heart className="h-4 w-4" />
                      <span>{listing.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Location */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gold-600 text-sm font-medium bg-gold-50 px-2 py-1 rounded-full">
                      {listing.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 ml-1" />
                      {listing.location}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                    <Link href={`/listings/${listing.id}`}>
                      {listing.title}
                    </Link>
                  </h3>

                  {/* Specifications */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(listing.specifications).slice(0, 3).map(([key, value]) => (
                      <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {value}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    {formatPrice(listing.price, listing.currency)}
                  </div>

                  {/* Seller Info */}
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
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500 mr-1">
                            {listing.seller.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {listing.seller.verified && (
                      <div className="text-green-500 text-xs bg-green-50 px-2 py-1 rounded-full">
                        موثق
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/listings"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            عرض جميع الإعلانات
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedListings;
