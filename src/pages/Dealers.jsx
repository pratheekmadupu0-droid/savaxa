import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Building2, 
  ChevronDown,
  X,
  ShieldCheck
} from 'lucide-react'
import { collection, onSnapshot, getDocs, query, where } from 'firebase/firestore'
import { signInWithPopup } from 'firebase/auth'
import { db, auth, googleProvider } from '../firebase'
import toast, { Toaster } from 'react-hot-toast'
import SEO from '../components/SEO'

export default function Dealers() {
  const [dealersList, setDealersList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loadingDirectory, setLoadingDirectory] = useState(true)
  
  // States for filter
  const [selectedState, setSelectedState] = useState('All States')
  
  // User/Auth states
  const [currentUser, setCurrentUser] = useState(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  
  const indianStates = ['All States', 'Telangana', 'Andhra Pradesh', 'Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat']

  useEffect(() => {
    const unsubscribeAuth = auth?.onAuthStateChanged(async (user) => {
      setCurrentUser(user)
      if (user) {
        await checkRegistrationStatus(user.email)
      } else {
        setIsRegistered(false)
      }
    })

    if (!db) {
      setDealersList([])
      setLoadingDirectory(false)
      return () => unsubscribeAuth?.()
    }
    
    const unsubscribeDealers = onSnapshot(collection(db, 'dealers'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const sorted = data.sort((a, b) => {
        if (a.status === 'Verified' && b.status !== 'Verified') return -1;
        if (a.status !== 'Verified' && b.status === 'Verified') return 1;
        return 0;
      });
      setDealersList(sorted)
      setLoadingDirectory(false)
    })

    return () => {
      unsubscribeAuth?.()
      unsubscribeDealers()
    }
  }, [])

  const checkRegistrationStatus = async (email) => {
    if (!db) return
    try {
      const q = query(collection(db, 'dealers'), where('email', '==', email))
      const snap = await getDocs(q)
      setIsRegistered(!snap.empty)
    } catch (err) {
      console.error(err)
    }
  }

  const handleGoogleLogin = async () => {
    if (!auth) return toast.error('Firebase Auth not initialized')
    try {
      await signInWithPopup(auth, googleProvider)
      toast.success('Welcome to Savaxa Partner Network!')
      setIsRegistering(true)
    } catch (error) {
      toast.error('Authentication failed.')
    }
  }

  const filteredDealers = dealersList.filter(dealer => {
    if (dealer.status !== 'Verified') return false;
    
    const matchesState = selectedState === 'All States' || (dealer.address && dealer.address.includes(selectedState));
    if (!searchQuery) return matchesState;

    const queryStr = searchQuery.toLowerCase();
    const matchesSearch = 
      (dealer.name && dealer.name.toLowerCase().includes(queryStr)) || 
      (dealer.address && dealer.address.toLowerCase().includes(queryStr));
      
    return matchesState && matchesSearch;
  })

  return (
    <div className="font-body min-h-screen bg-[#020817] pt-32 pb-24 text-slate-300">
      <SEO 
        title="Authorized Dealers | SAVAXA Crop Care"
        description="Locate authorized Savaxa crop protection dealers, distributors and partners in your region."
      />
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white uppercase tracking-tight">
            Our Dealer Network
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Find an authorized Savaxa crop protection dealer near you or apply to become part of our growing distributor network.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* LEFT: WORKING GOOGLE MAP */}
          <div className="lg:w-2/3 bg-slate-900/40 p-2 rounded-3xl border border-blue-500/10 shadow-xl overflow-hidden h-[500px] relative">
            <iframe 
              src="https://maps.google.com/maps?q=Hyderabad,Telangana&z=10&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '1.5rem' }} 
              allowFullScreen="" 
              loading="lazy" 
              className="grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-500 invert-[90%] hue-rotate-180"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* RIGHT: FILTERS & CTA */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-slate-900/40 p-6 rounded-3xl border border-blue-500/10 shadow-xl space-y-6">
              <h3 className="font-montserrat font-bold text-xl text-white uppercase tracking-tight">Find a Dealer</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full appearance-none bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer [&>option]:bg-[#020817] [&>option]:text-white"
                  >
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search district or dealer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#040d21] to-[#2563eb]/20 p-8 rounded-3xl text-center text-white space-y-6 shadow-xl border border-blue-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <ShieldCheck className="w-12 h-12 text-[#38bdf8] mx-auto filter drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
              <h3 className="font-montserrat font-bold text-2xl uppercase tracking-tight">Become a Partner</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Join our network of authorized distributors and get access to premium agrochemical formulations.</p>
              <button 
                onClick={() => setIsRegistering(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Apply for Dealership
              </button>
            </div>
          </div>
        </div>

        {/* DEALER CARDS GRID */}
        {loadingDirectory ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-brand-primary)]"></div>
          </div>
        ) : filteredDealers.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-blue-500/10 shadow-xl">
            <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No verified dealers found in this region.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map(dealer => (
              <div key={dealer.id} className="bg-slate-900/40 p-6 rounded-3xl border border-blue-500/10 shadow-md hover:shadow-xl hover:border-blue-500/20 transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-950/60 rounded-xl flex items-center justify-center text-[#38bdf8] font-montserrat font-bold text-xl border border-slate-800">
                    {dealer.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                
                <h4 className="text-xl font-montserrat font-bold text-white mb-1 group-hover:text-[#38bdf8] transition-colors line-clamp-1">{dealer.name}</h4>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{dealer.type || 'Authorized Dealer'}</p>
                
                <div className="space-y-3 mb-6 flex-1">
                  {dealer.address && (
                    <div className="flex items-start gap-2.5 text-sm text-slate-300">
                      <MapPin className="w-4.5 h-4.5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                      <span className="leading-relaxed line-clamp-2">{dealer.address}</span>
                    </div>
                  )}
                  {dealer.phone && (
                    <div className="flex items-center gap-2.5 text-sm text-slate-300">
                      <Phone className="w-4.5 h-4.5 text-[var(--color-brand-primary)] shrink-0" />
                      <span className="font-medium">{dealer.phone}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => window.open(`https://wa.me/${dealer.phone?.replace(/[^0-9]/g, '')}`, '_blank')}
                  className="w-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Connect
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {isRegistering && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-blue-500/10 rounded-3xl w-full max-w-md shadow-2xl relative p-8 text-center"
            >
              <button 
                onClick={() => setIsRegistering(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1.5 bg-slate-950/40 rounded-full border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <Building2 className="w-16 h-16 text-[#38bdf8] mx-auto mb-4 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]" />
              <h2 className="text-2xl font-montserrat font-bold text-white uppercase mb-2">Dealer Portal</h2>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">Sign in with your Google account to access the partner portal and wholesale stock catalogs.</p>
              
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-slate-950/60 border border-slate-800 text-white font-bold py-4 rounded-xl hover:border-[#2563eb]/50 hover:bg-slate-950 transition-all text-sm uppercase tracking-wider"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Sign in with Google
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
