import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, RotateCcw, MessageCircle, Calendar, Gauge, Fuel, Shuffle, Heart, Eye, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Phone, X, Share2 } from 'lucide-react';
import { Vehicle, Language, Theme, VehicleCategory } from '../types';
import { sampleVehicles, formatPrice, formatMileage } from '../data';
import { translations } from '../translations';

interface InventoryProps {
  currentLanguage: Language;
  currentTheme: Theme;
}

export default function Inventory({ currentLanguage, currentTheme }: InventoryProps) {
  const t = translations[currentLanguage];

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'all'>('all');
  const [selectedMake, setSelectedMake] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [priceTier, setPriceTier] = useState<string>('all');
  const [maxMileage, setMaxMileage] = useState<string>('all');
  
  // Selected single vehicle to show a nice popup/modal detail view
  const [activeVehicleDetail, setActiveVehicleDetail] = useState<Vehicle | null>(null);
  
  // Track active index for multiple images slider inside the detail modal
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // State to handle transient copy-to-clipboard styling feedback
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = async (vehicle: Vehicle) => {
    const shareText = currentLanguage === 'en'
      ? `Check out this pre-owned certified ${vehicle.make} ${vehicle.model} (${vehicle.year}) at Balaji Enterprises! Price: ${formatPrice(vehicle.price, 'en')}. Excellent condition with ${formatMileage(vehicle.mileage, 'en')} mileage. Call +91 95653 29999 to book a test drive!`
      : `बालाजी एंटरप्राइजेज पर इस प्रामाणिक पुरानी ${vehicle.make} ${vehicle.model} (${vehicle.year}) को देखें! कीमत: ${formatPrice(vehicle.price, 'hi')}। बहुत ही अच्छी स्थिति, सिर्फ ${formatMileage(vehicle.mileage, 'hi')} चली हुई। टेस्ट ड्राइव के लिए +91 95653 29999 पर कॉल करें!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${vehicle.make} ${vehicle.model}`,
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        // Fallback
        navigator.clipboard.writeText(shareText);
        showCopyToast();
      }
    } else {
      navigator.clipboard.writeText(shareText);
      showCopyToast();
    }
  };

  const showCopyToast = () => {
    setShareCopied(true);
    setTimeout(() => {
      setShareCopied(false);
    }, 3000);
  };

  // Derive unique makes dynamically based on list and chosen Category
  const uniqueMakes = useMemo(() => {
    const list = sampleVehicles.filter(v => 
      selectedCategory === 'all' || v.category === selectedCategory
    );
    const makes = list.map(v => v.make);
    return ['all', ...Array.from(new Set(makes))];
  }, [selectedCategory]);

  // Derive unique models dynamically based on selected category and make
  const uniqueModels = useMemo(() => {
    const list = sampleVehicles.filter(v => 
      (selectedCategory === 'all' || v.category === selectedCategory) &&
      (selectedMake === 'all' || v.make === selectedMake)
    );
    const models = list.map(v => v.model);
    return ['all', ...Array.from(new Set(models))];
  }, [selectedCategory, selectedMake]);

  // Reset Filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMake('all');
    setSelectedModel('all');
    setPriceTier('all');
    setMaxMileage('all');
  };

  // Filter logic
  const filteredVehicles = useMemo(() => {
    return sampleVehicles.filter((vehicle) => {
      // 1. Text Search matching make, model, year
      const matchText = `${vehicle.make} ${vehicle.model} ${vehicle.year}`.toLowerCase();
      if (searchQuery && !matchText.includes(searchQuery.toLowerCase())) {
        return false;
      }

      // 2. Category matching
      if (selectedCategory !== 'all' && vehicle.category !== selectedCategory) {
        return false;
      }

      // 3. Make/Brand matching
      if (selectedMake !== 'all' && vehicle.make !== selectedMake) {
        return false;
      }

      // 3.5 Model matching
      if (selectedModel !== 'all' && vehicle.model !== selectedModel) {
        return false;
      }

      // 4. Price Tiers (absolute in Rupee integers)
      // Prices are from 1.4 Lakhs (140,000) to 6.4 Lakhs (640,000)
      if (priceTier !== 'all') {
        const p = vehicle.price;
        if (priceTier === 'under-2') {
          if (p >= 200000) return false;
        } else if (priceTier === '2-to-4') {
          if (p < 200000 || p > 400000) return false;
        } else if (priceTier === '4-to-6') {
          if (p < 400000 || p > 600000) return false;
        } else if (priceTier === 'above-6') {
          if (p <= 600000) return false;
        }
      }

      // 5. Mileage boundaries
      if (maxMileage !== 'all') {
        const miles = vehicle.mileage;
        if (maxMileage === 'under-30') {
          if (miles >= 30000) return false;
        } else if (maxMileage === 'under-50') {
          if (miles >= 50000) return false;
        } else if (maxMileage === 'under-70') {
          if (miles >= 70000) return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedMake, selectedModel, priceTier, maxMileage]);

  // Helper to trigger WhatsApp chat directly with full prefilled context
  const getWhatsAppLink = (vehicle: Vehicle) => {
    const defaultNumber = "919565329999"; // Example prefilled Indian WhatsApp number
    const baseText = translations[currentLanguage].whatsappInterest;
    const priceText = translations[currentLanguage].whatsappPriceMsg;
    const formattedPr = formatPrice(vehicle.price, currentLanguage);
    
    // Construct prefilled query URL encoded
    const fullMessage = `${baseText} *${vehicle.year} ${vehicle.make} ${vehicle.model}* ${priceText} *${formattedPr}*. ${currentLanguage === 'en' ? 'Is it available for a yard inspection today?' : 'क्या मैं आज इसे देखने शोरूम पर आ सकता हूँ?'}`;
    return `https://wa.me/${defaultNumber}?text=${encodeURIComponent(fullMessage)}`;
  };

  return (
    <div className={`py-12 transition-colors duration-300 min-h-screen ${
      currentTheme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            {t.inventoryTitle}
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-650'}`}>
            {t.inventorySubtitle}
          </p>
        </div>

        {/* Dynamic Filters Section */}
        <div className="p-4 md:p-6 mb-8 rounded-2xl card-glass shadow-xl transition-all" id="filters-container">
          
          <div className="flex items-center justify-between border-b pb-4 mb-5 border-slate-200 dark:border-slate-800">
            <h3 className="font-display font-black text-lg tracking-tight uppercase flex items-center gap-2">
              <Search className="h-5 w-5 text-amber-500" />
              <span>{t.filterTitle}</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentTheme === 'dark'
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-705'
              }`}
              id="reset-filters-btn"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.filterReset}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            
            {/* 1. Free search input */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {currentLanguage === 'en' ? 'Keyword Search' : 'कीवर्ड खोज'}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.filterSearchPlaceholder}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                    currentTheme === 'dark'
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                      : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                  }`}
                  id="filter-search-input"
                />
              </div>
            </div>

            {/* 2. Fuel / Vehicle Type Selector */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {t.filterCategory}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as VehicleCategory | 'all');
                  setSelectedMake('all'); // Reset make when category switches to avoid disjoint queries
                  setSelectedModel('all'); // Reset model
                }}
                className={`w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  currentTheme === 'dark'
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                }`}
                id="filter-category-select"
              >
                <option value="all">{t.filterAll}</option>
                <option value="car">{t.filterCar}</option>
                <option value="auto">{t.filterAuto}</option>
                <option value="mini-truck">{t.filterMiniTruck}</option>
              </select>
            </div>

            {/* 3. Make Filter Selection */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {t.filterMake}
              </label>
              <select
                value={selectedMake}
                onChange={(e) => {
                  setSelectedMake(e.target.value);
                  setSelectedModel('all'); // Reset model when make switches
                }}
                className={`w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  currentTheme === 'dark'
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                }`}
                id="filter-make-select"
              >
                <option value="all">{t.filterAllMakes}</option>
                {uniqueMakes.filter(m => m !== 'all').map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* 3.5 Specific Model Filter Selection */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {currentLanguage === 'en' ? 'Model Name' : 'मॉडल का नाम'}
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className={`w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  currentTheme === 'dark'
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                }`}
                id="filter-model-select"
              >
                <option value="all">{currentLanguage === 'en' ? 'All Models' : 'सभी मॉडल्स'}</option>
                {uniqueModels.filter(m => m !== 'all').map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* 4. Price Tier options */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {currentLanguage === 'en' ? 'Budget Filter' : 'बजट फ़िल्टर'}
              </label>
              <select
                value={priceTier}
                onChange={(e) => setPriceTier(e.target.value)}
                className={`w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  currentTheme === 'dark'
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                }`}
                id="filter-price-select"
              >
                <option value="all">{currentLanguage === 'en' ? 'All Budgets' : 'सभी कीमतें'}</option>
                <option value="under-2">{currentLanguage === 'en' ? 'Under ₹ 2 Lakhs' : '₹ 2 लाख से कम'}</option>
                <option value="2-to-4">{currentLanguage === 'en' ? '₹ 2 Lakhs - ₹ 4 Lakhs' : '₹ 2 लाख - ₹ 4 लाख'}</option>
                <option value="4-to-6">{currentLanguage === 'en' ? '₹ 4 Lakhs - ₹ 6 Lakhs' : '₹ 4 लाख - ₹ 6 लाख'}</option>
                <option value="above-6">{currentLanguage === 'en' ? 'Above ₹ 6 Lakhs' : '₹ 6 लाख से ऊपर'}</option>
              </select>
            </div>

            {/* 5. Max Mileage Filter */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {currentLanguage === 'en' ? 'Max Mileage' : 'अधिकतम माइलेज'}
              </label>
              <select
                value={maxMileage}
                onChange={(e) => setMaxMileage(e.target.value)}
                className={`w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  currentTheme === 'dark'
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                }`}
                id="filter-mileage-select"
              >
                <option value="all">{currentLanguage === 'en' ? 'Any Mileage' : 'कितना भी माइलेज'}</option>
                <option value="under-30">{currentLanguage === 'en' ? 'Under 30,000 km' : '30,000 किमी से कम'}</option>
                <option value="under-50">{currentLanguage === 'en' ? 'Under 50,000 km' : '50,000 किमी से कम'}</option>
                <option value="under-70">{currentLanguage === 'en' ? 'Under 75,000 km' : '75,000 किमी से कम'}</option>
              </select>
            </div>

          </div>
        </div>

        {/* Inventory Count Indicator */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs font-mono text-slate-430 tracking-wider">
            {currentLanguage === 'en' 
              ? `Showing ${filteredVehicles.length} of ${sampleVehicles.length} items`
              : `कुल ${sampleVehicles.length} में से ${filteredVehicles.length} वाहन दिखाए गए`}
          </p>
        </div>

        {/* Vehicles Grid Display */}
        {filteredVehicles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-12 text-center rounded-2xl border border-dashed ${
              currentTheme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-300 text-slate-600'
            }`}
          >
            <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3 animate-bounce" />
            <h3 className="font-display font-semibold text-lg">{t.noVehiclesFound}</h3>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredVehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl card-glass relative"
                  id={`vehicle-card-${vehicle.id}`}
                >
                  
                  {/* Photo Container */}
                  <div className="relative aspect-3/2 bg-slate-950 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                      id={`vehicle-image-${vehicle.id}`}
                    />
                    
                    {/* Floating Brand Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-slate-900/90 text-amber-400 rounded-full border border-slate-700">
                        {vehicle.category === 'car' ? t.filterCar : vehicle.category === 'auto' ? t.filterAuto : t.filterMiniTruck}
                      </span>
                    </div>

                    {/* Floating Price label block */}
                    <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                      {formatPrice(vehicle.price, currentLanguage)}
                    </div>
                  </div>

                  {/* Body Specs Info */}
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="font-display font-extrabold text-lg line-clamp-1">
                        {vehicle.make} <span className="text-amber-500">{vehicle.model}</span>
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{t.specYear}: {vehicle.year}</span>
                      </p>
                    </div>

                    {/* Technical stats blocks */}
                    <div className="grid grid-cols-2 gap-2 border-t border-b py-3 border-slate-800 dark:border-slate-800/60 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="truncate">{formatMileage(vehicle.mileage, currentLanguage)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fuel className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="truncate">{vehicle.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Shuffle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="truncate">{vehicle.transmission}</span>
                      </div>
                    </div>

                    {/* Descriptive short summary */}
                    <p className={`text-xs line-clamp-2 ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {vehicle.description[currentLanguage]}
                    </p>

                    {/* Action Panel: Details button + direct WhatsApp CTA */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => {
                          setActiveVehicleDetail(vehicle);
                          setActiveImageIndex(0);
                        }}
                        className={`w-full py-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                          currentTheme === 'dark'
                            ? 'border-slate-800 bg-slate-800 hover:bg-slate-700 text-white'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                        }`}
                        id={`vehicle-details-${vehicle.id}`}
                      >
                        {t.viewDetails}
                      </button>
                      <a
                        href={getWhatsAppLink(vehicle)}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
                        id={`vehicle-whatsapp-${vehicle.id}`}
                      >
                        <MessageCircle className="h-4 w-4 fill-white" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Detail Showcase Modal Popup */}
      {activeVehicleDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl relative max-h-[94vh] sm:max-h-[90vh] flex flex-col ${
              currentTheme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            id="vehicle-detail-modal"
          >
            {/* Close button top right */}
            <button
              onClick={() => setActiveVehicleDetail(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-950/80 border border-slate-800 hover:bg-slate-950 text-white shadow-lg cursor-pointer transition-colors"
              id="details-close-btn"
              title="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-slate-800">
              
              {/* Slider / Image Section */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden w-full group">
                {activeVehicleDetail.images && activeVehicleDetail.images.length > 0 ? (
                  <>
                    <img
                      src={activeVehicleDetail.images[activeImageIndex]}
                      alt={`${activeVehicleDetail.make} ${activeVehicleDetail.model}`}
                      className="w-full h-full object-cover transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Left arrow */}
                    {activeVehicleDetail.images.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev === 0 ? activeVehicleDetail.images!.length - 1 : prev - 1));
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-950 transition-colors z-10 cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                    )}

                    {/* Right arrow */}
                    {activeVehicleDetail.images.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev === activeVehicleDetail.images!.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-950 transition-colors z-10 cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}

                    {/* Dot indicators */}
                    {activeVehicleDetail.images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-slate-950/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                        {activeVehicleDetail.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                              activeImageIndex === idx ? 'bg-amber-500 w-4' : 'bg-slate-400/60 hover:bg-slate-350'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <img
                    src={activeVehicleDetail.image}
                    alt={`${activeVehicleDetail.make} ${activeVehicleDetail.model}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-extrabold tracking-wide uppercase bg-slate-900/90 text-amber-400 rounded-full border border-slate-750">
                    {activeVehicleDetail.category === 'car' ? t.filterCar : activeVehicleDetail.category === 'auto' ? t.filterAuto : t.filterMiniTruck}
                  </span>
                </div>
              </div>

              {/* Modal Core Body Specs */}
              <div className="p-5 md:p-8 space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl leading-none">
                      {activeVehicleDetail.make} <span className="text-amber-500">{activeVehicleDetail.model}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider bg-slate-800 text-slate-300 rounded uppercase">
                        {currentLanguage === 'en' ? 'verified class' : 'सत्यापित वर्ग'}: {activeVehicleDetail.category}
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider bg-slate-800 text-slate-300 rounded uppercase">
                        {currentLanguage === 'en' ? 'Model Year' : 'मॉडल वर्ष'}: {activeVehicleDetail.year}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <span className="text-2xl sm:text-3xl font-black text-amber-500 block leading-none">
                      {formatPrice(activeVehicleDetail.price, currentLanguage)}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-green-500 flex items-center justify-start sm:justify-end gap-1 mt-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {t.available}
                    </span>
                  </div>
                </div>

                {/* Specs detailed block */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950/20 dark:bg-slate-950/45 p-4 rounded-2xl border border-slate-800/40">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t.specMileage}</span>
                    <span className="text-sm font-black block mt-0.5">{formatMileage(activeVehicleDetail.mileage, currentLanguage)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t.specFuel}</span>
                    <span className="text-sm font-black block mt-0.5">{activeVehicleDetail.fuelType}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t.specTransmission}</span>
                    <span className="text-sm font-black block mt-0.5">{activeVehicleDetail.transmission}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">{currentLanguage === 'en' ? 'Engine' : 'इंजन कैपेसिटी'}</span>
                    <span className="text-sm font-black block mt-0.5">{activeVehicleDetail.engine}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-sm uppercase tracking-wide text-amber-500">{currentLanguage === 'en' ? 'Mechanical Inspection highlights:' : 'मैकेनिकल जांच की मुख्य बातें:'}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-slate-950/10 p-4 rounded-xl">
                    {activeVehicleDetail.features[currentLanguage].map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-400 font-bold text-xs sm:text-sm">
                        <span className="h-2 w-2 bg-amber-500 rounded-full shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description block */}
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-sm uppercase tracking-wide text-amber-500">{currentLanguage === 'en' ? 'Owner / Mechanic Note:' : 'डीलर/मैकेनिक की समीक्षा:'}</h4>
                  <p className={`text-xs sm:text-sm leading-relaxed font-medium ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    {activeVehicleDetail.description[currentLanguage]}
                  </p>
                </div>

                {/* Direct Booking Actions */}
                <div className="flex flex-row items-center justify-between gap-1.5 sm:gap-3 pt-4 border-t border-slate-800/10 dark:border-slate-800/60 font-bold w-full flex-nowrap">
                  <a
                    href={getWhatsAppLink(activeVehicleDetail)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 sm:py-3 px-1 sm:px-4 bg-green-600 hover:bg-green-700 text-white font-extrabold text-[10px] sm:text-xs md:text-sm text-center rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 shadow-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white shrink-0" />
                    <span className="whitespace-nowrap">{currentLanguage === 'en' ? 'WhatsApp' : 'व्हाट्सएप'}</span>
                  </a>

                  <a
                    href="tel:+919565329999"
                    className="flex-1 py-2.5 sm:py-3 px-1 sm:px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10px] sm:text-xs md:text-sm text-center rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 shadow-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-slate-950 shrink-0" />
                    <span className="whitespace-nowrap">{currentLanguage === 'en' ? 'Call Us' : 'कॉल करें'}</span>
                  </a>

                  <button
                    onClick={() => handleShare(activeVehicleDetail)}
                    className={`flex-1 py-2.5 sm:py-3 px-1 sm:px-4 text-[10px] sm:text-xs md:text-sm font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                      shareCopied
                        ? 'bg-amber-500 text-slate-950 border-amber-550 font-black'
                        : currentTheme === 'dark'
                          ? 'border-slate-800 bg-slate-850 hover:bg-slate-800 text-white'
                          : 'border-slate-205 bg-slate-101 hover:bg-slate-205 text-slate-800'
                    }`}
                  >
                    <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                    <span className="whitespace-nowrap">
                      {shareCopied 
                        ? (currentLanguage === 'en' ? 'Copied' : 'कॉपी')
                        : (currentLanguage === 'en' ? 'Share' : 'शेयर')}
                    </span>
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
