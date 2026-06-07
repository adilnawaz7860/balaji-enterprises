import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedVehicles from './components/FeaturedVehicles';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Inventory from './components/Inventory';
import Financing from './components/Financing';
import About from './components/About';
import Contact from './components/Contact';
import { Language, Theme } from './types';
import { translations } from './translations';

export default function App() {
  // Main app states, initialized as per user requests:
  // - default language: English ('en')
  // - default theme: Dark ('dark')
  // - default tab/page: Home ('home')
  const [currentLanguage, setLanguage] = useState<Language>('en');
  const [currentTheme, setTheme] = useState<Theme>('dark');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const t = translations[currentLanguage];

  // Side-effect to set background colors cleanly on body
  useEffect(() => {
    if (currentTheme === 'dark') {
      document.body.style.backgroundColor = '#020617'; // slate-950
    } else {
      document.body.style.backgroundColor = '#f8fafc'; // slate-50
    }
  }, [currentTheme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme} ${
      currentTheme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`} id="app-root-container">
      
      {/* Dynamic Header / Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Sections Routing using AnimatePresence Layouts */}
      <main className="flex-grow min-h-[calc(100vh-130px)]">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {/* Home comprises of our rich Hero, featuring highlighted inventory stats, and guides */}
              <Hero
                currentLanguage={currentLanguage}
                currentTheme={currentTheme}
                setActiveTab={setActiveTab}
              />
              <FeaturedVehicles
                currentLanguage={currentLanguage}
                currentTheme={currentTheme}
                setActiveTab={setActiveTab}
              />
              <Reviews
                currentLanguage={currentLanguage}
                currentTheme={currentTheme}
              />
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Inventory
                currentLanguage={currentLanguage}
                currentTheme={currentTheme}
              />
            </motion.div>
          )}

          {activeTab === 'financing' && (
            <motion.div
              key="financing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Financing
                currentLanguage={currentLanguage}
                currentTheme={currentTheme}
              />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <About
                currentLanguage={currentLanguage}
                currentTheme={currentTheme}
              />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Contact
                currentLanguage={currentLanguage}
                currentTheme={currentTheme}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Structured Footer */}
      <Footer
        currentLanguage={currentLanguage}
        currentTheme={currentTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            onClick={scrollToTop}
            title={currentLanguage === 'en' ? 'Back to Top' : 'ऊपर जाएं'}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/30 border border-amber-400 cursor-pointer transition-all hover:scale-110 flex items-center justify-center"
            id="scroll-to-top-btn"
          >
            <ArrowUp className="h-5 w-5 stroke-[2.5px]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
