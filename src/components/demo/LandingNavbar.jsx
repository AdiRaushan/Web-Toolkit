import React from "react";
import { Phone, MapPin, Monitor, Menu, X, Star } from "lucide-react";

const LandingNavbar = ({
  customBrand,
  theme,
  isMenuOpen,
  setIsMenuOpen,
  activeBrandId,
}) => {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 transform
      ${
        customBrand.navbarStyle === "dark"
          ? "bg-slate-900 text-white border-b border-slate-800"
          : customBrand.navbarStyle === "transparent"
            ? "bg-transparent text-white pt-4"
            : customBrand.navbarStyle === "floating"
              ? "top-6 w-[90%] left-1/2 -translate-x-1/2 max-w-7xl rounded-full shadow-2xl bg-white/90 backdrop-blur-md border border-slate-200/50"
              : customBrand.navbarStyle === "glass"
                ? "bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm"
                : customBrand.navbarStyle === "gradient"
                  ? `bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg`
                  : customBrand.navbarStyle === "borderless"
                    ? "bg-white"
                    : "bg-white shadow-md border-b " + theme.lightBorder
      }`}
    >
      {/* Top Info Bar */}
      {(customBrand.navbarStyle === "standard" ||
        customBrand.navbarStyle === "dark") && (
        <div
          className={`${customBrand.navbarStyle === "dark" ? "bg-slate-950 text-slate-400" : "bg-slate-900 text-white"} text-xs py-2 px-4 hidden md:flex justify-between items-center transition-colors`}
        >
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone size={14} className={theme.text} /> {customBrand.phone}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className={theme.text} /> {customBrand.address}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Monitor size={14} className={theme.text} /> {customBrand.email}
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center ${customBrand.navbarStyle === "stack" ? "flex-col h-auto py-4 gap-4" : "h-20"}`}
        >
          {/* Logo Area */}
          <div
            className={`flex-shrink-0 flex items-center gap-3 cursor-pointer group z-20 ${customBrand.navbarStyle === "centered" ? "absolute left-1/2 -translate-x-1/2" : ""}`}
          >
            <div
              className={`flex flex-col ${customBrand.navbarStyle === "centered" || customBrand.navbarStyle === "stack" ? "items-center text-center" : ""}`}
            >
              <span
                className={`text-2xl font-black tracking-tight leading-none transition-colors
                  ${["dark", "transparent", "gradient"].includes(customBrand.navbarStyle) ? "text-white" : "text-slate-900"}
                  group-hover:${customBrand.navbarStyle === "gradient" ? "text-white/80" : theme.text}`}
              >
                {customBrand.logoText}
                <span
                  className={
                    ["dark", "transparent", "gradient"].includes(
                      customBrand.navbarStyle,
                    )
                      ? "text-white/80"
                      : theme.text
                  }
                >
                  {customBrand.logoSpan}
                </span>
              </span>
              {customBrand.navbarStyle !== "minimal" &&
                customBrand.navbarStyle !== "floating" && (
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${["dark", "transparent", "gradient"].includes(customBrand.navbarStyle) ? "text-slate-300" : "text-slate-500"}`}
                  >
                    {customBrand.tagline}
                  </span>
                )}
            </div>
          </div>

          {/* Desktop Menu */}
          <div
            className={`hidden lg:flex items-center space-x-6 ${customBrand.navbarStyle === "centered" ? "order-1" : ""} ${customBrand.navbarStyle === "stack" ? "w-full justify-center border-t border-slate-100 pt-4" : ""}`}
          >
            {[
              "Home",
              "Services",
              "About",
              "Reviews",
              "Trainers",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`text-sm font-bold uppercase tracking-tight transition-colors hover:scale-105 transform
                     ${
                       ["dark", "transparent", "gradient"].includes(
                         customBrand.navbarStyle,
                       )
                         ? "text-slate-200 hover:text-white"
                         : `text-slate-700 hover:${theme.text}`
                     }
                  `}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={`hidden md:flex items-center ${customBrand.navbarStyle === "centered" ? "order-3" : ""}`}
          >
            <button
              className={`${theme.bg} text-white px-5 py-2 rounded shadow-lg ${theme.shadow} hover:opacity-90 hover:-translate-y-0.5 transition-all transform flex items-center gap-2 uppercase text-xs font-bold tracking-wider`}
            >
              Book Now
            </button>
          </div>

          {/* Mobile Dropdown */}
          <div
            className={`lg:hidden ${customBrand.navbarStyle === "centered" ? "absolute left-4" : ""}`}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${["dark", "transparent", "gradient"].includes(customBrand.navbarStyle) ? "text-white" : "text-slate-900"} p-2 hover:bg-white/10 rounded transition`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t absolute w-full shadow-xl z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {[
              "Home",
              "About Us",
              "Services",
              "Study Material",
              "Blog",
              "Study Abroad",
              "Contact Us",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className={`block px-4 py-3 text-base font-bold text-slate-800 hover:${theme.lightBg} hover:${theme.text} rounded transition-colors uppercase`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
