import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Leaf,
  Target,
  Microscope,
  Users,
  ShieldCheck,
  Building2,
  Award,
  ChevronRight,
  BadgeCheck
} from 'lucide-react'

export default function About() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.loop = true
      
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch(e => console.error(e))
          }
        })
      }
    }
  }, [])

  const visions = [
    { 
      title: "Sustainable Agronomy", 
      desc: "Developing selective pesticide formulations that degrade naturally in soil with zero long-term active chemical residues.", 
      icon: <Leaf className="w-8 h-8 text-[var(--color-brand-primary)]" /> 
    },
    { 
      title: "Yield Maximization", 
      desc: "Empowering growers to defend crops from heavy infestations, boosting farm profitability.", 
      icon: <Target className="w-8 h-8 text-[var(--color-brand-primary)]" /> 
    },
    { 
      title: "Scientific Innovation", 
      desc: "Continuously researching active spore biological blockades and hyperbaric bio-stimulant synthesis in our R&D labs.", 
      icon: <Microscope className="w-8 h-8 text-[var(--color-brand-primary)]" /> 
    },
    { 
      title: "Grower Welfare", 
      desc: "Delivering free diagnostic resources, crop guides, and agronomist support directly to rural farming communities.", 
      icon: <Users className="w-8 h-8 text-[var(--color-brand-primary)]" /> 
    }
  ]

  const timeline = [
    { year: "2010", title: "Inception", desc: "Savaxa started as a small research facility focused on bio-stimulants." },
    { year: "2015", title: "Market Expansion", desc: "Launched our first proprietary line of selective herbicides across South India." },
    { year: "2019", title: "ISO Certification", desc: "Achieved ISO 9001:2015 certification for our state-of-the-art manufacturing plants." },
    { year: "2024", title: "Global Reach", desc: "Expanded our dealer network to over 500+ locations." }
  ]

  return (
    <div className="font-body bg-[#020817] min-h-screen text-slate-300">
      
      {/* 1. HERO BANNER */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--color-brand-navy)] to-[var(--color-brand-primary)] overflow-hidden">
        <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-blue-200 text-sm font-bold uppercase tracking-widest mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">About Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold text-white uppercase tracking-tight">
              About Savaxa
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed">
              Pioneering the future of crop protection through science, innovation, and a deep commitment to farmer welfare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. COMPANY STORY */}
      <section className="py-24 bg-[#020817] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand-surface)] border border-[var(--color-blue-100)]">
                <Building2 className="w-4 h-4 text-[var(--color-brand-primary)]" />
                <span className="text-xs font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Our Legacy</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] leading-tight uppercase">
                A Decade of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)]">Agricultural Excellence</span>
              </h2>
              
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  Savaxa Bio-Agri Sciences began with a vital mission: to bridge the gap between complex biochemical science and field-level crop safety. Driven by the pressing challenges of crop loss and pest mutations, we established advanced chemical blending reactors and R&D facilities to create high-efficacy pesticides.
                </p>
                <p>
                  Today, Savaxa has grown into a highly trusted agrochemical name. We produce selective herbicides, fast-acting insecticides, and organic bio-inoculants that have safeguarded thousands of cultivation acres, ensuring high yields and secure profits for crop growers.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-brand-navy)] bg-[var(--color-brand-surface)] px-5 py-3 rounded-lg border border-[var(--color-blue-100)]">
                  <BadgeCheck className="w-5 h-5 text-[var(--color-brand-primary)]" /> ISO 9001:2015
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-brand-navy)] bg-[var(--color-brand-surface)] px-5 py-3 rounded-lg border border-[var(--color-blue-100)]">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" /> CIB&RC Approved
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-blue-100)]"
            >
              <video 
                ref={videoRef}
                src="/savaxa-crop.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-navy)]/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-24 bg-[var(--color-brand-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
              Mission & Vision
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visions.map((v, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,71,171,0.15)' }}
                className="bg-slate-900/40 p-8 rounded-2xl border border-blue-500/10 flex gap-6 group transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-[var(--color-brand-surface)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-colors">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-3">{v.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP TEAM */}
      <section className="py-24 bg-[#020817]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
              Leadership
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto bg-[var(--color-brand-surface)] rounded-3xl p-8 md:p-12 border border-[var(--color-blue-100)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white shadow-xl relative">
                  <img src="/md.png" alt="Dr. Narendar Reddy" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" }} />
                </div>
              </div>
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h3 className="text-3xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase">Dr. Narendar Reddy</h3>
                  <p className="text-[var(--color-brand-primary)] font-bold tracking-widest uppercase text-sm mt-2">Managing Director</p>
                </div>
                <div className="w-12 h-1 bg-[var(--color-brand-accent)]" />
                <p className="text-slate-600 leading-relaxed text-lg">
                  Holding a specialized MBA in Agri-Business Management combined with a doctorate in agricultural sciences, Dr. Reddy combines advanced biochemical research insight with high-level corporate and rural strategic vision.
                </p>
                <div className="bg-slate-900/40 p-6 rounded-xl border border-blue-500/10 shadow-sm italic text-slate-300">
                  "Our technology must always serve the farmer first. We don't just sell chemical compounds; we provide scientific shield arrays that empower farmers to cultivate rich, safe, and highly profitable harvests."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TIMELINE */}
      <section className="py-24 bg-[var(--color-brand-navy)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-white uppercase tracking-tight">
              Our Journey
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full" />
          </div>

          <div className="relative">
            {/* Horizontal line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[var(--color-brand-primary)] -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-brand-primary)] border-4 border-[var(--color-brand-navy)] flex items-center justify-center font-montserrat font-bold text-xl mb-6 shadow-xl">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-blue-100 uppercase tracking-wide mb-3">{item.title}</h3>
                  <p className="text-blue-200/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATIONS PREVIEW */}
      <section className="py-20 bg-[var(--color-brand-surface)] text-center border-t border-[var(--color-blue-100)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-[var(--color-brand-primary)] tracking-widest uppercase mb-4">Quality Guaranteed</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <Award className="w-16 h-16 text-[var(--color-brand-navy)]" />
            <ShieldCheck className="w-16 h-16 text-[var(--color-brand-navy)]" />
            <BadgeCheck className="w-16 h-16 text-[var(--color-brand-navy)]" />
          </div>
        </div>
      </section>

    </div>
  )
}
