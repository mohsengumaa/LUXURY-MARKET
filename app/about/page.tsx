'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Award,
  Shield,
  Users,
  Globe,
  Star,
  Heart,
  Target,
  CheckCircle,
  TrendingUp,
  Crown,
  Sparkles,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Quote,
  Eye,
  Lock
} from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();

  const stats = [
    { number: '25+', label: 'إعلان فاخر', icon: Crown },
    { number: '500+', label: 'عميل راضٍ', icon: Users },
    { number: '15+', label: 'دولة', icon: Globe },
    { number: '99%', label: 'معدل الرضا', icon: Star }
  ];

  const values = [
    {
      icon: Shield,
      title: 'الأمان والثقة',
      description: 'نضمن أمان جميع المعاملات وحماية بيانات عملائنا بأعلى معايير الأمان العالمية'
    },
    {
      icon: Crown,
      title: 'الجودة الفائقة',
      description: 'نختار بعناية فائقة كل منتج لضمان أعلى مستويات الجودة والأصالة'
    },
    {
      icon: Heart,
      title: 'الخدمة المتميزة',
      description: 'نقدم خدمة عملاء استثنائية مع فريق متخصص في عالم الفخامة'
    },
    {
      icon: Globe,
      title: 'الوصول العالمي',
      description: 'نوصل الفخامة إلى كل مكان في العالم مع شبكة شاملة من الشركاء'
    }
  ];

  const team = [
    {
      name: 'أحمد الخليفي',
      position: 'المؤسس والرئيس التنفيذي',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'خبير في عالم الفخامة مع 15 عاماً من الخبرة في السوق الفاخر'
    },
    {
      name: 'فاطمة النعيمي',
      position: 'مديرة العمليات',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'متخصصة في إدارة المشاريع الفاخرة مع خبرة دولية واسعة'
    },
    {
      name: 'محمد الشامسي',
      position: 'مدير التطوير التقني',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'خبير في التكنولوجيا مع شغف بتطوير حلول مبتكرة للفخامة'
    },
    {
      name: 'سارة الكندي',
      position: 'مديرة التسويق',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'متخصصة في التسويق الفاخر مع رؤية إبداعية للعلامة التجارية'
    }
  ];

  const achievements = [
    {
      year: '2020',
      title: 'تأسيس المنصة',
      description: 'انطلاق منصة الفخامة الأولى في المنطقة'
    },
    {
      year: '2021',
      title: 'التوسع الإقليمي',
      description: 'وصول المنصة إلى 10 دول عربية'
    },
    {
      year: '2022',
      title: 'الجائزة الذهبية',
      description: 'فوز بجائزة أفضل منصة تجارة إلكترونية فاخرة'
    },
    {
      year: '2023',
      title: 'الشراكة العالمية',
      description: 'شراكة استراتيجية مع كبرى العلامات الفاخرة'
    },
    {
      year: '2024',
      title: 'الابتكار التقني',
      description: 'إطلاق تقنيات الذكاء الاصطناعي للفخامة'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gold-50 via-white to-gold-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gold-100 rounded-full">
                <Crown className="h-12 w-12 text-gold-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-luxury font-bold text-gray-900 mb-6">
              من نحن
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              منصة الفخامة الأولى في العالم العربي، نربط بين عشاق الفخامة وأرقى المنتجات والخدمات
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-gold-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-luxury font-bold text-gray-900 mb-6">
                قصتنا
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                بدأت رحلتنا في عام 2020 برؤية واضحة: إنشاء منصة تجمع بين عشاق الفخامة 
                وأرقى المنتجات والخدمات في العالم. نحن نؤمن بأن الفخامة ليست مجرد منتج، 
                بل تجربة استثنائية تستحق أن تُعاش.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                اليوم، نحن فخورون بأن نكون الوجهة الأولى للمشترين والبائعين في عالم 
                الفخامة، مع شبكة واسعة من الشركاء والعلامات التجارية الرائدة عالمياً.
              </p>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center text-gold-600">
                  <CheckCircle className="h-5 w-5 ml-2" />
                  <span className="font-medium">شهادات معتمدة</span>
                </div>
                <div className="flex items-center text-gold-600">
                  <CheckCircle className="h-5 w-5 ml-2" />
                  <span className="font-medium">ضمان الجودة</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="منصة الفخامة"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">رؤيتنا للمستقبل</h3>
                  <p className="text-sm opacity-90">نحو عالم أكثر فخامة وتميزاً</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-luxury font-bold text-gray-900 mb-6">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نؤمن بقيم راسخة توجه كل قرار نتخذه وكل خدمة نقدمها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-luxury font-bold text-gray-900 mb-6">
              فريقنا المتميز
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نخبة من الخبراء والمتخصصين في عالم الفخامة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gold-600 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-luxury font-bold text-gray-900 mb-6">
              رحلتنا عبر السنوات
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              محطات مهمة في مسيرتنا نحو التميز والريادة
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gold-200"></div>
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-gold-600 font-bold text-lg mb-2">
                        {achievement.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gold-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gold-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-luxury font-bold text-gray-900 mb-6">
                مهمتنا ورؤيتنا
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">مهمتنا</h3>
                    <p className="text-gray-600 leading-relaxed">
                      تقديم تجربة فاخرة استثنائية لعملائنا من خلال ربطهم بأرقى المنتجات 
                      والخدمات في العالم، مع ضمان الجودة والأصالة في كل تفصيل.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">رؤيتنا</h3>
                    <p className="text-gray-600 leading-relaxed">
                      أن نكون المنصة الرائدة عالمياً في عالم الفخامة، ونقطة الالتقاء 
                      الأولى لكل من يبحث عن التميز والجودة في كل ما يقتنيه.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="رؤيتنا ومهمتنا"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <Quote className="h-8 w-8 mb-4 opacity-80" />
                  <p className="text-lg font-medium italic">
                    "الفخامة ليست مجرد منتج، بل تجربة تستحق أن تُعاش"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-luxury font-bold mb-6">
              تواصل معنا
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نحن هنا لخدمتك في أي وقت. تواصل معنا لمعرفة المزيد عن خدماتنا
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gold-500 rounded-full mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">العنوان</h3>
              <p className="text-gray-300">
                برج دبي المالي<br />
                الطابق 45، مكتب 4501<br />
                دبي، الإمارات العربية المتحدة
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gold-500 rounded-full mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">الهاتف</h3>
              <p className="text-gray-300">
                +971 4 123 4567<br />
                +971 50 123 4567
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gold-500 rounded-full mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">البريد الإلكتروني</h3>
              <p className="text-gray-300">
                info@luxury-marketplace.ae<br />
                support@luxury-marketplace.ae
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 flex items-center mx-auto">
              <span>ابدأ رحلتك معنا</span>
              <ArrowRight className="h-5 w-5 mr-2" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
