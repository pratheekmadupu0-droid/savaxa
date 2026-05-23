import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircleQuestion } from 'lucide-react';
import SEO from '../components/SEO';

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqsList = [
    {
      q: "What is SAVAXA Crop Care?",
      a: "SAVAXA is a next-generation bio-agricultural technology brand providing high-efficacy pesticides, fungicides, herbicides, and premium biostimulants designed to increase crop yield and protect farms."
    },
    {
      q: "Are your agricultural chemicals safe for all crops?",
      a: "Yes, our formulations are selectively tailored for specific crop families. Every product has custom guidelines on dosage and application methods. Refer to our detailed Products catalog and downloadable application guides."
    },
    {
      q: "How can I register as an authorized SAVAXA dealer?",
      a: "Dealers can easily register via our 'Dealers Portal'. Simply click Google Sign-In, fill in your business name, license details, and phone number. Our team will verify and list your hub."
    },
    {
      q: "What are the best bio-stimulants for rice and tomato crops?",
      a: "SAVAXA Biostimulants are outstanding for boosting green mass, increasing chlorophyll, and promoting root density in rice paddies and vegetable crops like tomatoes."
    },
    {
      q: "Where can I download the product catalog brochures?",
      a: "All our crop protection guidelines, chemical properties, and formulation brochures are available as PDF downloads on our 'Downloads' page."
    }
  ];

  const filteredFaqs = faqsList.filter(
    faq =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="font-inter bg-[var(--color-brand-surface)] min-h-screen pt-32 pb-24 relative overflow-hidden">
      <SEO 
        title="Frequently Asked Questions (FAQ) | SAVAXA Crop Care Solutions"
        description="Find answers to common questions about agricultural pesticides, herbicides, dealer registration, and plant protection methodologies."
        schema={faqSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16">
          <div className="w-16 h-16 bg-white border border-[var(--color-blue-100)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MessageCircleQuestion className="w-8 h-8 text-[var(--color-brand-primary)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Find professional guidelines on SAVAXA products, dealer networks, and crop applications.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[var(--color-blue-100)] rounded-2xl pl-14 pr-6 py-4 text-[var(--color-brand-navy)] font-medium focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all shadow-sm"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[var(--color-blue-100)]">
              <p className="text-slate-500 font-medium">No matching questions found.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={index} 
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[var(--color-brand-primary)] shadow-md' : 'border-[var(--color-blue-100)] shadow-sm hover:border-[var(--color-brand-primary)]'}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left transition-colors bg-white hover:bg-[var(--color-brand-surface)]"
                  >
                    <h3 className={`font-montserrat font-bold text-sm md:text-base pr-8 ${isOpen ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-brand-navy)]'}`}>
                      {faq.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${isOpen ? 'bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)]' : 'bg-white text-slate-400 border-[var(--color-blue-100)]'}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-[var(--color-blue-100)] pt-4 bg-white">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
