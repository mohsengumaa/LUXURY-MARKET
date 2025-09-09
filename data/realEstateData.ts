export interface RealEstateListing {
  id: number;
  title: string;
  titleEn: string;
  titleTr: string;
  price: number;
  currency: string;
  location: {
    city: string;
    area: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  type: string;
  images: string[];
  specs: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
    pool: boolean;
    garden: boolean;
    beachfront: boolean;
    furnished?: boolean;
    floors?: number;
  };
  features: string[];
  description: string;
  descriptionEn?: string;
  descriptionTr?: string;
  views: number;
  likes: number;
  featured: boolean;
  seller: {
    name: string;
    nameEn?: string;
    nameTr?: string;
    verified: boolean;
    rating: number;
    phone?: string;
    email?: string;
  };
  createdAt: string;
  status: 'available' | 'sold' | 'reserved';
  yearBuilt?: number;
  propertyId?: string;
}

export const dubaiRealEstate: RealEstateListing[] = [
  {
    id: 1,
    title: 'قصر ملكي في جميرا الأولى',
    titleEn: 'Royal Palace in Jumeirah 1st',
    titleTr: 'Jumeirah 1\'de Kraliyet Sarayı',
    price: 95000000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'جميرا الأولى',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.2048, lng: 55.2708 }
    },
    type: 'قصر',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      bedrooms: 12,
      bathrooms: 18,
      area: 4500,
      parking: 10,
      pool: true,
      garden: true,
      beachfront: true,
      furnished: true,
      floors: 3
    },
    features: [
      'إطلالة مباشرة على الخليج العربي',
      'شاطئ خاص بطول 150 متر',
      'مسبح أولمبي مع جاكوزي',
      'حديقة مناظر طبيعية 2000 م²',
      'مصعدان خاصان',
      'نظام أمان متطور مع كاميرات',
      'مطبخ إيطالي مجهز بالكامل',
      'غرفة سينما منزلية',
      'جيم ومركز لياقة بدنية',
      'سبا ومركز صحي',
      'مكتبة فاخرة',
      'غرفة ألعاب وبلياردو',
      'مجلس رجال تراثي',
      'صالة استقبال كبيرة',
      'غرف خدم منفصلة',
      'مولد كهرباء احتياطي',
      'نظام تكييف مركزي ذكي',
      'أنظمة منزل ذكي متكاملة'
    ],
    description: 'قصر ملكي استثنائي يقع في أرقى مناطق جميرا، يجمع بين الفخامة الحديثة والطابع التراثي الأصيل. يتميز بموقع فريد على الشاطئ مع إطلالة خلابة على الخليج العربي وأفق دبي المذهل. تم تصميم القصر بأعلى معايير الجودة والفخامة، مع استخدام أفضل المواد والتشطيبات الإيطالية والرخام الطبيعي.',
    views: 28450,
    likes: 567,
    featured: true,
    seller: {
      name: 'مجموعة الإمارات العقارية الفاخرة',
      nameEn: 'Emirates Luxury Real Estate Group',
      nameTr: 'Emirates Lüks Gayrimenkul Grubu',
      verified: true,
      rating: 4.9,
      phone: '+971-4-123-4567',
      email: 'info@emiratesluxury.ae'
    },
    createdAt: '2024-01-15',
    status: 'available',
    yearBuilt: 2023,
    propertyId: 'ELR-001'
  },
  {
    id: 2,
    title: 'فيلا معاصرة في البحيرات',
    titleEn: 'Contemporary Villa in The Lakes',
    titleTr: 'The Lakes\'te Çağdaş Villa',
    price: 12500000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'البحيرات',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.1207, lng: 55.2234 }
    },
    type: 'فيلا',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600563438938-a42d1efb1b3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      bedrooms: 6,
      bathrooms: 8,
      area: 1200,
      parking: 4,
      pool: true,
      garden: true,
      beachfront: false,
      furnished: false,
      floors: 2
    },
    features: [
      'تصميم معماري حديث',
      'إطلالة على البحيرة',
      'مسبح خاص مع شلال',
      'حديقة مناظر طبيعية',
      'مطبخ مفتوح عصري',
      'غرفة عائلية واسعة',
      'غرفة خادمة مع حمام',
      'تكييف مركزي',
      'أنظمة منزل ذكي',
      'مواقف سيارات مظللة',
      'منطقة شواء خارجية',
      'نظام ري تلقائي للحديقة'
    ],
    description: 'فيلا معاصرة رائعة تقع في مجتمع البحيرات الهادئ والمرموق. تتميز بالتصميم الحديث والمساحات المفتوحة مع إطلالة جميلة على البحيرة. مثالية للعائلات التي تبحث عن الهدوء والرفاهية في قلب دبي.',
    views: 15680,
    likes: 234,
    featured: false,
    seller: {
      name: 'شركة دبي الذهبية العقارية',
      nameEn: 'Dubai Golden Real Estate',
      nameTr: 'Dubai Altın Gayrimenkul',
      verified: true,
      rating: 4.7,
      phone: '+971-4-234-5678'
    },
    createdAt: '2024-01-12',
    status: 'available',
    yearBuilt: 2022,
    propertyId: 'DGR-002'
  },
  {
    id: 3,
    title: 'بنتهاوس فاخر في برج العرب',
    titleEn: 'Luxury Penthouse in Burj Al Arab View',
    titleTr: 'Burj Al Arab Manzaralı Lüks Çatı Katı',
    price: 35000000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'جميرا بيتش',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.1413, lng: 55.1853 }
    },
    type: 'بنتهاوس',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      bedrooms: 5,
      bathrooms: 7,
      area: 800,
      parking: 3,
      pool: true,
      garden: false,
      beachfront: true,
      furnished: true,
      floors: 2
    },
    features: [
      'إطلالة مباشرة على برج العرب',
      'تراس خاص بمسبح',
      'تشطيبات فاخرة',
      'مصعد خاص',
      'خدمة كونسيرج 24/7',
      'مطبخ إيطالي مجهز',
      'غرفة معيشة مزدوجة الارتفاع',
      'غرفة نوم رئيسية مع جاكوزي',
      'مكتب منزلي',
      'غرفة ملابس واسعة',
      'نظام صوتي متكامل',
      'أمان متطور',
      'مواقف مخصصة'
    ],
    description: 'بنتهاوس استثنائي في أحد أرقى أبراج جميرا بيتش، يوفر إطلالة مذهلة على برج العرب والخليج العربي. يتميز بالتصميم الفاخر والمساحات الواسعة مع تراس خاص ومسبح، مثالي لأسلوب حياة فاخر لا مثيل له.',
    views: 22340,
    likes: 445,
    featured: true,
    seller: {
      name: 'إعمار العقارية الفاخرة',
      nameEn: 'Emaar Luxury Properties',
      nameTr: 'Emaar Lüks Gayrimenkul',
      verified: true,
      rating: 4.8,
      phone: '+971-4-345-6789'
    },
    createdAt: '2024-01-10',
    status: 'available',
    yearBuilt: 2024,
    propertyId: 'ELP-003'
  }
];

