import { motion } from 'framer-motion'
import { RiBugLine, RiShieldCheckLine, RiSeedlingLine, RiFlaskLine, RiFilterLine } from 'react-icons/ri'

export default function PestControl() {
  const pestsData = [
    {
      name: "American Bollworm",
      sciName: "Helicoverpa armigera",
      type: "Lepidoptera Caterpillar",
      crops: "Cotton, Maize, Pigeon pea, Chickpea, Tomato",
      symptoms: "Bores circular holes into cotton bolls and tomato fruits, feeding internally. Yield drops drastically.",
      control: "Chlorantraniliprole 18.5% SC (Bollgard-Zap Force)",
      img: "/american_bollworm.png",
      risk: "Critical / High Destruction"
    },
    {
      name: "Whiteflies",
      sciName: "Bemisia tabaci",
      type: "Hemiptera Sucking Pest",
      crops: "Cotton, Chili, Brinjal, Tomato, Cucurbits",
      symptoms: "Sucks cellular sap from leaves underside. Leaves curl downwards. Secretes sticky honeydew forming black soot.",
      control: "Spirotetramat 15% + Imidacloprid 30% SC (Shield-Ultra)",
      img: "/whiteflies.png",
      risk: "High / Curl Virus Vector"
    },
    {
      name: "Barnyard Grass Weeds",
      sciName: "Echinochloa crus-galli",
      type: "Poaceae Invasive Grass",
      crops: "Paddy Rice (Direct seeded & Transplanted)",
      symptoms: "Chokes cash crops within early tillering weeks, stealing 60% of soil nitrogen nutrients and moisture.",
      control: "Bispyribac-sodium 10% SC (Vanquish-X)",
      img: "/barnyard_grass.png",
      risk: "Severe Nutrient Theft"
    },
    {
      name: "Damping-off Fungi",
      sciName: "Pythium spp.",
      type: "Oomycete Root Rot",
      crops: "Tomato nursery beds, Chili, Pulses, Tobacco",
      symptoms: "Rotting and water-soaking of seedling stems at the ground soil level, leading to instant nursery collapse.",
      control: "Trichoderma viride bio-agent (BioRoot Protect)",
      img: "/damping_off.png",
      risk: "Severe Nursery Threat"
    },
    {
      name: "Powdery Mildew Rust",
      sciName: "Erysiphe polygoni",
      type: "Ascomycete Foliar Infection",
      crops: "Chili, Apple orchards, Onion, Peas, Mango",
      symptoms: "White powdery patches covering leaf and flower surfaces. Flower buds drop prematurely before fruit fertilization.",
      control: "Azoxystrobin + Tebuconazole (LeafRust Sentinel)",
      img: "/powdery_mildew.png",
      risk: "Severe Canopy Damage"
    },
    {
      name: "Sucking Thrips",
      sciName: "Scirtothrips dorsalis",
      type: "Thysanoptera Scourge",
      crops: "Chili, Tomato, Grapes, Rose, Citrus",
      symptoms: "Tears plant cells to suck fluid. Leaf tips dry, turn brown, and curl upwards forming typical boat shapes.",
      control: "Shield-Ultra Systemic SC formulations",
      img: "/sucking_thrips.png",
      risk: "High Foliage Scorch"
    }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Tomato Crop Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=1920&q=80" 
          alt="Tomato crop field background" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Decorative Warm Organic Blur Circles */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-emerald-650 uppercase font-bold">SAVAXA CROP PROTECTION DATABASE</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display uppercase">
            PEST IDENTIFICATION
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Locate and inspect damage symptoms of major agricultural pests, pathogens, and certified Savaxa control solutions.
          </p>
        </div>

        {/* Diagnostic cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pestsData.map((pest, idx) => (
            <motion.div
              key={idx}
              className="glass-card border border-slate-200/60 rounded-3xl overflow-hidden flex flex-col justify-between p-5 space-y-6 group shadow-sm bg-white/80"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {/* Image and risk indicator */}
                <div className="h-48 rounded-2xl overflow-hidden relative">
                  <img src={pest.img} alt={pest.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 right-3 bg-white/95 text-[8px] font-mono tracking-widest font-bold border border-rose-200 px-3 py-1 rounded-full text-rose-600 uppercase shadow-sm">
                    {pest.risk}
                  </span>
                </div>

                {/* Classification details */}
                <div>
                  <p className="text-[10px] text-emerald-600 font-mono tracking-widest uppercase font-bold">{pest.type}</p>
                  <h3 className="text-xl font-bold text-slate-800 mt-1 font-display">{pest.name}</h3>
                  <p className="text-xs text-slate-500 italic font-mono mt-0.5">{pest.sciName}</p>
                </div>

                {/* Target Host Crops and symptoms list */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 uppercase font-bold block">Host Crops:</span>
                    <span className="text-slate-700 font-sans text-xs mt-1 block font-semibold">{pest.crops}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold block">Damage Symptoms:</span>
                    <span className="text-slate-550 font-sans text-xs mt-1 block leading-relaxed font-light">{pest.symptoms}</span>
                  </div>
                </div>
              </div>

              {/* control suggestion block */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 flex gap-3.5 items-center shadow-inner">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                  <RiBugLine className="text-rose-500 text-lg" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase block font-bold">Certified Active Agent:</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{pest.control}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
