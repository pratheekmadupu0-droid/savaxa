import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import {
  Leaf,
  Target,
  Microscope,
  Users,
  ShieldCheck,
  Building2,
  Award,
  ChevronRight,
  BadgeCheck,
  Sprout,
  TrendingUp,
  FileText,
  Calendar,
  Sparkles
} from 'lucide-react'

export default function About() {
  const videoRef = useRef(null)
  const [isMockupDarkMode, setIsMockupDarkMode] = useState(false)
  const [videoSrc, setVideoSrc] = useState("")

  useEffect(() => {
    // Defer large video file request slightly to let initial page structure, CSS and critical scripts load first
    const timer = setTimeout(() => {
      setVideoSrc("/savaxa-crop.mp4")
    }, 120)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.loop = true
      
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch(e => console.error("Video auto-play failed: ", e))
          }
        })
      }
    }
  }, [videoSrc])

  const visions = [
    { 
      title: "Sustainable Agronomy", 
      desc: "Developing selective crop protection formulations that degrade naturally in soil with zero long-term active chemical residues.", 
      icon: <Leaf className="w-7 h-7 text-cyan-400" /> 
    },
    { 
      title: "Yield Maximization", 
      desc: "Empowering growers to defend crops from heavy infestations, substantially boosting farm profitability and security.", 
      icon: <Target className="w-7 h-7 text-emerald-400" /> 
    },
    { 
      title: "Scientific Innovation", 
      desc: "Continuously researching active spore biological blockades and hyperbaric bio-stimulant synthesis in our R&D labs.", 
      icon: <Microscope className="w-7 h-7 text-blue-400" /> 
    },
    { 
      title: "Grower Welfare", 
      desc: "Delivering free diagnostic resources, crop guides, and on-field agronomist support directly to rural farming communities.", 
      icon: <Users className="w-7 h-7 text-purple-400" /> 
    }
  ]

  const stats = [
    { value: "500+", label: "Dealer Locations" },
    { value: "100K+", label: "Farmers Empowered" },
    { value: "15+", label: "Certified Formulations" },
    { value: "10+", label: "Years of Excellence" }
  ]

  const timeline = [
    { year: "2023", title: "Founding & Inception", desc: "Savaxa Bio-Agri Sciences was established with a vital mission to develop high-efficacy crop protections. Registered core formulations under CIB&RC India." },
    { year: "2024", title: "Dealer Expansion", desc: "Launched selective herbicides and crop nutrition lines. Formed a strong network of 100+ authorized dealers to empower growers." },
    { year: "2025", title: "ISO Certification", desc: "Achieved ISO 9001:2015 certification for manufacturing excellence and scaled our advanced R&D biological spore labs." },
    { year: "2026", title: "Global Scale", desc: "Expanded the authorized dealer network to over 500+ locations, securing crop yields and profits for 100K+ farmers." }
  ]

  return (
    <div className="font-body bg-[#020817] min-h-screen text-slate-300 overflow-x-hidden">
      <SEO 
        title="About Us | SAVAXA Crop Care"
        description="Pioneering the future of crop protection through science, innovation, and a deep commitment to farmer welfare. Explore our legacy, MD's profile, and our mission."
      />

      {/* 1. HERO BANNER */}
      <section className="relative pt-36 pb-24 bg-gradient-to-br from-[#020817] via-[#040d21] to-[#0a1530] overflow-hidden">
        {/* Abstract light flares */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Glass Breadcrumb */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-blue-500/10 backdrop-blur-md shadow-inner mb-4">
              <Link to="/" className="text-slate-400 hover:text-white text-xs uppercase tracking-widest transition-colors font-semibold">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[#06b6d4] text-xs uppercase tracking-widest font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">About Us</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white uppercase tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-glow">Savaxa</span>
            </h1>
            
            <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Pioneering the future of crop protection through science, biochemistry, and a deep, uncompromising commitment to farmer welfare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. COMPANY STORY */}
      <section className="py-28 bg-[#020817] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story Copy */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-blue-500/10">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Our Legacy</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight uppercase">
                A Decade of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Agricultural Excellence</span>
              </h2>
              
              <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-normal">
                <p>
                  Savaxa Bio-Agri Sciences began with a vital, clear mission: to bridge the gap between complex biochemical innovations and field-level crop safety. Driven by the pressing challenges of high-intensity crop losses, pest mutations, and chemical over-spraying, we established advanced chemical blending reactors and research-grade facilities.
                </p>
                <p>
                  Today, Savaxa has grown into a highly trusted agrochemical name in Indian agriculture. We develop and manufacture selective herbicides, fast-acting biological insecticides, and organic bio-stimulants that have safeguarded thousands of cultivation acres, ensuring high yields and secure profits for our hard-working growers.
                </p>
              </div>

              {/* Core approvals/certifications badges */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200 bg-slate-900/60 px-5 py-3.5 rounded-xl border border-blue-500/10 shadow-sm">
                  <BadgeCheck className="w-5 h-5 text-emerald-400" /> 
                  <span>ISO 9001:2015 CERTIFIED</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200 bg-slate-900/60 px-5 py-3.5 rounded-xl border border-blue-500/10 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> 
                  <span>CIB&RC GOVT APPROVED</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200 bg-slate-900/60 px-5 py-3.5 rounded-xl border border-blue-500/10 shadow-sm">
                  <Leaf className="w-5 h-5 text-emerald-400" /> 
                  <span>ECO-SAFE CHEMISTRY</span>
                </div>
              </div>
            </motion.div>

            {/* Premium Video Block */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-blue-500/10 bg-slate-900 group">
                <video 
                  ref={videoRef}
                  src={videoSrc || undefined} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                  webkit-playsinline="true"
                  onEnded={(e) => { e.target.play(); }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ 
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden'
                  }}
                />
                {/* Beautiful overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
              </div>
              
              {/* Decorative background glow behind the video */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl -z-10 opacity-70" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-28 bg-[#070f21] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-blue-500/10 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Our Blueprint</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight">
              Mission & Vision
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visions.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(6,182,212,0.35)', boxShadow: '0 20px 40px -15px rgba(6,182,212,0.1)' }}
                className="bg-slate-900/40 p-8 rounded-2xl border border-blue-500/10 flex flex-col sm:flex-row gap-6 group transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#020817] border border-blue-500/15 flex items-center justify-center shrink-0 group-hover:bg-blue-600/10 group-hover:border-cyan-500/40 transition-colors duration-300">
                  {v.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors duration-300">{v.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP TEAM (MD INFO) */}
      <section className="py-28 bg-[#020817] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-blue-500/10 mb-4">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Leadership</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight">
              Executive Directorate
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto bg-slate-900/30 rounded-3xl p-8 md:p-14 border border-blue-500/10 relative overflow-hidden shadow-2xl">
            {/* Background lighting */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* MD Photo Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="aspect-[4/5] w-full max-w-[320px] rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-2xl relative group">
                  <img 
                    src="/dr-narendar-reddy.png" 
                    alt="Dr. Narendar Reddy" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                    onError={(e) => { e.target.src = "/md.png" }} 
                  />
                  {/* Subtle tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* MD Bio Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-4xl font-heading font-bold text-white uppercase tracking-wide">Dr. Narendar Reddy</h3>
                  <p className="text-cyan-400 font-bold tracking-widest uppercase text-xs mt-2 flex items-center gap-2">
                    <span>Managing Director</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>SAVAXA BIO-AGRI SCIENCES</span>
                  </p>
                </div>
                
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                
                <p className="text-slate-300 leading-relaxed text-base font-normal">
                  Holding a specialized MBA in Agri-Business Management combined with an honorary doctorate in agricultural sciences, Dr. Reddy brings together advanced biochemical research insight, high-level corporate agility, and structural farm diagnostics.
                </p>
                <p className="text-slate-300 leading-relaxed text-base font-normal">
                  Under his scientific guidance, Savaxa has successfully transitioned from standard chemical blends to eco-safe spore inoculants, making it a highly respected and trusted label for regional growers in India.
                </p>
                
                {/* Quote block */}
                <div className="relative bg-slate-950/60 p-6 rounded-2xl border-l-4 border-cyan-500 shadow-inner text-slate-300 font-medium italic">
                  <span className="absolute -top-4 -left-2 text-6xl text-cyan-500/20 font-serif pointer-events-none">“</span>
                  "Our chemical formulations must always serve the farmer first. We do not simply sell crop pesticides; we engineer active scientific shields that empower growers to secure rich, clean, and highly profitable harvests."
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. STATS SUMMARY SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#020817] to-[#070f21] border-y border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center space-y-2 p-6 bg-slate-900/20 rounded-2xl border border-blue-500/5 backdrop-blur-sm"
              >
                <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    {s.value}
                  </span>
                </h3>
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TIMELINE / OUR JOURNEY */}
      <section className="py-28 bg-[#070f21] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-blue-500/10 mb-4">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Our Journey</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight">
              Milestones & Growth
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full" />
          </div>

          {/* Timeline Pipeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Desktop Center Connector line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/40 via-cyan-500/20 to-transparent -translate-x-1/2" />
            
            <div className="space-y-16">
              {timeline.map((item, i) => {
                const isEven = i % 2 === 0
                return (
                  <div key={i} className="flex flex-col lg:flex-row items-center relative">
                    
                    {/* Circle Node Center (Desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#020817] border-2 border-cyan-400/60 shadow-lg items-center justify-center font-heading font-bold text-lg text-white z-20 shadow-cyan-500/10">
                      {item.year}
                    </div>

                    {/* Timeline card wrapper */}
                    <div className={`w-full lg:w-1/2 flex ${isEven ? 'lg:justify-end lg:pr-14' : 'lg:justify-start lg:pl-14'}`}>
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-md bg-slate-900/40 p-8 rounded-2xl border border-blue-500/10 shadow-lg relative group hover:border-cyan-500/20 transition-all"
                      >
                        {/* Mobile Year Badge */}
                        <div className="inline-flex lg:hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-heading font-bold text-sm px-4 py-1.5 rounded-full mb-4 shadow-md">
                          {item.year}
                        </div>
                        
                        <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CERTIFICATIONS & REGISTRATIONS PREVIEW */}
      <section className="py-24 bg-[#020817] text-center border-t border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Highest Quality Standards Guaranteed</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-40 hover:opacity-85 transition-opacity duration-500">
            <div className="flex flex-col items-center gap-2">
              <Award className="w-14 h-14 text-white" />
              <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">ISO 9001:2015</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-14 h-14 text-white" />
              <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">CIB&RC Registered</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BadgeCheck className="w-14 h-14 text-white" />
              <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">Quality Assured</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 BRAND SEARCH PRESENCE & SEO MOCKUP */}
      <section className="py-24 bg-[#020817] relative border-t border-slate-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-blue-500/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Brand Identity & SEO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight">
              Savaxa <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Digital Rank</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full mb-4" />
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Explore how SAVAXA stands out on standard search engines, presenting a mobile-optimized, authoritative crop protection portfolio for global agronomists.
            </p>

            {/* Light/Dark Toggle */}
            <div className="mt-8 flex justify-center">
              <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1">
                <button
                  onClick={() => setIsMockupDarkMode(false)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    !isMockupDarkMode 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Google Light
                </button>
                <button
                  onClick={() => setIsMockupDarkMode(true)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isMockupDarkMode 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Savaxa Dark
                </button>
              </div>
            </div>
          </div>

          {/* Realistic Responsive Mockup Container */}
          <div className="max-w-3xl mx-auto">
            <motion.div 
              layout
              className={`p-6 md:p-8 rounded-3xl border transition-all duration-500 shadow-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${
                isMockupDarkMode 
                  ? 'bg-slate-950 border-blue-500/20 text-slate-300 shadow-blue-500/5' 
                  : 'bg-white border-slate-200 text-slate-750 shadow-slate-950/5'
              }`}
            >
              {/* Left Side listing detail */}
              <div className="flex-1 space-y-4">
                
                {/* Header section (Favicon & breadcrumbs) */}
                <div className="flex items-center gap-3">
                  {/* Brand Logo in place of Globe Icon */}
                  <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center p-1.5 shadow-sm border border-slate-200/10">
                    <img 
                      src="/savax-logo.png" 
                      alt="SAVAXA Logo Icon" 
                      className="w-full h-full object-contain filter drop-shadow-[0_0_3px_rgba(6,182,212,0.4)]"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-xs font-bold leading-none ${isMockupDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      savaxa.in
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      https://www.savaxa.in
                    </span>
                  </div>
                </div>

                {/* Search Title */}
                <h3 className={`text-xl md:text-2xl font-semibold leading-snug text-left ${
                  isMockupDarkMode 
                    ? 'text-cyan-400 hover:underline cursor-pointer' 
                    : 'text-[#1a0dab] hover:underline cursor-pointer'
                }`}>
                  SAVAXA Crop Care | Best Pesticide & Crop Protection Company
                </h3>

                {/* Snippet Description */}
                <p className={`text-sm text-left leading-relaxed ${isMockupDarkMode ? 'text-slate-450' : 'text-slate-600'}`}>
                  <span className="font-semibold">...</span> OUR CROP CARE PORTFOLIO. We manufacture advanced crop protection formulations that address severe pest attacks, stubborn weeds, and fungal diseases. <span className={`font-semibold cursor-pointer hover:underline ${isMockupDarkMode ? 'text-cyan-400' : 'text-[#1a0dab]'}`}>Read more</span>
                </p>

              </div>

              {/* Right Side Cotton Crop Thumbnail */}
              <div className="w-full md:w-32 h-32 md:h-32 rounded-2xl overflow-hidden shadow-lg border border-blue-500/10 bg-slate-900 flex-shrink-0 relative">
                <img 
                  src="/cotton_solution.png" 
                  alt="SAVAXA Cotton Protection" 
                  className="w-full h-full object-cover"
                />
              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#020817] to-[#040d21] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.07),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-slate-900/40 p-10 md:p-16 rounded-3xl border border-blue-500/10 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight">
                Partner with Savaxa Bio-Agri
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Whether you are a local dealer looking to offer certified pest protections, or a crop grower seeking diagnostic consulting, Savaxa stands ready.
              </p>
              
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-3.5 rounded-full uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/10 hover:shadow-cyan-500/30 transition-all hover:scale-[1.03]"
                >
                  Consult our Experts
                </Link>
                <Link 
                  to="/dealers" 
                  className="bg-slate-900 text-slate-300 font-bold px-8 py-3.5 rounded-full uppercase tracking-widest text-[10px] border border-slate-700 hover:text-white hover:border-slate-500 transition-all"
                >
                  Locate a Dealer
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
