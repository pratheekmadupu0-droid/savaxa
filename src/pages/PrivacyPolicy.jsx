import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="font-sans pt-32 pb-20 bg-slate-50 text-slate-800 min-h-screen">
      <SEO 
        title="Privacy Policy | SAVAXA Crop Care"
        description="Read the Privacy Policy of SAVAXA. Learn how we collect, use, and protect your information as a leading crop care and agriculture solutions provider."
        keywords="savaxa privacy policy, crop care india, agriculture data protection"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8 border-b pb-4">
          {t("Privacy Policy", "గోప్యతా విధానం")}
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-650 leading-relaxed font-light">
          <p>
            Welcome to SAVAXA's Privacy Policy page. Your privacy is critically important to us.
            This privacy policy document describes the types of personal information collected and recorded by SAVAXA and how we use it.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">Information We Collect</h2>
          <p>
            If you contact us directly or register as an authorized dealer, we may receive additional information about you such as your name, email address, phone number, physical address, business name, and license details.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, operate, and maintain our website and agricultural services.</li>
            <li>Improve, personalize, and expand our dealer platform and catalog.</li>
            <li>Understand and analyze how you use our agricultural product portal.</li>
            <li>Develop new crop care formulations, features, and agricultural benefits.</li>
            <li>Communicate with you for technical support, inquiries, or dealer onboarding.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">Cookies and Web Beacons</h2>
          <p>
            Like any other website, SAVAXA uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <strong>savaxacropcare2023@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
