import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Terms() {
  const { t } = useLanguage();

  return (
    <div className="font-sans pt-32 pb-20 bg-slate-50 text-slate-800 min-h-screen">
      <SEO 
        title="Terms of Service | SAVAXA Crop Care"
        description="Review the Terms of Service governing the use of SAVAXA website, dealer portal, and crop protection catalogs."
        keywords="savaxa terms of service, crop protection india, agriculture business guidelines"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8 border-b pb-4">
          {t("Terms of Service", "సేవా నిబంధనలు")}
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-650 leading-relaxed font-light">
          <p>
            By accessing the website at https://savaxa.in, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the brochures or materials on SAVAXA's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">Disclaimer</h2>
          <p>
            The formulations, crop protection instructions, dosages, and effects listed on SAVAXA's platform are provided for informational and catalog purposes. Actual results may vary depending on local weather conditions, soil, crop varieties, and application methods. Farmers should consult an authorized crop care representative before applying large quantities.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">Limitation of Liability</h2>
          <p>
            In no event shall SAVAXA or its suppliers be liable for any damages arising out of the use or inability to use the agricultural products, crop care guides, or download manuals provided on the site.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
          </p>
        </div>
      </div>
    </div>
  );
}
