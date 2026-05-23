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
  ShieldCheck,
  Award
} from 'lucide-react'
import { collection, onSnapshot, getDocs, addDoc, query, where } from 'firebase/firestore'
import { signInWithPopup, signOut } from 'firebase/auth'
import { db, auth, googleProvider } from '../firebase'
import toast, { Toaster } from 'react-hot-toast'

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

    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      (dealer.name && dealer.name.toLowerCase().includes(query)) || 
      (dealer.address && dealer.address.toLowerCase().includes(query));
      
    return matchesState && matchesSearch;
  })

  return (
    <div className="font-inter min-h-screen bg-[var(--color-brand-surface)] pt-32 pb-24">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
            Our Dealer Network
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Find an authorized Savaxa crop protection dealer near you or apply to become part of our growing distributor network.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* LEFT: MAP PLACEHOLDER */}
          <div className="lg:w-2/3 bg-white p-2 rounded-3xl border border-[var(--color-blue-100)] shadow-sm overflow-hidden h-[500px] relative">
            {/* Embedded Google Map iframe placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1689500000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '1.5rem' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* RIGHT: FILTERS & CTA */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[var(--color-blue-100)] shadow-sm space-y-6">
              <h3 className="font-montserrat font-bold text-xl text-[var(--color-brand-navy)] uppercase">Find a Dealer</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full appearance-none bg-[var(--color-brand-surface)] border border-[var(--color-blue-100)] rounded-xl px-4 py-3 text-sm text-[var(--color-brand-navy)] font-bold focus:outline-none focus:border-[var(--color-brand-primary)] cursor-pointer"
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
                    placeholder="Search district or dealer name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--color-brand-surface)] border border-[var(--color-blue-100)] rounded-xl pl-12 pr-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-brand-navy)] to-[var(--color-brand-primary)] p-8 rounded-3xl text-center text-white space-y-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <ShieldCheck className="w-12 h-12 text-[var(--color-brand-accent)] mx-auto" />
              <h3 className="font-montserrat font-bold text-2xl uppercase">Become a Partner</h3>
              <p className="text-blue-100 text-sm">Join our network of authorized distributors and get access to premium agrochemical formulations.</p>
              <button 
                onClick={() => setIsRegistering(true)}
                className="w-full bg-white text-[var(--color-brand-primary)] font-bold py-3 rounded-xl uppercase tracking-wider text-sm hover:bg-[var(--color-brand-surface)] transition-colors"
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
          <div className="text-center py-16 bg-white rounded-3xl border border-[var(--color-blue-100)]">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No verified dealers found in this region.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map(dealer => (
              <div key={dealer.id} className="bg-white p-6 rounded-3xl border border-[var(--color-blue-100)] shadow-sm hover:shadow-lg transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center text-[var(--color-brand-primary)] font-montserrat font-bold text-xl">
                    {dealer.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1 border border-[var(--color-blue-100)]">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
                
                <h4 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-1 group-hover:text-[var(--color-brand-primary)] transition-colors line-clamp-1">{dealer.name}</h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{dealer.type || 'Authorized Dealer'}</p>
                
                <div className="space-y-3 mb-6 flex-1">
                  {dealer.address && (
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                      <span className="leading-relaxed line-clamp-2">{dealer.address}</span>
                    </div>
                  )}
                  {dealer.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-4 h-4 text-[var(--color-brand-primary)] shrink-0" />
                      <span className="font-medium">{dealer.phone}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => window.open(`https://wa.me/${dealer.phone?.replace(/[^0-9]/g, '')}`, '_blank')}
                  className="w-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm uppercase tracking-wider"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-brand-navy)]/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative p-8 text-center"
            >
              <button 
                onClick={() => setIsRegistering(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[var(--color-brand-navy)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <Building2 className="w-16 h-16 text-[var(--color-brand-primary)] mx-auto mb-4" />
              <h2 className="text-2xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase mb-2">Dealer Portal</h2>
              <p className="text-slate-600 mb-8">Sign in with your Google account to access the partner portal and wholesale stock catalogs.</p>
              
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[var(--color-blue-100)] text-slate-700 font-bold py-4 rounded-xl hover:bg-[var(--color-brand-surface)] hover:border-[var(--color-brand-primary)] transition-all"
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
