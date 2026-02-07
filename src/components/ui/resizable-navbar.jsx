"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useTranslations } from "next-intl";

/* ===========================================================
   MAIN NAVBAR WRAPPER (Fix: Always on Top + Smooth Animate)
   =========================================================== */
export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth appear on page load
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-[10000] pointer-events-auto",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isScrolled })
          : child
      )}
    </motion.div>
  );
};

/* ===========================================================
   DESKTOP NAVBAR BODY (Smooth Collapse + Blur + Scale)
   =========================================================== */
export const NavBody = ({ children, className, isScrolled }) => {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      scale: isScrolled ? 0.92 : 1,
      padding: isScrolled ? "0.4rem 1.4rem" : "1rem 1.8rem",
      backgroundColor: isScrolled
        ? "rgba(15, 23, 42, 0.80)"
        : "rgba(255, 255, 255, 0)",
      backdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
      boxShadow: isScrolled
        ? "0 8px 35px rgba(0,0,0,0.15)"
        : "0 0 0 rgba(0,0,0,0)",
      duration: 0.35,
      ease: "power2.out",
    });
  }, [isScrolled]);

  return (
    <div
      ref={navRef}
      className={cn(
        "mx-auto hidden w-full max-w-7xl flex-row items-center justify-between rounded-full nav_bg transition-all duration-300 lg:flex",
        className
      )}
    >
      {children}
    </div>
  );
};

/* ===========================================================
   DESKTOP NAV ITEMS (Animated Hover Blob)
   =========================================================== */
export const NavItems = ({ items, className, onItemClick, isScrolled }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-row items-center space-x-2 text-base transition duration-200",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          key={idx}
          href={item.link}
          className="relative px-4 py-2"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 rounded-full bg-blue-500/20"
            />
          )}
          <span
            className={cn(
              "relative z-20 transition-colors duration-200",
              isScrolled
                ? "text-white/90 hover:text-blue-400"
                : "text-white hover:text-blue-300"
            )}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </motion.div>
  );
};

/* ===========================================================
   MOBILE NAV WRAPPER (Smooth Collapse)
   =========================================================== */
export const MobileNav = ({ children, className, isScrolled }) => {
  const mobileNavRef = useRef(null);

  useEffect(() => {
    gsap.to(mobileNavRef.current, {
      scale: isScrolled ? 0.96 : 1,
      backgroundColor: isScrolled
        ? "rgba(15, 23, 42, 0.85)"
        : "rgba(255,255,255,0)",
      backdropFilter: isScrolled ? "blur(14px)" : "blur(0px)",
      duration: 0.35,
      ease: "power2.out",
    });
  }, [isScrolled]);

  return (
    <div
      ref={mobileNavRef}
      className={cn(
        "w-full rounded-2xl px-4 py-4 lg:hidden nav_bg",
        className
      )}
    >
      {children}
    </div>
  );
};

/* ===========================================================
   MOBILE NAV HEADER (Logo + Toggle)
   =========================================================== */
export const MobileNavHeader = ({ children, className }) => {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      {children}
    </div>
  );
};

/* ===========================================================
   MOBILE NAV MENU (Animated Dropdown)
   =========================================================== */
export const MobileNavMenu = ({ children, isOpen, className }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "absolute inset-x-0 top-16 z-[9999] flex flex-col gap-4 rounded-lg bg-gray-900/95 px-4 py-6 backdrop-blur-lg shadow-xl border border-white/10",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ===========================================================
   MOBILE TOGGLE BUTTON
   =========================================================== */
export const MobileNavToggle = ({ isOpen, onClick, isScrolled }) => {
  return isOpen ? (
    <IconX
      onClick={onClick}
      className={cn(
        "transition duration-200",
        isScrolled ? "text-white" : "text-white"
      )}
    />
  ) : (
    <IconMenu2
      onClick={onClick}
      className={cn(
        "transition duration-200",
        isScrolled ? "text-white" : "text-white"
      )}
    />
  );
};

/* ===========================================================
   LOGO with Scale Animation
   =========================================================== */
export const NavbarLogo = ({ isScrolled }) => {
  const logoRef = useRef(null);
  const t = useTranslations("nav");

  useEffect(() => {
    gsap.to(logoRef.current, {
      scale: isScrolled ? 0.9 : 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [isScrolled]);

  return (
    <div ref={logoRef} className="flex items-center space-x-2">
      <img src="/images/png/logo.png" alt="logo" width={28} height={24} />
      <span
        className={cn(
          "font-medium transition-colors duration-200",
          isScrolled ? "text-white/90" : "text-white"
        )}
      >
        {t("brandName")}
      </span>
    </div>
  );
};

/* ===========================================================
   REUSABLE NAV BUTTON
   =========================================================== */
export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  isScrolled,
  variant = "primary",
  ...props
}) => {
  const btnRef = useRef(null);

  useEffect(() => {
    gsap.to(btnRef.current, {
      scale: isScrolled ? 0.92 : 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [isScrolled]);

  return (
    <Tag
      ref={btnRef}
      href={href}
      className={cn(
        "px-4 py-2 rounded-md text-base transition-all duration-200",
        variant === "primary"
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "border border-white/20 text-white hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export const FooterLogo = () => {
  const t = useTranslations("nav");
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <img
        src="/images/png/logo.png"
        alt="logo"
        width={36.32}
        height={32} />
      <span className="font-bold text-[26px] text-white">{t("brandName")}</span>
    </a>
  );
};