import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ReactCountUp from 'react-countup'
const CountUp = ReactCountUp.default || ReactCountUp
import { 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Sprout, 
  Users, 
  Award, 
  BadgeCheck, 
  Microscope,
  Compass,
  Cpu,
  Target,
  Sparkles
} from 'lucide-react'
import gsap from 'gsap'

// Testimonials using basic flex overflow for simplicity/reliability
const testimonials = [
  {
    quote: "Deploying Savaxa Shield-Ultra Insecticide saved our cotton crop. We harvested healthy cotton bolls.",
    author: "Ramesh Goud",
    role: "Cotton Farmer, Warangal",
    stars: 5,
  },
  {
    quote: "BioRoot Fungicide cleared the infection completely, and the tomato roots are incredibly strong and healthy.",
    author: "Sridhar Reddy",
    role: "Reddy Tomato Farms",
    stars: 5,
  },
  {
    quote: "The selective herbicides worked wonders in our paddy fields. Wild grasses were controlled perfectly.",
    author: "N. Venkateswara Rao",
    role: "Paddy Cultivator",
    stars: 5,
  }
]

const cropImages = {
  Rice: "https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&w=400&q=80",
  Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
  Cotton: "https://images.unsplash.com/photo-1594900222400-0e1075768808?auto=format&fit=crop&w=400&q=80",
  Vegetables: "https://images.unsplash.com/photo-1566385273619-5f15d7b8c416?auto=format&fit=crop&w=400&q=80",
  Pulses: "https://images.unsplash.com/photo-1585996375005-d68f94e9f52f?auto=format&fit=crop&w=400&q=80",
  Fruits: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=400&q=80"
}

