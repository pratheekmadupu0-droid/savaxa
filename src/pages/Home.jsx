import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
  Microscope
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
  return (
    <div className="bg-white min-h-screen font-inter">

      {/* 1. HERO VIDEO */}
      <section className="relative w-full h-[60vh] md:h-[80vh] mt-20 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/savaxa-2.mp4" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)]/80 via-transparent to-transparent" />
      </section>

      {/* 2. HERO MATTER (BELOW VIDEO) */}
      <section className="relative bg-white py-16 md:py-24 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand-surface)] border border-[var(--color-blue-100)] mb-8">
              <BadgeCheck className="w-4 h-4 text-[var(--color-brand-primary)]" />
              <span className="text-xs font-bold text-[var(--color-brand-primary)] tracking-wide uppercase">Trusted Crop Protection Since 2008</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-montserrat font-extrabold text-[var(--color-brand-navy)] leading-[1.1] mb-8 tracking-tight">
              PROTECTING CROPS.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)]">EMPOWERING FARMERS.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Savaxa delivers world-class, scientifically formulated agrochemicals that secure harvests and maximize yields for agricultural professionals worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products" className="btn-premium px-8 py-4 text-center font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/dealers" className="btn-ghost px-8 py-4 text-center font-bold uppercase tracking-wider text-sm">
                Contact a Dealer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. MARQUEE TRUST BAR */}
      <div className="bg-[var(--color-brand-white)] border-y border-[var(--color-blue-100)] py-4 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-sm font-bold text-[var(--color-brand-primary)] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" /> ISO Certified
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)]" />
              <span className="text-sm font-bold text-[var(--color-brand-primary)] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> 15+ Years Experience
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)]" />
              <span className="text-sm font-bold text-[var(--color-brand-primary)] uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" /> 500+ Dealer Network
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)]" />
              <span className="text-sm font-bold text-[var(--color-brand-primary)] uppercase tracking-wider flex items-center gap-2">
                <Leaf className="w-4 h-4" /> 20+ Registered Products
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)]" />
              <span className="text-sm font-bold text-[var(--color-brand-primary)] uppercase tracking-wider flex items-center gap-2">
                <Sprout className="w-4 h-4" /> Trusted by 1 Lakh+ Farmers
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)]" />
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

      {/* 4. PRODUCT CATEGORIES */}
      <section className="py-24 bg-[var(--color-brand-surface)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
              Our Product Range
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Insecticides",
                desc: "High-efficacy targeting against chewing and sucking crop pests.",
                icon: <Microscope className="w-10 h-10 text-[var(--color-brand-primary)]" />,
                route: "/products/insecticides"
              },
              {
                title: "Herbicides",
                desc: "Selective weed blockades tailored for rich crop yields.",
                icon: <Leaf className="w-10 h-10 text-[var(--color-brand-primary)]" />,
                route: "/products/herbicides"
              },
              {
                title: "Fungicides",
                desc: "Advanced defense systems preventing severe fungal spreads.",
                icon: <ShieldCheck className="w-10 h-10 text-[var(--color-brand-primary)]" />,
                route: "/products/fungicides"
              }
            ].map((cat, i) => (
              <div 
                key={i}
                className="glass-card p-8 flex flex-col items-center text-center bg-white group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-[var(--color-blue-100)] rounded-2xl"
              >
                <div className="w-20 h-20 rounded-2xl bg-[var(--color-brand-surface)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-3">{cat.title}</h3>
                <p className="text-slate-600 mb-8 flex-1">{cat.desc}</p>
                <Link to={cat.route} className="inline-flex items-center gap-2 text-[var(--color-brand-primary)] font-bold uppercase tracking-wider text-sm group-hover:text-[var(--color-brand-secondary)] transition-colors">
                  View Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE SAVAXA */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)]">Savaxa?</span>
              </h2>
              <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] rounded-full" />
              <p className="text-lg text-slate-600 leading-relaxed pt-4">
                We bridge the gap between advanced scientific research and practical farming. Our formulations undergo rigorous trials to ensure they deliver maximum efficacy while preserving soil health.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Scientifically Formulated", icon: <Microscope className="w-8 h-8 text-[var(--color-brand-primary)]" /> },
                { title: "Eco-Safe Profile", icon: <Leaf className="w-8 h-8 text-[var(--color-brand-primary)]" /> },
                { title: "Affordable Pricing", icon: <Award className="w-8 h-8 text-[var(--color-brand-primary)]" /> },
                { title: "Expert Support", icon: <Users className="w-8 h-8 text-[var(--color-brand-primary)]" /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col space-y-4 p-6 bg-[var(--color-brand-surface)] rounded-2xl border border-[var(--color-blue-100)] transition-all duration-300 hover:shadow-md">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-montserrat font-bold text-[var(--color-brand-navy)] text-lg">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CROP SOLUTIONS PREVIEW */}
      <section className="py-24 bg-[var(--color-brand-surface)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
              Crop Solutions
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Rice', 'Wheat', 'Cotton', 'Vegetables', 'Pulses', 'Fruits'].map((crop, i) => (
              <Link 
                key={i} 
                to="/crop-solutions"
                className="group bg-white rounded-2xl overflow-hidden border border-[var(--color-blue-100)] hover:border-[var(--color-brand-primary)] transition-all shadow-sm hover:shadow-lg flex flex-col"
              >
                <div className="h-32 bg-slate-200 relative overflow-hidden">
                  <img 
                    src={cropImages[crop]} 
                    alt={crop} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80"; 
                    }} 
                  />
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-between">
                  <h4 className="font-montserrat font-bold text-[var(--color-brand-navy)] mb-2 text-sm">{crop}</h4>
                  <span className="text-[10px] font-bold text-[var(--color-brand-primary)] uppercase tracking-wider group-hover:text-[var(--color-brand-accent)] transition-colors">View Solutions →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATS SECTION */}
      <section className="py-20 bg-[var(--color-brand-primary)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/20">
            {[
              { val: 100000, label: "Farmers", suffix: "+" },
              { val: 20, label: "Products", suffix: "+" },
              { val: 500, label: "Dealers", suffix: "+" },
              { val: 15, label: "Years", suffix: "+" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4 space-y-2">
                <div className="text-4xl md:text-5xl font-montserrat font-extrabold text-white">
                  <CountUp end={stat.val} duration={2} separator="," />
                  {stat.suffix}
                </div>
                <p className="text-sm font-bold text-blue-200 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
              Trusted by Growers
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full" />
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] snap-center glass-card border-l-4 border-l-[var(--color-brand-primary)] p-8 flex flex-col space-y-6">
                <div className="flex text-amber-400">
                  {[...Array(t.stars)].map((_, idx) => <span key={idx}>★</span>)}
                </div>
                <p className="text-slate-600 italic leading-relaxed flex-1">"{t.quote}"</p>
                <div>
                  <h4 className="font-montserrat font-bold text-[var(--color-brand-navy)]">{t.author}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LATEST BLOG PREVIEW */}
      <section className="py-24 bg-[var(--color-brand-surface)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
                Latest Insights
              </h2>
              <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mt-6 rounded-full" />
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-[var(--color-brand-primary)] font-bold uppercase tracking-wider text-sm hover:text-[var(--color-brand-navy)] transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-[var(--color-blue-100)] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group flex flex-col"
              >
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <img
                    src={blogImages[i]}
                    alt="Blog"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80";
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-[var(--color-brand-primary)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Farming Tips</div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-400 mb-2 block">October 12, 2024</span>
                    <h3 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors line-clamp-2">Maximizing Crop Yields During Monsoon Season</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">Learn the best practices and essential preventative sprays to keep your crops safe during heavy rains.</p>
                  </div>
                  <Link to="/blog/1" className="text-[var(--color-brand-primary)] font-bold text-sm uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA BANNER */}
      <section className="py-24 bg-[var(--color-brand-navy)] relative z-10 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold text-white tracking-tight leading-tight">
            READY TO PROTECT YOUR CROPS?
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Join thousands of successful farmers who trust Savaxa for their agricultural needs. Get in touch with our experts today.
          </p>
          <Link to="/contact" className="inline-block btn-premium px-10 py-4 text-lg font-bold uppercase tracking-wider">
            Get In Touch
          </Link>
        </div>
      </section>

    </div>
  )
}