export interface LuxuryJewelryListing {
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
  collection?: string;
  year: number;
  type: string; // خاتم، عقد، أقراط، إسوارة، إلخ
  category: string; // الماس، الزمرد، الياقوت، اللؤلؤ، إلخ
  images: string[];
  specs: {
    mainStone?: {
      type: string; // نوع الحجر الرئيسي
      carat: number; // الوزن بالقيراط
      color: string; // اللون
      clarity: string; // النقاء
      cut: string; // القطع
      origin?: string; // المنشأ
    };
    metal: {
      type: string; // نوع المعدن
      purity: string; // النقاء (18K, 24K, Platinum, etc.)
      weight: number; // الوزن بالجرام
    };
    dimensions: {
      length?: number;
      width?: number;
      diameter?: number;
      thickness?: number;
    };
    additionalStones?: {
      type: string;
      count: number;
      totalCarat: number;
    }[];
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
    type: 'authorized_dealer' | 'boutique' | 'jeweler' | 'collector' | 'individual';
  };
  createdAt: string;
  status: 'available' | 'sold' | 'reserved';
  condition: 'new' | 'like_new' | 'excellent' | 'good' | 'vintage';
  serialNumber?: string;
  jewelryId?: string;
  certificate?: {
    issuer: string; // GIA, Gübelin, SSEF, etc.
    number: string;
    date: string;
  };
  warranty: boolean;
  boxPapers: boolean;
  appraisal?: {
    value: number;
    date: string;
    appraiser: string;
  };
  limited?: boolean;
  limitedNumber?: string;
}

