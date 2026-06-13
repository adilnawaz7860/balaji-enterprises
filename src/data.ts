import { Vehicle } from './types';

export const sampleVehicles: Vehicle[] = [
  
  {
    id: "v12",
    category: "mini-truck",
    make: "Ashok Leyland",
    model: "Bada Dost i2",
    year: 2023,
    price: 590000,
    mileage: 62000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "1.5L iGen4 Diesel",
    description: {
      en: "Ashok Leyland Bada Dost i2, trusted workhorse for heavy commercial loads. 2023 model, first owner, diesel powered. 62,000 km driven with robust build quality and strong chassis.",
      hi: "अशोक लेलैंड बड़ा दोस्त i2, भारी व्यावसायिक माल के लिए विश्वसनीय वाहन। 2023 मॉडल, पहला मालिक, डीजल चालित। 62,000 किमी चला, मजबूत बिल्ड और चेसिस।"
    },
    features: {
      en: ["Heavy Load Capacity", "First Owner 2023", "Diesel iGen4 Engine", "Commercial Grade Chassis"],
      hi: ["भारी माल क्षमता", "2023 का पहला मालिक", "डीजल iGen4 इंजन", "कमर्शियल ग्रेड चेसिस"]
    },
    image: "ashokA1.jpeg",
    images: [
    "ashokA1.jpeg",
    "ashokA2.jpeg",
    "ashokA3.jpeg",
    "ashokA4.jpeg",
    "ashokA5.jpeg",
    "ashokA6.jpeg",
    "ashokA7.jpeg",
    "ashokA8.jpeg",
    "ashokA9.jpeg",
    "ashokA10.jpegg",
    ],
    status: "available"
  },
  {
    id: "v13",
    category: "mini-truck",
    make: "Tata",
    model: "Ace CNG",
    year: 2024,
    price: 420000,
    mileage: 52000,
    fuelType: "CNG (सीएनजी)",
    transmission: "Manual (मैनुअल)",
    engine: "702cc DI Engine (CNG)",
    description: {
      en: "Tata Ace CNG variant, 2024 model last batch, first owner. CNG fuel gives lower running cost for city delivery work. 52,000 km driven, clean and ready to earn.",
      hi: "टाटा एस CNG वेरिएंट, 2024 मॉडल लास्ट बैच, पहला मालिक। सीएनजी ईंधन शहरी डिलीवरी के लिए किफायती। 52,000 किमी चला, साफ-सुथरा और कमाई के लिए तैयार।"
    },
    features: {
      en: ["CNG Fuel Economy", "2024 Last Batch Model", "First Owner", "City Delivery Ready"],
      hi: ["सीएनजी ईंधन किफायती", "2024 लास्ट बैच मॉडल", "पहला मालिक", "शहरी डिलीवरी के लिए तैयार"]
    },
    image: "tataACE20241.jpeg",
    images: [
      "tataACE20241.jpeg",
  "tataACE20242.jpeg",
  "tataACE20243.jpeg",
  "tataACE20244.jpeg",
  "tataACE20245.jpeg",
  "tataACE20246.jpeg",
    ],
    status: "available"
  },
  {
    id: "v14",
    category: "mini-truck",
    make: "Mahindra",
    model: "Supro Maxi",
    year: 2022,
    price: 350000,
    mileage: 48000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "909cc mFalcon G80 Diesel",
    description: {
      en: "Mahindra Supro Maxi with widest cargo deck in class. 2022 model, first owner, diesel variant. 50,000 km driven with excellent payload capacity for local logistics.",
      hi: "महिंद्रा सुप्रो मैक्सी, अपनी श्रेणी में सबसे चौड़ी कार्गो डेक। 2022 मॉडल, पहला मालिक, डीजल वेरिएंट। 50,000 किमी चला, स्थानीय लॉजिस्टिक्स के लिए शानदार।"
    },
    features: {
      en: ["Wide Maxi Cargo Deck", "First Owner 2022", "Diesel Variant", "High Payload Capacity"],
      hi: ["चौड़ी मैक्सी कार्गो डेक", "2022 का पहला मालिक", "डीजल वेरिएंट", "उच्च पेलोड क्षमता"]
    },
    image: "supromaxi1.jpeg",
    images: [
      "supromaxi2.jpeg",
      "supromaxi2.jpeg",
      "supromaxi3.jpeg",
      "supromaxi4.jpeg",
      "supromaxi5.jpeg",
      "supromaxi6.jpeg",
      "supromaxi7.jpeg",
      "supromaxi8.jpeg",
      "supromaxi9.jpeg",
    ],
    status: "available"
  },
  {
    id: "v15",
    category: "auto",
    make: "Atul",
    model: "Three Wheeler",
    year: 2024,
    price: 195000,
    mileage: 31000,
    fuelType: "CNG (सीएनजी)",
    transmission: "4-Speed Manual (4-स्पीड मैनुअल)",
    engine: "Single Cylinder CNG",
    description: {
      en: "Atul Three Wheeler cargo auto, 2024 last batch model. CNG powered with sturdy body and large enclosed cargo carrier. Only 31,000 km driven — excellent condition.",
      hi: "आतुल थ्री व्हीलर कार्गो ऑटो, 2024 लास्ट बैच मॉडल। सीएनजी चालित, मजबूत बॉडी और बड़ा बंद कार्गो कैरियर। सिर्फ 31,000 किमी — बेहतरीन स्थिति।"
    },
    features: {
      en: ["CNG Powered Cargo Auto", "2024 Last Batch Model", "Large Enclosed Cargo Body", "31,000 km Only"],
      hi: ["सीएनजी चालित कार्गो ऑटो", "2024 लास्ट बैच मॉडल", "बड़ी बंद कार्गो बॉडी", "सिर्फ 31,000 किमी"]
    },
     image: "atul1.jpeg",
    images: [
      "atul2.jpeg",
      "atul3.jpeg",
      "atul4.jpeg",
      "atul5.jpeg",
      "atul6.jpeg",
      "atul7.jpeg",
      "atul8.jpeg",
      "atul9.jpeg",
    
    ],
    status: "available"
  },
 
  {
    id: "v17",
    category: "bike",
    make: "Yamaha",
    model: "R15M Version 4",
    year: 2023,
    price: 135000,
    mileage: 15000,
    fuelType: "Petrol (पेट्रोल)",
    transmission: "6-Speed Manual (6-स्पीड मैनुअल)",
    engine: "155cc VVA Liquid Cooled",
    description: {
      en: "Yamaha R15M Version 4, the ultimate sports bike in excellent condition. 2023 model with only 15,000 km run. Fully adjustable USD forks, quick-shifter and aggressive racing design.",
      hi: "यामाहा R15M वर्जन 4, बेहतरीन स्थिति में अल्टीमेट स्पोर्ट्स बाइक। 2023 मॉडल, सिर्फ 15,000 किमी चली। फुली एडजस्टेबल USD फोर्क्स, क्विक-शिफ्टर और आक्रामक रेसिंग डिज़ाइन।"
    },
    features: {
      en: ["Fully Adjustable USD Forks", "Quick Shifter", "Traction Control", "Dual Channel ABS"],
      hi: ["फुली एडजस्टेबल USD फोर्क्स", "क्विक शिफ्टर", "ट्रैक्शन कंट्रोल", "डुअल चैनल ABS"]
    },
    image: "yamaharc1.jpeg",
    images: [
       "yamaharc1.jpeg",
        "yamaharc2.jpeg",
         "yamaharc4.jpeg",
        "yamaharc5jpeg", 
       
        "yamaharc6.jpeg", 
        "yamaharc7.jpeg",
    ],
    status: "available"
  },
  {
    id: "v18",
    category: "mini-truck",
    make: "Ashok Leyland",
    model: "Dost CNG",
    year: 2022,
    price: 420000,
    mileage: 50000,
    fuelType: "CNG Only (सीएनजी)",
    transmission: "Manual (मैनुअल)",
    engine: "1.5L iGen4 CNG",
    description: {
      en: "Ashok Leyland Dost CNG-only variant. 2022 model, 50,000 km driven. Fuel-efficient commercial mini truck ideal for regular city logistics and goods delivery at low running cost.",
      hi: "अशोक लेलैंड दोस्त CNG-ओनली वेरिएंट। 2022 मॉडल, 50,000 किमी चला। ईंधन किफायती कमर्शियल मिनी ट्रक, शहरी लॉजिस्टिक्स और माल डिलीवरी के लिए बेहतरीन।"
    },
    features: {
      en: ["CNG Only Variant", "2022 Model", "Commercial Grade Chassis", "Low Running Cost"],
      hi: ["CNG ओनली वेरिएंट", "2022 मॉडल", "कमर्शियल ग्रेड चेसिस", "कम चलाने का खर्च"]
    },
    image: "ashokcng1.jpeg",
    images: [
      "ashokcng1.jpeg",
      "ashokcng2.jpeg",
      "ashokcng3.jpeg",
      "ashokcng4.jpeg",
      "ashokcng5.jpeg",
      "ashokcng6.jpeg",
      "ashokcng7.jpeg",
      "ashokcng8.jpeg",
      "ashokcng9.jpeg",
    
    ],
    status: "available"
  },
  {
    id: "v19",
    category: "mini-truck",
    make: "Maruti Suzuki",
    model: "Super Carry",
    year: 2022,
    price: 400000,
    mileage: 38000,
    fuelType: "Petrol + CNG (पेट्रोल + सीएनजी)",
    transmission: "Manual (मैनुअल)",
    engine: "796cc BS6 CNG Engine",
    description: {
      en: "Maruti Suzuki Super Carry in next-to-new condition. Petrol+CNG dual fuel with only 32,000 km run. Lightweight, economical, and best city mileage for daily delivery work.",
      hi: "मारुति सुज़ुकी सुपर कैरी, लगभग नई जैसी हालत में। पेट्रोल+CNG दोहरा ईंधन, सिर्फ 32,000 किमी चली। हल्का, किफायती और रोज़ाना डिलीवरी के लिए बेहतरीन माइलेज।"
    },
    features: {
      en: ["Next to New Condition", "Petrol + CNG Dual Fuel", "32,000 km Only", "Best City Mileage"],
      hi: ["लगभग नई जैसी हालत", "पेट्रोल + CNG दोहरा ईंधन", "सिर्फ 32,000 किमी", "बेहतरीन शहरी माइलेज"]
    },
    image: "supercarry1.jpeg",
    images: [
      "supercarry2.jpeg",
      "supercarry3.jpeg",
      "supercarry4.jpeg",
       "supercarry5.jpeg",
      "supercarry6.jpeg",
      "supercarry7.jpeg",
       "supercarry8.jpeg",
      "supercarry9.jpeg",
      "supercarry10.jpeg",
    ],
    status: "available"
  },
  
  {
    id: "v21",
    category: "mini-truck",
    make: "Tata",
    model: "Ace Gold",
    year: 2023,
    price: 385000,
    mileage: 49000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "702cc DI Engine",
    description: {
      en: "Tata Ace Gold 2023 diesel, first owner in excellent condition. Only 49,000 km run. India's most trusted small commercial vehicle for last-mile delivery and city logistics.",
      hi: "टाटा एस गोल्ड 2023 डीजल, पहला मालिक, बेहतरीन स्थिति। सिर्फ 49,000 किमी चला। लास्ट-माइल डिलीवरी और शहरी लॉजिस्टिक्स के लिए भारत का सबसे भरोसेमंद छोटा ट्रक।"
    },
    features: {
      en: ["Excellent Condition", "First Owner 2023", "49,000 km Only", "Proven Commercial Workhorse"],
      hi: ["बेहतरीन स्थिति", "2023 का पहला मालिक", "सिर्फ 49,000 किमी", "विश्वसनीय कमर्शियल वाहन"]
    },
    image: "tataA1.jpeg",
    images: [
      "tataA2.jpeg",
      "tataA3.jpeg",
      "tataA4.jpeg",
     
      "tataA5.jpeg",
      "tataA6.jpeg",
      "tataA7.jpeg",
      "tataA8.jpeg",
      "tataA9.jpeg",
      "tataA10.jpeg",
      "tataA11.jpeg",
    ],
    status: "available"
  },
  {
    id: "v22",
    category: "mini-truck",
    make: "Tata",
    model: "Ace Gold",
    year: 2022,
    price: 360000,
    mileage: 52000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "702cc DI Engine",
    description: {
      en: "Tata Ace Gold 2022 diesel, first owner in excellent condition. 60,000 km driven with original paint and strong body. Reliable commercial vehicle for daily goods transport.",
      hi: "टाटा एस गोल्ड 2022 डीजल, पहला मालिक, बेहतरीन स्थिति। 60,000 किमी चला, ओरिजिनल पेंट और मजबूत बॉडी। रोज़ाना माल ढुलाई के लिए भरोसेमंद वाहन।"
    },
    features: {
      en: ["Excellent Condition", "First Owner 2022", "Original Paint & Body", "Strong Cargo Frame"],
      hi: ["बेहतरीन स्थिति", "2022 का पहला मालिक", "ओरिजिनल पेंट और बॉडी", "मजबूत कार्गो फ्रेम"]
    },
    image: "goldtata1.jpeg",
    images: [
       "goldtata1.jpeg",
        "goldtata2.jpeg",
         "goldtata3.jpeg",
          "goldtata4.jpeg",
           "goldtata5.jpeg",
            "goldtata6.jpeg",
             "goldtata7.jpeg",
              "goldtata8.jpeg",
          "goldtata9.jpeg",
          "goldtata10.jpeg",
         
    ],
    status: "available"
  },
 
  {
    id: "v24",
    category: "mini-truck",
    make: "Mahindra",
    model: "Bolero Pickup City 3000 VXi",
    year: 2023,
    price: 700000,
    mileage: 58000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "2523cc mCR100 Diesel",
    description: {
      en: "Mahindra Bolero Pickup City 3000 VXi, 2023 model. Premium pickup with high ground clearance and powerful mCR diesel engine. 58,000 km driven, ideal for city and tough terrain.",
      hi: "महिंद्रा बोलेरो पिकअप सिटी 3000 VXi, 2023 मॉडल। प्रीमियम पिकअप, उच्च ग्राउंड क्लीयरेंस और शक्तिशाली mCR डीजल इंजन। 58,000 किमी चला, शहर और कठिन रास्तों के लिए आदर्श।"
    },
    features: {
      en: ["High Ground Clearance", "mCR100 Diesel Engine", "VXi Top Variant", "Heavy Payload Capacity"],
      hi: ["उच्च ग्राउंड क्लीयरेंस", "mCR100 डीजल इंजन", "VXi टॉप वेरिएंट", "भारी पेलोड क्षमता"]
    },
    image: "max1.jpeg",
    images: [
      "max1.jpeg",
      "max2.jpeg",
      "max3.jpeg",
      "max4.jpeg",
      "max5.jpeg"
    ],
    status: "available"
  },
  {
    id: "v25",
    category: "bike",
    make: "KTM",
    model: "KTM RC 200",
    year: 2023,
    price: 130000,
    mileage: 16000,
    fuelType: "Petrol (पेट्रोल)",
    transmission: "6-Speed Manual (6-स्पीड मैनुअल)",
    engine: "199.5cc Single Cylinder LC",
    description: {
      en: "KTM RC 200, the race-track inspired street supersport. 2023 model with only 16,000 km run. Aggressive orange livery, WP suspension and high-performance braking for thrill seekers.",
      hi: "KTM RC 200, रेस-ट्रैक से प्रेरित स्ट्रीट सुपरस्पोर्ट। 2023 मॉडल, सिर्फ 16,000 किमी चली। आक्रामक ऑरेंज लिवरी, WP सस्पेंशन और हाई-परफॉर्मेंस ब्रेकिंग।"
    },
    features: {
      en: ["WP Apex Suspension", "Dual Channel ABS", "Slipper Clutch", "Race-Inspired Design"],
      hi: ["WP Apex सस्पेंशन", "डुअल चैनल ABS", "स्लिपर क्लच", "रेस-इंस्पायर्ड डिज़ाइन"]
    },
    image: "Ktm1.jpeg",
    images: [
      "Ktm1.jpeg",
      "Ktm2.jpeg",
      "Ktm3.jpeg",
      "Ktm4.jpeg",
      "Ktm5.jpeg",
      "Ktm6.jpeg",
      "Ktm7.jpeg",
    ],
    status: "available"
  },
  {
    id: "v26",
    category: "car",
    make: "Mahindra",
    model: "Scorpio S11 Classic",
    year: 2022,
    price: 1250000,
    mileage: 70000,
    fuelType: "Diesel (डीजल)",
    transmission: "Manual (मैनुअल)",
    engine: "2.2L mHawk Diesel",
    description: {
      en: "Mahindra Scorpio 2022, originally S3 upgraded to full S11 Classic spec. First owner, excellent condition with 70,000 km. Fully loaded SUV with all top features — commanding road presence at a great price.",
      hi: "महिंद्रा स्कॉर्पियो 2022, S3 से पूरी S11 क्लासिक स्पेक में अपग्रेड। पहला मालिक, बेहतरीन स्थिति, 70,000 किमी चली। पूरी तरह लोडेड SUV — शानदार रोड प्रेजेंस, बेहतरीन कीमत पर।"
    },
    features: {
      en: ["S11 Classic Full Conversion", "7-Seater SUV", "First Owner 2022", "Excellent Condition"],
      hi: ["S11 क्लासिक फुल कन्वर्जन", "7-सीटर SUV", "2022 का पहला मालिक", "बेहतरीन स्थिति"]
    },
    image: "scr1.jpeg",
    images: [
      "scr1.jpeg",
      "scr2.jpeg",
      "scr3.jpeg",
      "scr4.jpeg",
      "scr5.jpeg",
      "scr6.jpeg",
      "scr7.jpeg",
      "scr8.jpeg",
      "scr9.jpeg",
      "scr10.jpeg",
      "scr11.jpeg",
      "scr12.jpeg",
      
    ],
    status: "available"
  },
  {
    id: "v27",
    category: "car",
    make: "Maruti Suzuki",
    model: "Dzire Tour",
    year: 2023,
    price: 550000,
    mileage: 0,
    fuelType: "Petrol + CNG (पेट्रोल + सीएनजी)",
    transmission: "Manual (मैनुअल)",
    engine: "1.2L K-Series Dual Jet",
    description: {
      en: "Maruti Suzuki Dzire Tour 2023, first owner. Dual fuel Petrol+CNG for excellent city economy. Ideal for daily commute and cab use, well maintained in pristine condition.",
      hi: "मारुति सुज़ुकी ड्ज़ायर टूर 2023, पहला मालिक। पेट्रोल+सीएनजी दोनों ईंधन, शहरी उपयोग के लिए बेहतरीन। रोज़ाना यात्रा और कैब के लिए आदर्श, बेहतरीन स्थिति में।"
    },
    features: {
      en: ["Petrol + CNG Dual Fuel", "First Owner 2023", "Power Steering", "Central Locking & Power Windows"],
      hi: ["पेट्रोल + सीएनजी दोहरा ईंधन", "2023 का पहला मालिक", "पावर स्टीयरिंग", "सेंट्रल लॉकिंग और पावर विंडो"]
    },
    image: "swift1.jpeg",
    images: [
       "swift2.jpeg",
        "swift3.jpeg",
         "swift4.jpeg",
          "swift5.jpeg",
           "swift6.jpeg",
          
    ],
    status: "available"
  },
  {
    id: "v28",
    category: "auto",
    make: "Bajaj",
    model: "RE EV",
    year: 2024,
    price: 185000,
    mileage: 0,
    fuelType: "Electric (इलेक्ट्रिक)",
    transmission: "Automatic (ऑटोमैटिक)",
    engine: "Electric Motor",
    description: {
      en: "Bajaj Electric RE auto rickshaw, 2024 model, first owner. Zero emission and smooth automatic drive. Very low running cost per km — ideal for city passenger transport.",
      hi: "बजाज इलेक्ट्रिक RE ऑटो रिक्शा, 2024 मॉडल, पहला मालिक। शून्य प्रदूषण और स्मूद ऑटोमैटिक ड्राइव। बेहद कम प्रति किमी खर्च — शहरी यात्री परिवहन के लिए आदर्श।"
    },
    features: {
      en: ["Electric Zero Emission", "2024 Model First Owner", "Smooth Auto Drive", "Very Low Running Cost"],
      hi: ["इलेक्ट्रिक शून्य प्रदूषण", "2024 मॉडल पहला मालिक", "स्मूद ऑटो ड्राइव", "बेहद कम चलाने का खर्च"]
    },
    image: "mahindraA1.jpeg",
    images: [
      "mahindraA1.jpeg",
     "mahindraA2.jpeg",
     "mahindraA3.jpeg",
     "mahindraA4.jpeg",
     "mahindraA5.jpeg",
     "mahindraA6.jpeg",
  
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
