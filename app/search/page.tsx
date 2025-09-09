'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  MapPin, 
  Heart, 
  Eye,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { debounce } from 'lodash';

interface SearchResult {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  location: {
    city: string;
    country: string;
  };
  seller: {
    name: string;
    image?: string;
  };
  views: number;
  favorites: string[];
  featured: boolean;
  createdAt: string;
}

interface SearchStats {
  totalListings: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  categories: string[];
  locations: string[];
}

interface Suggestion {
  type: string;
  text: string;
  value: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });
  
  const [stats, setStats] = useState<SearchStats>({
    totalListings: 0,
    avgPrice: 0,
    minPrice: 0,
    maxPrice: 0,
    categories: [],
    locations: [],
  });

  const categories = [
    { value: '', label: 'جميع الفئات' },
    { value: 'real-estate', label: 'عقارات فاخرة' },
    { value: 'cars', label: 'سيارات فاخرة' },
    { value: 'watches', label: 'ساعات فاخرة' },
    { value: 'jewelry', label: 'مجوهرات' },
    { value: 'yachts', label: 'يخوت' },
    { value: 'private-jets', label: 'طائرات خاصة' },
  ];

  const sortOptions = [
    { value: 'createdAt-desc', label: 'الأحدث أولاً' },
    { value: 'createdAt-asc', label: 'الأقدم أولاً' },
    { value: 'price-asc', label: 'السعر: من الأقل إلى الأعلى' },
    { value: 'price-desc', label: 'السعر: من الأعلى إلى الأقل' },
    { value: 'views', label: 'الأكثر مشاهدة' },
    { value: 'featured', label: 'المميزة أولاً' },
  ];

  // البحث عن الاقتراحات
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (response.ok) {
          setSuggestions(data.suggestions);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }, 300),
    []
  );

  // تنفيذ البحث
  const performSearch = async () => {
    setLoading(true);
    
    const queryParams = new URLSearchParams({
      q: searchQuery,
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
      ...filters,
    });

    try {
      const response = await fetch(`/api/search?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.listings);
        setPagination(data.pagination);
        setStats(data.stats);
        
        // تحديث URL
        const newUrl = `/search?${queryParams}`;
        router.replace(newUrl, { scroll: false });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // تأثيرات
  useEffect(() => {
    if (searchQuery) {
      fetchSuggestions(searchQuery);
    }
  }, [searchQuery, fetchSuggestions]);

  useEffect(() => {
    performSearch();
  }, [filters, pagination.page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
    performSearch();
    setShowSuggestions(false);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setPagination({ ...pagination, page: 1 });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    setFilters({ ...filters, sortBy, sortOrder: sortOrder || 'desc' });
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ar-AE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="ابحث عن السلع الفاخرة..."
                  className="w-full px-4 py-4 pr-12 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full right-0 left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSearchQuery(suggestion.value);
                          setShowSuggestions(false);
                          performSearch();
                        }}
                        className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3 rtl:space-x-reverse"
                      >
                        <div className={`p-1 rounded ${
                          suggestion.type === 'title' ? 'bg-blue-100 text-blue-600' :
                          suggestion.type === 'tag' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {suggestion.type === 'title' ? <Search className="h-3 w-3" /> :
                           suggestion.type === 'tag' ? <TrendingUp className="h-3 w-3" /> :
                           <SlidersHorizontal className="h-3 w-3" />}
                        </div>
                        <span className="text-gray-900">{suggestion.text}</span>
                        <span className="text-xs text-gray-500 mr-auto">
                          {suggestion.type === 'title' ? 'عنوان' :
                           suggestion.type === 'tag' ? 'علامة' : 'مواصفات'}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-xl transition-colors"
              >
                بحث
              </button>
              
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </form>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="المدينة أو البلد"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر الأدنى</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر الأعلى</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="∞"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Search Stats */}
        {stats.totalListings > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-600">{stats.totalListings}</div>
                <div className="text-sm text-gray-600">إعلان</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice(stats.avgPrice, 'USD')}
                </div>
                <div className="text-sm text-gray-600">متوسط السعر</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.categories.length}</div>
                <div className="text-sm text-gray-600">فئة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.locations.length}</div>
                <div className="text-sm text-gray-600">موقع</div>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">نتائج البحث</h2>
            {searchQuery && (
              <p className="text-gray-600 mt-1">
                البحث عن: "<span className="font-medium">{searchQuery}</span>"
              </p>
            )}
            <p className="text-sm text-gray-500">
              {loading ? 'جاري البحث...' : `${pagination.total} نتيجة`}
            </p>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-gold-100 text-gold-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-gold-100 text-gold-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
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
        ) : results.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {results.map((result) => (
              <motion.div
                key={result._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-80 h-64' : 'h-64'} overflow-hidden`}>
                  <img
                    src={result.images[0]}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {result.featured && (
                    <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      مميز
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 flex items-center space-x-4 rtl:space-x-reverse text-white text-sm">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Eye className="h-4 w-4" />
                      <span>{result.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Heart className="h-4 w-4" />
                      <span>{result.favorites.length}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gold-600 text-sm font-medium bg-gold-50 px-2 py-1 rounded-full">
                      {categories.find(c => c.value === result.category)?.label}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 ml-1" />
                      {result.location.city}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-gold-600 transition-colors">
                    <Link href={`/listings/${result._id}`}>
                      {result.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {result.description}
                  </p>

                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    {formatPrice(result.price, result.currency)}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                        <span className="text-gold-600 font-medium text-sm">
                          {result.seller.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {result.seller.name}
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">لا توجد نتائج</h3>
            <p className="text-gray-600 mb-8">جرب تغيير كلمات البحث أو الفلاتر</p>
            <Link
              href="/listings"
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              تصفح جميع الإعلانات
            </Link>
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
              
              {[...Array(Math.min(pagination.pages, 5))].map((_, i) => {
                const page = i + Math.max(1, pagination.page - 2);
                return (
                  <button
                    key={page}
                    onClick={() => setPagination({ ...pagination, page })}
                    className={`px-4 py-2 rounded-lg ${
                      pagination.page === page
                        ? 'bg-gold-500 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
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

export default SearchPage;
