export interface LuxuryCarListing {
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
  year: number;
  type: string; // سيارة رياضية، كلاسيكية، محدودة الإصدار، إلخ
  images: string[];
  specs: {
    engine: string;
    horsepower: number;
    transmission: string;
    fuelType: string;
    acceleration: string; // 0-100 km/h
    topSpeed: number;
    mileage: number;
    doors: number;
    seats: number;
    drivetrain: string;
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
    type: 'dealer' | 'individual' | 'showroom';
  };
  createdAt: string;
  status: 'available' | 'sold' | 'reserved';
  condition: 'new' | 'used' | 'certified';
  vin?: string;
  carId?: string;
  warranty?: boolean;
  serviceHistory?: boolean;
  accidents?: boolean;
}

export const dubaiLuxuryCars: LuxuryCarListing[] = [
  {
    id: 1,
    title: 'لامبورغيني أفينتادور SVJ 2023',
    titleEn: 'Lamborghini Aventador SVJ 2023',
    titleTr: 'Lamborghini Aventador SVJ 2023',
    price: 1850000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'شارع الشيخ زايد',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.2048, lng: 55.2708 }
    },
    brand: 'Lamborghini',
    model: 'Aventador SVJ',
    year: 2023,
    type: 'سيارة رياضية',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '6.5L V12 Naturally Aspirated',
      horsepower: 770,
      transmission: '7-Speed ISR Automated',
      fuelType: 'بنزين',
      acceleration: '2.8 ثانية',
      topSpeed: 350,
      mileage: 1200,
      doors: 2,
      seats: 2,
      drivetrain: 'AWD'
    },
    features: [
      'نظام الدفع الرباعي المتطور',
      'نظام تعليق نشط',
      'كربون فايبر في الهيكل',
      'نظام عادم تيتانيوم',
      'مقاعد رياضية من الكربون',
      'شاشة تحكم رقمية 8.4 بوصة',
      'نظام صوتي Bang & Olufsen',
      'إضاءة LED محيطية',
      'نظام ملاحة متطور',
      'كاميرات 360 درجة',
      'نظام مراقبة ضغط الإطارات',
      'تحكم في الجر والثبات',
      'فرامل كربون سيراميك',
      'جنوط خفيفة الوزن 20/21 بوصة',
      'طلاء خاص متعدد الطبقات'
    ],
    description: 'لامبورغيني أفينتادور SVJ الأسطورية - قمة الأداء والتصميم الإيطالي الراقي. هذه السيارة الاستثنائية تجمع بين القوة الهائلة لمحرك V12 الطبيعي والتقنيات الهوائية المتطورة. تتميز بتصميم عدواني وأداء لا يضاهى على الحلبة والطريق. حالة ممتازة مع سجل خدمة كامل.',
    views: 45680,
    likes: 892,
    featured: true,
    seller: {
      name: 'لامبورغيني دبي الرسمي',
      nameEn: 'Lamborghini Dubai Official',
      nameTr: 'Lamborghini Dubai Resmi',
      verified: true,
      rating: 4.9,
      phone: '+971-4-321-9876',
      email: 'sales@lamborghinidubai.ae',
      type: 'dealer'
    },
    createdAt: '2024-01-15',
    status: 'available',
    condition: 'new',
    carId: 'LAM-SVJ-001',
    warranty: true,
    serviceHistory: true,
    accidents: false
  },
  {
    id: 2,
    title: 'فيراري 812 سوبرفاست 2022',
    titleEn: 'Ferrari 812 Superfast 2022',
    titleTr: 'Ferrari 812 Superfast 2022',
    price: 1650000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'دبي مول',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    brand: 'Ferrari',
    model: '812 Superfast',
    year: 2022,
    type: 'سيارة رياضية',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '6.5L V12 Naturally Aspirated',
      horsepower: 800,
      transmission: '7-Speed F1 Dual-Clutch',
      fuelType: 'بنزين',
      acceleration: '2.9 ثانية',
      topSpeed: 340,
      mileage: 3500,
      doors: 2,
      seats: 2,
      drivetrain: 'RWD'
    },
    features: [
      'محرك V12 طبيعي 6.5 لتر',
      'نظام تعليق مغناطيسي',
      'نظام توجيه خلفي',
      'فرامل بريمبو كربون سيراميك',
      'مقاعد رياضية قابلة للتعديل كهربائياً',
      'نظام معلومات ترفيهي متطور',
      'شاشة لمس 10.25 بوصة',
      'نظام صوتي JBL بريميوم',
      'تكييف مناخي مزدوج',
      'إضاءة LED كاملة',
      'جنوط رياضية 20 بوصة',
      'نظام مراقبة النقطة العمياء',
      'كاميرا خلفية عالية الدقة',
      'نظام إنذار متطور',
      'طلاء روسو كورسا الأحمر'
    ],
    description: 'فيراري 812 سوبرفاست - تحفة فنية من مارانيلو تجمع بين الأناقة الإيطالية والأداء الاستثنائي. هذه السيارة تمثل قمة تطور محركات V12 الطبيعية من فيراري. حالة ممتازة مع صيانة منتظمة في الوكالة المعتمدة.',
    views: 38950,
    likes: 743,
    featured: true,
    seller: {
      name: 'فيراري الشرق الأوسط',
      nameEn: 'Ferrari Middle East',
      nameTr: 'Ferrari Orta Doğu',
      verified: true,
      rating: 4.8,
      phone: '+971-4-432-8765',
      type: 'dealer'
    },
    createdAt: '2024-01-12',
    status: 'available',
    condition: 'certified',
    carId: 'FER-812-002',
    warranty: true,
    serviceHistory: true,
    accidents: false
  },
  {
    id: 3,
    title: 'مكلارين 720S سبايدر 2021',
    titleEn: 'McLaren 720S Spider 2021',
    titleTr: 'McLaren 720S Spider 2021',
    price: 1420000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'جميرا',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.2084, lng: 55.2719 }
    },
    brand: 'McLaren',
    model: '720S Spider',
    year: 2021,
    type: 'سيارة رياضية مكشوفة',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '4.0L V8 Twin-Turbo',
      horsepower: 720,
      transmission: '7-Speed SSG',
      fuelType: 'بنزين',
      acceleration: '2.9 ثانية',
      topSpeed: 341,
      mileage: 5800,
      doors: 2,
      seats: 2,
      drivetrain: 'RWD'
    },
    features: [
      'سقف قابل للطي كهربائياً',
      'هيكل من ألياف الكربون',
      'نظام تعليق ProActive Chassis',
      'فرامل كربون سيراميك',
      'مقاعد رياضية من الجلد الطبيعي',
      'نظام ملاحة IRIS',
      'نظام صوتي Bowers & Wilkins',
      'تكييف مناخي تلقائي',
      'إضاءة LED محيطية',
      'جنوط خفيفة الوزن 19/20 بوصة',
      'نظام مراقبة الإطارات',
      'كاميرات أمامية وخلفية',
      'نظام إنذار ذكي',
      'تحكم في الجر والثبات',
      'أوضاع قيادة متعددة'
    ],
    description: 'مكلارين 720S سبايدر - سيارة رياضية مكشوفة استثنائية تجمع بين الأداء الفائق والمتعة المطلقة. تقنيات الفورمولا 1 في سيارة طريق أنيقة. السقف القابل للطي يتيح تجربة قيادة لا تُنسى تحت سماء دبي الصافية.',
    views: 28750,
    likes: 567,
    featured: false,
    seller: {
      name: 'مكلارين دبي',
      nameEn: 'McLaren Dubai',
      nameTr: 'McLaren Dubai',
      verified: true,
      rating: 4.7,
      phone: '+971-4-543-7654',
      type: 'dealer'
    },
    createdAt: '2024-01-10',
    status: 'available',
    condition: 'certified',
    carId: 'MCL-720S-003',
    warranty: true,
    serviceHistory: true,
    accidents: false
  },
  {
    id: 4,
    title: 'رولز رويس كولينان بلاك بادج 2023',
    titleEn: 'Rolls-Royce Cullinan Black Badge 2023',
    titleTr: 'Rolls-Royce Cullinan Black Badge 2023',
    price: 2200000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'البرشاء',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.0657, lng: 55.2708 }
    },
    brand: 'Rolls-Royce',
    model: 'Cullinan Black Badge',
    year: 2023,
    type: 'سيارة فاخرة SUV',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '6.75L V12 Twin-Turbo',
      horsepower: 600,
      transmission: '8-Speed Automatic',
      fuelType: 'بنزين',
      acceleration: '5.0 ثانية',
      topSpeed: 250,
      mileage: 800,
      doors: 4,
      seats: 5,
      drivetrain: 'AWD'
    },
    features: [
      'محرك V12 مزدوج التيربو 6.75 لتر',
      'نظام تعليق هوائي ذكي',
      'مقاعد مساج بـ 22 وضعية',
      'سقف نجوم Starlight Headliner',
      'نظام صوتي Bespoke Audio',
      'ثلاجة مدمجة للمشروبات',
      'طاولات خشبية قابلة للطي',
      'ستائر كهربائية للنوافذ',
      'إضاءة محيطية 64 لون',
      'جلود طبيعية مخصصة',
      'لوحة عدادات رقمية',
      'كاميرات بانورامية 360°',
      'نظام ملاحة متطور',
      'تحكم مناخي 4 مناطق',
      'أبواب انتحارية مميزة'
    ],
    description: 'رولز رويس كولينان بلاك بادج - قمة الفخامة والرفاهية في عالم السيارات الرياضية متعددة الاستخدامات. تصميم أسود مميز مع تفاصيل حصرية تجعلها تحفة فنية متحركة. الداخلية المصنوعة يدوياً توفر تجربة ملكية لا مثيل لها.',
    views: 52340,
    likes: 1023,
    featured: true,
    seller: {
      name: 'رولز رويس موتور كارز دبي',
      nameEn: 'Rolls-Royce Motor Cars Dubai',
      nameTr: 'Rolls-Royce Motor Cars Dubai',
      verified: true,
      rating: 5.0,
      phone: '+971-4-654-3210',
      type: 'dealer'
    },
    createdAt: '2024-01-08',
    status: 'available',
    condition: 'new',
    carId: 'RR-CUL-004',
    warranty: true,
    serviceHistory: true,
    accidents: false
  },
  {
    id: 5,
    title: 'بنتلي كونتيننتال GT سبيد 2022',
    titleEn: 'Bentley Continental GT Speed 2022',
    titleTr: 'Bentley Continental GT Speed 2022',
    price: 1380000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'دبي مارينا',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.0800, lng: 55.1400 }
    },
    brand: 'Bentley',
    model: 'Continental GT Speed',
    year: 2022,
    type: 'سيارة فاخرة كوبيه',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '6.0L W12 Twin-Turbo',
      horsepower: 650,
      transmission: '8-Speed PDK',
      fuelType: 'بنزين',
      acceleration: '3.6 ثانية',
      topSpeed: 335,
      mileage: 4200,
      doors: 2,
      seats: 4,
      drivetrain: 'AWD'
    },
    features: [
      'محرك W12 مزدوج التيربو',
      'نظام الدفع الرباعي الذكي',
      'مقاعد جلدية مدفأة ومبردة',
      'نظام صوتي Naim for Bentley',
      'شاشة دوارة ثلاثية الجوانب',
      'ساعة برايتلينغ مدمجة',
      'إضاءة محيطية 30 لون',
      'نظام تعليق هوائي تكيفي',
      'فرامل كربون سيراميك',
      'جنوط 22 بوصة مخصصة',
      'نظام ملاحة بنتلي',
      'كاميرات محيطية',
      'تحكم مناخي 4 مناطق',
      'ستائر كهربائية',
      'تشطيبات خشب الجوز'
    ],
    description: 'بنتلي كونتيننتال GT سبيد - مزيج مثالي من الأداء الرياضي والفخامة البريطانية التقليدية. محرك W12 الاستثنائي يوفر قوة هائلة مع نعومة لا مثيل لها. الداخلية المصنوعة يدوياً تعكس قرون من الخبرة البريطانية في صناعة السيارات الفاخرة.',
    views: 31280,
    likes: 654,
    featured: false,
    seller: {
      name: 'بنتلي دبي الرسمي',
      nameEn: 'Bentley Dubai Official',
      nameTr: 'Bentley Dubai Resmi',
      verified: true,
      rating: 4.8,
      phone: '+971-4-765-4321',
      type: 'dealer'
    },
    createdAt: '2024-01-05',
    status: 'available',
    condition: 'certified',
    carId: 'BEN-GT-005',
    warranty: true,
    serviceHistory: true,
    accidents: false
  }
];

