import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock listings data (in production, use a real database)
const mockListings = [
  {
    _id: '1',
    title: 'فيلا فاخرة في دبي مارينا',
    description: 'فيلا فاخرة مع إطلالة على البحر في دبي مارينا',
    price: 15000000,
    currency: 'AED',
    category: 'real-estate',
    subcategory: 'villa',
    images: ['/images/villa1.jpg'],
    location: { city: 'دبي', country: 'الإمارات' },
    seller: { name: 'عقارات دبي', email: 'info@dubai-realestate.com' },
    featured: true,
    status: 'approved',
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'سيارة لامبورغيني أفينتادور',
    description: 'سيارة رياضية فاخرة بحالة ممتازة',
    price: 2500000,
    currency: 'AED',
    category: 'cars',
    subcategory: 'luxury',
    images: ['/images/lambo.jpg'],
    location: { city: 'أبوظبي', country: 'الإمارات' },
    seller: { name: 'معرض السيارات الفاخرة', email: 'sales@luxury-cars.com' },
    featured: true,
    status: 'approved',
    createdAt: new Date(),
  }
];

// GET /api/listings - جلب جميع الإعلانات مع الفلاتر
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status') || 'approved';

    // Filter listings
    let filteredListings = mockListings.filter(listing => {
      if (status && listing.status !== status) return false;
      if (category && category !== 'all' && listing.category !== category) return false;
      if (location && location !== 'all' && !listing.location.city.includes(location)) return false;
      if (minPrice && listing.price < parseInt(minPrice)) return false;
      if (maxPrice && listing.price > parseInt(maxPrice)) return false;
      if (search && !listing.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (featured === 'true' && !listing.featured) return false;
      return true;
    });

    // Sort by featured first, then by date
    filteredListings.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Pagination
    const skip = (page - 1) * limit;
    const paginatedListings = filteredListings.slice(skip, skip + limit);

    return NextResponse.json({
      listings: paginatedListings,
      pagination: {
        page,
        limit,
        total: filteredListings.length,
        pages: Math.ceil(filteredListings.length / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الإعلانات' },
      { status: 500 }
    );
  }
}

// POST /api/listings - إنشاء إعلان جديد
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'seller' && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'غير مصرح لك بإنشاء إعلانات' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      price,
      currency = 'AED',
      category,
      subcategory,
      images,
      videos,
      location,
      specifications,
      tags,
    } = body;

    // التحقق من البيانات المطلوبة
    if (!title || !description || !price || !category || !images || !location) {
      return NextResponse.json(
        { error: 'جميع الحقول المطلوبة يجب ملؤها' },
        { status: 400 }
      );
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'يجب إضافة صورة واحدة على الأقل' },
        { status: 400 }
      );
    }

    // إنشاء الإعلان الجديد
    const newListing = {
      _id: (mockListings.length + 1).toString(),
      title,
      description,
      price,
      currency,
      category,
      subcategory,
      images,
      videos: videos || [],
      location,
      seller: { 
        name: session.user.name || 'Unknown', 
        email: session.user.email || 'unknown@email.com' 
      },
      specifications: specifications || {},
      tags: tags || [],
      status: 'pending', // يحتاج موافقة الإدارة
      featured: false,
      createdAt: new Date(),
    };

    // إضافة الإعلان إلى القائمة
    mockListings.push(newListing);

    return NextResponse.json({
      message: 'تم إنشاء الإعلان بنجاح',
      listing: newListing,
    });

  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء الإعلان' },
      { status: 500 }
    );
  }
}