export const riyadhRealEstate: RealEstateListing[] = [
  {
    id: 4,
    title: 'قصر تراثي في حي السفارات',
    titleEn: 'Heritage Palace in Diplomatic Quarter',
    titleTr: 'Diplomatik Mahalle\'de Miras Sarayı',
    price: 45000000,
    currency: 'SAR',
    location: {
      city: 'الرياض',
      area: 'حي السفارات',
      country: 'المملكة العربية السعودية',
      coordinates: { lat: 24.6877, lng: 46.7219 }
    },
    type: 'قصر',
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      bedrooms: 15,
      bathrooms: 20,
      area: 5000,
      parking: 12,
      pool: true,
      garden: true,
      beachfront: false,
      furnished: true,
      floors: 2
    },
    features: [
      'تصميم تراثي أصيل',
      'حدائق واسعة مناظر طبيعية',
      'مجلس رجال فاخر بطراز نجدي',
      'مجلس نساء منفصل',
      'مسبح داخلي مغطى',
      'ملعب تنس خاص',
      'بيت ضيافة منفصل',
      'مسجد خاص للعائلة',
      'مطابخ متعددة',
      'غرف خدم كاملة',
      'نظام أمان متطور',
      'مولد كهرباء احتياطي',
      'نظام تكييف مركزي',
      'نافورة مركزية في الفناء',
      'مكتبة تراثية',
      'قاعة احتفالات كبيرة'
    ],
    description: 'قصر تراثي فخم يقع في أرقى أحياء الرياض، يجمع بين الأصالة العربية والحداثة. صُمم بالطراز النجدي التقليدي مع جميع وسائل الراحة الحديثة. مثالي للعائلات الكبيرة واستقبال الضيوف بأسلوب تراثي أصيل.',
    views: 18750,
    likes: 298,
    featured: true,
    seller: {
      name: 'مجموعة قصور الرياض',
      nameEn: 'Riyadh Palaces Group',
      nameTr: 'Riyad Sarayları Grubu',
      verified: true,
      rating: 4.9,
      phone: '+966-11-456-7890'
    },
    createdAt: '2024-01-08',
    status: 'available',
    yearBuilt: 2021,
    propertyId: 'RPG-004'
  }
];

