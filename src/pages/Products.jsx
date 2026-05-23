import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Search, Microscope, Leaf, ShieldCheck } from 'lucide-react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import toast, { Toaster } from 'react-hot-toast'

export default function Products() {
  const [productsList, setProductsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const location = useLocation()
  const navigate = useNavigate()
  
  // Determine category from URL or default to 'all'
  const getCategoryFromPath = () => {
    const path = location.pathname;
    if (path.includes('/insecticides')) return 'insecticides';
    if (path.includes('/herbicides')) return 'herbicides';
    if (path.includes('/fungicides')) return 'fungicides';
    return 'all';
  }
  
  const [activeCategory, setActiveCategory] = useState(getCategoryFromPath())

  useEffect(() => {
    setActiveCategory(getCategoryFromPath())
  }, [location.pathname])

  const handleTabSwitch = (cat) => {
    setActiveCategory(cat)
    if (cat === 'all') {
      navigate('/products')
    } else {
      navigate(`/products/${cat}`)
    }
  }

  useEffect(() => {
    if (!db) {
      setProductsList([])
      setLoading(false)
      return
    }

    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
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
    const matchesCategory = activeCategory === 'all' || prod.category?.toLowerCase() === activeCategory;
    if (!searchQuery) return matchesCategory;

    const query = searchQuery.toLowerCase();
    const nameMatch = prod.name ? prod.name.toLowerCase().includes(query) : false;
    const descMatch = prod.description ? prod.description.toLowerCase().includes(query) : false;
    const usageMatch = prod.usage ? prod.usage.toLowerCase().includes(query) : false;
    
    return matchesCategory && (nameMatch || descMatch || usageMatch);
  });

  const categoryIcons = {
    insecticides: <Microscope className="w-5 h-5" />,
    herbicides: <Leaf className="w-5 h-5" />,
    fungicides: <ShieldCheck className="w-5 h-5" />
  }

  return (
    <div className="font-body bg-[#020817] min-h-screen pt-32 pb-24 text-slate-300">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
            Our Products
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            High-efficacy agrochemicals scientifically formulated to protect your crops and ensure maximum yield.
          </p>
        </div>

        {/* Tab Switcher & Search */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-6 mb-12 shadow-sm">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
            {[
              { id: 'all', name: 'All Products' },
              { id: 'insecticides', name: 'Insecticides' },
              { id: 'herbicides', name: 'Herbicides' },
              { id: 'fungicides', name: 'Fungicides' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => handleTabSwitch(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[var(--color-brand-primary)] text-white shadow-md'
                    : 'bg-[var(--color-brand-surface)] text-[var(--color-brand-navy)] hover:bg-[var(--color-blue-100)]'
                }`}
              >
                {cat.id !== 'all' && categoryIcons[cat.id]}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--color-brand-surface)] border border-[var(--color-blue-100)] rounded-xl pl-12 pr-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand-primary)]"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[var(--color-blue-100)]">
            <h3 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-2">No Products Found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => (
                <motion.div
                  layout
                  key={prod.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-[var(--color-blue-100)] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group cursor-pointer"
                  onClick={() => setSelectedProduct(prod)}
                >
                  <div className="h-64 relative bg-slate-100 overflow-hidden p-6 flex items-center justify-center">
                    <img src={prod.img} alt={prod.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80" }} />
                    <div className="absolute top-4 left-4 bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-[var(--color-blue-100)]">
                      {prod.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-2 group-hover:text-[var(--color-brand-primary)] transition-colors line-clamp-1">{prod.name}</h3>
                    
                    {prod.targetPests && (
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
                        <span className="font-bold text-slate-800">Targets:</span> {prod.targetPests}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-4 border-t border-[var(--color-blue-100)]">
                      <button className="flex items-center justify-center w-full gap-2 text-[var(--color-brand-primary)] font-bold text-sm uppercase tracking-wider group-hover:bg-[var(--color-brand-primary)] group-hover:text-white py-3 rounded-lg transition-colors">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-brand-navy)]/80 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative my-8"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-[var(--color-brand-surface)] text-[var(--color-brand-navy)] rounded-full flex items-center justify-center font-bold text-xl hover:bg-[var(--color-blue-100)] transition-colors z-10"
              >
                &times;
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-slate-100 p-8 flex items-center justify-center">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="max-w-full h-auto object-contain" />
                </div>
                <div className="p-8 md:p-10 space-y-6">
                  <div>
                    <span className="bg-[var(--color-blue-100)] text-[var(--color-brand-primary)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-3xl font-montserrat font-bold text-[var(--color-brand-navy)]">{selectedProduct.name}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedProduct.description && (
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-1">Description</h4>
                        <p className="text-slate-700">{selectedProduct.description}</p>
                      </div>
                    )}
                    {selectedProduct.dosage && (
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-1">Dosage</h4>
                        <p className="text-slate-700">{selectedProduct.dosage}</p>
                      </div>
                    )}
                    {selectedProduct.targetPests && (
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-1">Target Pests</h4>
                        <p className="text-slate-700">{selectedProduct.targetPests}</p>
                      </div>
                    )}
                    {selectedProduct.usage && (
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-1">Usage Instructions</h4>
                        <p className="text-slate-700">{selectedProduct.usage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
