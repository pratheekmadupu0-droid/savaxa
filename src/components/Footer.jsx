import { Link } from 'react-router-dom'
import { RiMailSendLine, RiPhoneLine, RiMapPinLine, RiCopyrightLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative z-10 pt-20 pb-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Logo and about section */}
        <div className="space-y-6">
          <Link to="/" className="inline-block">
            {/* White-contrast logo styling for dark footers */}
            <img 
              src="/savax-logo.png" 
              alt="Savax Logo" 
              className="h-12 w-auto object-contain brightness-0 invert" 
            />
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed font-light">
            Savaxa Bio-Agri Sciences delivers advanced bio-stimulants, crop protection products, and micronutrient solutions trusted by farmers and dealers worldwide.
          </p>
          <div className="space-y-2 text-xs font-mono">
            <p className="flex items-center gap-2"><RiPhoneLine className="text-cyan-400" /> +91 93987 88328</p>
            <p className="flex items-center gap-2"><RiMailSendLine className="text-cyan-400" /> info@savaxa.com</p>
          </div>
        </div>

        {/* Product categories */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-white tracking-widest uppercase font-display border-l-2 border-cyan-400 pl-3">Crop Solutions</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/products?category=biostimulants" className="hover:text-cyan-400 transition">Biostimulants</Link></li>
            <li><Link to="/products?category=insecticides" className="hover:text-cyan-400 transition">Insecticides</Link></li>
            <li><Link to="/products?category=herbicides" className="hover:text-cyan-400 transition">Herbicides</Link></li>
            <li><Link to="/products?category=fungicides" className="hover:text-cyan-400 transition">Fungicides</Link></li>
            <li><Link to="/products?category=micronutrients" className="hover:text-cyan-400 transition">Micronutrients</Link></li>
          </ul>
        </div>

        {/* Corporate navigation links */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-white tracking-widest uppercase font-display border-l-2 border-cyan-400 pl-3">Company</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/about" className="hover:text-cyan-400 transition">About Us</Link></li>
            <li><Link to="/dealers" className="hover:text-cyan-400 transition">Dealers Enquiry</Link></li>
            <li><Link to="/blog" className="hover:text-cyan-400 transition">Agri-Tech Intel</Link></li>
            <li><Link to="/downloads" className="hover:text-cyan-400 transition">Downloads Center</Link></li>
            <li><Link to="/certifications" className="hover:text-cyan-400 transition">Certifications</Link></li>
          </ul>
        </div>

        {/* Newsletter submit form */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-white tracking-widest uppercase font-display border-l-2 border-cyan-400 pl-3">Newsletter</h4>
          <p className="text-xs text-slate-400 leading-relaxed font-light">
            Subscribe to receive direct scientific bulletins, dosage guides, and agricultural yield tips.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email address..."
              required
              className="bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition w-full"
            />
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-xl transition flex items-center justify-center shrink-0">
              <RiMailSendLine className="text-base" />
            </button>
          </form>
        </div>

      </div>

      {/* Address and Copyright Bar */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="flex items-center gap-1.5"><RiMapPinLine className="text-cyan-400 text-sm" /> Survey No. 470, Plot No. 95, Pedda Amberpet Road, Bhuvaneshwari Nagar, Hyderabad, Telangana 501505</p>
        <p className="flex items-center gap-1"><RiCopyrightLine /> 2026 Savaxa Bio-Agri Sciences. All Rights Reserved.</p>
      </div>

    </footer>
  )
}
