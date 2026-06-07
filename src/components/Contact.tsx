import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquareCode } from 'lucide-react';
import { Language, Theme, Inquiry } from '../types';
import { translations } from '../translations';

interface ContactProps {
  currentLanguage: Language;
  currentTheme: Theme;
}

export default function Contact({ currentLanguage, currentTheme }: ContactProps) {
  const t = translations[currentLanguage];

  // Selected physical branch location preview state
  const [selectedBranch, setSelectedBranch] = useState<'showroom' | 'yard'>('showroom');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Local list of inquiries raised in this session
  const [raisedInquiries, setRaisedInquiries] = useState<Inquiry[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name,
      phone,
      email,
      message,
      createdAt: new Date().toLocaleTimeString(),
    };

    setRaisedInquiries([newInquiry, ...raisedInquiries]);
    setIsSubmitted(true);
    
    // Clear form inputs
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');

    // Clear success banner state after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactDetails = [
    {
      label: t.contactAddressLabel,
      value: selectedBranch === 'showroom' 
        ? (currentLanguage === 'en' ? "Bala Ji Enterprises, Near Matiyari Chauraha, Deva Road, Chinhat, Lucknow, Uttar Pradesh - 226028" : "बालाजी एंटरप्राइजेज, मटियारी चौराहे के पास, देवा रोड, चिनहट, लखनऊ, उत्तर प्रदेश - 226028")
        : (currentLanguage === 'en' ? "Balaji Stock Yard & Commercial Depot, Deva Road Industrial Block, Chinhat, Lucknow, UP - 226028" : "बालाजी स्टॉक यार्ड और कमर्शियल डिपो, देवा रोड इंडस्ट्रियल ब्लॉक, चिनहट, लखनऊ, यूपी - 226028"),
      icon: <MapPin className="h-5 w-5 text-amber-500" />,
    },
    {
      label: t.contactPhoneLabel,
      value: "+91 95653 29999",
      icon: <Phone className="h-5 w-5 text-amber-500" />,
    },
    {
      label: t.contactHoursLabel,
      value: t.contactHoursValue,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
    },
  ];

  return (
    <div className={`py-12 md:py-16 transition-colors duration-300 min-h-screen ${
      currentTheme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headers block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight">
            {t.contactTitle}
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {currentLanguage === 'en'
              ? "Visit Balaji Enterprises showroom to check out and test drive highly certified pre-owned vehicles."
              : "बेहतरीन गाड़ियों के ऑन-स्पॉट टेस्ट ड्राइव के लिए हमारे मटियारी चौराहा देवा रोड, चिनहट शोरूम पर आएं।"}
          </p>

          {/* Quick branch switcher toggles at top */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setSelectedBranch('showroom')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                selectedBranch === 'showroom'
                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-md'
                  : currentTheme === 'dark'
                    ? 'border-slate-800 text-slate-400 hover:text-white bg-slate-900/30'
                    : 'border-slate-200 text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              🏢 {currentLanguage === 'en' ? 'Main Showroom' : 'मुख्य शो-रूम (Matiyari)'}
            </button>
            <button
              onClick={() => setSelectedBranch('yard')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                selectedBranch === 'yard'
                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-md'
                  : currentTheme === 'dark'
                    ? 'border-slate-800 text-slate-400 hover:text-white bg-slate-900/30'
                    : 'border-slate-200 text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              🚜 {currentLanguage === 'en' ? 'Lucknow Stock Yard' : 'स्टॉक यार्ड (Deva Road)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Left: Contact points list + Real Interactive Live Google Map Iframe (Grid 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {contactDetails.map((detail, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl flex items-start gap-4 transition-all card-glass"
                id={`contact-detail-${index}`}
              >
                <div className="p-3 bg-amber-500/10 rounded-xl shrink-0 mt-0.5">
                  {detail.icon}
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-extrabold mb-1">{detail.label}</h4>
                  <p className="text-sm font-black leading-relaxed">{detail.value}</p>
                </div>
              </div>
            ))}

            {/* Live Interactive Location Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-800/10 dark:border-slate-850 p-1.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shadow-xl">
              <div className="relative rounded-2xl overflow-hidden aspect-video w-full bg-slate-950">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.5640411905383!2d81.0424596!3d26.885588799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be394fd48c97d%3A0x72fc50b794cd5e3d!2sbala%20ji%20enterprises%20near%20matiyari%20chauraha%20deva%20road%20chinhat%20lucknow!5e0!3m2!1sen!2sin!4v1780853886268!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Balaji Enterprises Google Map Location"
                />
              </div>
              <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="text-[10px] uppercase font-mono bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black">
                    Live Google Map
                  </span>
                  <span className="block text-xs font-semibold text-slate-400 mt-1">
                    {currentLanguage === 'en' ? 'Bala Ji Enterprises, Near Matiyari Chauraha' : 'बालाजी एंटरप्राइजेज, मटियारी चौराहा के पास'}
                  </span>
                </div>
                <a
                  href={`https://wa.me/919565329999?text=${encodeURIComponent(
                    currentLanguage === 'en'
                      ? "Hi Balaji Enterprises, please share your precise Google map pin so I can visit today."
                      : "नमस्ते बालाजी एंटरप्राइजेज, कृपया अपनी दुकान का गूगल मैप्स लोकेशन पिन शेयर करें ताकि मैं आज ही गाड़ी देख सकूं।"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black uppercase text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>{currentLanguage === 'en' ? 'Get Direct GPS Pin' : 'GPS लोकेशन पिन पाएं'}</span>
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl card-glass shadow-xl" id="contact-inquiry-form-card">
              
              <h3 className="font-display font-extrabold text-xl mb-6">
                {t.contactFormTitle}
              </h3>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-2xl flex items-center gap-3"
                  id="inquiry-success-banner"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-semibold">{t.contactFormSuccess}</span>
                </motion.div>
              )}

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.contactFormName} *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={currentLanguage === 'en' ? 'e.g. Ramesh Singh' : 'जैसे: रमेश सिंह'}
                      className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        currentTheme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                          : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                      }`}
                      id="input-inq-name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.contactFormPhone} *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={currentLanguage === 'en' ? 'e.g. +91 98765 43210' : 'जैसे: +91 98765 43210'}
                      className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        currentTheme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                          : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                      }`}
                      id="input-inq-phone"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.contactFormEmail}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={currentLanguage === 'en' ? 'yourname@example.com (Optional)' : 'yourname@example.com (वैकल्पिक)'}
                    className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                      currentTheme === 'dark'
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                        : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                    }`}
                    id="input-inq-email"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.contactFormMsg} *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={currentLanguage === 'en' ? 'Which vehicle or budget are you looking for? Write details here...' : 'आप कौन सी गाड़ी या किस मूल्य में गाड़ी ढूंढ रहे हैं? यहाँ लिखें...'}
                    className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                      currentTheme === 'dark'
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500'
                        : 'bg-white border-slate-250 text-slate-900 focus:border-amber-500'
                    }`}
                    id="input-inq-message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all shadow-md hover:shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  id="submit-inquiry-btn"
                >
                  <Send className="h-4.5 w-4.5" />
                  <span>{t.contactFormSubmit}</span>
                </button>

              </form>

            </div>
          </div>

        </div>

        {/* Live Active Raised Inquiries Logs (Interactive feedback panel) */}
        {raisedInquiries.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-800">
            <h4 className="font-display font-extrabold text-lg mb-4 flex items-center gap-2">
              <MessageSquareCode className="h-5 w-5 text-amber-500" />
              <span>{currentLanguage === 'en' ? 'Your Raised Inquiries this session:' : 'इस सेशन में भेजी गई पूछताछ:'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {raisedInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-4 rounded-xl border text-sm ${
                    currentTheme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                  id={`saved-inquiry-${inq.id}`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-amber-550">{inq.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{inq.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-400 block"><span className="font-semibold text-slate-350">Phone:</span> {inq.phone}</p>
                  <p className="text-xs mt-1.5 leading-relaxed text-slate-250 font-medium">"{inq.message}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