export const diamondJewelry: LuxuryJewelryListing[] = [
  {
    id: 1,
    title: 'خاتم الماس سوليتير 5 قيراط - تيفاني',
    titleEn: 'Tiffany 5 Carat Diamond Solitaire Ring',
    titleTr: 'Tiffany 5 Karat Elmas Solitaire Yüzük',
    price: 1850000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'دبي مول',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    brand: 'Tiffany & Co.',
    collection: 'Tiffany Setting',
    year: 2023,
    type: 'خاتم',
    category: 'الماس',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      mainStone: {
        type: 'الماس الطبيعي',
        carat: 5.02,
        color: 'D (عديم اللون)',
        clarity: 'FL (خالي من العيوب)',
        cut: 'Round Brilliant',
        origin: 'بوتسوانا'
      },
      metal: {
        type: 'البلاتين',
        purity: '950 Platinum',
        weight: 8.5
      },
      dimensions: {
        diameter: 11.2,
        thickness: 4.8
      }
    },
    features: [
      'ماس طبيعي عالي الجودة D/FL',
      'قطع Round Brilliant مثالي',
      'إعداد تيفاني الكلاسيكي',
      'بلاتين 950 خالص',
      'شهادة GIA معتمدة',
      'صندوق تيفاني الأزرق الأصلي',
      'ضمان مدى الحياة',
      'تصميم خالد وأنيق',
      'حرفية يدوية فاخرة',
      'استثمار طويل المدى',
      'رمز الحب والأناقة',
      'قطعة وراثية ثمينة'
    ],
    description: 'خاتم الماس السوليتير من تيفاني - رمز الحب الخالد والأناقة الراقية. هذه التحفة الاستثنائية تضم ماسة طبيعية 5.02 قيراط بدرجة D/FL - أعلى درجات الجودة في العالم. الماسة مقطوعة بطريقة Round Brilliant المثالية لتعكس أقصى قدر من البريق والنار. مثبتة في إعداد تيفاني الكلاسيكي من البلاتين الخالص، تمثل هذه القطعة قمة الفخامة والحرفية.',
    views: 156780,
    likes: 3456,
    featured: true,
    seller: {
      name: 'تيفاني آند كو الشرق الأوسط',
      nameEn: 'Tiffany & Co. Middle East',
      nameTr: 'Tiffany & Co. Orta Doğu',
      verified: true,
      rating: 5.0,
      phone: '+971-4-123-4567',
      email: 'dubai@tiffany.com',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-15',
    status: 'available',
    condition: 'new',
    jewelryId: 'TIF-SOL-001',
    certificate: {
      issuer: 'GIA',
      number: 'GIA-2397856142',
      date: '2023-12-15'
    },
    warranty: true,
    boxPapers: true,
    appraisal: {
      value: 2100000,
      date: '2024-01-10',
      appraiser: 'خبير المجوهرات المعتمد - دبي'
    }
  },
  {
    id: 2,
    title: 'عقد الماس ريفيير 15 قيراط - كارتييه',
    titleEn: 'Cartier 15 Carat Diamond Rivière Necklace',
    titleTr: 'Cartier 15 Karat Elmas Rivière Kolye',
    price: 4200000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'جميرا',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.2084, lng: 55.2719 }
    },
    brand: 'Cartier',
    collection: 'Destinée',
    year: 2022,
    type: 'عقد',
    category: 'الماس',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      mainStone: {
        type: 'الماس الطبيعي',
        carat: 15.67,
        color: 'D-F (عديم اللون)',
        clarity: 'VVS1-VVS2',
        cut: 'Round Brilliant'
      },
      metal: {
        type: 'الذهب الأبيض',
        purity: '18K',
        weight: 45.2
      },
      dimensions: {
        length: 420
      },
      additionalStones: [
        {
          type: 'الماس',
          count: 87,
          totalCarat: 15.67
        }
      ]
    },
    features: [
      '87 ماسة طبيعية متدرجة',
      'إجمالي 15.67 قيراط',
      'تصميم ريفيير الكلاسيكي',
      'ذهب أبيض 18 قيراط',
      'قفل أمان مخفي',
      'شهادات GIA فردية',
      'صندوق كارتييه الأحمر',
      'ضمان كارتييه الدولي',
      'حرفية فرنسية عريقة',
      'تصميم أيقوني خالد',
      'مناسب للمناسبات الخاصة',
      'قطعة استثمارية نادرة'
    ],
    description: 'عقد الماس ريفيير من كارتييه - تحفة من الأناقة الفرنسية الراقية. يضم 87 ماسة طبيعية متدرجة بعناية فائقة بإجمالي 15.67 قيراط. كل ماسة مختارة بدقة لتتناسق مع الأخريات في اللون والنقاء. مثبت في ذهب أبيض 18 قيراط بتصميم ريفيير الكلاسيكي الذي يُبرز جمال الماس الطبيعي. قطعة خالدة تناسب أرقى المناسبات.',
    views: 98450,
    likes: 2134,
    featured: true,
    seller: {
      name: 'كارتييه الشرق الأوسط',
      nameEn: 'Cartier Middle East',
      nameTr: 'Cartier Orta Doğu',
      verified: true,
      rating: 4.9,
      phone: '+971-4-234-5678',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-12',
    status: 'available',
    condition: 'excellent',
    jewelryId: 'CAR-RIV-002',
    certificate: {
      issuer: 'GIA',
      number: 'GIA-Multiple',
      date: '2022-11-20'
    },
    warranty: true,
    boxPapers: true
  }
];