const blogImages = [
  "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1605000797499-95a51c7769ae?auto=format&fit=crop&w=600&q=80"
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef(null)
  const videoBgRef = useRef(null)
  const displayCanvasRef = useRef(null)
  const [framesReady, setFramesReady] = useState(false)
  
  // Refs for Boomerang Capture and scrub tracking
  const framesRef = useRef([])
  const requestRef = useRef(null)
  
  // Parallax and mouse coordinate tracking refs
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const smoothX = useRef(0)
  const smoothY = useRef(0)

  // Floating Particle Ambient States
  const particles = useRef([])

  useEffect(() => {
    setMounted(true)
    
    // Create Float Particles
    const tempParticles = []
    for (let i = 0; i < 40; i++) {
      tempParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.5 + 0.2
      })
    }
    particles.current = tempParticles

    // Mouse movement listeners
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Canvas drawing and scrubbing animation loop
    const canvas = displayCanvasRef.current
    const ctx = canvas ? canvas.getContext('2d') : null

    const updateFrame = () => {
      // 1. Mouse lag calculation for smooth cinematic parallax
      const targetX = (mouseX.current / window.innerWidth) - 0.5
      const targetY = (mouseY.current / window.innerHeight) - 0.5
      smoothX.current += (targetX - smoothX.current) * 0.08
      smoothY.current += (targetY - smoothY.current) * 0.08

      // Apply subtle displacement/parallax to interactive Hero Elements
      gsap.to('.parallax-container', {
        x: smoothX.current * 40,
        y: smoothY.current * 30,
        rotateX: smoothY.current * -5,
        rotateY: smoothX.current * 5,
        duration: 0.5,
        ease: 'power2.out'
      })

      // 2. Video Scrub / Boomerang Capture Logic
      const video = videoRef.current
      if (video && video.readyState >= 2 && canvas && ctx) {
        // Dynamic aspect-ratio crop calculation
        const cw = canvas.width = window.innerWidth
        const ch = canvas.height = window.innerHeight

        const vWidth = video.videoWidth
        const vHeight = video.videoHeight
        const vAspect = vWidth / vHeight
        const cAspect = cw / ch

        let sx = 0, sy = 0, sWidth = vWidth, sHeight = vHeight
        if (cAspect > vAspect) {
          sHeight = vWidth / cAspect
          sy = (vHeight - sHeight) / 2
        } else {
          sWidth = vHeight * cAspect
          sx = (vWidth - sWidth) / 2
        }

        // Realtime scrubbing based on mouse X coordinate (boomerang capture simulation)
        const scrubProgress = (mouseX.current / window.innerWidth)
        if (scrubProgress >= 0 && scrubProgress <= 1) {
          const targetTime = scrubProgress * video.duration
          video.currentTime += (targetTime - video.currentTime) * 0.15
        }

        ctx.clearRect(0, 0, cw, ch)
        ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, cw, ch)

        // 3. Draw high-tech cyber grids and floating ambient particles
        ctx.fillStyle = 'rgba(6, 182, 212, 0.03)'
        // Draw grid lines
        const step = 80
        for (let x = 0; x < cw; x += step) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, ch)
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)'
          ctx.stroke()
        }
        for (let y = 0; y < ch; y += step) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(cw, y)
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)'
          ctx.stroke()
        }

        // Draw and update float particles
        particles.current.forEach(p => {
          p.x += p.speedX
          p.y += p.speedY

          // Wrap boundaries
          if (p.x < 0) p.x = 100
          if (p.x > 100) p.x = 0
          if (p.y < 0) p.y = 100
          if (p.y > 100) p.y = 0

          ctx.beginPath()
          const px = (p.x / 100) * cw
          const py = (p.y / 100) * ch
          ctx.arc(px, py, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`
          ctx.shadowBlur = 10
          ctx.shadowColor = '#06b6d4'
          ctx.fill()
        })
      }

      requestRef.current = requestAnimationFrame(updateFrame)
    }

    requestRef.current = requestAnimationFrame(updateFrame)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <div className="bg-[#020817] min-h-screen font-body text-slate-100 relative overflow-x-hidden">
      
      {/* HIDDEN REFERENCE VIDEO FOR FLUID RENDER CANVAS */}
      <video
        ref={videoRef}
        src="/savaxa-2.mp4"
        loop
        muted
        playsInline
        className="hidden"
        onLoadedData={() => setFramesReady(true)}
      />

      {/* 1. FUTURISTIC FULLSCREEN HERO SECTION */}
      <section className="relative w-screen h-screen flex flex-col justify-between overflow-hidden bg-[#020817] pt-24 pb-8 z-20">
        
        {/* Render Canvas Background */}
        <canvas 
          ref={displayCanvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />

        {/* Ambient Dark Tech Gradients & Glowing atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/70 via-[#020817]/40 to-[#020817]/90 z-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none z-10" />
        <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-10" />

        {/* TOP SPACING */}
        <div className="h-6" />

        {/* MAIN HUD MIDDLE COLUMN (GSAP Parallax Container) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center flex-1">
          <div className="parallax-container space-y-6">
            
            {/* Trusted Badge pill */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass border border-blue-500/20 shadow-md text-xs font-bold tracking-widest text-[#06b6d4] uppercase"
            >
              <BadgeCheck className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              <span>Trusted Crop Protection Since 2008</span>
            </motion.div>

            {/* Futuristic Giant Titles */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="hero-title select-none font-dirtyline text-white"
              >
                SAVAXA
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="hero-subtitle mt-6 text-slate-300 font-medium tracking-[0.15em]"
              >
                Advanced Agriculture & Crop Protection Solutions
              </motion.p>
            </div>

            {/* Glowing active hub metrics */}
            <div className="hidden md:flex items-center justify-center gap-8 text-[10px] font-bold tracking-widest uppercase text-slate-400 pt-6">
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#06b6d4]" /> Dynamic Formulation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/30" />
              <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-[#06b6d4]" /> Ultra Precision spray</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/30" />
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#06b6d4]" /> Sustainable farming</span>
            </div>

          </div>
        </div>

        {/* BOTTOM HUD COLUMN GRID */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full border-t border-white/5 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Description Block */}
            <div className="lg:col-span-4 text-slate-400 text-xs md:text-sm tracking-wide leading-relaxed">
              Advanced crop protection solutions designed for modern agriculture and sustainable farming.
            </div>

            {/* Center Buttons Container */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/products" 
                className="liquid-glass-strong bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest text-center shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/35 hover:scale-102 transition-all duration-300"
              >
                Explore Products
              </Link>
              <Link 
                to="/crop-solutions" 
                className="liquid-glass border border-white/10 hover:border-blue-500/30 text-white font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest text-center hover:bg-white/5 hover:scale-102 transition-all duration-300"
              >
                View Crop Solutions
              </Link>
            </div>

            {/* Right Description Block */}
            <div className="lg:col-span-4 text-slate-400 text-xs md:text-sm tracking-wide leading-relaxed lg:text-right">
              Empowering farmers with innovative pesticide technologies and smart agricultural solutions.
            </div>

          </div>
        </div>

      </section>

      {/* 2. SLICK DARK MARQUEE TRUST BAR */}
      <div className="bg-[#040d21] border-y border-blue-500/10 py-5 overflow-hidden relative z-30">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-16 px-6">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">
                <Award className="w-4 h-4 text-cyan-300" /> ISO 9001:2015 Certified
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500/20" />
              <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 15+ Years Agro Care
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500/20" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">
                <Users className="w-4 h-4 text-cyan-300" /> 500+ Dealer Partners
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500/20" />
              <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400" /> 20+ Premium Formulations
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500/20" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">
                <Sprout className="w-4 h-4 text-cyan-300" /> Trusted by 1 Lakh+ Farmers
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500/20" />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* 3. PRODUCT RANGE */}
      <section className="py-28 bg-[#020817] relative z-25 border-b border-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading italic font-bold text-white uppercase tracking-tight">
              SCIENTIFIC PRODUCT CATALOG
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">Explore our highly targeted protective systems designed to safeguard cash crop networks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Insecticides",
                desc: "High-efficacy targeting against chewing and sucking crop pests.",
                icon: <Microscope className="w-8 h-8 text-cyan-400" />,
                route: "/products/insecticides"
              },
              {
                title: "Herbicides",
                desc: "Selective weed blockades tailored for rich crop yields.",
                icon: <Leaf className="w-8 h-8 text-emerald-400" />,
                route: "/products/herbicides"
              },
              {
                title: "Fungicides",
                desc: "Advanced defense systems preventing severe fungal spreads.",
                icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
                route: "/products/fungicides"
              }
            ].map((cat, i) => (
              <div 
                key={i}
                className="glass-card p-10 flex flex-col items-center text-center bg-slate-900/40 border border-blue-500/10 rounded-[2rem] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-heading italic font-bold text-white mb-4">{cat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">{cat.desc}</p>
                <Link to={cat.route} className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs group-hover:text-white transition-colors">
                  View Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE SAVAXA */}
      <section className="py-28 bg-[#040d21] relative z-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading italic font-bold text-white uppercase tracking-tight leading-none">
                Why Choose <span className="text-[#06b6d4]">Savaxa?</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              <p className="text-slate-400 text-sm md:text-base leading-relaxed pt-4">
                We bridge the gap between advanced scientific research and practical farming. Our formulations undergo rigorous trials to ensure they deliver maximum efficacy while preserving soil health.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Scientifically Formulated", icon: <Microscope className="w-6 h-6 text-cyan-400" /> },
                { title: "Eco-Safe Profile", icon: <Leaf className="w-6 h-6 text-emerald-400" /> },
                { title: "Affordable Pricing", icon: <Award className="w-6 h-6 text-[#06b6d4]" /> },
                { title: "Expert Support", icon: <Users className="w-6 h-6 text-blue-400" /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col space-y-4 p-6 bg-slate-900/30 rounded-2xl border border-blue-500/5 hover:border-blue-500/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/15">
                    {item.icon}
                  </div>
                  <h4 className="font-heading italic font-bold text-white text-lg">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CROP SOLUTIONS PREVIEW */}
      <section className="py-28 bg-[#020817] relative z-25 border-y border-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading italic font-bold text-white uppercase tracking-tight">
              CROP WISE DIAGNOSIS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
            <p className="text-slate-400 max-w-xl mx-auto text-sm">Select a cash crop to find targeted biological stressors and certified formulations.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Rice', 'Wheat', 'Cotton', 'Vegetables', 'Pulses', 'Fruits'].map((crop, i) => (
              <Link 
                key={i} 
                to="/crop-solutions"
                className="group bg-slate-900/30 rounded-2xl overflow-hidden border border-blue-500/5 hover:border-cyan-500/40 transition-all duration-300 flex flex-col hover:shadow-2xl"
              >
                <div className="h-36 bg-slate-950 relative overflow-hidden">
                  <img 
                    src={cropImages[crop]} 
                    alt={crop} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80"; 
                    }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-between">
                  <h4 className="font-heading italic font-bold text-white mb-2 text-base">{crop}</h4>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest group-hover:text-white transition-colors">View Solutions →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STATS SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-slate-950 relative z-25 border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-blue-500/10">
            {[
              { val: 100000, label: "Active Farmers", suffix: "+" },
              { val: 20, label: "Formulations", suffix: "+" },
              { val: 500, label: "Dealer Hubs", suffix: "+" },
              { val: 15, label: "Years Presence", suffix: "+" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4 space-y-2">
                <div className="text-4xl md:text-5xl font-heading italic font-extrabold text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                  <CountUp end={stat.val} duration={2.5} separator="," />
                  {stat.suffix}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GROWERS FEEDBACK */}
      <section className="py-28 bg-[#020817] relative z-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading italic font-bold text-white uppercase tracking-tight">
              VOICES FROM THE FIELD
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[420px] snap-center glass-card border-l-4 border-l-cyan-500 p-10 flex flex-col space-y-6 rounded-2xl bg-slate-900/20">
                <div className="flex text-amber-400 text-sm">
                  {[...Array(t.stars)].map((_, idx) => <span key={idx}>★</span>)}
                </div>
                <p className="text-slate-300 italic text-sm md:text-base leading-relaxed flex-1">"{t.quote}"</p>
                <div>
                  <h4 className="font-heading italic font-bold text-white text-lg">{t.author}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INSIGHTS PREVIEW */}
      <section className="py-28 bg-[#040d21] relative z-25 border-t border-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading italic font-bold text-white uppercase tracking-tight">
                Scientific Insights
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-6 rounded-full" />
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs hover:text-white transition-colors">
              View All Insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-slate-950/40 rounded-3xl overflow-hidden border border-blue-500/5 hover:border-cyan-500/30 shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col"
              >
                <div className="h-52 bg-slate-900 relative overflow-hidden">
                  <img
                    src={blogImages[i]}
                    alt="Blog"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80";
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600/90 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Agronomy</div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 mb-2 block uppercase tracking-widest">October 12, 2024</span>
                    <h3 className="text-xl font-heading italic font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">Maximizing Crop Yields During Monsoon Season</h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">Learn the best practices and essential preventative sprays to keep your crops safe during heavy rains.</p>
                  </div>
                  <Link to="/blog/1" className="text-cyan-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">Read Insight <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FUTURISTIC CTA BANNER */}
      <section className="py-32 bg-[#020817] relative z-25 text-center px-4 overflow-hidden border-t border-blue-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-heading italic font-extrabold text-white tracking-tight leading-none uppercase">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Join thousands of successful growers who trust Savaxa's premium chemical technologies to secure their harvests.
          </p>
          <Link 
            to="/contact" 
            className="inline-block liquid-glass-strong bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-12 py-4.5 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/35 transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </section>

    </div>
  )
}