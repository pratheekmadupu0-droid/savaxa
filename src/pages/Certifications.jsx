import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { ShieldCheck, Award, Leaf, FlaskConical, FileCheck2, BadgeCheck } from 'lucide-react'

export default function Certifications() {

  const certificationsList = [
    {
      title: "CIB&RC Registration Certificate",
      authority: "Central Insecticides Board & Registration Committee",
      desc: "Federal certification from the Ministry of Agriculture (Govt of India), validating high knockdown insect efficacy, dosage standards, and crop safety parameters for Savaxa products.",
      code: "CIB-RC-REG-SAV-2024",
      icon: <ShieldCheck className="w-8 h-8 text-[var(--color-brand-primary)]" />
    },
    {
      title: "ISO 9001:2015 Certification",
      authority: "International Quality Management Systems Audits",
      desc: "Certified Quality Management Systems mapping raw material chemical assays, state-of-the-art reactor blending, and premium double-sealed packaging stability.",
      code: "QMS-9001-SAV-TG-2025",
      icon: <Award className="w-8 h-8 text-[var(--color-brand-primary)]" />
    },
    {
      title: "ISO 14001:2015 Certification",
      authority: "Environmental Safety Audit Bureau",
      desc: "Verifies strict ecological system parameters. Savaxa plants operate with low-emission pathways, secure chemical containment facilities, and organic zero soil residue standards.",
      code: "EMS-14001-SAV-2025",
      icon: <Leaf className="w-8 h-8 text-[var(--color-brand-primary)]" />
    },
    {
      title: "Bio-Safety & Seed Licensing",
      authority: "Department of Agriculture, Govt of Telangana",
      desc: "Retail distribution and commercial manufacturing licensing authorizing Savaxa to distribute high-grade pesticides and bio-stimulants safely across India.",
      code: "AGRI-LIC-TG-540-SEC",
      icon: <FlaskConical className="w-8 h-8 text-[var(--color-brand-primary)]" />
    }
  ]

  return (
    <div className="font-inter bg-[var(--color-brand-surface)] min-h-screen pt-32 pb-24">
      <SEO 
        title="Certifications | SAVAXA Crop Care"
        description="View Savaxa's quality control certifications, ISO standards, and federal environmental approvals."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[var(--color-brand-navy)] uppercase tracking-tight">
            Certifications
          </h1>
          <div className="w-24 h-1.5 bg-[var(--color-brand-primary)] mx-auto mt-6 rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Savaxa chemical synthesis plants and laboratories operate under audited quality control certifications and federal environmental approvals.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsList.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-[var(--color-blue-100)] rounded-3xl p-8 flex flex-col justify-between space-y-6 group hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-primary)]/5 rounded-full blur-3xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-surface)] border border-[var(--color-blue-100)] flex items-center justify-center">
                  {cert.icon}
                </div>
                <div>
                  <span className="text-[10px] text-[var(--color-brand-primary)] font-bold uppercase tracking-widest block mb-2">{cert.authority}</span>
                  <h3 className="text-2xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </div>

              {/* Footer Code */}
              <div className="flex justify-between items-center pt-6 border-t border-[var(--color-blue-100)] relative z-10">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certification Code</span>
                </div>
                <span className="bg-[var(--color-brand-surface)] text-[var(--color-brand-navy)] text-xs font-bold px-3 py-1.5 rounded-lg border border-[var(--color-blue-100)] flex items-center gap-1.5">
                  <BadgeCheck className="w-3 h-3 text-[var(--color-brand-primary)]" /> {cert.code}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
