import Header from "@/components/header";
import Footer from "@/components/footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  variable: "--font-google",
  subsets: ['latin'],
  weight: ['400', '700', '800']
})

export const metadata = {
  title: "메모리 카드 게임",
  description: "두뇌를 위한 궁극의 매칭 게임!",
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
