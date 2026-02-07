import React from "react";
import { cn } from "@/lib/utils";

export const Spotlight = ({ className }) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-1 h-[169%] w-[138%] lg:w-[110%]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="url(#spotlightGradient)"
          fillOpacity="0.35"
        ></ellipse>
      </g>

      <defs>
        {/* 🟦 Linear Gradient */}
        <linearGradient
          id="spotlightGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="24%" stopColor="#53A2FF" />
          <stop offset="127%" stopColor="rgba(83, 162, 255, 0)" />
        </linearGradient>

        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="3840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};
