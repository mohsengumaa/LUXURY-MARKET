export interface LuxuryWatchListing {
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
  brand: string;
  model: string;
  referenceNumber: string;
  year: number;
  type: string; // رياضية، كلاسيكية، محدودة الإصدار، إلخ
  images: string[];
  specs: {
    caseSize: string; // حجم العلبة
    caseMaterial: string; // مادة العلبة
    dialColor: string; // لون الميناء
    movement: string; // نوع الحركة
    powerReserve: string; // احتياطي الطاقة
    waterResistance: string; // مقاومة الماء
    crystal: string; // نوع الزجاج
    braceletStrap: string; // نوع السوار
    functions: string[]; // الوظائف
    jewels: number; // عدد الأحجار
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
    type: 'authorized_dealer' | 'boutique' | 'collector' | 'individual';
  };
  createdAt: string;
  status: 'available' | 'sold' | 'reserved';
  condition: 'new' | 'like_new' | 'excellent' | 'good' | 'vintage';
  serialNumber?: string;
  watchId?: string;
  warranty: boolean;
  boxPapers: boolean;
  serviceHistory: boolean;
  limited?: boolean;
  limitedNumber?: string;
}

export const rolexWatches: LuxuryWatchListing[] = [
  {
    id: 1,
    title: 'رولكس ديتونا 116500LN - أبيض',
    titleEn: 'Rolex Daytona 116500LN - White Dial',
    titleTr: 'Rolex Daytona 116500LN - Beyaz Kadran',
    price: 650000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'دبي مول',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    brand: 'Rolex',
    model: 'Cosmograph Daytona',
    referenceNumber: '116500LN',
    year: 2023,
    type: 'ساعة رياضية',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      caseSize: '40 مم',
      caseMaterial: 'ستانلس ستيل 904L',
      dialColor: 'أبيض',
      movement: 'كاليبر 4130 أوتوماتيك',
      powerReserve: '72 ساعة',
      waterResistance: '100 متر',
      crystal: 'سافير مقاوم للخدش',
      braceletStrap: 'أويستر ستانلس ستيل',
      functions: ['كرونوغراف', 'تاكيمتر', 'توقيت دقيق'],
      jewels: 44
    },
    features: [
      'حركة كاليبر 4130 المطورة داخلياً',
      'إطار سيراشروم أسود غير قابل للتلاشي',
      'ميناء أبيض مع عدادات سوداء',
      'عقارب ومؤشرات كرومالايت مضيئة',
      'تاج الملك المقاوم للماء',
      'قفل أويستر لوك مزدوج',
      'سوار أويستر بحلقات صلبة',
      'شهادة كرونومتر سويسرية',
      'ضمان رولكس الدولي 5 سنوات',
      'علبة وأوراق أصلية',
      'فحص تقني شامل',
      'تصميم أيقوني خالد'
    ],
    description: 'رولكس ديتونا - أيقونة الساعات الرياضية الفاخرة والأكثر طلباً في العالم. هذه القطعة الاستثنائية تجمع بين الدقة السويسرية والتصميم الأنيق. حركة كاليبر 4130 المطورة داخلياً توفر دقة لا مثيل لها مع احتياطي طاقة 72 ساعة. الإطار السيراشروم المقاوم للخدش والتآكل يضمن الحفاظ على جمال الساعة لعقود.',
    views: 89750,
    likes: 1876,
    featured: true,
    seller: {
      name: 'رولكس الشرق الأوسط الرسمي',
      nameEn: 'Rolex Middle East Official',
      nameTr: 'Rolex Orta Doğu Resmi',
      verified: true,
      rating: 5.0,
      phone: '+971-4-123-7890',
      email: 'dubai@rolex.com',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-15',
    status: 'available',
    condition: 'new',
    watchId: 'ROL-DAY-001',
    warranty: true,
    boxPapers: true,
    serviceHistory: true,
    serialNumber: 'R2023001'
  },
  {
    id: 2,
    title: 'رولكس سابمارينر 126610LV - أخضر',
    titleEn: 'Rolex Submariner 126610LV - Green Dial',
    titleTr: 'Rolex Submariner 126610LV - Yeşil Kadran',
    price: 420000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'جميرا',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.2084, lng: 55.2719 }
    },
    brand: 'Rolex',
    model: 'Submariner Date',
    referenceNumber: '126610LV',
    year: 2023,
    type: 'ساعة غوص',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      caseSize: '41 مم',
      caseMaterial: 'ستانلس ستيل 904L',
      dialColor: 'أخضر',
      movement: 'كاليبر 3235 أوتوماتيك',
      powerReserve: '70 ساعة',
      waterResistance: '300 متر',
      crystal: 'سافير مقاوم للخدش',
      braceletStrap: 'أويستر ستانلس ستيل',
      functions: ['تاريخ', 'إطار دوار أحادي الاتجاه'],
      jewels: 31
    },
    features: [
      'حركة كاليبر 3235 الجديدة',
      'إطار سيراشروم أخضر أحادي الاتجاه',
      'ميناء أخضر مميز',
      'عدسة سايكلوبس مكبرة للتاريخ',
      'عقارب ومؤشرات كرومالايت',
      'مقاومة مغناطيسية عالية',
      'دقة -2/+2 ثانية يومياً',
      'قفل جلايدلوك للتعديل السريع',
      'شهادة كرونومتر سويسرية',
      'ضمان رولكس 5 سنوات',
      'مقاومة للماء حتى 300 متر',
      'تصميم هولك الأيقوني'
    ],
    description: 'رولكس سابمارينر "هولك" - ساعة الغوص الأسطورية باللون الأخضر المميز. تمثل قمة التطور التقني في عالم ساعات الغوص مع إطارها الأخضر الأيقوني وميناءها الأخضر الجذاب. حركة كاليبر 3235 الجديدة توفر دقة استثنائية واحتياطي طاقة محسن.',
    views: 67890,
    likes: 1234,
    featured: true,
    seller: {
      name: 'رولكس الشرق الأوسط الرسمي',
      nameEn: 'Rolex Middle East Official',
      nameTr: 'Rolex Orta Doğu Resmi',
      verified: true,
      rating: 5.0,
      phone: '+971-4-123-7890',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-12',
    status: 'available',
    condition: 'new',
    watchId: 'ROL-SUB-002',
    warranty: true,
    boxPapers: true,
    serviceHistory: true
  }
];

