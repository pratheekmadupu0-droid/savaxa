import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import SEO from '../components/SEO'
import { 
  RiFileTextLine, 
  RiPercentLine, 
  RiTruckLine, 
  RiCustomerService2Line,
  RiSendPlaneFill,
  RiShieldCheckLine,
  RiGoogleFill,
  RiCheckboxCircleLine,
  RiBuilding2Line,
  RiMapPinLine,
  RiLockLine
} from 'react-icons/ri'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { signInWithPopup, signOut } from 'firebase/auth'
import { db, auth, googleProvider } from '../firebase'
import toast, { Toaster } from 'react-hot-toast'

export default function Dealers() {
  const { t } = useLanguage()
  const [currentUser, setCurrentUser] = useState(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [registeredDetails, setRegisteredDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Registration form state
  const [newDealer, setNewDealer] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Platinum Hub',
    warehouseSize: '',
    license: '',
    address: ''
  })

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = auth ? auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user)
      if (user) {
        setNewDealer(prev => ({
          ...prev,
          name: user.displayName || '',
          email: user.email || ''
        }))
        // Check if already registered in firestore
        await checkRegistrationStatus(user.email)
      } else {
        setIsRegistered(false)
        setRegisteredDetails(null)
      }
      setLoading(false)
    }) : () => { setLoading(false) }

    return () => unsubscribe()
  }, [])

  const checkRegistrationStatus = async (email) => {
    if (!db) return
    try {
      const q = query(collection(db, 'dealers'), where('email', '==', email))
      const snap = await getDocs(q)
      if (!snap.empty) {
        setIsRegistered(true)
        setRegisteredDetails(snap.docs[0].data())
      } else {
        setIsRegistered(false)
      }
    } catch (err) {
      console.error("Error checking dealer registry: ", err)
    }
  }

  const handleGoogleLogin = async () => {
    if (!auth) {
      toast.error('Firebase Auth not initialized')
      return
    }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      toast.success(`Welcome, ${result.user.displayName || 'Partner'}!`)
      await checkRegistrationStatus(result.user.email)
    } catch (error) {
      console.error(error)
      toast.error('Google authentication failed. Please try again.')
    }
  }

  const handleLogout = async () => {
    if (!auth) return
    try {
      await signOut(auth)
      setIsRegistering(false)
      setIsRegistered(false)
      setRegisteredDetails(null)
      toast.success('Successfully logged out from partner network')
    } catch (error) {
      toast.error('Sign out failed')
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (!db || !currentUser) return
    
    if (!newDealer.phone || newDealer.phone.length < 10) {
      toast.error('Please enter a valid WhatsApp contact number')
      return
    }

    if (!newDealer.license) {
      toast.error('Pesticide license / GSTIN is required for authorization')
      return
    }

    try {
      const dealerPayload = {
        ...newDealer,
        uid: currentUser.uid,
        registeredAt: new Date().toISOString(),
        status: 'Pending Verification'
      }

      await addDoc(collection(db, 'dealers'), dealerPayload)
      setIsRegistered(true)
      setRegisteredDetails(dealerPayload)
      toast.success('Your dealership registration is completed successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to submit application. Please contact admin.')
    }
  }

  const benefits = [
    { 
      title: t("High-Margin Trade Scales", "అధిక వ్యాపార మార్జిన్లు"), 
      desc: t("Enjoy highly competitive factory-direct wholesale prices, ensuring superior profitability for crop protection retailers.", "ప్రత్యక్ష రసాయన ఫ్యాక్టరీ రేట్లతో అద్భుతమైన మార్జిన్లు మరియు అధిక వ్యాపార లాభాలను పొందండి."), 
      icon: <RiPercentLine className="text-emerald-600" /> 
    },
    { 
      title: t("Direct Express Supply Lines", "వేగవంతమైన నేరుగా రవాణా"), 
      desc: t("Our logistics network delivers bulk pesticide consignments straight to your depot within 48 to 72 hours.", "మా రవాణా వ్యవస్థ ద్వారా 48-72 గంటలలోగా మీ డీలర్ డిపోకు లోడ్స్ చేరుతాయి."), 
      icon: <RiTruckLine className="text-cyan-600" /> 
    },
    { 
      title: t("Dedicated Agronomist Support", "ప్రత్యక్ష వ్యవసాయ నిపుణుల సలహాలు"), 
      desc: t("Direct hotline linking your retail counter staff to Savaxa R&D molecular agronomists for application support.", "మా నిపుణులతో నేరుగా మీ కౌంటర్ సిబ్బందికి అనుసంధానం ఉండే ప్రత్యక్ష హాట్‌లైన్ సేవలు."), 
      icon: <RiCustomerService2Line className="text-emerald-600" /> 
    }
  ]

  const steps = [
    {
      num: "01",
      title: t("OAuth Authentication", "గూగుల్ లాగిన్"),
      desc: t("Securely verify your identity using one-click Google Login.", "ఒకే క్లిక్‌తో మీ గూగుల్ ఖాతా ద్వారా లాగిన్ అవ్వండి.")
    },
    {
      num: "02",
      title: t("Submit Digital Registry", "వివరాల నమోదు"),
      desc: t("Input your registered pesticide license, phone, and depot warehouse size.", "మీ పురుగుమందుల లైసెన్స్ సంఖ్య, ఫోన్ మరియు దుకాణ వివరాలను నమోదు చేయండి.")
    },
    {
      num: "03",
      title: t("Verified Channel Partner", "ధృవీకరించబడిన డీలర్"),
      desc: t("Gain authorized stockist badge, direct booking access, and agronomist tools.", "సవాక్సా అధికారిక డీలర్ హోదా మరియు ప్రత్యక్ష బుకింగ్స్ అందుకోండి.")
    }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50 min-h-screen text-slate-800">
      <SEO 
        title="Authorized Dealers Portal | Savaxa Bio-Agri Sciences"
        description="Become a verified Savaxa crop protection channel partner. Sign in with Google to register your pesticide depot, unlock wholesale margins, and connect with local growers."
        keywords="apply pesticide dealership, agricultural chemicals distributor, pesticide franchise india, savaxa retail partners"
      />
      <Toaster position="top-right" />
      
      {/* Meadow Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[140vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1920&q=80" 
          alt="Open Green Meadows Watermark" 
          className="w-full h-full object-cover opacity-[0.06] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/20 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute top-[50%] right-0 w-[500px] h-[500px] bg-teal-100/15 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono tracking-widest text-emerald-600 uppercase font-bold">
            {t("B2B AGRIBUSINESS GROW-SUITE", "సవాక్సా బి2బి డిస్ట్రిబ్యూటర్ నెట్‌వర్క్")}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
            {t("PARTNER DISTRIBUTION NETWORK", "డీలర్స్ రిజిస్ట్రేషన్ పోర్టల్")}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed">
            {t(
              "Partner with India's pioneering agrochemical innovator. Register your distribution depot or retail store to unlock high-efficacy stock margins.",
              "భారతదేశపు ప్రముఖ ఆగ్రో-కెమికల్ బ్రాండ్‌తో భాగస్వామ్యం అవ్వండి. మీ దుకాణం వివరాలు నమోదు చేసి హోల్‌సేల్ మార్జిన్లు మరియు బుకింగ్ సదుపాయాలు పొందండి."
            )}
          </p>
        </div>

        {/* Dynamic Interactive Dashboard & Registration Panel */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-panel rounded-[32px] border border-slate-200/80 shadow-lg overflow-hidden bg-white/80 backdrop-blur-md">
            
            {/* Top branding bar */}
            <div className="bg-slate-900 text-white px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RiBuilding2Line className="text-emerald-500 text-xl" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-300">
                  {t("SAVAXA AUTHORIZATION PORTAL", "సవాక్సా అధికారిక పోర్టల్")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                <RiLockLine className="text-emerald-500 text-xs" /> SSL SECURE 256-BIT
              </div>
            </div>

            <div className="p-8 md:p-12">
              {loading ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-400 font-mono">Authenticating secure link...</p>
                </div>
              ) : !currentUser ? (
                
                /* STEP 0: NOT LOGGED IN */
                <div className="text-center space-y-8 py-4">
                  <div className="max-w-md mx-auto space-y-3">
                    <h2 className="text-2xl font-bold text-slate-800 font-display">
                      {t("Secure Agribusiness Registry", "డీలర్స్ నెట్‌వర్క్‌లో చేరండి")}
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">
                      To complete your dealership registration, request digital price catalogs, or link with local agronomists, please sign in securely with your Google business/personal account.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handleGoogleLogin}
                      className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white border border-transparent rounded-2xl flex items-center gap-3 font-bold text-xs uppercase tracking-wider transition duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:scale-[1.02]"
                    >
                      <RiGoogleFill className="text-lg" />
                      {t("Sign In with Google", "గూగుల్ ద్వారా సైన్ ఇన్")}
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400 font-mono">
                    * By signing in, you agree to SAVAXA's wholesale dealer verification and licensing audits.
                  </p>
                </div>

              ) : isRegistered ? (

                /* STEP 2: ALREADY REGISTERED - BEAUTIFUL BADGE & PANEL */
                <div className="space-y-8 py-4">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-inner">
                      <RiShieldCheckLine className="text-3xl" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[8px] font-mono tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase font-bold">
                        {registeredDetails?.type || 'Authorized Dealer'}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-800 font-display">
                        {registeredDetails?.name || currentUser.displayName}
                      </h2>
                      <p className="text-slate-400 text-xs font-mono">{currentUser.email}</p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs border border-emerald-100 font-medium">
                      <RiCheckboxCircleLine className="text-base" /> Verified Savaxa Partner Account
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
                    <div className="space-y-4 text-xs">
                      <div>
                        <p className="text-slate-400 uppercase font-bold font-mono text-[9px]">WhatsApp Contact</p>
                        <p className="text-slate-700 font-bold mt-0.5">{registeredDetails?.phone || 'Not available'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 uppercase font-bold font-mono text-[9px]">Warehouse / Store Size</p>
                        <p className="text-slate-700 font-bold mt-0.5">{registeredDetails?.warehouseSize ? `${registeredDetails.warehouseSize} Sq Ft` : 'Standard Depot Size'}</p>
                      </div>
                    </div>
                    <div className="space-y-4 text-xs">
                      <div>
                        <p className="text-slate-400 uppercase font-bold font-mono text-[9px]">Pesticide License / GSTIN</p>
                        <p className="text-slate-700 font-bold mt-0.5 font-mono">{registeredDetails?.license || 'Under review'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 uppercase font-bold font-mono text-[9px]">Registered Address</p>
                        <p className="text-slate-700 font-bold mt-0.5">{registeredDetails?.address || 'Provided in details'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => {
                        window.open("mailto:savaxacropcare2023@gmail.com?subject=Wholesale%20Order%20Booking%20Request", "_blank")
                      }}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300 flex items-center justify-center gap-1.5"
                    >
                      Book Wholesale Order
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs uppercase rounded-xl transition duration-300"
                    >
                      Sign Out Account
                    </button>
                  </div>
                </div>

              ) : (

                /* STEP 1: LOGGED IN BUT NOT REGISTERED - REGISTRATION FORM */
                <div className="space-y-8">
                  <div className="space-y-2 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-slate-800 font-display">
                      {t("Complete Partner Application", "మీ డీలర్ వివరాలను నమోదు చేయండి")}
                    </h2>
                    <p className="text-slate-500 text-xs font-light">
                      Please fill in your valid warehouse size, pesticide registration license, and verified WhatsApp number to finalize registration.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                          Full Business / Owner Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newDealer.name}
                          onChange={e => setNewDealer({...newDealer, name: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition duration-300"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                          Primary Email (Auto-filled)
                        </label>
                        <input
                          type="email"
                          disabled
                          value={newDealer.email}
                          className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-400 cursor-not-allowed font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                          WhatsApp Business Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={newDealer.phone}
                          onChange={e => setNewDealer({...newDealer, phone: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                          Pesticide License Number / GSTIN
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. AP/TS-HYD-2023-P123"
                          value={newDealer.license}
                          onChange={e => setNewDealer({...newDealer, license: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition duration-300"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                            Partner Category
                          </label>
                          <select
                            value={newDealer.type}
                            onChange={e => setNewDealer({...newDealer, type: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition duration-300"
                          >
                            <option value="Platinum Hub">Platinum Hub</option>
                            <option value="Gold Partner">Gold Partner</option>
                            <option value="Certified Stockist">Certified Stockist</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                            Warehouse Size (Sq Ft)
                          </label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 1500"
                            value={newDealer.warehouseSize}
                            onChange={e => setNewDealer({...newDealer, warehouseSize: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                          Full Depot Address
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pedda Amberpet, Hyderabad, Telangana"
                          value={newDealer.address}
                          onChange={e => setNewDealer({...newDealer, address: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition duration-300"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-wider transition duration-200"
                      >
                        Cancel & Logout
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300 flex items-center gap-2 shadow-[0_4px_15px_rgba(16,185,129,0.15)] hover:scale-[1.01]"
                      >
                        Complete Authorization <RiSendPlaneFill />
                      </button>
                    </div>
                  </form>
                </div>

              )}
            </div>

          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-slate-800 font-display uppercase">
              {t("DISTRIBUTOR BENCHMARKS", "డిస్ట్రిబ్యూటర్ భాగస్వామ్య ప్రయోజనాలు")}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto font-light leading-relaxed">
              We empower our retail hub network with reliable support structures designed to drive local agribusiness growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, index) => (
              <div key={index} className="glass-card p-6 rounded-3xl border border-slate-200/60 space-y-4 shadow-sm bg-white/70">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xl shadow-inner">
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 tracking-wider font-display uppercase">{b.title}</h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-light">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stepper Process Section */}
        <div className="mt-24 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-slate-800 font-display uppercase">
              {t("ONBOARDING TIMELINE", "డీలర్ ఆన్‌బోర్డింగ్ విధానం")}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto font-light leading-relaxed">
              Become an authorized retail and stocking depot within 24 hours of form submission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, index) => (
              <div key={index} className="relative bg-white border border-slate-200/50 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="absolute top-4 right-6 text-4xl font-extrabold font-mono text-emerald-100 select-none">
                  {st.num}
                </div>
                <h3 className="text-md font-bold text-slate-855 font-display uppercase pt-2">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
