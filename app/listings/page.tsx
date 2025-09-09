'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, MapPin, Heart, Eye, Star, Home, Car, Clock, Gem } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/contexts/CurrencyContext';

// استيراد البيانات من جميع الفئات
import { allRealEstate } from '@/data/realEstateData';
import { allLuxuryCars } from '@/data/luxuryCarsData';
import { allLuxuryWatches } from '@/data/luxuryWatchesData';
import { allLuxuryJewelry } from '@/data/luxuryJewelryData';

interface Listing {
  id: number;
  title: string;
  titleEn?: string;
  titleTr?: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  type?: string;
  brand?: string;
  images: string[];
  location: {
    city: string;
    area?: string;
    country: string;
  };
  seller: {
    name: string;
    image?: string;
    verified?: boolean;
  };
  views: number;
  favorites: string[];
  featured: boolean;
  createdAt: string;
  condition?: string;
  year?: number;
}

const ListingsPage = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    featured: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  const categories = [
    { value: '', label: 'جميع الفئات', icon: null },
    { value: 'real-estate', label: 'عقارات فاخرة', icon: Home },
    { value: 'cars', label: 'سيارات فاخرة', icon: Car },
    { value: 'watches', label: 'ساعات فاخرة', icon: Clock },
    { value: 'jewelry', label: 'مجوهرات فاخرة', icon: Gem },
  ];

  const locations = [
    { value: '', label: 'جميع المواقع' },
    { value: 'دبي', label: 'دبي' },
    { value: 'أبوظبي', label: 'أبوظبي' },
    { value: 'الرياض', label: 'الرياض' },
    { value: 'الدوحة', label: 'الدوحة' },
    { value: 'الكويت', label: 'الكويت' },
  ];

  // دالة لتحميل جميع الإعلانات
  const loadAllListings = () => {
    const allListings: Listing[] = [
      // العقارات
      ...allRealEstate.map(item => ({
        ...item,
        _id: `real-estate-${item.id}`,
        category: 'real-estate',
        views: Math.floor(Math.random() * 1000) + 100,
        favorites: [],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      })),
      // السيارات
      ...allLuxuryCars.map(item => ({
        ...item,
        _id: `cars-${item.id}`,
        category: 'cars',
        views: Math.floor(Math.random() * 1000) + 100,
        favorites: [],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      })),
      // الساعات
      ...allLuxuryWatches.map(item => ({
        ...item,
        _id: `watches-${item.id}`,
        category: 'watches',
        views: Math.floor(Math.random() * 1000) + 100,
        favorites: [],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      })),
      // المجوهرات
      ...allLuxuryJewelry.map(item => ({
        ...item,
        _id: `jewelry-${item.id}`,
        category: 'jewelry',
        views: Math.floor(Math.random() * 1000) + 100,
        favorites: [],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      })),
    ];

    setListings(allListings);
    setPagination(prev => ({
      ...prev,
      total: allListings.length,
      pages: Math.ceil(allListings.length / prev.limit),
    }));
  };

  useEffect(() => {
    loadAllListings();
  }, []);

  // دالة للفلترة والبحث
  const getFilteredListings = () => {
    let filtered = [...listings];

    // فلترة حسب البحث
    if (filters.search) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        listing.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        (listing.brand && listing.brand.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // فلترة حسب الفئة
    if (filters.category) {
      filtered = filtered.filter(listing => listing.category === filters.category);
    }

    // فلترة حسب الموقع
    if (filters.location) {
      filtered = filtered.filter(listing => 
        listing.location.city === filters.location || 
        listing.location.country === filters.location
      );
    }

    // فلترة حسب السعر
    if (filters.minPrice) {
      filtered = filtered.filter(listing => listing.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(listing => listing.price <= parseInt(filters.maxPrice));
    }

    // فلترة حسب المميز
    if (filters.featured) {
      filtered = filtered.filter(listing => listing.featured);
    }

    return filtered;
  };



  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      featured: false,
    });
    setPagination({ ...pagination, page: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-luxury font-bold text-gray-900 mb-4">
            جميع الإعلانات
          </h1>
          <p className="text-xl text-gray-600">
            اكتشف مجموعتنا الحصرية من أفخر السلع
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في الإعلانات..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <input
                type="number"
                placeholder="السعر الأدنى"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Max Price */}
            <div>
              <input
                type="number"
                placeholder="السعر الأعلى"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.featured}
                  onChange={(e) => handleFilterChange('featured', e.target.checked)}
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                />
                <span className="mr-2 text-sm text-gray-700">الإعلانات المميزة فقط</span>
              </label>
              
              <button
                onClick={resetFilters}
                className="text-sm text-gold-600 hover:text-gold-700 font-medium"
              >
                مسح الفلاتر
              </button>
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm text-gray-600">العرض:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gold-100 text-gold-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gold-100 text-gold-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            عرض {listings.length} من أصل {pagination.total} إعلان
          </p>
        </div>

        {/* Listings Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {getFilteredListings().map((listing) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-80 h-64' : 'h-64'} overflow-hidden`}>
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {listing.featured && (
                    <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      مميز
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 flex items-center space-x-4 rtl:space-x-reverse text-white text-sm">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Eye className="h-4 w-4" />
                      <span>{listing.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Heart className="h-4 w-4" />
                      <span>{listing.favorites.length}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gold-600 text-sm font-medium bg-gold-50 px-2 py-1 rounded-full flex items-center">
                      {(() => {
                        const categoryInfo = categories.find(c => c.value === listing.category);
                        const CategoryIcon = categoryInfo?.icon;
                        return (
                          <>
                            {CategoryIcon && <CategoryIcon className="h-4 w-4 ml-1" />}
                            {categoryInfo?.label || listing.category}
                          </>
                        );
                      })()}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 ml-1" />
                      {listing.location.city}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-gold-600 transition-colors">
                    <Link href={`/categories/${listing.category}/${listing.id}`}>
                      {listing.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {listing.description}
                  </p>

                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    {formatPrice(listing.price, listing.currency)}
                  </div>

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
                      </div>
                    </div>
                    
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                السابق
              </button>
              
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPagination({ ...pagination, page: i + 1 })}
                  className={`px-4 py-2 rounded-lg ${
                    pagination.page === i + 1
                      ? 'bg-gold-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page === pagination.pages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;