export const classicLuxuryCars: LuxuryCarListing[] = [
  {
    id: 6,
    title: 'بورش 911 تورbo S كلاسيك 1995',
    titleEn: 'Porsche 911 Turbo S Classic 1995',
    titleTr: 'Porsche 911 Turbo S Klasik 1995',
    price: 850000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'جميرا',
      country: 'الإمارات العربية المتحدة'
    },
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 1995,
    type: 'سيارة كلاسيكية',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '3.6L Flat-6 Turbo',
      horsepower: 408,
      transmission: '6-Speed Manual',
      fuelType: 'بنزين',
      acceleration: '4.1 ثانية',
      topSpeed: 290,
      mileage: 45000,
      doors: 2,
      seats: 4,
      drivetrain: 'RWD'
    },
    features: [
      'محرك فلات 6 تيربو أصلي',
      'ناقل حركة يدوي 6 سرعات',
      'هيكل أصلي غير معدل',
      'مقاعد ريكارو الأصلية',
      'عجلة قيادة موموو',
      'نظام عادم أصلي',
      'فرامل بريمبو',
      'جنوط فوكس الأصلية',
      'طلاء أصلي محافظ عليه',
      'داخلية جلدية أصلية',
      'تكييف يدوي',
      'راديو بلاوبونكت كلاسيكي',
      'أرقام مطابقة',
      'سجل خدمة كامل',
      'شهادة أصالة من بورش'
    ],
    description: 'بورش 911 تورbo S كلاسيكية من عام 1995 - قطعة تاريخية نادرة من عصر ذهبي لبورش. هذه السيارة الاستثنائية تمثل قمة الهندسة الألمانية في التسعينات. حالة ممتازة مع أرقام مطابقة وسجل خدمة موثق بالكامل. استثمار رائع للمجموعات الكلاسيكية.',
    views: 18750,
    likes: 342,
    featured: true,
    seller: {
      name: 'كلاسيك كارز دبي',
      nameEn: 'Classic Cars Dubai',
      nameTr: 'Klasik Arabalar Dubai',
      verified: true,
      rating: 4.9,
      phone: '+971-50-123-4567',
      type: 'dealer'
    },
    createdAt: '2024-01-03',
    status: 'available',
    condition: 'used',
    carId: 'POR-911T-006',
    warranty: false,
    serviceHistory: true,
    accidents: false
  }
];

