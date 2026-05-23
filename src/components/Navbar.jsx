import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMenu3Line, RiCloseFill } from 'react-icons/ri'
import { LogIn, Compass } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const leftLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Crop Solutions', path: '/crop-solutions' },
  ]

  const rightLinks = [
    { name: 'Dealers', path: '/dealers' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-body px-4 md:px-8 py-4 ${
          isScrolled ? 'backdrop-blur-xl bg-[#020817]/75 border-b border-blue-500/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
          
          {/* MOBILE LOGO */}
          <div className="flex-shrink-0 xl:hidden flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img 
                src="/savax-logo.png" 
                alt="SAVAXA Logo" 
                className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.35)]" 
              />
            </Link>
          </div>

          {/* DESKTOP CENTERED NAVBAR */}
          <div className="hidden xl:flex items-center justify-between w-full">
            
            {/* Left Nav links */}
            <nav className="flex space-x-8 items-center">
              {leftLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:text-white ${
                    isActive(link.path) 
                      ? 'text-[#06b6d4] drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]' 
                      : 'text-slate-400'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div layoutId="navDot" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#06b6d4] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Center Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link to="/" className="flex items-center justify-center">
                <img 
                  src="/savax-logo.png" 
                  alt="SAVAXA Logo" 
                  className="h-12 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]" 
                />
              </Link>
            </div>

            {/* Right Nav links & CTA buttons */}
            <div className="flex items-center space-x-8">
              <nav className="flex space-x-8 items-center">
                {rightLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:text-white ${
                      isActive(link.path) 
                        ? 'text-[#06b6d4] drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]' 
                        : 'text-slate-400'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div layoutId="navDot2" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#06b6d4] rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Dealer Login Button */}
                <Link 
                  to="/admin/login" 
                  className="liquid-glass px-5 py-2.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-slate-300 hover:text-white border border-white/10 hover:border-blue-500/30 transition-all flex items-center gap-1.5 group"
                >
                  <LogIn className="w-3 h-3 text-[#06b6d4] group-hover:scale-110 transition-transform" />
                  Dealer Login
                </Link>

                {/* Get Started CTA */}
                <Link 
                  to="/contact" 
                  className="liquid-glass-strong bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/35 transition-all flex items-center gap-1.5 hover:scale-102"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-200" />
                  Get Started
                </Link>
              </div>
            </div>

          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-cyan-400 p-2.5 hover:bg-white/5 rounded-full transition-all border border-blue-500/10"
            >
              <RiMenu3Line className="text-2xl" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-0 z-50 bg-[#020817] flex flex-col font-body border-l border-blue-500/10"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/savax-logo.png" 
                  alt="SAVAXA Logo" 
                  className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.35)]" 
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 p-2 hover:bg-white/5 hover:text-white rounded-full transition-all border border-white/10"
              >
                <RiCloseFill className="text-2xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 flex flex-col justify-center">
              {[...leftLinks, ...rightLinks].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-3xl font-heading font-bold text-center tracking-wide block hover:text-[#06b6d4] transition-colors ${
                    isActive(link.path) ? 'text-[#06b6d4]' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                <Link 
                  to="/admin/login" 
                  className="block text-center liquid-glass py-4 rounded-full text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white"
                >
                  Dealer Login
                </Link>
                <Link 
                  to="/contact" 
                  className="block text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
