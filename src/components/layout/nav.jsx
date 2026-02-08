"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSelector from "../LanguageSelector";
import Link from "next/link";
import Button from "../common/Button";

export function NavbarDemo() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const isHome = pathname === "/";
    const navItems = useMemo(
        () => [
            { name: t("home"), link: "/" },
            { name: t("services"), link: isHome ? "#our-services" : "/#our-services" },
            { name: t("solutions"), link: isHome ? "#our-solutions" : "/#our-solutions" },
        ],
        [t, isHome]
    );

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeHash, setActiveHash] = useState("");

    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const leftLinksRef = useRef([]);
    const rightLinksRef = useRef([]);
    const mobileNavRef = useRef(null);

    /* eslint-disable react-hooks/refs -- 需在 render 中清空 ref 供 callback 重新收集 */
    leftLinksRef.current = [];
    rightLinksRef.current = [];
    /* eslint-enable react-hooks/refs */

    const addLeftLink = (el) => {
        if (el && !leftLinksRef.current.includes(el)) {
            leftLinksRef.current.push(el);
        }
    };

    const addRightLink = (el) => {
        if (el && !rightLinksRef.current.includes(el)) {
            rightLinksRef.current.push(el);
        }
    };

    // Initial navbar animation（桌面端）：确保结束时为可见，避免刷新后仍为 opacity:0
    useEffect(() => {
        const el = navbarRef.current;
        const logo = logoRef.current;
        const left = leftLinksRef.current;
        const right = rightLinksRef.current;
        if (!el) return;

        const tl = gsap.timeline({ delay: 0.1 });
        tl.fromTo(el, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        if (logo) {
            tl.fromTo(logo, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4");
        }
        if (left?.length) {
            tl.fromTo(left, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, "-=0.3");
        }
        if (right?.length) {
            tl.fromTo(right, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, "-=0.4");
        }
        tl.set([el, logo, left, right].flat().filter(Boolean), { clearProps: "opacity,y" });
    }, []);

    // Sync active hash for current-page highlight (optional, subtle)
    useEffect(() => {
        const hash = (typeof window !== "undefined" && window.location.hash) || "";
        setActiveHash(hash.replace(/^#/, ""));
        const onHashChange = () => {
            const h = (window.location.hash || "").replace(/^#/, "");
            setActiveHash(h);
        };
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, [pathname]);

    // Scroll shrink effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animate Navbar on Scroll
    useEffect(() => {
        if (!navbarRef.current) return;

        gsap.to(navbarRef.current, {
            padding: isScrolled ? "0.5rem 1.5rem" : "1rem 1.5rem",
            scale: isScrolled ? 0.95 : 1,
            backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
            backgroundColor: isScrolled ? "rgba(15, 23, 42, 0.95)" : "transparent",
            boxShadow: isScrolled
                ? "0 4px 20px rgba(0, 0, 0, 0.15)"
                : "none",
            duration: 0.4,
            ease: "power2.out",
        });
    }, [isScrolled]);

    // Mobile navbar shrink animation
    useEffect(() => {
        if (!mobileNavRef.current) return;

        gsap.to(mobileNavRef.current, {
            padding: isScrolled ? "0.75rem 1rem" : "1rem 1rem",
            scale: isScrolled ? 0.95 : 1,
            backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
            backgroundColor: isScrolled ? "rgba(15, 23, 42, 0.95)" : "transparent",
            duration: 0.4,
            ease: "power2.out",
        });
    }, [isScrolled]);

    const NavbarLogo = () => (
        <Link
            ref={logoRef}
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
        >
            <img
                src="/images/png/logo.png"
                alt="logo"
                width={27.24}
                height={24}
            />
            <span
                className={cn(
                    "font-medium transition-colors duration-300",
                    isScrolled ? "text-white/90" : "text-white"
                )}
            >
                {t("brandName")}
            </span>
        </Link>
    );

    const NavbarButton = ({ children, variant = "primary", ...props }) => (
        <button
            ref={addRightLink}
            className={cn(
                "px-4 py-2 rounded-md text-base font-normal relative cursor-pointer inline-block text-center transition-all duration-300",
                variant === "primary"
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-transparent text-white hover:text-blue-400"
            )}
            {...props}
        >
            {children}
        </button>
    );

    return (
        <div className="relative w-full">
            {/* Desktop Navbar - lg 以上显示，默认可见避免刷新后不显示 */}
            <div className="fixed inset-x-0 top-12 z-[10000] hidden lg:block" style={{ opacity: 1 }}>
                <div
                    ref={navbarRef}
                    className={cn(
                        "relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between rounded-full px-6 py-4 nav_bg transition-all duration-300"
                    )}
                    style={{ opacity: 1 }}
                >
                    {/* Left: Nav Items */}
                    <div className="flex items-center space-x-9">
                        {navItems.map((item, idx) => {
                            const linkHash = item.link.replace(/^[^#]*#/, "");
                            const isActive = isHome && linkHash && activeHash === linkHash;
                            return (
                            <Link
                                key={`link-${idx}`}
                                href={item.link}
                                ref={addLeftLink}
                                className={cn(
                                    "relative overflow-hidden group",
                                    isScrolled ? "text-white hover:text-[#3B82F6]" : "text-white hover:text-[#3B82F6]",
                                    isActive && "text-white/95 underline decoration-white/50 underline-offset-4 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                )}
                            >
                                <div className="relative overflow-hidden leading-[1.1]">
                                    <span className="block transition-all duration-500 ease-out group-hover:-translate-y-full pt-[.2em] text-[.875em]">
                                        {item.name}
                                    </span>

                                    <span className="block absolute left-0 top-0 translate-y-full transition-all duration-500 ease-out group-hover:translate-y-0 pt-[.2em] text-[.875em]">
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                            );
                        })}
                    </div>

                    {/* Center: Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <NavbarLogo />
                    </div>

                    {/* Right: Language, CTA only */}
                    <div className="flex items-center gap-4">
                        <div ref={addRightLink}>
                            <LanguageSelector />
                        </div>
                        <div ref={addRightLink}>
                            <Button href={isHome ? "#contact" : "/#contact"} title={t("contactUs")} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="fixed inset-x-0 top-5 z-[10000] lg:hidden">
                <div
                    ref={mobileNavRef}
                    className="relative z-50 mx-auto flex w-[90%] items-center justify-between bg-transparent px-4 py-4 rounded-2xl nav_bg transition-all duration-300"
                >
                    <NavbarLogo />

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "p-2 transition-colors duration-300",
                            isScrolled ? "text-white/90" : "text-white"
                        )}
                    >
                        {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                    </button>

                    {isMobileMenuOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/10 px-4 py-6">
                            <div className="flex flex-col space-y-4">
                                {navItems.map((item, idx) => (
                                    <a
                                        key={`mobile-link-${idx}`}
                                        href={item.link}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                <div className="mt-4">
                                    <Button
                                        href={isHome ? "#contact" : "/#contact"}
                                        title={t("contactUs")}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="h-20 lg:h-24"></div>
        </div>
    );
}