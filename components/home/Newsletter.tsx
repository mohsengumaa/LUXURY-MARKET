'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gold-600 to-gold-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
            <Mail className="h-8 w-8 text-white" />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-white">
              ابق على اطلاع
            </h2>
            <p className="text-xl text-gold-100 max-w-2xl mx-auto">
              احصل على آخر الأخبار والعروض الحصرية لأفخر السلع مباشرة في بريدك الإلكتروني
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
              >
                <CheckCircle className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  شكراً لك!
                </h3>
                <p className="text-gold-100">
                  تم تسجيل بريدك الإلكتروني بنجاح. سنرسل لك أحدث العروض قريباً.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                    className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-gold-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-100" />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-white hover:bg-gray-100 text-gold-600 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>اشترك الآن</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-white mb-2">عروض حصرية</h4>
              <p className="text-gold-100 text-sm">
                احصل على عروض خاصة قبل الجميع
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <h4 className="font-semibold text-white mb-2">تحديثات السوق</h4>
              <p className="text-gold-100 text-sm">
                آخر أخبار وتطورات السوق الفاخر
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💎</div>
              <h4 className="font-semibold text-white mb-2">قطع نادرة</h4>
              <p className="text-gold-100 text-sm">
                إشعارات عن القطع النادرة والمحدودة
              </p>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-gold-100 text-sm max-w-lg mx-auto">
            نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث. 
            يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
