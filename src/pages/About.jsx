import { motion } from 'framer-motion'
import { 
  RiShieldCheckLine, 
  RiFlaskLine, 
  RiPlantLine, 
  RiAwardLine, 
  RiLeafLine, 
  RiGroupLine,
  RiGlobalLine,
  RiUserLine
} from 'react-icons/ri'

export default function About() {
  const visions = [
    { 
      title: "Sustainable Agronomy", 
      desc: "Developing selective pesticide formulations that degrade naturally in soil with zero long-term active chemical residues.", 
      icon: <RiLeafLine className="text-emerald-600 text-2xl" /> 
    },
    { 
      title: "Yield Maximization", 
      desc: "Empowering growers to defend crop panicles, cotton bolls, and paddy fields from heavy infestations, boosting farm profitability.", 
      icon: <RiPlantLine className="text-emerald-600 text-2xl" /> 
    },
    { 
      title: "Scientific Innovation", 
      desc: "Continuously researching active spore biological blockades and hyperbaric bio-stimulant synthesis in our R&D labs.", 
      icon: <RiFlaskLine className="text-teal-600 text-2xl" /> 
    },
    { 
      title: "Grower & Farmer Welfare", 
      desc: "Delivering free diagnostic resources, crop guides, and agronomist support directly to rural farming communities across India.", 
      icon: <RiUserLine className="text-emerald-600 text-2xl" /> 
    },
    { 
      title: "Quality Integrity Assured", 
      desc: "Running strict batch-wise chemical assays, gas chromatography, and raw material tests to confirm 100% active compound ratios.", 
      icon: <RiShieldCheckLine className="text-teal-600 text-2xl" /> 
    },
    { 
      title: "Empowered Dealer Network", 
      desc: "Building a transparent, digitized supply system that ensures dealers receive fresh, properly sealed products on time.", 
      icon: <RiGroupLine className="text-emerald-600 text-2xl" /> 
    }
  ]

  const metrics = [
    { value: "2023", label: "Establishment Year", desc: "Forged with a clear vision to deliver high-efficacy crop protection." },
    { value: "75+", label: "CIB Registered Brands", desc: "A comprehensive range of registered agrochemicals tested across crops." },
    { value: "500+", label: "Dealers & Distributors", desc: "A highly dedicated distribution network across premium farming hubs." }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Sprout Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1463123081488-729f654b05ec?auto=format&fit=crop&w=1920&q=80" 
          alt="Lush Agricultural Crops Watermark" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Decorative Blur Circles */}
      <div className="absolute top-[8%] left-0 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-[130px] pointer-events-none animate-glow-1" />
      <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-teal-50/30 rounded-full filter blur-[150px] pointer-events-none animate-glow-2" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 space-y-24">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs font-mono tracking-widest text-emerald-650 uppercase font-bold">SAVAXA BIO-AGRI SCIENCES</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display uppercase">
            ABOUT <span className="text-gradient">SAVAXA</span>
          </h1>
          <p className="text-slate-550 text-sm leading-relaxed font-light">
            Empowering modern agriculture through scientifically backed pesticide formulations, selective crop protection agents, and premium bio-stimulants.
          </p>
        </div>

        {/* Narrative & History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <RiGlobalLine className="text-emerald-600 text-xs" />
              <span className="text-[10px] tracking-widest uppercase font-mono text-emerald-700 font-bold">ESTABLISHED IN 2023</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 font-display leading-tight uppercase">
              PIONEERING FUTURE <br />
              <span className="text-gradient">CROP PROTECTION</span>
            </h2>
            <p className="text-slate-650 text-sm leading-relaxed font-light">
              Established in **2023**, Savaxa Bio-Agri Sciences began with a vital mission: to bridge the gap between complex biochemical science and field-level crop safety. Driven by the pressing challenges of crop loss and pest mutations, Savaxa established advanced chemical blending reactors and R&D facilities to create high-efficacy pesticides that deliver supreme target lethality while respecting the surrounding soil ecosystem.
            </p>
            <p className="text-slate-650 text-sm leading-relaxed font-light">
              In a remarkably short duration since 2023, Savaxa has grown into a highly trusted agrochemical name. We produce selective herbicides for water-bound paddy, fast-acting insecticides for lepidoptera pests, and organic bio-inoculants that have safeguarded thousands of cultivation acres, ensuring high yields and secure profits for crop growers.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <RiAwardLine className="text-emerald-600 text-lg" /> CIB&RC Approved Formulations
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <RiLeafLine className="text-emerald-600 text-lg" /> Maximum Eco-Soil Safety
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/60 aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1595348020949-87cdfbd44174?auto=format&fit=crop&w=1000&q=80" 
              alt="Scientific Crop Cultivation" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </div>
        </div>

        {/* 2. VISIONARY MD SPOTLIGHT SECTION */}
        <section className="glass-panel rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-sm relative overflow-hidden bg-white/70">
          {/* Subtle watermark overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/10 rounded-full filter blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Photo of Dr Narendar Reddy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative group rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md aspect-square bg-slate-100 max-w-sm mx-auto">
                <img 
                  src="/md.png" 
                  alt="Dr. Narendar Reddy - Managing Director" 
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
              </div>
            </div>

            {/* Right side: Detailed Spotlight Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[10px] text-emerald-600 font-mono tracking-widest uppercase font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  LEADERSHIP SPOTLIGHT
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display mt-2 uppercase">
                  DR. NARENDAR REDDY
                </h3>
                <p className="text-xs font-bold text-slate-500 font-mono tracking-wider flex items-center gap-1.5">
                  <RiAwardLine className="text-emerald-600 text-lg shrink-0" />
                  <span>QUALIFICATION: MBA (AGRI-BUSINESS MANAGEMENT) & PH.D. IN AGRONOMY</span>
                </p>
              </div>

              <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-transparent w-32" />

              <p className="text-slate-650 text-sm leading-relaxed font-light">
                Under the visionary stewardship of **Dr. Narendar Reddy**, Savaxa Bio-Agri Sciences has evolved into an agile crop protection trailblazer in South India. Holding a specialized **MBA in Agri-Business Management** combined with a **doctorate in agricultural sciences**, Dr. Narendar Reddy combines advanced biochemical research insight with high-level corporate and rural strategic vision. 
              </p>
              <p className="text-slate-650 text-sm leading-relaxed font-light">
                His absolute dedication to farmer welfare and deep field-level understanding has steered Savaxa to design target-specific, selective crop molecules. Dr. Reddy believes that future agriculture lies in **precision-guided chemistries**—formulations that effectively neutralize target destructive bugs while causing zero harm to friendly insect populations or soil microbes. His leadership ensures Savaxa delivers premium quality, verified effectiveness, and eco-sustainable products across Indian states.
              </p>

              {/* A beautiful quote */}
              <div className="p-4 bg-slate-50 border-l-4 border-emerald-500 rounded-r-2xl font-display text-slate-700 italic text-sm leading-relaxed">
                "Our technology must always serve the farmer first. We don't just sell chemical compounds; we provide scientific shield arrays that empower farmers to cultivate rich, safe, and highly profitable harvests."
                <span className="block mt-2 text-xs font-mono font-bold tracking-wider text-slate-550 not-italic uppercase">— DR. NARENDAR REDDY, MD</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR VISIONS & VALUES SECTION (6 dynamic cards) */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] text-emerald-600 font-mono tracking-widest uppercase font-bold">GUIDING PRINCIPLES</span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-slate-800 font-display uppercase">
              OUR <span className="text-gradient">VISIONS & VALUES</span>
            </h3>
            <p className="text-slate-500 text-xs font-light">The core molecular and strategic foundations directing Savaxa Bio-Agri Sciences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visions.map((v, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm hover:border-emerald-500/20 transition duration-300">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                  {v.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">MISSION POINT 0{idx + 1}</h4>
                  <h3 className="text-base font-bold text-slate-800 tracking-wider font-display uppercase">{v.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-200/60 text-center space-y-2 shadow-sm hover:border-emerald-400/25 transition duration-300 bg-white/80">
              <span className="text-3xl md:text-4xl font-extrabold text-emerald-600 font-display">{m.value}</span>
              <h4 className="text-xs font-bold text-slate-800 tracking-widest uppercase font-display">{m.label}</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">{m.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
