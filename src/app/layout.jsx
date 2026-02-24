import "../index.css";
import {
  Inter,
  Poppins,
  Montserrat,
  Lato,
  Roboto,
  Playfair_Display,
  Source_Sans_3,
  Cormorant_Garamond,
  Oswald,
  Outfit,
  DM_Sans,
  Open_Sans,
} from "next/font/google";
import AppNavbar from "../components/layout/AppNavbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-poppins",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-roboto",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cormorant",
});
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "WebToolkit - Creator Studio",
  description:
    "Build premium website templates and run website audits in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${lato.variable} ${roboto.variable} ${playfair.variable} ${sourceSans.variable} ${cormorant.variable} ${oswald.variable} ${outfit.variable} ${dmSans.variable} ${openSans.variable} antialiased`}
      >
        {/* Global Navbar */}
        <AppNavbar />
        {children}
      </body>
    </html>
  );
}
