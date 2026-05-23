import { useState } from 'react'
import SEO from '../components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle2
} from 'lucide-react'
import { FiLinkedin, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeMap, setActiveMap] = useState('corporate')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="font-body bg-[#020817] min-h-screen pt-32 pb-24 text-slate-300">
      <SEO 
        title="Contact Us | SAVAXA Crop Care"
        description="Get in touch with Savaxa's agricultural experts for product inquiries, dealership opportunities, or technical support."
      />
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white uppercase tracking-tight">
          Contact Us
        </h1>
        <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Get in touch with our agricultural experts for product inquiries, dealership opportunities, or technical support.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* LEFT: CONTACT FORM */}
          <div className="bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-blue-500/10 shadow-xl">
            <h3 className="text-2xl font-montserrat font-bold text-white mb-6 uppercase tracking-tight">Send us a Message</h3>
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 99999 99999"
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="john@example.com"
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">State / Region</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Telangana"
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inquiry Type</label>
                    <select className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [&>option]:bg-[#020817] [&>option]:text-white">
                      <option>Product Inquiry</option>
                      <option>Dealership Request</option>
                      <option>Technical Support</option>
                      <option>General Information</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                    <textarea 
                      rows="4" 
                      required 
                      placeholder="Write your query here..."
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[var(--color-brand-primary)] text-white font-bold py-4 rounded-xl uppercase tracking-wider hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
                  >
                    Submit Inquiry <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-slate-950/40 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-montserrat font-bold text-white mb-2">Message Sent Successfully</h4>
                  <p className="text-slate-400 mb-8 max-w-sm">
                    Thank you for reaching out to Savaxa. Our team will review your inquiry and get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="text-[var(--color-brand-primary)] font-bold text-sm uppercase tracking-wider hover:underline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: CONTACT INFO */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-white mb-6 uppercase tracking-tight">Our Locations</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Reach out to Savaxa through our official headquarters or locate our advanced manufacturing unit.
              </p>
            </div>

            <div className="space-y-6">
              {/* Corporate Office */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900/40 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/10">
                  <MapPin className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Corporate Office (Bhaglamukhi Enterprise)</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Bhaglamukhi Enterprise, Hyderabad, Telangana 500070
                  </p>
                  <a href="https://maps.app.goo.gl/bHJQsTHfk1Red5Eu8" target="_blank" rel="noreferrer" className="text-[var(--color-brand-primary)] text-xs font-bold hover:underline inline-block mt-1">View on Google Maps →</a>
                </div>
              </div>

              {/* Manufacturing Unit */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900/40 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/10">
                  <MapPin className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Manufacturing Facility</h4>
                  <p className="text-slate-300 leading-relaxed">
                    17°17'46.9"N 78°48'44.4"E, Telangana
                  </p>
                  <a href="https://maps.app.goo.gl/DPzgA4sCQdcK4kpQ7" target="_blank" rel="noreferrer" className="text-[var(--color-brand-primary)] text-xs font-bold hover:underline inline-block mt-1">View on Google Maps →</a>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900/40 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/10">
                  <Mail className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Email Address</h4>
                  <p className="text-slate-300 font-medium">savaxacropcare2023@gmail.com</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900/40 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/10">
                  <Clock className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Office Hours</h4>
                  <p className="text-slate-300">Monday - Saturday: 9:00 AM - 6:00 PM<br/>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-blue-500/10">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900/40 flex items-center justify-center text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors border border-blue-500/10"><FiLinkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900/40 flex items-center justify-center text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors border border-blue-500/10"><FiFacebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900/40 flex items-center justify-center text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors border border-blue-500/10"><FiInstagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900/40 flex items-center justify-center text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors border border-blue-500/10"><FiYoutube className="w-5 h-5" /></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FULL WIDTH DUAL MAP */}
      <div className="w-full bg-[#040d21] py-12 border-t border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-montserrat font-bold text-2xl text-white uppercase tracking-tight">Locate Us</h3>
            <p className="text-slate-400 text-sm mt-1">Switch between our Corporate Headquarters and Manufacturing facility map pins.</p>
          </div>
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-blue-500/10 shadow-sm">
            <button
              onClick={() => setActiveMap('corporate')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeMap === 'corporate' ? 'bg-[var(--color-brand-primary)] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Corporate Headquarters
            </button>
            <button
              onClick={() => setActiveMap('factory')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeMap === 'factory' ? 'bg-[var(--color-brand-primary)] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Manufacturing Facility
            </button>
          </div>
        </div>

        <div className="w-full h-[450px] relative border-y border-blue-500/10 bg-slate-950">
          <iframe
            title={activeMap === 'corporate' ? "Bhaglamukhi Enterprise Location Map" : "Savaxa Manufacturing Facility Location Map"}
            src={activeMap === 'corporate' ? "https://maps.google.com/maps?q=17.3050116,78.6541627&z=16&output=embed" : "https://maps.google.com/maps?q=17.2963644,78.8123223&z=16&output=embed"}
            className="w-full h-full border-0 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-500 invert-[90%] hue-rotate-180"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

    </div>
  )
}
