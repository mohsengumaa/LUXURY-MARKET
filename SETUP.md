# دليل الإعداد السريع - Luxury Marketplace

## 🚀 البدء السريع (5 دقائق)

### الخطوة 1: تثبيت المتطلبات
```bash
# تأكد من تثبيت Node.js 18+
node --version

# تأكد من تثبيت MongoDB أو استخدم MongoDB Atlas
```

### الخطوة 2: إعداد المشروع
```bash
# تثبيت التبعيات
npm install

# نسخ ملف البيئة
cp env.example .env.local
```

### الخطوة 3: إعداد قاعدة البيانات

#### خيار 1: MongoDB محلي
```bash
# تشغيل MongoDB
mongod

# إنشاء قاعدة البيانات
mongo
use luxury-marketplace
```

#### خيار 2: MongoDB Atlas (موصى به)
1. إنشاء حساب في [MongoDB Atlas](https://www.mongodb.com/atlas)
2. إنشاء cluster جديد
3. الحصول على connection string
4. إضافة الـ IP address إلى whitelist

### الخطوة 4: إعداد متغيرات البيئة

قم بتعديل `.env.local`:

```env
# قاعدة البيانات
MONGODB_URI=mongodb://localhost:27017/luxury-marketplace
# أو للـ Atlas: mongodb+srv://username:password@cluster.mongodb.net/luxury-marketplace

# مفتاح سري للمصادقة (أنشئ مفتاح قوي)
NEXTAUTH_SECRET=your-very-secure-secret-key-here-make-it-long

# رابط الموقع
NEXTAUTH_URL=http://localhost:3000

# اختياري: OAuth (للتسجيل عبر Google/Facebook)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### الخطوة 5: تشغيل المشروع
```bash
npm run dev
```

🎉 **المشروع يعمل الآن على:** http://localhost:3000

## 🔧 إعدادات اختيارية

### Google OAuth (تسجيل دخول بـ Google)
1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد
3. فعّل Google+ API
4. أنشئ OAuth 2.0 credentials
5. أضف `http://localhost:3000/api/auth/callback/google` إلى Authorized redirect URIs

### Cloudinary (رفع الصور)
1. أنشئ حساب في [Cloudinary](https://cloudinary.com)
2. احصل على Cloud name, API Key, API Secret
3. أضفها إلى `.env.local`:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Stripe (المدفوعات)
1. أنشئ حساب في [Stripe](https://stripe.com)
2. احصل على API keys من Dashboard
3. أضفها إلى `.env.local`:
```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 📱 اختبار المشروع

### إنشاء حساب مدير
1. اذهب إلى `/auth/signup`
2. أنشئ حساب جديد
3. في قاعدة البيانات، غيّر `role` إلى `admin`

### إنشاء إعلان تجريبي
1. سجل دخول كـ seller
2. اذهب إلى `/dashboard/listings/new`
3. أنشئ إعلان تجريبي

## 🐛 حل المشاكل الشائعة

### خطأ الاتصال بقاعدة البيانات
```bash
# تأكد من تشغيل MongoDB
mongod

# أو تحقق من connection string للـ Atlas
```

### خطأ NextAuth
```bash
# تأكد من إضافة NEXTAUTH_SECRET
# يجب أن يكون طويل ومعقد
```

### خطأ في التبعيات
```bash
# احذف node_modules وأعد التثبيت
rm -rf node_modules
npm install
```

## 📚 الخطوات التالية

بعد إعداد المشروع بنجاح:

1. **استكشف الكود** - ابدأ من `app/page.tsx`
2. **اقرأ التوثيق** - راجع `README.md`
3. **أضف ميزات جديدة** - انظر قائمة TODO
4. **اختبر الوظائف** - جرب التسجيل والإعلانات

## 🆘 الحصول على المساعدة

- 📖 **التوثيق**: راجع README.md
- 🐛 **الأخطاء**: أنشئ issue في GitHub
- 💬 **الدعم**: راسلنا على support@luxurymarket.com

---

**مبروك! 🎉 مشروعك جاهز للتطوير**
