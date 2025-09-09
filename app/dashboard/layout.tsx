'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Heart,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  Shield,
  Menu,
  X,
  Crown,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // التحقق من تسجيل الدخول
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const userRole = session.user.role || 'buyer';

  // قوائم التنقل حسب نوع المستخدم
  const navigation = [
    {
      name: 'نظرة عامة',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['buyer', 'seller', 'admin']
    },
    {
      name: 'إعلاناتي',
      href: '/dashboard/listings',
      icon: Package,
      roles: ['seller', 'admin']
    },
    {
      name: 'إضافة إعلان',
      href: '/dashboard/listings/new',
      icon: PlusCircle,
      roles: ['seller', 'admin']
    },
    {
      name: 'المفضلة',
      href: '/dashboard/favorites',
      icon: Heart,
      roles: ['buyer', 'seller', 'admin']
    },
    {
      name: 'الرسائل',
      href: '/dashboard/messages',
      icon: MessageSquare,
      roles: ['buyer', 'seller', 'admin']
    },
    {
      name: 'إدارة المستخدمين',
      href: '/dashboard/users',
      icon: Users,
      roles: ['admin']
    },
    {
      name: 'التقارير',
      href: '/dashboard/analytics',
      icon: BarChart3,
      roles: ['admin']
    },
    {
      name: 'الإعدادات',
      href: '/dashboard/settings',
      icon: Settings,
      roles: ['buyer', 'seller', 'admin']
    }
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Crown className="h-8 w-8 text-gold-500" />
            <span className="font-luxury text-xl font-bold text-gold-500">
              Luxury Market
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || ''}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-gold-600 font-semibold">
                  {session.user.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900">
                {session.user.name}
              </div>
              <div className="text-sm text-gray-500">
                {userRole === 'admin' ? 'مدير' :
                 userRole === 'seller' ? 'بائع' : 'مشتري'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {filteredNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg text-gray-700 hover:bg-gold-50 hover:text-gold-600 transition-colors group"
            >
              <item.icon className="h-5 w-5 group-hover:text-gold-600" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:mr-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="text-sm text-gray-500">
                آخر تحديث: {new Date().toLocaleDateString('ar-AE')}
              </div>
              
              {userRole === 'seller' && (
                <Link
                  href="/dashboard/listings/new"
                  className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>إعلان جديد</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
