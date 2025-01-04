import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const font = Instrument_Sans({
  weights: [400],
  subsets: ["latin"],
});

export const metadata = {
  title: "LeetCode daily progress",
  description: "Track your daily progress on LeetCode",
  keywords: ["LeetCode", "daily progress", "coding"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
