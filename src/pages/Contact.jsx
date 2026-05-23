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
    <div className="font-inter min-h-screen bg-white pt-32 pb-24">
      <SEO 
        title="Contact Us | SAVAXA Crop Care"
        description="Get in touch with Savaxa's agricultural experts for product inquiries, dealership opportunities, or technical support."
      />
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
          Contact Us
        </h1>
        <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Get in touch with our agricultural experts for product inquiries, dealership opportunities, or technical support.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* LEFT: CONTACT FORM */}
          <div className="bg-[var(--color-brand-surface)] p-8 md:p-10 rounded-3xl border border-[var(--color-blue-100)] shadow-sm">
            <h3 className="text-2xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-6 uppercase">Send us a Message</h3>
            
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
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full bg-white border border-[var(--color-blue-100)] rounded-xl px-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        className="w-full bg-white border border-[var(--color-blue-100)] rounded-xl px-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-white border border-[var(--color-blue-100)] rounded-xl px-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">State / Region</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full bg-white border border-[var(--color-blue-100)] rounded-xl px-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inquiry Type</label>
                    <select className="w-full bg-white border border-[var(--color-blue-100)] rounded-xl px-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all">
                      <option>Product Inquiry</option>
                      <option>Dealership Request</option>
                      <option>Technical Support</option>
                      <option>General Information</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                    <textarea 
                      rows="4" 
                        required 
                      className="w-full bg-white border border-[var(--color-blue-100)] rounded-xl px-4 py-3 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[var(--color-brand-primary)] text-white font-bold py-4 rounded-xl uppercase tracking-wider hover:bg-[var(--color-brand-navy)] transition-colors flex items-center justify-center gap-2"
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
                  <div className="w-20 h-20 bg-[var(--color-brand-surface)] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[var(--color-brand-primary)]" />
                  </div>
                  <h4 className="text-2xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-2">Message Sent Successfully</h4>
                  <p className="text-slate-600 mb-8 max-w-sm">
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
              <h2 className="text-3xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-6 uppercase">Our Locations</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Reach out to Savaxa through our official headquarters or locate our advanced manufacturing unit.
              </p>
            </div>

            <div className="space-y-6">
              {/* Corporate Office */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
                  <MapPin className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-navy)] text-sm uppercase tracking-wider mb-1">Corporate Office (Bhaglamukhi Enterprise)</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Bhaglamukhi Enterprise, Hyderabad, Telangana 500070
                  </p>
                  <a href="https://maps.app.goo.gl/bHJQsTHfk1Red5Eu8" target="_blank" rel="noreferrer" className="text-[var(--color-brand-primary)] text-xs font-bold hover:underline inline-block mt-1">View on Google Maps →</a>
                </div>
              </div>

              {/* Manufacturing Unit */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
                  <MapPin className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-navy)] text-sm uppercase tracking-wider mb-1">Manufacturing Facility</h4>
                  <p className="text-slate-600 leading-relaxed">
                    17°17'46.9"N 78°48'44.4"E, Telangana
                  </p>
                  <a href="https://maps.app.goo.gl/DPzgA4sCQdcK4kpQ7" target="_blank" rel="noreferrer" className="text-[var(--color-brand-primary)] text-xs font-bold hover:underline inline-block mt-1">View on Google Maps →</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
                  <Mail className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-navy)] text-sm uppercase tracking-wider mb-1">Email Address</h4>
                  <p className="text-slate-600 font-medium">savaxacropcare2023@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
                  <Clock className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-navy)] text-sm uppercase tracking-wider mb-1">Office Hours</h4>
                  <p className="text-slate-600">Monday - Saturday: 9:00 AM - 6:00 PM<br/>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[var(--color-blue-100)]">
              <h4 className="font-bold text-[var(--color-brand-navy)] text-sm uppercase tracking-wider mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-brand-surface)] flex items-center justify-center text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors border border-[var(--color-blue-100)]"><FiLinkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-brand-surface)] flex items-center justify-center text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors border border-[var(--color-blue-100)]"><FiFacebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-brand-surface)] flex items-center justify-center text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors border border-[var(--color-blue-100)]"><FiInstagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-brand-surface)] flex items-center justify-center text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors border border-[var(--color-blue-100)]"><FiYoutube className="w-5 h-5" /></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FULL WIDTH DUAL MAP */}
      <div className="w-full bg-[var(--color-brand-surface)] py-12 border-t border-[var(--color-blue-100)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-montserrat font-bold text-2xl text-[var(--color-brand-navy)] uppercase tracking-tight">Locate Us</h3>
            <p className="text-slate-500 text-sm mt-1">Switch between our Corporate Headquarters and Manufacturing facility map pins.</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl border border-[var(--color-blue-100)] shadow-sm">
            <button
              onClick={() => setActiveMap('corporate')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeMap === 'corporate' ? 'bg-[var(--color-brand-primary)] text-white shadow-md' : 'text-slate-600 hover:text-[var(--color-brand-primary)]'}`}
            >
              Corporate Headquarters
            </button>
            <button
              onClick={() => setActiveMap('factory')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeMap === 'factory' ? 'bg-[var(--color-brand-primary)] text-white shadow-md' : 'text-slate-600 hover:text-[var(--color-brand-primary)]'}`}
            >
              Manufacturing Facility
            </button>
          </div>
        </div>

        <div className="w-full h-[450px] relative border-y border-[var(--color-blue-100)] bg-slate-100">
          <iframe
            title={activeMap === 'corporate' ? "Bhaglamukhi Enterprise Location Map" : "Savaxa Manufacturing Facility Location Map"}
            src={activeMap === 'corporate' ? "https://maps.google.com/maps?q=17.3050116,78.6541627&z=16&output=embed" : "https://maps.google.com/maps?q=17.2963644,78.8123223&z=16&output=embed"}
            className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

    </div>
  )
}
