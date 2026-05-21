import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { 
  RiMenu3Line, 
  RiCloseFill, 
  RiArrowRightUpLine, 
  RiArrowDownSLine,
  RiLeafLine, 
  RiBugLine, 
  RiFlaskLine,
  RiSparkling2Line,
  RiMapPinRangeLine,
  RiBookOpenLine,
  RiDownload2Line,
  RiAwardLine,
  RiGroupLine,
  RiCustomerService2Line,
  RiHome5Line,
  RiInformationLine
} from 'react-icons/ri'

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { 
      name: 'Home', 
      teluguName: 'హోమ్',
      path: '/',
      icon: <RiHome5Line className="text-emerald-600 text-base" />
    },
    { 
      name: 'About', 
      teluguName: 'గురించి',
      path: '/about',
      icon: <RiInformationLine className="text-emerald-600 text-base" />
    },
    { 
      name: 'Products', 
      teluguName: 'ఉత్పత్తులు',
      path: '/products', 
      icon: <RiSparkling2Line className="text-emerald-600 text-base" />,
      dropdown: [
        { 
          name: 'All Products', 
          teluguName: 'అన్ని ఉత్పత్తులు',
          path: '/products', 
          desc: 'Complete portfolio of registered agrochemical crop products.', 
          teluguDesc: 'వ్యవసాయ రసాయన పంట ఉత్పత్తుల పూర్తి శ్రేణి.',
          icon: <RiSparkling2Line className="text-emerald-600" /> 
        },
        { 
          name: 'Insecticides', 
          teluguName: 'కీటకనాశకాలు',
          path: '/products?category=insecticides', 
          desc: 'High-efficacy targeting against chewing & sucking pests.', 
          teluguDesc: 'నమిలే మరియు పీల్చే పురుగుల పై అధిక ప్రభావం చూపేవి.',
          icon: <RiBugLine className="text-teal-600" /> 
        },
        { 
          name: 'Herbicides', 
          teluguName: 'కలుపు సంహారకాలు',
          path: '/products?category=herbicides', 
          desc: 'Selective weed blockades tailored for rich crop yields.', 
          teluguDesc: 'అధిక పంట దిగుబడి కొరకు ప్రత్యేక కలుపు నివారణ మార్గాలు.',
          icon: <RiLeafLine className="text-emerald-600" /> 
        },
        { 
          name: 'Fungicides', 
          teluguName: 'శిలీంద్ర నాశకాలు',
          path: '/products?category=fungicides', 
          desc: 'Advanced defense systems preventing severe fungal spreads.', 
          teluguDesc: 'శిలీంద్ర వ్యాధుల వ్యాప్తిని నిరోధించే ఆధునిక రక్షణ వ్యవస్థలు.',
          icon: <RiFlaskLine className="text-sky-600" /> 
        },
      ]
    },
    { 
      name: 'Solutions', 
      teluguName: 'పరిష్కారాలు',
      path: '/crop-solutions',
      icon: <RiLeafLine className="text-emerald-600 text-base" />
    },
    { 
      name: 'Dealers', 
      teluguName: 'డీలర్లు',
      path: '/dealers',
      icon: <RiMapPinRangeLine className="text-emerald-600 text-base" />
    },
    { 
      name: 'Resources', 
      teluguName: 'వనరులు',
      path: '/downloads',
      icon: <RiDownload2Line className="text-emerald-600 text-base" />,
      sublinks: [
        { name: 'Downloads', teluguName: 'డౌన్‌లోడ్‌లు', path: '/downloads' },
        { name: 'Certifications', teluguName: 'ధృవపత్రాలు', path: '/certifications' },
        { name: 'Pest Control', teluguName: 'కీటక నియంత్రణ', path: '/pest-control' },
        { name: 'Blog', teluguName: 'బ్లాగ్', path: '/blog' }
      ]
    }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Premium Floating Island Header wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans pointer-events-none">
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`mx-auto w-[94%] xl:w-[90%] max-w-[1400px] pointer-events-auto transition-all duration-550 ${
            isScrolled 
              ? 'mt-4 bg-white/85 backdrop-blur-xl border border-emerald-500/15 py-2.5 px-6 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.08)]' 
              : 'mt-6 bg-white/55 backdrop-blur-md border border-white/20 py-4 px-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.03)]'
          }`}
        >
          <div className="flex items-center justify-between">
            
            {/* Logo on the Left - With Interactive Glow and Breathe Aura */}
            <div className="flex items-center shrink-0 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
              <Link to="/" className="flex items-center">
                <img 
                  src="/savax-logo.png" 
                  alt="Savax Logo" 
                  className={`w-auto object-contain transition-all duration-550 ${
                    isScrolled ? 'h-10 md:h-11' : 'h-14 md:h-15'
                  }`}
                />
              </Link>
            </div>

            {/* Navigation links with sliding capsule hover pillow */}
            <div className="hidden xl:flex items-center gap-1.5 relative">
              {navLinks.map((link, idx) => (
                <div 
                  key={link.name} 
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredIndex(idx)
                    if (link.dropdown) setProductsDropdownOpen(true)
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null)
                    if (link.dropdown) setProductsDropdownOpen(false)
                  }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 text-[10.5px] tracking-widest font-extrabold uppercase transition-colors duration-350 flex items-center gap-1.5 z-10 ${
                      isActive(link.path) ? 'text-emerald-700' : 'text-slate-650 hover:text-slate-900'
                    }`}
                  >
                    <span>{t(link.name, link.teluguName)}</span>
                    {link.dropdown && (
                      <RiArrowDownSLine className={`transition-transform duration-350 text-xs ${productsDropdownOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
                    )}
                  </Link>

                  {/* Dynamic Hover Highlight Pill */}
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.div
                        layoutId="navHoverPill"
                        className="absolute inset-0 bg-emerald-50/70 border border-emerald-100/50 rounded-xl -z-10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Highly polished mega-dropdown layout */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {productsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] bg-white rounded-2xl shadow-[0_24px_54px_rgba(0,0,0,0.12)] p-6 mt-3 border border-slate-200/90 z-50 grid grid-cols-12 gap-5"
                        >
                          {/* Dropdown Left side links grid */}
                          <div className="col-span-8 grid grid-cols-1 gap-2 border-r border-slate-100 pr-5">
                            <p className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-bold mb-1">
                              {t("CATEGORIES", "విభాగాలు")}
                            </p>
                            {link.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition duration-200 text-left"
                              >
                                <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-white group-hover:shadow-sm border border-slate-100 text-slate-700 transition duration-200">
                                  {subItem.icon}
                                </div>
                                <div className="space-y-0.5">
                                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">
                                    {t(subItem.name, subItem.teluguName)}
                                  </h4>
                                  <p className="text-[10px] text-slate-450 leading-relaxed font-light font-sans">
                                    {t(subItem.desc, subItem.teluguDesc)}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Dropdown Right side Featured card */}
                          <div className="col-span-4 flex flex-col justify-between bg-gradient-to-br from-emerald-50/50 to-teal-50/20 p-4 rounded-xl border border-emerald-100/40 text-left">
                            <div className="space-y-2">
                              <span className="inline-block text-[8px] bg-emerald-600 text-white font-mono font-bold tracking-widest px-2 py-0.5 rounded-full uppercase">
                                {t("FEATURED", "ప్రముఖమైనవి")}
                              </span>
                              <h4 className="text-xs font-bold text-slate-800 tracking-wide font-display uppercase mt-1">
                                {t("CIB REGISTERED", "CIB&RC అనుమతి పొందినవి")}
                              </h4>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                                {t(
                                  "75+ registered high-performance chemical blends formulated in state-of-the-art agronomy reactors.",
                                  "అత్యంత నాణ్యమైన రియాక్టర్లలో తయారు చేయబడిన 75+ అనుమతి పొందిన రసాయన మిశ్రమాలు."
                                )}
                              </p>
                            </div>
                            <Link 
                              to="/products"
                              className="group inline-flex items-center gap-1 text-[9px] font-extrabold uppercase text-emerald-600 tracking-widest hover:text-emerald-700 mt-4"
                            >
                              {t("Explore Catalog", "ఉత్పత్తుల కేటలాగ్")}
                              <RiArrowRightUpLine className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Secondary Resources Dropdown */}
                  {link.sublinks && (
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-2xl p-2 mt-3 border border-slate-200/85 z-50"
                        >
                          {link.sublinks.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block px-4 py-2.5 text-[10px] tracking-wider uppercase font-bold text-slate-650 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition duration-200 text-left"
                            >
                              {t(sub.name, sub.teluguName)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* High fidelity tiny dot for active page */}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbarActiveDot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full shadow-[0_0_6px_#10b981]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* CTA action button and menu triggers */}
            <div className="flex items-center gap-4">
              {/* Language Selector Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white/90 hover:bg-slate-550 text-slate-700 hover:text-slate-900 transition duration-300 text-[10.5px] font-extrabold tracking-widest uppercase cursor-pointer shadow-sm hover:shadow"
                title={language === 'en' ? 'Switch to Telugu' : 'ఇంగ్లీషుకు మారండి'}
              >
                <span>🌐</span>
                <span className="text-emerald-650 font-black">{language === 'en' ? 'TE' : 'EN'}</span>
              </button>

              <Link 
                to="/contact"
                className="btn-premium font-bold px-5 py-2.5 rounded-xl text-[10.5px] tracking-widest uppercase transition duration-300 flex items-center gap-1.5 group shrink-0"
              >
                <span>{t("Get In Touch", "ಸಂಪರ್ಕಿಸಿ")}</span>
                <RiArrowRightUpLine className="group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300 text-xs shrink-0" />
              </Link>

              {/* Mobile hamburger menu */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden text-slate-800 hover:text-emerald-600 transition p-2 hover:bg-slate-100 rounded-xl border border-slate-200"
              >
                {mobileMenuOpen ? <RiCloseFill className="text-xl" /> : <RiMenu3Line className="text-xl" />}
              </button>
            </div>

          </div>
        </motion.header>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-between p-8 xl:hidden border-r border-slate-200 font-sans"
          >
            <div className="space-y-8 mt-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <p className="text-[10px] text-emerald-600 tracking-widest uppercase font-mono font-bold">
                  {t("NAVIGATION MENU", "నావిగేషన్ మెనూ")}
                </p>
                {/* Mobile Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-[10px] font-bold uppercase cursor-pointer"
                >
                  <span>🌐</span>
                  <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {navLinks.map((link) => {
                  if (link.name === 'Products') {
                    return (
                      <div key={link.name} className="col-span-2 space-y-2">
                        <Link
                          to="/products"
                          className="text-sm font-extrabold tracking-wider text-slate-850 hover:text-emerald-600 flex items-center gap-1.5 uppercase font-display"
                        >
                          {t(link.name, link.teluguName)}
                        </Link>
                        <div className="pl-4 grid grid-cols-2 gap-2">
                          {link.dropdown.slice(1).map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="text-[11px] text-slate-500 hover:text-emerald-600 py-1 uppercase font-bold"
                            >
                              {t(sub.name, sub.teluguName)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  if (link.sublinks) {
                    return (
                      <div key={link.name} className="col-span-2 space-y-2">
                        <span className="text-sm font-extrabold tracking-wider text-slate-850 uppercase font-display">
                          {t(link.name, link.teluguName)}
                        </span>
                        <div className="pl-4 grid grid-cols-2 gap-2">
                          {link.sublinks.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="text-[11px] text-slate-500 hover:text-emerald-600 py-1 uppercase font-bold"
                            >
                              {t(sub.name, sub.teluguName)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`text-sm font-extrabold tracking-wider uppercase font-display transition duration-200 ${
                        isActive(link.path) ? 'text-emerald-600' : 'text-slate-650 hover:text-slate-850'
                      }`}
                    >
                      {t(link.name, link.teluguName)}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px] text-slate-450 tracking-widest font-mono">SUPPORT HELPLINE</p>
                  <p className="text-xs font-bold text-slate-800">+91 8074 660 491</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-450 tracking-widest font-mono">EMAIL INQUIRIES</p>
                  <p className="text-xs font-bold text-slate-800 font-sans">savaxacropcare2023@gmail.com</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">© 2026 Savaxa Bio-Agri Sciences. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
