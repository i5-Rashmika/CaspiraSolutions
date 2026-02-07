"use client";
import gsap from "gsap";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
    const pathname = usePathname();

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(".transition-overlay", {
            y: "0%",
            duration: 0.5,
            ease: "power3.inOut",
        });

        tl.to(".transition-overlay", {
            y: "-100%",
            duration: 0.6,
            ease: "power3.inOut",
        });
    }, [pathname]);

    return (
        <div
            className="transition-overlay fixed top-0 left-0 w-full h-full bg-black z-[9999] translate-y-full pointer-events-none"
            aria-hidden="true"
        ></div>
    );
}
