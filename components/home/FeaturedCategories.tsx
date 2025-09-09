'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'عقارات فاخرة',
      description: 'قصور وفيلات استثنائية حول العالم',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/categories/real-estate',
      count: '2,500+',
    },
    {
      id: 2,
      name: 'سيارات فاخرة',
      description: 'سيارات رياضية وكلاسيكية نادرة',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/categories/cars',
      count: '1,800+',
    },
    {
      id: 3,
      name: 'ساعات فاخرة',
      description: 'ساعات سويسرية حصرية ومحدودة الإصدار',
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/categories/watches',
      count: '950+',
    },
    {
      id: 4,
      name: 'مجوهرات',
      description: 'قطع مجوهرات نادرة وأحجار كريمة',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/categories/jewelry',
      count: '1,200+',
    },
    {
      id: 5,
      name: 'يخوت فاخرة',
      description: 'يخوت حديثة وقوارب فاخرة للبحار',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/categories/yachts',
      count: '320+',
    },
    {
      id: 6,
      name: 'طائرات خاصة',
      description: 'طائرات خاصة وجيتات حديثة',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/categories/private-jets',
      count: '180+',
    },
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
    <section className="py-20 bg-gray-50">
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
            فئات مميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف مجموعتنا الحصرية من أفخر السلع المنتقاة بعناية من حول العالم
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={category.href}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <span className="text-sm bg-gold-500 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                    <p className="text-gray-200 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-gold-400 group-hover:text-gold-300 transition-colors">
                      <span className="text-sm font-medium">استكشف المجموعة</span>
                      <ArrowRight className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
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
            href="/categories"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>استكشف جميع الفئات</span>
            <ArrowRight className="h-5 w-5 mr-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
