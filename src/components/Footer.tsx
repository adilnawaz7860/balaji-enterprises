import React from 'react';
import { 
  ShieldAlert, 
  Phone, 
  MapPin, 
  CalendarClock, 
  MessageCircle, 
  Heart, 
  ShieldCheck,
  Youtube,
  Facebook,
  Instagram,
  Send,
  ArrowUp
} from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface FooterProps {
  currentLanguage: Language;
  currentTheme: Theme;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ currentLanguage, currentTheme, activeTab, setActiveTab }: FooterProps) {
  const t = translations[currentLanguage];

  // Helper to trigger direct general WhatsApp
  const generalWhatsAppLink = () => {
    const rawNumber = "919999999999";
    const text = currentLanguage === 'en'
      ? "Hello Bharat Motors, I want to inquire about your verified pre-owned cars and auto rickshaws."
      : "नमस्ते भारत मोटर्स, मुझे आपकी पुरानी गाड़ियों और ऑटो रिक्शा के बारे में जानकारी चाहिए।";
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <footer className={`border-t transition-all pt-16 pb-12 ${
      currentTheme === 'dark' 
        ? 'bg-slate-950 border-slate-900 text-slate-400' 
        : 'bg-slate-50 border-slate-200 text-slate-700 shadow-inner'
    }`} id="app-advanced-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid for 25-50 Age Users (Highly Scannable Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/10 dark:border-slate-800/60">
          
          {/* Column 1: Brand Info & Quality Promise (Col 4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-2">
              <span className="font-display font-black text-xl italic tracking-tight uppercase text-amber-500 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-amber-500 fill-amber-500/10" />
                <span>{t.brandName}</span>
              </span>
              <p className={`text-sm md:text-base font-black ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                {t.tagline}
              </p>
            </div>
            
            <p className="text-xs leading-relaxed max-w-sm font-medium">
              {currentLanguage === 'en'
                ? "Established in 2012 by Lead Mechanic Mr. Rajesh Kumar Verma. Hand-checked, sound-audited pre-owned Maruti cars, Bajaj auto rickshaws, and mini trucks for dependable livelihood."
                : "मुख्य मैकेनिक श्री राजेश कुमार वर्मा द्वारा 2012 में स्थापित। आपकी दमदार कमाई और परिवार के सुरक्षित सफर के लिए जांची और परखी गई विश्वसनीय गाड़ियाँ।"}
            </p>
            
            {/* Social Media Links Block */}
            <div className="space-y-2 pt-2">
              <h5 className={`text-[10px] font-extrabold uppercase tracking-widest ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {currentLanguage === 'en' ? "Follow Our Live Showroom Videos" : "सच्ची वीडियो और अपडेट्स देखें"}
              </h5>
              <div className="flex items-center gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-red-650/10 text-red-500 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-sm"
                  title="Watch Commercial Vehicle Walkarounds on YouTube"
                >
                  <Youtube className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-blue-650/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-sm"
                  title="Join our Transporter Community Group on Facebook"
                >
                  <Facebook className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-pink-650/10 text-pink-500 hover:bg-pink-600 hover:text-white transition-all cursor-pointer shadow-sm"
                  title="See Daily Arrivals on Instagram"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a
                  href={generalWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-650/10 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm"
                  title="Direct Chat on WhatsApp"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
            
            {/* Quick trust strip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <span>★ 120-Point Mechanical Sign-Off</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-xs font-extrabold uppercase tracking-widest ${currentTheme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              {currentLanguage === 'en' ? "Useful Pages" : "महत्वपूर्ण पेज"}
            </h4>
            <ul className="space-y-3 text-sm font-semibold">
              {[
                { id: 'home', label: t.navHome },
                { id: 'inventory', label: t.navInventory },
                { id: 'financing', label: t.navFinancing },
                { id: 'about', label: t.navAbout },
                { id: 'contact', label: t.navContact }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`transition-colors flex items-center gap-1.5 cursor-pointer uppercase text-xs tracking-wider font-extrabold ${
                      activeTab === link.id
                        ? 'text-amber-505 dark:text-amber-500'
                        : 'text-slate-500 dark:text-slate-400 hover:text-amber-550'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${activeTab === link.id ? 'bg-amber-500' : 'bg-transparent'}`} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Location Showroom Details (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className={`text-xs font-extrabold uppercase tracking-widest ${currentTheme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              {currentLanguage === 'en' ? "Dealership Plot & Yard" : "डीलरशिप और हमारा मुख्य यार्ड"}
            </h4>
            
            <div className="space-y-4 text-xs md:text-sm font-medium">
              {/* Address block */}
              <div className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className={`font-black uppercase tracking-tight text-[11px] ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                    {t.contactAddressLabel}
                  </p>
                  <p className="mt-1 leading-relaxed text-slate-500 dark:text-slate-400">
                    {t.contactAddressValue}
                  </p>
                </div>
              </div>

              {/* Timing block */}
              <div className="flex gap-3 items-start">
                <CalendarClock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className={`font-black uppercase tracking-tight text-[11px] ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                    {t.contactHoursLabel}
                  </p>
                  <p className="mt-1 leading-relaxed text-slate-500 dark:text-slate-400">
                    {t.contactHoursValue}
                  </p>
                </div>
              </div>

              {/* Call support */}
              <div className="flex gap-3 items-start">
                <Phone className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className={`font-black uppercase tracking-tight text-[11px] ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                    {t.contactPhoneLabel}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <span className="font-extrabold text-slate-600 dark:text-slate-350">+91 99999 99999</span>
                    <a
                      href={generalWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest rounded-md hover:bg-amber-600 transition-all cursor-pointer shadow"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{currentLanguage === 'en' ? "WhatsApp Rajesh" : "व्हाट्सएप करें"}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Sub bottom metadata bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs border-t border-slate-800/10 dark:border-slate-850">
          
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-amber-500 fill-amber-500/10 shrink-0" />
            <p className="font-bold tracking-tight">
              {currentLanguage === 'en'
                ? "Serving hardworking operators & middle-class Indian families since 2012."
                : "2012 से लगातार मेहनती भाइयों और मध्यमवर्गीय परिवारों की सेवा में समर्पित।"}
            </p>
          </div>

          {/* Smooth Back to Top Click Trigger */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-[11px] tracking-wider rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            title="Go to Top"
            id="back-to-top-footer-btn"
          >
            <ArrowUp className="h-3.5 w-3.5 stroke-[2.5px] animate-bounce" />
            <span>{currentLanguage === 'en' ? 'Back to Top' : 'वापस ऊपर जाएं'}</span>
          </button>

          <div className="text-center md:text-right space-y-1 text-slate-500">
            <p className="font-medium font-mono">{t.footerCopy}</p>
            <p className="text-[10px] opacity-75">
              {currentLanguage === 'en' 
                ? "All specifications, prices, and loan estimates are for illustrative pre-owned presentation purposes."
                : "सभी विवरण, कीमतें और ऋण अनुमान केवल पुरानी गाड़ियों के प्रस्तुति उद्देश्यों के लिए हैं।"}
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
