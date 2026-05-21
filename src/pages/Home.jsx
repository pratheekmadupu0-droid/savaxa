import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { 
  RiShieldCheckLine, 
  RiSeedlingFill, 
  RiFlaskLine, 
  RiArrowRightLine, 
  RiDoubleQuotesL,
  RiStarFill,
  RiDatabaseLine,
  RiArrowRightUpLine,
  RiGroupLine,
  RiAwardLine,
  RiPlantLine
} from 'react-icons/ri'

// Standard Animated Counter Component
function Counter({ value, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const end = parseInt(value)
      if (start === end) return
      
      const totalMiliseconds = duration * 1000
      const incrementTime = Math.abs(Math.floor(totalMiliseconds / end))
      
      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start === end) clearInterval(timer)
      }, incrementTime)

      return () => clearInterval(timer)
    }
  }, [inView, value, duration])

  return (
    <span ref={ref} className="font-display font-extrabold text-4xl md:text-5xl text-emerald-600">
      {count}{suffix}
    </span>
  )
}

export default function Home() {
  const [activeLayer, setActiveLayer] = useState('insecticides')
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      // Force direct properties for smooth, autoplay, looping video across all browser frameworks
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.loop = true
      
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Cinematic video playing smoothly in loop")
        }).catch(err => {
          console.warn("Autoplay block bypass: ", err)
          // Attempt fallbacks to ensure video always starts
          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch(e => console.error("Force play failure: ", e))
          }
        })
      }
    }
  }, [])
  
  // Authentic pesticide and crop care products inspired by tapasyacropcare.com
  const categories = [
    {
      id: 'insecticides',
      title: 'High-Efficacy Insecticides',
      desc: 'Formulated to target chewing and sucking crop pests (thrips, aphids, whiteflies, and bollworms). Delivers rapid insect knockdown with excellent residual control, preserving leaf structure and cotton bolls.',
      targetPests: 'Thrips, Aphids, Whiteflies, Bollworms',
      dosage: '1.5 ml per Litre of water',
      icon: <RiShieldCheckLine className="text-emerald-600 text-3xl" />,
      color: 'from-emerald-500/10 to-teal-500/10',
      tag: 'Insect Pest Protection System'
    },
    {
      id: 'herbicides',
      title: 'Selective Herbicides',
      desc: 'Highly effective pre and post-emergence weed control. Selectively eliminates unwanted broadleaf weeds and wild grasses in wet paddy and commercial crop fields without affecting crop foliage health.',
      targetPests: 'Barnyard Grass, Sedges, Broadleaf Weeds',
      dosage: '80 - 100 ml per Acre',
      icon: <RiPlantLine className="text-cyan-600 text-3xl" />,
      color: 'from-cyan-500/10 to-blue-500/10',
      tag: 'Selective Weed Control Matrix'
    },
    {
      id: 'fungicides',
      title: 'Protective Fungicides',
      desc: 'Shields agricultural crops against pathogenic leaf rusts, blights, powdery mildews, and nursery damping-off. Encourages healthy root systems and prevents fungal spore multiplication.',
      targetPests: 'Root Rot, Powdery Mildew, Early Blight',
      dosage: '1.5 to 2.0 grams per Litre',
      icon: <RiFlaskLine className="text-blue-600 text-3xl" />,
      color: 'from-blue-500/10 to-sky-500/10',
      tag: 'Anti-Fungal Crop Shield'
    },
    {
      id: 'biostimulants',
      title: 'Organic Biostimulants',
      desc: 'Enriched with premium seaweed extracts, amino acids, and vital nutrients. Naturally boosts crop tillering, accelerates flowering, improves chlorophyll levels, and strengthens stress tolerance.',
      targetPests: 'Stunted Growth, Low Flowering, Weather Stress',
      dosage: '250 ml per Acre (Foliar spray)',
      icon: <RiSeedlingFill className="text-emerald-600 text-3xl" />,
      color: 'from-emerald-500/10 to-green-500/10',
      tag: 'Yield Booster & Growth Catalyst'
    }
  ]

  const currentCategory = categories.find(c => c.id === activeLayer)

  const featuredProducts = [
    {
      id: 'sav-ultra-1',
      name: 'Shield-Ultra Insecticide',
      category: 'Insecticides',
      desc: 'Premium insecticide with fast knockdown action targeting destructive bollworms and sucking pests.',
      tag: 'Farmer Trusted',
      img: 'https://images.unsplash.com/photo-1595348020949-87cdfbd44174?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sav-weed-2',
      name: 'Vanquish-X Herbicide',
      category: 'Herbicides',
      desc: 'Highly selective weedicide designed to eradicate stubborn grassy weeds in wet rice fields.',
      tag: 'High Efficacy',
      img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sav-fung-3',
      name: 'BioRoot Fungicide',
      category: 'Fungicides',
      desc: 'High CFU bio-fungicide powder to shield nursery beds from Pythium and damp-off rot.',
      tag: 'Eco-Friendly Spores',
      img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80'
    }
  ]

  return (
    <div className="font-sans relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Field Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[140vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80" 
          alt="Lush Paddy & Crop Landscape" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Soft natural green/blue background overlays */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[45%] right-0 w-[500px] h-[500px] bg-cyan-100/30 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. HERO SECTION - Full Screen Cinematic Video Intro */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
        <video 
          ref={videoRef}
          src="/savaxa-1.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ 
            transform: 'translate3d(0, 0, 0) scale(1.02)', 
            backfaceVisibility: 'hidden', 
            willChange: 'transform',
            objectFit: 'cover'
          }}
        />
        {/* Cinematic dark transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/20 to-slate-950/80 pointer-events-none" />


      </section>

      {/* 1.5 MATTER CONTENT SECTION */}
      <section className="relative py-24 px-4 md:px-8 bg-slate-50 border-b border-slate-200/60 z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Agrochemical matter details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80">
              <RiShieldCheckLine className="text-emerald-600 text-sm" />
              <span className="text-[10px] md:text-xs tracking-widest uppercase font-mono text-emerald-700 font-bold">
                Target-Specific Formulations
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight font-display uppercase text-slate-900">
              PIONEERING THE FUTURE OF <span className="text-gradient">CROP PROTECTION</span>
            </h2>

            <p className="text-slate-655 text-base md:text-lg leading-relaxed font-light max-w-xl">
              Savaxa Bio-Agri Sciences manufactures world-class pesticide formulations, selective herbicides, protective fungicides, and bio-stimulants designed to secure harvests and increase farming profitability.
            </p>

            {/* Agrochemical Trust Marks */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-700 bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm font-bold">
                <RiAwardLine className="text-emerald-600 text-lg" /> CIB&RC Registered Formulations
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm font-bold">
                <RiShieldCheckLine className="text-emerald-600 text-lg" /> ISO 9001:2015 Certified Mfg.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/products"
                className="btn-premium font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-2xl flex items-center justify-center gap-2 group transition duration-300"
              >
                Browse Pesticides Catalog
                <RiArrowRightLine className="group-hover:translate-x-1.5 transition duration-300" />
              </Link>
              <Link 
                to="/contact"
                className="bg-white/80 backdrop-blur hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-2xl transition duration-300 flex items-center justify-center hover:scale-[1.02] shadow-sm"
              >
                Consult Agri-Experts
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 max-w-lg">
              <div>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-1">Products Registered</p>
                <p className="text-2xl font-bold text-slate-800 font-display">75+ Brands</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-1">Dealers Network</p>
                <p className="text-2xl font-bold text-emerald-600 font-display">500+ Hubs</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-1">States Covered</p>
                <p className="text-2xl font-bold text-cyan-600 font-display">12+ States</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Authentic Pesticide Product Detail card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Main Product Showcase Box */}
            <div className="w-full max-w-[500px] h-[490px] rounded-3xl glass-card p-6 flex flex-col justify-between relative shadow-xl overflow-hidden border border-slate-200/80 bg-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/40 via-transparent to-cyan-50/20 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-emerald-600 uppercase font-bold">
                    <RiDatabaseLine className="text-base" /> Formulation & Efficacy Panel
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">
                    Interactive
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveLayer(c.id)}
                      className={`py-2 px-1 text-[9px] font-bold tracking-wider uppercase rounded-lg transition duration-200 ${
                        activeLayer === c.id 
                          ? 'bg-emerald-600 text-white font-extrabold shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
                      }`}
                    >
                      {c.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info displaying like a physical catalog */}
              <div className="flex-1 flex flex-col justify-center items-center py-4 text-center space-y-3 z-10">
                <motion.div
                  key={currentCategory.id}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 15 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${currentCategory.color} flex items-center justify-center border border-slate-200/60 shadow-inner`}
                >
                  {currentCategory.icon}
                </motion.div>

                <div>
                  <span className="text-[9px] font-mono tracking-widest text-emerald-600 uppercase font-bold">{currentCategory.tag}</span>
                  <h3 className="text-xl font-bold text-slate-850 tracking-wide font-display mt-0.5">{currentCategory.title}</h3>
                  <p className="text-slate-500 text-xs mt-1.5 px-4 leading-relaxed font-light">{currentCategory.desc}</p>
                </div>
              </div>

              {/* Pesticide application Matrix details */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 font-mono">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Target Pests/Weeds</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 line-clamp-1">{currentCategory.targetPests}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Recommended Dosage</p>
                  <p className="text-xs font-bold text-emerald-600 mt-0.5">{currentCategory.dosage}</p>
                </div>
              </div>
            </div>

            {/* Farm Quality Cert */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-44 bg-white p-4 rounded-2xl border border-slate-200 shadow-md text-left hidden md:block"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <RiSeedlingFill className="text-emerald-500 text-lg" />
                <p className="text-[9px] font-mono font-bold tracking-widest text-emerald-600 uppercase">Field Checked</p>
              </div>
              <p className="text-xs text-slate-800 font-bold">Eco-Safe Soil Profile</p>
              <p className="text-[9px] text-slate-400 mt-0.5 font-light">Completely selective formulation pathways.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 bg-white border-y border-slate-200/60 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "75", suffix: "+", label: "CIB Registered Products", desc: "Insecticides, Herbicides, Fungicides, and Biostimulants" },
            { value: "500", suffix: "+", label: "Authorized Dealers", desc: "Ensuring timely supply across prime agricultural districts" },
            { value: "100", suffix: "%", label: "Quality Efficacy", desc: "Rigorous quality check audits for maximum crop safety" },
            { value: "15", suffix: "M", label: "Acres Protected", desc: "Shielding commercial farms from heavy pest infestation" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2 p-5 rounded-2xl border border-transparent hover:border-slate-200/60 hover:bg-slate-50 transition duration-300">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-xs font-bold text-slate-700 font-display tracking-wider uppercase pt-1.5">{stat.label}</p>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CROP PROTECTION CATEGORIES */}
      <section className="py-20 max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-emerald-600 uppercase font-bold">Manufactured Solutions</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display uppercase">
            OUR <span className="text-gradient">CROP CARE</span> PORTFOLIO
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            We manufacture advanced crop protection formulations that address severe pest attacks, stubborn weeds, and fungal diseases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "High-Kill Insecticides",
              desc: "Eradicates sucking and chewing lepidoptera pests (thrips, aphids, bollworms) while ensuring outstanding crop safety.",
              route: "/products?category=insecticides",
              color: "border-emerald-200 hover:border-emerald-400 shadow-sm",
              img: "https://images.unsplash.com/photo-1595348020949-87cdfbd44174?auto=format&fit=crop&w=600&q=80"
            },
            {
              title: "Selective Herbicides",
              desc: "Broad-spectrum weedicides targeting wild weeds and grasses in wet rice paddy fields with zero crop foliage yellowing.",
              route: "/products?category=herbicides",
              color: "border-cyan-200 hover:border-cyan-400 shadow-sm",
              img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80"
            },
            {
              title: "Protective Fungicides",
              desc: "High-performance fungicides shielding crops from powdery mildew, leaf rust, damping-off, and fungal pathogens.",
              route: "/products?category=fungicides",
              color: "border-blue-200 hover:border-blue-400 shadow-sm",
              img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
            }
          ].map((cat, index) => (
            <motion.div
              key={index}
              className={`glass-card border-glow rounded-3xl overflow-hidden flex flex-col justify-between border ${cat.color} p-6 space-y-6 group`}
              whileHover={{ y: -6 }}
            >
              <div className="space-y-4">
                <div className="h-48 w-full rounded-2xl overflow-hidden relative">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 font-display pt-2 group-hover:text-emerald-600 transition duration-200">{cat.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <Link
                to={cat.route}
                className="py-3 px-5 rounded-xl border border-emerald-600 text-emerald-600 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 group-hover:bg-emerald-650 group-hover:text-white transition duration-300"
              >
                Explore Products Catalog <RiArrowRightLine />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. WHY FARMERS CHOOSE SAVAXA */}
      <section className="py-20 bg-white border-t border-slate-200/60 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <p className="text-xs font-mono tracking-widest text-emerald-600 uppercase font-bold">TRUSTED CHEMISTRY</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display uppercase">
              WHY CROP GROWERS & DEALERS <br />
              <span className="text-gradient">TRUST SAVAXA</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              We focus on delivering high-efficacy agrochemicals, excellent active ingredient ratios, and outstanding crop protection services.
            </p>

            <div className="space-y-4">
              {[
                { title: "CIB&RC Registered Pesticides", desc: "Every formulation is fully compliant with federal agrochemical standards and undergoes strict farm trials.", icon: <RiAwardLine className="text-emerald-600" /> },
                { title: "Guaranteed Higher Crop Yields", desc: "Formulated to optimize crop density, enhance tillering, and protect fruit and cotton bolls from pest damage.", icon: <RiPlantLine className="text-cyan-500" /> },
                { title: "Eco-Conscious Chemistry", desc: "Selective action modes that hit targets directly, keeping the surrounding soil ecosystem active and healthy.", icon: <RiSeedlingFill className="text-emerald-600" /> }
              ].map((point, index) => (
                <div key={index} className="flex gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-200/80 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-lg shrink-0 shadow-sm">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 tracking-wider uppercase font-display">{point.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-light">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-quality pesticide demonstration images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="glass-card border border-slate-200/50 rounded-3xl overflow-hidden flex flex-col justify-between p-4 space-y-4 group"
              >
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-mono tracking-widest text-emerald-600 font-bold border border-emerald-200 px-2 py-0.5 rounded-full uppercase">
                    {prod.tag}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase font-bold">{prod.category}</p>
                  <h4 className="text-sm font-bold text-slate-800 mt-1 group-hover:text-emerald-600 transition duration-200 font-display">{prod.name}</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-light line-clamp-2">{prod.desc}</p>
                </div>
                <Link 
                  to={`/products/details?id=${prod.id}`} 
                  className="w-full py-2.5 bg-slate-50 hover:bg-emerald-600 border border-slate-200/60 hover:border-emerald-500 hover:text-white font-bold text-[9px] tracking-widest uppercase rounded-xl transition duration-300 flex items-center justify-center gap-1.5"
                >
                  View Application Guide <RiArrowRightUpLine />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CROP GROWERS TESTIMONIALS */}
      <section className="py-20 max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-emerald-600 uppercase font-bold">FARMERS VOICES</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
            TRUSTED BY GROWERS
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Real farm stories and crop yield improvements from commercial cultivators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Deploying Savaxa Shield-Ultra Insecticide saved our cotton crop. The chewing bollworms were eradicated within 24 hours of spraying, and we harvested healthy cotton bolls.",
              author: "Ramesh Goud",
              role: "Cotton Farmer, Warangal Rural",
              stars: 5,
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
            },
            {
              quote: "Early blight and damping-off rot were ruining our tomato nurseries. BioRoot Fungicide cleared the infection completely, and the tomato roots are incredibly strong and healthy.",
              author: "Sridhar Reddy",
              role: "Owner, Reddy Tomato Farms",
              stars: 5,
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
            },
            {
              quote: "The selective herbicides worked wonders in our paddy fields. Wild grasses were controlled perfectly, saving us huge costs on manual labour weed-clearing.",
              author: "N. Venkateswara Rao",
              role: "Paddy Cultivator, Guntur Delta",
              stars: 5,
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
            }
          ].map((t, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 border border-slate-200/60 flex flex-col justify-between space-y-6 relative">
              <RiDoubleQuotesL className="text-emerald-600/10 text-5xl absolute top-6 right-6 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(t.stars)].map((_, i) => <RiStarFill key={i} className="text-amber-400 text-xs" />)}
                </div>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-emerald-400/20 shadow-sm" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-display">{t.author}</h4>
                  <p className="text-[9px] text-slate-400 font-mono tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL-TO-ACTION BANNER */}
      <section className="py-20 max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="rounded-[35px] bg-gradient-to-r from-emerald-600 to-teal-700 p-10 md:p-14 text-center relative overflow-hidden shadow-lg flex flex-col items-center">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full filter blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-300/20 rounded-full filter blur-2xl pointer-events-none" />

          <div className="max-w-2xl space-y-6 relative z-10 text-white">
            <p className="text-[10px] font-mono tracking-widest text-emerald-200 uppercase font-bold">Dealer & Distributor Network</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight font-display">
              READY TO GROW WITH SAVAXA?
            </h2>
            <p className="text-emerald-100 text-xs md:text-sm leading-relaxed font-light">
              Become an authorized dealer or consult our agricultural experts for optimized spray charts and product specifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link 
                to="/dealers" 
                className="bg-white hover:bg-slate-50 text-emerald-700 font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl shadow-md transition duration-300 hover:scale-[1.02]"
              >
                Apply for Dealership
              </Link>
              <Link 
                to="/contact" 
                className="border border-white/40 text-white hover:bg-white/10 font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl transition duration-300 hover:scale-[1.02]"
              >
                Consult Our Agronomist
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
