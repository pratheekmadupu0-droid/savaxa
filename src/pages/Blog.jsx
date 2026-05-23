import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'

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
      img: "https://images.unsplash.com/photo-1599388330761-f402f1a30f14?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      category: "chemistry",
      title: "Decoding Bio-agents & Active Biological Spores",
      desc: "How Savaxa processes bio-stimulants at hyperbaric low temperatures, maintaining perfect viable spore counts for root colonization.",
      date: "May 02, 2026",
      author: "Sarah Jenkins",
      img: "https://images.unsplash.com/photo-1532187643603-c11c5b8b1a38?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      category: "markets",
      title: "Rising Fertilizer Costs Drive Focus on Target Efficiency",
      desc: "Market diagnostics proving selective low-dosage pesticide chemical applications deliver 28% higher seasonal net margins for soybean farms.",
      date: "April 22, 2026",
      author: "Dr. Koji Takahashi",
      img: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      category: "agronomy",
      title: "Preventing Barnyard Grass Encroachments in Direct Seeded Paddy",
      desc: "Guidelines for deploying selective pre and post emergence herbicides safely, and correct soil water flood timing protocols.",
      date: "April 08, 2026",
      author: "Amanda Sterling",
      img: "https://images.unsplash.com/photo-1588145293290-7a0e3f01ef87?auto=format&fit=crop&w=600&q=80"
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
    <div className="font-inter bg-[var(--color-brand-surface)] min-h-screen pt-32 pb-24">
      <SEO 
        title="Agri-Intel Blog & Crop Protection Bulletins | SAVAXA"
        description="Stay up to date with molecular pesticide formulations, scientific diagnostics, and global agronomic market developments from Savaxa R&D labs."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
            Agri-Intel Blog
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Scientific bulletins, molecular pesticide diagnostics, and agricultural crop protection yield insights from SAVAXA crop care labs.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[var(--color-blue-100)] flex flex-col md:flex-row gap-6 items-center justify-between mb-16 shadow-sm">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
            {[
              { id: 'all', name: 'All Bulletins' },
              { id: 'agronomy', name: 'Agronomy Science' },
              { id: 'chemistry', name: 'Green Chemistry' },
              { id: 'markets', name: 'Global Markets' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-xl text-sm tracking-wider uppercase font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[var(--color-brand-primary)] text-white shadow-md'
                    : 'bg-[var(--color-brand-surface)] text-[var(--color-brand-navy)] hover:bg-[var(--color-blue-100)]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search scientific bulletins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--color-brand-surface)] border border-[var(--color-blue-100)] rounded-xl pl-12 pr-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[var(--color-blue-100)]">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-2">No Articles Found</h3>
            <p className="text-slate-500 mb-6">We couldn't find any articles matching your search query.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-navy)] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-[var(--color-blue-100)] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  <div className="h-64 relative overflow-hidden bg-slate-100">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-[var(--color-blue-100)]">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-4 group-hover:text-[var(--color-brand-primary)] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                      {post.desc}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--color-blue-100)]">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[var(--color-brand-primary)]" /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[var(--color-brand-primary)]" /> {post.author}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="text-[var(--color-brand-primary)] hover:text-[var(--color-brand-navy)] font-bold text-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  )
}
