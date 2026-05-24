import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMenu3Line, RiCloseFill } from 'react-icons/ri'
import { LogIn, Compass, Globe } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
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

  // Google Translate Helper & Initialization
  useEffect(() => {
    const getTransCookie = () => {
      const match = document.cookie.match(/(^| )googtrans=([^;]+)/)
      if (match && match[2]) {
        const val = match[2]
        if (val.includes('/te')) return 'te'
      }
      return 'en'
    }
    setCurrentLang(getTransCookie())

    // Setup invisible Google Translate elements
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,te',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element')
      }
    }

    if (!document.getElementById('google-translate-script')) {
      const addScript = document.createElement('script')
      addScript.setAttribute('src', 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
      addScript.setAttribute('id', 'google-translate-script')
      document.body.appendChild(addScript)
    }
  }, [])

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'te' : 'en'
    setCurrentLang(nextLang)

    // Store state in cookies globally to keep translated layout on subsequent pages
    const domain = window.location.hostname
    document.cookie = `googtrans=/en/${nextLang}; path=/; domain=${domain}`
    document.cookie = `googtrans=/en/${nextLang}; path=/; domain=.${domain}`
    document.cookie = `googtrans=/en/${nextLang}; path=/` // Fallback

    // Dispatch selection event to DOM translation combobox to change language in real time
    const selectEl = document.querySelector('select.goog-te-combo')
    if (selectEl) {
      selectEl.value = nextLang
      selectEl.dispatchEvent(new Event('change'))
    } else {
      window.location.reload()
    }
  }

  const leftLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Crop Solutions', path: '/crop-solutions' },
  ]

  const rightLinks = [
    { name: 'Dealers', path: '/dealers' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Blog', path: '/blog' },
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
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 relative">
          
          {/* MOBILE LOGO & TRANSLATION TOGGLE COMBINED */}
          <div className="flex-shrink-0 xl:hidden flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img 
                src="/savax-logo.png" 
                alt="SAVAXA Logo" 
                className="h-14 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.35)]" 
              />
            </Link>
            
            {/* Quick mobile language icon */}
            <button 
              onClick={toggleLanguage}
              className="text-cyan-400 p-2.5 bg-slate-950/40 rounded-full border border-blue-500/10 hover:border-blue-500/35 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-all"
              title="భాషను మార్చండి / Switch Language"
            >
              <Globe className="w-4.5 h-4.5" />
              <span>{currentLang === 'en' ? 'EN' : 'తెల'}</span>
            </button>
          </div>

          {/* DESKTOP CENTERED NAVBAR */}
          <div className="hidden xl:flex items-center justify-between w-full relative">
            
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
                    <motion.div layoutId="navDot" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#06b6d4] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Center Logo - Perfectly Centered in Middle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0 flex items-center justify-center pointer-events-auto">
              <Link to="/" className="flex items-center justify-center">
                <img 
                  src="/savax-logo.png" 
                  alt="SAVAXA Logo" 
                  className="h-18 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]" 
                />
              </Link>
            </div>

            {/* Right Nav links & CTA buttons */}
            <div className="flex items-center space-x-8">
              <nav className="flex space-x-8 items-center mr-2">
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
                      <motion.div layoutId="navDot2" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#06b6d4] rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Google Translate Switcher Button */}
                <button 
                  onClick={toggleLanguage}
                  className="liquid-glass px-4 py-2.5 rounded-full text-[10px] uppercase font-extrabold tracking-widest text-[#06b6d4] border border-[#06b6d4]/20 hover:border-[#06b6d4]/50 transition-all flex items-center gap-1.5 shadow-inner hover:scale-[1.03]"
                  title="Switch Language / భాషను మార్చండి"
                >
                  <Globe className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span>{currentLang === 'en' ? 'ENG / తెల' : 'తెల / ENG'}</span>
                </button>

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

      {/* Invisible target container required by Google Translate SDK */}
      <div id="google_translate_element" style={{ display: 'none' }} className="hidden" />

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
                  className="h-14 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.35)]" 
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
                {/* Mobile Language Toggle */}
                <button 
                  onClick={toggleLanguage}
                  className="w-full text-center liquid-glass py-4 rounded-full text-xs font-bold uppercase tracking-widest text-[#06b6d4] flex items-center justify-center gap-2 border border-[#06b6d4]/10"
                >
                  <Globe className="w-4 h-4 text-[#06b6d4]" />
                  <span>{currentLang === 'en' ? 'Language: English' : 'భాష: తెలుగు'}</span>
                </button>

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
