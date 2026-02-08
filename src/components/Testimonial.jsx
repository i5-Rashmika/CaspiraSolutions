"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import TestimonialsCards from "./TestimonialCards";
import GradientText from "./common/GradientText";
import TextAnimation from "./animation/TextAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
    const t = useTranslations("testimonial");
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const els = sectionRef.current.querySelectorAll(".testimonial-reveal");
            gsap.fromTo(
                els,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="mt-16 lg:mt-35 relative">
            <GradientText text={t("title")} className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-60" />
            <h2 className="testimonial-reveal text-[#FFFFFFE5] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font_mmr text-center">
                {t("title")}
            </h2>
            <p className="testimonial-reveal text-sm md:text-base font-normal max-w-[730px] text-center mx-auto text-[#FFFFFF99] leading-6 px-2 font_mmr">
                {t("subtitle")}
            </p>

            <TestimonialsCards />
        </div>
    )
}

export default Testimonial
