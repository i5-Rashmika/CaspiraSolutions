'use client'
import { NavbarDemo } from "@/components/layout/nav";
import "./globals.css";
import { Inter } from 'next/font/google';
import Footer from "@/components/layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'keen-slider/keen-slider.min.css';
import SmoothScrollSetup from "@/components/animation/SmoothScrollSetup";
import CustomCursor from "@/components/CustomCursor";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import PageTransition from "@/components/animation/PageTransition";
import { LocaleProvider } from "@/context/LocaleContext";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({ children }) {
  useEffect(() => {
    // Refresh ScrollTrigger on route changes
    const handleRouteChange = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Listen for route changes (Next.js)
    window.addEventListener('popstate', handleRouteChange);

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-[#00010B] text-white overflow-x-hidden`} suppressHydrationWarning>
        <LocaleProvider>
          <PageTransition />
          <CustomCursor />
          <SmoothScrollSetup />
          <NavbarDemo />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
