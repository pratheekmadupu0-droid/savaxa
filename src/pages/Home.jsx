import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ReactCountUp from 'react-countup'
import SEO from '../components/SEO'
import SavaxaOrbit from '../components/SavaxaOrbit'
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
  Cpu,
  Target,
  Sparkles
} from 'lucide-react'

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
  Rice: "/rice_solution.png",
  Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
  Cotton: "/cotton_solution.png",
  Vegetables: "/tomato_solution.png",
  Pulses: "/pulses_solution.png",
  Fruits: "/fruits_solution.png"
}

const insights = [
  {
    title: "Mitigating Fall Armyworm Mutations in Warm Climates",
    desc: "An in-depth review from Savaxa R&D labs detailing emerging insecticide resistances in corn crops and selective compound pathways.",
    img: "/cotton_solution.png",
    category: "Agronomy",
    date: "May 18, 2026",
    id: 0
  },
  {
    title: "Decoding Bio-agents & Active Biological Spores",
    desc: "How Savaxa processes bio-stimulants at hyperbaric low temperatures, maintaining perfect viable spore counts for root colonization.",
    img: "/tomato_solution.png",
    category: "Bio-Tech",
    date: "May 2, 2026",
    id: 1
  },
  {
    title: "Rising Fertilizer Costs Drive Focus on Target Efficiency",
    desc: "Market diagnostics proving selective low-dosage pesticide chemical applications deliver 28% higher seasonal net margins for soybean farms.",
    img: "/pulses_solution.png",
    category: "Markets",
    date: "April 22, 2026",
    id: 2
  }
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [videoSrc, setVideoSrc] = useState("")

  useEffect(() => {
    setMounted(true)
    
    // Defer large video file request slightly to let initial page structure, CSS and critical scripts load first
    const timer = setTimeout(() => {
      setVideoSrc("/savaxa-2.mp4")
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-[#020817] min-h-screen font-body text-slate-100 relative overflow-x-hidden">
      <SEO 
        title="SAVAXA Crop Care | Best Pesticide & Crop Protection Company"
        description="OUR CROP CARE PORTFOLIO. We manufacture advanced crop protection formulations that address severe pest attacks, stubborn weeds, and fungal diseases."
        keywords="SAVAXA Crop Care, Savaxa, crop protection, pesticide company, best pesticide, insecticides, herbicides, fungicides, biological stimulants"
      />
      
      {/* 1. CINEMATIC FULLSCREEN HERO SECTION (VIDEO ONLY, ZERO LAG) */}
      <section className="relative w-screen h-screen overflow-hidden bg-[#020817] z-20">
        
        {/* GPU-Accelerated Native Video Loop */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          webkit-playsinline="true"
          onEnded={(e) => { e.target.play(); }}
          src={videoSrc || undefined} 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          style={{ 
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />

        {/* Ambient Dark Tech Gradients & Glowing atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/60 via-[#020817]/25 to-[#020817]/95 z-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none z-10" />
        <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-10" />

        {/* SUBTLE MOUSE SCROLL DOWN INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-slate-400 animate-pulse">Scroll to explore</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full"
            />
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
      <section className="py-28 bg-[#040d21] relative z-25 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading italic font-bold text-white uppercase tracking-tight leading-none">
                  Why Choose <span className="text-[#06b6d4]">Savaxa?</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                <p className="text-slate-400 text-sm md:text-base leading-relaxed pt-2">
                  We bridge the gap between advanced scientific research and practical farming. Our formulations undergo rigorous trials to ensure they deliver maximum efficacy while preserving soil health.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Scientifically Formulated", icon: <Microscope className="w-5 h-5 text-cyan-400" /> },
                  { title: "Eco-Safe Profile", icon: <Leaf className="w-5 h-5 text-emerald-400" /> },
                  { title: "Affordable Pricing", icon: <Award className="w-5 h-5 text-[#06b6d4]" /> },
                  { title: "Expert Support", icon: <Users className="w-5 h-5 text-blue-400" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3.5 p-4 bg-slate-900/35 rounded-xl border border-blue-500/5 hover:border-blue-500/15 transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/15 flex-shrink-0">
                      {item.icon}
                    </div>
                    <h4 className="font-heading italic font-bold text-white text-sm">{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side interactive orbiting ecosystem */}
            <div className="flex items-center justify-center w-full">
              <SavaxaOrbit />
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
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="bg-slate-950/40 rounded-3xl overflow-hidden border border-blue-500/5 hover:border-cyan-500/30 shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col"
              >
                <div className="h-52 bg-slate-900 relative overflow-hidden">
                  <img
                    src={insight.img}
                    alt={insight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80";
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600/90 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{insight.category}</div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 mb-2 block uppercase tracking-widest">{insight.date}</span>
                    <h3 className="text-xl font-heading italic font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">{insight.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{insight.desc}</p>
                  </div>
                  <Link to={`/blog/${insight.id}`} className="text-cyan-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">Read Insight <ArrowRight className="w-4 h-4" /></Link>
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