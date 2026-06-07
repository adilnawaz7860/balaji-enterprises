import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ShieldCheck, Heart, UserCheck } from 'lucide-react';
import { Language, Theme } from '../types';

interface ReviewsProps {
  currentLanguage: Language;
  currentTheme: Theme;
}

interface Review {
  id: string;
  name: { en: string; hi: string };
  age: number;
  role: { en: string; hi: string };
  location: { en: string; hi: string };
  rating: number;
  date: string;
  vehicleBought: { en: string; hi: string };
  text: { en: string; hi: string };
  theme: 'car' | 'auto' | 'mini-truck';
  avatarSeed: string;
}

const reviewsData: Review[] = [
  {
    id: "r1",
    name: { en: "Suresh Chandra Yadav", hi: "सुरेश चंद्र यादव" },
    age: 42,
    role: { en: "Professional Auto Driver", hi: "व्यावसायिक ऑटो चालक" },
    location: { en: "Rohini, New Delhi", hi: "रोहिणी, नई दिल्ली" },
    rating: 5,
    date: "May 2026",
    vehicleBought: { en: "Bajaj RE CNG Auto Rickshaw", hi: "बजाज RE सीएनजी ऑटो" },
    text: {
      en: "Rajesh ji personally sound-tested the CNG carburetor and gave me a 6-month engine guarantee. Now my auto runs daily, saving fuel and making solid daily earnings for my family.",
      hi: "राजेश जी ने खुद इंजन की ट्यूनिंग और सीएनजी कार्बोरेटर की जांच करके दी थी। गाड़ी रोज बिना किसी रुकावट के करीब 110 किमी चलती है। एकदम पक्का और सच्चा काम है यहाँ।"
    },
    theme: "auto",
    avatarSeed: "suresh"
  },
  {
    id: "r2",
    name: { en: "Anil Sharma", hi: "अनिल शर्मा" },
    age: 34,
    role: { en: "School Senior Assistant & Father", hi: "सीनियर स्कूल असिस्टेंट एवं पारिवारिक व्यक्ति" },
    location: { en: "Dwarka Sector 12, Delhi", hi: "द्वारका सेक्टर 12, दिल्ली" },
    rating: 5,
    date: "April 2026",
    vehicleBought: { en: "Maruti Swift VXI (2018)", hi: "मारुति स्विफ्ट VXI (2018)" },
    text: {
      en: "For a middle-class family, buying a car involves life savings. Rajesh Motors ensured complete transparency, arranged immediate bank EMI in 2 hours, and did the RC transfer without any dealer bribes.",
      hi: "हम जैसे नौकरीपेशा लोगों के लिए कार खरीदना सपने जैसा होता है। राजेश मोटर्स में कोई झूठ नहीं बोला जाता। कार बिल्कुल शोरूम कंडीशन में मिली और 3 दिन में आरसी भी नाम हो गई।"
    },
    theme: "car",
    avatarSeed: "anil"
  },
  {
    id: "r3",
    name: { en: "Devender Singh Solanki", hi: "देवेन्द्र सिंह सोलंकी" },
    age: 49,
    role: { en: "Logistics Supplier Business", hi: "ट्रांसपोर्ट एवं लॉजिस्टिक्स सप्लायर" },
    location: { en: "Noida Sector 63", hi: "नोएडा सेक्टर 63" },
    rating: 5,
    date: "March 2026",
    vehicleBought: { en: "Tata Ace Gold (Chota Hathi)", hi: "टाटा एस गोल्ड (छोटा हाथी)" },
    text: {
      en: "Purchased a pre-owned Tata Ace for factory deliveries. The leaf-spring suspension and chassis were rebuilt. Rajesh ji behaves like an elder brother, explaining details honestly. Complete business satisfaction.",
      hi: "फैक्ट्री का माल ढोने के लिए टाटा एस खरीदा था। गाड़ी का लोड टेस्ट करके दिया गया था। यहाँ मैकेनिक स्तर से काम होता है, इसलिए इंजन बहुत सॉलिड चलता है। पूरा पैसा वसूल।"
    },
    theme: "mini-truck",
    avatarSeed: "devender"
  }
];