export const emeraldJewelry: LuxuryJewelryListing[] = [
  {
    id: 3,
    title: 'خاتم الزمرد الكولومبي 8 قيراط - بولغاري',
    titleEn: 'Bulgari 8 Carat Colombian Emerald Ring',
    titleTr: 'Bulgari 8 Karat Kolombiya Zümrüt Yüzük',
    price: 2800000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'وسط دبي',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    brand: 'Bulgari',
    collection: 'Magnifica',
    year: 2023,
    type: 'خاتم',
    category: 'الزمرد',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      mainStone: {
        type: 'زمرد كولومبي طبيعي',
        carat: 8.24,
        color: 'أخضر ملكي مكثف',
        clarity: 'Minor Inclusions',
        cut: 'Emerald Cut',
        origin: 'كولومبيا - مناجم موزو'
      },
      metal: {
        type: 'الذهب الأصفر',
        purity: '18K',
        weight: 12.8
      },
      dimensions: {
        length: 16.2,
        width: 12.8,
        thickness: 6.5
      },
      additionalStones: [
        {
          type: 'الماس',
          count: 24,
          totalCarat: 1.85
        }
      ]
    },
    features: [
      'زمرد كولومبي نادر من مناجم موزو',
      'لون أخضر ملكي استثنائي',
      'قطع Emerald Cut كلاسيكي',
      'شهادة Gübelin السويسرية',
      'إطار من الماس الطبيعي',
      'ذهب أصفر 18 قيراط',
      'تصميم بولغاري الأيقوني',
      'صندوق بولغاري الأصلي',
      'شهادة أصالة مختومة',
      'حرفية إيطالية فاخرة',
      'قطعة فنية نادرة',
      'استثمار في الأحجار الكريمة'
    ],
    description: 'خاتم الزمرد الكولومبي من بولغاري - جوهرة نادرة من أرقى مناجم العالم. يضم زمردة كولومبية استثنائية 8.24 قيراط من مناجم موزو الشهيرة، تتميز بلونها الأخضر الملكي المكثف والنادر. مقطوعة بطريقة Emerald Cut الكلاسيكية ومحاطة بإطار من الماس الطبيعي. مثبتة في ذهب أصفر 18 قيراط بالحرفية الإيطالية العريقة لبولغاري.',
    views: 67890,
    likes: 1456,
    featured: true,
    seller: {
      name: 'بولغاري الشرق الأوسط',
      nameEn: 'Bulgari Middle East',
      nameTr: 'Bulgari Orta Doğu',
      verified: true,
      rating: 4.8,
      phone: '+971-4-345-6789',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-10',
    status: 'available',
    condition: 'new',
    jewelryId: 'BUL-EME-003',
    certificate: {
      issuer: 'Gübelin',
      number: 'GUB-23058471',
      date: '2023-09-15'
    },
    warranty: true,
    boxPapers: true
  }
];

export const sapphireJewelry: LuxuryJewelryListing[] = [
  {
    id: 4,
    title: 'أقراط الياقوت الأزرق الكشميري - هاري ونستون',
    titleEn: 'Harry Winston Kashmir Blue Sapphire Earrings',
    titleTr: 'Harry Winston Keşmir Mavi Safir Küpeler',
    price: 3600000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'البرشاء',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.0657, lng: 55.2708 }
    },
    brand: 'Harry Winston',
    collection: 'Rare Jewels of the World',
    year: 2022,
    type: 'أقراط',
    category: 'الياقوت',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      mainStone: {
        type: 'ياقوت أزرق كشميري',
        carat: 12.67,
        color: 'أزرق كشميري مخملي',
        clarity: 'Transparent',
        cut: 'Oval',
        origin: 'كشمير - الهيمالايا'
      },
      metal: {
        type: 'البلاتين',
        purity: '950 Platinum',
        weight: 18.5
      },
      dimensions: {
        length: 25,
        width: 18,
        thickness: 8
      },
      additionalStones: [
        {
          type: 'الماس',
          count: 48,
          totalCarat: 3.24
        }
      ]
    },
    features: [
      'ياقوت كشميري نادر ومتطابق',
      'لون أزرق مخملي استثنائي',
      'قطع بيضاوي مثالي',
      'شهادة SSEF السويسرية',
      'إطار ماسي متدرج',
      'بلاتين 950 خالص',
      'تصميم هاري ونستون الأيقوني',
      'صندوق هاري ونستون الفاخر',
      'شهادة أصالة مرقمة',
      'حرفية أمريكية عريقة',
      'أندر الأحجار الكريمة',
      'قطعة متحفية نادرة'
    ],
    description: 'أقراط الياقوت الأزرق الكشميري من هاري ونستون - جواهر نادرة من أعالي الهيمالايا. تضم ياقوتتين كشميريتين متطابقتين بإجمالي 12.67 قيراط، تتميزان باللون الأزرق المخملي الأسطوري الذي لا يوجد إلا في مناجم كشمير النادرة. محاطتان بإطار من الماس الطبيعي ومثبتتان في بلاتين خالص. تمثل هذه القطعة قمة الندرة في عالم الأحجار الكريمة.',
    views: 89450,
    likes: 1987,
    featured: true,
    seller: {
      name: 'هاري ونستون الشرق الأوسط',
      nameEn: 'Harry Winston Middle East',
      nameTr: 'Harry Winston Orta Doğu',
      verified: true,
      rating: 5.0,
      phone: '+971-4-456-7890',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-08',
    status: 'available',
    condition: 'excellent',
    jewelryId: 'HW-SAP-004',
    certificate: {
      issuer: 'SSEF',
      number: 'SSEF-118745',
      date: '2022-08-10'
    },
    warranty: true,
    boxPapers: true
  }
];