export const internationalRealEstate: RealEstateListing[] = [
  {
    id: 5,
    title: 'قصر في موناكو - مونت كارلو',
    titleEn: 'Palace in Monaco - Monte Carlo',
    titleTr: 'Monako\'da Saray - Monte Carlo',
    price: 150000000,
    currency: 'EUR',
    location: {
      city: 'موناكو',
      area: 'مونت كارلو',
      country: 'موناكو',
      coordinates: { lat: 43.7384, lng: 7.4246 }
    },
    type: 'قصر',
    images: [
      'https://images.unsplash.com/photo-1520637836862-4d197d17c0a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      bedrooms: 10,
      bathrooms: 15,
      area: 2800,
      parking: 8,
      pool: true,
      garden: true,
      beachfront: true,
      furnished: true,
      floors: 4
    },
    features: [
      'إطلالة على البحر الأبيض المتوسط',
      'مرسى خاص لليخوت',
      'حديقة على السطح',
      'مصعد بانورامي',
      'قاعة احتفالات فاخرة',
      'مطبخ فرنسي احترافي',
      'قبو نبيذ',
      'سبا خاص',
      'جيم مجهز بالكامل',
      'مكتبة كلاسيكية',
      'غرفة سيجار',
      'نظام أمان متطور'
    ],
    description: 'قصر استثنائي في قلب مونت كارلو، يوفر إطلالة خلابة على البحر الأبيض المتوسط. يتميز بالتصميم الفرنسي الكلاسيكي مع جميع وسائل الراحة الحديثة. موقع مثالي بالقرب من الكازينو والمطاعم الفاخرة.',
    views: 45680,
    likes: 789,
    featured: true,
    seller: {
      name: 'Monaco Luxury Properties',
      nameEn: 'Monaco Luxury Properties',
      nameTr: 'Monako Lüks Gayrimenkul',
      verified: true,
      rating: 5.0,
      phone: '+377-93-123-456'
    },
    createdAt: '2024-01-05',
    status: 'available',
    yearBuilt: 2020,
    propertyId: 'MLP-005'
  }
];

// دمج جميع العقارات
export const allRealEstate = [
  ...dubaiRealEstate,
  ...riyadhRealEstate,
  ...internationalRealEstate
];

// إحصائيات العقارات
export const realEstateStats = {
  totalListings: allRealEstate.length,
  totalValue: allRealEstate.reduce((sum, property) => sum + property.price, 0),
  averagePrice: allRealEstate.reduce((sum, property) => sum + property.price, 0) / allRealEstate.length,
  cities: Array.from(new Set(allRealEstate.map(p => p.location.city))),
  types: Array.from(new Set(allRealEstate.map(p => p.type))),
  featuredCount: allRealEstate.filter(p => p.featured).length
};

// فئات فرعية للعقارات
export const realEstateSubcategories = [
  { id: 'palace', name: 'قصور ملكية', nameEn: 'Royal Palaces', nameTr: 'Kraliyet Sarayları', count: 3 },
  { id: 'villa', name: 'فيلات فاخرة', nameEn: 'Luxury Villas', nameTr: 'Lüks Villalar', count: 1 },
  { id: 'penthouse', name: 'بنتهاوس', nameEn: 'Penthouses', nameTr: 'Çatı Katları', count: 1 },
  { id: 'apartment', name: 'شقق فاخرة', nameEn: 'Luxury Apartments', nameTr: 'Lüks Daireler', count: 0 },
  { id: 'resort', name: 'منتجعات خاصة', nameEn: 'Private Resorts', nameTr: 'Özel Tatil Köyleri', count: 0 }
];

export default allRealEstate;
