import React from "react";
import {
  Phone,
  MapPin,
  Monitor,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";

const FooterSection = ({ customBrand, theme }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-24 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl font-black text-white">
                {customBrand.logoText}
                <span className={theme.text}>{customBrand.logoSpan}</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-8 font-medium">
              We provide world-class coaching to help students achieve their
              academic and career goals across the globe.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Quick Links
            </h4>
            <ul className="space-y-4 font-bold text-sm">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Career Guidance",
                "Student Portal",
                "Success Stories",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Programs */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Programs
            </h4>
            <ul className="space-y-4 font-bold text-sm">
              {[
                "IELTS Regular",
                "PTE Academic",
                "Spoken English",
                "TOEFL iBT",
                "Duolingo Test",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors underline decoration-slate-800 underline-offset-4"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Newsletter
            </h4>
            <div className="flex gap-2 mb-8">
              <input
                type="email"
                placeholder="email@example.com"
                className="bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-500 w-full outline-none"
              />
              <button
                className={`${theme.bg} text-white p-3 rounded-lg hover:opacity-90 transition-opacity`}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex gap-4">
                <Phone size={18} className={theme.text} />
                <span>{customBrand.phone}</span>
              </div>
              <div className="flex gap-4">
                <Monitor size={18} className={theme.text} />
                <span>{customBrand.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <div>© 2024 {customBrand.logoText}. All rights reserved.</div>
          <div className="mt-4 md:mt-0">Designed for Excellence</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
