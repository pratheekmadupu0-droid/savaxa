import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('savaxa_lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('savaxa_lang', language)
    document.documentElement.lang = language === 'te' ? 'te' : 'en'
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'))
  }

  // Inline translation helper: t("English", "తెలుగు")
  const t = (en, te) => {
    if (language === 'te' && te) return te
    return en
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
