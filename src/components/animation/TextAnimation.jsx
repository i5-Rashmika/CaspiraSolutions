"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  className = "",
}) {
  const containerRef = useRef(null);
  const splitRefs = useRef([]);
  const lines = useRef([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    const ctx = gsap.context(() => {
      const run = async () => {
        try {
          await document.fonts.ready;
        } catch { }

        // cleanup previous splits
        splitRefs.current.forEach((s) => s.revert());
        splitRefs.current = [];
        lines.current = [];

        const targets = element.hasAttribute("data-copy-wrapper")
          ? Array.from(element.children)
          : [element];

        targets.forEach((el) => {
          const split = new SplitText(el, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          });

          splitRefs.current.push(split);
          lines.current.push(...split.lines);
        });

        // initial hidden position
        gsap.set(lines.current, { y: "110%", opacity: 0, transformOrigin: "left bottom" });

        const animConfig = {
          y: "0%",
          opacity: 1,
          stagger: 0.06,
          ease: "power4.out",
          duration: 1.5,
          delay,
        };

        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...animConfig,
            scrollTrigger: {
              trigger: element,
              start: "top 95%",
              toggleActions: "play reverse play reverse", 
            },
          });
        } else {
          gsap.to(lines.current, animConfig);
        }
      };

      run();
    }, containerRef);

    return () => {
      ctx.revert();
      splitRefs.current.forEach((s) => s.revert());
    };
  }, [animateOnScroll, delay]);

  return (
    <div ref={containerRef} className={className} data-copy-wrapper="true">
      {children}
    </div>
  );
}
