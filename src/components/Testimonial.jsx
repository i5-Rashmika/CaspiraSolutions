"use client";
import React from "react";
import { useTranslations } from "next-intl";
import TestimonialsCards from "./TestimonialCards";
import GradientText from "./common/GradientText";
import TextAnimation from "./animation/TextAnimation";

const Testimonial = () => {
    const t = useTranslations("testimonial");
    return (
        <div className="mt-16 lg:mt-35 relative">
            <GradientText text={t("title")} className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-60" />
            <h2 className="text-[#FFFFFFE5] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font_mmr text-center">
                {t("title")}
            </h2>
            <p className="text-sm md:text-base font-normal max-w-[730px] text-center mx-auto text-[#FFFFFF99] leading-6 px-2 font_mmr">
                {t("subtitle")}
            </p>


            <TestimonialsCards />
        </div>
    )
}

export default Testimonial
