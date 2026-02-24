import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = ({ sectionDesigns, customBrand, theme }) => {
  const variant = sectionDesigns.faq;
  const [openIndex, setOpenIndex] = useState(0);

  const defaultFaqs = [
    {
      q: "How long does it take to see significant improvement?",
      a: "Most students see a noticeable improvement in their scores within 3-4 weeks of consistent training with our methodology.",
    },
    {
      q: "Do you provide one-on-one sessions for speaking/writing?",
      a: "Yes, our premium plans include daily one-on-one feedback sessions specifically for speaking and writing tasks.",
    },
    {
      q: "Is the study material updated for the latest exam patterns?",
      a: "Absolutely. We update our material bank every month to ensure students are practicing with the most relevant content.",
    },
    {
      q: "Can I attend demo sessions before joining?",
      a: "We offer a free diagnostic test and a demo class so you can experience our teaching quality firsthand before enrolling.",
    },
  ];

  const faqs = customBrand.faqs || defaultFaqs;

  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
          >
            <HelpCircle size={14} /> Got Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Frequently Asked
          </h2>
        </div>

        {/* ── Variant: classic ── */}
        {(variant === "classic" || !variant) && (
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                >
                  <span className="text-lg font-bold text-slate-800">
                    {faq.q}
                  </span>
                  <div
                    className={`flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  >
                    <ChevronDown size={20} className={theme.text} />
                  </div>
                </button>
                <div
                  className={`px-8 transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-60 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Variant: minimal ── */}
        {variant === "minimal" && (
          <div className="divide-y divide-slate-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span
                    className={`text-xl font-bold transition-colors ${openIndex === i ? theme.text : "text-slate-800"}`}
                  >
                    {faq.q}
                  </span>
                  {openIndex === i ? (
                    <Minus size={20} className={theme.text} />
                  ) : (
                    <Plus
                      size={20}
                      className="text-slate-400 group-hover:text-slate-900"
                    />
                  )}
                </button>
                {openIndex === i && (
                  <div className="mt-4 animate-fadeIn">
                    <p className="text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Variant: side_by_side ── */}
        {variant === "side_by_side" && (
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all"
              >
                <h4 className="text-lg font-black text-slate-900 mb-4 flex gap-3">
                  <span className={theme.text}>Q.</span> {faq.q}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  <span className="font-bold text-slate-400 mr-2">A.</span>{" "}
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQSection;
