import SEO from '../components/SEO';
import { Scale } from 'lucide-react';

export default function Terms() {
  return (
    <div className="font-inter bg-[var(--color-brand-surface)] min-h-screen pt-32 pb-24 relative overflow-hidden">
      <SEO 
        title="Terms of Service | SAVAXA Crop Care"
        description="Review the Terms of Service governing the use of SAVAXA website, dealer portal, and crop protection catalogs."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white rounded-3xl border border-[var(--color-blue-100)] p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[var(--color-blue-100)]">
            <div className="w-14 h-14 bg-[var(--color-brand-surface)] rounded-2xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
              <Scale className="w-6 h-6 text-[var(--color-brand-primary)]" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Legal Document</p>
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[var(--color-brand-navy)]">
                Terms of Service
              </h1>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <p className="text-lg">
              By accessing the website at https://savaxa.in, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>

            <div className="space-y-4">
              <h2 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)]">Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the brochures or materials on SAVAXA's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)]">Disclaimer</h2>
              <p>
                The formulations, crop protection instructions, dosages, and effects listed on SAVAXA's platform are provided for informational and catalog purposes. Actual results may vary depending on local weather conditions, soil, crop varieties, and application methods. Farmers should consult an authorized crop care representative before applying large quantities.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)]">Limitation of Liability</h2>
              <p>
                In no event shall SAVAXA or its suppliers be liable for any damages arising out of the use or inability to use the agricultural products, crop care guides, or download manuals provided on the site.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[var(--color-blue-100)]">
              <h2 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)]">Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
