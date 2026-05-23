import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { FileText, Download, FolderArchive, ShieldAlert, BookOpen, Layers } from 'lucide-react'

export default function Downloads() {

  const downloadItems = [
    {
      title: "Savaxa Product Catalog 2026",
      desc: "Full product catalog containing crop protection specs, host crops, and dosage matrices.",
      size: "8.4 MB",
      type: "Product Brochure (PDF)",
      icon: <BookOpen className="w-8 h-8 text-[var(--color-brand-primary)]" />,
      color: "blue"
    },
    {
      title: "Shield-Ultra Safety SDS Sheet",
      desc: "Material Safety Data Sheet (MSDS) guidelines, toxicology classification, and antidote directions.",
      size: "1.2 MB",
      type: "Safety SDS Document (PDF)",
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
      color: "red"
    },
    {
      title: "Bollgard-Zap SDS Document",
      desc: "Occupational safety standards, protective suit requirements, and water body safety bounds.",
      size: "1.1 MB",
      type: "Safety SDS Document (PDF)",
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
      color: "red"
    },
    {
      title: "Vanquish-X Weed Spray SDS Sheet",
      desc: "Post-emergent herbicide spraying intervals, soil degradation charts, and standing water safety.",
      size: "1.5 MB",
      type: "Safety SDS Document (PDF)",
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
      color: "red"
    },
    {
      title: "Organic Bio-Inoculants Manual",
      desc: "Application guide for BioRoot Protect Trichoderma spores in vegetable nurseries.",
      size: "4.2 MB",
      type: "Agronomy Handbook (PDF)",
      icon: <FileText className="w-8 h-8 text-[var(--color-brand-primary)]" />,
      color: "blue"
    },
    {
      title: "Full Agronomy Safety Pack",
      desc: "All safety sheets and dosage manuals packaged in a convenient digital ZIP folder.",
      size: "14.8 MB",
      type: "System Bundle (ZIP)",
      icon: <FolderArchive className="w-8 h-8 text-[var(--color-brand-accent)]" />,
      color: "cyan"
    }
  ]

  return (
    <div className="font-inter bg-[var(--color-brand-surface)] min-h-screen pt-32 pb-24">
      <SEO 
        title="Download Center | SAVAXA Crop Care"
        description="Access secure downloads of our pesticide safety data sheets (SDS), dosage charts, and full agronomist handbooks."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
            Download Center
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Access secure downloads of our pesticide safety data sheets (SDS), dosage charts, and full agronomist handbooks.
          </p>
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloadItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-[var(--color-blue-100)] rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-surface)] rounded-full blur-3xl" />
              
              <div className="space-y-6 relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                  item.color === 'red' ? 'bg-red-50 border-red-100' :
                  item.color === 'cyan' ? 'bg-cyan-50 border-cyan-100' :
                  'bg-[var(--color-brand-surface)] border-[var(--color-blue-100)]'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2">{item.type}</span>
                  <h3 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Download Action */}
              <div className="flex justify-between items-center pt-6 border-t border-[var(--color-blue-100)] relative z-10">
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                  <Layers className="w-4 h-4" /> {item.size}
                </span>
                <button className="flex items-center gap-2 bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-[var(--color-blue-100)]">
                  Download <Download className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
