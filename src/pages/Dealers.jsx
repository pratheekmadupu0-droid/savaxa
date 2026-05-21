import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { 
  RiMapPinLine, 
  RiFileTextLine, 
  RiPercentLine, 
  RiTruckLine, 
  RiCustomerService2Line,
  RiSendPlaneFill,
  RiShieldCheckLine
} from 'react-icons/ri'

export default function Dealers() {
  const { t } = useLanguage()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [locatorQuery, setLocatorQuery] = useState('')
  
  const [dealersList, setDealersList] = useState([
    { name: t("Apex Agro Solutions", "అపెక్స్ ఆగ్రో సొల్యూషన్స్ (Apex Agro Solutions)"), state: t("Telangana", "తెలంగాణ"), city: t("Hyderabad", "హైదరాబాద్"), address: t("Pedda Amberpet Road, Bhuvaneshwari Nagar", "పెద్ద అంబర్‌పేట్ రోడ్, భువనేశ్వరి నగర్"), phone: "+91 8074 660 491", type: t("Platinum Hub", "ప్లాటినం హబ్ (Platinum Hub)") },
    { name: t("Sri Rama Agronomy Services", "శ్రీ రామ అగ్రోనమీ సర్వీసెస్ (Sri Rama Agronomy)"), state: t("Andhra Pradesh", "ఆంధ్రప్రదేశ్"), city: t("Guntur", "గుంటూరు"), address: t("Mirchi Yard Road, Main Market Complex", "మిర్చి యార్డ్ రోడ్, మెయిన్ మార్కెట్ కాంప్లెక్స్"), phone: "+91 94402 12345", type: t("Gold Partner", "గోల్డ్ పార్ట్నర్ (Gold Partner)") },
    { name: t("Kalyani Crop Protection Ltd", "కళ్యాణి క్రాప్ ప్రొటెక్షన్ లిమిటెడ్ (Kalyani)"), state: t("Maharashtra", "మహారాష్ట్ర"), city: t("Pune", "పూణే"), address: t("Market Yard Complex, Gultekdi", "మార్కెట్ యార్డ్ కాంప్లెక్స్, గుల్తేక్డి"), phone: "+91 98230 56789", type: t("Certified Stockist", "ధృవీకరించబడిన స్టాకిస్ట్") }
  ])

  const [filteredDealers, setFilteredDealers] = useState(dealersList)

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase()
    setLocatorQuery(e.target.value)
    if (!q) {
      setFilteredDealers(dealersList)
      return
    }
    const filtered = dealersList.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.state.toLowerCase().includes(q) || 
      d.city.toLowerCase().includes(q)
    )
    setFilteredDealers(filtered)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const benefits = [
    { title: t("High-Margin Trade", "అధిక వ్యాపార లాభాలు"), desc: t("Enjoy highly competitive pricing structures with annual performance discounts.", "సంవత్సరాంతపు డిస్కౌంట్లు మరియు అత్యంత పోటీతత్వ ధరలతో అధిక లాభాలను పొందండి."), icon: <RiPercentLine className="text-emerald-600" /> },
    { title: t("Direct Logistics Dispatch", "నేరుగా వేగవంతమైన రవాణా"), desc: t("Our network ensures that products arrive at your pesticide depot within 48-72 hours.", "మా రవాణా నెట్‌వర్క్ ద్వారా 48-72 గంటలలోగా మీ దుకాణానికి సరుకు చేరుతుంది."), icon: <RiTruckLine className="text-emerald-600" /> },
    { title: t("Technical Agronomist Desk", "సాంకేతిక వ్యవసాయ సహాయం"), desc: t("Direct phone support lines linking your dealer staff to our agronomists.", "మీ సిబ్బందిని నేరుగా మా వ్యవసాయ శాస్త్రవేత్తలతో అనుసంధానించే ప్రత్యక్ష ఫోన్ లైన్లు."), icon: <RiCustomerService2Line className="text-emerald-600" /> }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Meadow Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1920&q=80" 
          alt="Open Green Meadows Watermark" 
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
            {t("SAVAXA RETAIL NETWORKS", "సవాక్సా భాగస్వామ్య నెట్‌వర్క్")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("DEALERS PORTAL", "డీలర్స్ పోర్టల్")}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {t(
              "Become an authorized partner or locate our verified regional crop protection dealers.",
              "సవాక్సా అధికారిక భాగస్వామిగా చేరండి లేదా మా ధృవీకరించబడిన ప్రాంతీయ డీలర్లను ఇక్కడ కనుగొనండి."
            )}
          </p>
        </div>

        {/* Benefits Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((b, index) => (
            <div key={index} className="glass-card p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm bg-white/70">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xl shadow-inner">
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-wider font-display uppercase">{b.title}</h3>
              <p className="text-xs md:text-sm text-slate-550 leading-relaxed font-light">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Dual Grid Locator & Registration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Locator Panel */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/60 space-y-6 shadow-sm bg-white/70">
            <div className="flex items-center gap-2 mb-2">
              <RiMapPinLine className="text-emerald-600 text-2xl" />
              <h3 className="text-xl font-bold text-slate-800 font-display uppercase">
                {t("Regional Dealer Locator", "ప్రాంతీయ డీలర్ లొకేటర్")}
              </h3>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed font-light">
              {t(
                "Enter your state or city keyword to search our laboratory-registered dealer networks.",
                "మా రిజిస్టర్డ్ డీలర్ నెట్‌వర్క్‌లను శోధించడానికి మీ రాష్ట్రం లేదా నగరం పేరును నమోదు చేయండి."
              )}
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder={t("Search State, City, or Dealer name...", "రాష్ట్రం, నగరం లేదా డీలర్ పేరుతో వెతకండి...")}
                value={locatorQuery}
                onChange={handleSearch}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition duration-300 shadow-inner"
              />
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {filteredDealers.map((d, index) => (
                <div key={index} className="p-4 bg-white border border-slate-150 rounded-2xl space-y-1.5 hover:border-emerald-500/20 transition duration-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-800">{d.name}</h4>
                    <span className="text-[8px] font-mono tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-full uppercase font-bold">
                      {d.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-light">{d.address}, {d.city}, {d.state}</p>
                  <p className="text-xs text-slate-400 font-mono">{t("PH:", "ఫోన్:")} {d.phone}</p>
                </div>
              ))}
              {filteredDealers.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6 font-mono">
                  {t("No depots match your search query", "మీ శోధనకు సరిపోయే దుకాణాలు ఏవీ లేవు")}
                </p>
              )}
            </div>

            {/* Locator Mock Map */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 relative">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.375626359556!2d78.53036665000002!3d17.36208945!2m3!1f0!2f0!3f0!3m2!1i1020!2i768!4f13.1!3m3!1m2!1s0x3bcb9f78326db4bf%3A0x6b1075677b5d12cf!2sAmberpet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full border-0 opacity-80"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Registration Form */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/60 space-y-6 shadow-sm bg-white/70">
            <div className="flex items-center gap-2 mb-2">
              <RiFileTextLine className="text-emerald-600 text-2xl" />
              <h3 className="text-xl font-bold text-slate-800 font-display uppercase">
                {t("Dealer Registration Form", "డీలర్ రిజిస్ట్రేషన్ ఫారం")}
              </h3>
            </div>

            <p className="text-slate-550 text-xs leading-relaxed font-light">
              {t(
                "Submit your credentials below. Savaxa compliance boards inspect applications and call back within 5 working days.",
                "మీ వివరాలను క్రింద సమర్పించండి. మా బృందం మీ దరఖాస్తును పరిశీలించి 5 పనిదినాలలో మిమ్మల్ని సంప్రదిస్తుంది."
              )}
            </p>

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Firm Legal Name", "సంస్థ పేరు (Legal Name)")}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Owner / Manager", "యజమాని / మేనేజర్ పేరు")}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Business Email", "వ్యాపార ఈమెయిల్")}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Contact Phone", "ఫోన్ నంబర్")}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Warehouse Size (Sq Ft)", "గోడౌన్ వైశాల్యం (Sq Ft)")}
                      </label>
                      <input
                        type="number"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Seed/Pesticide Licence", "విత్తన/పురుగుమందుల లైసెన్స్")}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                      {t("Location / District / State", "ప్రాంతం / జిల్లా / రాష్ట్రం")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("e.g. Guntur, Andhra Pradesh", "ఉదా: గుంటూరు, ఆంధ్రప్రదేశ్")}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-widest uppercase rounded-xl transition duration-300 flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(16,185,129,0.15)] hover:scale-[1.01]"
                  >
                    {t("Submit Credentials Registry", "వివరాలను సమర్పించండి")} <RiSendPlaneFill />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-50 border border-emerald-250 rounded-2xl text-center space-y-4 shadow-sm"
                >
                  <RiShieldCheckLine className="text-emerald-600 text-5xl mx-auto" />
                  <h4 className="text-lg font-bold text-slate-800 font-display">
                    {t("APPLICATION SUCCESSFULLY LOGGED", "దరఖాస్తు విజయవంతంగా నమోదైంది")}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {t(
                      "Our compliance systems have parsed your license data. A regional partnership desk will contact your registered phone number shortly.",
                      "మా విభాగం మీ లైసెన్స్ వివరాలను ధృవీకరించింది. ప్రాంతీయ भागస్వామ్య ప్రతినిధి త్వరలోనే మిమ్మల్ని సంప్రదిస్తారు."
                    )}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-emerald-600 hover:bg-emerald-555 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-widest uppercase transition duration-200 shadow-sm"
                  >
                    {t("Apply for another location", "మరొక ప్రాంతానికి దరఖాస్తు చేయండి")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  )
}
