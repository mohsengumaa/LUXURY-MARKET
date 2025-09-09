'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  Package,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingBag,
  Clock,
  Star,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalListings: number;
  totalViews: number;
  totalFavorites: number;
  totalMessages: number;
  totalRevenue?: number;
  totalUsers?: number;
  pendingListings?: number;
  featuredListings?: number;
}

interface RecentActivity {
  id: string;
  type: 'listing' | 'message' | 'favorite' | 'view';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

const DashboardOverview = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    totalViews: 0,
    totalFavorites: 0,
    totalMessages: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const userRole = session?.user?.role || 'buyer';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // في التطبيق الحقيقي، ستكون هذه API calls حقيقية
      // هنا سنستخدم بيانات تجريبية
      
      if (userRole === 'admin') {
        setStats({
          totalListings: 1250,
          totalViews: 45000,
          totalFavorites: 3200,
          totalMessages: 890,
          totalRevenue: 125000,
          totalUsers: 5420,
          pendingListings: 23,
          featuredListings: 156,
        });
        
        setRecentActivity([
          {
            id: '1',
            type: 'listing',
            title: 'إعلان جديد يحتاج مراجعة',
            description: 'فيلا فاخرة في دبي - أحمد العلي',
            timestamp: '2024-01-15T10:30:00Z',
            user: 'أحمد العلي'
          },
          {
            id: '2',
            type: 'message',
            title: 'رسالة جديدة',
            description: 'استفسار عن ساعة رولكس',
            timestamp: '2024-01-15T09:15:00Z',
            user: 'فاطمة محمد'
          }
        ]);
      } else if (userRole === 'seller') {
        setStats({
          totalListings: 12,
          totalViews: 2340,
          totalFavorites: 89,
          totalMessages: 34,
          totalRevenue: 45000,
        });
        
        setRecentActivity([
          {
            id: '1',
            type: 'view',
            title: 'مشاهدة جديدة',
            description: 'شخص شاهد إعلان "سيارة لامبورغيني"',
            timestamp: '2024-01-15T11:00:00Z'
          },
          {
            id: '2',
            type: 'favorite',
            title: 'إضافة للمفضلة',
            description: 'تم إضافة "ساعة رولكس" للمفضلة',
            timestamp: '2024-01-15T10:45:00Z'
          }
        ]);
      } else {
        setStats({
          totalListings: 0,
          totalViews: 0,
          totalFavorites: 15,
          totalMessages: 8,
        });
        
        setRecentActivity([
          {
            id: '1',
            type: 'favorite',
            title: 'أضفت للمفضلة',
            description: 'فيلا فاخرة في الرياض',
            timestamp: '2024-01-15T12:00:00Z'
          }
        ]);
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-AE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'قبل أقل من ساعة';
    if (diffInHours < 24) return `قبل ${diffInHours} ساعة`;
    return `قبل ${Math.floor(diffInHours / 24)} يوم`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          مرحباً، {session?.user?.name}
        </h1>
        <p className="text-gray-600">
          {userRole === 'admin' ? 'إدارة المنصة والإشراف على جميع العمليات' :
           userRole === 'seller' ? 'إدارة إعلاناتك ومتابعة أداء مبيعاتك' :
           'تصفح واشتر أفخر السلع من منصتنا'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userRole === 'admin' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+12%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.totalUsers?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">إجمالي المستخدمين</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+8%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.totalRevenue ? formatCurrency(stats.totalRevenue) : '$0'}
              </div>
              <div className="text-sm text-gray-600">إجمالي الإيرادات</div>
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: userRole === 'admin' ? 0.2 : 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gold-100 rounded-full">
              <Package className="h-6 w-6 text-gold-600" />
            </div>
            {userRole !== 'buyer' && (
              <span className="text-sm text-green-600 font-medium">+5%</span>
            )}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.totalListings.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {userRole === 'buyer' ? 'الإعلانات المحفوظة' : 'إجمالي الإعلانات'}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: userRole === 'admin' ? 0.3 : 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.totalViews.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">إجمالي المشاهدات</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: userRole === 'admin' ? 0.4 : 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+7%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.totalFavorites.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">إجمالي الإعجابات</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: userRole === 'admin' ? 0.5 : 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-indigo-600" />
            </div>
            {stats.totalMessages > 0 && (
              <span className="text-sm text-red-600 font-medium">
                {stats.totalMessages > 5 ? 'جديد' : ''}
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.totalMessages.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">الرسائل</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">النشاط الأخير</h3>
            <Link
              href="/dashboard/activity"
              className="text-gold-600 hover:text-gold-700 text-sm font-medium"
            >
              عرض الكل
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'listing' ? 'bg-blue-100' :
                    activity.type === 'message' ? 'bg-green-100' :
                    activity.type === 'favorite' ? 'bg-red-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'listing' ? <Package className="h-4 w-4 text-blue-600" /> :
                     activity.type === 'message' ? <MessageSquare className="h-4 w-4 text-green-600" /> :
                     activity.type === 'favorite' ? <Heart className="h-4 w-4 text-red-600" /> :
                     <Eye className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {activity.description}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد أنشطة حديثة</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">إجراءات سريعة</h3>

          <div className="space-y-4">
            {userRole === 'seller' && (
              <>
                <Link
                  href="/dashboard/listings/new"
                  className="flex items-center justify-between p-4 bg-gold-50 hover:bg-gold-100 rounded-xl transition-colors group"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="p-2 bg-gold-100 rounded-full group-hover:bg-gold-200">
                      <Package className="h-5 w-5 text-gold-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">إضافة إعلان جديد</div>
                      <div className="text-sm text-gray-600">أنشئ إعلان لسلعة فاخرة</div>
                    </div>
                  </div>
                  <div className="text-gold-600">←</div>
                </Link>

                <Link
                  href="/dashboard/listings"
                  className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200">
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">إدارة الإعلانات</div>
                      <div className="text-sm text-gray-600">عرض وتعديل إعلاناتك</div>
                    </div>
                  </div>
                  <div className="text-blue-600">←</div>
                </Link>
              </>
            )}

            <Link
              href="/dashboard/messages"
              className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="p-2 bg-green-100 rounded-full group-hover:bg-green-200">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">الرسائل</div>
                  <div className="text-sm text-gray-600">
                    {stats.totalMessages > 0 ? `${stats.totalMessages} رسالة جديدة` : 'لا توجد رسائل جديدة'}
                  </div>
                </div>
              </div>
              {stats.totalMessages > 0 && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.totalMessages}
                </div>
              )}
            </Link>

            <Link
              href="/dashboard/favorites"
              className="flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">المفضلة</div>
                  <div className="text-sm text-gray-600">
                    {stats.totalFavorites} عنصر محفوظ
                  </div>
                </div>
              </div>
              <div className="text-red-600">←</div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Performance Chart Placeholder */}
      {userRole !== 'buyer' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {userRole === 'admin' ? 'إحصائيات المنصة' : 'أداء إعلاناتك'}
            </h3>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>آخر 30 يوم</span>
            </div>
          </div>

          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>الرسم البياني للأداء</p>
              <p className="text-sm">سيتم إضافة الرسوم البيانية قريباً</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardOverview;
