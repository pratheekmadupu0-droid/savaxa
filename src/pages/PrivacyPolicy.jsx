import SEO from '../components/SEO';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="font-inter bg-[var(--color-brand-surface)] min-h-screen pt-32 pb-24 relative overflow-hidden">
      <SEO 
        title="Privacy Policy | SAVAXA Crop Care"
        description="Read the Privacy Policy of SAVAXA. Learn how we collect, use, and protect your information as a leading crop care and agriculture solutions provider."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white rounded-3xl border border-[var(--color-blue-100)] p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[var(--color-blue-100)]">
            <div className="w-14 h-14 bg-[var(--color-brand-surface)] rounded-2xl flex items-center justify-center shrink-0 border border-[var(--color-blue-100)]">
              <ShieldCheck className="w-6 h-6 text-[var(--color-brand-primary)]" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Legal Document</p>
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[var(--color-brand-navy)]">
                Privacy Policy
              </h1>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <p className="text-lg">
              Welcome to SAVAXA's Privacy Policy page. Your privacy is critically important to us.
              This privacy policy document describes the types of personal information collected and recorded by SAVAXA and how we use it.
            </p>

            <div className="space-y-4">
              <h2 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)]">Information We Collect</h2>
              <p>
                If you contact us directly or register as an authorized dealer, we may receive additional information about you such as your name, email address, phone number, physical address, business name, and license details.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)]">How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-[var(--color-brand-primary)]">
                <li>Provide, operate, and maintain our website and agricultural services.</li>
                <li>Improve, personalize, and expand our dealer platform and catalog.</li>
                <li>Understand and analyze how you use our agricultural product portal.</li>
                <li>Develop new crop care formulations, features, and agricultural benefits.</li>
                <li>Communicate with you for technical support, inquiries, or dealer onboarding.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)]">Cookies and Web Beacons</h2>
              <p>
                Like any other website, SAVAXA uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[var(--color-blue-100)]">
              <h2 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)]">Contact Us</h2>
              <p>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:savaxacropcare2023@gmail.com" className="text-[var(--color-brand-primary)] font-bold hover:underline">savaxacropcare2023@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
