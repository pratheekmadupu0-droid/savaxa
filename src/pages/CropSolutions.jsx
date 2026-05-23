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
  const [selectedCrop, setSelectedCrop] = useState('rice')

  const cropSolutionsList = {
    rice: {
      name: "Wet Paddy Rice Security",
      pathogen: "Barnyard Grass, Rice Blast Fungus, Stem Borers",
      threat: "Severe Yield Deprivation Risk",
      symptoms: "Tall broad grass choking out tender paddy shoots, spindle-shaped brown lesions on leaves.",
      formula: "Vanquish-X Herbicide & Savaxa BioRoot",
      mixingRatio: "Vanquish-X: 80 - 100 ml per Acre in 150L water",
      sprayingInterval: "Foliar spray 10-15 days post-transplanting when weeds are in 2-4 leaf stage.",
      img: "https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&w=800&q=80"
    },
    wheat: {
      name: "Golden Wheat Protection",
      pathogen: "Yellow Rust (Puccinia), Wheat Aphids, Loose Smut",
      threat: "High Grain Shrivelling Risk",
      symptoms: "Bright yellow-orange powdery pustules forming linear stripes along leaf veins.",
      formula: "Savaxa Shield-Ultra & BioRoot Fungicide",
      mixingRatio: "Shield-Ultra: 120 ml/Acre + BioRoot: 2.0 kg/Acre",
      sprayingInterval: "Apply at first sign of rust pustules or aphid clusters on leaves during jointing stage.",
      img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    },
    cotton: {
      name: "Cash Cotton Crop Defense",
      pathogen: "American Bollworm, Sucking Whitefly, Aphids",
      threat: "Critical Defoliation & Boll Rot Risk",
      symptoms: "Circular boring holes in cotton bolls, leaf curling, soot coating from honeydew deposits.",
      formula: "Shield-Ultra Insecticide formulation",
      mixingRatio: "Shield-Ultra: 1.2 ml per Litre of water",
      sprayingInterval: "Apply at first square formation, repeat after 12 days to control bollworm eggs.",
      img: "https://images.unsplash.com/photo-1594900222400-0e1075768808?auto=format&fit=crop&w=800&q=80"
    },
    tomato: {
      name: "Tomato & Vegetables Protection",
      pathogen: "Early Blight (Alternaria), Damping-Off Rot",
      threat: "Extreme Nursery Seedling Mortality",
      symptoms: "Water-soaked lesions on lower stems, leaf spots with concentric target-board rings.",
      formula: "BioRoot Spore Inoculant & systemic sprays",
      mixingRatio: "BioRoot: 2.0 kg per Acre mixed with organic manure",
      sprayingInterval: "Incorporate in soil during nursery preparation or as root drench 15 days post-transplant.",
      img: "https://images.unsplash.com/photo-1566385273619-5f15d7b8c416?auto=format&fit=crop&w=800&q=80"
    },
    chili: {
      name: "Spicy Chili Crop Security",
      pathogen: "Sucking Thrips, Leaf Curl Virus, Downy Mildew",
      threat: "Severe Leaf Scorch & Wrinkling",
      symptoms: "Leaves curling upwards into characteristic boat shapes, stunted terminal growth with brittle stems.",
      formula: "Shield-Ultra systemic spray & SOLVO Stimulant",
      mixingRatio: "Shield-Ultra: 150 ml/Acre + SOLVO: 200 ml/Acre",
      sprayingInterval: "First spray during pre-flowering stage, repeat at fruit set stage for maximum yield.",
      img: "https://images.unsplash.com/photo-1588145293290-7a0e3f01ef87?auto=format&fit=crop&w=800&q=80"
    },
    pulses: {
      name: "Nitrogen-Fixing Pulses & Legumes Protection",
      pathogen: "Pod Borer (Helicoverpa), Fusarium Wilt",
      threat: "High Flower Drop & Crop Failure Risk",
      symptoms: "Withering of terminal shoots, young pods bored with entry holes, black discoloration inside stems.",
      formula: "Shield-Ultra Insecticide & BioRoot Fungicide",
      mixingRatio: "Shield-Ultra: 1.5 ml/L + BioRoot: 2.5 g/L drench",
      sprayingInterval: "Spray at first appearance of flower buds, repeat during pod development to stop boring insects.",
      img: "https://images.unsplash.com/photo-1585996375005-d68f94e9f52f?auto=format&fit=crop&w=800&q=80"
    },
    fruits: {
      name: "Horticulture Fruits & Orchards Security",
      pathogen: "Powdery Mildew, Anthracnose Spot, Fruit Borers",
      threat: "High Fruit Drop & Skin Disfigurement",
      symptoms: "White powdery patches on young leaves and blossoms, sunken dark lesions on mature fruit skin.",
      formula: "BioRoot Systemic Fungicide & SOLVO Nutrition",
      mixingRatio: "BioRoot: 2.0 g/L foliar spray + SOLVO: 1.5 ml/L",
      sprayingInterval: "Foliar spray during pre-blossom stage and repeat after fruit-set to ensure spot-free yields.",
      img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=800&q=80"
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
            Crop Solutions Catalog
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Select your primary crop to discover targeted biological symptoms, pathogen stressors, and certified Savaxa mixing ratios.
          </p>
        </div>

        {/* Crops Selector Panel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
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
              <span className="font-bold uppercase tracking-wider text-xs">
                {key}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCrop}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[var(--color-brand-surface)] rounded-3xl overflow-hidden border border-[var(--color-blue-100)] shadow-sm"
          >
            {/* Visual Panel (Left) */}
            <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[350px]">
              <img src={current.img} alt={current.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)]/90 via-[var(--color-brand-navy)]/30 to-transparent" />
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
                <div className="bg-white p-5 rounded-2xl border border-[var(--color-blue-100)] flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Target Pathogens</h4>
                    <p className="text-[var(--color-brand-navy)] font-bold text-sm leading-relaxed">{current.pathogen}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[var(--color-blue-100)] flex items-start gap-4 shadow-sm">
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
                      <p className="text-[var(--color-brand-navy)] font-bold text-lg">{current.formula}</p>
                    </div>
                    <Link to="/products" className="shrink-0 bg-[var(--color-brand-primary)] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-[var(--color-brand-navy)] transition-colors flex items-center gap-1">
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
