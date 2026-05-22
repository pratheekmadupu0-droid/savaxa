import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { RiSearchLine, RiArrowRightLine, RiFilterLine, RiSeedlingLine } from 'react-icons/ri'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import toast, { Toaster } from 'react-hot-toast'
import SEO from '../components/SEO'

export default function Products() {
  const { t } = useLanguage()
  const [productsList, setProductsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    if (!db) {
      setProductsList([])
      setLoading(false)
      return
    }

    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      // Sort by createdAt descending
      const sorted = data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      setProductsList(sorted)
      setLoading(false)
    }, (error) => {
      console.error(error)
      toast.error('Failed to sync products catalog')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const filteredProducts = productsList.filter(prod => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    if (!searchQuery) return matchesCategory;

    const query = searchQuery.toLowerCase();
    const nameMatch = prod.name ? prod.name.toLowerCase().includes(query) : false;
    const descMatch = prod.description ? prod.description.toLowerCase().includes(query) : false;
    const usageMatch = prod.usage ? prod.usage.toLowerCase().includes(query) : false;
    
    return matchesCategory && (nameMatch || descMatch || usageMatch);
  });

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50 min-h-screen text-slate-800">
      <SEO 
        title="Products Catalog | Insecticides, Fungicides, Herbicides | SAVAXA"
        description="Explore the complete SAVAXA crop care catalog. Learn about our advanced herbicides, high-efficacy insecticides, bio-stimulants, and protective plant fungicides."
        keywords="insecticides for agriculture, fungicides for plants, best herbicides for crops, selective weedicides, bio-stimulants, crop protection india"
      />
      <Toaster position="top-right" />
      
      {/* Meadow Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1920&q=80" 
          alt="Crop Pattern Watermark" 
          className="w-full h-full object-cover opacity-[0.07] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      <div className="absolute top-[10%] left-0 w-96 h-96 bg-blue-100/20/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[45%] right-0 w-[500px] h-[500px] bg-teal-100/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <p className="text-xs font-mono tracking-widest text-blue-650 uppercase font-bold">
            {t("SAVAXA CROP CARE PORTFOLIO", "సవాక్సా పంట రక్షణ శ్రేణి")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("OUR PRODUCTS", "మా ఉత్పత్తులు")}
          </h1>
          <p className="text-slate-550 text-sm leading-relaxed font-light">
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
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
                    : 'text-slate-550 hover:text-slate-800 hover:bg-slate-100 border-slate-200/60'
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
              placeholder={t("Search products, usage...", "ఉత్పత్తులు లేదా ఉపయోగాల కొరకు వెతకండి...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/60 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 transition duration-300 shadow-inner"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 font-display">
              {t("NO PRODUCTS FOUND", "ఉత్పత్తులేవీ లభించలేదు")}
            </h3>
            <p className="text-slate-500 text-xs font-light max-w-sm mx-auto">
              We couldn't find any products matching your specific query. Try clearing filters or altering search keywords.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="bg-blue-600 hover:bg-emerald-555 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-widest uppercase shadow-sm transition duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
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
                  onClick={() => setSelectedProduct(prod)}
                  className="glass-card border border-slate-200/60 rounded-3xl overflow-hidden flex flex-col justify-between p-5 space-y-6 group shadow-sm hover:border-slate-350 transition duration-300 cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Photo */}
                    <div className="h-52 rounded-2xl overflow-hidden relative">
                      <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-103 transition duration-500" />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-mono tracking-widest font-extrabold border border-emerald-255 px-2.5 py-0.5 rounded-full text-blue-600 uppercase">
                        {prod.category}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 font-display group-hover:text-blue-600 transition duration-200 leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed font-light font-sans line-clamp-3">
                        {prod.description}
                      </p>
                    </div>

                    {/* Quick Specs */}
                    {prod.usage && (
                      <div className="pt-2 border-t border-slate-100 text-[11px] font-mono flex justify-between">
                        <span className="text-slate-400 uppercase font-bold">Usage Summary:</span>
                        <span className="text-slate-700 font-sans font-bold truncate max-w-[200px]">{prod.usage}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProduct(prod)
                    }}
                    className="w-full py-3 bg-slate-50 hover:bg-blue-600 border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-white font-bold text-xs tracking-widest uppercase rounded-xl transition duration-300 flex items-center justify-center gap-1.5 shadow-inner"
                  >
                    {t("View Application Guide", "వాడే పద్ధతులు చూడండి")} <RiArrowRightLine />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Product Details Modal Window */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative my-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-2xl z-10"
            >
              &times;
            </button>

            <div className="space-y-6">
              {/* Header Image */}
              <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-slate-100 relative">
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-4 left-4 bg-blue-600 text-white text-[10px] font-mono tracking-widest font-extrabold px-3 py-1 rounded-full uppercase">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">{selectedProduct.name}</h2>
              </div>

              {/* Content Grid */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-600 mb-1">Product Description</h4>
                  <p className="font-light">{selectedProduct.description}</p>
                </div>

                {selectedProduct.dosage && (
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-600 mb-1">Dosage</h4>
                    <p className="font-light">{selectedProduct.dosage}</p>
                  </div>
                )}

                {selectedProduct.specifications && (
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-600 mb-1">Specifications</h4>
                    <p className="font-light">{selectedProduct.specifications}</p>
                  </div>
                )}

                {selectedProduct.cropDetails && (
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-600 mb-1">Target Crops / Crop Details</h4>
                    <p className="font-light">{selectedProduct.cropDetails}</p>
                  </div>
                )}

                {selectedProduct.usage && (
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-600 mb-1">Usage</h4>
                    <p className="font-light">{selectedProduct.usage}</p>
                  </div>
                )}

                {selectedProduct.howToBeUsed && (
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-600 mb-1">Directions (How to be used)</h4>
                    <p className="font-light">{selectedProduct.howToBeUsed}</p>
                  </div>
                )}

                {selectedProduct.cropEffects && (
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-600 mb-1">Effects to the plant / crop</h4>
                    <p className="font-light">{selectedProduct.cropEffects}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                {selectedProduct.brochurePdf ? (
                  <a
                    href={selectedProduct.brochurePdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 font-bold text-xs uppercase tracking-widest transition-colors"
                  >
                    View Brochure PDF &rarr;
                  </a>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition duration-300 shadow-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