export const patekPhilippeWatches: LuxuryWatchListing[] = [
  {
    id: 3,
    title: 'باتيك فيليب نوتيلوس 5711/1A',
    titleEn: 'Patek Philippe Nautilus 5711/1A',
    titleTr: 'Patek Philippe Nautilus 5711/1A',
    price: 1850000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'وسط دبي',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    brand: 'Patek Philippe',
    model: 'Nautilus',
    referenceNumber: '5711/1A-010',
    year: 2022,
    type: 'ساعة فاخرة',
    images: [
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      caseSize: '40 مم',
      caseMaterial: 'ستانلس ستيل',
      dialColor: 'أزرق',
      movement: 'كاليبر 26-330 S C أوتوماتيك',
      powerReserve: '45 ساعة',
      waterResistance: '120 متر',
      crystal: 'سافير مقاوم للخدش',
      braceletStrap: 'ستانلس ستيل متكامل',
      functions: ['تاريخ', 'عقرب ثواني مركزي'],
      jewels: 30
    },
    features: [
      'تصميم جيرالد جينتا الأيقوني',
      'ميناء أزرق مع نمط شطرنجي أفقي',
      'علبة ثماني الأضلاع مميزة',
      'سوار متكامل مع العلبة',
      'حركة أوتوماتيكية فائقة النحافة',
      'روتور ذهبي 22 قيراط',
      'ختم باتيك فيليب للجودة',
      'صناعة يدوية سويسرية',
      'قطعة استثمارية نادرة',
      'تاريخ عريق منذ 1976',
      'رمز الأناقة والرفاهية',
      'إنتاج محدود ونادر'
    ],
    description: 'باتيك فيليب نوتيلوس - أسطورة الساعات الفاخرة والأكثر طلباً في العالم. هذه التحفة النادرة من تصميم جيرالد جينتا تمثل قمة الفخامة والحرفية السويسرية. ميناءها الأزرق الأيقوني وتصميمها الثماني الأضلاع يجعلانها رمزاً للأناقة الخالدة. قطعة استثمارية نادرة تزداد قيمتها مع الوقت.',
    views: 156780,
    likes: 3456,
    featured: true,
    seller: {
      name: 'باتيك فيليب دبي الرسمي',
      nameEn: 'Patek Philippe Dubai Official',
      nameTr: 'Patek Philippe Dubai Resmi',
      verified: true,
      rating: 5.0,
      phone: '+971-4-234-5678',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-10',
    status: 'available',
    condition: 'excellent',
    watchId: 'PP-NAU-003',
    warranty: true,
    boxPapers: true,
    serviceHistory: true
  }
];

export const audemarsPiguetWatches: LuxuryWatchListing[] = [
  {
    id: 4,
    title: 'أوديمار بيغيه رويال أوك 15202ST',
    titleEn: 'Audemars Piguet Royal Oak 15202ST',
    titleTr: 'Audemars Piguet Royal Oak 15202ST',
    price: 980000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'البرشاء',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.0657, lng: 55.2708 }
    },
    brand: 'Audemars Piguet',
    model: 'Royal Oak',
    referenceNumber: '15202ST.OO.1240ST.01',
    year: 2023,
    type: 'ساعة فاخرة',
    images: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      caseSize: '39 مم',
      caseMaterial: 'ستانلس ستيل',
      dialColor: 'أزرق',
      movement: 'كاليبر 2121 أوتوماتيك',
      powerReserve: '40 ساعة',
      waterResistance: '50 متر',
      crystal: 'سافير مقاوم للخدش',
      braceletStrap: 'ستانلس ستيل متكامل',
      functions: ['الساعات', 'الدقائق', 'الثواني'],
      jewels: 36
    },
    features: [
      'تصميم جيرالد جينتا الثوري 1972',
      'ميناء "تاباسيري" الشهير',
      'علبة ثماني الأضلاع مع مسامير ظاهرة',
      'حركة فائقة النحافة 3.05 مم',
      'سوار متكامل مع تشطيب متناوب',
      'تشطيب يدوي فائق الدقة',
      'رمز الساعات الرياضية الفاخرة',
      'صناعة سويسرية تقليدية',
      'قطعة أيقونية خالدة',
      'حرفية لو براسو الاستثنائية',
      'تصميم جريء ومبتكر',
      'استثمار طويل المدى'
    ],
    description: 'أوديمار بيغيه رويال أوك - الساعة التي غيرت وجه صناعة الساعات للأبد. هذه التحفة الأيقونية من تصميم جيرالد جينتا عام 1972 أحدثت ثورة في عالم الساعات الفاخرة. ميناءها الأزرق "تاباسيري" المميز وتصميمها الثماني الأضلاع مع المسامير الظاهرة يجعلانها رمزاً للجرأة والابتكار.',
    views: 78450,
    likes: 1567,
    featured: true,
    seller: {
      name: 'أوديمار بيغيه دبي',
      nameEn: 'Audemars Piguet Dubai',
      nameTr: 'Audemars Piguet Dubai',
      verified: true,
      rating: 4.9,
      phone: '+971-4-345-6789',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-08',
    status: 'available',
    condition: 'new',
    watchId: 'AP-RO-004',
    warranty: true,
    boxPapers: true,
    serviceHistory: true
  }
];

