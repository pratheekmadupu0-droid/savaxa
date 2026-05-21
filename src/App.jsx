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
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import FAQ from './pages/FAQ.jsx'

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Login from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProductsAdmin from './pages/admin/ProductsAdmin.jsx'
import DealersAdmin from './pages/admin/DealersAdmin.jsx'
import DownloadsAdmin from './pages/admin/DownloadsAdmin.jsx'

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

      {/* Primary Layout */}
      {!location.pathname.startsWith('/admin') && <Navbar />}

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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/faqs" element={<FAQ />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="dealers" element={<DealersAdmin />} />
            <Route path="downloads" element={<DownloadsAdmin />} />
          </Route>
        </Routes>
      </main>

      {/* Hide Chatbot and Footer on Admin Routes */}
      {!location.pathname.startsWith('/admin') && location.pathname !== '/contact' && <Chatbot />}
      {!location.pathname.startsWith('/admin') && <Footer />}
    </>
  )
}
