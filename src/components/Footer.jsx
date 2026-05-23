import { Link } from 'react-router-dom'
import { RiMailSendLine, RiPhoneLine, RiMapPinLine, RiCopyrightLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="bg-[#020817] text-white border-t border-blue-500/10 relative z-10 pt-20 pb-8 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Logo and Tagline */}
        <div className="space-y-6">
          <Link to="/" className="inline-block">
            <img src="/savax-logo.png" alt="Savaxa Logo" className="h-12 object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.35)]" />
          </Link>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Protecting Crops. Empowering Farmers. Savaxa delivers advanced scientific crop protection products trusted by agricultural professionals worldwide.
          </p>
          <div className="flex gap-4 pt-2">
            {/* Social Icons */}
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-blue-500/10 text-slate-300 flex items-center justify-center hover:bg-[#2563eb] hover:text-white cursor-pointer transition-colors font-bold text-xs">IN</div>
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-blue-500/10 text-slate-300 flex items-center justify-center hover:bg-[#2563eb] hover:text-white cursor-pointer transition-colors font-bold text-xs">FB</div>
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-blue-500/10 text-slate-300 flex items-center justify-center hover:bg-[#2563eb] hover:text-white cursor-pointer transition-colors font-bold text-xs">IG</div>
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-blue-500/10 text-slate-300 flex items-center justify-center hover:bg-[#2563eb] hover:text-white cursor-pointer transition-colors font-bold text-xs">YT</div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-6">
          <h4 className="text-sm font-montserrat font-bold text-white uppercase tracking-wider mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-slate-300 font-medium">
            <li><Link to="/about" className="hover:text-[#38bdf8] transition-colors">About Us</Link></li>
            <li><Link to="/dealers" className="hover:text-[#38bdf8] transition-colors">Our Dealers</Link></li>
            <li><Link to="/crop-solutions" className="hover:text-[#38bdf8] transition-colors">Crop Solutions</Link></li>
            <li><Link to="/downloads" className="hover:text-[#38bdf8] transition-colors">Downloads</Link></li>
            <li><Link to="/certifications" className="hover:text-[#38bdf8] transition-colors">Certifications</Link></li>
            <li><Link to="/blog" className="hover:text-[#38bdf8] transition-colors">Blog & News</Link></li>
          </ul>
        </div>

        {/* Column 3: Products */}
        <div className="space-y-6">
          <h4 className="text-sm font-montserrat font-bold text-white uppercase tracking-wider mb-6">
            Products
          </h4>
          <ul className="space-y-3 text-sm text-slate-300 font-medium">
            <li><Link to="/products" className="hover:text-[#38bdf8] transition-colors">All Products</Link></li>
            <li><Link to="/products/insecticides" className="hover:text-[#38bdf8] transition-colors">Insecticides</Link></li>
            <li><Link to="/products/herbicides" className="hover:text-[#38bdf8] transition-colors">Herbicides</Link></li>
            <li><Link to="/products/fungicides" className="hover:text-[#38bdf8] transition-colors">Fungicides</Link></li>
            <li><Link to="/pest-control" className="hover:text-[#38bdf8] transition-colors">Pest Control Guide</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-6">
          <h4 className="text-sm font-montserrat font-bold text-white uppercase tracking-wider mb-6">
            Contact Info
          </h4>
          <div className="space-y-4 text-sm text-slate-300 font-medium">
            <p className="flex items-start gap-3">
              <RiMapPinLine className="text-[#38bdf8] text-xl shrink-0 mt-0.5" />
              <span>Survey No. 470, Plot No. 95, Pedda Amberpet Road, Bhuvaneshwari Nagar, Hyderabad, Telangana 501505</span>
            </p>
            <p className="flex items-center gap-3">
              <RiPhoneLine className="text-[#38bdf8] text-xl shrink-0" />
              <span>+91 8074 660 491</span>
            </p>
            <p className="flex items-center gap-3">
              <RiMailSendLine className="text-[#38bdf8] text-xl shrink-0" />
              <span>savaxacropcare2023@gmail.com</span>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 border-t border-blue-500/10 text-xs text-slate-300 font-medium flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="flex items-center gap-1.5">
            <RiCopyrightLine /> 2026 Savaxa Bio-Agri Sciences. All Rights Reserved.
          </p>
          <p className="font-semibold tracking-wide text-white uppercase">
            Registered under CIB&RC India
          </p>
          <p className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
