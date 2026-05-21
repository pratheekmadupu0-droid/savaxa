import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { 
  RiFileTextLine, 
  RiPercentLine, 
  RiTruckLine, 
  RiCustomerService2Line,
  RiSendPlaneFill,
  RiShieldCheckLine,
  RiWhatsappLine
} from 'react-icons/ri'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { signInWithPopup, signOut } from 'firebase/auth'
import { db, auth, googleProvider } from '../firebase'
import toast, { Toaster } from 'react-hot-toast'

export default function Dealers() {
  const { t } = useLanguage()
  const [dealersList, setDealersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [selectedDealer, setSelectedDealer] = useState(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  // Registration form state
  const [newDealer, setNewDealer] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Platinum Hub',
    warehouseSize: '',
    license: ''
  })

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = auth ? auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      if (user) {
        setNewDealer(prev => ({
          ...prev,
          name: user.displayName || '',
          email: user.email || ''
        }))
      }
    }) : () => {}

    fetchDealers()
    return () => unsubscribe()
  }, [])

  const fetchDealers = async () => {
    if (!db) {
      setDealersList([])
      setLoading(false)
      return
    }
    try {
      const snap = await getDocs(collection(db, 'dealers'))
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setDealersList(data)
    } catch (error) {
      console.error(error)
      toast.error('Failed to load dealers')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!auth) {
      toast.error('Firebase not initialized')
      return
    }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      toast.success(`Welcome ${result.user.displayName || 'Dealer'}!`)
      
      // Check if already registered
      const q = query(collection(db, 'dealers'), where('email', '==', result.user.email))
      const snap = await getDocs(q)
      if (!snap.empty) {
        toast.success('You are already a registered dealer!')
      } else {
        setIsRegistering(true)
      }
    } catch (error) {
      console.error(error)
      toast.error('Login failed')
    }
  }

  const handleLogout = async () => {
    if (!auth) return
    try {
      await signOut(auth)
      setIsRegistering(false)
      toast.success('Signed out')
    } catch (error) {
      toast.error('Sign out failed')
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (!db) return
    
    // Simple validation
    if (!newDealer.phone) {
      toast.error('Phone/WhatsApp number is required')
      return
    }

    try {
      const docRef = await addDoc(collection(db, 'dealers'), {
        ...newDealer,
        uid: currentUser.uid,
        registeredAt: new Date().toISOString()
      })
      
      // Add to list and close form
      setDealersList(prev => [...prev, { id: docRef.id, ...newDealer }])
      setFormSubmitted(true)
      setIsRegistering(false)
      toast.success('Dealership registered successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to register dealership')
    }
  }

  const benefits = [
    { title: t("High-Margin Trade", "అధిక వ్యాపార లాభాలు"), desc: t("Enjoy highly competitive pricing structures with annual performance discounts.", "సంవత్సరాంతపు డిస్కౌంట్లు మరియు అత్యంత పోటీతత్వ ధరలతో అధిక లాభాలను పొందండి."), icon: <RiPercentLine className="text-emerald-650" /> },
    { title: t("Direct Logistics Dispatch", "నేరుగా వేగవంతమైన రవాణా"), desc: t("Our network ensures that products arrive at your pesticide depot within 48-72 hours.", "మా రవాణా నెట్‌వర్క్ ద్వారా 48-72 గంటలలోగా మీ దుకాణానికి సరుకు చేరుతుంది."), icon: <RiTruckLine className="text-emerald-650" /> },
    { title: t("Technical Agronomist Desk", "సాంకేతిక వ్యవసాయ సహాయం"), desc: t("Direct phone support lines linking your dealer staff to our agronomists.", "మీ సిబ్బందిని నేరుగా మా వ్యవసాయ శాస్త్రవేత్తలతో అనుసంధానించే ప్రత్యక్ష ఫోన్ లైన్లు."), icon: <RiCustomerService2Line className="text-emerald-650" /> }
  ]

  return (
    <div className="font-sans pt-32 pb-20 relative overflow-hidden bg-slate-50 min-h-screen text-slate-800">
      <Toaster position="top-right" />
      
      {/* Meadow Backdrop Watermark */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1920&q=80" 
          alt="Open Green Meadows Watermark" 
          className="w-full h-full object-cover opacity-[0.07] mix-blend-overlay filter saturate-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/70 to-slate-50" />
      </div>

      <div className="absolute top-[10%] left-0 w-96 h-96 bg-emerald-100/20 rounded-full filter blur-[130px] pointer-events-none" />

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
              "Log in via Google to register your dealership or discover authorized regional crop protection partners.",
              "మీ డీలర్‌షిప్‌ను నమోదు చేయడానికి గూగుల్ ద్వారా లాగిన్ అవ్వండి లేదా మా భాగస్వాములను కనుగొనండి."
            )}
          </p>
        </div>

        {/* Benefits Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

        {/* Registered Dealers & Portal Registration section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Google Auth & Registration */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/60 space-y-6 shadow-sm bg-white/70 lg:col-span-1">
            <h3 className="text-xl font-bold text-slate-800 font-display uppercase flex items-center gap-2">
              <RiShieldCheckLine className="text-emerald-650" />
              {t("Partner Registry", "భాగస్వామ్య రిజిస్ట్రేషన్")}
            </h3>

            {!currentUser ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you a Savaxa crop protection dealer? Sign in with your Google account to complete your digital profile and showcase your services to local farmers.
                </p>
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center font-bold text-xs uppercase text-slate-700 transition duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-100/50 rounded-2xl border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold">
                    {currentUser.displayName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{currentUser.displayName}</h4>
                    <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                  </div>
                </div>

                {isRegistering ? (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2 border-t border-slate-250/50">
                    <div>
                      <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newDealer.name}
                        onChange={e => setNewDealer({...newDealer, name: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9876543210"
                        value={newDealer.phone}
                        onChange={e => setNewDealer({...newDealer, phone: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                        Dealer Type
                      </label>
                      <select
                        value={newDealer.type}
                        onChange={e => setNewDealer({...newDealer, type: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                      >
                        <option value="Platinum Hub">Platinum Hub</option>
                        <option value="Gold Partner">Gold Partner</option>
                        <option value="Certified Stockist">Certified Stockist</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300 flex items-center justify-center gap-1.5"
                    >
                      Complete Registration <RiSendPlaneFill />
                    </button>
                  </form>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-emerald-600 font-medium">✓ You are logged in.</p>
                    <button 
                      onClick={() => setIsRegistering(true)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-xl transition duration-300"
                    >
                      Register New Dealership
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-700 font-bold text-xs uppercase rounded-xl transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Columns: Registered Dealers List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-800 font-display uppercase">
              {t("Authorized Dealers", "అధికారిక డీలర్లు")}
            </h3>

            {loading ? (
              <div className="py-12 text-center text-slate-500">Loading authorized dealers...</div>
            ) : dealersList.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 flex flex-col items-center">
                <RiFileTextLine className="text-4xl text-slate-300 mb-2" />
                <p className="text-xs font-mono">No dealers are currently registered on this portal.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dealersList.map((dealer) => (
                  <div 
                    key={dealer.id}
                    onClick={() => setSelectedDealer(dealer)}
                    className="p-6 bg-white border border-slate-200/80 rounded-3xl space-y-4 hover:border-emerald-500/30 transition duration-300 shadow-sm cursor-pointer hover:shadow-md relative group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                          {dealer.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[8px] font-mono tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-250/30 px-2.5 py-1 rounded-full uppercase font-bold">
                          {dealer.type}
                        </span>
                      </div>
                      <h4 className="text-md font-bold text-slate-800 mt-3">{dealer.name}</h4>
                      <p className="text-xs text-slate-450 mt-1 font-mono truncate">{dealer.email}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const cleanedPhone = dealer.phone.replace(/[^0-9]/g, '')
                        window.open(`https://wa.me/${cleanedPhone}?text=Hi%2C%20I%20am%20interested%20in%20Savaxa%20crop%2520care%20products.`, '_blank')
                      }}
                      className="w-full mt-2 py-2.5 bg-emerald-650 hover:bg-emerald-600 text-white font-bold text-xs uppercase rounded-xl tracking-wider transition duration-300 flex items-center justify-center gap-2 shadow-inner"
                    >
                      <RiWhatsappLine className="text-lg" /> Contact on WhatsApp
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Dealer Info / Interactive Window Modal */}
      {selectedDealer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setSelectedDealer(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-xl"
            >
              &times;
            </button>

            <div className="flex flex-col items-center text-center space-y-4 mt-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-3xl shadow-inner">
                {selectedDealer.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800">{selectedDealer.name}</h3>
                <span className="text-[9px] font-mono tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full uppercase font-bold mt-2 inline-block">
                  {selectedDealer.type}
                </span>
              </div>

              <div className="w-full py-4 border-t border-b border-slate-100 text-left space-y-3 text-xs text-slate-650">
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase font-bold">Email:</span>
                  <span className="font-mono">{selectedDealer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase font-bold">Phone:</span>
                  <span className="font-semibold">{selectedDealer.phone}</span>
                </div>
                {selectedDealer.warehouseSize && (
                  <div className="flex justify-between">
                    <span className="text-slate-400 uppercase font-bold">Warehouse Size:</span>
                    <span>{selectedDealer.warehouseSize} Sq Ft</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  const cleanedPhone = selectedDealer.phone.replace(/[^0-9]/g, '')
                  window.open(`https://wa.me/${cleanedPhone}?text=Hi%2C%20I%20am%20interested%20in%20Savaxa%20crop%2520care%20products.`, '_blank')
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(16,185,129,0.15)]"
              >
                <RiWhatsappLine className="text-lg" /> Connect via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
