import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  Globe, 
  Cpu, 
  RefreshCw, 
  Layers,
  ExternalLink
} from 'lucide-react'
import SEO from '../components/SEO'

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isLive, setIsLive] = useState(false)

  // Curated premium fallback posts in case of API rate limits or offline state
  const fallbackPosts = [
    {
      title: "Mitigating Fall Armyworm Mutations in Warm Climates",
      description: "An in-depth review from Savaxa R&D labs detailing emerging insecticide resistances in corn crops and selective compound pathways.",
      publishedAt: "2026-05-18T10:00:00Z",
      author: "Dr. Vikram Seth",
      source: { name: "Savaxa R&D Labs" },
      urlToImage: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
      url: "/crop-solutions"
    },
    {
      title: "Decoding Bio-agents & Active Biological Spores",
      description: "How Savaxa processes bio-stimulants at hyperbaric low temperatures, maintaining perfect viable spore counts for root colonization.",
      publishedAt: "2026-05-02T14:30:00Z",
      author: "Sarah Jenkins",
      source: { name: "Agronomy Science Quarterly" },
      urlToImage: "https://images.unsplash.com/photo-1581093588401-f3c22d76ba0c?auto=format&fit=crop&w=600&q=80",
      url: "/certifications"
    },
    {
      title: "Rising Fertilizer Costs Drive Focus on Target Efficiency",
      description: "Market diagnostics proving selective low-dosage pesticide chemical applications deliver 28% higher seasonal net margins for soybean farms.",
      publishedAt: "2026-04-22T08:15:00Z",
      author: "Dr. Koji Takahashi",
      source: { name: "Agri-Market Trends" },
      urlToImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
      url: "/products"
    },
    {
      title: "Preventing Barnyard Grass Encroachments in Direct Seeded Paddy",
      description: "Guidelines for deploying selective pre and post emergence herbicides safely, and correct soil water flood timing protocols.",
      publishedAt: "2026-04-08T11:45:00Z",
      author: "Amanda Sterling",
      source: { name: "Weed Control Forum" },
      urlToImage: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80",
      url: "/crop-solutions"
    },
    {
      title: "Next-Gen Bio-Stimulants: Enhancing Root Architecture",
      description: "A comprehensive look at how organic micro-inoculants stimulate lateral roots, ensuring drought resistance during critical dry spells.",
      publishedAt: "2026-03-29T16:00:00Z",
      author: "Dr. Narendar Reddy",
      source: { name: "Savaxa Innovations" },
      urlToImage: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=600&q=80",
      url: "/about"
    },
    {
      title: "Technological Interventions in Smart Agri-Spraying",
      description: "Assessing the efficiency of drone-spraying arrays for selective weed targets compared to manual backpack chemical deployment.",
      publishedAt: "2026-03-12T09:30:00Z",
      author: "Ing. Marcus Vance",
      source: { name: "TechAgri Reviews" },
      urlToImage: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
      url: "/pest-control"
    }
  ]

  // Map category tab selection to specific NewsAPI queries
  const getQueryForCategory = (cat) => {
    switch (cat) {
      case 'agronomy':
        return 'agronomy OR "soil health" OR "crop protection"'
      case 'tech':
        return '"agriculture technology" OR "smart farming" OR "agri-tech"'
      case 'markets':
        return '"agriculture markets" OR "crop yield" OR "agro-industry"'
      default:
        return 'agriculture OR "crop protection" OR agronomy OR farming'
    }
  }

  const fetchAgricultureNews = async () => {
    setLoading(true)
    setError(false)
    
    const query = getQueryForCategory(activeCategory)
    const apiKey = 'f1bbed74f85740c28b53c758d9cd0a3d'
    // Search everything about agriculture, sorted by recency
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`

    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('API request failed')
      }
      
      const data = await response.json()
      
      if (data.status === 'ok' && data.articles && data.articles.length > 0) {
        // Filter out articles with missing essential fields
        const validArticles = data.articles.filter(
          art => art.title && art.description && art.title !== '[Removed]' && art.urlToImage
        )
        
        if (validArticles.length > 0) {
          setNews(validArticles)
          setIsLive(true)
        } else {
          // If no valid articles with images, fallback
          setNews(fallbackPosts)
          setIsLive(false)
        }
      } else {
        setNews(fallbackPosts)
        setIsLive(false)
      }
    } catch (err) {
      console.warn("News API fetch failed, loading premium curated fallbacks:", err)
      setNews(fallbackPosts)
      setIsLive(false)
      // We don't block the UI with an error state, we gracefully fall back so the page remains beautiful!
    } finally {
      setLoading(false)
    }
  }

  // Refetch when activeCategory changes
  useEffect(() => {
    fetchAgricultureNews()
  }, [activeCategory])

  const filteredNews = news.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.source && post.source.name.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch (e) {
      return dateStr
    }
  }

  return (
    <div className="font-body bg-[#020817] min-h-screen pt-36 pb-24 text-slate-300 overflow-x-hidden">
      <SEO 
        title="Agri-Intel News & Scientific Bulletins | SAVAXA"
        description="Stay updated with live real-time global agricultural breakthroughs, pesticide molecular diagnostics, and agronomic market trends."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16 relative">
          {/* Abstract glows */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-blue-500/10 backdrop-blur-md mb-6 shadow-inner">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
              {isLive ? 'Live Agriculture Update Feed' : 'Curated Bulletins'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white uppercase tracking-tight">
            Agri-Intel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Bulletins</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Stay up to date with global agricultural breakthroughs, crop protection guidelines, chemical news, and market insights compiled by SAVAXA crop care systems.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/40 p-4 rounded-3xl border border-blue-500/10 flex flex-col lg:flex-row gap-6 items-center justify-between mb-16 backdrop-blur-md shadow-2xl">
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto hide-scrollbar pb-2 lg:pb-0">
            {[
              { id: 'all', name: 'All News', icon: <Layers className="w-4 h-4" /> },
              { id: 'agronomy', name: 'Agronomy', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'tech', name: 'Smart Farming', icon: <Cpu className="w-4 h-4" /> },
              { id: 'markets', name: 'Markets & Yields', icon: <Globe className="w-4 h-4" /> }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3 rounded-xl text-xs tracking-wider uppercase font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-950/40 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full lg:w-auto items-center">
            {/* Search Box */}
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search agri news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            {/* Refresh Button */}
            <button 
              onClick={fetchAgricultureNews}
              disabled={loading}
              title="Refresh News Feed"
              className="p-3 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Loading skeleton screen */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-slate-900/20 border border-blue-500/5 rounded-3xl overflow-hidden h-[450px] flex flex-col animate-pulse">
                <div className="h-48 bg-slate-950/80" />
                <div className="p-6 flex-1 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 w-1/4 bg-slate-950/80 rounded" />
                    <div className="h-6 w-full bg-slate-950/80 rounded" />
                    <div className="h-6 w-3/4 bg-slate-950/80 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-950/80 rounded" />
                    <div className="h-4 w-5/6 bg-slate-950/80 rounded" />
                  </div>
                  <div className="h-10 w-full bg-slate-950/80 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/10 rounded-3xl border border-blue-500/10">
            <BookOpen className="w-14 h-14 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold text-white mb-2">No News Articles Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">We couldn't find any agricultural bulletins matching your search criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          /* News Feed Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((post, idx) => (
                <motion.article
                  layout
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900/30 border border-blue-500/10 rounded-3xl overflow-hidden shadow-lg hover:border-cyan-500/30 hover:shadow-cyan-500/5 transition-all duration-300 group flex flex-col h-[480px]"
                >
                  {/* Image banner */}
                  <div className="h-48 relative overflow-hidden bg-slate-950">
                    <img 
                      src={post.urlToImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80"
                      }}
                    />
                    
                    {/* Source Badge */}
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-blue-500/10">
                      {post.source ? post.source.name : 'Agri News'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      
                      {/* Meta elements */}
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-500" /> {formatDate(post.publishedAt)}</span>
                        {post.author && (
                          <span className="flex items-center gap-1 max-w-[120px] truncate"><User className="w-3.5 h-3.5 text-blue-500" /> {post.author}</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-heading font-bold text-white line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed font-normal">
                        {post.description}
                      </p>
                    </div>

                    {/* CTA link to external full article */}
                    <div className="pt-4 border-t border-slate-800">
                      {post.url.startsWith('/') ? (
                        <Link 
                          to={post.url} 
                          className="text-cyan-400 hover:text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-300"
                        >
                          Read Savaxa Guide <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <a 
                          href={post.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-cyan-400 hover:text-white font-bold text-xs uppercase tracking-widest flex items-center justify-between transition-colors group-hover:translate-x-1 duration-300"
                        >
                          <span className="flex items-center gap-1.5">
                            Read Full Story <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                          <ArrowRight className="w-4 h-4 text-cyan-400" />
                        </a>
                      )}
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
