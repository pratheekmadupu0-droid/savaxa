import { motion } from 'framer-motion'
import { RiShieldCheckLine, RiAwardLine, RiLeafLine, RiFlaskLine } from 'react-icons/ri'
import { useLanguage } from '../context/LanguageContext'

export default function Certifications() {
  const { t } = useLanguage()

  const certificationsList = [
    {
      title: t("CIB&RC Registration Certificate", "CIB&RC నమోదు పత్రం (CIB&RC Registration)"),
      authority: t("Central Insecticides Board & Registration Committee", "కేంద్ర కీటకనాశన బోర్డు & రిజిస్ట్రేషన్ కమిటీ"),
      desc: t("Federal certification from the Ministry of Agriculture (Govt of India), validating high knockdown insect efficacy, dosage standards, and crop safety parameters for Savaxa products.", "భారత ప్రభుత్వ వ్యవసాయ మంత్రిత్వ శాఖ నుండి పొందిన అధికారిక లైసెన్స్, ఇది సవాక్సా ఉత్పత్తుల యొక్క నాణ్యతను మరియు భద్రతను ధృవీకరిస్తుంది."),
      code: "CIB-RC-REG-SAV-2024",
      icon: <RiShieldCheckLine className="text-blue-600 text-3xl" />
    },
    {
      title: t("ISO 9001:2015 Certification", "ISO 9001:2015 నాణ్యత ధృవీకరణ పత్రం"),
      authority: t("International Quality Management Systems Audits", "అంతర్జాతీయ నాణ్యత నిర్వహణ ప్రమాణాలు"),
      desc: t("Certified Quality Management Systems mapping raw material chemical assays, state-of-the-art reactor blending, and premium double-sealed packaging stability.", "రసాయనాల నాణ్యత, అత్యాధునిక బ్లెండింగ్ ప్రక్రియలు మరియు అత్యుత్తమ డబుల్-సీల్డ్ ప్యాకింగ్ ప్రమాణాలకు లభించిన అంతర్జాతీయ గుర్తింపు."),
      code: "QMS-9001-SAV-TG-2025",
      icon: <RiAwardLine className="text-cyan-600 text-3xl" />
    },
    {
      title: t("ISO 14001:2015 Certification", "ISO 14001:2015 పర్యావరణ భద్రత పత్రం"),
      authority: t("Environmental Safety Audit Bureau", "పర్యావరణ భద్రత ఆడిట్ బ్యూరో"),
      desc: t("Verifies strict ecological system parameters. Savaxa plants operate with low-emission pathways, secure chemical containment facilities, and organic zero soil residue standards.", "సవాక్సా పరిశ్రమలలో తక్కువ ఉద్గారాలు, రసాయనాల సురక్షిత నిల్వ మరియు పర్యావరణ రక్షణ ప్రమాణాలను పాటించే పద్ధతులకు లభించిన గుర్తింపు."),
      code: "EMS-14001-SAV-2025",
      icon: <RiLeafLine className="text-blue-600 text-3xl" />
    },
    {
      title: t("Bio-Safety & Seed Licensing", "బయో-సేఫ్టీ & సీడ్ లైసెన్స్ (Seed Licensing)"),
      authority: t("Department of Agriculture, Govt of Telangana", "వ్యవసాయ శాఖ, తెలంగాణ ప్రభుత్వం"),
      desc: t("Retail distribution and commercial manufacturing licensing authorizing Savaxa to distribute high-grade pesticides and bio-stimulants safely across India.", "సవాక్సా సంస్థ భారతదేశమంతటా అత్యుత్తమ పురుగుమందులు మరియు బయో-ఉత్ప్రేరకాలను సరఫరా చేయడానికి తెలంగాణ ప్రభుత్వ వ్యవసాయ శాఖ జారీ చేసిన అధికారిక లైసెన్స్."),
      code: "AGRI-LIC-TG-540-SEC",
      icon: <RiFlaskLine className="text-cyan-600 text-3xl" />
    }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      {/* Beautiful Subtle Agrochemical Compliance Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1508588648963-80e4e77ce632?auto=format&fit=crop&w=1920&q=80" 
          alt="Sun Rays Green Crop Watermark" 
          className="w-full h-full object-cover opacity-[0.09] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      {/* Decorative Warm Organic Blur Circles */}
      <div className="absolute top-[10%] left-0 w-96 h-96 bg-blue-100/20/30 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-blue-650 uppercase font-bold">
            {t("SAVAXA COMPLIANCE STANDARDS", "సవాక్సా నాణ్యతా ప్రమాణాలు")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("CERTIFICATIONS", "ధృవీకరణ పత్రాలు")}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {t(
              "Savaxa chemical synthesis plants and laboratories operate under audited quality control certifications and federal environmental approvals.",
              "సవాక్సా పరిశోధనా కేంద్రాలు మరియు తయారీ సంస్థలు కఠినమైన నాణ్యతా పరీక్షలు మరియు ప్రభుత్వ పర్యావరణ నిబంధనలకు అనుగుణంగా పనిచేస్తాయి."
            )}
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsList.map((cert, index) => (
            <motion.div
              key={index}
              className="glass-panel border border-slate-200/60 rounded-3xl p-8 flex flex-col justify-between space-y-6 group hover:border-blue-500/20 transition duration-300 shadow-sm bg-white/70"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                  {cert.icon}
                </div>
                <div>
                  <span className="text-[10px] text-blue-600 font-mono tracking-widest uppercase font-bold">{cert.authority}</span>
                  <h3 className="text-xl font-bold text-slate-800 mt-1 group-hover:text-blue-600 transition duration-200 font-display">
                    {cert.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-2 leading-relaxed font-light">
                    {cert.desc}
                  </p>
                </div>
              </div>

              {/* cert validation code footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-450">
                <span>{t("LICENSING / CERTIFICATION CODE:", "లైసెన్స్ / ధృవీకరణ కోడ్:")}</span>
                <span className="text-blue-600 font-extrabold tracking-wider">{cert.code}</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
