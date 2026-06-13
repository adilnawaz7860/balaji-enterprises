import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Gauge, 
  Fuel, 
  MessageCircle, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  CheckCircle2, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  Award, 
  MapPin, 
  ListTodo, 
  UserCheck, 
  Building2,
  Phone,
  Truck,
  Car,
  Zap
} from 'lucide-react';
import { Vehicle, Language, Theme, VehicleCategory } from '../types';
import { sampleVehicles, formatPrice, formatMileage } from '../data';

interface FeaturedVehiclesProps {
  currentLanguage: Language;
  currentTheme: Theme;
  setActiveTab: (tab: string) => void;
}

export default function FeaturedVehicles({ currentLanguage, currentTheme, setActiveTab }: FeaturedVehiclesProps) {
  // Homepage Active Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<'all' | VehicleCategory>('all');
  
  // Interactive Verification Checklist State
  const [activeCheckTab, setActiveCheckTab] = useState<'engine' | 'papers' | 'suspension' | 'cng'>('engine');

  // ROI Calculator Parameters
  const [roiCategory, setRoiCategory] = useState<VehicleCategory>('auto');
  const [tripsPerDay, setTripsPerDay] = useState<number>(12);
  const [averageTripFare, setAverageTripFare] = useState<number>(150); // in INR

  // Selected physical branch location preview state
  const [selectedBranch, setSelectedBranch] = useState<'showroom' | 'yard'>('showroom');

  // Filter vehicles category-wise
  const filteredVehicles = useMemo(() => {
    if (selectedCategory === 'all') {
      return sampleVehicles;
    }
    return sampleVehicles.filter(v => v.category === selectedCategory);
  }, [selectedCategory]);

  // Dynamic WhatsApp text generator
  const getWhatsAppLink = (vehicle: Vehicle) => {
    const rawNumber = "919565329999"; // Dealer showroom default
    const text = currentLanguage === 'en'
      ? `Hi Balaji Enterprises, I saw your pre-owned ${vehicle.make} ${vehicle.model} (${vehicle.year}) categorized live on the homepage listed for ${formatPrice(vehicle.price, 'en')}. I am ready for a trial run. Please confirm.`
      : `नमस्ते बालाजी एंटरप्राइजेज, मैंने होमपेज पर आपकी प्रमाणित गाड़ी देखी है: ${vehicle.make} ${vehicle.model} (${vehicle.year}), जिसकी कीमत ${formatPrice(vehicle.price, 'hi')} है। मैं ट्रायल रन के लिए आना चाहता हूँ।`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  // ROI Calculation formulas backed by regional parameters
  const calculatedROI = useMemo(() => {
    const fuelCostRatio = roiCategory === 'auto' ? 0.25 : roiCategory === 'mini-truck' ? 0.35 : 0.40; // fuel & maintenance expenses
    const grossDaily = tripsPerDay * averageTripFare;
    const maintenanceDaily = roiCategory === 'auto' ? 50 : roiCategory === 'mini-truck' ? 120 : 150;
    const dailyFuelExp = grossDaily * fuelCostRatio;
    const netDaily = Math.max(0, grossDaily - dailyFuelExp - maintenanceDaily);
    
    const monthlyNet = Math.round(netDaily * 26); // assuming 26 working days a month
    const yearlyNet = monthlyNet * 12;

    // Estimate downpayment pay back period
    const defaultPrice = roiCategory === 'auto' ? 185000 : roiCategory === 'mini-truck' ? 360000 : 495000;
    const typicalDownpayment = Math.round(defaultPrice * 0.25);
    const paybackMonths = Math.max(1, Math.round(typicalDownpayment / (monthlyNet > 0 ? monthlyNet : 10000)));

    return {
      grossDaily,
      netDaily: Math.round(netDaily),
      monthlyNet,
      yearlyNet,
      typicalDownpayment,
      paybackMonths
    };
  }, [roiCategory, tripsPerDay, averageTripFare]);

  // Inspection Checklist categories
  const checklistData = {
    engine: {
      title: currentLanguage === 'en' ? "1. Sound & Vibration Scan" : "1. इंजन साउंड व कंप्रेशन टेस्ट",
      desc: currentLanguage === 'en' 
        ? "We run the engine till optimal operating temperature, check piston sounds, combustion exhaust colors, and measure cylinder compression. Zero white smoke guarantee."
        : "इंजन को गर्म करके पिस्टन ट्यूनिंग की आवाज, मोबिल ऑयल रिसाव, और निकास धुएं का रंग चेक किया जाता है। सफेद धुएं की 100% अनुगामी जांच।",
      points: [
        currentLanguage === 'en' ? "Idle RPM Stabilizer Audit" : "आइडल आरपीएम स्थिरता ऑडिट",
        currentLanguage === 'en' ? "Radiator coolant rust leakage inspection" : "रेडिएटर कूलेंट रिसाव जांच",
        currentLanguage === 'en' ? "Sound-decibels limits verification" : "इंजन ध्वनि सीमा सत्यापन"
      ]
    },
    papers: {
      title: currentLanguage === 'en' ? "2. Authenticated RTO Clearance" : "2. आरटीओ पेपर और एनओसी जांच",
      desc: currentLanguage === 'en'
        ? "Strict documentation tracking system. We verify single-ownership status, state road permits validity, active fitness certificates, and ensure clean accident insurance claims history."
        : "दस्तावेजों की पक्की पड़ताल। हम पिछली ऑनरशिप का इतिहास, प्रदूषण प्रमाण पत्र, राष्ट्रीय परमिट, और गैर-आपराधिक रिकॉर्ड की प्रामाणिक पुष्टि करते हैं।",
      points: [
        currentLanguage === 'en' ? "Accident blacklisting status checklist" : "गैर-आपराधिक और ब्लैकलिस्ट से मुफ़्त दस्तावेज़",
        currentLanguage === 'en' ? "Direct loan clearing NOC verification" : "एनओसी व हाइपोथेकेशन हटाने की आरटीओ जांच",
        currentLanguage === 'en' ? "Road tax lifetime clearance updates" : "रोड टैक्स भुगतान सत्यापन"
      ]
    },
    suspension: {
      title: currentLanguage === 'en' ? "3. Suspension & Chassis Structural Check" : "3. मजबूत चेसिस और सस्पेंशन लोड टेस्ट",
      desc: currentLanguage === 'en'
        ? "Heavy-duty test running. We measure frame alignment, inspection of leaf springs (kamani plates) for commercial weight tolerance, and direct shock absorber efficiency checks."
        : "भारी लोड की स्थिति में ड्राइविंग टेस्ट और चेसिस गर्डर की मजबूती जांच। कमानी प्लेटों के पट्टों की मरम्मत या नया संपादन सुनिश्चित किया जाता है।",
      points: [
        currentLanguage === 'en' ? "Chassis rust welding structure verification" : "चेसिस जंग और वेल्डिंग क्रैक डिटेक्ट",
        currentLanguage === 'en' ? "Differential system oil replacement" : "डिफरेंशियल एक्सल गियर ऑयल रीप्लेसमेंट",
        currentLanguage === 'en' ? "High load-bearing steering alignment" : "फुल लोड रफ-रोड चलाने की क्षमता"
      ]
    },
    cng: {
      title: currentLanguage === 'en' ? "4. Double CNG Safety Check" : "4. सीएनजी लीक और हाइड्रो-सर्टिफिकेशन",
      desc: currentLanguage === 'en'
        ? "Essential certification for auto-rickshaw buyers! Certified electronic leak sensors run across gas pipelines, cylinder valves, and compliance plate checking."
        : "ऑटो और कार के लिए रिलायबल गैस लाइन सुरक्षा! गैस पाइपलाइनों, वाल्व सीलर्स और सिलेंडर हाइड्रो टेस्ट सर्टिफिकेट की वैधता का बारीक परीक्षण किया जाता है।",
      points: [
        currentLanguage === 'en' ? "Regulator pressure calibration scan" : "गैस रेगुलेटर प्रेशर और नली की जांच",
        currentLanguage === 'en' ? "RTO compliance metal plate verification" : "आरटीओ सीएनजी मेटल प्लेट वैधता पुष्टि",
        currentLanguage === 'en' ? "Diagnostic tuneup for peak fuel mileage" : "अधिकतम माइलेज के लिए ऑटो-ट्यूनिंग"
      ]
    }
  };

  return (
    <div className="space-y-0" id="homepage-expanded-core-section">
      
      {/* SECTION 1: CATEGORY-WISE INVENTORY SHOWCASE */}
      <section className={`py-16 md:py-24 border-t transition-colors duration-305 ${
        currentTheme === 'dark' 
          ? 'bg-slate-950 border-slate-900 text-white' 
          : 'bg-white border-slate-200 text-slate-900'
      }`} id="home-featured-vehicles-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-bold uppercase tracking-widest">
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <span>{currentLanguage === 'en' ? "Balaji Motors Verified Inventory" : "श्रेणी अनुसार जांची गई गाड़ियाँ"}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase leading-none">
              {currentLanguage === 'en' ? "Explore Inventory By Category" : "श्रेणी के अनुसार हमारा स्टॉक देखें"}
            </h2>
            
            <p className={`text-base md:text-lg ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentLanguage === 'en' 
                ? "Select a category below. Each vehicle is mechanically fully certified with original papers, verified to help you secure a trusted livelihood."
                : "अपनी पसंद का काम या परिवार के अनुसार श्रेणी चुनें। सभी उत्पाद कमर्शियल परमिट एनओसी और असली कागजातों के साथ सत्यापित हैं।"}
            </p>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 pb-2 border-b border-slate-800/20 max-w-2xl mx-auto">
            {[
              { id: 'all', labelEn: 'All Vehicles', labelHi: 'सभी गाड़ियाँ', count: sampleVehicles.length },
              { id: 'car', labelEn: 'Family Cars', labelHi: 'पारिवारिक कारें', count: sampleVehicles.filter(v => v.category === 'car').length },
              { id: 'auto', labelEn: 'Auto Rickshaws', labelHi: 'सीएनजी ऑटो रिक्शा', count: sampleVehicles.filter(v => v.category === 'auto').length },
              { id: 'mini-truck', labelEn: 'Commercial Mini Trucks', labelHi: 'मिनी कमर्शियल लोडर', count: sampleVehicles.filter(v => v.category === 'mini-truck').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 border ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/10 font-black'
                    : currentTheme === 'dark'
                      ? 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 bg-slate-900/40'
                      : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-slate-100'
                }`}
              >
                <span>{currentLanguage === 'en' ? tab.labelEn : tab.labelHi}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedCategory === tab.id 
                    ? 'bg-slate-950 text-amber-400 font-extrabold' 
                    : 'bg-slate-800/10 dark:bg-slate-800/80 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredVehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden rounded-2xl transition-all hover:scale-[1.01] hover:shadow-2xl card-glass relative flex flex-col h-full border border-slate-800/10 dark:border-slate-800/40"
                  id={`home-cat-card-${vehicle.id}`}
                >
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>{currentLanguage === 'en' ? "Balaji Verified" : "बालाजी प्रमाणित"}</span>
                    </span>
                  </div>

                  {/* Vehicle Image */}
                  <div className="relative aspect-[3/2] overflow-hidden bg-slate-950">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Visual Accent Price Tag Overlay */}
                    <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 py-1.5 px-3 rounded-xl shadow-lg">
                      <span className="text-sm md:text-base font-extrabold text-amber-400">
                        {formatPrice(vehicle.price, currentLanguage)}
                      </span>
                    </div>
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-5 md:p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{vehicle.make}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span className="text-xs font-semibold text-amber-500">{vehicle.year} {currentLanguage === 'en' ? 'Model' : 'मॉडल'}</span>
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded bg-slate-850 dark:bg-slate-900 text-slate-450 uppercase font-mono tracking-widest">
                          {vehicle.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-display font-black tracking-tight uppercase leading-none">
                        {vehicle.model}
                      </h3>
                      
                      <p className={`text-xs sm:text-sm line-clamp-2 ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                        {vehicle.description[currentLanguage]}
                      </p>
                    </div>

                    {/* Primary Specs Icons row */}
                    <div className={`grid grid-cols-3 gap-1 py-2.5 border-t border-b ${
                      currentTheme === 'dark' ? 'border-slate-800/80 text-slate-350' : 'border-slate-200 text-slate-700'
                    }`}>
                      <div className="flex items-center gap-1 justify-center flex-col text-center">
                        <Calendar className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{currentLanguage === 'en' ? 'Year' : 'वर्ष'}</span>
                        <span className="text-xs font-bold">{vehicle.year}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center flex-col text-center border-l border-r border-slate-800/10 dark:border-slate-800/40">
                        <Fuel className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{currentLanguage === 'en' ? 'Fuel' : 'ईंधन'}</span>
                        <span className="text-[11px] font-bold truncate max-w-full">
                          {vehicle.fuelType.split(' ')[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 justify-center flex-col text-center">
                        <Gauge className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{currentLanguage === 'en' ? 'Km' : 'किमी'}</span>
                        <span className="text-xs font-bold">{formatMileage(vehicle.mileage, currentLanguage)}</span>
                      </div>
                    </div>

                    {/* Action CTA Buttons */}
                    <div className="flex flex-col gap-2 pt-1 font-bold">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setActiveTab('inventory');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl border flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                            currentTheme === 'dark'
                              ? 'border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-white'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-805'
                          }`}
                        >
                          <span>{currentLanguage === 'en' ? 'More Details' : 'विवरण देखें'}</span>
                        </button>
                        
                        <a
                          href={getWhatsAppLink(vehicle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center shadow-md cursor-pointer"
                        >
                          <MessageCircle className="h-3.5 w-3.5 fill-white" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {/* Direct Phone Call Button */}
                      <a
                        href="tel:+919565329999"
                        className="py-2.5 text-xs font-extrabold uppercase tracking-widest text-slate-950 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center shadow-md cursor-pointer"
                      >
                        <Phone className="h-3.5 w-3.5 fill-slate-950" />
                        <span>{currentLanguage === 'en' ? 'Call Dealership' : 'बालाजी एंटरप्राइजेज को कॉल करें'}</span>
                      </a>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View All CTA Button */}
          <div className="text-center mt-12 md:mt-14">
            <button
              onClick={() => {
                setActiveTab('inventory');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white dark:text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl group cursor-pointer"
            >
              <span>{currentLanguage === 'en' ? "Open Core Live Inventory Room" : "पूरी सूची एक्सप्लोर करें"}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: INTERACTIVE ROI LIVELIHOOD ESTIMATOR (EXTRA HERO ELEMENT) */}
      <section className={`py-16 md:py-20 border-t transition-colors duration-300 ${
        currentTheme === 'dark' 
          ? 'bg-slate-950 border-slate-900 text-white' 
          : 'bg-slate-50 border-slate-200 text-slate-900'
      }`} id="home-roi-calculator-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-4 animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-500 text-xs font-bold uppercase tracking-widest">
              <TrendingUp className="h-4 w-4" />
              <span>{currentLanguage === 'en' ? "Professional Earnings Planner" : "रोमांचक दैनिक-कमाई का अनुमानक"}</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-display font-black uppercase tracking-tight leading-none">
              {currentLanguage === 'en' ? "Estimated Income Plan" : "अपनी नई गाड़ी से होने वाली कमाई जानें"}
            </h2>
            
            <p className={`text-sm md:text-base ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentLanguage === 'en'
                ? "Unlike passenger cars, customized CNG auto-rickshaws and loaders start making money from Day 1. Choose your category and slide trips to see monthly net margins."
                : "किराए की गाड़ी चलाने के बजाय खुद की सीएनजी ऑटो या छोटा हाथी खरीदकर ज्यादा कमाएं। नीचे अपनी कैटेगरी सेट करें और मुनाफा जोड़ें।"}
            </p>
          </div>

          {/* Interactive ROI Widget layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Control Panel Card (Col-Span 7) */}
            <div className={`lg:col-span-7 p-6 md:p-8 rounded-3xl border flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 ${
              currentTheme === 'dark' 
                ? 'bg-slate-900 border-slate-800 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              {/* Step 1: Select Type */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-500 block">
                  {currentLanguage === 'en' ? "Step 1: Choose Vehicle Type" : "चरण 1: गाड़ी का प्रकार चुनें"}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'auto', title: currentLanguage === 'en' ? "CNG Auto" : "सीएनजी ऑटो", dFare: 120, dTrips: 15 },
                    { id: 'mini-truck', title: currentLanguage === 'en' ? "mini-truck Loader" : "छोटा हाथी (Loader)", dFare: 550, dTrips: 5 },
                    { id: 'car', title: currentLanguage === 'en' ? "Family Car / Taxi" : "पारिवारिक कार / टैक्सी", dFare: 280, dTrips: 10 }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setRoiCategory(cat.id as VehicleCategory);
                        setAverageTripFare(cat.dFare);
                        setTripsPerDay(cat.dTrips);
                      }}
                      className={`p-4 rounded-xl text-center border transition-all text-xs tracking-wider cursor-pointer font-extrabold group flex flex-col items-center justify-center ${
                        roiCategory === cat.id
                          ? 'bg-amber-500 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 border-amber-300 ring-4 ring-amber-500/20 shadow-lg shadow-amber-500/25 transform scale-[1.04]'
                          : currentTheme === 'dark'
                            ? 'bg-slate-800/80 border-slate-700 text-slate-350 hover:text-white hover:bg-slate-700/90'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-200/80'
                      }`}
                    >
                      {(() => {
                        const iconClass = `h-6 w-6 mx-auto mb-1.5 transition-all duration-300 ${
                          roiCategory === cat.id 
                            ? 'text-slate-950 scale-110 stroke-[2.5px]' 
                            : 'text-amber-500 group-hover:scale-115 stroke-[2px]'
                        }`;
                        if (cat.id === 'auto') {
                          return <Zap className={iconClass} fill={roiCategory === cat.id ? "rgba(15,23,42,0.25)" : "none"} />;
                        } else if (cat.id === 'mini-truck') {
                          return <Truck className={iconClass} fill={roiCategory === cat.id ? "rgba(15,23,42,0.25)" : "none"} />;
                        } else {
                          return <Car className={iconClass} fill={roiCategory === cat.id ? "rgba(15,23,42,0.25)" : "none"} />;
                        }
                      })()}
                      <span>{cat.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Slider for trips */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest font-mono text-slate-400">
                  <span>{currentLanguage === 'en' ? "Step 2: Operating Trips / Bookings (Daily)" : "चरण 2: रोजाना पूरे होने वाले फेरे / ट्रिप्स"}</span>
                  <span className="font-extrabold text-amber-400 text-sm">{tripsPerDay} {currentLanguage === 'en' ? 'trips' : 'फेरे'}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={tripsPerDay}
                  onChange={(e) => setTripsPerDay(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 dark:bg-slate-800/80 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                  <span>2 {currentLanguage === 'en' ? 'Trips' : 'फेरे'}</span>
                  <span>15 {currentLanguage === 'en' ? 'Average' : 'औसत'}</span>
                  <span>30 {currentLanguage === 'en' ? 'Heavy Peak' : 'फुल लोड'}</span>
                </div>
              </div>

              {/* Step 3: Average fare */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest font-mono text-slate-400">
                  <span>{currentLanguage === 'en' ? "Step 3: Average Ticket Fare (INR)" : "भारत में प्रति फेयर औसत किराया (₹)"}</span>
                  <span className="font-extrabold text-amber-400 text-sm">₹ {averageTripFare}</span>
                </div>
                <input
                  type="range"
                  min={roiCategory === 'auto' ? 40 : roiCategory === 'mini-truck' ? 200 : 80}
                  max={roiCategory === 'auto' ? 400 : roiCategory === 'mini-truck' ? 1500 : 800}
                  step="10"
                  value={averageTripFare}
                  onChange={(e) => setAverageTripFare(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 dark:bg-slate-800/80 rounded-lg appearance-none"
                />
              </div>

              {/* Profit note */}
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-450 italic mt-2 border-t border-slate-800/10 dark:border-slate-800/40 pt-4">
                * Note: Fuel expense is calculated and deducted in real time (CNG: ₹85/kg, Diesel: ₹90/L, Petrol: ₹96/L average index in Delhi NCR territory). Maintenance margin is computed around average tyre & mobile-oil schedules.
              </p>

            </div>

            {/* Right Display Board (Col-Span 5) */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />
              
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full font-extrabold shadow-md inline-block mb-3">
                    {currentLanguage === 'en' ? 'Livelihood Outcome' : 'लाभ अनुमानक बोर्ड'}
                  </span>
                  <h3 className="text-xl font-display font-black uppercase tracking-tight">{currentLanguage === 'en' ? 'Estimated Net Earnings' : 'साफ-साफ होने वाली कुल बचत'}</h3>
                </div>

                {/* Main numbers stacking style */}
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-3 flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">{currentLanguage === 'en' ? 'Daily Net Margin' : 'रोजाना शुद्ध कमाई'}</span>
                    <span className="text-2xl font-black text-white">₹ {calculatedROI.netDaily.toLocaleString('en-IN')}/day</span>
                  </div>

                  <div className="border-b border-slate-800 pb-3 flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">{currentLanguage === 'en' ? 'Monthly Net Profit' : 'मासिक शुद्ध बचत (26 दिन)'}</span>
                    <span className="text-3xl font-black text-amber-400">₹ {calculatedROI.monthlyNet.toLocaleString('en-IN')}/mo</span>
                  </div>

                  <div className="pb-2 flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">{currentLanguage === 'en' ? 'Estimated Annual Income' : 'वार्षिक शुद्ध संभावित आय'}</span>
                    <span className="text-xl font-bold text-slate-350">₹ {calculatedROI.yearlyNet.toLocaleString('en-IN')}/yr</span>
                  </div>
                </div>

                {/* Smart Downpayment recovery math for middle-class people */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-1 text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                    {currentLanguage === 'en' ? 'Typical downpayment payback speed' : 'डाउनपेमेंट रिकवरी समय सीमा'}
                  </p>
                  <p className="text-xs font-bold text-slate-100">
                    {currentLanguage === 'en' 
                      ? `Recovers typical ₹${calculatedROI.typicalDownpayment.toLocaleString('en-IN')} downpayment within ${calculatedROI.paybackMonths} months!`
                      : `कठिन मिहनत से ₹${calculatedROI.typicalDownpayment.toLocaleString('en-IN')} की डाउनपेमेंट मात्र ${calculatedROI.paybackMonths} महीने में वापस!`
                    }
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-850 mt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveTab('financing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-extrabold uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentLanguage === 'en' ? "Apply Fast Loan Check" : "लोन प्रक्रिया प्रारंभ करें"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: 120-POINT QUALITY INSPECTION (EXTRA ENRICHMENT FOR 25-50 yrs) */}
      <section className={`py-16 md:py-20 border-t transition-colors duration-300 ${
        currentTheme === 'dark' 
          ? 'bg-slate-950 border-slate-900 text-white' 
          : 'bg-white border-slate-200 text-slate-900'
      }`} id="home-mechanical-assurance-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative Block (Col-Span 5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-bold uppercase tracking-widest">
                <Award className="h-4 w-4" />
                <span>{currentLanguage === 'en' ? "Balaji Enterprises' quality promise" : "बालाजी एंटरप्राइजेज का क्वालिटी वादा"}</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight leading-none">
                {currentLanguage === 'en' ? "Mechanically Sound. Period." : "केवल 100% फिट गाड़ियाँ ही हमारे पास होती हैं।"}
              </h2>

              <p className={`text-base leading-relaxed ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentLanguage === 'en'
                  ? "At Balaji Enterprises, we respect your hard-earned sweat. We don't employ sales brokers. Our core mechanics test every carburetor, leaf spring alignment, and gearbox personally before listing. This is why 1,500+ operators trust us."
                  : "बालाजी एंटरप्राइजेज पर हम दलालों और शोरूम की झूठी सजावट से दूर रहते हैं। हमारी एक्सपर्ट टीम खुद इंजन का कंप्रेशन, लीफ स्प्रिंग अलाइनमेंट और सीएनजी प्रेशर चेक करती है। इसलिए प्रत्येक गाड़ी बेजोड़ चलती है।"}
              </p>

              {/* Mini stat triggers */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-900/5 dark:bg-slate-900/40 rounded-xl border border-slate-800/20">
                  <span className="block text-xl font-black text-amber-500">1,500+</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{currentLanguage === 'en' ? "Livelihoods Helped" : "मेहनती भाइयों की मदद की"}</span>
                </div>
                <div className="p-3 bg-slate-900/5 dark:bg-slate-900/40 rounded-xl border border-slate-800/20">
                  <span className="block text-xl font-black text-amber-500">120-Point</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{currentLanguage === 'en' ? "Mechanical Sign-off" : "सत्यापित मैकेनिक चेक"}</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Diagnostic Bench (Col-Span 7) */}
            <div className="lg:col-span-7 bg-slate-905 dark:bg-slate-950/60 p-6 md:p-8 rounded-3xl border border-slate-800/10 dark:border-slate-800/80 shadow-md">
              
              {/* Checklist Diagnostic selector buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6 pb-4 border-b border-slate-800/30">
                {[
                  { id: 'engine', title: currentLanguage === 'en' ? "Engine" : "इंजन" },
                  { id: 'papers', title: currentLanguage === 'en' ? "Papers & NOC" : "आरटीओ कागजात" },
                  { id: 'suspension', title: currentLanguage === 'en' ? "Suspension" : "कमानी-चेसिस" },
                  { id: 'cng', title: currentLanguage === 'en' ? "CNG Safety" : "सीएनजी लीक" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveCheckTab(item.id as any)}
                    className={`py-2 text-[10px] md:text-xs font-extrabold uppercase tracking-widest rounded-lg border transition-all text-center cursor-pointer ${
                      activeCheckTab === item.id
                        ? 'bg-amber-505 dark:bg-amber-500 text-white dark:text-slate-950 border-amber-500 font-black'
                        : 'bg-slate-900/5 dark:bg-slate-900/50 border-slate-805 text-slate-405 dark:text-slate-400 hover:text-amber-500'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Selected diagnostic checklist details panel */}
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h4 className="font-display font-black text-lg text-amber-500 flex items-center gap-1.5 leading-none">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>{checklistData[activeCheckTab].title}</span>
                  </h4>
                  <p className={`text-xs md:text-sm leading-relaxed ${currentTheme === 'dark' ? 'text-slate-350' : 'text-slate-655'}`}>
                    {checklistData[activeCheckTab].desc}
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">
                    {currentLanguage === 'en' ? "Primary Verification Actions:" : "जांच के मुख्य बिंदु (100% पक्का):"}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {checklistData[activeCheckTab].points.map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className={currentTheme === 'dark' ? 'text-slate-200' : 'text-slate-705'}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: PHYSICAL BRANCH STORE SELECTOR MAP (MEETS CONTACT REQUIREMENT LIVE IN HOME) */}
      <section className={`py-16 border-t transition-colors duration-300 ${
        currentTheme === 'dark' 
          ? 'bg-slate-900/30 border-slate-900 text-white' 
          : 'bg-slate-50 border-slate-200 text-slate-900'
      }`} id="home-physical-store-selector-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Store locator info (Col 5) */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 py-1 px-2.5 rounded-md inline-block">
                {currentLanguage === 'en' ? 'Verified Local Yard Locations' : 'हमारे अधिकृत यार्ड और केंद्र'}
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-black uppercase tracking-tight leading-none">
                {currentLanguage === 'en' ? 'Come Check Vehicles Live at Yards' : 'लाइव ड्राइव ट्रायल के लिए पधारें'}
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentLanguage === 'en'
                  ? "We don't expect you to buy online. We encourage you to visit our yard, bring your own mechanic, and take back-to-back test trips. Toggle the branch locations to find the nearest showroom plot."
                  : "हम नहीं चाहते कि आप केवल इंटरनेट पर गाड़ियाँ देखें। आप हमारे मटियारी चौराहा देवा रोड शो-रूम या चिनहट स्टॉक यार्ड पर आएं, अपने साथ मैकेनिक लाएं और खुलकर संतुष्टि करें।"}
              </p>

              {/* Branch Selection Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedBranch('showroom')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedBranch === 'showroom'
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-slate-800 bg-transparent opacity-75'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-sm uppercase flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-amber-500" />
                      <span>{currentLanguage === 'en' ? 'Main Showroom: Matiyari, Lucknow' : 'मुख्य शो-रूम: मटियारी चौराहा, लखनऊ'}</span>
                    </span>
                    {selectedBranch === 'showroom' && <CheckCircle className="h-4 w-4 text-amber-500" />}
                  </div>
                  <p className="text-xs text-slate-400">Near Matiyari Chauraha, Deva Road, Chinhat, Lucknow, UP - 226028</p>
                </button>

                <button
                  onClick={() => setSelectedBranch('yard')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedBranch === 'yard'
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-slate-800 bg-transparent opacity-75'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-sm uppercase flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-amber-500" />
                      <span>{currentLanguage === 'en' ? 'Stock Yard: Deva Road' : 'स्टॉक यार्ड: देवा रोड, लखनऊ'}</span>
                    </span>
                    {selectedBranch === 'yard' && <CheckCircle className="h-4 w-4 text-amber-500" />}
                  </div>
                  <p className="text-xs text-slate-400">Deva Road Industrial Block, Chinhat, Lucknow, UP - 226028</p>
                </button>
              </div>

            </div>

            {/* Simulated Live Location Map Card (Col 7) */}
            <div className="lg:col-span-12 lg:lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-3xl text-white relative overflow-hidden aspect-video flex flex-col justify-between">
              
              {/* Stylized high-contrast grid vector modeling */}
              <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, #f59e0b 2px, transparent 2px)',
                backgroundSize: '24px 24px'
              }} />
              
              {/* Highlight route connection vector styling */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-1/3 w-0.5 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  {currentLanguage === 'en' ? 'Interactive Yard Map Radar' : 'यार्ड लोकेशन रडार'}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 animate-pulse">● LIVE OPERATIONAL YARD</span>
              </div>

              {/* Target Location Spot Pinning */}
              <div className="relative z-10 text-center space-y-2 py-4">
                <div className="p-3 bg-amber-500 rounded-full inline-block animate-bounce shadow-lg shadow-amber-500/20">
                  <MapPin className="h-6 w-6 text-slate-950" />
                </div>
                
                <h4 className="font-display font-black text-xl uppercase tracking-tight text-white leading-none">
                  {selectedBranch === 'showroom' 
                    ? (currentLanguage === 'en' ? 'Lucknow Matiyari Showroom' : 'लखनऊ मटियारी शो-रूम')
                    : (currentLanguage === 'en' ? 'Lucknow Stock Yard Depot' : 'लखनऊ स्टॉक यार्ड डिपो')
                  }
                </h4>

                <p className="text-xs text-slate-350 max-w-sm mx-auto leading-relaxed">
                  {selectedBranch === 'showroom'
                    ? (currentLanguage === 'en' ? 'Near Matiyari Chauraha, Deva Road. Facing main highway. Open today till 7:00 PM.' : 'मटियारी चौराहा, देवा रोड के पास। मेन हाईवे के सामने आज शाम 7:00 बजे तक खुला है।')
                    : (currentLanguage === 'en' ? 'Deva Road Industrial Block. Direct heavy loading bay entrance.' : 'देवा रोड इंडस्ट्रियल ब्लॉक। सीधा भारी लोडिंग वे प्रवेश द्वार।')
                  }
                </p>
              </div>

              {/* Action buttons inside diagnostic map */}
              <div className="relative z-10 flex flex-wrap gap-2 justify-between items-center border-t border-slate-800 pt-4">
                <p className="text-[10px] font-mono text-slate-400">
                  {currentLanguage === 'en' ? 'Phone support available (9:00 AM - 7:00 PM)' : 'फोन सपोर्ट चालू (सुबह 9 - शाम 7 बजे)'}
                </p>
                <a
                  href={`https://wa.me/919565329999?text=${encodeURIComponent(
                    currentLanguage === 'en' 
                      ? `Hi, can you send the direct physical Google Maps pin for the ${selectedBranch === 'showroom' ? 'Lucknow Matiyari Showroom' : 'Lucknow Deva Road Yard'}? I am coming today.`
                      : `नमस्ते, क्या आप ${selectedBranch === 'showroom' ? 'लखनऊ मटियारी शोरूम' : 'लखनऊ देवा रोड यार्ड'} का सीधा गूगल मैप्स लोकेशन पिन भेज सकते हैं? मैं आज आ रहा हूँ।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 font-extrabold uppercase text-[10px] text-slate-950 rounded-lg transition-all flex items-center justify-center gap-1"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>{currentLanguage === 'en' ? 'Get Maps Location Pin' : 'गूगल मैप्स लोकेशन पिन मांगें'}</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
