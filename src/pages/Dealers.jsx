import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [locatorQuery, setLocatorQuery] = useState('')
  const [dealersList, setDealersList] = useState([
    { name: "Apex Agro Solutions", state: "Telangana", city: "Hyderabad", address: "Pedda Amberpet Road, Bhuvaneshwari Nagar", phone: "+91 93987 88328", type: "Platinum Hub" },
    { name: "Sri Rama Agronomy Services", state: "Andhra Pradesh", city: "Guntur", address: "Mirchi Yard Road, Main Market Complex", phone: "+91 94402 12345", type: "Gold Partner" },
    { name: "Kalyani Crop Protection Ltd", state: "Maharashtra", city: "Pune", address: "Market Yard Complex, Gultekdi", phone: "+91 98230 56789", type: "Certified Stockist" }
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
    { title: "High-Margin Trade", desc: "Enjoy highly competitive pricing structures with annual performance discounts.", icon: <RiPercentLine className="text-emerald-600" /> },
    { title: "Direct Logistics Dispatch", desc: "Our network ensures that products arrive at your pesticide depot within 48-72 hours.", icon: <RiTruckLine className="text-emerald-600" /> },
    { title: "Technical Agronomist Desk", desc: "Direct phone support lines linking your dealer staff to our agronomists.", icon: <RiCustomerService2Line className="text-emerald-600" /> }
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
          <p className="text-xs font-mono tracking-widest text-emerald-650 uppercase font-bold">SAVAXA RETAIL NETWORKS</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            DEALERS PORTAL
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Become an authorized partner or locate our verified regional crop protection dealers.
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
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-light">
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
              <h3 className="text-xl font-bold text-slate-800 font-display uppercase">Regional Dealer Locator</h3>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed font-light">
              Enter your state or city keyword to search our laboratory-registered dealer networks.
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="Search State, City, or Dealer name..."
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
                  <p className="text-xs text-slate-400 font-mono">PH: {d.phone}</p>
                </div>
              ))}
              {filteredDealers.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6 font-mono">No depots match your search query</p>
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
              <h3 className="text-xl font-bold text-slate-800 font-display uppercase">Dealer Registration Form</h3>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed font-light">
              Submit your credentials below. Savaxa compliance boards inspect applications and call back within 5 working days.
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
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">Firm Legal Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">Owner / Manager</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">Business Email</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">Contact Phone</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">Warehouse Size (Sq Ft)</label>
                      <input
                        type="number"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">Seed/Pesticide Licence</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-mono font-bold">Location / District / State</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Guntur, Andhra Pradesh"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-widest uppercase rounded-xl transition duration-300 flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(16,185,129,0.15)] hover:scale-[1.01]"
                  >
                    Submit Credentials Registry <RiSendPlaneFill />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 shadow-sm"
                >
                  <RiShieldCheckLine className="text-emerald-600 text-5xl mx-auto" />
                  <h4 className="text-lg font-bold text-slate-800 font-display">APPLICATION SUCCESSFULLY LOGGED</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Our compliance systems have parsed your license data. A regional partnership desk will contact your registered phone number shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-emerald-600 hover:bg-emerald-550 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-widest uppercase transition duration-200 shadow-sm"
                  >
                    Apply for another location
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
