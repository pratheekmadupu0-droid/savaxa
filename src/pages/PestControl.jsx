import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { Bug, Search, ShieldAlert, FlaskConical, Target, ShieldCheck } from 'lucide-react'

export default function PestControl() {

  const pestsData = [
    {
      name: "American Bollworm",
      sciName: "Helicoverpa armigera",
      type: "Lepidoptera Caterpillar",
      crops: "Cotton, Maize, Pigeon pea, Chickpea, Tomato",
      symptoms: "Bores circular holes into cotton bolls and tomato fruits, feeding internally. Yield drops drastically.",
      control: "Chlorantraniliprole 18.5% SC (Bollgard-Zap Force)",
      img: "https://images.unsplash.com/photo-1518534237198-904d92deea9b?auto=format&fit=crop&w=400&q=80",
      risk: "Critical Destruction"
    },
    {
      name: "Whiteflies",
      sciName: "Bemisia tabaci",
      type: "Hemiptera Sucking Pest",
      crops: "Cotton, Chili, Brinjal, Tomato, Cucurbits",
      symptoms: "Sucks cellular sap from leaves underside. Leaves curl downwards. Secretes sticky honeydew forming black soot.",
      control: "Spirotetramat 15% + Imidacloprid 30% SC (Shield-Ultra)",
      img: "https://images.unsplash.com/photo-1543881478-f7bbfbb16149?auto=format&fit=crop&w=400&q=80",
      risk: "Virus Vector"
    },
    {
      name: "Barnyard Grass Weeds",
      sciName: "Echinochloa crus-galli",
      type: "Poaceae Invasive Grass",
      crops: "Paddy Rice (Direct seeded & Transplanted)",
      symptoms: "Chokes cash crops within early tillering weeks, stealing 60% of soil nitrogen nutrients and moisture.",
      control: "Bispyribac-sodium 10% SC (Vanquish-X)",
      img: "https://images.unsplash.com/photo-1589410931210-67c87c0ffbe2?auto=format&fit=crop&w=400&q=80",
      risk: "Nutrient Theft"
    },
    {
      name: "Damping-off Fungi",
      sciName: "Pythium spp.",
      type: "Oomycete Root Rot",
      crops: "Tomato nursery beds, Chili, Pulses, Tobacco",
      symptoms: "Rotting and water-soaking of seedling stems at the ground soil level, leading to instant nursery collapse.",
      control: "Trichoderma viride bio-agent (BioRoot Protect)",
      img: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&w=400&q=80",
      risk: "Nursery Threat"
    },
    {
      name: "Powdery Mildew Rust",
      sciName: "Erysiphe polygoni",
      type: "Ascomycete Foliar Infection",
      crops: "Chili, Apple orchards, Onion, Peas, Mango",
      symptoms: "White powdery patches covering leaf and flower surfaces. Flower buds drop prematurely before fruit fertilization.",
      control: "Azoxystrobin + Tebuconazole (LeafRust Sentinel)",
      img: "https://images.unsplash.com/photo-1505342416801-d7d8e65eab9b?auto=format&fit=crop&w=400&q=80",
      risk: "Canopy Damage"
    },
    {
      name: "Sucking Thrips",
      sciName: "Scirtothrips dorsalis",
      type: "Thysanoptera Scourge",
      crops: "Chili, Tomato, Grapes, Rose, Citrus",
      symptoms: "Tears plant cells to suck fluid. Leaf tips dry, turn brown, and curl upwards forming typical boat shapes.",
      control: "Shield-Ultra Systemic SC formulations",
      img: "https://images.unsplash.com/photo-1584617154942-834c89da1fde?auto=format&fit=crop&w=400&q=80",
      risk: "High Foliage Scorch"
    }
  ]

  return (
    <div className="font-inter bg-[var(--color-brand-surface)] min-h-screen pt-32 pb-24">
      <SEO 
        title="Pest Identification | SAVAXA Crop Care"
        description="Locate and inspect damage symptoms of major agricultural pests, pathogens, and certified Savaxa control solutions."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
            Pest Identification
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Locate and inspect damage symptoms of major agricultural pests, pathogens, and certified Savaxa control solutions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by pest name or crop..." 
            className="w-full bg-white border border-[var(--color-blue-100)] rounded-xl py-4 pl-12 pr-4 text-[var(--color-brand-navy)] font-medium focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all shadow-sm"
          />
        </div>

        {/* Diagnostic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pestsData.map((pest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-[var(--color-blue-100)] rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="space-y-4">
                {/* Image Header */}
                <div className="h-56 relative overflow-hidden bg-slate-100">
                  <img src={pest.img} alt={pest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1623910271383-7d9fc01dc078?auto=format&fit=crop&w=400&q=80" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)]/80 to-transparent" />
                  <span className="absolute top-4 right-4 bg-red-500/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm border border-red-400 flex items-center gap-1.5 shadow-sm">
                    <ShieldAlert className="w-3 h-3" /> {pest.risk}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] text-[var(--color-brand-accent)] font-bold tracking-widest uppercase mb-1">{pest.type}</p>
                    <h3 className="text-xl font-montserrat font-bold text-white line-clamp-1">{pest.name}</h3>
                    <p className="text-xs text-blue-100 italic">{pest.sciName}</p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Host Crops</span>
                    <span className="text-sm font-bold text-[var(--color-brand-navy)]">{pest.crops}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Damage Symptoms</span>
                    <span className="text-sm text-slate-600 leading-relaxed line-clamp-3">{pest.symptoms}</span>
                  </div>
                </div>
              </div>

              {/* Control Section */}
              <div className="p-6 pt-0 mt-auto">
                <div className="p-4 bg-[var(--color-brand-surface)] rounded-2xl border border-[var(--color-blue-100)] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[var(--color-blue-100)] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Savaxa Solution</span>
                    <span className="text-sm font-bold text-[var(--color-brand-navy)] leading-snug">{pest.control}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
