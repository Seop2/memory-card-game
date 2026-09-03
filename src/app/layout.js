import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Fredoka, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ['latin'],
  weight: ['500']
})

const nunito = Nunito({
  variable: "--font-body",
  subsets: ['latin'],
  weight: ['400', '700', '800']
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ['latin'],
  weight: ['400']
})

export const metadata = {
  title: "Memory Card Game",
  description: "The ultimate matching game for your brain!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${nunito.variable} ${jetbrainsMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
