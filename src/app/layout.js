import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  variable: "--font-google",
  subsets: ['latin'],
  weight: ['400', '700', '800']
})

export const metadata = {
  title: "Memory Card Game",
  description: "The ultimate matching game for your brain!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
