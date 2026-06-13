import React from 'react';
import { motion } from 'motion/react';
import { Wrench, ShieldCheck, HeartHandshake, History, Award } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface AboutProps {
  currentLanguage: Language;
  currentTheme: Theme;
}

export default function About({ currentLanguage, currentTheme }: AboutProps) {
  const t = translations[currentLanguage];

  const trustCards = [
    {
      title: t.aboutTrust1Title,
      desc: t.aboutTrust1Desc,
      icon: <Wrench className="h-6 w-6 text-amber-500" />,
    },
    {
      title: t.aboutTrust2Title,
      desc: t.aboutTrust2Desc,
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    },
    {
      title: t.aboutTrust3Title,
      desc: t.aboutTrust3Desc,
      icon: <HeartHandshake className="h-6 w-6 text-amber-500" />,
    },
  ];

  return (
    <div className={`py-12 md:py-20 transition-colors duration-300 ${
      currentTheme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About intro headers */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            {t.aboutTitle}
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Owner Profile Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Layout Left: Photo frame */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-850/50 bg-slate-950 p-4"
              id="about-owner-image-container"
            >
              <img
                src="https://picsum.photos/seed/balajimotor/500/600"
                alt="Balaji Motors - Owner"
                className="w-full aspect-[4/5] object-cover rounded-2xl opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-slate-900/95 dark:bg-slate-950/95 p-5 rounded-2xl border border-slate-800 backdrop-blur-md">
                <span className="text-xs uppercase tracking-wider font-extrabold text-amber-500 block">
                  {t.aboutOwnerRole}
                </span>
                <span className="text-xl font-display font-extrabold block text-white mt-1">
                  {t.aboutOwnerName}
                </span>
                <span className="text-[10px] text-slate-450 block mt-1.5 font-mono">
                  {currentLanguage === 'en' ? 'Direct Dealership Phone: +91 95653 29999' : 'सीधा मोबाइल संपर्क: +91 95653 29999'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Layout Right: Backstory paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-2xl card-glass">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-2 flex items-center gap-1.5">
                <History className="h-4 w-4" />
                <span>{currentLanguage === 'en' ? "Our Heritage & Story" : "हमारी विरासत और कहानी"}</span>
              </span>
              <p className={`text-base leading-relaxed ${currentTheme === 'dark' ? 'text-slate-250' : 'text-slate-800'}`}>
                {t.aboutStoryParagraph1}
              </p>
            </div>

            <div className="p-6 rounded-2xl card-glass">
              <p className={`text-base leading-relaxed ${currentTheme === 'dark' ? 'text-slate-250' : 'text-slate-800'}`}>
                {t.aboutStoryParagraph2}
              </p>
            </div>

            {/* Certifications row badges */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">{currentLanguage === 'en' ? 'Verified Dealer' : 'सत्यापित डीलर'}</span>
                  <span className="text-sm font-bold block">{currentLanguage === 'en' ? '14+ Years Active' : '14+ वर्षों का गौरव'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">{currentLanguage === 'en' ? 'Warranty Checked' : 'गारंटीड गाड़ियां'}</span>
                  <span className="text-sm font-bold block">{currentLanguage === 'en' ? '120-Point Checked' : '120-पॉइंट जांची गई'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Core Pillars of Trust */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-display font-extrabold text-2xl">
              {currentLanguage === 'en' ? "Why Smart Operators Trust Us" : "वाहन चालक हम पर विश्वास क्यों करते हैं"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustCards.map((card, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl text-center relative card-glass"
                id={`trust-card-${idx}`}
              >
                <div className="p-3 bg-amber-500/10 rounded-xl inline-block mb-3">
                  {card.icon}
                </div>
                <h4 className="font-display font-bold text-base mb-2">{card.title}</h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
