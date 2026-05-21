import { motion } from 'framer-motion'
import { RiBugLine, RiShieldCheckLine, RiSeedlingLine, RiFlaskLine, RiFilterLine } from 'react-icons/ri'
import { useLanguage } from '../context/LanguageContext'

export default function PestControl() {
  const { t } = useLanguage()

  const pestsData = [
    {
      name: t("American Bollworm", "శనగ పచ్చ పురుగు (American Bollworm)"),
      sciName: "Helicoverpa armigera",
      type: t("Lepidoptera Caterpillar", "రెక్కల పురుగు లార్వా (గొంగళి పురుగు)"),
      crops: t("Cotton, Maize, Pigeon pea, Chickpea, Tomato", "పత్తి, మొక్కజొన్న, కంది, శనగ, టమోటా"),
      symptoms: t("Bores circular holes into cotton bolls and tomato fruits, feeding internally. Yield drops drastically.", "పత్తి కాయలు మరియు టమోటా పండ్లలోనికి రంధ్రాలు చేసి లోపలి భాగాన్ని తింటుంది, దీనివల్ల పంట దిగుబడి బాగా తగ్గుతుంది."),
      control: t("Chlorantraniliprole 18.5% SC (Bollgard-Zap Force)", "క్లోరాంట్రానిలిప్రోల్ 18.5% SC (Bollgard-Zap Force)"),
      img: "/american_bollworm.png",
      risk: t("Critical / High Destruction", "అత్యంత ప్రమాదకరం / తీవ్ర నష్టం")
    },
    {
      name: t("Whiteflies", "తెల్ల దోమ (Whiteflies)"),
      sciName: "Bemisia tabaci",
      type: t("Hemiptera Sucking Pest", "రసం పీల్చే పురుగు (హెమిప్టెరా)"),
      crops: t("Cotton, Chili, Brinjal, Tomato, Cucurbits", "పత్తి, మిరప, వంగ, టమోటా, గుమ్మడి జాతి పంటలు"),
      symptoms: t("Sucks cellular sap from leaves underside. Leaves curl downwards. Secretes sticky honeydew forming black soot.", "ఆకుల అడుగుభాగం నుండి రసాన్ని పీల్చడం వల్ల ఆకులు కిందకు ముడుచుకుంటాయి. జిగట ద్రవాన్ని విసర్జించి నల్లటి బూజును కలిగిస్తాయి."),
      control: t("Spirotetramat 15% + Imidacloprid 30% SC (Shield-Ultra)", "స్పిరోటెట్రామాట్ 15% + ఇమిడాక్లోప్రిడ్ 30% SC (Shield-Ultra)"),
      img: "/whiteflies.png",
      risk: t("High / Curl Virus Vector", "ఎక్కువ ప్రమాదం / వైరస్ వాహకం")
    },
    {
      name: t("Barnyard Grass Weeds", "తుంగ గడ్డి / ఊద గడ్డి (Barnyard Grass)"),
      sciName: "Echinochloa crus-galli",
      type: t("Poaceae Invasive Grass", "హానికరమైన గడ్డి జాతి కలుపు (పోయేసి)"),
      crops: t("Paddy Rice (Direct seeded & Transplanted)", "వరి పంట (నేరుగా విత్తినది మరియు నాట్లు వేసినది)"),
      symptoms: t("Chokes cash crops within early tillering weeks, stealing 60% of soil nitrogen nutrients and moisture.", "పంట ఎదుగుదల దశలో నేలలోని 60% నత్రజని పోషకాలను మరియు తేమను గ్రహించి పంట ఎదుగుదలను దెబ్బతీస్తుంది."),
      control: t("Bispyribac-sodium 10% SC (Vanquish-X)", "బిస్పైరిబాక్-సోడియం 10% SC (Vanquish-X)"),
      img: "/barnyard_grass.png",
      risk: t("Severe Nutrient Theft", "తీవ్ర పోషకాల నష్టం")
    },
    {
      name: t("Damping-off Fungi", "నారు కుళ్లు తెగులు (Damping-off)"),
      sciName: "Pythium spp.",
      type: t("Oomycete Root Rot", "వేరు కుళ్లు తెగులు కారకం (శిలీంద్రం)"),
      crops: t("Tomato nursery beds, Chili, Pulses, Tobacco", "టమోటా నారుమడులు, మిరప, పప్పుధాన్యాలు, పొగాకు"),
      symptoms: t("Rotting and water-soaking of seedling stems at the ground soil level, leading to instant nursery collapse.", "నారు కాండం నేల మట్టం వద్ద కుళ్లిపోయి నీరు పట్టినట్లు అవుతుంది, దీనివల్ల నారుమడులు త్వరగా దెబ్బతింటాయి."),
      control: t("Trichoderma viride bio-agent (BioRoot Protect)", "ట్రైకోడెర్మా విరిడి బయో-ఏజెంట్ (BioRoot Protect)"),
      img: "/damping_off.png",
      risk: t("Severe Nursery Threat", "నారుమడికి తీవ్ర ముప్పు")
    },
    {
      name: t("Powdery Mildew Rust", "బూడిద తెగులు (Powdery Mildew)"),
      sciName: "Erysiphe polygoni",
      type: t("Ascomycete Foliar Infection", "ఆకులకు ఆశించే శిలీంద్ర తెగులు"),
      crops: t("Chili, Apple orchards, Onion, Peas, Mango", "మిరప, యాపిల్ తోటలు, ఉల్లి, బఠానీ, మామిడి"),
      symptoms: t("White powdery patches covering leaf and flower surfaces. Flower buds drop prematurely before fruit fertilization.", "ఆకులు మరియు పూల ఉపరితలాలపై తెల్లటి బూడిద వంటి మచ్చలు ఏర్పడతాయి. పూత రాలిపోతుంది."),
      control: t("Azoxystrobin + Tebuconazole (LeafRust Sentinel)", "అజోక్సిస్ట్రోబిన్ + టెబుకొనజోల్ (LeafRust Sentinel)"),
      img: "/powdery_mildew.png",
      risk: t("Severe Canopy Damage", "తీవ్ర ఆకు రంగు మార్పు")
    },
    {
      name: t("Sucking Thrips", "తామర పురుగులు (Sucking Thrips)"),
      sciName: "Scirtothrips dorsalis",
      type: t("Thysanoptera Scourge", "రసం పీల్చే తామర పురుగులు"),
      crops: t("Chili, Tomato, Grapes, Rose, Citrus", "మిరప, టమోటా, ద్రాక్ష, గులాబీ, నిమ్మ జాతి పంటలు"),
      symptoms: t("Tears plant cells to suck fluid. Leaf tips dry, turn brown, and curl upwards forming typical boat shapes.", "ఆకు కణాలను రఫ్ చేసి ద్రవాన్ని పీలుస్తాయి. ఆకు చివర్లు ఎండిపోయి, పైకి ముడుచుకుని దోనె ఆకారంలోకి మారతాయి."),
      control: t("Shield-Ultra Systemic SC formulations", "షీల్డ్-అల్ట్రా సిస్టమిక్ SC రసాయనాలు"),
      img: "/sucking_thrips.png",
      risk: t("High Foliage Scorch", "ఆకులు ఎండిపోయే తీవ్రత")
    }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-emerald-650 uppercase font-bold">
            {t("SAVAXA CROP PROTECTION DATABASE", "సవాక్సా పంట రక్షణ డేటాబేస్")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("Pest Identification", "కీటకాల గుర్తింపు")}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {t(
              "Locate and inspect damage symptoms of major agricultural pests, pathogens, and certified Savaxa control solutions.",
              "కీలక వ్యవసాయ తెగుళ్లు, వ్యాధుల లక్షణాలు మరియు సవాక్సా ధృవీకరించిన నివారణ మార్గాల వివరాలు తెలుసుకోండి."
            )}
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
                    <span className="text-slate-400 uppercase font-bold block">{t("Host Crops:", "ఆశించే పంటలు:")}</span>
                    <span className="text-slate-700 font-sans text-xs mt-1 block font-semibold">{pest.crops}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold block">{t("Damage Symptoms:", "నష్టపరిచే లక్షణాలు:")}</span>
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
                  <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase block font-bold">
                    {t("Certified Active Agent:", "ధృవీకరించిన నివారణ మార్గం:")}
                  </span>
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
