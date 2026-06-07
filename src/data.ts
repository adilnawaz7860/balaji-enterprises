import { Vehicle } from './types';

export const sampleVehicles: Vehicle[] = [
  {
    id: "v1",
    category: "car",
    make: "Maruti Suzuki",
    model: "Swift VXI",
    year: 2018,
    price: 495000, // ₹ 4.95 Lakhs
    mileage: 52000,
    fuelType: "Petrol (पेट्रोल)",
    transmission: "Manual (मैनुअल)",
    engine: "1.2L K-Series",
    description: {
      en: "Single owner Maruti Swift in pristine condition. Excellent mileage, very cold air conditioning, and complete dealership service record. Perfect family car.",
      hi: "सिंगल ओनर मारुति स्विफ्ट, बिल्कुल बेहतरीन स्थिति में। शानदार माइलेज, बहुत ठंडा एसी, और पूरी डीलरशिप सर्विस रिकॉर्ड। परिवार के लिए बेहतरीन कार।"
    },
    features: {
      en: ["Power Windows", "Double-din Music System", "Dual Airbags", "ABS with EBD", "Alloy Wheels"],
      hi: ["पावर विंडो", "डबल-डिन म्यूजिक सिस्टम", "दो एयरबैग", "ABS और EBD", "अलॉय व्हील्स"]
    },
    image: "https://picsum.photos/seed/swiftv/600/400",
    images: [
      "https://picsum.photos/seed/swiftv/600/400",
      "https://picsum.photos/seed/swiftv2/600/400",
      "https://picsum.photos/seed/swiftv3/600/400"
    ],
    status: "available"
  },
  {
    id: "v2",
    category: "auto",
    make: "Bajaj",
    model: "RE Compact 4S",
    year: 2020,
    price: 185000, // ₹ 1.85 Lakhs
    mileage: 28000,
    fuelType: "CNG + Petrol (सीएनजी + पेट्रोल)",
    transmission: "4-Speed Manual (4-स्पीड मैनुअल)",
    engine: "198cc DTS-i",
    description: {
      en: "Highly fuel efficient commercial auto rickshaw. Direct raw power, perfect fitness certificate valid till 2028, and clean state permit clearance. Ready to run and earn.",
      hi: "बेहद किफायती और दमदार व्यावसायिक ऑटो रिक्शा। बेहतरीन पिकअप, फिटनेस सर्टिफिकेट 2028 तक वैध है, और साफ-सुथरा राज्य परमिट। आज ही चलाएं और कमाएं।"
    },
    features: {
      en: ["Dual CNG Tanks", "Spare Wheel & Tool Kit", "Waterproof Canopy", "Extra Cushioned Seats"],
      hi: ["डबल सीएनजी टैंक", "अतिरिक्त पहिया और टूल किट", "वॉटरप्रूफ कैनोपी", "अतिरिक्त आरामदायक सीटें"]
    },
    image: "https://picsum.photos/seed/bajajre/600/400",
    images: [
      "https://picsum.photos/seed/bajajre/600/400",
      "https://picsum.photos/seed/bajajre2/600/400",
      "https://picsum.photos/seed/bajajre3/600/400"
    ],
    status: "available"
  },
  {
    id: "v3",
    category: "mini-truck",
    make: "Tata",
    model: "Ace Gold (Chota Hathi)",
    year: 2019,
    price: 360000, // ₹ 3.6 Lakhs
    mileage: 65000,
    fuelType: "Diesel (डीजल)",
    transmission: "5-Speed Manual (5-स्पीड मैनुअल)",
    engine: "702cc DI Engine",
    description: {
      en: "The undisputed king of mini trucks. Tata Ace Gold with high payload container capacity, reinforced rear suspension, and brand new tyres. Best helper for logistics businesses.",
      hi: "मिनी ट्रकों का निर्विवाद राजा। टाटा एस गोल्ड, उच्च पेलोड क्षमता, मजबूत रियर सस्पेंशन और बिल्कुल नए टायर के साथ। माल ढुलाई व्यवसाय के लिए सबसे अच्छा सहायक।"
    },
    features: {
      en: ["Reinforced Cargo Load Body", "Heavy Duty Springs", "Digital Instrument Cluster", "USB Mobile Charger"],
      hi: ["मजबूत कार्गो लोड बॉडी", "हैवी ड्यूटी सस्पेंशन स्प्रिंग्स", "डिजिटल इंस्ट्रूमेंट क्लस्टर", "यूएसबी मोबाइल चार्जर"]
    },
    image: "https://picsum.photos/seed/tataace/600/400",
    images: [
      "https://picsum.photos/seed/tataace/600/400",
      "https://picsum.photos/seed/tataace2/600/400",
      "https://picsum.photos/seed/tataace3/600/400"
    ],
    status: "available"
  },
  {
    id: "v4",
    category: "car",
    make: "Hyundai",
    model: "i10 Magna",
    year: 2016,
    price: 285000, // ₹ 2.85 Lakhs
    mileage: 44000,
    fuelType: "CNG Verified (पेट्रोल + सीएनजी)",
    transmission: "Manual (मैनुअल)",
    engine: "1.1L i-IRDE",
    description: {
      en: "Extremely clean interior and exterior. Fitted with certified seqential CNG kit for unparalleled city mileage of 26 km/kg. Serviced last month with suspension overhaul.",
      hi: "अंदर और बाहर से बेहद साफ-सुथरी। बेजोड़ शहरी माइलेज (26 किमी/किग्रा) के लिए प्रमाणित सीएनजी किट फिटेड। पिछले महीने नई सर्विस और सस्पेंशन ओवरहाल के साथ उपलब्ध।"
    },
    features: {
      en: ["Power Steering", "Kenwood Audio System", "Plush Seat Covers", "Central Locking"],
      hi: ["पावर स्टीयरिंग", "केनवुड ऑडियो सिस्टम", "शानदार सीट कवर", "सेंट्रल लॉकिंग"]
    },
    image: "https://picsum.photos/seed/hyundaii/600/400",
    images: [
      "https://picsum.photos/seed/hyundaii/600/400",
      "https://picsum.photos/seed/hyundaii2/600/400",
      "https://picsum.photos/seed/hyundaii3/600/400"
    ],
    status: "available"
  },
  {
    id: "v5",
    category: "mini-truck",
    make: "Mahindra",
    model: "Supro Profit Truck",
    year: 2021,
    price: 480000, // ₹ 4.80 Lakhs
    mileage: 38000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "909cc Direct Injection",
    description: {
      en: "Mahindra Supro mini truck with superb mileage and large 8.2 ft deck size. Extremely minor usage, original paints, and active engine warranty features. Drives like new.",
      hi: "शानदार माइलेज और बड़ी 8.2 फीट डेक साइज वाला महिंद्रा सुप्रो मिनी ट्रक। बिल्कुल कम इस्तेमाल किया हुआ, ओरिजिनल पेंट, और इंजन वारंटी के साथ। नए जैसा अनुभव।"
    },
    features: {
      en: ["Long 8.2 ft Cargo Deck", "Air Conditioned Cabin", "Eco/Power Drive Modes", "Tubeless Tyres"],
      hi: ["लंबा 8.2 फीट कार्गो डेक", "एयर कंडीशनर केबिन", "इको/पावर ड्राइव मोड", "ट्यूबलेस टायर"]
    },
    image: "https://picsum.photos/seed/mahsupro/600/400",
    images: [
      "https://picsum.photos/seed/mahsupro/600/400",
      "https://picsum.photos/seed/mahsupro2/600/400",
      "https://picsum.photos/seed/mahsupro3/600/400"
    ],
    status: "available"
  },
  {
    id: "v6",
    category: "auto",
    make: "Piaggio",
    model: "Ape DX",
    year: 2018,
    price: 140000, // ₹ 1.4 Lakhs
    mileage: 41000,
    fuelType: "Diesel (डीजल)",
    transmission: "4-Speed Manual (4-स्पीड मैनुअल)",
    engine: "436cc Water Cooled",
    description: {
      en: "Robust daily passenger loader. Piaggio Ape is diesel-driven supplying immense hill-climbing torque. Certified and emission clearances passed for local permits.",
      hi: "मजबूत और टिकाऊ पैसेंजर ऑटो। पियाजियो आपे डीजल चालित है जो बेहतरीन टॉर्क और चढ़ाई क्षमता प्रदान करता है। स्थानीय परमिट के लिए पूरी तरह स्वीकृत।"
    },
    features: {
      en: ["Heavy Duty Chassis", "Wide Driver Cabin", "Extra Luggage Roof Carrier", "High Heat Protection System"],
      hi: ["मजबूत चेसिस", "चौड़ा ड्राइवर केबिन", "सामान के लिए रूफ कैरियर", "हाई हीट प्रोटेक्शन सिस्टम"]
    },
    image: "https://picsum.photos/seed/piaggioape/600/400",
    images: [
      "https://picsum.photos/seed/piaggioape/600/400",
      "https://picsum.photos/seed/piaggioape2/600/400",
      "https://picsum.photos/seed/piaggioape3/600/400"
    ],
    status: "available"
  },
  {
    id: "v7",
    category: "car",
    make: "Mahindra",
    model: "Bolero Power+ ZLX",
    year: 2017,
    price: 640000, // ₹ 6.4 Lakhs
    mileage: 72000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "1.5L mHawk75",
    description: {
      en: "Full SUV toughness. Mahindra Bolero ZLX top model with digital cluster, original body cladding, and massive ground clearance. Excellent suspension for village roads.",
      hi: "पूरी तरह से मजबूत और दमदार एसयूवी। महिंद्रा बोलेरो ZLX टॉप मॉडल जिसमें डिजिटल क्लस्टर, ओरिजिनल बॉडी क्लैडिंग और जबरदस्त ग्राउंड क्लीयरेंस है। ग्रामीण रास्तों के लिए सर्वोत्तम सस्पेंशन।"
    },
    features: {
      en: ["Micro Hybrid System", "All 4 Power Windows", "Rear Wiper", "Voice Messaging System", "Fog Lamps"],
      hi: ["माइक्रो हाइब्रिड सिस्टम", "सभी 4 पावर विंडो", "रियर वाइपर", "वॉइस मैसेजिंग सिस्टम", "फॉग लैंप"]
    },
    image: "https://picsum.photos/seed/bolero/600/400",
    images: [
      "https://picsum.photos/seed/bolero/600/400",
      "https://picsum.photos/seed/bolero2/600/400",
      "https://picsum.photos/seed/bolero3/600/400"
    ],
    status: "available"
  },
  {
    id: "v8",
    category: "mini-truck",
    make: "Tata",
    model: "Intra V10",
    year: 2022,
    price: 520000, // ₹ 5.2 Lakhs
    mileage: 26000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "2-Cylinder 800cc DI",
    description: {
      en: "Almost brand new Tata Intra mini truck. Power steering, super comfortable car-like cabin, leaf spring suspension built for heavy weight transportation loads.",
      hi: "लगभग बिल्कुल नया टाटा इंट्रा मिनी ट्रक। पावर स्टीयरिंग, कार जैसा आरामदायक केबिन और भारी माल ढुलाई के लिए बनाए गए मजबूत लीफ स्प्रिंग सस्पेंशन पैड्स।"
    },
    features: {
      en: ["Power Steering", "Eco Mode Switch", "Gear Shift Advisor", "Car-like Comfort Seats"],
      hi: ["पावर स्टीयरिंग", "इको मोड स्विच", "गियर शिफ्ट एडवाइजर", "कार जैसी आरामदायक सीटें"]
    },
    image: "https://picsum.photos/seed/tataintra/600/400",
    images: [
      "https://picsum.photos/seed/tataintra/600/400",
      "https://picsum.photos/seed/tataintra2/600/400",
      "https://picsum.photos/seed/tataintra3/600/400"
    ],
    status: "available"
  }
];

export const formatPrice = (price: number, lang: 'en' | 'hi') => {
  // Convers to Lakhs representation
  const lakhs = price / 100000;
  if (lang === 'en') {
    return `₹ ${lakhs.toFixed(2)} Lakhs`;
  } else {
    return `₹ ${lakhs.toFixed(2)} लाख`;
  }
};

export const formatMileage = (km: number, lang: 'en' | 'hi') => {
  if (lang === 'en') {
    return `${km.toLocaleString('en-IN')} km`;
  } else {
    return `${km.toLocaleString('en-IN')} किमी`;
  }
};
