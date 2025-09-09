'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/contexts/CurrencyContext';
import { ArrowRight } from 'lucide-react';

const CategoriesPage = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  const categories = [
    {
      id: 'real-estate',
      name: t('categories.realEstate'),
      description: 'قصور وفيلات وشقق فاخرة حول العالم',
      descriptionEn: 'Palaces, villas and luxury apartments worldwide',
      descriptionTr: 'Dünya çapında saraylar, villalar ve lüks daireler',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '2,547',
      subcategories: [
        'فيلات فاخرة',
        'قصور ملكية', 
        'شقق بنتهاوس',
        'منتجعات خاصة',
        'جزر خاصة'
      ],
      priceRange: '500K - 100M USD',
      topLocations: ['دبي', 'لندن', 'نيويورك', 'موناكو']
    },
    {
      id: 'cars',
      name: t('categories.cars'),
      description: 'سيارات رياضية وكلاسيكية نادرة',
      descriptionEn: 'Rare sports and classic cars',
      descriptionTr: 'Nadir spor ve klasik arabalar',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '7',
      subcategories: [
        'لامبورغيني',
        'فيراري',
        'مكلارين',
        'رولز رويس',
        'بنتلي',
        'بورش',
        'بوغاتي'
      ],
      priceRange: '850K - 12.5M AED',
      topLocations: ['دبي', 'أبوظبي', 'الرياض', 'الدوحة']
    },
    {
      id: 'watches',
      name: t('categories.watches'),
      description: 'ساعات سويسرية حصرية ومحدودة الإصدار',
      descriptionEn: 'Exclusive Swiss watches and limited editions',
      descriptionTr: 'Özel İsviçre saatleri ve sınırlı edisyonlar',
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '6',
      subcategories: [
        'رولكس',
        'باتيك فيليب',
        'أوديمار بيغيه',
        'ريتشارد ميل',
        'ساعات عتيقة'
      ],
      priceRange: '420K - 3.5M AED',
      topLocations: ['دبي', 'جنيف', 'هونغ كونغ', 'لندن']
    },
    {
      id: 'jewelry',
      name: t('categories.jewelry'),
      description: 'قطع مجوهرات نادرة وأحجار كريمة',
      descriptionEn: 'Rare jewelry pieces and precious stones',
      descriptionTr: 'Nadir mücevher parçaları ve değerli taşlar',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '6',
      subcategories: [
        'الماس',
        'الزمرد',
        'الياقوت',
        'اللؤلؤ',
        'مجوهرات تراثية'
      ],
      priceRange: '980K - 4.2M AED',
      topLocations: ['دبي', 'جنيف', 'نيويورك', 'هونغ كونغ']
    },
    {
      id: 'yachts',
      name: t('categories.yachts'),
      description: 'يخوت حديثة وقوارب فاخرة للبحار',
      descriptionEn: 'Modern yachts and luxury boats for the seas',
      descriptionTr: 'Modern yatlar ve denizler için lüks tekneler',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '324',
      subcategories: [
        'يخوت فائقة',
        'يخوت رياضية',
        'قوارب شراعية',
        'كاتاماران فاخر',
        'يخوت استكشافية'
      ],
      priceRange: '100K - 500M USD',
      topLocations: ['موناكو', 'فرنسا', 'إيطاليا', 'هولندا']
    },
    {
      id: 'private-jets',
      name: t('categories.privateJets'),
      description: 'طائرات خاصة وجيتات حديثة',
      descriptionEn: 'Private jets and modern aircraft',
      descriptionTr: 'Özel jetler ve modern uçaklar',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '187',
      subcategories: [
        'جيتات خفيفة',
        'جيتات متوسطة',
        'جيتات ثقيلة',
        'طائرات توربو',
        'هليكوبتر فاخرة'
      ],
      priceRange: '500K - 100M USD',
      topLocations: ['أمريكا', 'البرازيل', 'كندا', 'أوروبا']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-luxury font-bold text-gray-900 mb-6">
            فئات السلع الفاخرة
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استكشف مجموعتنا الحصرية من أفخر السلع المنتقاة بعناية من أفضل المصادر حول العالم
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/categories/${category.id}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Count Badge */}
                    <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {category.count} إعلان
                    </div>

                    {/* Price Range */}
                    <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                      {category.priceRange}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gold-600 transition-colors">
                        {category.name}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-gold-500 transform group-hover:translate-x-1 transition-transform" />
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Subcategories */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">الفئات الفرعية:</h4>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="text-xs bg-gold-100 text-gold-600 px-2 py-1 rounded-full">
                            +{category.subcategories.length - 3} المزيد
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Top Locations */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">المواقع الرئيسية:</h4>
                      <div className="flex flex-wrap gap-1">
                        {category.topLocations.map((location, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-gold-600 to-gold-700 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">أرقام مثيرة للإعجاب</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">24</div>
              <div className="text-gold-100">إجمالي الإعلانات</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">156</div>
              <div className="text-gold-100">دولة</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$2.4B</div>
              <div className="text-gold-100">قيمة الأصول</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-gold-100">رضا العملاء</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesPage;