export const richardMilleWatches: LuxuryWatchListing[] = [
  {
    id: 5,
    title: 'ريتشارد ميل RM 011 فيليب ماسا',
    titleEn: 'Richard Mille RM 011 Felipe Massa',
    titleTr: 'Richard Mille RM 011 Felipe Massa',
    price: 2800000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'دبي مارينا',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.0800, lng: 55.1400 }
    },
    brand: 'Richard Mille',
    model: 'RM 011',
    referenceNumber: 'RM011-FM',
    year: 2023,
    type: 'ساعة رياضية',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      caseSize: '50 × 42.7 مم',
      caseMaterial: 'NTPT كربون',
      dialColor: 'هيكلي شفاف',
      movement: 'كاليبر RMAC2 أوتوماتيك',
      powerReserve: '55 ساعة',
      waterResistance: '50 متر',
      crystal: 'سافير مقاوم للخدش',
      braceletStrap: 'مطاط أسود',
      functions: ['كرونوغراف', 'تاريخ سنوي', 'GMT'],
      jewels: 55
    },
    features: [
      'علبة NTPT كربون فائقة الخفة',
      'حركة هيكلية مرئية',
      'مقاومة للصدمات 5000G',
      'تصميم مستوحى من الفورمولا 1',
      'كرونوغراف فلاي باك',
      'تاريخ سنوي ذكي',
      'وظيفة GMT للتوقيت العالمي',
      'سوار مطاطي مريح',
      'تقنيات طيران متطورة',
      'وزن خفيف استثنائي',
      'مقاومة مغناطيسية',
      'قطعة فنية تقنية'
    ],
    description: 'ريتشارد ميل RM 011 فيليب ماسا - ساعة تمثل قمة التطور التقني والابتكار في عالم الساعات. مصممة بالتعاون مع بطل الفورمولا 1 فيليب ماسا، تجمع بين تقنيات الطيران المتطورة والحرفية السويسرية الفاخرة. علبة NTPT الكربونية فائقة الخفة والمقاومة تجعلها مثالية للرياضيين والمغامرين.',
    views: 45670,
    likes: 987,
    featured: true,
    seller: {
      name: 'ريتشارد ميل الشرق الأوسط',
      nameEn: 'Richard Mille Middle East',
      nameTr: 'Richard Mille Orta Doğu',
      verified: true,
      rating: 4.8,
      phone: '+971-4-456-7890',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-05',
    status: 'available',
    condition: 'new',
    watchId: 'RM-011-005',
    warranty: true,
    boxPapers: true,
    serviceHistory: true,
    limited: true,
    limitedNumber: '125/500'
  }
];

