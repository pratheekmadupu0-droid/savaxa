import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

// Custom Components
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ThreeCanvas from './components/ThreeCanvas.jsx'
import Chatbot from './components/Chatbot.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import LenisScroll from './components/LenisScroll.jsx'

// Pages
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import CropSolutions from './pages/CropSolutions.jsx'
import PestControl from './pages/PestControl.jsx'
import Dealers from './pages/Dealers.jsx'
import Blog from './pages/Blog.jsx'
import Downloads from './pages/Downloads.jsx'
import Certifications from './pages/Certifications.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const location = useLocation()

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {/* Premium UI/UX Additions */}
      <LenisScroll />
      <ScrollProgress />
      <CustomCursor />
      {location.pathname !== '/' && <ThreeCanvas />}

      {/* Primary Layout */}
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/details" element={<ProductDetails />} />
          <Route path="/crop-solutions" element={<CropSolutions />} />
          <Route path="/pest-control" element={<PestControl />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Chatbot />
      <Footer />
    </>
  )
}
