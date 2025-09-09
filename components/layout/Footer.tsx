'use client';

import Link from 'next/link';
import { Crown, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Crown className="h-8 w-8 text-gold-500" />
              <span className="font-luxury text-xl font-bold text-gold-400">
                Luxury Market
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              منصة حصرية لبيع وشراء أفخر السلع في العالم. نوفر تجربة تسوق استثنائية للعملاء المميزين.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold-400">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  كيف يعمل الموقع
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  الأسعار والاشتراكات
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  المدونة
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  الوظائف
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold-400">الفئات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/real-estate" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  عقارات فاخرة
                </Link>
              </li>
              <li>
                <Link href="/categories/cars" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  سيارات فاخرة
                </Link>
              </li>
              <li>
                <Link href="/categories/watches" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  ساعات فاخرة
                </Link>
              </li>
              <li>
                <Link href="/categories/jewelry" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  مجوهرات
                </Link>
              </li>
              <li>
                <Link href="/categories/yachts" className="text-gray-300 hover:text-gold-500 transition-colors text-sm">
                  يخوت
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold-400">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-4 w-4 text-gold-500" />
                <span className="text-gray-300 text-sm">info@luxurymarket.com</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-4 w-4 text-gold-500" />
                <span className="text-gray-300 text-sm">+971 4 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-4 w-4 text-gold-500" />
                <span className="text-gray-300 text-sm">دبي، الإمارات العربية المتحدة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Luxury Market. جميع الحقوق محفوظة.
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <Link href="/privacy" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">
                شروط الاستخدام
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">
                سياسة ملفات تعريف الارتباط
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
