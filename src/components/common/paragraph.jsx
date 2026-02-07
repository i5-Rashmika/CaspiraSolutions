import React from "react";

export default function Paragraph({ title, className = "" }) {
    return (
        <p className={`text-2xl sm:text-4xl md:text-5xl lg:text-[64px] max-w-[850px] text-center mx-auto text-[#FFFFFFE5] lg:leading-[74px] font-bold ${className}`}>
            {title}
        </p>
    );
}
