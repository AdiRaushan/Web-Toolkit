import React from "react";
import { Star } from "lucide-react";

const MarqueeSection = ({ customBrand, theme }) => {
  if (!customBrand.marqueeItems) return null;

  return (
    <div className="bg-slate-900 border-y border-slate-800 overflow-hidden py-3 relative z-30">
      <div className="flex w-full whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-16 mx-8 items-center">
            {customBrand.marqueeItems.map((item, idx) => (
              <div
                key={`${i}-${idx}`}
                className="flex items-center gap-3 text-slate-300 font-bold uppercase tracking-[0.2em] text-xs"
              >
                <Star
                  size={14}
                  className={`${theme.text} drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
                />
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