export const pearlJewelry: LuxuryJewelryListing[] = [
  {
    id: 5,
    title: 'عقد اللؤلؤ الطبيعي التاهيتي - ميكيموتو',
    titleEn: 'Mikimoto Natural Tahitian Pearl Necklace',
    titleTr: 'Mikimoto Doğal Tahiti İnci Kolye',
    price: 980000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'دبي مارينا',
      country: 'الإمارات العربية المتحدة',
      coordinates: { lat: 25.0800, lng: 55.1400 }
    },
    brand: 'Mikimoto',
    collection: 'Tahitian Collection',
    year: 2023,
    type: 'عقد',
    category: 'اللؤلؤ',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      mainStone: {
        type: 'لؤلؤ تاهيتي طبيعي',
        carat: 0, // اللؤلؤ يقاس بالملليمتر وليس القيراط
        color: 'أسود مع انعكاسات خضراء',
        clarity: 'AAA Grade',
        cut: 'طبيعي مستدير',
        origin: 'تاهيتي - بولينيزيا الفرنسية'
      },
      metal: {
        type: 'الذهب الأبيض',
        purity: '18K',
        weight: 15.2
      },
      dimensions: {
        length: 450
      },
      additionalStones: [
        {
          type: 'لؤلؤ تاهيتي',
          count: 35,
          totalCarat: 0 // يقاس بالملليمتر: 9-12mm
        }
      ]
    },
    features: [
      'لؤلؤ تاهيتي طبيعي 100%',
      '35 لؤلؤة متدرجة 9-12 ملم',
      'لون أسود مع انعكاسات خضراء',
      'درجة AAA الممتازة',
      'قفل ذهب أبيض 18 قيراط',
      'شهادة ميكيموتو الأصلية',
      'صندوق ميكيموتو الفاخر',
      'ضمان مدى الحياة',
      'حرفية يابانية تقليدية',
      'تصميم كلاسيكي خالد',
      'مناسب للمناسبات الرسمية',
      'قطعة وراثية ثمينة'
    ],
    description: 'عقد اللؤلؤ التاهيتي من ميكيموتو - تحفة من جمال المحيط الهادئ. يضم 35 لؤلؤة تاهيتي طبيعية متدرجة من 9-12 ملليمتر، تتميز باللون الأسود الغامق مع انعكاسات خضراء ساحرة. كل لؤلؤة مختارة بعناية فائقة لتحقيق التناسق المثالي في الحجم واللون واللمعان. مثبت بقفل من الذهب الأبيض 18 قيراط بالحرفية اليابانية التقليدية العريقة.',
    views: 45670,
    likes: 987,
    featured: false,
    seller: {
      name: 'ميكيموتو الشرق الأوسط',
      nameEn: 'Mikimoto Middle East',
      nameTr: 'Mikimoto Orta Doğu',
      verified: true,
      rating: 4.9,
      phone: '+971-4-567-8901',
      type: 'authorized_dealer'
    },
    createdAt: '2024-01-05',
    status: 'available',
    condition: 'new',
    jewelryId: 'MIK-TAH-005',
    warranty: true,
    boxPapers: true
  }
];

