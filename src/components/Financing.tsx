import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PiggyBank, Zap, FileText, CheckCircle2, ShieldCheck, HelpCircle, Calculator, Compass } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface FinancingProps {
  currentLanguage: Language;
  currentTheme: Theme;
}

export default function Financing({ currentLanguage, currentTheme }: FinancingProps) {
  const t = translations[currentLanguage];

  // EMI Calculator States
  const [vehiclePrice, setVehiclePrice] = useState(3.5); // Default ₹ 3.5 Lakhs
  const [downPayment, setDownPayment] = useState(0.8); // Default ₹ 80k down payment
  const [interestRate, setInterestRate] = useState(9.5); // 9.5% p.a.
  const [loanTenure, setLoanTenure] = useState(36); // 36 months

  // Result State
  const [monthlyEmi, setMonthlyEmi] = useState(0);

  // Recalculate EMI whenever sliders move
  useEffect(() => {
    const loanAmountInRupees = Math.max(0, (vehiclePrice - downPayment) * 100000);
    if (loanAmountInRupees <= 0) {
      setMonthlyEmi(0);
      return;
    }

    // Monthly interest rate calculation
    const r = interestRate / 12 / 100;
    const n = loanTenure;

    // Standard EMI formula: [P * r * (1+r)^n] / [((1+r)^n) - 1]
    if (r === 0) {
      setMonthlyEmi(Math.round(loanAmountInRupees / n));
    } else {
      const emi = (loanAmountInRupees * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyEmi(Math.round(emi));
    }
  }, [vehiclePrice, downPayment, interestRate, loanTenure]);

  const featuresList = [
    {
      title: t.financeFeature1Title,
      desc: t.financeFeature1Desc,
      icon: <PiggyBank className="h-6 w-6 text-amber-500" />,
    },
    {
      title: t.financeFeature2Title,
      desc: t.financeFeature2Desc,
      icon: <Zap className="h-6 w-6 text-amber-500" />,
    },
    {
      title: t.financeFeature3Title,
      desc: t.financeFeature3Desc,
      icon: <Compass className="h-6 w-6 text-amber-500" />,
    },
    {
      title: t.financeFeature4Title,
      desc: t.financeFeature4Desc,
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    },
  ];

  const banks = [
    { name: "State Bank of India (SBI)", rate: "8.55% - 9.80%" },
    { name: "HDFC Bank Auto Finance", rate: "8.75% - 10.5%" },
    { name: "ICICI Auto Loans", rate: "8.80% - 11.0%" },
    { name: "Mahindra & Mahindra Financial", rate: "9.20% - 12.5%" },
    { name: "Cholamandalam Finance", rate: "9.50% - 13.0%" },
  ];

  return (
    <div className={`py-12 md:py-16 transition-colors duration-300 min-h-screen ${
      currentTheme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            {t.financeTitle}
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.financeSubtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuresList.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl transition-all hover:scale-[1.01] hover:shadow-2xl card-glass"
              id={`finance-feature-${index}`}
            >
              <div className="p-3 bg-amber-500/10 rounded-xl inline-block mb-4">
                {feat.icon}
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{feat.title}</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Calculator (Col Span 7) */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl card-glass shadow-xl" id="emi-calculator-card">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-amber-500 rounded-xl text-slate-950">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl">{t.calcTitle}</h3>
                  <p className={`text-xs ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t.calcSubtitle}</p>
                </div>
              </div>

              {/* Sliders Form */}
              <div className="space-y-6">
                
                {/* 1. Vehicle Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-430">{t.calcVehiclePrice}</span>
                    <span className="font-bold text-amber-500">₹ {vehiclePrice.toFixed(2)} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.05"
                    value={vehiclePrice}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVehiclePrice(v);
                      if (downPayment >= v) {
                        setDownPayment(v - 0.1);
                      }
                    }}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    id="calc-price-slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>₹ 1 Lakh</span>
                    <span>₹ 10 Lakhs</span>
                  </div>
                </div>

                {/* 2. Down Payment */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-430">{t.calcDownPayment}</span>
                    <span className="font-bold text-amber-500">₹ {downPayment.toFixed(2)} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max={Math.max(0.2, vehiclePrice - 0.2)}
                    step="0.05"
                    value={downPayment}
                    onChange={(e) => setDownPayment(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    id="calc-downpay-slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>₹ 20,000</span>
                    <span>₹ {(vehiclePrice - 0.2).toFixed(2)} Lakhs</span>
                  </div>
                </div>

                {/* Grid 3 and 4: Interest Rate and Tenure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* 3. Interest Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-430">{t.calcInterestRate}</span>
                      <span className="font-bold text-amber-500">{interestRate.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="7.5"
                      max="15.0"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      id="calc-rate-slider"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>7.5%</span>
                      <span>15.0%</span>
                    </div>
                  </div>

                  {/* 4. Tenure */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-430">{t.calcTenure}</span>
                      <span className="font-bold text-amber-500">{loanTenure} Months</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="60"
                      step="12"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      id="calc-tenure-slider"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>1 Year</span>
                      <span>5 Years</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Dynamic Result Panel */}
              <div className="mt-8 p-5 bg-amber-500 rounded-2xl text-slate-950 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold block opacity-80">{t.calcMonthlyEmi}</span>
                  <span className="text-3xl sm:text-4xl font-display font-extrabold mt-1 block">
                    ₹ {monthlyEmi.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div className="text-right sm:text-left">
                  <span className="text-[11px] font-semibold block opacity-80">
                    {currentLanguage === 'en' ? 'Principal Loan Balance:' : 'मुख्य लोन राशि:'}
                  </span>
                  <span className="text-lg font-bold block mt-0.5">
                    ₹ {((vehiclePrice - downPayment) * 100000).toLocaleString('en-IN', {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>

              <p className={`text-[10px] text-center mt-4 ${currentTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                {t.calcContactNote}
              </p>

            </div>
          </div>

          {/* Guidelines and Documents checklist */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Supporting Banks Panel */}
            <div className="p-6 rounded-3xl card-glass shadow-md">
              <h4 className="font-display font-bold text-base mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-amber-500" />
                <span>{currentLanguage === 'en' ? 'Associated Banking Partners' : 'सहयोगी बैंक और वित्तीय संस्थान'}</span>
              </h4>
              <div className="space-y-3">
                {banks.map((b, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0 border-slate-800/40">
                    <span className="font-medium text-slate-350">{b.name}</span>
                    <span className="font-bold text-amber-500">{b.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents needed Checklists */}
            <div className="p-6 rounded-3xl card-glass shadow-md">
              <h4 className="font-display font-bold text-base mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                <span>{currentLanguage === 'en' ? 'Required Documents for Fast Loan' : 'तेज लोन पास के लिए आवश्यक दस्तावेज'}</span>
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                  <span>{currentLanguage === 'en' ? 'Aadhar Card & PAN Card (KYC Verification)' : 'आधार कार्ड और पैन कार्ड (KYC सत्यापन)'}</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                  <span>{currentLanguage === 'en' ? 'Bank Account Statement (Last 6 Months)' : 'पिछले 6 महीनों का बैंक खाता स्टेटमेंट'}</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                  <span>{currentLanguage === 'en' ? 'Address Proof (Electricity Bill or Rent Agreement)' : 'पता प्रमाण (बिजली बिल या किराया समझौता)'}</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                  <span>{currentLanguage === 'en' ? 'For Commercial Autos/Trucks: Commercial Driving License' : 'कमर्शियल ऑटो/ट्रक के लिए: कमर्शियल ड्राइविंग लाइसेंस'}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
