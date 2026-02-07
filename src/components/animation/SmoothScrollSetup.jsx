"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollSetup() {
    const pathname = usePathname();
    const lenisRef = useRef(null);
    const rafRef = useRef(null);

    // Initialize Lenis
    useEffect(() => {
        // Destroy existing instance if it exists
        if (window.innerWidth < 767) return;
        if (lenisRef.current) {
            lenisRef.current.destroy();
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        }

        // Create new Lenis instance
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoResize: true,
        });

        lenisRef.current = lenis;

        // Make lenis globally accessible
        window.lenis = lenis;

        // Animation loop
        function raf(time) {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);

        // Cleanup
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            lenis.destroy();
            delete window.lenis;
        };
    }, []);

    // Handle route changes
    useLayoutEffect(() => {
        // Immediate scroll reset on route change
        if (lenisRef.current) {
            // Stop any ongoing animations
            lenisRef.current.stop();

            // Force immediate scroll to top
            lenisRef.current.scrollTo(0, {
                immediate: true,
                force: true,
                lock: true,
                onComplete: () => {
                    // Re-enable smooth scrolling
                    lenisRef.current?.start();
                },
            });
        }

        // Also reset native scroll as fallback
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [pathname]);

    return null;
}