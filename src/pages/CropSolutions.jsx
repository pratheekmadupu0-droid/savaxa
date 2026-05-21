import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiShieldCheckLine, RiFilterLine, RiSeedlingLine, RiFlaskLine } from 'react-icons/ri'

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
      img: "/cotton_solution.png"
    },
    rice: {
      name: "Wet Paddy Rice Security",
      pathogen: "Barnyard Grass (Echinochloa), Sedges, Stem Borers",
      threat: "Severe Nutrient Deprivation Risk",
      symptoms: "Tall broad grass choking out tender paddy shoots, nutrient theft leading to yellow thin leaves, lower panicle formation.",
      formula: "Vanquish-X Herbicide System",
      mixingRatio: "Vanquish-X: 80 - 100 ml per Acre in 150L water",
      sprayingInterval: "Post-emergence foliar spray 10-15 days after transplanting when weeds are in 2-4 leaf stage.",
      img: "/rice_solution.png"
    },
    tomato: {
      name: "Solanaceous Tomato Defense",
      pathogen: "Pythium Damping-Off Rot, Early Fungal Blight",
      threat: "Extreme Nursery Seedling Mortality",
      symptoms: "Water-soaked girdling of seedling stems near soil level, leaf spots with concentric target-board rings.",
      formula: "BioRoot Spore Inoculant",
      mixingRatio: "BioRoot: 2.0 kg per Acre mixed with organic manure",
      sprayingInterval: "Apply in seed beds during soil preparation, repeat as drench 15 days after transplanting.",
      img: "/tomato_solution.png"
    },
    chili: {
      name: "Chili Crops Protection",
      pathogen: "Sucking Thrips, Downy Mildew",
      threat: "High Foliage Scorch & Curl",
      symptoms: "Leaf margins drying and curling upwards into distinctive boat shapes, white powder dust on leaf underside.",
      formula: "Shield-Ultra systemic spray & BioRoot",
      mixingRatio: "Shield-Ultra: 150 ml/Acre + BioRoot: 1.5 kg/Acre",
      sprayingInterval: "Spray Shield-Ultra at flowering onset, drench roots with BioRoot to secure soil spores.",
      img: "/chili_solution.png"
    }
  }

  const current = cropSolutionsList[selectedCrop]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Crop Solutions Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1920&q=80" 
          alt="Golden Wheat Crop Field" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Decorative Warm Organic Blur Circles */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-cyan-600 uppercase font-bold">SAVAXA CROP DIAGNOSTICS</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            CROP SOLUTIONS
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Select your primary cash crop to discover targeted biological symptoms, pathogen stressors, and certified mixing ratios.
          </p>
        </div>

        {/* Crops Selector Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.keys(cropSolutionsList).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCrop(key)}
              className={`py-4 rounded-2xl border text-xs tracking-wider uppercase font-bold transition duration-300 flex flex-col items-center gap-2 ${
                selectedCrop === key
                  ? 'bg-cyan-600 border-cyan-500 text-white shadow-md'
                  : 'bg-white border-slate-200 hover:border-cyan-600 text-slate-600 hover:text-slate-800'
              }`}
            >
              <RiSeedlingLine className="text-xl" />
              {key} protection
            </button>
          ))}
        </div>

        {/* crop details Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCrop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Visual Panel */}
            <div className="rounded-[30px] overflow-hidden border border-slate-200 shadow-md aspect-video relative">
              <img src={current.img} alt={current.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 right-4 bg-rose-50 text-[9px] font-mono tracking-widest font-bold border border-rose-200 px-3 py-1 rounded-full text-rose-600 uppercase shadow-sm">
                {current.threat}
              </span>
            </div>

            {/* Info panel */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-cyan-600 font-mono tracking-widest uppercase font-bold">SAVAXA SHIELD MATRIX</span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 font-display mt-0.5">{current.name}</h2>
              </div>

              <div className="space-y-4 font-sans text-xs md:text-sm">
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                  <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">Target Pathogens:</span>
                  <span className="text-slate-700 font-bold block mt-1">{current.pathogen}</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                  <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">Biological Damage Symptoms:</span>
                  <span className="text-slate-500 font-light block mt-1 leading-relaxed">{current.symptoms}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                    <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">Mixing Ratio:</span>
                    <span className="text-cyan-700 font-bold block mt-1">{current.mixingRatio}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                    <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">Mixing Formula:</span>
                    <span className="text-emerald-700 font-bold block mt-1">{current.formula}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200/60 p-4 rounded-2xl">
                  <span className="text-emerald-700 block font-mono text-[9px] uppercase font-bold">Spraying Intervals:</span>
                  <span className="text-slate-700 font-light block mt-1 leading-relaxed">{current.sprayingInterval}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
