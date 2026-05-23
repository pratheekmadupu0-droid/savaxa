import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RiMenu3Line, 
  RiCloseFill, 
  RiArrowDownSLine,
  RiBugLine,
  RiLeafLine,
  RiFlaskLine
} from 'react-icons/ri'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setProductsDropdownOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { 
      name: 'Products', 
      path: '/products',
      dropdown: [
        { name: 'Insecticides', path: '/products/insecticides', desc: 'Targeted pest control', icon: <RiBugLine className="text-[var(--color-brand-primary)] text-2xl" /> },
        { name: 'Herbicides', path: '/products/herbicides', desc: 'Effective weed management', icon: <RiLeafLine className="text-[var(--color-brand-primary)] text-2xl" /> },
        { name: 'Fungicides', path: '/products/fungicides', desc: 'Advanced disease protection', icon: <RiFlaskLine className="text-[var(--color-brand-primary)] text-2xl" /> },
      ]
    },
    { name: 'Crop Solutions', path: '/crop-solutions' },
    { name: 'Pest Control', path: '/pest-control' },
    { name: 'Dealers', path: '/dealers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Certifications', path: '/certifications' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path) && path !== '/'
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white font-inter ${
          isScrolled ? 'shadow-md border-b-0' : 'border-b border-[#E0ECFF]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-montserrat font-bold text-2xl text-[var(--color-brand-primary)] tracking-tight">SAVAXA</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex space-x-1 lg:space-x-6 items-center">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setProductsDropdownOpen(true)}
                  onMouseLeave={() => link.dropdown && setProductsDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive(link.path) ? 'text-[var(--color-brand-primary)]' : 'text-slate-700 hover:text-[var(--color-brand-primary)]'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <RiArrowDownSLine className={`transition-transform duration-300 ${productsDropdownOpen ? 'rotate-180 text-[var(--color-brand-primary)]' : ''}`} />
                    )}
                  </Link>

                  {/* Mega Dropdown */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {productsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-xl border border-[#E0ECFF] rounded-lg mt-1 p-6 z-50 grid grid-cols-3 gap-6"
                        >
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="group/item flex flex-col items-center text-center p-4 rounded-lg hover:bg-[#F0F6FF] transition-colors border border-transparent hover:border-[#D0E4FF]"
                            >
                              <div className="mb-3 p-3 bg-white rounded-full shadow-sm group-hover/item:shadow-md transition-shadow">
                                {sub.icon}
                              </div>
                              <h4 className="font-montserrat font-bold text-sm text-[var(--color-brand-navy)] mb-1 group-hover/item:text-[var(--color-brand-primary)]">
                                {sub.name}
                              </h4>
                              <p className="text-xs text-slate-500">
                                {sub.desc}
                              </p>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden xl:flex items-center">
              <Link to="/contact" className="btn-premium px-6 py-2.5 text-sm">
                Contact Us
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-[var(--color-brand-primary)] p-2"
              >
                <RiMenu3Line className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[var(--color-brand-primary)] flex flex-col font-inter"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <span className="font-montserrat font-bold text-2xl text-white tracking-tight">SAVAXA</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <RiCloseFill className="text-2xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col space-y-3">
                  <Link
                    to={link.path}
                    className="text-2xl font-montserrat font-bold text-white hover:text-[#00B4D8] transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 border-l-2 border-white/30 flex flex-col space-y-3">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="text-lg text-white/80 hover:text-white transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-8 mt-8 border-t border-white/20">
                <Link to="/contact" className="block text-center bg-white text-[var(--color-brand-primary)] font-bold py-3 rounded-lg text-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