export const vintageJewelry: LuxuryJewelryListing[] = [
  {
    id: 6,
    title: 'بروش الماس آرت ديكو - فان كليف آند آربلز 1925',
    titleEn: 'Van Cleef & Arpels Art Deco Diamond Brooch 1925',
    titleTr: 'Van Cleef & Arpels Art Deco Elmas Broş 1925',
    price: 1650000,
    currency: 'AED',
    location: {
      city: 'دبي',
      area: 'جميرا',
      country: 'الإمارات العربية المتحدة'
    },
    brand: 'Van Cleef & Arpels',
    collection: 'Art Deco Heritage',
    year: 1925,
    type: 'بروش',
    category: 'الماس',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      mainStone: {
        type: 'الماس الطبيعي القديم',
        carat: 8.95,
        color: 'G-H (شبه عديم اللون)',
        clarity: 'VS1-VS2',
        cut: 'Old European Cut'
      },
      metal: {
        type: 'البلاتين',
        purity: '950 Platinum',
        weight: 22.3
      },
      dimensions: {
        length: 65,
        width: 45,
        thickness: 8
      },
      additionalStones: [
        {
          type: 'الماس',
          count: 156,
          totalCarat: 8.95
        }
      ]
    },
    features: [
      'قطعة تراثية من عام 1925',
      'تصميم آرت ديكو أصيل',
      'ماس بقطع أوروبي قديم',
      'بلاتين عتيق خالص',
      'حرفية فرنسية تقليدية',
      'توقيع فان كليف الأصلي',
      'حالة محافظ عليها استثنائياً',
      'تاريخ موثق بالكامل',
      'قطعة متحفية نادرة',
      'استثمار في التراث',
      'تصميم هندسي مميز',
      'إرث عائلي ثمين'
    ],
    description: 'بروش الماس آرت ديكو من فان كليف آند آربلز - تحفة تراثية من العصر الذهبي للمجوهرات. صُنعت عام 1925 في ذروة حقبة آرت ديكو، تتميز بالتصميم الهندسي المميز والحرفية الفرنسية العريقة. تضم 156 ماسة بقطع أوروبي قديم بإجمالي 8.95 قيراط، مثبتة في بلاتين عتيق. قطعة نادرة تحمل تاريخاً عريقاً وتمثل قمة الفن والحرفية في عشرينيات القرن الماضي.',
    views: 34560,
    likes: 756,
    featured: true,
    seller: {
      name: 'مجموعة التراث للمجوهرات النادرة',
      nameEn: 'Heritage Rare Jewelry Collection',
      nameTr: 'Miras Nadir Mücevher Koleksiyonu',
      verified: true,
      rating: 4.8,
      phone: '+971-50-123-4567',
      type: 'collector'
    },
    createdAt: '2024-01-03',
    status: 'available',
    condition: 'vintage',
    jewelryId: 'VCA-ART-006',
    warranty: false,
    boxPapers: false
  }
];

// دمج جميع المجوهرات
export const allLuxuryJewelry = [
  ...diamondJewelry,
  ...emeraldJewelry,
  ...sapphireJewelry,
  ...pearlJewelry,
  ...vintageJewelry
];

// إحصائيات المجوهرات
export const luxuryJewelryStats = {
  totalListings: allLuxuryJewelry.length,
  totalValue: allLuxuryJewelry.reduce((sum, jewelry) => sum + jewelry.price, 0),
  averagePrice: allLuxuryJewelry.reduce((sum, jewelry) => sum + jewelry.price, 0) / allLuxuryJewelry.length,
  brands: Array.from(new Set(allLuxuryJewelry.map(j => j.brand))),
  categories: Array.from(new Set(allLuxuryJewelry.map(j => j.category))),
  featuredCount: allLuxuryJewelry.filter(j => j.featured).length
};

// فئات فرعية للمجوهرات
export const luxuryJewelrySubcategories = [
  { id: 'diamond', name: 'الماس', nameEn: 'Diamond', nameTr: 'Elmas', count: 3 },
  { id: 'emerald', name: 'الزمرد', nameEn: 'Emerald', nameTr: 'Zümrüt', count: 1 },
  { id: 'sapphire', name: 'الياقوت', nameEn: 'Sapphire', nameTr: 'Safir', count: 1 },
  { id: 'pearl', name: 'اللؤلؤ', nameEn: 'Pearl', nameTr: 'İnci', count: 1 },
  { id: 'ruby', name: 'الياقوت الأحمر', nameEn: 'Ruby', nameTr: 'Yakut', count: 0 }
];

export default allLuxuryJewelry;
