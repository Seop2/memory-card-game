import "./globals.css";


export const metadata = {
  title: "메모리 카드 게임",
  description: "두뇌를 위한 궁극의 매칭 게임!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
