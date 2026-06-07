import React, { useState } from 'react';
import { Menu, X, Car, Sun, Moon, Languages } from 'lucide-react';
import { translations } from '../translations';
import { Language, Theme } from '../types';

interface NavbarProps {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  currentTheme: Theme;
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({
  currentLanguage,
  setLanguage,
  currentTheme,
  toggleTheme,
  activeTab,
  setActiveTab,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLanguage];

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'inventory', label: t.navInventory },
    { id: 'financing', label: t.navFinancing },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ];

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      currentTheme === 'dark' 
        ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-md' 
        : 'bg-white/90 border-slate-200 text-slate-900 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="p-2 bg-amber-500 rounded-lg text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Car className="h-6 w-6" id="nav-logo" />
            </div>
            <div>
              <span className="font-display font-bold text-lg md:text-xl tracking-tight block">
                {t.brandName}
              </span>
              <span className="text-[10px] md:text-xs text-amber-500 font-medium block leading-none">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/10'
                    : currentTheme === 'dark'
                      ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Settings (Theme & Lang) */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                  currentLanguage === 'en'
                    ? 'bg-white dark:bg-slate-900 text-amber-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="lang-toggle-en"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                  currentLanguage === 'hi'
                    ? 'bg-white dark:bg-slate-900 text-amber-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="lang-toggle-hi"
              >
                हिन्दी
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg border transition-all ${
                currentTheme === 'dark'
                  ? 'border-slate-800 bg-slate-800 text-amber-400 hover:bg-slate-700 hover:text-amber-350'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`}
              title={currentTheme === 'dark' ? t.themeLight : t.themeDark}
              id="theme-toggle-desktop"
            >
              {currentTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu & Quick Settings Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Quick Lang Switch */}
            <button
              onClick={() => setLanguage(currentLanguage === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
              title="Change Language"
              id="mobile-lang-button"
            >
              <Languages className="h-4 w-4" />
              <span className="text-xs font-bold font-mono">
                {currentLanguage === 'en' ? 'HI' : 'EN'}
              </span>
            </button>

            {/* Quick Theme Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              id="mobile-theme-button"
            >
              {currentTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Menu icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg border transition-all ${
                currentTheme === 'dark'
                  ? 'border-slate-800 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              id="mobile-menu-trigger"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className={`lg:hidden border-t px-2 pt-2 pb-4 space-y-1 transition-colors duration-200 ${
          currentTheme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : currentTheme === 'dark'
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
              id={`mobile-nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
