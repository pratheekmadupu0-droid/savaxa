import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Leaf, Search, FlaskConical } from 'lucide-react'
import SEO from '../components/SEO'

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
    <div className="font-inter bg-[var(--color-brand-surface)] min-h-screen pt-32 pb-24">
      <SEO 
        title={`${product.name} | SAVAXA Crop Care`}
        description={product.desc}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[var(--color-brand-primary)] transition-colors mb-8 uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        {/* Primary Specs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Product Images & Core Data */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-[var(--color-blue-100)] shadow-sm bg-white aspect-[4/3] relative flex items-center justify-center p-8">
              <img src={product.img} alt={product.name} className="max-w-full max-h-full object-contain" />
              <span className="absolute top-4 left-4 bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-[var(--color-blue-100)] shadow-sm">
                {product.category}
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[var(--color-blue-100)] space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-[var(--color-brand-navy)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[var(--color-brand-primary)]" /> Core Specifications
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--color-brand-surface)] p-4 rounded-2xl border border-[var(--color-blue-100)]">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold tracking-widest mb-1">Active Chemical</span>
                  <span className="text-[var(--color-brand-navy)] text-sm font-bold leading-snug">{product.chemicalName}</span>
                </div>
                <div className="bg-[var(--color-brand-surface)] p-4 rounded-2xl border border-[var(--color-blue-100)]">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold tracking-widest mb-1">Solubility Grade</span>
                  <span className="text-[var(--color-brand-navy)] text-sm font-bold leading-snug">{product.solubility}</span>
                </div>
                <div className="bg-[var(--color-brand-surface)] p-4 rounded-2xl border border-[var(--color-blue-100)]">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold tracking-widest mb-1">Acre Dosage</span>
                  <span className="text-[var(--color-brand-navy)] text-sm font-bold leading-snug">{product.dosage}</span>
                </div>
                <div className="bg-[var(--color-brand-surface)] p-4 rounded-2xl border border-[var(--color-blue-100)]">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold tracking-widest mb-1">Toxicity Class</span>
                  <span className="text-[var(--color-brand-navy)] text-sm font-bold leading-snug">{product.toxicity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Composition & dosage */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-montserrat font-extrabold text-[var(--color-brand-navy)] leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Composition Table */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[var(--color-blue-100)] shadow-sm">
              <h3 className="text-sm font-bold text-[var(--color-brand-navy)] uppercase tracking-wider mb-6 flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--color-brand-primary)]" /> Chemical Composition
              </h3>
              <div className="overflow-hidden rounded-2xl border border-[var(--color-blue-100)]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-brand-surface)] border-b border-[var(--color-blue-100)]">
                      <th className="p-4 text-xs uppercase font-bold text-slate-500 tracking-wider">Ingredient Component</th>
                      <th className="p-4 text-xs uppercase font-bold text-slate-500 tracking-wider text-right">Active %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-blue-100)]">
                    {product.composition.map((c, index) => (
                      <tr key={index} className="hover:bg-[var(--color-brand-surface)] transition-colors">
                        <td className="p-4 text-sm font-bold text-[var(--color-brand-navy)]">{c.ingredient}</td>
                        <td className="p-4 text-sm font-bold text-[var(--color-brand-primary)] text-right">{c.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Target Crops Table */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[var(--color-blue-100)] shadow-sm">
              <h3 className="text-sm font-bold text-[var(--color-brand-navy)] uppercase tracking-wider mb-6 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[var(--color-brand-primary)]" /> Application Chart
              </h3>
              <div className="overflow-hidden rounded-2xl border border-[var(--color-blue-100)]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-brand-surface)] border-b border-[var(--color-blue-100)]">
                      <th className="p-4 text-xs uppercase font-bold text-slate-500 tracking-wider">Host Crop</th>
                      <th className="p-4 text-xs uppercase font-bold text-slate-500 tracking-wider">Target Pests</th>
                      <th className="p-4 text-xs uppercase font-bold text-slate-500 tracking-wider text-right">Dosage Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-blue-100)]">
                    {product.crops.map((c, index) => (
                      <tr key={index} className="hover:bg-[var(--color-brand-surface)] transition-colors">
                        <td className="p-4 text-sm font-bold text-[var(--color-brand-navy)] whitespace-nowrap">{c.crop}</td>
                        <td className="p-4 text-sm text-slate-600">{c.pest}</td>
                        <td className="p-4 text-sm font-bold text-[var(--color-brand-primary)] text-right whitespace-nowrap">{c.rate}</td>
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
