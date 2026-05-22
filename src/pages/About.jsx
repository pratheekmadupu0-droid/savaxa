import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
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
  const { t } = useLanguage()
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.loop = true
      
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Crop video playing smoothly in loop")
        }).catch(err => {
          console.warn("Autoplay block bypass: ", err)
          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch(e => console.error("Force play failure: ", e))
          }
        })
      }
    }
  }, [])

  const visions = [
    { 
      title: t("Sustainable Agronomy", "సుస్థిర వ్యవసాయం"), 
      desc: t("Developing selective pesticide formulations that degrade naturally in soil with zero long-term active chemical residues.", "మట్టిలో సహజంగా కలిసిపోయేలా మరియు దీర్ఘకాలిక రసాయన అవశేషాలు లేని ప్రత్యేక పురుగుమందుల రూపకల్పన."), 
      icon: <RiLeafLine className="text-blue-600 text-2xl" /> 
    },
    { 
      title: t("Yield Maximization", "గరిష్ట దిగుబడి"), 
      desc: t("Empowering growers to defend crop panicles, cotton bolls, and paddy fields from heavy infestations, boosting farm profitability.", "పంటలను తెగుళ్ల నుండి కాపాడి, రైతులకు గరిష్ట దిగుబడి మరియు అధిక లాభాలను చేకూర్చడం."), 
      icon: <RiPlantLine className="text-blue-600 text-2xl" /> 
    },
    { 
      title: t("Scientific Innovation", "శాస్త్రీయ ఆవిష్కరణలు"), 
      desc: t("Continuously researching active spore biological blockades and hyperbaric bio-stimulant synthesis in our R&D labs.", "మా పరిశోధనా శాలల్లో సరికొత్త బయో-ఉత్ప్రేరకాల తయారీ మరియు నిరంతర శాస్త్రీయ పరిశోధనలు."), 
      icon: <RiFlaskLine className="text-cyan-600 text-2xl" /> 
    },
    { 
      title: t("Grower & Farmer Welfare", "రైతుల సంక్షేమం"), 
      desc: t("Delivering free diagnostic resources, crop guides, and agronomist support directly to rural farming communities across India.", "రైతులకు ఉచిత పంట సలహాలు, మార్గదర్శకాలు మరియు వ్యవసాయ నిపుణుల సలహాలను అందించడం."), 
      icon: <RiUserLine className="text-blue-600 text-2xl" /> 
    },
    { 
      title: t("Quality Integrity Assured", "నాణ్యత ప్రమాణాలు"), 
      desc: t("Running strict batch-wise chemical assays, gas chromatography, and raw material tests to confirm 100% active compound ratios.", "100% నాణ్యమైన మరియు ప్రభావవంతమైన ఉత్పత్తుల తయారీ కొరకు కఠినమైన పరీక్షలు నిర్వహించడం."), 
      icon: <RiShieldCheckLine className="text-cyan-600 text-2xl" /> 
    },
    { 
      title: t("Empowered Dealer Network", "బలమైన డీలర్ల నెట్‌వర్క్"), 
      desc: t("Building a transparent, digitized supply system that ensures dealers receive fresh, properly sealed products on time.", "డీలర్లకు ఉత్పత్తులు సరైన సమయానికి చేరేలా పారదర్శకమైన మరియు డిజిటలైజ్డ్ సరఫరా వ్యవస్థను అందించడం."), 
      icon: <RiGroupLine className="text-blue-600 text-2xl" /> 
    }
  ]

  const metrics = [
    { value: "2023", label: t("Establishment Year", "స్థాపించిన సంవత్సరం"), desc: t("Forged with a clear vision to deliver high-efficacy crop protection.", "రైతులకు నమ్మకమైన పంట రక్షణను అందించాలనే స్పష్టమైన లక్ష్యంతో స్థాపించబడింది.") },
    { value: "75+", label: t("CIB Registered Brands", "అనుమతి పొందిన బ్రాండ్‌లు"), desc: t("A comprehensive range of registered agrochemicals tested across crops.", "వివిధ పంటలపై విజయవంతంగా పరీక్షించబడి CIB అనుమతి పొందిన ఉత్పత్తులు.") },
    { value: "500+", label: t("Dealers & Distributors", "డీలర్లు & పంపిణీదారులు"), desc: t("A highly dedicated distribution network across premium farming hubs.", "వ్యవసాయ ప్రాంతాల వ్యాప్తంగా విస్తరించిన బలమైన పంపిణీ వ్యవస్థ.") }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 space-y-24">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs font-mono tracking-widest text-blue-600 uppercase font-bold">
            {t("SAVAXA BIO-AGRI SCIENCES", "సవాక్సా బయో-ఆగ్రి సైన్సెస్")}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("About", "మా గురించి")} <span className="text-gradient">Savaxa</span>
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {t(
              "Empowering modern agriculture through scientifically backed pesticide formulations, selective crop protection agents, and premium bio-stimulants.",
              "శాస్త్రీయ పరిశోధనలతో కూడిన పురుగుమందులు, పంట రక్షణ ఉత్పత్తులు మరియు బయో-ఉత్ప్రేరకాల ద్వారా ఆధునిక వ్యవసాయానికి ఊతమివ్వడం."
            )}
          </p>
        </div>

        {/* Narrative & History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/70 border border-blue-200">
              <RiGlobalLine className="text-blue-600 text-xs" />
              <span className="text-[10px] tracking-widest uppercase font-mono text-blue-700 font-bold">
                {t("ESTABLISHED IN 2023", "2023లో స్థాపించబడింది")}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 font-display leading-tight">
              {t("Pioneering the Future of", "పంటల రక్షణలో")} <br />
              <span className="text-gradient">{t("Crop Protection", "నూతన ప్రస్థానం")}</span>
            </h2>
            <p className="text-slate-650 text-sm leading-relaxed font-light">
              {t(
                "Established in **2023**, Savaxa Bio-Agri Sciences began with a vital mission: to bridge the gap between complex biochemical science and field-level crop safety. Driven by the pressing challenges of crop loss and pest mutations, Savaxa established advanced chemical blending reactors and R&D facilities to create high-efficacy pesticides that deliver supreme target lethality while respecting the surrounding soil ecosystem.",
                "2023లో స్థాపించబడిన సవాక్సా బయో-ఆగ్రి సైన్సెస్, రైతుల పంటలకు పూర్తి రక్షణ కల్పించే లక్ష్యంతో ప్రారంభమైంది. పంట నష్టం మరియు పురుగుల తీవ్రతను నివారించడానికి, సవాక్సా అత్యాధునిక రసాయన తయారీ యూనిట్లు మరియు పరిశోధనా విభాగాలను ఏర్పాటు చేసింది."
              )}
            </p>
            <p className="text-slate-650 text-sm leading-relaxed font-light">
              {t(
                "In a remarkably short duration since 2023, Savaxa has grown into a highly trusted agrochemical name. We produce selective herbicides for water-bound paddy, fast-acting insecticides for lepidoptera pests, and organic bio-inoculants that have safeguarded thousands of cultivation acres, ensuring high yields and secure profits for crop growers.",
                "చాలా తక్కువ కాలంలోనే సవాక్సా దేశంలోనే అత్యంత విశ్వసనీయమైన వ్యవసాయ రసాయన సంస్థగా ఎదిగింది. మేము తయారుచేసే ప్రత్యేక కలుపు నాశకాలు మరియు వేగంగా పనిచేసే కీటక నాశకాలు వేలాది ఎకరాల పంటలను రక్షించి రైతులకు అధిక లాభాలను చేకూరుస్తున్నాయి."
              )}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <RiAwardLine className="text-blue-600 text-lg" /> {t("CIB&RC Approved Formulations", "CIB&RC ఆమోదిత రసాయనాలు")}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <RiLeafLine className="text-blue-600 text-lg" /> {t("Maximum Eco-Soil Safety", "పర్యావరణ మరియు నేల రక్షణ")}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/60 aspect-[4/3] bg-slate-950">
            <video 
              ref={videoRef}
              src="/savaxa-crop.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
              className="w-full h-full object-cover pointer-events-none select-none"
              style={{ 
                objectFit: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 2. VISIONARY MD SPOTLIGHT SECTION */}
        <section className="glass-panel rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-sm relative overflow-hidden bg-white/70">
          {/* Subtle watermark overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/20/10 rounded-full filter blur-[100px] pointer-events-none" />

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
                <span className="text-[10px] text-blue-600 font-mono tracking-widest uppercase font-bold bg-blue-50/70 px-3 py-1 rounded-full border border-blue-200">
                  {t("LEADERSHIP SPOTLIGHT", "నాయకత్వ విశేషాలు")}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display mt-2 uppercase">
                  {t("DR. NARENDAR REDDY", "డాక్టర్ నరేందర్ రెడ్డి")}
                </h3>
                <p className="text-xs font-bold text-slate-500 font-mono tracking-wider flex items-center gap-1.5">
                  <RiAwardLine className="text-blue-600 text-lg shrink-0" />
                  <span>{t("QUALIFICATION: MBA (AGRI-BUSINESS MANAGEMENT) & PH.D. IN AGRONOMY", "విద్యార్హత: MBA (అగ్రి-బిజినెస్ మేనేజ్‌మెంట్) & Ph.D. (అగ్రోనమీ)")}</span>
                </p>
              </div>

              <div className="h-0.5 bg-gradient-to-r from-blue-500 to-transparent w-32" />

              <p className="text-slate-650 text-sm leading-relaxed font-light">
                {t(
                  "Under the visionary stewardship of **Dr. Narendar Reddy**, Savaxa Bio-Agri Sciences has evolved into an agile crop protection trailblazer in South India. Holding a specialized **MBA in Agri-Business Management** combined with a **doctorate in agricultural sciences**, Dr. Narendar Reddy combines advanced biochemical research insight with high-level corporate and rural strategic vision.",
                  "డాక్టర్ నరేందర్ రెడ్డి గారి నేతృత్వంలో, సవాక్సా బయో-ఆగ్రి సైన్సెస్ దక్షిణ భారతదేశంలోనే వేగంగా దూసుకుపోతున్న పంట రక్షణ సంస్థగా అవతరించింది. అగ్రి-బిజినెస్ మేనేజ్‌మెంట్‌లో MBA మరియు అగ్రోనమీలో డాక్టరేట్ సాధించిన డాక్టర్ రెడ్డి, అత్యున్నత బయో-కెమికల్ పరిశోధనలతో పాటు వ్యవసాయ రంగంలో విశేష అనుభవం కలిగి ఉన్నారు."
                )}
              </p>
              <p className="text-slate-650 text-sm leading-relaxed font-light">
                {t(
                  "His absolute dedication to farmer welfare and deep field-level understanding has steered Savaxa to design target-specific, selective crop molecules. Dr. Reddy believes that future agriculture lies in **precision-guided chemistries**—formulations that effectively neutralize target destructive bugs while causing zero harm to friendly insect populations or soil microbes. His leadership ensures Savaxa delivers premium quality, verified effectiveness, and eco-sustainable products across Indian states.",
                  "రైతుల సంక్షేమం పట్ల ఆయనకున్న అంకితభావం, పంటలపై ఉన్న అవగాహన సవాక్సాను ప్రత్యేకమైన ఉత్పత్తుల రూపకల్పన వైపు నడిపించాయి. భవిష్యత్తు వ్యవసాయం పర్యావరణహిత రసాయనాలపైనే ఆధారపడి ఉంటుందని డాక్టర్ రెడ్డి నమ్ముతారు - ఇవి పంటను ఆశించే పురుగులను సమర్థవంతంగా నివారిస్తూ, ఉపయోగకరమైన జీవులకు మరియు మట్టికి ఎలాంటి హాని చేయవు."
                )}
              </p>

              {/* A beautiful quote */}
              <div className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-2xl font-display text-slate-700 italic text-sm leading-relaxed">
                {t(
                  "\"Our technology must always serve the farmer first. We don't just sell chemical compounds; we provide scientific shield arrays that empower farmers to cultivate rich, safe, and highly profitable harvests.\"",
                  "\"మా సాంకేతికత ఎల్లప్పుడూ రైతు శ్రేయస్సుకు మొదటి ప్రాధాన్యత ఇవ్వాలి. మేము కేవలం రసాయనాలను మాత్రమే విక్రయించట్లేదు; రైతులు సురక్షితమైన, నాణ్యమైన మరియు అత్యంత లాభదాయకమైన దిగుబడులను సాధించేలా శాస్త్రీయ రక్షణను అందిస్తున్నాము.\""
                )}
                <span className="block mt-2 text-xs font-mono font-bold tracking-wider text-slate-550 not-italic uppercase">
                  {t("— DR. NARENDAR REDDY, MD", "— డాక్టర్ నరేందర్ రెడ్డి, మేనేజింగ్ డైరెక్టర్")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR VISIONS & VALUES SECTION (6 dynamic cards) */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] text-blue-600 font-mono tracking-widest uppercase font-bold">
              {t("GUIDING PRINCIPLES", "మా సూత్రాలు & విలువలు")}
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-slate-800 font-display uppercase">
              {t("OUR", "మా")} <span className="text-gradient">{t("VISIONS & VALUES", "లక్ష్యాలు & విలువలు")}</span>
            </h3>
            <p className="text-slate-500 text-xs font-light">
              {t(
                "The core molecular and strategic foundations directing Savaxa Bio-Agri Sciences.",
                "సవాక్సా బయో-ఆగ్రి సైన్సెస్‌ను సరైన దిశలో నడిపించే ప్రధాన సిద్ధాంతాలు మరియు మూలస్తంభాలు."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visions.map((v, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm hover:border-blue-500/20 transition duration-300">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                  {v.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                    {t("MISSION POINT", "లక్ష్యం")} 0{idx + 1}
                  </h4>
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
            <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-200/60 text-center space-y-2 shadow-sm hover:border-blue-400/25 transition duration-300 bg-white/80">
              <span className="text-3xl md:text-4xl font-extrabold text-blue-600 font-display">{m.value}</span>
              <h4 className="text-xs font-bold text-slate-800 tracking-widest uppercase font-display">{m.label}</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">{m.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
