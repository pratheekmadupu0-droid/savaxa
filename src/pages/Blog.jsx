import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiSearchLine, RiCalendarLine, RiUserLine, RiArrowRightLine, RiInboxLine } from 'react-icons/ri'
import { useLanguage } from '../context/LanguageContext'

export default function Blog() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      category: "agronomy",
      title: t("Mitigating Fall Armyworm Mutations in Warm Climates", "వెచ్చని వాతావరణంలో లద్దె పురుగు నివారణ మార్గాలు"),
      desc: t("An in-depth review from Savaxa R&D labs detailing emerging insecticide resistances in corn crops and selective compound pathways.", "మొక్కజొన్న పంటలపై లద్దె పురుగు నివారణకు సవాక్సా పరిశోధనా విభాగం సూచించిన ప్రత్యేక యాజమాన్య పద్ధతులు."),
      date: t("May 18, 2026", "మే 18, 2026"),
      author: t("Dr. Vikram Seth", "డాక్టర్ విక్రమ్ సేథ్"),
      img: "/fall_armyworm.png"
    },
    {
      id: 2,
      category: "chemistry",
      title: t("Decoding Bio-agents & Active Biological Spores", "జీవ రసాయనాలు & బయో-ఉత్ప్రేరకాల విశేషాలు"),
      desc: t("How Savaxa processes bio-stimulants at hyperbaric low temperatures, maintaining perfect viable spore counts for root colonization.", "అత్యాధునిక పద్ధతిలో తయారైన సవాక్సా బయో-ఉత్ప్రేరకాలు పంటల వేర్ల వ్యవస్థను ఎలా బలోపేతం చేస్తాయో తెలుసుకోండి."),
      date: t("May 02, 2026", "మే 02, 2026"),
      author: t("Sarah Jenkins", "సారా జెంకిన్స్"),
      img: "/biological_spores.png"
    },
    {
      id: 3,
      category: "markets",
      title: t("Rising Fertilizer Costs Drive Focus on Target Efficiency", "ఎరువుల ఖర్చును తగ్గించే సమర్థవంతమైన పద్ధతులు"),
      desc: t("Market diagnostics proving selective low-dosage pesticide chemical applications deliver 28% higher seasonal net margins for soybean farms.", "తక్కువ మోతాదులో సమర్థవంతంగా పనిచేసే పురుగుమందుల వాడకం ద్వారా సోయాబీన్ పంటలలో 28% అదనపు లాభాలు సాధించండి."),
      date: t("April 22, 2026", "ఏప్రిల్ 22, 2026"),
      author: t("Dr. Koji Takahashi", "డాక్టర్ కోజీ తకహషి"),
      img: "/fertilizer_efficiency.png"
    },
    {
      id: 4,
      category: "agronomy",
      title: t("Preventing Barnyard Grass Encroachments in Direct Seeded Paddy", "నేరుగా విత్తిన వరిలో తుంగ గడ్డి / ఊద గడ్డి నివారణ"),
      desc: t("Guidelines for deploying selective pre and post emergence herbicides safely, and correct soil water flood timing protocols.", "వరి పంటలో మొలకకు ముందు మరియు మొలక తర్వాత వాడవలసిన కలుపు నాశకాలు మరియు సరైన యాజమాన్య పద్ధతులు."),
      date: t("April 08, 2026", "ఏప్రిల్ 08, 2026"),
      author: t("Amanda Sterling", "అమండా స్టెర్లింగ్"),
      img: "/direct_seeded_rice.png"
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <p className="text-xs font-mono tracking-widest text-emerald-655 uppercase font-bold">
            {t("SAVAXA AGRONOMY BULLETINS", "సవాక్సా వ్యవసాయ సమాచార పత్రిక")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("Agri-Intel Blog", "వ్యవసాయ సమాచారం (Blog)")}
          </h1>
          <p className="text-slate-550 text-sm leading-relaxed font-light">
            {t(
              "Stay up to date with molecular pesticide formulations, scientific diagnostics, and global agronomic market developments.",
              "కీటక నాశకాల తయారీ, పంట నిర్ధారణ పరీక్షలు మరియు అంతర్జాతీయ వ్యవసాయ మార్కెట్ విశేషాల సమాచారం ఇక్కడ తెలుసుకోండి."
            )}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 rounded-3xl border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center justify-between mb-12 shadow-sm bg-white/70">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto whitespace-nowrap scrollbar-none pb-2 md:pb-0">
            {[
              { id: 'all', name: t('All Bulletins', 'అన్ని కథనాలు') },
              { id: 'agronomy', name: t('Agronomy Science', 'వ్యవసాయ శాస్త్రం') },
              { id: 'chemistry', name: t('Green Chemistry', 'పర్యావరణ రసాయన శాస్త్రం') },
              { id: 'markets', name: t('Global Markets', 'ప్రపంచ మార్కెట్లు') }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold border transition duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-slate-200/60'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t("Search scientific bulletins...", "సమాచారం కోసం వెతకండి...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition duration-300 shadow-inner"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card border border-slate-200/60 rounded-3xl overflow-hidden flex flex-col justify-between p-6 space-y-6 group shadow-sm bg-white/80"
              >
                <div className="space-y-4">
                  {/* Photo with metadata category tab */}
                  <div className="h-60 rounded-2xl overflow-hidden relative">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-white/95 text-[8px] font-mono tracking-widest font-extrabold border border-emerald-250 px-2.5 py-0.5 rounded-full text-emerald-600 uppercase shadow-sm">
                      {post.category === 'agronomy' ? t('agronomy', 'వ్యవసాయశాస్త్రం') : post.category === 'chemistry' ? t('chemistry', 'రసాయనశాస్త్రం') : t('markets', 'మార్కెట్లు')}
                    </span>
                  </div>

                  {/* Title & description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-855 font-display group-hover:text-emerald-600 transition duration-200 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-light">
                      {post.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1.5"><RiCalendarLine /> {post.date}</span>
                    <span className="flex items-center gap-1.5 text-slate-500 font-bold"><RiUserLine /> {post.author}</span>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-500 font-extrabold tracking-widest uppercase flex items-center gap-1 transition duration-200">
                    {t("Read Bulletin", "పూర్తిగా చదవండి")} <RiArrowRightLine />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 space-y-4 shadow-sm">
            <RiInboxLine className="text-slate-400 text-5xl mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 font-display">
              {t("NO INTEL BULLETINS FOUND", "ఎలాంటి సమాచారం లభించలేదు")}
            </h3>
            <p className="text-slate-550 text-xs font-light max-w-sm mx-auto">
              {t(
                "We couldn't find any articles matching your search query. Try switching categories or clearing search keywords.",
                "మీరు వెతికిన పదాలకు సరిపోయే వ్యాసాలేవీ లేవు. దయచేసి వేరే పదాన్ని ఉపయోగించి మళ్లీ ప్రయత్నించండి."
              )}
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="bg-emerald-600 hover:bg-emerald-550 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-widest uppercase shadow-sm"
            >
              {t("Show All Bulletins", "అన్ని కథనాలను చూపించు")}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
