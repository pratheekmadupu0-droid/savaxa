import { useSearchParams, Link } from 'react-router-dom'
import { RiArrowLeftLine, RiFlaskLine, RiShieldCheckLine, RiPlantLine, RiSeedlingLine } from 'react-icons/ri'

export default function ProductDetails() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') || 'sav-ultra-1'

  const productsList = [
    {
      id: "sav-ultra-1",
      name: "Shield-Ultra Insecticide",
      category: "Insecticides",
      desc: "Advanced chemical insecticide designed to target and suppress sucking & chewing lepidoptera pest structures instantly upon foliar application, with excellent crop safety.",
      chemicalName: "Spirotetramat 15% + Imidacloprid 30% SC",
      solubility: "100% Water dispersible suspension concentrate (SC)",
      toxicity: "Class III (Slightly Hazardous - Blue Label)",
      dosage: "120 - 150 ml per Acre",
      composition: [
        { ingredient: "Spirotetramat Active", percentage: "15.00%" },
        { ingredient: "Imidacloprid Active", percentage: "30.00%" },
        { ingredient: "Aqueous Emulsifiers & Wetting Agents", percentage: "12.50%" },
        { ingredient: "Carrier Medium & Stabilizers", percentage: "42.55%" }
      ],
      crops: [
        { crop: "Cotton", pest: "Whiteflies, Thrips, Aphids", rate: "150 ml / Acre" },
        { crop: "Tomato", pest: "Fruit Borer, Sucking Pests", rate: "120 ml / Acre" },
        { crop: "Chili", pest: "Sucking Thrips, Yellow Mites", rate: "150 ml / Acre" }
      ],
      img: "https://images.unsplash.com/photo-1595348020949-87cdfbd44174?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "sav-weed-2",
      name: "Vanquish-X Herbicide",
      category: "Herbicides",
      desc: "Broad-spectrum weed elimination solution designed to selectively eradicate aggressive grassy weeds and sedges in direct seeded and transplanted rice fields.",
      chemicalName: "Bispyribac-sodium 10% SC",
      solubility: "Fully miscible in soft agricultural spray waters",
      toxicity: "Class IV (Practically Non-Toxic - Green Label)",
      dosage: "80 - 100 ml per Acre",
      composition: [
        { ingredient: "Bispyribac-sodium Active", percentage: "10.00%" },
        { ingredient: "Selective Leaf Penetrants", percentage: "15.00%" },
        { ingredient: "Eco Stabilizing Emulsifiers", percentage: "8.00%" },
        { ingredient: "Aqueous Carrier Solvent Base", percentage: "67.00%" }
      ],
      crops: [
        { crop: "Direct Seeded Rice", pest: "Barnyard Grass, Sedges, Broadleaves", rate: "100 ml / Acre" },
        { crop: "Transplanted Rice", pest: "Echinochloa, Digitaria Grass", rate: "80 ml / Acre" }
      ],
      img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "sav-fung-3",
      name: "BioRoot Fungicide",
      category: "Fungicides",
      desc: "High-performance biological spore defense shielding agricultural crops from leaf rust, powdery mildews, and nursery bed damping-off.",
      chemicalName: "Trichoderma viride bio-agent formulation",
      solubility: "Wettable powder dispersion",
      toxicity: "Class IV (Eco-Safe Biological)",
      dosage: "1.0 - 2.0 kg per Acre soil application",
      composition: [
        { ingredient: "Trichoderma Spores (CFU 2x10^6)", percentage: "1.50%" },
        { ingredient: "Organic Carrier Starch", percentage: "88.50%" },
        { ingredient: "Viability Preservatives", percentage: "10.00%" }
      ],
      crops: [
        { crop: "Vegetable Nurseries", pest: "Pythium Damping-Off", rate: "2.0 kg / Acre" },
        { crop: "Chili & Tomato", pest: "Fusarium Wilt, Root Rot", rate: "1.5 kg / Acre" }
      ],
      img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "sav-stim-4",
      name: "SOLVO Biostimulant",
      category: "Biostimulants",
      desc: "Premium organic seaweed extract growth catalyst that increases tillering, panicle formation, and flower density.",
      chemicalName: "Organic Seaweed (Ascophyllum nodosum) Extracts",
      solubility: "100% Water soluble solution",
      toxicity: "Class IV (Non-Toxic Organic)",
      dosage: "250 ml per Acre foliar spray",
      composition: [
        { ingredient: "Ascophyllum nodosum Extractions", percentage: "20.00%" },
        { ingredient: "Amino Acid Chelates", percentage: "10.00%" },
        { ingredient: "Vitamins & Fulvic acids", percentage: "5.00%" },
        { ingredient: "Stabilized Aqueous base", percentage: "65.00%" }
      ],
      crops: [
        { crop: "Paddy Rice", pest: "Tillering Enhancement", rate: "250 ml / Acre" },
        { crop: "Cotton", pest: "Boll Retention, Flowering", rate: "250 ml / Acre" },
        { crop: "Tomato", pest: "Fruit Setting, Size", rate: "200 ml / Acre" }
      ],
      img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80"
    }
  ]

  const product = productsList.find(p => p.id === id) || productsList[0]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Macro Foliage Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1920&q=80" 
          alt="Macro Leaf Texture Watermark" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Decorative Warm Organic Blur Circles */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-96 h-96 bg-teal-100/30 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-550 hover:text-emerald-600 transition mb-8 uppercase tracking-widest font-mono">
          <RiArrowLeftLine className="text-sm" /> Back to Products
        </Link>

        {/* Primary Specs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Product Images & Core Data */}
          <div className="space-y-6">
            <div className="rounded-[30px] overflow-hidden border border-slate-200 shadow-md aspect-video relative">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-white/95 text-[9px] font-mono tracking-widest font-extrabold border border-emerald-200 px-3 py-1.5 rounded-full text-emerald-600 uppercase shadow-sm">
                {product.category}
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm bg-white/70">
              <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">Technical Crop Care Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">Active Chemical</span>
                  <span className="text-slate-850 font-sans font-bold block mt-1">{product.chemicalName}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">Solubility Grade</span>
                  <span className="text-slate-850 block mt-1 font-sans font-bold">{product.solubility}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">Acre Dosage</span>
                  <span className="text-slate-850 block mt-1 font-bold">{product.dosage}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">Toxicity Class</span>
                  <span className="text-slate-850 block mt-1 font-bold">{product.toxicity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Composition & dosage */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-650 text-sm md:text-base leading-relaxed font-light">
                {product.desc}
              </p>
            </div>

            {/* composition Table */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm bg-white/70">
              <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">Active Chemical Composition</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
                      <th className="p-3 uppercase font-bold">Ingredient Component</th>
                      <th className="p-3 text-right uppercase font-bold">Active Percentage %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.composition.map((c, index) => (
                      <tr key={index} className="border-b border-slate-100 text-slate-700 hover:bg-slate-50/50">
                        <td className="p-3 font-semibold">{c.ingredient}</td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-600">{c.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Target Crops Table */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm bg-white/70">
              <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">Recommended Field Application Spraying Chart</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
                      <th className="p-3 uppercase font-bold">Host Crop</th>
                      <th className="p-3 uppercase font-bold">Target Pests / Diseases / Stressors</th>
                      <th className="p-3 text-right uppercase font-bold">Spraying Dosage Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.crops.map((c, index) => (
                      <tr key={index} className="border-b border-slate-100 text-slate-700 hover:bg-slate-50/50">
                        <td className="p-3 font-bold">{c.crop}</td>
                        <td className="p-3 text-slate-600 font-semibold">{c.pest}</td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-600">{c.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
