import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { RiSearchLine, RiArrowRightLine, RiFilterLine, RiSeedlingLine, RiFlaskLine, RiShieldLine, RiPlantLine } from 'react-icons/ri'

export default function Products() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase())
    } else {
      setActiveCategory('all')
    }
  }, [categoryParam])

  const productsList = [
    {
      id: "sav-ultra-1",
      name: t("Shield-Ultra Insecticide", "షీల్డ్-అల్ట్రా కీటకనాశని (Shield-Ultra)"),
      category: "insecticides",
      desc: t("High-kill contact and systemic insecticide formulated to defeat leaf bolls, cotton bollworms, thrips, and aphids.", "పత్తి, మిరప, టమోటా పంటల్లో కాయతొలిచే పురుగులు, తెల్లదోమ మరియు తామర పురుగుల నివారణకు అత్యుత్తమ కీటకనాశని."),
      pack: t("100ml, 250ml, 500ml, 1 Litre", "100 మి.లీ, 250 మి.లీ, 500 మి.లీ, 1 లీటరు"),
      crops: t("Cotton, Paddy, Tomato, Chili, Maize", "పత్తి, వరి, టమోటా, మిరప, మొక్కజొన్న"),
      img: "https://images.unsplash.com/photo-1595348020949-87cdfbd44174?auto=format&fit=crop&w=400&q=80",
      featured: true
    },
    {
      id: "sav-weed-2",
      name: t("Vanquish-X Herbicide", "వాన్క్విష్-X కలుపునాశని (Vanquish-X)"),
      category: "herbicides",
      desc: t("Selective pre and post emergence herbicide designed to suppress grassy weeds and broadleaf sedges in wet rice paddy fields.", "వరి పంటలో వెడల్పాటి ఆకు కలుపు, తుంగ మరియు గడ్డి జాతి కలుపును సమర్థవంతంగా నివారించే కలుపునాశని."),
      pack: t("250ml, 500ml, 1 Litre", "250 మి.లీ, 500 మి.లీ, 1 లీటరు"),
      crops: t("Transplanted Paddy & Direct Seeded Rice", "నాట్లు వేసిన వరి & నేరుగా విత్తిన వరి"),
      img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80",
      featured: true
    },
    {
      id: "sav-fung-3",
      name: t("BioRoot Fungicide", "బయోరూట్ శిలీంద్రనాశని (BioRoot)"),
      category: "fungicides",
      desc: t("Protective and systemic fungicide shielding seedling nursery beds from Pythium root rot, leaf blights, and mildews.", "నారుమడులలో నారుకుళ్లు తెగులు, ఆకుమచ్చ తెగులు మరియు బూడిద తెగులు నుండి రక్షించే శిలీంద్రనాశని."),
      pack: t("250g, 500g, 1kg powder bags", "250 గ్రా, 500 గ్రా, 1 కిలో పౌడర్ బ్యాగులు"),
      crops: t("Tomato, Chili, Nursery Seedlings, Potato", "టమోటా, మిరప, పంట నారుమడులు, బంగాళాదుంప"),
      img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
      featured: true
    },
    {
      id: "sav-stim-4",
      name: t("SOLVO Biostimulant", "సోల్వో బయో-ఉత్ప్రేరకం (SOLVO)"),
      category: "biostimulants",
      desc: t("Premium organic seaweed extract growth catalyst that increases tillering, panicle formation, and flower density.", "పంట పెరుగుదల, అధిక పూత, కాయల సైజు మరియు గరిష్ట దిగుబడిని పెంచే సేంద్రీయ బయో-ఉత్ప్రేరకం."),
      pack: t("250ml, 500ml, 1 Litre", "250 మి.లీ, 500 మి.లీ, 1 లీటరు"),
      crops: t("Paddy, Cotton, Tomato, Cucurbits, Fruit Crops", "వరి, పత్తి, టమోటా, గుమ్మడి జాతి, పండ్ల పంటలు"),
      img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=400&q=80",
      featured: false
    }
  ]

  const filteredProducts = productsList.filter(prod => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.crops.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Product Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1920&q=80" 
          alt=" Vibe Crop Pattern Watermark" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Soft natural green/blue background overlays */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[45%] right-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <p className="text-xs font-mono tracking-widest text-emerald-650 uppercase font-bold">
            {t("SAVAXA CROP CARE PORTFOLIO", "సవాక్సా పంట రక్షణ శ్రేణి")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("OUR PRODUCTS", "మా ఉత్పత్తులు")}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {t(
              "Browse our range of high-efficacy pesticides, selective weedicides, protective fungicides, and premium organic biostimulants.",
              "ఉత్తమ నాణ్యత కలిగిన పురుగుమందులు, కలుపునాశనులు, శిలీంద్రనాశనులు మరియు సేంద్రీయ ఉత్ప్రేరకాల శ్రేణిని ఇక్కడ చూడండి."
            )}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 rounded-3xl border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center justify-between mb-12 shadow-sm bg-white/70">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto whitespace-nowrap scrollbar-none pb-2 md:pb-0">
            {[
              { id: 'all', name: t('All Crop Protection', 'అన్ని ఉత్పత్తులు') },
              { id: 'insecticides', name: t('Insecticides', 'కీటకనాశకాలు') },
              { id: 'herbicides', name: t('Herbicides', 'కలుపునాశకాలు') },
              { id: 'fungicides', name: t('Fungicides', 'శిలీంద్రనాశకాలు') },
              { id: 'biostimulants', name: t('Biostimulants', 'బయో-ఉత్ప్రేరకాలు') }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold transition duration-300 border ${
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
              placeholder={t("Search target crops, pests...", "పంటలు లేదా తెగుళ్ల కొరకు వెతకండి...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/60 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition duration-300 shadow-inner"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                layout
                key={prod.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="glass-card border border-slate-200/60 rounded-3xl overflow-hidden flex flex-col justify-between p-5 space-y-6 group shadow-sm hover:border-slate-300 transition duration-300"
              >
                <div className="space-y-4">
                  {/* Photo with metadata category tab */}
                  <div className="h-52 rounded-2xl overflow-hidden relative">
                    <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-mono tracking-widest font-extrabold border border-emerald-200 px-2.5 py-0.5 rounded-full text-emerald-600 uppercase">
                      {prod.category === 'insecticides' ? t('Insecticides', 'కీటకనాశని') : prod.category === 'herbicides' ? t('Herbicides', 'కలుపునాశని') : prod.category === 'fungicides' ? t('Fungicides', 'శిలీంద్రనాశని') : t('Biostimulants', 'బయో-ఉత్ప్రేరకం')}
                    </span>
                  </div>

                  {/* Title & description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 font-display group-hover:text-emerald-600 transition duration-200 leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed font-light font-sans line-clamp-3">
                      {prod.desc}
                    </p>
                  </div>

                  {/* Product quick specs */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase font-bold">{t("Target Crops:", "ఆశించే పంటలు:")}</span>
                      <span className="text-slate-700 font-sans font-bold">{prod.crops}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase font-bold">{t("Available Pack:", "లభించు ప్యాకింగ్:")}</span>
                      <span className="text-slate-700 font-bold">{prod.pack}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/products/details?id=${prod.id}`}
                  className="w-full py-3 bg-slate-50 hover:bg-emerald-600 border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-white font-bold text-xs tracking-widest uppercase rounded-xl transition duration-300 flex items-center justify-center gap-1.5 shadow-inner"
                >
                  {t("View Application Guide", "వాడే పద్ధతులు చూడండి")} <RiArrowRightLine />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 font-display">
              {t("NO PRODUCTS FOUND", "ఉత్పత్తులేవీ లభించలేదు")}
            </h3>
            <p className="text-slate-550 text-xs font-light max-w-sm mx-auto">
              {t(
                "We couldn't find any Savaxa products matching your specific query. Try clearing filters or altering search keywords.",
                "మీరు వెతికిన పదాలకు సరిపోయే సవాక్సా ఉత్పత్తులేవీ లేవు. దయచేసి వెతకడానికి వేరే పదాలను ఉపయోగించండి."
              )}
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="bg-emerald-600 hover:bg-emerald-555 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-widest uppercase shadow-sm transition duration-300"
            >
              {t("Reset Products Filter", "ఫిల్టర్లను రీసెట్ చేయండి")}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