export const vintageWatches: LuxuryWatchListing[] = [
  {
    id: 6,
    title: 'رولكس دايتونا بول نيومان 6239',
    titleEn: 'Rolex Daytona Paul Newman 6239',
    titleTr: 'Rolex Daytona Paul Newman 6239',
    price: 3500000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'جميرا',
      country: 'الإمارات العربية المتحدة'
    },
    brand: 'Rolex',
    model: 'Cosmograph Daytona',
    referenceNumber: '6239',
    year: 1968,
    type: 'ساعة عتيقة',
    images: [
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      caseSize: '37 مم',
      caseMaterial: 'ستانلس ستيل',
      dialColor: 'أبيض مع عدادات سوداء',
      movement: 'كاليبر 727 يدوي',
      powerReserve: '48 ساعة',
      waterResistance: '50 متر',
      crystal: 'أكريليك أصلي',
      braceletStrap: 'جلد أسود',
      functions: ['كرونوغراف', 'تاكيمتر'],
      jewels: 17
    },
    features: [
      'ميناء بول نيومان الأصلي النادر',
      'حالة أصلية محافظ عليها',
      'حركة كاليبر 727 يدوية',
      'إطار تاكيمتر أصلي',
      'عدادات فرعية مميزة',
      'أرقام مربعة نادرة',
      'علبة غير مصقولة',
      'تاريخ موثق',
      'قطعة متحفية',
      'استثمار نادر',
      'أصالة مؤكدة',
      'تراث رولكس العريق'
    ],
    description: 'رولكس دايتونا بول نيومان 6239 - أندر الساعات وأكثرها قيمة في العالم. هذه التحفة النادرة من عام 1968 تحمل ميناء "بول نيومان" الأسطوري الذي يعتبر الأكثر طلباً بين جامعي الساعات. حالة أصلية استثنائية مع جميع المكونات الأصلية، تمثل قمة الاستثمار في الساعات العتيقة.',
    views: 234560,
    likes: 5678,
    featured: true,
    seller: {
      name: 'كلاسيك واتشز دبي',
      nameEn: 'Classic Watches Dubai',
      nameTr: 'Klasik Saatler Dubai',
      verified: true,
      rating: 4.9,
      phone: '+971-50-123-4567',
      type: 'collector'
    },
    createdAt: '2024-01-03',
    status: 'available',
    condition: 'vintage',
    watchId: 'ROL-VIN-006',
    warranty: false,
    boxPapers: false,
    serviceHistory: true
  }
];

// دمج جميع الساعات
export const allLuxuryWatches = [
  ...rolexWatches,
  ...patekPhilippeWatches,
  ...audemarsPiguetWatches,
  ...richardMilleWatches,
  ...vintageWatches
];

// إحصائيات الساعات
export const luxuryWatchStats = {
  totalListings: allLuxuryWatches.length,
  totalValue: allLuxuryWatches.reduce((sum, watch) => sum + watch.price, 0),
  averagePrice: allLuxuryWatches.reduce((sum, watch) => sum + watch.price, 0) / allLuxuryWatches.length,
  brands: Array.from(new Set(allLuxuryWatches.map(w => w.brand))),
  types: Array.from(new Set(allLuxuryWatches.map(w => w.type))),
  featuredCount: allLuxuryWatches.filter(w => w.featured).length
};

// فئات فرعية للساعات
export const luxuryWatchSubcategories = [
  { id: 'sports', name: 'ساعات رياضية', nameEn: 'Sports Watches', nameTr: 'Spor Saatleri', count: 3 },
  { id: 'dress', name: 'ساعات كلاسيكية', nameEn: 'Dress Watches', nameTr: 'Klasik Saatler', count: 2 },
  { id: 'diving', name: 'ساعات غوص', nameEn: 'Diving Watches', nameTr: 'Dalış Saatleri', count: 1 },
  { id: 'vintage', name: 'ساعات عتيقة', nameEn: 'Vintage Watches', nameTr: 'Antika Saatler', count: 1 },
  { id: 'limited', name: 'إصدار محدود', nameEn: 'Limited Edition', nameTr: 'Sınırlı Edisyon', count: 1 }
];

export default allLuxuryWatches;
