import React from "react";
import { Phone, MapPin, Monitor, Clock, ArrowRight } from "lucide-react";

const ContactSection = ({ customBrand, theme }) => {
  return (
    <div className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
          >
            <Phone size={14} />
            Get In Touch
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Let's <span className={theme.text}>Connect</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions? Ready to get started? Reach out and our team will
            respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form — Left Side */}
          <div className="lg:col-span-3">
            <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                Fill in your details and we'll get back to you promptly.
              </p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:${theme.border} transition-all placeholder:text-slate-400`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:${theme.border} transition-all placeholder:text-slate-400`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:${theme.border} transition-all placeholder:text-slate-400`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Tell us about your needs..."
                    rows={4}
                    className={`w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:${theme.border} transition-all resize-none placeholder:text-slate-400`}
                  ></textarea>
                </div>
                <button
                  className={`w-full ${theme.bg} text-white font-bold py-4 rounded-xl uppercase tracking-wider text-sm hover:scale-[1.01] hover:shadow-xl transition-all shadow-lg ${theme.shadow} flex items-center justify-center gap-2`}
                >
                  <ArrowRight size={18} />
                  Send Message
                </button>
                <p className="text-center text-slate-400 text-[11px]">
                  🔒 Your information is 100% secure and will never be shared.
                </p>
              </form>
            </div>
          </div>

          {/* Contact Info — Right Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6">
              <h4 className="text-lg font-bold">Contact Information</h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${theme.shadow}`}
                  >
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <p className="text-white font-bold text-lg">
                      {customBrand.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${theme.shadow}`}
                  >
                    <Monitor size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p className="text-white font-semibold">
                      {customBrand.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${theme.shadow}`}
                  >
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Address
                    </p>
                    <p className="text-slate-300 font-medium leading-relaxed">
                      {customBrand.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div
              className={`${theme.lightBg} rounded-3xl p-8 border ${theme.lightBorder}`}
            >
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={18} className={theme.text} />
                Business Hours
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Mon — Fri</span>
                  <span className="font-bold text-slate-900">
                    9:00 AM — 7:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Saturday</span>
                  <span className="font-bold text-slate-900">
                    10:00 AM — 5:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Sunday</span>
                  <span className={`font-bold ${theme.text}`}>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
