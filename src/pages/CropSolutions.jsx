import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiShieldCheckLine, RiFilterLine, RiSeedlingLine, RiFlaskLine } from 'react-icons/ri'
import { useLanguage } from '../context/LanguageContext'

export default function CropSolutions() {
  const { t } = useLanguage()
  const [selectedCrop, setSelectedCrop] = useState('cotton')

  const cropSolutionsList = {
    cotton: {
      name: t("Cotton Crops Protection", "పత్తి పంట రక్షణ (Cotton Protection)"),
      pathogen: t("American Bollworm, Sucking Whitefly, Thrips", "శనగ పచ్చ పురుగు, తెల్ల దోమ, తామర పురుగులు"),
      threat: t("Critical - High Defoliation Risk", "తీవ్ర నష్టం - ఆకులు ఎండిపోయే ప్రమాదం"),
      symptoms: t("Circular boring cavities in mature cotton bolls, leaf curling with black soot coatings, stunted terminal shoots.", "పత్తి కాయల్లో గుండ్రటి రంధ్రాలు, ఆకులు నల్లగా మారడం, ఎదుగుదల లోపించడం."),
      formula: t("Shield-Ultra Insecticide & SOLVO Biostimulant", "షీల్డ్-అల్ట్రా కీటకనాశని & సోల్వో బయో-ఉత్ప్రేరకం"),
      mixingRatio: t("Shield-Ultra: 1.2 ml/L + SOLVO: 1.5 ml/L", "షీల్డ్-అల్ట్రా: లీటరుకు 1.2 మి.లీ + సోల్వో: లీటరుకు 1.5 మి.లీ"),
      sprayingInterval: t("Apply at first square formation, repeat after 12 days if pest count exceeds 5 per branch.", "మొదటి మొగ్గ దశలో పిచికారీ చేయండి, పురుగుల తీవ్రత ఎక్కువగా ఉంటే 12 రోజుల తర్వాత మళ్లీ పిచికారీ చేయండి."),
      img: "/cotton_solution.png"
    },
    rice: {
      name: t("Wet Paddy Rice Security", "వరి పంట రక్షణ (Paddy Security)"),
      pathogen: t("Barnyard Grass (Echinochloa), Sedges, Stem Borers", "తుంగ గడ్డి, వెడల్పాటి కలుపు మొక్కలు, కాండం తొలిచే పురుగు"),
      threat: t("Severe Nutrient Deprivation Risk", "తీవ్ర పోషకాల నష్టం - ఎదుగుదల లోపం"),
      symptoms: t("Tall broad grass choking out tender paddy shoots, nutrient theft leading to yellow thin leaves, lower panicle formation.", "కలుపు మొక్కలు వరి పంటను ఆవరించి నేలలోని పోషకాలను లాగేసుకోవడం, ఆకులు పసుపు రంగులోకి మారడం."),
      formula: t("Vanquish-X Herbicide System", "వాన్క్విష్-X కలుపు నాశక వ్యవస్థ"),
      mixingRatio: t("Vanquish-X: 80 - 100 ml per Acre in 150L water", "వాన్క్విష్-X: ఎకరానికి 80-100 మి.లీ 150 లీటర్ల నీటిలో"),
      sprayingInterval: t("Post-emergence foliar spray 10-15 days after transplanting when weeds are in 2-4 leaf stage.", "నాట్లు వేసిన 10-15 రోజులలోపు కలుపు మొక్కలు 2-4 ఆకుల దశలో ఉన్నప్పుడు పిచికారీ చేయాలి."),
      img: "/rice_solution.png"
    },
    tomato: {
      name: t("Solanaceous Tomato Defense", "టమోటా పంట రక్షణ (Tomato Defense)"),
      pathogen: t("Pythium Damping-Off Rot, Early Fungal Blight", "నారు కుళ్లు తెగులు, ఆకుమచ్చ తెగులు"),
      threat: t("Extreme Nursery Seedling Mortality", "నారుమడులలో తీవ్ర మొలకల నష్టం"),
      symptoms: t("Water-soaked girdling of seedling stems near soil level, leaf spots with concentric target-board rings.", "నారు కాండం కుళ్లిపోవడం, ఆకులపై గుండ్రటి నల్లటి మచ్చలు ఏర్పడటం."),
      formula: t("BioRoot Spore Inoculant", "బయోరూట్ స్పోర్ ఇనాక్యులెంట్"),
      mixingRatio: t("BioRoot: 2.0 kg per Acre mixed with organic manure", "బయోరూట్: ఎకరానికి 2.0 కిలోలు సేంద్రీయ ఎరువుతో కలిపి"),
      sprayingInterval: t("Apply in seed beds during soil preparation, repeat as drench 15 days after transplanting.", "నారుమడి నేల తయారీలో వాడండి, నాట్లు వేసిన 15 రోజుల తర్వాత మళ్లీ నేలపై చల్లండి."),
      img: "/tomato_solution.png"
    },
    chili: {
      name: t("Chili Crops Protection", "మిరప పంట రక్షణ (Chili Protection)"),
      pathogen: t("Sucking Thrips, Downy Mildew", "తామర పురుగులు, బూడిద తెగులు"),
      threat: t("High Foliage Scorch & Curl", "ఆకులు ముడుచుకుపోయే తీవ్ర ప్రమాదం"),
      symptoms: t("Leaf margins drying and curling upwards into distinctive boat shapes, white powder dust on leaf underside.", "ఆకులు పైకి ముడుచుకుని దోనె ఆకారంలోకి మారడం, ఆకుల అడుగున తెల్లటి పౌడర్ ఏర్పడటం."),
      formula: t("Shield-Ultra systemic spray & BioRoot", "షీల్డ్-అల్ట్రా సిస్టమిక్ పిచికారీ & బయోరూట్"),
      mixingRatio: t("Shield-Ultra: 150 ml/Acre + BioRoot: 1.5 kg/Acre", "షీల్డ్-అల్ట్రా: ఎకరానికి 150 మి.లీ + బయోరూట్: ఎకరానికి 1.5 కిలోలు"),
      sprayingInterval: t("Spray Shield-Ultra at flowering onset, drench roots with BioRoot to secure soil spores.", "పూత దశలో షీల్డ్-అల్ట్రా పిచికారీ చేయండి, వేర్ల వద్ద బయోరూట్ తడపండి."),
      img: "/chili_solution.png"
    }
  }

  const current = cropSolutionsList[selectedCrop]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-cyan-600 uppercase font-bold">
            {t("SAVAXA CROP DIAGNOSTICS", "సవాక్సా పంట నిర్ధారణ")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("Crop Solutions", "పంట పరిష్కారాలు")}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {t(
              "Select your primary cash crop to discover targeted biological symptoms, pathogen stressors, and certified mixing ratios.",
              "తెగుళ్లు, వాటి లక్షణాలు మరియు సరైన సవాక్సా నివారణ పద్ధతులను తెలుసుకోవడానికి మీ పంటను ఎంచుకోండి."
            )}
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
              {key === 'cotton' ? t("Cotton Protection", "పత్తి రక్షణ") :
               key === 'rice' ? t("Rice Protection", "వరి రక్షణ") :
               key === 'tomato' ? t("Tomato Protection", "టమోటా రక్షణ") :
               t("Chili Protection", "మిరప రక్షణ")}
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
                <span className="text-[10px] text-cyan-600 font-mono tracking-widest uppercase font-bold">
                  {t("SAVAXA SHIELD MATRIX", "సవాక్సా రక్షణ వ్యవస్థ")}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 font-display mt-0.5">{current.name}</h2>
              </div>

              <div className="space-y-4 font-sans text-xs md:text-sm">
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                  <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">
                    {t("Target Pathogens:", "లక్ష్య కీటకాలు / తెగుళ్లు:")}
                  </span>
                  <span className="text-slate-700 font-bold block mt-1">{current.pathogen}</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                  <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">
                    {t("Biological Damage Symptoms:", "జీవసంబంధ నష్ట లక్షణాలు:")}
                  </span>
                  <span className="text-slate-550 font-light block mt-1 leading-relaxed">{current.symptoms}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                    <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">
                      {t("Mixing Ratio:", "కలిపే నిష్పత్తి:")}
                    </span>
                    <span className="text-cyan-700 font-bold block mt-1">{current.mixingRatio}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                    <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">
                      {t("Mixing Formula:", "నివారణ రసాయనం:")}
                    </span>
                    <span className="text-blue-700 font-bold block mt-1">{current.formula}</span>
                  </div>
                </div>

                <div className="bg-blue-50/70 border border-blue-200/60 p-4 rounded-2xl">
                  <span className="text-blue-700 block font-mono text-[9px] uppercase font-bold">
                    {t("Spraying Intervals:", "పిచికారీ సమయం:")}
                  </span>
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