export const limitedEditionCars: LuxuryCarListing[] = [
  {
    id: 7,
    title: 'بوغاتي شيرون سبور محدودة الإصدار',
    titleEn: 'Bugatti Chiron Sport Limited Edition',
    titleTr: 'Bugatti Chiron Sport Sınırlı Edisyon',
    price: 12500000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'وسط دبي',
      country: 'الإمارات العربية المتحدة'
    },
    brand: 'Bugatti',
    model: 'Chiron Sport',
    year: 2023,
    type: 'محدودة الإصدار',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '8.0L W16 Quad-Turbo',
      horsepower: 1500,
      transmission: '7-Speed DSG',
      fuelType: 'بنزين',
      acceleration: '2.4 ثانية',
      topSpeed: 420,
      mileage: 150,
      doors: 2,
      seats: 2,
      drivetrain: 'AWD'
    },
    features: [
      'محرك W16 رباعي التيربو',
      'هيكل من ألياف الكربون',
      'تصميم حصري محدود',
      'مقاعد من الجلد والألكانتارا',
      'نظام صوتي أكوستيك حصري',
      'عدادات رقمية فاخرة',
      'إضاءة LED مخصصة',
      'جنوط ميشلان خاصة',
      'نظام تبريد متطور',
      'فرامل كربون سيراميك',
      'نظام تحكم ديناميكي',
      'طلاء خاص متعدد الطبقات',
      'رقم تسلسلي حصري',
      'شهادة أصالة من بوغاتي',
      'حقيبة أدوات حصرية'
    ],
    description: 'بوغاتي شيرون سبور - أسطورة الهندسة الفرنسية وقمة الأداء المطلق. هذه التحفة النادرة تمثل أعلى مستويات الفخامة والأداء في عالم السيارات. محرك W16 الأسطوري ينتج قوة خيالية تجعلها من أسرع السيارات في العالم. قطعة فنية للمجموعات الحصرية.',
    views: 89750,
    likes: 1876,
    featured: true,
    seller: {
      name: 'بوغاتي الشرق الأوسط',
      nameEn: 'Bugatti Middle East',
      nameTr: 'Bugatti Orta Doğu',
      verified: true,
      rating: 5.0,
      phone: '+971-4-999-8888',
      type: 'dealer'
    },
    createdAt: '2024-01-01',
    status: 'available',
    condition: 'new',
    carId: 'BUG-CHI-007',
    warranty: true,
    serviceHistory: true,
    accidents: false
  }
];

