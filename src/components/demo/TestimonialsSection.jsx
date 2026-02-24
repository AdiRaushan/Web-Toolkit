import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = ({ sectionDesigns, theme }) => {
  const variant = sectionDesigns.testimonials;
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Achieved 8.5 Band",
      text: "The personalized attention I received was incredible. The mock tests were exactly like the real exam. Highly recommended!",
      image: "https://i.pravatar.cc/150?u=rohit",
    },
    {
      name: "Priya Patel",
      role: "PTE 79+ Score",
      text: "I was struggling with my speaking section, but the expert tips and daily practice drills changed everything for me.",
      image: "https://i.pravatar.cc/150?u=priya",
    },
    {
      name: "Saurabh Gill",
      role: "Cambridge Graduate",
      text: "Great mentors and excellent study material. The atmosphere is very professional and encouraging for students.",
      image: "https://i.pravatar.cc/150?u=saurabh",
    },
  ];

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setActiveSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <div
      className={`py-24 relative overflow-hidden ${variant === "dark_immersive" ? "bg-slate-900 text-white" : "bg-white"}`}
      id="reviews"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
          >
            <Star size={14} className="fill-current" /> Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Hear From Our Achievers
          </h2>
        </div>

        {/* ── Variant: classic ── */}
        {(variant === "classic" || !variant) && (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-lg italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    className="w-12 h-12 rounded-full object-cover shadow-md"
                    alt={t.name}
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Variant: slider ── */}
        {variant === "slider" && (
          <div className="max-w-4xl mx-auto relative px-12">
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 flex"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="min-w-full text-center px-4">
                    <Quote
                      className={`mx-auto mb-8 ${theme.text} opacity-20`}
                      size={80}
                    />
                    <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed mb-10 italic">
                      "{t.text}"
                    </p>
                    <img
                      src={t.image}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-xl"
                      alt={t.name}
                    />
                    <h4 className="text-xl font-bold text-slate-900">
                      {t.name}
                    </h4>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* ── Variant: dark_immersive ── */}
        {variant === "dark_immersive" && (
          <div className="grid lg:grid-cols-2 gap-16 items-center bg-slate-800 rounded-[3rem] p-12 lg:p-24 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <Quote className="text-indigo-400 opacity-30 mb-8" size={60} />
              <p className="text-3xl font-medium leading-relaxed mb-12">
                The training quality here is{" "}
                <span className="text-indigo-400">unmatched</span>. They don't
                just teach the syllabus, they teach you how to think and excel
                under pressure.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-700 p-1">
                  <img
                    src={testimonials[0].image}
                    className="w-full h-full rounded-full object-cover"
                    alt="Student"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Harsh Vardhan</h4>
                  <p className="text-indigo-400 text-sm font-bold">
                    University of Toronto '24
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {testimonials.concat(testimonials[0]).map((t, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-3xl ${i % 2 === 0 ? "bg-slate-900" : "bg-slate-700"}`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-3">
                    "{t.text}"
                  </p>
                  <h5 className="font-bold text-sm">{t.name}</h5>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsSection;