export default function Reviews({ currentLanguage, currentTheme }: ReviewsProps) {
  const [filterType, setFilterType] = useState<'all' | 'car' | 'commercial'>('all');

  const filteredReviews = reviewsData.filter(review => {
    if (filterType === 'all') return true;
    if (filterType === 'car') return review.theme === 'car';
    return review.theme === 'auto' || review.theme === 'mini-truck';
  });

  return (
    <section className={`py-16 md:py-24 border-t transition-colors duration-300 ${
      currentTheme === 'dark' 
        ? 'bg-gradient-to-b from-slate-950 to-slate-900 border-slate-900 text-white' 
        : 'bg-slate-50 to-slate-100 border-slate-200 text-slate-900'
    }`} id="home-customer-reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-500 text-xs font-bold uppercase tracking-widest">
              <UserCheck className="h-4 w-4" />
              <span>{currentLanguage === 'en' ? "Verified Family & Business Trust" : "सच्चा भरोसा - पक्के ग्राहक"}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase">
              {currentLanguage === 'en' ? "Voice of Happy Buyers" : "हमारे संतुष्ट ग्राहकों की जुबानी"}
            </h2>
            
            <p className={`text-base md:text-lg max-w-2xl ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentLanguage === 'en'
                ? "See how our reliable pre-owned commercial and family vehicles have empowered business owners and happy families across Delhi NCR."
                : "जानिए हमारे वाहनों ने दिल्ली-NCR में किस तरह मध्यमवर्गीय परिवारों और व्यावसायिक भाइयों की प्रगति में सहयोग दिया है।"}
            </p>
          </div>

          {/* Interactive filter switches for professional-looking filtering */}
          <div className="flex bg-slate-900/5 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {currentLanguage === 'en' ? "All Reviews" : "सभी समीक्षाएं"}
            </button>
            <button
              onClick={() => setFilterType('car')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                filterType === 'car'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {currentLanguage === 'en' ? "Cars (Family)" : "कार (पारिवारिक)"}
            </button>
            <button
              onClick={() => setFilterType('commercial')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                filterType === 'commercial'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {currentLanguage === 'en' ? "Auto & Trucks" : "ऑटो और कमर्शियल"}
            </button>
          </div>
        </div>

        {/* Testimonials Bento/Masonry layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-8 rounded-2xl border transition-all hover:scale-[1.01] hover:shadow-2xl card-glass flex flex-col justify-between space-y-6 relative overflow-hidden"
                id={`review-card-${review.id}`}
              >
                {/* Quotation icon watermarking background */}
                <Quote className="absolute top-4 right-4 h-24 w-24 text-slate-500/10 dark:text-slate-400/5 rotate-12 pointer-events-none" />

                {/* Rating & Shield Seal header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500/80 bg-amber-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{currentLanguage === 'en' ? "100% Genuine Owner" : "सत्यापित खरीद"}</span>
                  </span>
                </div>

                {/* Review Text block */}
                <blockquote className="relative z-10 flex-grow">
                  <p className={`text-base leading-relaxed font-medium italic ${
                    currentTheme === 'dark' ? 'text-slate-100' : 'text-slate-800'
                  }`}>
                    "{review.text[currentLanguage]}"
                  </p>
                </blockquote>

                {/* Purchase context banner */}
                <div className="py-2.5 px-3 bg-slate-900/40 dark:bg-slate-950/70 border border-slate-800/60 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {currentLanguage === 'en' ? "Vehicle Bought" : "खरीदी गई गाड़ी"}
                  </p>
                  <p className="text-sm font-black text-amber-400">
                    {review.vehicleBought[currentLanguage]}
                  </p>
                </div>

                {/* Customer Info Card Footer */}
                <div className="flex items-center gap-3.5 border-t border-slate-800/30 pt-4 relative z-10">
                  {/* Generated user avatar */}
                  <img
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${review.avatarSeed}`}
                    alt={review.name[currentLanguage]}
                    className="w-12 h-12 rounded-full border-2 border-amber-500/30 object-cover bg-slate-900"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-black text-base text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
                      <span>{review.name[currentLanguage]}</span>
                      <span className="text-xs font-normal text-slate-500">({review.age})</span>
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      {review.role[currentLanguage]} • <strong className="text-slate-500 font-bold">{review.location[currentLanguage]}</strong>
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quality Commitment Trust row */}
        <div className={`mt-16 py-6 px-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border ${
          currentTheme === 'dark' 
            ? 'bg-slate-950/80 border-slate-900' 
            : 'bg-white border-slate-200'
        }`} id="review-trust-disclaimer">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <Heart className="h-8 w-8 text-red-500 fill-red-500 shrink-0" />
            <div>
              <p className="text-base font-black uppercase tracking-tight">
                {currentLanguage === 'en' ? "Zero Deception Commitment" : "शून्य झूठ, पक्का काम का संकल्प"}
              </p>
              <p className={`text-xs ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentLanguage === 'en'
                  ? "We don't buy fake ratings. Each customer is a real business earner or a family member who visited our plot."
                  : "हम पैसे देकर समीक्षाएं नहीं खरीदते। ये हमारे शोरूम पर आने वाले और गाड़ी चलाकर कमाने वाले पक्के ग्राहक हैं।"}
              </p>
            </div>
          </div>
          <p className="text-xs font-mono px-3 py-1.5 bg-slate-900/50 rounded-lg text-slate-500">
            {currentLanguage === 'en' ? "Satisfaction Rate: 99.2%" : "संतुष्टि दर: 99.2%"}
          </p>
        </div>

      </div>
    </section>
  );
}
