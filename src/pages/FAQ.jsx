import { useState } from 'react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

export default function FAQ() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqsList = [
    {
      q: t("What is SAVAXA Crop Care?", "సవాక్సా పంట రక్షణ అంటే ఏమిటి?"),
      a: t(
        "SAVAXA is a next-generation bio-agricultural technology brand providing high-efficacy pesticides, fungicides, herbicides, and premium biostimulants designed to increase crop yield and protect farms.",
        "సవాక్సా అనేది పంట దిగుబడిని పెంచడానికి మరియు పొలాలను రక్షించడానికి రూపొందించబడిన అధిక సామర్థ్యం గల పురుగుమందులు, శిలీంద్రనాశకాలు, కలుపునాశనులు మరియు బయో-ఉత్ప్రేరకాలను అందించే ఆధునిక వ్యవసాయ సాంకేతిక బ్రాండ్."
      )
    },
    {
      q: t("Are your agricultural chemicals safe for all crops?", "మీ వ్యవసాయ రసాయనాలు అన్ని పంటలకు సురక్షితమేనా?"),
      a: t(
        "Yes, our formulations are selectively tailored for specific crop families. Every product has custom guidelines on dosage and application methods. Refer to our detailed Products catalog and downloadable application guides.",
        "అవును, మా ఉత్పత్తులు నిర్దిష్ట పంటల కొరకు ప్రత్యేకంగా తయారుచేయబడ్డాయి. ప్రతి ఉత్పత్తికి మోతాదు మరియు అప్లికేషన్ పద్ధతులపై వివరణాత్మక మార్గదర్శకాలు ఉంటాయి. మా ఉత్పత్తుల కేటలాగ్ చూడండి."
      )
    },
    {
      q: t("How can I register as an authorized SAVAXA dealer?", "నేను సవాక్సా అధీకృత డీలర్‌గా ఎలా నమోదు చేసుకోవాలి?"),
      a: t(
        "Dealers can easily register via our 'Dealers Portal'. Simply click Google Sign-In, fill in your business name, license details, and phone number. Our team will verify and list your hub.",
        "మా డీలర్స్ పోర్టల్ ద్వారా డీలర్లు సులభంగా నమోదు చేసుకోవచ్చు. గూగుల్ సైన్-ఇన్ క్లిక్ చేసి, మీ వ్యాపార వివరాలు నమోదు చేయండి. మా బృందం వాటిని ధృవీకరిస్తుంది."
      )
    },
    {
      q: t("What are the best bio-stimulants for rice and tomato crops?", "వరి మరియు టమోటా పంటలకు ఉత్తమమైన బయో-ఉత్ప్రేరకాలు ఏవి?"),
      a: t(
        "SAVAXA Biostimulants are outstanding for boosting green mass, increasing chlorophyll, and promoting root density in rice paddies and vegetable crops like tomatoes.",
        "ఆకుపచ్చదనాన్ని పెంచడానికి, క్లోరోఫిల్‌ను పెంచడానికి మరియు వరి, టమోటా వంటి కూరగాయల పంటలలో వేర్ల సాంద్రతను ప్రోత్సహించడానికి సవాక్సా బయో-ఉత్ప్రేరకాలు అద్భుతంగా పనిచేస్తాయి."
      )
    },
    {
      q: t("Where can I download the product catalog brochures?", "నేను ఉత్పత్తి కేటలాగ్ బ్రోచర్‌లను ఎక్కడ డౌన్‌లోడ్ చేసుకోవచ్చు?"),
      a: t(
        "All our crop protection guidelines, chemical properties, and formulation brochures are available as PDF downloads on our 'Downloads' page.",
        "మా పంట రక్షణ మార్గదర్శకాలు, రసాయన లక్షణాలు మరియు ఫార్ములేషన్ల బ్రోచర్‌లు మా డౌన్‌లోడ్ల పేజీలో PDF ఫార్మాట్‌లో అందుబాటులో ఉన్నాయి."
      )
    }
  ];

  const filteredFaqs = faqsList.filter(
    faq =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  // Generate Google Schema Markup for FAQ Page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsList.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="font-sans pt-32 pb-20 bg-slate-50 text-slate-800 min-h-screen relative overflow-hidden">
      <SEO 
        title="Frequently Asked Questions (FAQ) | SAVAXA Crop Care Solutions"
        description="Find answers to common questions about agricultural pesticides, herbicides, dealer registration, and plant protection methodologies."
        keywords="agriculture faq, crop protection questions, best pesticide brand, pesticide company in india, savaxa crop care"
        schema={faqSchema}
      />

      {/* Decorative patterns */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-96 h-96 bg-teal-100/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-12">
          <p className="text-xs font-mono tracking-widest text-emerald-600 uppercase font-bold">
            {t("QUESTIONS & ANSWERS", "ప్రశ్నలు & సమాధానాలు")}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("Frequently Asked Questions", "తరచుగా అడిగే ప్రశ్నలు")}
          </h1>
          <p className="text-slate-500 text-sm font-light">
            {t("Find professional guidelines on SAVAXA products, dealer networks, and crop applications.", "సవాక్సా ఉత్పత్తులు, డీలర్ నెట్‌వర్క్‌లు మరియు అప్లికేషన్లపై సమాధానాలు ఇక్కడ పొందండి.")}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder={t("Search questions...", "ప్రశ్నలను వెతకండి...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:border-emerald-600 transition shadow-sm"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm transition hover:border-slate-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left transition hover:bg-slate-50/50"
                >
                  <h3 className="font-bold text-slate-800 text-sm md:text-base font-display">
                    {faq.q}
                  </h3>
                  {isOpen ? (
                    <FiChevronUp className="text-emerald-600 text-lg flex-shrink-0 ml-4" />
                  ) : (
                    <FiChevronDown className="text-slate-400 text-lg flex-shrink-0 ml-4" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-650 leading-relaxed font-light font-sans border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
