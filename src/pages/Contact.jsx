import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { 
  RiMailLine, 
  RiPhoneLine, 
  RiMapPinLine, 
  RiWhatsappLine, 
  RiSendPlaneFill, 
  RiShieldCheckLine 
} from 'react-icons/ri'

export default function Contact() {
  const { t } = useLanguage()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Greenhouse Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1920&q=80" 
          alt="Greenhouse Foliage Watermark" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Decorative Warm Organic Blur Circles */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-emerald-655 uppercase font-bold">
            {t("SAVAXA CONNECT DESK", "సవాక్సా సహాయ కేంద్రం")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("GET IN TOUCH", "మమ్మల్ని సంప్రదించండి")}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {t(
              "Consult our agricultural sales teams or register your crop stressors with our direct agronomy helpline.",
              "మా వ్యవసాయ సేల్స్ బృందాన్ని సంప్రదించండి లేదా మీ పంటల తెగుళ్ల నివారణకు నేరుగా వ్యవసాయ హెల్ప్‌లైన్‌ను సంప్రదించండి."
            )}
          </p>
        </div>

        {/* Dual Layout Contact Info vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Details Cards */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {[
                { title: t("Direct Agronomy Desk", "ప్రత్యక్ష వ్యవసాయ సహాయ కేంద్రం"), value: t("+91 8074 660 491", "+91 8074 660 491"), label: t("TOLL FREE HELPLINE", "టోల్ ఫ్రీ హెల్ప్‌లైన్"), icon: <RiPhoneLine className="text-emerald-600 text-xl" /> },
                { title: t("Chemical Registry Email", "కార్పొరేట్ ఈమెయిల్"), value: "savaxacropcare2023@gmail.com", label: t("GENERAL ENQUIRIES", "సాధారణ విచారణలు"), icon: <RiMailLine className="text-emerald-600 text-xl" /> },
                { title: t("Headquarters Coordinates", "ప్రధాన కార్యాలయం చిరునామా"), value: t("Plot 120, Sector 1, Industrial Development Area, Uppal, Hyderabad, TG 500039", "ప్లాట్ నం. 120, సెక్టార్ 1, ఇండస్ట్రియల్ ఏరియా, ఉప్పల్, హైదరాబాద్, తెలంగాణ 500039"), label: t("MAIN OFFICE & LABS", "ప్రధాన కార్యాలయం & పరిశోధన శాలలు"), icon: <RiMapPinLine className="text-emerald-600 text-xl" /> }
              ].map((card, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-200/60 flex gap-4 hover:border-emerald-500/20 transition duration-300 shadow-sm bg-white/70">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-inner">
                    {card.icon}
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase block font-bold">{card.label}</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-0.5">{card.title}</h4>
                    <p className="text-xs text-slate-650 mt-1 font-light leading-relaxed">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded Google Map */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden border border-slate-200 relative shadow-sm">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.375626359556!2d78.53036665000002!3d17.36208945!2m3!1f0!2f0!3f0!3m2!1i1020!2i768!4f13.1!3m3!1m2!1s0x3bcb9f78326db4bf%3A0x6b1075677b5d12cf!2sAmberpet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full border-0 opacity-85"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/60 space-y-6 shadow-sm bg-white/70">
            <h3 className="text-xl font-bold text-slate-800 tracking-wider font-display uppercase border-l-2 border-emerald-600 pl-3">
              {t("Agronomy Scientific Inquiry", "వ్యవసాయ సాంకేతిక విచారణ")}
            </h3>

            <p className="text-slate-550 text-xs leading-relaxed font-light">
              {t(
                "Submit your specific crop issues or dealership query below. Our state team will revert back shortly.",
                "మీ పంటల సమస్యలు లేదా డీలర్‌షిప్ విచారణలను క్రింద సమర్పించండి. మా నిపుణుల బృందం త్వరలోనే మిమ్మల్ని సంప్రదిస్తుంది."
              )}
            </p>

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Full Name", "పూర్తి పేరు")}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-650"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Grower / Partner", "పాత్ర (Grower/Partner)")}
                      </label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 focus:outline-none focus:border-emerald-655">
                        <option value="farmer">{t("Commercial Grower", "రైతు / సాగుదారు")}</option>
                        <option value="dealer">{t("Authorized Dealer", "అధికారిక డీలర్")}</option>
                        <option value="agronomist">{t("Agricultural Chemist", "వ్యవసాయ రసాయన శాస్త్రవేత్త")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Email Address", "ఈమెయిల్ చిరునామా")}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-650"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                        {t("Contact Phone", "ఫోన్ నంబర్")}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-650"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                      {t("Subject Matter", "విషయం (Subject)")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("e.g. Bollworm infestation in cotton, dealership inquiry", "ఉదా: పత్తిలో కాయతొలిచే పురుగు ఉధృతి, డీలర్‌షిప్ విచారణ")}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-650"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">
                      {t("Inquiry Message", "విచారణ సందేశం (Message)")}
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder={t("Describe target crops, symptoms, acreage, or retail license details...", "మీ పంటలు, తెగుళ్ల లక్షణాలు, ఎకరాల విస్తీర్ణం మొదలైన వివరాలను రాయండి...")}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-650"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-widest uppercase rounded-xl transition duration-300 flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(16,185,129,0.15)] hover:scale-[1.01]"
                  >
                    {t("Transmit Scientific Inquiry", "విచారణను సమర్పించండి")} <RiSendPlaneFill />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-50 border border-emerald-250 rounded-2xl text-center space-y-4 shadow-sm"
                >
                  <RiShieldCheckLine className="text-emerald-600 text-5xl mx-auto" />
                  <h4 className="text-lg font-bold text-slate-800 font-display">
                    {t("INQUIRY SUCCESSFULLY TRANSMITTED", "విచారణ విజయవంతంగా సమర్పించబడింది")}
                  </h4>
                  <p className="text-xs text-slate-650 leading-relaxed font-light">
                    {t(
                      "Our foliar trials laboratory and sales desks have received your crop data packet. An agronomist will review the case profile and contact you within 24 hours.",
                      "మా వ్యవసాయ నిపుణుల బృందానికి మీ వివరాలు అందాయి. వారు మీ సమస్యను పరిశీలించి 24 గంటలలోగా మిమ్మల్ని సంప్రదిస్తారు."
                    )}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-emerald-600 hover:bg-emerald-550 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-widest uppercase transition duration-200 shadow-sm"
                  >
                    {t("Send another query", "మరొక విచారణ పంపండి")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Floating Bottom-Right WhatsApp Logo / Button */}
      <a
        href="https://wa.me/918074660491"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition duration-300 group"
        style={{
          boxShadow: '0 0 25px rgba(16, 185, 129, 0.45)'
        }}
      >
        <RiWhatsappLine className="text-3xl text-white group-hover:scale-115 transition duration-300" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-white animate-ping" />
      </a>

    </div>
  )
}
