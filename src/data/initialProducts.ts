import { Product, Coupon } from '../types.js';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Baby Safety Gate (Adjustable)',
    tagline: 'Keep toddlers & pets safe from stairs and restricted rooms',
    category: 'Gate Safety',
    price: 999,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 235,
    images: [
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavy-duty steel baby gate with double-locking mechanism. Adjustable width from 75cm to 110cm. Pressure-mounted installation requiring zero drilling or wall damage.',
    features: [
      'Auto-close door with dual locking mechanism',
      'Pressure-mounted setup - no drilling required',
      'Adjustable extension width (75cm - 110cm)',
      'Certified non-toxic powder-coated steel',
      'Ideal for stairs, doorways, and corridors'
    ],
    specifications: {
      'Material': 'Powder Coated Steel + ABS',
      'Height': '78 cm',
      'Width Range': '75 - 110 cm',
      'Installation': 'Pressure Mounted',
      'Warranty': '1 Year Manufacturer Warranty'
    },
    inStock: true,
    stockQuantity: 45,
    hsnCode: '73269099',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false,
    faqs: [
      {
        question: 'Will this gate damage my walls or door frames?',
        answer: 'No! It uses pressure mounts with rubberized pads that lock tightly without leaving marks or needing screws.'
      },
      {
        question: 'Can a toddler open the double lock?',
        answer: 'The latch requires pressing two opposing safety buttons while lifting, which is impossible for children under 5.'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Fan Cleaning Duster (Extendable)',
    tagline: 'Clean high ceiling fans safely without dangerous ladders',
    category: 'Fan Cleaning',
    price: 299,
    originalPrice: 499,
    rating: 4.7,
    reviewsCount: 189,
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Microfiber ceiling fan cleaner with telescoping stainless steel pole extending up to 6 feet. Microfiber strands trap dust electrostatically without scattering particles.',
    features: [
      'Extends up to 6 feet for high ceilings',
      'Flexible, bendable microfiber duster head',
      'Electrostatic dust attraction keeps dust contained',
      'Washable & reusable duster sleeve',
      'Ergonomic non-slip rubber grip handle'
    ],
    specifications: {
      'Pole Material': 'Stainless Steel Telescopic',
      'Head Material': 'Electrostatic Microfiber',
      'Max Length': '180 cm (6 ft)',
      'Weight': '350 grams'
    },
    inStock: true,
    stockQuantity: 120,
    hsnCode: '96039000',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false,
    faqs: [
      {
        question: 'Is the microfiber cloth washable?',
        answer: 'Yes, the microfiber cover unsnaps easily and can be machine washed or hand washed in lukewarm water.'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Corner Protector (Set of 8)',
    tagline: 'Cushion sharp furniture edges to protect infants from head injury',
    category: 'Furniture Safety',
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 312,
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Transparent soft PVC corner guards designed to absorb sharp bumps from coffee tables, desks, bed edges, and cabinets. Pre-taped with high-strength 3M adhesive.',
    features: [
      '100% transparent blend - blends with any decor',
      'Food-grade non-toxic flexible PVC',
      'Pre-applied authentic 3M double-sided tape',
      'High impact impact-absorbing sphere shape',
      'Includes 8 corner guards per pack'
    ],
    specifications: {
      'Material': 'Medical Grade Soft Silicone PVC',
      'Quantity': '8 Pieces Pack',
      'Adhesive': '3M Heavy Duty Adhesive',
      'Color': 'Crystal Clear'
    },
    inStock: true,
    stockQuantity: 200,
    hsnCode: '39269099',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-4',
    name: 'Window Safety Lock (Set of 2)',
    tagline: 'Limit sliding window openings to prevent child falls',
    category: 'Window Safety',
    price: 249,
    originalPrice: 399,
    rating: 4.8,
    reviewsCount: 246,
    images: [
      'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavy duty aluminum sliding window stopper lock with key mechanism. Prevents children or intruders from opening sliding windows and balcony doors.',
    features: [
      'Adjustable double thumb-screw clamp',
      'No tools or drilling required for install',
      'Fits almost all sliding windows & patio doors',
      'Provides ventilation while ensuring safety',
      'Includes safety key lock mechanism'
    ],
    specifications: {
      'Material': 'Die-cast Aluminum Alloy',
      'Quantity': '2 Locks + 2 Keys',
      'Track Thickness Range': 'Up to 16 mm'
    },
    inStock: true,
    stockQuantity: 85,
    hsnCode: '83014090',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-5',
    name: 'Stair Safety Net (Strong & Durable)',
    tagline: 'Heavy duty nylon mesh net to protect children and pets from banister gaps',
    category: 'Stair Safety',
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 178,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Thick weather-resistant nylon stair mesh designed for staircases, railings, and balcony banisters. Prevents children from slipping through or dropping toys.',
    features: [
      'High-density tear-resistant nylon mesh',
      '3 meters x 0.8 meter coverage area',
      'Includes zip ties and mounting cords',
      'UV-stabilized for indoor & outdoor use',
      'Washable and easy to fold when storing'
    ],
    specifications: {
      'Dimensions': '3 meters x 80 cm',
      'Mesh Thickness': '4 mm heavy nylon cords',
      'Color': 'Off-White / Transparent Blend'
    },
    inStock: true,
    stockQuantity: 30,
    hsnCode: '56081900',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'prod-6',
    name: 'Gas Stove Guard (Adjustable)',
    tagline: 'Prevent accidental pan tipping and gas knob tampering in the kitchen',
    category: 'Kitchen Safety',
    price: 349,
    originalPrice: 599,
    rating: 4.6,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heat resistant stainless steel stove safety barrier. Blocks toddlers from reaching hot pots and pans or touching gas burner controls.',
    features: [
      'Heat resistant up to 300°C',
      'Adjustable width fits 2 to 4 burner stoves',
      'Suction-cup and heat-resistant tape mounting',
      'Dishwasher safe stainless steel mesh panel'
    ],
    specifications: {
      'Material': '304 Stainless Steel + Heat Polymer',
      'Width Range': '60 cm - 90 cm',
      'Height': '14 cm'
    },
    inStock: true,
    stockQuantity: 60,
    hsnCode: '73239390',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-7',
    name: 'Smoke Detector & Fire Alarm',
    tagline: 'Photoelectric smoke sensor with loud 85dB alarm for early fire warning',
    category: 'Fire Safety',
    price: 799,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 410,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Standalone photoelectric smoke detector with 10-year battery backup and self-check indicator. Instantly sounds loud 85dB alarm when smoke particles are detected.',
    features: [
      'Advanced photoelectric chamber minimizes false alarms',
      'Loud 85 dB siren audible throughout the house',
      'Low battery chirp notification & test button',
      'Easy ceiling or wall screw mount included'
    ],
    specifications: {
      'Sensor Type': 'Photoelectric',
      'Power Source': '9V Battery (Included)',
      'Alarm Volume': '85 dB at 3 meters',
      'Certifications': 'CE & EN14604 Certified'
    },
    inStock: true,
    stockQuantity: 95,
    hsnCode: '85311090',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'prod-8',
    name: 'Fire Extinguisher ABC Type (1KG)',
    tagline: 'Essential multi-purpose fire extinguisher for home, kitchen & car',
    category: 'Fire Safety',
    price: 899,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 280,
    images: [
      'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&w=800&q=80'
    ],
    description: '1KG ABC Dry Powder fire extinguisher suitable for wood, liquid, paper, and electrical fires. Features clear pressure gauge and wall mounting bracket.',
    features: [
      'Effective against Class A, B, C & Electrical fires',
      'Easy pin-release trigger mechanism',
      'Pressure gauge indicator (Red/Green zone)',
      'Includes sturdy metal wall mounting hook'
    ],
    specifications: {
      'Capacity': '1 KG',
      'Agent': 'Mono Ammonium Phosphate Powder',
      'Discharge Range': '2-3 meters',
      'Expiry': '5 Years'
    },
    inStock: true,
    stockQuantity: 50,
    hsnCode: '84241000',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-9',
    name: 'Emergency Rechargeable LED Light',
    tagline: 'Automatic power-cut emergency backup lamp with up to 8 hours light',
    category: 'Emergency Safety',
    price: 599,
    originalPrice: 999,
    rating: 4.7,
    reviewsCount: 165,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bright 60-LED emergency tube light with automatic power-cut turn-on feature. Portable with folding handle and wall mounting keyholes.',
    features: [
      'Auto turn ON during electricity blackouts',
      'Dual light mode: High Brightness & Energy Saver',
      'Built-in 2400mAh rechargeable lithium battery',
      'Up to 8 hours backup time on low mode'
    ],
    specifications: {
      'Battery': '2400 mAh Li-ion',
      'LED Count': '60 Ultra-Bright SMD LEDs',
      'Charging Time': '4 Hours',
      'Input Voltage': 'AC 220-240V'
    },
    inStock: true,
    stockQuantity: 110,
    hsnCode: '85131010',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-10',
    name: 'Motion Sensor Night Light (Set of 2)',
    tagline: 'Automatic warm motion-activated LED light for hallways & stair steps',
    category: 'Electrical Safety',
    price: 399,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 220,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'PIR motion sensor light that automatically illuminates when you walk near in the dark. Magnetic attachment with 3M adhesive base plate.',
    features: [
      'Detects movement up to 3 meters away in dark',
      'Soft 3000K warm anti-glare illumination',
      'USB Rechargeable - no replacement batteries needed',
      'Auto shuts off after 20 seconds of no motion'
    ],
    specifications: {
      'Sensor Angle': '120 degrees',
      'Quantity': '2 Lights',
      'Charging Port': 'Type-C USB',
      'Battery Life': 'Up to 90 days on auto mode'
    },
    inStock: true,
    stockQuantity: 140,
    hsnCode: '94054090',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'prod-11',
    name: 'Bathroom Anti-Slip Safety Mat',
    tagline: 'Suction cup textured silicone mat to prevent shower & tub slips',
    category: 'Bathroom Safety',
    price: 449,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 198,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Extra-long non-slip rubber bath mat featuring 200 powerful suction cups and textured surface. Mildew-resistant with rapid water drainage holes.',
    features: [
      '200 heavy-duty suction cups grip tile floors',
      'Textured slip-resistant top surface for elders & kids',
      'Multiple drainage holes prevent water pooling',
      'Antibacterial & machine washable material'
    ],
    specifications: {
      'Size': '100 cm x 40 cm',
      'Material': 'BPA-Free Odorless TPE',
      'Color': 'Clear Cyan / Slate Gray'
    },
    inStock: true,
    stockQuantity: 75,
    hsnCode: '40169100',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-12',
    name: 'Smart Door Alarm Sensor (110dB)',
    tagline: 'Loud magnetic contact sensor alarm for doors and entry points',
    category: 'Door Safety',
    price: 499,
    originalPrice: 899,
    rating: 4.7,
    reviewsCount: 175,
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Compact 110dB wireless door and window magnetic open alarm. Instantly alerts parents or homeowners when a child or intruder opens a door.',
    features: [
      'Piercing 110dB alarm deters intruders instantly',
      'Simple peel-and-stick installation',
      '4 modes: General Alarm, Continuous Alarm, Chime, Doorbell',
      'Low battery LED warning indicator'
    ],
    specifications: {
      'Volume': '110 dB',
      'Battery': '2 x AAA Batteries',
      'Sensing Distance': '10 mm max magnetic gap'
    },
    inStock: true,
    stockQuantity: 90,
    hsnCode: '85311010',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-13',
    name: 'Safety Drawer Lock (Set of 4)',
    tagline: 'Childproof cabinet and drawer safety straps',
    category: 'Child Safety',
    price: 249,
    originalPrice: 449,
    rating: 4.9,
    reviewsCount: 340,
    images: [
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Flexible adjustable multi-purpose child safety latch locks for refrigerators, trash cans, microwaves, cabinets, and dressers.',
    features: [
      '3M high-bond adhesive backings',
      'Dual button slide release requires adult grip strength',
      'Flexible strap bends around corners effortlessly',
      'Set includes 4 locks'
    ],
    specifications: {
      'Length': '20 cm adjustable',
      'Material': 'ABS + PE Plastic',
      'Quantity': '4 Pack'
    },
    inStock: true,
    stockQuantity: 180,
    hsnCode: '39269099',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-14',
    name: 'Magnetic Cabinet Safety Locks (4 Locks + 1 Key)',
    tagline: 'Invisible childproof locks hidden inside wood cabinets',
    category: 'Child Safety',
    price: 599,
    originalPrice: 999,
    rating: 4.8,
    reviewsCount: 210,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Concealed magnetic cabinet locks that install inside cupboard doors, keeping your kitchen aesthetics clean while preventing toddlers from accessing medicine or chemicals.',
    features: [
      '100% hidden inside - preserves furniture beauty',
      'Powerful magnetic key unlocks through up to 35mm thick wood',
      'Disengagement switch lets you disable lock when kids are away',
      'Includes installation alignment template tool'
    ],
    specifications: {
      'Max Door Thickness': '35 mm',
      'Includes': '4 Locks, 1 Magnetic Key, 1 Alignment Tool',
      'Adhesive': '3M VHB Tape'
    },
    inStock: true,
    stockQuantity: 65,
    hsnCode: '83014090',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'prod-15',
    name: 'WiFi Home Security Camera 1080P',
    tagline: 'Smart indoor security camera with night vision & 2-way audio',
    category: 'Home Safety',
    price: 1899,
    originalPrice: 2999,
    rating: 4.9,
    reviewsCount: 520,
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Full HD 1080P smart home camera with 360-degree pan-tilt rotation, human detection, motion alerts, and two-way crystal voice intercom.',
    features: [
      '1080P Full HD with infrared night vision up to 10m',
      '360° horizontal & 90° vertical coverage',
      'Smart AI motion tracking with mobile notification',
      'Supports up to 128GB MicroSD & Cloud backup'
    ],
    specifications: {
      'Resolution': '1920 x 1080 Full HD',
      'Connectivity': '2.4GHz WiFi',
      'Storage': 'MicroSD card slot / Cloud storage'
    },
    inStock: true,
    stockQuantity: 40,
    hsnCode: '85258090',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-16',
    name: 'Smart Water Leak Sensor Alarm',
    tagline: 'Detect pipe leaks and flooding early to save kitchen & bathroom floors',
    category: 'Water Leak Protection',
    price: 649,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 130,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sensitive dual-probe water sensor alarm. Place near washing machines, under sinks, water heaters, or basements to get immediate 100dB alarm sound on water contact.',
    features: [
      'Ultra-sensitive dual bottom probe pins',
      'Loud 100dB alarm alerts instantly upon moisture detection',
      'IP66 waterproof sealed housing',
      'Operates up to 2 years on single CR123A battery'
    ],
    specifications: {
      'Alarm Volume': '100 dB',
      'Waterproof Standard': 'IP66 Waterproof',
      'Battery': 'CR123A (Included)'
    },
    inStock: true,
    stockQuantity: 80,
    hsnCode: '85311090',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-17',
    name: 'Anti-Mosquito Net Mesh for Windows',
    tagline: 'Self-adhesive insect screen net for doors & windows',
    category: 'Mosquito Protection',
    price: 399,
    originalPrice: 699,
    rating: 4.6,
    reviewsCount: 260,
    images: [
      'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Durable fiberglass mosquito netting with velcro self-adhesive frame tape. Keeps mosquitoes, flies, and bugs out while letting fresh breeze pass.',
    features: [
      'High density mesh keeps tiny insects out',
      'Heavy duty self-adhesive hook tape frame',
      'Easy to trim with household scissors',
      'Washable and removable mesh sheet'
    ],
    specifications: {
      'Size': '1.2 meters x 1.5 meters',
      'Material': 'Flame-Retardant Fiberglass Mesh',
      'Color': 'Grey / Black'
    },
    inStock: true,
    stockQuantity: 150,
    hsnCode: '70199090',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-18',
    name: 'Electrical Socket Safety Covers (Set of 10)',
    tagline: 'Prevent babies from sticking fingers into active wall sockets',
    category: 'Electrical Safety',
    price: 149,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 380,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Insulated 3-pin power plug safety caps designed for Indian wall sockets. Snugly covers open live sockets to keep curious babies safe from electrical shock.',
    features: [
      'Standard Indian 3-pin wall socket fit',
      'Requires pull-key or coin insertion for removal',
      'Insulated flame retardant ABS material',
      '10 plug caps per pack'
    ],
    specifications: {
      'Socket Compatibility': 'Standard 6A Indian 3-pin',
      'Material': 'Flame Retardant ABS',
      'Quantity': '10 Pack'
    },
    inStock: true,
    stockQuantity: 250,
    hsnCode: '39269099',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-19',
    name: 'Door Pinch Guard & Finger Protector',
    tagline: 'Soft EVA foam C-shape door stopper to prevent finger pinching',
    category: 'Child Safety',
    price: 9,
    originalPrice: 49,
    rating: 4.9,
    reviewsCount: 450,
    images: [
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-density EVA foam door cushion stopper prevents doors from slamming shut on toddlers fingers or locking kids inside rooms. Easy slide-on design fits any standard door.',
    features: [
      'C-shape flexible foam design fits standard doors',
      'Prevents painful finger slamming accidents',
      'Non-toxic soft memory EVA foam material',
      'Quick slide-on installation - no tools needed'
    ],
    specifications: {
      'Material': 'High-Density Premium EVA Foam',
      'Thickness': '2 cm',
      'Color': 'White / Pastel Blue'
    },
    inStock: true,
    stockQuantity: 500,
    hsnCode: '39269099',
    gstPercent: 18,
    isBestSeller: true,
    isNewArrival: true,
    faqs: [
      {
        question: 'Does it fit all room doors?',
        answer: 'Yes! The flexible C-shape cushion fits securely on all standard interior doors.'
      }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'SAFETY10',
    discountType: 'PERCENT',
    discountValue: 10,
    minOrderValue: 499,
    description: 'Get 10% OFF on orders above ₹499',
    expiresAt: '2027-12-31'
  },
  {
    code: 'WELCOME50',
    discountType: 'FLAT',
    discountValue: 50,
    minOrderValue: 299,
    description: 'Flat ₹50 OFF for new customers on orders above ₹299',
    expiresAt: '2027-12-31'
  },
  {
    code: 'HOME20',
    discountType: 'PERCENT',
    discountValue: 20,
    minOrderValue: 1499,
    description: 'Get 20% OFF on premium home safety orders above ₹1,499',
    expiresAt: '2027-12-31'
  }
];
