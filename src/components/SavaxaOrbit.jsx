import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

// Custom high-quality SVG icons to perfectly match the user's screenshot
const SproutIcon = () => (
  <svg 
    className="w-6 h-6 md:w-8 md:h-8 text-[#1b6b37]" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M7 20h10" />
    <path d="M12 20v-8" />
    <path d="M12 12c0-3 1.5-5 5-5" />
    <path d="M12 14c0-3-1.5-5-5-5" />
    <circle cx="12" cy="7" r="1" fill="currentColor" />
  </svg>
)

const DropletLeafIcon = () => (
  <svg 
    className="w-6 h-6 md:w-8 md:h-8 text-[#1b6b37]" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Outer droplet outline */}
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
    {/* Inner leaf vein detailing */}
    <path d="M12 22c0-4 1.5-6.5 4-8.5" />
    <path d="M12 17.5c-1.5-1.5-2.5-3-2.5-4.5" />
  </svg>
)

const LeafIcon = () => (
  <svg 
    className="w-6 h-6 md:w-8 md:h-8 text-[#1b6b37]" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 8a7.5 7.5 0 0 1-9 10z" />
    <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
  </svg>
)

export default function SavaxaOrbit() {
  const elements = [
    {
      id: 'sprout',
      icon: <SproutIcon />,
      title: 'Advanced Bio-Research',
      description: 'Harnessing biological stressors for maximum crop yield and nutrition.',
      // Exact 120-degree distribution coordinates
      // Top-Left: ~240 deg (x = cos(240) = -0.5, y = sin(240) = -0.866) => left = 25%, top = 6.7%
      styleClass: 'top-[6.7%] left-[25%]',
    },
    {
      id: 'droplet',
      icon: <DropletLeafIcon />,
      title: 'Targeted Crop Protection',
      description: 'Efficacious pest controls and selective herbicides safeguarding networks.',
      // Right: ~0 deg (x = cos(0) = 1, y = sin(0) = 0) => left = 100%, top = 50%
      styleClass: 'top-[50%] left-[100%]',
    },
    {
      id: 'leaf',
      icon: <LeafIcon />,
      title: 'Sustainable Eco-Defense',
      description: 'Formulated with an eco-safe profile to preserve soil biology and health.',
      // Bottom-Left: ~120 deg (x = cos(120) = -0.5, y = sin(120) = 0.866) => left = 25%, top = 93.3%
      styleClass: 'top-[93.3%] left-[25%]',
    }
  ]

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[500px] aspect-square flex items-center justify-center mx-auto select-none overflow-visible">
      
      {/* 1. Self-contained CSS keyframes for rotation to avoid standard Tailwind conflicts */}
      <style>{`
        @keyframes savaxa-orbit-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes savaxa-orbit-counter-rotate {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-orbit-clockwise {
          animation: savaxa-orbit-rotate 35s linear infinite;
        }
        .animate-orbit-counter {
          animation: savaxa-orbit-counter-rotate 35s linear infinite;
        }
        .animate-orbit-clockwise-paused {
          animation-play-state: paused;
        }
        .orbit-container:hover .animate-orbit-clockwise,
        .orbit-container:hover .animate-orbit-counter {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient background glow behind the entire widget to make it fit Savaxa dark mode */}
      <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Orbit Container with hover-to-pause interaction */}
      <div className="orbit-container relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] flex items-center justify-center">
        
        {/* 2. DASHED ORBIT CIRCLE */}
        <div className="animate-orbit-clockwise absolute inset-0 rounded-full border border-dashed border-emerald-500/25 flex items-center justify-center">
          
          {/* Orbiting element: Small green dot on the orbit path (matching the reference screenshot) */}
          <div className="absolute w-2.5 h-2.5 bg-[#1b6b37] rounded-full top-[50%] -right-1.25 -translate-y-1/2 shadow-[0_0_8px_rgba(27,107,55,0.6)]" />
          
          {/* 3. THREE ORBITING WHITE CIRCULAR CARDS */}
          {elements.map((el) => (
            <div 
              key={el.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${el.styleClass} group`}
            >
              {/* Rotating child counter-clockwise to keep it perfectly upright */}
              <div className="animate-orbit-counter">
                <motion.div 
                  whileHover={{ scale: 1.12 }}
                  className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-slate-100 cursor-pointer relative hover:shadow-[0_15px_35px_rgba(27,107,55,0.35)] transition-all duration-300"
                >
                  {el.icon}

                  {/* Sleek Tooltip/Details card hovering above the element */}
                  <div className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 sm:w-56 bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-3.5 shadow-2xl transition-all duration-300 z-50 text-center transform translate-y-2 group-hover:translate-y-0 backdrop-blur-md">
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-emerald-500/30 rotate-45" />
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-heading italic">{el.title}</h5>
                    <p className="text-[10px] text-slate-300 leading-normal font-body">{el.description}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. CENTRAL WHITE CIRCLE CARD WITH SAVAXA LOGO */}
        <div className="relative z-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-[176px] md:h-[176px] bg-white rounded-full flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(27,107,55,0.18)] border-[3px] border-white cursor-pointer group"
          >
            {/* Glowing backdrop when hovered */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all duration-500" />
            
            <img 
              src="/savax-logo.png" 
              alt="Savaxa Logo" 
              className="w-[85%] h-auto object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.06)] relative z-10 transition-transform duration-500 group-hover:scale-103" 
            />
          </motion.div>
        </div>

        {/* 5. FLOATING GOLD SPARKLE CARD (Matching reference screenshot detail) */}
        <div className="absolute top-[58%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse pointer-events-none">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center border border-yellow-500/10 shadow-[0_4px_12px_rgba(234,179,8,0.12)]">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-500/60" />
          </div>
        </div>

        {/* 6. FAR RIGHT GREEN OUTLINE CIRCLE (Matching reference screenshot detail) */}
        <div className="absolute top-[52%] -right-[15%] translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full border border-emerald-600/35 pointer-events-none" />

      </div>
    </div>
  )
}
