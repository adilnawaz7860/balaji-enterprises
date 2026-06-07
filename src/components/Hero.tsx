import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, PhoneCall, Award, PiggyBank, Map, Image as ImageIcon, MapPin } from 'lucide-react';
import { translations } from '../translations';
import { Language, Theme } from '../types';

interface HeroProps {
  currentLanguage: Language;
  currentTheme: Theme;
  setActiveTab: (tab: string) => void;
}

export default function Hero({ currentLanguage, currentTheme, setActiveTab }: HeroProps) {
  const t = translations[currentLanguage];
  const [viewMode, setViewMode] = useState<'vehicles' | 'india_map'>('vehicles');

  return (
    <div className={`relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 transition-colors duration-300 ${
      currentTheme === 'dark' 
        ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white' 
        : 'bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900'
    }`}>
      {/* Decorative background ambient glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Interactive animated badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold uppercase tracking-wider"
              id="hero-badge"
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>{currentLanguage === 'en' ? 'Direct Dealership Integrity' : 'सीधी डीलरशिप - पूर्ण भरोसा'}</span>
            </motion.div>

            {/* Main Catchy Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center lg:text-left"
              id="hero-title"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase leading-tight font-sans">
                {currentLanguage === 'en' ? (
                  <>
                    OWN YOUR <span className="text-amber-500">LIVELIHOOD.</span> <br />
                    <span className="bold-stroke block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-400">BALAJI ENTERPRISES LUCKNOW.</span>
                  </>
                ) : (
                  <>
                    अपनी खुद की <span className="text-amber-500">कमाई गाड़ी।</span> <br />
                    <span className="bold-stroke block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-400">बालाजी एंटरप्राइजेज का सच्चा भरोसा।</span>
                  </>
                )}
              </h1>
            </motion.div>

            {/* Descriptive Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base md:text-lg max-w-2xl mx-auto lg:mx-0 border-l-4 border-amber-500 pl-4 leading-relaxed tracking-wide font-medium ${
                currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
              id="hero-subtitle"
            >
              {currentLanguage === 'en' 
                ? "No agent commission, no hidden broker charges. Directly buy pre-owned commercial auto rickshaws, loader trucks, and verified Maruti family cars certified by Balaji Enterprises. Fast paper transfer guaranteed."
                : "बिना किसी दलाल या कमीशन के सीधा सौदा! बालाजी एंटरप्राइजेज द्वारा जांची गई सेकंड-हैंड सीएनजी ऑटो, छोटा हाथी लोडर और प्रामाणिक फॅमिली कारें। आरसी ट्रांसफर की पूरी ज़िम्मेदारी हमारी।"}
            </motion.p>

            {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => setActiveTab('inventory')}
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg shadow-amber-500/20 transform hover:-translate-y-1 active:translate-y-0 text-center cursor-pointer"
                id="hero-explore-btn"
              >
                {t.heroExploreBtn}
              </button>
              <button
                onClick={() => setActiveTab('financing')}
                className={`w-full sm:w-auto px-8 py-4 font-bold text-base rounded-xl transition-all border transform hover:-translate-y-1 active:translate-y-0 text-center flex items-center justify-center gap-2 cursor-pointer ${
                  currentTheme === 'dark'
                    ? 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-white'
                    : 'border-slate-350 hover:border-slate-400 hover:bg-slate-100 text-slate-800'
                }`}
                id="hero-finance-btn"
              >
                <PiggyBank className="h-5 w-5 text-amber-500" />
                {t.heroFinanceBtn}
              </button>
              <a
                href="tel:+919565329999"
                className="w-full sm:w-auto px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-extrabold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1 cursor-pointer"
                id="hero-call-btn"
              >
                <PhoneCall className="h-5 w-5 fill-white text-green-600" />
                <span>{currentLanguage === 'en' ? 'Call Dealership' : 'बालाजी एंटरप्राइजेज को फोन करें'}</span>
              </a>
            </motion.div>

          </div>

          {/* Hero Visual side */}
          <div className="lg:col-span-15 xl:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-6 md:p-8 rounded-3xl card-glass shadow-2xl"
              id="hero-visual-card"
            >
              {/* Toggle Switch */}
              <div className="flex justify-end gap-2 mb-4">
                <button
                  onClick={() => setViewMode('vehicles')}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    viewMode === 'vehicles'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'bg-slate-800/30 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  id="tab-view-vehicles"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>{currentLanguage === 'en' ? 'Stock Vehicles' : 'गाड़ियां'}</span>
                </button>
                <button
                  onClick={() => setViewMode('india_map')}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    viewMode === 'india_map'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'bg-slate-800/30 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  id="tab-view-map"
                >
                  <Map className="h-3.5 w-3.5" />
                  <span>{currentLanguage === 'en' ? 'India Map' : 'भारत का नक्शा'}</span>
                </button>
              </div>

              {/* View Panel */}
              {viewMode === 'vehicles' ? (
                /* Image View */
                <motion.div
                  key="vehicles-view"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 mb-6 bg-slate-950"
                >
                  <img
                    src="https://picsum.photos/seed/motordealer/800/450"
                    alt="Balaji Enterprises vehicles"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    id="hero-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5 bg-slate-900/90 py-1 px-3 rounded-md">
                      <ShieldCheck className="h-4 w-4" />
                      {currentLanguage === 'en' ? 'Certified Balaji Quality Seal' : 'बालाजी क्वालिटी द्वारा प्रमाणित सील'}
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* India Map View */
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 mb-6 bg-slate-950 flex flex-col items-center justify-center p-4 text-center"
                >
                  {/* Decorative India Map SVG */}
                  <svg
                    viewBox="0 0 160 170"
                    className="w-32 h-32 text-amber-500/25 fill-none stroke-amber-500/30 stroke-[1.5px] transition-all relative"
                    id="india-vector-shape"
                  >
                    {/* Outline of India Map representation */}
                    <path
                      d="M 75 10 C 85 10, 88 15, 93 18 C 96 20, 102 18, 104 22 C 106 25, 112 25, 115 30 C 117 33, 116 38, 120 42 C 124 45, 131 43, 133 48 C 135 52, 131 56, 133 60 C 135 63, 142 66, 138 72 C 135 76, 128 73, 124 76 C 120 79, 118 84, 112 85 C 106 86, 104 81, 100 84 C 96 87, 85 105, 80 115 C 75 125, 78 135, 76 142 C 74 148, 70 155, 68 160 C 66 155, 63 148, 62 142 C 60 135, 55 125, 52 115 C 48 105, 36 90, 32 84 C 28 80, 18 78, 15 72 C 12 66, 20 60, 22 55 C 24 50, 31 46, 34 42 C 37 38, 42 34, 45 30 C 48 25, 55 22, 60 18 C 65 14, 70 10, 75 10 Z"
                      className="fill-amber-500/5 dark:fill-amber-500/5 stroke-amber-500/30"
                      strokeDasharray="2 2"
                    />
                    
                    {/* National Network Beams from Lucknow */}
                    <line x1="75" y1="65" x2="105" y2="40" className="stroke-slate-500/30 stroke-[1px] stroke-dash" strokeDasharray="3 3" />
                    <line x1="75" y1="65" x2="45" y2="55" className="stroke-slate-500/30 stroke-[1px]" strokeDasharray="3 3"/>
                    <line x1="75" y1="65" x2="68" y2="120" className="stroke-slate-500/30 stroke-[1px]" strokeDasharray="3 3"/>
                    
                    {/* Secondary city source pins */}
                    <circle cx="105" cy="40" r="1.5" className="fill-slate-500/60" />
                    <circle cx="45" cy="55" r="1.5" className="fill-slate-500/60" />
                    <circle cx="68" cy="120" r="1.5" className="fill-slate-500/60" />

                    {/* Lucknow head office Core Pulsing Pin */}
                    <g transform="translate(75, 65)">
                      <circle cx="0" cy="0" r="6" className="fill-amber-500/25 animate-ping" />
                      <circle cx="0" cy="0" r="3.5" className="fill-amber-500" />
                    </g>
                  </svg>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-left text-white bg-slate-900/90 p-2.5 rounded-xl border border-slate-700/80">
                    <div className="flex gap-2 items-center">
                      <MapPin className="h-4 w-4 text-amber-550 shrink-0 animate-bounce" />
                      <div>
                        <span className="block text-[11px] font-black uppercase text-amber-400">Head Yard: Lucknow</span>
                        <span className="block text-[9px] text-slate-350">Matiyari Chauraha, Chinhat</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-emerald-400 uppercase tracking-widest border border-emerald-400/30 px-1 py-0.5 rounded shrink-0">
                      ● Active HQ
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Trust badges row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950/50 dark:bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                  <p className="text-2xl font-bold text-amber-500">1,200+</p>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{t.heroStatHappyCustomers}</p>
                </div>
                <div className="p-3 bg-slate-950/50 dark:bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                  <p className="text-2xl font-bold text-amber-500">120-Point</p>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{currentLanguage === 'en' ? 'Pro Engine Check' : 'सघन इंजन जांच'}</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Feature Strips bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-24 border-t pt-10 ${
            currentTheme === 'dark' ? 'border-slate-800' : 'border-slate-200'
          }`}
          id="hero-footers"
        >
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">{currentLanguage === 'en' ? "6-Month Engine Guarantee" : "6 महीने की इंजन गारंटी"}</h3>
              <p className={`text-sm ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentLanguage === 'en' ? "Rest assured with complete engine & transmission support." : "बेफिक्र रहें, इंजन और गियरबॉक्स की पूरी गारंटी बालाजी एंटरप्राइजेज द्वारा।"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">{currentLanguage === 'en' ? "Hassle-Free RC Transfer" : "आसान आरसी (RC) ट्रांसफर"}</h3>
              <p className={`text-sm ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentLanguage === 'en' ? "No brokerage stress. Complete registration name change handled." : "कोई दलाल झंझट नहीं। रजिस्ट्रेशन और नाम ट्रांसफर का पूरा काम हम करेंगे।"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">{currentLanguage === 'en' ? "Open WhatsApp Support" : "आसान व्हाट्सएप संपर्क"}</h3>
              <p className={`text-sm ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentLanguage === 'en' ? "Direct continuous access to Balaji Enterprises team." : "बालाजी एंटरप्राइजेज से सीधी बातचीत और गाडी देखने का समय निर्धारित करें।"}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
