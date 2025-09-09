import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';
import { authOptions } from '@/lib/auth';
import { Types } from 'mongoose';

interface RouteParams {
  params: {
    id: string;
  };
}

// POST /api/listings/[id]/favorite - إضافة/إزالة من المفضلة
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول' },
        { status: 401 }
      );
    }

    await connectDB();

    const listing = await Listing.findById(params.id);

    if (!listing) {
      return NextResponse.json(
        { error: 'الإعلان غير موجود' },
        { status: 404 }
      );
    }

    const userId = new Types.ObjectId(session.user.id);
    const isFavorited = listing.favorites.includes(userId);

    if (isFavorited) {
      // إزالة من المفضلة
      await Listing.findByIdAndUpdate(params.id, {
        $pull: { favorites: userId }
      });
      
      return NextResponse.json({
        message: 'تم إزالة الإعلان من المفضلة',
        favorited: false,
      });
    } else {
      // إضافة إلى المفضلة
      await Listing.findByIdAndUpdate(params.id, {
        $addToSet: { favorites: userId }
      });
      
      return NextResponse.json({
        message: 'تم إضافة الإعلان إلى المفضلة',
        favorited: true,
      });
    }

  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث المفضلة' },
      { status: 500 }
    );
  }
}
