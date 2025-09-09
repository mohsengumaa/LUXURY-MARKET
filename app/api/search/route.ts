import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';

// GET /api/search - بحث متقدم في الإعلانات
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // بناء استعلام البحث
    const searchQuery: any = {
      status: 'approved'
    };

    // البحث النصي
    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
        { 'specifications.brand': { $regex: query, $options: 'i' } },
        { 'specifications.model': { $regex: query, $options: 'i' } }
      ];
    }

    // فلتر الفئة
    if (category && category !== 'all') {
      searchQuery.category = category;
    }

    // فلتر الموقع
    if (location && location !== 'all') {
      searchQuery.$or = [
        { 'location.city': { $regex: location, $options: 'i' } },
        { 'location.country': { $regex: location, $options: 'i' } },
        { 'location.address': { $regex: location, $options: 'i' } }
      ];
    }

    // فلتر السعر
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = parseInt(minPrice);
      if (maxPrice) searchQuery.price.$lte = parseInt(maxPrice);
    }

    // بناء خيارات الترتيب
    const sortOptions: any = {};
    if (sortBy === 'price') {
      sortOptions.price = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'views') {
      sortOptions.views = -1;
    } else if (sortBy === 'featured') {
      sortOptions.featured = -1;
      sortOptions.createdAt = -1;
    } else {
      sortOptions.createdAt = sortOrder === 'asc' ? 1 : -1;
    }

    // حساب التخطي
    const skip = (page - 1) * limit;

    // تنفيذ البحث
    const listings = await Listing.find(searchQuery)
      .populate('seller', 'name email image')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    // حساب العدد الإجمالي
    const total = await Listing.countDocuments(searchQuery);

    // إحصائيات البحث
    const stats = await Listing.aggregate([
      { $match: searchQuery },
      {
        $group: {
          _id: null,
          totalListings: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          categories: { $addToSet: '$category' },
          locations: { $addToSet: '$location.city' }
        }
      }
    ]);

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: stats[0] || {
        totalListings: 0,
        avgPrice: 0,
        minPrice: 0,
        maxPrice: 0,
        categories: [],
        locations: []
      },
      searchQuery: {
        q: query,
        category,
        location,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في البحث' },
      { status: 500 }
    );
  }
}
