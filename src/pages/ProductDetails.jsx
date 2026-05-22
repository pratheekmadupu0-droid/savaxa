import { useSearchParams, Link } from 'react-router-dom'
import { RiArrowLeftLine, RiFlaskLine, RiShieldCheckLine, RiPlantLine, RiSeedlingLine } from 'react-icons/ri'
import { useLanguage } from '../context/LanguageContext'

export default function ProductDetails() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') || 'sav-ultra-1'

  const productsList = [
    {
      id: "sav-ultra-1",
      name: t("Shield-Ultra Insecticide", "షీల్డ్-అల్ట్రా కీటకనాశని (Shield-Ultra)"),
      category: t("Insecticides", "కీటకనాశకాలు"),
      desc: t("Advanced chemical insecticide designed to target and suppress sucking & chewing lepidoptera pest structures instantly upon foliar application, with excellent crop safety.", "ఆకులను ఆశించే కాయతొలిచే పురుగులు, పెంకు పురుగులు మరియు రసంపీల్చే పురుగులను సమర్థవంతంగా అరికట్టే అత్యాధునిక కీటకనాశని."),
      chemicalName: t("Spirotetramat 15% + Imidacloprid 30% SC", "స్పిరోటెట్రామాట్ 15% + ఇమిడాక్లోప్రిడ్ 30% SC"),
      solubility: t("100% Water dispersible suspension concentrate (SC)", "నీటిలో పూర్తిగా కరిగే ద్రవరూప రసాయనం (SC)"),
      toxicity: t("Class III (Slightly Hazardous - Blue Label)", "तरగతి III (స్వల్ప ముప్పు - బ్లూ లేబుల్)"),
      dosage: t("120 - 150 ml per Acre", "ఎకరానికి 120 - 150 మి.లీ"),
      composition: [
        { ingredient: t("Spirotetramat Active", "స్పిరోటెట్రామాట్ క్రియాశీల రసాయనం"), percentage: "15.00%" },
        { ingredient: t("Imidacloprid Active", "ఇమిడాక్లోప్రిడ్ క్రియాశీల రసాయనం"), percentage: "30.00%" },
        { ingredient: t("Aqueous Emulsifiers & Wetting Agents", "ద్రవ ఎమల్సిఫైయర్లు & తడిపే ఏజెంట్లు"), percentage: "12.50%" },
        { ingredient: t("Carrier Medium & Stabilizers", "వాహక ద్రావణాలు & స్టెబిలైజర్లు"), percentage: "42.55%" }
      ],
      crops: [
        { crop: t("Cotton", "పత్తి"), pest: t("Whiteflies, Thrips, Aphids", "తెల్లదోమలు, తామర పురుగులు, పేనుబంక"), rate: t("150 ml / Acre", "ఎకరానికి 150 మి.లీ") },
        { crop: t("Tomato", "టమోటా"), pest: t("Fruit Borer, Sucking Pests", "కాయతొలిచే పురుగు, రసంపీల్చే పురుగులు"), rate: t("120 ml / Acre", "ఎకరానికి 120 మి.లీ") },
        { crop: t("Chili", "మిరప"), pest: t("Sucking Thrips, Yellow Mites", "తామర పురుగులు, ఎర్ర నల్లి"), rate: t("150 ml / Acre", "ఎకరానికి 150 మి.లీ") }
      ],
      img: "https://images.unsplash.com/photo-1595348020949-87cdfbd44174?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "sav-weed-2",
      name: t("Vanquish-X Herbicide", "వాన్క్విష్-X కలుపునాశని (Vanquish-X)"),
      category: t("Herbicides", "కలుపునాశకాలు"),
      desc: t("Broad-spectrum weed elimination solution designed to selectively eradicate aggressive grassy weeds and sedges in direct seeded and transplanted rice fields.", "వరి పంటలో వెడల్పాటి ఆకు కలుపు, తుంగ మరియు గడ్డి కలుపు మొక్కలను ఏరిపారేసే కలుపునాశని."),
      chemicalName: t("Bispyribac-sodium 10% SC", "బిస్పైరిబాక్-సోడియం 10% SC"),
      solubility: t("Fully miscible in soft agricultural spray waters", "నీటిలో పూర్తిగా కరిగే కలుపునాశక రసాయనం"),
      toxicity: t("Class IV (Practically Non-Toxic - Green Label)", "తరగతి IV (సురక్షితం - గ్రీన్ లేబుల్)"),
      dosage: t("80 - 100 ml per Acre", "ఎకరానికి 80 - 100 మి.లీ"),
      composition: [
        { ingredient: t("Bispyribac-sodium Active", "బిస్పైరిబాక్-సోడియం క్రియాశీల రసాయనం"), percentage: "10.00%" },
        { ingredient: t("Selective Leaf Penetrants", "ఆకులలోనికి చొచ్చుకుపోయే పెనెట్రెంట్లు"), percentage: "15.00%" },
        { ingredient: t("Eco Stabilizing Emulsifiers", "పర్యావరణ అనుకూల ఎమల్సిఫైయర్లు"), percentage: "8.00%" },
        { ingredient: t("Aqueous Carrier Solvent Base", "జల వాహక ద్రావణ బేస్"), percentage: "67.00%" }
      ],
      crops: [
        { crop: t("Direct Seeded Rice", "నేరుగా విత్తిన వరి"), pest: t("Barnyard Grass, Sedges, Broadleaves", "ఊద గడ్డి, తుంగ, వెడల్పాటి ఆకు కలుపు"), rate: t("100 ml / Acre", "ఎకరానికి 100 మి.లీ") },
        { crop: t("Transplanted Rice", "నాట్లు వేసిన వరి"), pest: t("Echinochloa, Digitaria Grass", "గడ్డి జాతి కలుపు మొక్కలు"), rate: t("80 ml / Acre", "ఎకరానికి 80 మి.లీ") }
      ],
      img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "sav-fung-3",
      name: t("BioRoot Fungicide", "బయోరూట్ శిలీంద్రనాశని (BioRoot)"),
      category: t("Fungicides", "శిలీంద్రనాశకాలు"),
      desc: t("High-performance biological spore defense shielding agricultural crops from leaf rust, powdery mildews, and nursery bed damping-off.", "నారుమడులలో నారుకుళ్లు తెగులు, బూడిద తెగులు మరియు ఆకుమచ్చ తెగుళ్ళ నుండి పంటలను కాపాడే బయో-ఉత్ప్రేరక శిలీంద్రనాశని."),
      chemicalName: t("Trichoderma viride bio-agent formulation", "ట్రైకోడెర్మా విరిడి బయో-ఏజెంట్ ఫార్ములేషన్"),
      solubility: t("Wettable powder dispersion", "నీటిలో కరిగే పొడి రూప శిలీంద్రనాశని"),
      toxicity: t("Class IV (Eco-Safe Biological)", "తరగతి IV (పర్యావరణ అనుకూలం - జీవ రసాయనం)"),
      dosage: t("1.0 - 2.0 kg per Acre soil application", "ఎకరానికి 1.0 - 2.0 కిలోలు నేలలో వేయాలి"),
      composition: [
        { ingredient: t("Trichoderma Spores (CFU 2x10^6)", "ట్రైకోడెర్మా స్పోర్స్ (CFU 2x10^6)"), percentage: "1.50%" },
        { ingredient: t("Organic Carrier Starch", "సేంద్రీయ పిండి వాహకం"), percentage: "88.50%" },
        { ingredient: t("Viability Preservatives", "జీవ నిల్వ రసాయనాలు"), percentage: "10.00%" }
      ],
      crops: [
        { crop: t("Vegetable Nurseries", "కూరగాయల నారుమడులు"), pest: t("Pythium Damping-Off", "నారుకుళ్లు తెగులు"), rate: t("2.0 kg / Acre", "ఎకరానికి 2.0 కిలోలు") },
        { crop: t("Chili & Tomato", "మిరప & టమోటా"), pest: t("Fusarium Wilt, Root Rot", "ఎండు తెగులు, వేరుకుళ్లు తెగులు"), rate: t("1.5 kg / Acre", "ఎకరానికి 1.5 కిలోలు") }
      ],
      img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "sav-stim-4",
      name: t("SOLVO Biostimulant", "సోల్వో బయో-ఉత్ప్రేరకం (SOLVO)"),
      category: t("Biostimulants", "బయో-ఉత్ప్రేరకాలు"),
      desc: t("Premium organic seaweed extract growth catalyst that increases tillering, panicle formation, and flower density.", "సేంద్రీయ పద్ధతిలో పంట పెరుగుదలను వేగవంతం చేసి, అధిక పూత, కాయ మరియు ఆశించిన గరిష్ట దిగుబడిని పెంచే అత్యుత్తమ బయో-ఉత్ప్రేరకం."),
      chemicalName: t("Organic Seaweed (Ascophyllum nodosum) Extracts", "సేంద్రీయ సముద్రపు నాచు (Ascophyllum nodosum) సారం"),
      solubility: t("100% Water soluble solution", "100% నీటిలో కరిగే సేంద్రీయ ద్రావణం"),
      toxicity: t("Class IV (Non-Toxic Organic)", "తరగతి IV (పూర్తి సేంద్రీయం - నాన్-టాక్సిక్)"),
      dosage: t("250 ml per Acre foliar spray", "ఎకరానికి 250 మి.లీ ఆకులపై పిచికారీ"),
      composition: [
        { ingredient: t("Ascophyllum nodosum Extractions", "సముద్రపు నాచు సారం"), percentage: "20.00%" },
        { ingredient: t("Amino Acid Chelates", "అమినో యాసిడ్ చెలేట్స్"), percentage: "10.00%" },
        { ingredient: t("Vitamins & Fulvic acids", "విటమిన్లు & ఫుల్విక్ ఆమ్లాలు"), percentage: "5.00%" },
        { ingredient: t("Stabilized Aqueous base", "స్టెబిలైజ్డ్ జల ద్రావణం"), percentage: "65.00%" }
      ],
      crops: [
        { crop: t("Paddy Rice", "వరి పంట"), pest: t("Tillering Enhancement", "పిలకల పెరుగుదల పెంపు"), rate: t("250 ml / Acre", "ఎకరానికి 250 మి.లీ") },
        { crop: t("Cotton", "పత్తి"), pest: t("Boll Retention, Flowering", "కాయలు నిలబడటం, అధిక పూత"), rate: t("250 ml / Acre", "ఎకరానికి 250 మి.లీ") },
        { crop: t("Tomato", "టమోటా"), pest: t("Fruit Setting, Size", "అధిక పిందెలు, పెద్ద కాయల సైజు"), rate: t("200 ml / Acre", "ఎకరానికి 200 మి.లీ") }
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
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-blue-100/20/30 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-96 h-96 bg-teal-100/30 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-550 hover:text-blue-600 transition mb-8 uppercase tracking-widest font-mono">
          <RiArrowLeftLine className="text-sm" /> {t("Back to Products", "తిరిగి ఉత్పత్తులకు")}
        </Link>

        {/* Primary Specs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Product Images & Core Data */}
          <div className="space-y-6">
            <div className="rounded-[30px] overflow-hidden border border-slate-200 shadow-md aspect-video relative">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-white/95 text-[9px] font-mono tracking-widest font-extrabold border border-blue-200 px-3 py-1.5 rounded-full text-blue-600 uppercase shadow-sm">
                {product.category}
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm bg-white/70">
              <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">
                {t("Technical Crop Care Specifications", "సాంకేతిక పంట రక్షణ వివరాలు")}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">{t("Active Chemical", "క్రియాశీల రసాయనం")}</span>
                  <span className="text-slate-850 font-sans font-bold block mt-1">{product.chemicalName}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">{t("Solubility Grade", "కరగడం (Solubility)")}</span>
                  <span className="text-slate-850 block mt-1 font-sans font-bold">{product.solubility}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">{t("Acre Dosage", "ఎకరా మోతాదు")}</span>
                  <span className="text-slate-850 block mt-1 font-bold">{product.dosage}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">{t("Toxicity Class", "విషపూరిత తీవ్రత")}</span>
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
              <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">
                {t("Active Chemical Composition", "రసాయన కూర్పు వివరాలు (Composition)")}
              </h3>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
                      <th className="p-3 uppercase font-bold">{t("Ingredient Component", "క్రియాశీల కారకాలు")}</th>
                      <th className="p-3 text-right uppercase font-bold">{t("Active Percentage %", "శాతం %")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.composition.map((c, index) => (
                      <tr key={index} className="border-b border-slate-100 text-slate-700 hover:bg-slate-50/50">
                        <td className="p-3 font-semibold">{c.ingredient}</td>
                        <td className="p-3 text-right font-mono font-bold text-blue-600">{c.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Target Crops Table */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm bg-white/70">
              <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">
                {t("Recommended Field Application Spraying Chart", "సిఫార్సు చేయబడిన పిచికారీ పట్టిక")}
              </h3>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
                      <th className="p-3 uppercase font-bold">{t("Host Crop", "పంట రకం")}</th>
                      <th className="p-3 uppercase font-bold">{t("Target Pests / Diseases / Stressors", "లక్ష్య కీటకాలు / తెగుళ్లు")}</th>
                      <th className="p-3 text-right uppercase font-bold">{t("Spraying Dosage Rate", "పిచికారీ మోతాదు")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.crops.map((c, index) => (
                      <tr key={index} className="border-b border-slate-100 text-slate-700 hover:bg-slate-50/50">
                        <td className="p-3 font-bold">{c.crop}</td>
                        <td className="p-3 text-slate-600 font-semibold">{c.pest}</td>
                        <td className="p-3 text-right font-mono font-bold text-blue-600">{c.rate}</td>
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
