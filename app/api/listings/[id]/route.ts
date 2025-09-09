import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';
import { authOptions } from '@/lib/auth';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/listings/[id] - جلب إعلان محدد
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const listing = await Listing.findById(params.id)
      .populate('seller', 'name email image phone')
      .populate('favorites', 'name');

    if (!listing) {
      return NextResponse.json(
        { error: 'الإعلان غير موجود' },
        { status: 404 }
      );
    }

    // زيادة عدد المشاهدات
    await Listing.findByIdAndUpdate(params.id, { $inc: { views: 1 } });

    return NextResponse.json({ listing });

  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الإعلان' },
      { status: 500 }
    );
  }
}

// PUT /api/listings/[id] - تحديث إعلان
export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    // التحقق من الصلاحية
    if (listing.seller.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'غير مصرح لك بتحديث هذا الإعلان' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // إذا كان المستخدم عادي، يجب إعادة المراجعة
    if (session.user.role !== 'admin') {
      body.status = 'pending';
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate('seller', 'name email image');

    return NextResponse.json({
      message: 'تم تحديث الإعلان بنجاح',
      listing: updatedListing,
    });

  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث الإعلان' },
      { status: 500 }
    );
  }
}

// DELETE /api/listings/[id] - حذف إعلان
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    // التحقق من الصلاحية
    if (listing.seller.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'غير مصرح لك بحذف هذا الإعلان' },
        { status: 403 }
      );
    }

    await Listing.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: 'تم حذف الإعلان بنجاح',
    });

  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف الإعلان' },
      { status: 500 }
    );
  }
}
