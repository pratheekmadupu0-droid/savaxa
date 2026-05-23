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
              <h2 className="text-3xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-6 uppercase">Corporate Headquarters</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Visit our main office or reach out through our official channels. We're here to support your agribusiness needs with world-class solutions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
                  <MapPin className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-navy)] text-sm uppercase tracking-wider mb-1">Office Address</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Plot 120, Sector 1, Industrial Development Area, Uppal,<br />
                    Hyderabad, Telangana 500039
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
                  <Phone className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-navy)] text-sm uppercase tracking-wider mb-1">Phone / WhatsApp</h4>
                  <p className="text-slate-600 mb-1">+91 8074 660 491</p>
                  <a href="https://wa.me/918074660491" target="_blank" rel="noreferrer" className="text-[var(--color-brand-primary)] text-xs font-bold hover:underline">Chat on WhatsApp →</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
                  <Mail className="w-5 h-5 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-navy)] text-sm uppercase tracking-wider mb-1">Email Address</h4>
                  <p className="text-slate-600">savaxacropcare2023@gmail.com</p>
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

      {/* FULL WIDTH MAP */}
      <div className="w-full h-[400px] border-t border-[var(--color-blue-100)]">
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.375626359556!2d78.53036665000002!3d17.36208945!2m3!1f0!2f0!3f0!3m2!1i1020!2i768!4f13.1!3m3!1m2!1s0x3bcb9f78326db4bf%3A0x6b1075677b5d12cf!2sAmberpet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
          className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          allowFullScreen=""
          loading="lazy"
        />
      </div>

    </div>
  )
}
