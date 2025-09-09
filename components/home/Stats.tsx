'use client';

import { motion } from 'framer-motion';
import { Users, ShoppingBag, Globe, Shield } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: ShoppingBag,
      value: '15,000+',
      label: 'إعلان فاخر',
      description: 'مجموعة متنوعة من أفخر السلع',
    },
    {
      icon: Users,
      value: '5,000+',
      label: 'عميل راضي',
      description: 'ثقة عملائنا هي أولويتنا',
    },
    {
      icon: Globe,
      value: '75+',
      label: 'دولة حول العالم',
      description: 'شبكة عالمية واسعة',
    },
    {
      icon: Shield,
      value: '99.9%',
      label: 'معاملات آمنة',
      description: 'أمان وموثوقية عالية',
    },
  ];

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
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center text-white"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500 rounded-full mb-4">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-gold-400 mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold mb-2">
                {stat.label}
              </div>
              <div className="text-gray-300 text-sm">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
