import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiRobot2Fill, RiCloseFill, RiSendPlaneFill, RiSeedlingFill } from 'react-icons/ri'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am BioShield AI, Savaxa\'s smart agriculture assistant. How can I assist you today with crop protection?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const botResponses = {
    hello: "Hello there! Savaxa is committed to next-generation crop solutions. How can I help?",
    pesticide: "Savaxa offers advanced, low-dosage, eco-conscious Insecticides, Herbicides, and Fungicides designed for high-yield returns.",
    products: "We have three main segments: 1. Insecticides (crop protection against bugs) 2. Herbicides (weed control) 3. Fungicides (fungal disease control). You can explore them in our Products catalog!",
    organic: "Savaxa integrates bio-engineered ingredients with modern science to maximize safety and efficiency, adhering to rigorous ISO standards.",
    dealer: "To become an authorized Savaxa partner, head to our Dealers page and complete the Registration form. Our state teams will reach out!",
    contact: "You can reach us directly via the Contact page or send an email to info@savaxa.com. We also have a dedicated WhatsApp helpline!",
    rice: "For Rice cultivation, we recommend our specialized herbicide 'Savaxa Rice-Shield' and our bio-insecticide to combat stem borers. Check 'Crop Solutions' page for details!",
    cotton: "Cotton crops are highly sensitive to bollworms. Our premium insecticide class provides robust defenses. Please view our Crop Solutions section.",
    default: "I appreciate your query! Please feel free to email our support desk at contact@savaxa.com or call our agronomy helpline at 1800-SAVAXA-BIO."
  }

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate smart bot response
    setTimeout(() => {
      const query = textToSend.toLowerCase()
      let replyText = botResponses.default

      if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        replyText = botResponses.hello
      } else if (query.includes('pesticide') || query.includes('chemical') || query.includes('bio')) {
        replyText = botResponses.pesticide
      } else if (query.includes('product') || query.includes('insecticide') || query.includes('herbicide') || query.includes('fungicide')) {
        replyText = botResponses.products
      } else if (query.includes('organic') || query.includes('safe') || query.includes('eco')) {
        replyText = botResponses.organic
      } else if (query.includes('dealer') || query.includes('partner') || query.includes('distribute')) {
        replyText = botResponses.dealer
      } else if (query.includes('contact') || query.includes('phone') || query.includes('support') || query.includes('email')) {
        replyText = botResponses.contact
      } else if (query.includes('rice') || query.includes('paddy')) {
        replyText = botResponses.rice
      } else if (query.includes('cotton')) {
        replyText = botResponses.cotton
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setIsTyping(false)
    }, 1200)
  }

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const suggestedQuestions = [
    'What is Savaxa?',
    'Show me Products',
    'How to become a Dealer?',
    'Rice Crop Protection'
  ]

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.85 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[360px] md:w-[380px] h-[500px] rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden mb-4 border border-cyan-500/25 relative"
            style={{
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-950/80 to-cyan-950/80 px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                    <RiRobot2Fill className="text-lg" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-ping" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold tracking-wider flex items-center gap-1 font-display">
                    BioShield AI <RiSeedlingFill className="text-emerald-400" />
                  </h3>
                  <p className="text-[10px] text-cyan-400/80 tracking-widest font-mono">AGRI-SCIENCE EXPERT</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white transition duration-200 p-1 hover:bg-white/5 rounded-full"
              >
                <RiCloseFill className="text-xl" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-sky-600 text-white rounded-tr-none shadow-[0_4px_12px_rgba(14,165,233,0.2)]' 
                        : 'bg-slate-900/90 text-slate-100 rounded-tl-none border border-white/5 shadow-md'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] text-slate-400 text-right mt-1.5 font-mono">{msg.time}</span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/90 rounded-xl rounded-tl-none px-4 py-3 border border-white/5">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="bg-sky-950/45 hover:bg-sky-900/50 border border-sky-500/20 text-sky-300 hover:text-white px-2.5 py-1.5 rounded-full text-xs transition duration-200"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="p-3 border-t border-white/10 bg-slate-950/80 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask BioShield AI..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-900 border border-white/10 focus:border-cyan-500/60 text-white rounded-xl px-4 py-2 text-sm focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2 rounded-xl transition duration-200 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              >
                <RiSendPlaneFill className="text-base" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg relative cursor-pointer group"
        style={{
          boxShadow: '0 0 25px rgba(6, 182, 212, 0.45)'
        }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <RiRobot2Fill className="text-2xl text-slate-950 group-hover:scale-110 transition duration-300" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-brand-dark animate-pulse" />
      </motion.button>
    </div>
  )
}
