import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
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
  ExternalLink,
  X
} from 'lucide-react'
import SEO from '../components/SEO'

export default function Blog() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const handleCloseModal = () => {
    setSelectedPost(null)
    if (id !== undefined) {
      navigate('/blog')
    }
  }

  // Auto-open selected blog post if ID is in parameters
  useEffect(() => {
    if (id !== undefined && news.length > 0) {
      const index = parseInt(id, 10)
      if (!isNaN(index) && index >= 0 && index < news.length) {
        setSelectedPost(news[index])
      }
    }
  }, [id, news])

  // Curated premium fallback posts in case of API rate limits or offline state
  const fallbackPosts = [
    {
      title: "Mitigating Fall Armyworm Mutations in Warm Climates",
      description: "An in-depth review from Savaxa R&D labs detailing emerging insecticide resistances in corn crops and selective compound pathways.",
      publishedAt: "2026-05-18T10:00:00Z",
      author: "Dr. Vikram Seth",
      source: { name: "Savaxa R&D Labs" },
      urlToImage: "/cotton_solution.png",
      url: "/crop-solutions",
      fullContent: `Emergency surveillance reports from the SAVAXA R&D laboratories indicate that Fall Armyworm (Spodoptera frugiperda) populations across warm sub-tropical and tropical crop belts are developing accelerated genetic mutations. These mutations confer increased resistance to several standard organophosphates and traditional synthetic pyrethroid treatments. 

Our molecular agronomy team has identified two primary genetic pathways responsible for this mutation. These pathways alter acetylcholinesterase receptor structures, rendering old-generation chemical treatments ineffective. 

To mitigate these threats, SAVAXA recommends the following immediate action protocol:
1. Alternating chemical classes by introducing Shield-Ultra, a high-targeted systemic formulation.
2. Integrating bio-agents to target larvae during early instar stages.
3. Conducting regular field scouting at dawn and dusk when armyworm activity peaks.

Early detection combined with rapid deployment of targeted blockers remains the single most effective defense against widespread crop defoliation.`
    },
    {
      title: "Decoding Bio-agents & Active Biological Spores",
      description: "How Savaxa processes bio-stimulants at hyperbaric low temperatures, maintaining perfect viable spore counts for root colonization.",
      publishedAt: "2026-05-02T14:30:00Z",
      author: "Sarah Jenkins",
      source: { name: "Agronomy Science Quarterly" },
      urlToImage: "/tomato_solution.png",
      url: "/crop-solutions",
      fullContent: `Biological stimulants represent the next frontier in ecological agronomy. However, a major challenge in biological crop protection is maintaining spore viability during chemical manufacturing, storage, and field application. Active biological spores are highly sensitive to thermal fluctuations and ambient oxidation.

At Savaxa, our production lines utilize hyperbaric low-temperature spray drying. This proprietary engineering process flash-freezes active bio-inoculants under pressurized nitrogen, locking them into an inert, highly stable state. 

When applied to the field, these biological spores quickly hydrate and colonize root networks. They establish a symbiotic relationship, secreting natural defensive compounds that block root pathogens (like Fusarium and Pythium) while boosting overall nutrient absorption rates by up to 28%.`
    },
    {
      title: "Rising Fertilizer Costs Drive Focus on Target Efficiency",
      description: "Market diagnostics proving selective low-dosage pesticide chemical applications deliver 28% higher seasonal net margins for soybean farms.",
      publishedAt: "2026-04-22T08:15:00Z",
      author: "Dr. Koji Takahashi",
      source: { name: "Agri-Market Trends" },
      urlToImage: "/pulses_solution.png",
      url: "/crop-solutions",
      fullContent: `Global fertilizer price volatility is forcing commercial farming operations to drastically rethink nutrient application techniques. Broad-spectrum broadcast spraying is no longer economically viable. Instead, smart farming systems are moving toward targeted spot-spraying and high-efficiency formulations.

Field diagnostics spanning 15,000 acres of soybean farms have proven that low-dosage, high-concentration chemical applications delivered directly to the root zone or foliage achieve superior results at a fraction of the cost. 

By applying SAVAXA's SOLVO nutrition and BioRoot stimulants in highly targeted bands, test farms reported a 28% increase in seasonal net margins. This is achieved by reducing chemical waste and preventing nutrient run-off into surrounding water systems.`
    },
    {
      title: "Preventing Barnyard Grass Encroachments in Direct Seeded Paddy",
      description: "Guidelines for deploying selective pre and post emergence herbicides safely, and correct soil water flood timing protocols.",
      publishedAt: "2026-04-08T11:45:00Z",
      author: "Amanda Sterling",
      source: { name: "Weed Control Forum" },
      urlToImage: "/rice_solution.png",
      url: "/crop-solutions",
      fullContent: `Barnyard grass (Echinochloa crus-galli) is one of the most destructive weeds affecting direct-seeded paddy (DSR) fields, mimicking the morphology of young rice plants and stealing vital nitrogen reserves. Left unchecked, it can lead to total crop failure.

Successful management requires a precise combination of chemical pre-emergence blockades and strategic water flooding. 

SAVAXA’s Weed Control Forum recommends applying pre-emergence herbicides within 3 days of seeding, followed by a selective post-emergence spray when weeds reach the 2-leaf stage. Once herbicides have been absorbed, maintaining a consistent water level of 5-10 cm across paddy fields creates an anaerobic environment that naturally suppresses further weed germination while allowing the rice seedlings to flourish.`
    },
    {
      title: "Next-Gen Bio-Stimulants: Enhancing Root Architecture",
      description: "A comprehensive look at how organic micro-inoculants stimulate lateral roots, ensuring drought resistance during critical dry spells.",
      publishedAt: "2026-03-29T16:00:00Z",
      author: "Dr. Narendar Reddy",
      source: { name: "Savaxa Innovations" },
      urlToImage: "/chili_solution.png",
      url: "/crop-solutions",
      fullContent: `Drought resistance is becoming a critical parameter for survival in modern agriculture. Next-generation bio-stimulants developed by SAVAXA focus on enhancing root architecture, specifically encouraging the growth of deep lateral roots and root hairs.

Our organic micro-inoculants contain plant-growth-promoting rhizobacteria (PGPR) and humic extracts. 

Once applied, they alter the plant's hormonal signaling pathways, encouraging the root system to grow downwards into deeper, moisture-rich soil layers. This ensures that even during prolonged dry spells or extreme heatwaves, crops remain hydrated and continue to synthesize nutrients without entering terminal wilting phases.`
    },
    {
      title: "Technological Interventions in Smart Agri-Spraying",
      description: "Assessing the efficiency of drone-spraying arrays for selective weed targets compared to manual backpack chemical deployment.",
      publishedAt: "2026-03-12T09:30:00Z",
      author: "Ing. Marcus Vance",
      source: { name: "TechAgri Reviews" },
      urlToImage: "/fruits_solution.png",
      url: "/crop-solutions",
      fullContent: `The integration of unmanned aerial vehicles (UAVs) in modern pesticide and stimulant application represents a massive technological leap forward. Traditional backpack sprayers are slow, physically demanding, and often result in uneven chemical distribution.

Agri-spraying drones equipped with multispectral sensors can map weed density in real-time, applying chemical treatments only where they are actively needed. 

By utilizing ultra-low volume (ULV) atomizing nozzles, these drones reduce water usage by 90% and chemical usage by 30%, while ensuring 100% leaf-surface coverage. This not only cuts input costs for growers but drastically minimizes the chemical footprint on surrounding agricultural ecosystems.`
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
                  onClick={() => setSelectedPost(post)}
                  className="bg-slate-900/30 border border-blue-500/10 rounded-3xl overflow-hidden shadow-lg hover:border-cyan-500/30 hover:shadow-cyan-500/5 transition-all duration-300 group flex flex-col h-[480px] cursor-pointer"
                >
                  {/* Image banner */}
                  <div className="h-48 relative overflow-hidden bg-slate-950">
                    <img 
                      src={post.urlToImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/pulses_solution.png"
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

                    {/* CTA link to open full article inside window */}
                    <div className="pt-4 border-t border-slate-800">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                        }}
                        className="text-cyan-400 hover:text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>

                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Dynamic News Article Details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-[#020817]/90 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-3xl bg-slate-900/90 border border-blue-500/10 rounded-[2rem] overflow-hidden max-h-[85vh] flex flex-col shadow-2xl z-10 backdrop-blur-xl"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-950/80 border border-blue-500/10 hover:border-red-500/30 rounded-full text-slate-400 hover:text-red-400 transition-all cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-1 hide-scrollbar">
                
                {/* Hero Banner */}
                <div className="h-64 md:h-80 relative overflow-hidden bg-slate-950">
                  <img
                    src={selectedPost.urlToImage}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/pulses_solution.png"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute bottom-6 left-6 md:left-8 bg-blue-600/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-500/20 shadow-lg">
                    {selectedPost.source ? selectedPost.source.name : 'Agri News'}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-10 space-y-6">
                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" /> {formatDate(selectedPost.publishedAt)}</span>
                    {selectedPost.author && (
                      <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-blue-400" /> {selectedPost.author}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-white leading-tight">
                    {selectedPost.title}
                  </h2>
                  
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />

                  {/* Complete Body Text */}
                  <div className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line font-normal pt-2 space-y-4">
                    {selectedPost.fullContent || selectedPost.content ? (
                      (selectedPost.fullContent || selectedPost.content).replace(/\[\+\d+ chars\]/g, "")
                    ) : (
                      selectedPost.description
                    )}
                  </div>
                </div>

              </div>

              {/* Footer CTA Section */}
              <div className="p-6 md:px-10 py-4 bg-slate-950/60 border-t border-slate-800 flex justify-between items-center rounded-b-[2rem]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SAVAXA INTEL NETWORK</span>
                {selectedPost.url && (
                  selectedPost.url.startsWith('/') ? (
                    <Link
                      to={selectedPost.url}
                      onClick={handleCloseModal}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02]"
                    >
                      Explore Solutions <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={selectedPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest shadow-lg transition-all flex items-center gap-1.5"
                    >
                      Read Original Story <ExternalLink className="w-4 h-4" />
                    </a>
                  )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
