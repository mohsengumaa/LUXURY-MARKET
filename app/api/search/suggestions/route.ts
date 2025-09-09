import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';

// GET /api/search/suggestions - اقتراحات البحث
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    // البحث في العناوين والعلامات
    const titleSuggestions = await Listing.find({
      status: 'approved',
      title: { $regex: query, $options: 'i' }
    })
    .select('title')
    .limit(limit / 2)
    .lean();

    // البحث في العلامات
    const tagSuggestions = await Listing.aggregate([
      { $match: { status: 'approved' } },
      { $unwind: '$tags' },
      { $match: { tags: { $regex: query, $options: 'i' } } },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit / 2 }
    ]);

    // البحث في المواصفات
    const specSuggestions = await Listing.aggregate([
      { $match: { status: 'approved' } },
      {
        $project: {
          specs: { $objectToArray: '$specifications' }
        }
      },
      { $unwind: '$specs' },
      {
        $match: {
          $or: [
            { 'specs.k': { $regex: query, $options: 'i' } },
            { 'specs.v': { $regex: query, $options: 'i' } }
          ]
        }
      },
      {
        $group: {
          _id: { key: '$specs.k', value: '$specs.v' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    // تجميع الاقتراحات
    const suggestions = [
      ...titleSuggestions.map(item => ({
        type: 'title',
        text: item.title,
        value: item.title
      })),
      ...tagSuggestions.map(item => ({
        type: 'tag',
        text: `#${item._id}`,
        value: item._id
      })),
      ...specSuggestions.map(item => ({
        type: 'specification',
        text: `${item._id.key}: ${item._id.value}`,
        value: `${item._id.key}: ${item._id.value}`
      }))
    ];

    return NextResponse.json({
      suggestions: suggestions.slice(0, limit)
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الاقتراحات' },
      { status: 500 }
    );
  }
}
