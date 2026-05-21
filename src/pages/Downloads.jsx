import { motion } from 'framer-motion'
import { RiFilePdfLine, RiDownloadLine, RiFolderZipLine, RiShieldCheckLine } from 'react-icons/ri'
import { useLanguage } from '../context/LanguageContext'

export default function Downloads() {
  const { t } = useLanguage()

  const downloadItems = [
    {
      title: t("Savaxa Product Catalog 2026", "సవాక్సా ప్రొడక్ట్ క్యాటలాగ్ 2026"),
      desc: t("Full product catalog containing crop protection specs, host crops, and dosage matrices.", "సవాక్సా ఉత్పత్తుల సమాచారం, వాడాల్సిన పంటలు మరియు ఎకరా మోతాదుల పట్టికల పూర్తి సమాచార పత్రం."),
      size: "8.4 MB",
      type: t("Product Brochure (PDF)", "ఉత్పత్తుల బ్రోచర్ (PDF)"),
      icon: <RiFilePdfLine className="text-emerald-600 text-3xl" />
    },
    {
      title: t("Shield-Ultra Safety SDS Sheet", "షీల్డ్-అల్ట్రా సేఫ్టీ SDS షీట్"),
      desc: t("Material Safety Data Sheet (MSDS) guidelines, toxicology classification, and antidote directions.", "మెటీరియల్ సేఫ్టీ డాటా షీట్ (MSDS) సూచనలు, రసాయన వర్గీకరణ మరియు అత్యవసర చికిత్స పద్ధతులు."),
      size: "1.2 MB",
      type: t("Safety SDS Document (PDF)", "సురక్షిత సమాచార పత్రం (PDF)"),
      icon: <RiFilePdfLine className="text-rose-500 text-3xl" />
    },
    {
      title: t("Bollgard-Zap SDS Document", "బోల్గార్డ్-జాప్ SDS డాక్యుమెంట్"),
      desc: t("Occupational safety standards, protective suit requirements, and water body safety bounds.", "పనిచేసేటప్పుడు పాటించవలసిన భద్రతా ప్రమాణాలు, రక్షణ దుస్తుల వివరాలు మరియు పర్యావరణ సూచనలు."),
      size: "1.1 MB",
      type: t("Safety SDS Document (PDF)", "సురక్షిత సమాచార పత్రం (PDF)"),
      icon: <RiFilePdfLine className="text-rose-500 text-3xl" />
    },
    {
      title: t("Vanquish-X Weed Spray SDS Sheet", "వాన్క్విష్-X కలుపునాశక పిచికారీ SDS షీట్"),
      desc: t("Post-emergent herbicide spraying intervals, soil degradation charts, and standing water safety.", "మొలకెత్తిన తర్వాత కలుపు పిచికారీ సమయాలు, భూమి రక్షణ చార్టులు మరియు నీటి వాడకం భద్రతా సూచనలు."),
      size: "1.5 MB",
      type: t("Safety SDS Document (PDF)", "సురక్షిత సమాచార పత్రం (PDF)"),
      icon: <RiFilePdfLine className="text-rose-500 text-3xl" />
    },
    {
      title: t("Organic Bio-Inoculants Manual", "సేంద్రీయ జీవ రసాయనాల గైడ్"),
      desc: t("Application guide for BioRoot Protect Trichoderma spores in vegetable nurseries.", "కూరగాయల నారుమడులలో బయోరూట్ ట్రైకోడెర్మా స్పోర్స్ ఉపయోగించే పద్ధతుల పూర్తి గైడ్."),
      size: "4.2 MB",
      type: t("Agronomy Handbook (PDF)", "వ్యవసాయ సాంకేతిక గైడ్ (PDF)"),
      icon: <RiFilePdfLine className="text-emerald-600 text-3xl" />
    },
    {
      title: t("Full Agronomy Safety Pack", "పూర్తి వ్యవసాయ భద్రతా సమాచార ప్యాక్"),
      desc: t("All safety sheets and dosage manuals packaged in a convenient digital ZIP folder.", "అన్ని భద్రతా పత్రాలు మరియు మోతాదు వివరాలు కలిగిన డిజిటల్ జిప్ (ZIP) ఫోల్డర్."),
      size: "14.8 MB",
      type: t("System Bundle (ZIP)", "సిస్టమ్ బండిల్ (ZIP)"),
      icon: <RiFolderZipLine className="text-amber-500 text-3xl" />
    }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Leaf Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&w=1920&q=80" 
          alt="Fresh Green Leaves Watermark" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Decorative Warm Organic Blur Circles */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-emerald-650 uppercase font-bold">
            {t("SAVAXA RESOURCE ARCHIVES", "సవాక్సా రిసోర్స్ ఫైల్స్")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("DOWNLOAD CENTER", "డౌన్‌లోడ్ సెంటర్")}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {t(
              "Access secure downloads of our pesticide safety data sheets (SDS), dosage charts, and full agronomist handbooks.",
              "పురుగుమందుల సేఫ్టీ డాటా షీట్లు (SDS), పంటల మోతాదు వివరాలు మరియు వ్యవసాయ సమాచార పుస్తకాలను ఇక్కడ డౌన్‌లోడ్ చేసుకోండి."
            )}
          </p>
        </div>

        {/* Downloads cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloadItems.map((item, index) => (
            <motion.div
              key={index}
              className="glass-card border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between space-y-6 group shadow-sm bg-white/70"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">{item.type}</span>
                  <h3 className="text-lg font-bold text-slate-800 mt-1 group-hover:text-emerald-600 transition duration-200 font-display leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* download action bar */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[10px] font-mono">
                <span className="text-slate-455 uppercase">{t("File size:", "ఫైల్ సైజు:")} <strong className="text-slate-700 font-bold">{item.size}</strong></span>
                <button className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-widest uppercase rounded-xl transition duration-200 flex items-center gap-1.5 shadow-sm hover:scale-[1.01]">
                  {t("Download", "డౌన్‌లోడ్")} <RiDownloadLine />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
