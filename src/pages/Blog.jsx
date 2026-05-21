import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiSearchLine, RiCalendarLine, RiUserLine, RiArrowRightLine, RiInboxLine } from 'react-icons/ri'

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      category: "agronomy",
      title: "Mitigating Fall Armyworm Mutations in Warm Climates",
      desc: "An in-depth review from Savaxa R&D labs detailing emerging insecticide resistances in corn crops and selective compound pathways.",
      date: "May 18, 2026",
      author: "Dr. Vikram Seth",
      img: "/fall_armyworm.png"
    },
    {
      id: 2,
      category: "chemistry",
      title: "Decoding Bio-agents & Active Biological Spores",
      desc: "How Savaxa processes bio-stimulants at hyperbaric low temperatures, maintaining perfect viable spore counts for root colonization.",
      date: "May 02, 2026",
      author: "Sarah Jenkins",
      img: "/biological_spores.png"
    },
    {
      id: 3,
      category: "markets",
      title: "Rising Fertilizer Costs Drive Focus on Target Efficiency",
      desc: "Market diagnostics proving selective low-dosage pesticide chemical applications deliver 28% higher seasonal net margins for soybean farms.",
      date: "April 22, 2026",
      author: "Dr. Koji Takahashi",
      img: "/fertilizer_efficiency.png"
    },
    {
      id: 4,
      category: "agronomy",
      title: "Preventing Barnyard Grass Encroachments in Direct Seeded Paddy",
      desc: "Guidelines for deploying selective pre and post emergence herbicides safely, and correct soil water flood timing protocols.",
      date: "April 08, 2026",
      author: "Amanda Sterling",
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
      {/* Beautiful Subtle Agrochemical Soil & Sprout Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=80" 
          alt="Soil Seedlings Watermark" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Decorative Warm Organic Blur Circles */}
      <div className="absolute top-[10%] right-0 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <p className="text-xs font-mono tracking-widest text-emerald-650 uppercase font-bold">SAVAXA AGRONOMY BULLETINS</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            AGRI-INTEL BLOG
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Stay up to date with molecular pesticide formulations, scientific diagnostics, and global agronomic market developments.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 rounded-3xl border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center justify-between mb-12 shadow-sm bg-white/70">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto whitespace-nowrap scrollbar-none pb-2 md:pb-0">
            {[
              { id: 'all', name: 'All Bulletins' },
              { id: 'agronomy', name: 'Agronomy Science' },
              { id: 'chemistry', name: 'Green Chemistry' },
              { id: 'markets', name: 'Global Markets' }
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
              placeholder="Search scientific bulletins..."
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
                      {post.category}
                    </span>
                  </div>

                  {/* Title & description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-850 font-display group-hover:text-emerald-600 transition duration-200 leading-snug">
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
                    Read Bulletin <RiArrowRightLine />
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
            <h3 className="text-lg font-bold text-slate-800 font-display">NO INTEL BULLETINS FOUND</h3>
            <p className="text-slate-500 text-xs font-light max-w-sm mx-auto">
              We couldn't find any articles matching your search query. Try switching categories or clearing search keywords.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="bg-emerald-600 hover:bg-emerald-550 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-widest uppercase shadow-sm"
            >
              Show All Bulletins
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