// دمج جميع السيارات
export const allLuxuryCars = [
  ...dubaiLuxuryCars,
  ...classicLuxuryCars,
  ...limitedEditionCars
];

// إحصائيات السيارات
export const luxuryCarStats = {
  totalListings: allLuxuryCars.length,
  totalValue: allLuxuryCars.reduce((sum, car) => sum + car.price, 0),
  averagePrice: allLuxuryCars.reduce((sum, car) => sum + car.price, 0) / allLuxuryCars.length,
  brands: Array.from(new Set(allLuxuryCars.map(c => c.brand))),
  types: Array.from(new Set(allLuxuryCars.map(c => c.type))),
  featuredCount: allLuxuryCars.filter(c => c.featured).length
};

// فئات فرعية للسيارات
export const luxuryCarSubcategories = [
  { id: 'sports', name: 'سيارات رياضية', nameEn: 'Sports Cars', nameTr: 'Spor Arabalar', count: 5 },
  { id: 'luxury-suv', name: 'سيارات فاخرة SUV', nameEn: 'Luxury SUVs', nameTr: 'Lüks SUV\'lar', count: 1 },
  { id: 'classic', name: 'سيارات كلاسيكية', nameEn: 'Classic Cars', nameTr: 'Klasik Arabalar', count: 1 },
  { id: 'limited', name: 'محدودة الإصدار', nameEn: 'Limited Edition', nameTr: 'Sınırlı Edisyon', count: 1 },
  { id: 'convertible', name: 'سيارات مكشوفة', nameEn: 'Convertibles', nameTr: 'Üstü Açık', count: 1 }
];

export default allLuxuryCars;
