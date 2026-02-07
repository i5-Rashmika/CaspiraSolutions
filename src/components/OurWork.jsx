"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SubParagraph from "./common/SubParagraph";
import PortfolioSection from "./AnimatedPortfolio";
import Image from "next/image";
import GradientText from "./common/GradientText";
import TextAnimation from "./animation/TextAnimation";
import { Spotlight } from "./ui/spotlight";

gsap.registerPlugin(ScrollTrigger);

const OurWork = () => {
    const sectionRef = useRef(null);
    const spotlightRef = useRef(null);
    const titleRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        queueMicrotask(() => setIsMounted(true));

        // Force visibility
        setTimeout(() => {
            if (sectionRef.current) {
                sectionRef.current.style.opacity = '1';
                sectionRef.current.style.visibility = 'visible';
            }
        }, 100);
    }, []);

    // Spotlight animation
    useEffect(() => {
        if (!spotlightRef.current || !sectionRef.current || !isMounted) return;

        const ctx = gsap.context(() => {
            // Set initial state
            gsap.set(spotlightRef.current, { opacity: 1 });

            gsap.fromTo(
                spotlightRef.current,
                { opacity: 0, y: 120, scale: 0.85 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 50%",
                        toggleActions: "play reverse play reverse",
                        markers: false,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isMounted]);

    // Refresh ScrollTrigger
    useEffect(() => {
        if (!isMounted) return;

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);

        return () => clearTimeout(timer);
    }, [isMounted]);

    // If not mounted, show basic content
    if (!isMounted) {
        return (
            <div id="selected-projects" ref={sectionRef} className="my-35 relative" style={{ opacity: 1, visibility: 'visible' }}>
                <div ref={spotlightRef} className="h-[700px] w-[138%] lg:w-[110%] absolute top-0 left-0">
                    <Spotlight
                        className="-top-40 left-0 md:-top-20 md:left-60 absolute pointer-events-none"
                        fill="url(#spotlightGradient)"
                    />
                </div>

                <Image
                    src={"/images/png/serviceellipse.png"}
                    alt="service"
                    height={555}
                    width={653}
                    className="absolute right-0 top-100"
                />

                <GradientText
                    text="Selected Projects"
                    className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-60"
                />

                <h2
                    ref={titleRef}
                    className="text-[#FFFFFFE5] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font_mmr text-center mt-16"
                >
                    Selected Projects
                </h2>

                <SubParagraph title="A curated selection of interface, system, and design projects across different domains." />

                <PortfolioSection />
            </div>
        );
    }

    return (
        <div id="selected-projects" ref={sectionRef} className="my-35 relative" style={{ opacity: 1, visibility: 'visible' }}>
            <div ref={spotlightRef} className="h-[700px] w-[138%] lg:w-[110%] absolute top-0 left-0">
                <Spotlight
                    className="-top-40 left-0 md:-top-20 md:left-60 absolute pointer-events-none"
                    fill="url(#spotlightGradient)"
                />
            </div>

            <Image
                src={"/images/png/serviceellipse.png"}
                alt="service"
                height={555}
                width={653}
                className="absolute right-0 top-100"
            />

            <GradientText
                text="Selected Projects"
                className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-60"
            />

            {/* Fixed TextAnimation with proper props */}
            <TextAnimation
                delay={0.2}
                animateOnScroll={true}
                trigger={sectionRef}
            >
                <h2 className="text-[#FFFFFFE5] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font_mmr text-center mt-16">
                    Selected Projects
                </h2>
            </TextAnimation>

            <TextAnimation>
                <SubParagraph title="A curated selection of interface, system, and design projects across different domains." />
            </TextAnimation>

            <PortfolioSection />
        </div>
    );
};

export default OurWork;