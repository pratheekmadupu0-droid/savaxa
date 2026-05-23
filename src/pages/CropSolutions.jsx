import { useState } from 'react'
import SEO from '../components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Leaf, 
  Droplet, 
  Target, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  Sprout,
  Activity
} from 'lucide-react'

export default function CropSolutions() {
  const [selectedCrop, setSelectedCrop] = useState('cotton')

  const cropSolutionsList = {
    cotton: {
      name: "Cotton Crops Protection",
      pathogen: "American Bollworm, Sucking Whitefly, Thrips",
      threat: "Critical - High Defoliation Risk",
      symptoms: "Circular boring cavities in mature cotton bolls, leaf curling with black soot coatings, stunted terminal shoots.",
      formula: "Shield-Ultra Insecticide & SOLVO Biostimulant",
      mixingRatio: "Shield-Ultra: 1.2 ml/L + SOLVO: 1.5 ml/L",
      sprayingInterval: "Apply at first square formation, repeat after 12 days if pest count exceeds 5 per branch.",
      img: "https://images.unsplash.com/photo-1595166297316-01582e38c3aa?auto=format&fit=crop&w=800&q=80"
    },
    rice: {
      name: "Wet Paddy Rice Security",
      pathogen: "Barnyard Grass, Sedges, Stem Borers",
      threat: "Severe Nutrient Deprivation Risk",
      symptoms: "Tall broad grass choking out tender paddy shoots, nutrient theft leading to yellow thin leaves, lower panicle formation.",
      formula: "Vanquish-X Herbicide System",
      mixingRatio: "Vanquish-X: 80 - 100 ml per Acre in 150L water",
      sprayingInterval: "Post-emergence foliar spray 10-15 days after transplanting when weeds are in 2-4 leaf stage.",
      img: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?auto=format&fit=crop&w=800&q=80"
    },
    tomato: {
      name: "Solanaceous Tomato Defense",
      pathogen: "Pythium Damping-Off Rot, Early Fungal Blight",
      threat: "Extreme Nursery Seedling Mortality",
      symptoms: "Water-soaked girdling of seedling stems near soil level, leaf spots with concentric target-board rings.",
      formula: "BioRoot Spore Inoculant",
      mixingRatio: "BioRoot: 2.0 kg per Acre mixed with organic manure",
      sprayingInterval: "Apply in seed beds during soil preparation, repeat as drench 15 days after transplanting.",
      img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80"
    },
    chili: {
      name: "Chili Crops Protection",
      pathogen: "Sucking Thrips, Downy Mildew",
      threat: "High Foliage Scorch & Curl",
      symptoms: "Leaf margins drying and curling upwards into distinctive boat shapes, white powder dust on leaf underside.",
      formula: "Shield-Ultra systemic spray & BioRoot",
      mixingRatio: "Shield-Ultra: 150 ml/Acre + BioRoot: 1.5 kg/Acre",
      sprayingInterval: "Spray Shield-Ultra at flowering onset, drench roots with BioRoot to secure soil spores.",
      img: "https://images.unsplash.com/photo-1588145293290-7a0e3f01ef87?auto=format&fit=crop&w=800&q=80"
    }
  }

  const current = cropSolutionsList[selectedCrop]

  return (
    <div className="font-inter bg-white min-h-screen pt-32 pb-24">
      <SEO 
        title="Crop Solutions | SAVAXA Crop Care"
        description="Discover targeted biological symptoms, pathogen stressors, and certified Savaxa mixing ratios for major cash crops."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
            Crop Solutions
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Select your primary cash crop to discover targeted biological symptoms, pathogen stressors, and certified Savaxa mixing ratios.
          </p>
        </div>

        {/* Crops Selector Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {Object.keys(cropSolutionsList).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCrop(key)}
              className={`py-6 px-4 rounded-2xl border flex flex-col items-center gap-3 transition-all duration-300 ${
                selectedCrop === key
                  ? 'bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-lg -translate-y-1'
                  : 'bg-[var(--color-brand-surface)] border-[var(--color-blue-100)] hover:border-[var(--color-brand-primary)] text-[var(--color-brand-navy)] hover:-translate-y-1'
              }`}
            >
              <Sprout className={`w-8 h-8 ${selectedCrop === key ? 'text-[var(--color-brand-accent)]' : 'text-[var(--color-brand-primary)]'}`} />
              <span className="font-bold uppercase tracking-wider text-sm">
                {key === 'cotton' ? 'Cotton' :
                 key === 'rice' ? 'Rice' :
                 key === 'tomato' ? 'Tomato' :
                 'Chili'}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCrop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[var(--color-brand-surface)] rounded-3xl overflow-hidden border border-[var(--color-blue-100)] shadow-sm"
          >
            {/* Visual Panel (Left) */}
            <div className="lg:col-span-5 relative h-64 lg:h-auto">
              <img src={current.img} alt={current.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)]/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center gap-1.5 bg-red-500/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm border border-red-400">
                  <ShieldAlert className="w-3 h-3" /> {current.threat}
                </span>
                <h2 className="text-3xl font-montserrat font-bold text-white mt-4 leading-tight">{current.name}</h2>
              </div>
            </div>

            {/* Info Panel (Right) */}
            <div className="lg:col-span-7 p-8 md:p-10 space-y-8 flex flex-col justify-center">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-[var(--color-blue-100)] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Target Pathogens</h4>
                    <p className="text-[var(--color-brand-navy)] font-bold text-sm">{current.pathogen}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[var(--color-blue-100)] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Damage Symptoms</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{current.symptoms}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase border-b border-[var(--color-blue-100)] pb-2">Savaxa Treatment Protocol</h3>
                
                <div className="bg-white p-6 rounded-2xl border border-[var(--color-brand-primary)] shadow-sm space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-primary)] mb-1">Recommended Formula</h4>
                      <p className="text-[var(--color-brand-navy)] font-bold">{current.formula}</p>
                    </div>
                    <Link to="/products" className="shrink-0 bg-[var(--color-brand-primary)] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-[var(--color-brand-navy)] transition-colors flex items-center gap-1">
                      View Product <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-blue-100)]">
                    <div className="flex items-start gap-3">
                      <Droplet className="w-4 h-4 text-[var(--color-brand-accent)] mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Mixing Ratio</h4>
                        <p className="text-slate-700 text-sm font-medium">{current.mixingRatio}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[var(--color-brand-accent)] mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Application Timing</h4>
                        <p className="text-slate-700 text-sm">{current.sprayingInterval}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA Banner */}
        <div className="mt-20 bg-[var(--color-brand-navy)] rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-primary)_0%,transparent_50%)] opacity-40" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-montserrat font-bold text-white uppercase">Need Custom Agronomy Advice?</h2>
            <p className="text-blue-100">Our team of agricultural scientists is ready to diagnose your crop issues and recommend precise Savaxa formulations.</p>
            <Link to="/contact" className="inline-block bg-white text-[var(--color-brand-navy)] font-bold px-8 py-4 rounded-xl uppercase tracking-wider text-sm hover:bg-[var(--color-brand-surface)] transition-colors">
              Consult an Expert
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
