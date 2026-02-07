"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Spotlight } from "./ui/spotlight";
import RegionalCoverageCard from "./RegionalCoverageCard";

gsap.registerPlugin(ScrollTrigger);

const inputBase =
  "nav_bg rounded-[55px] px-4 py-3 text-white placeholder-white/40 outline-none transition-all duration-200 border border-transparent focus:border-white/40 focus:ring-2 focus:ring-blue-400/20 focus:ring-offset-0";
const textareaBase =
  "w-full nav_bg rounded-xl px-4 py-3 text-white placeholder-white/40 resize-none outline-none transition-all duration-200 border border-transparent focus:border-white/40 focus:ring-2 focus:ring-blue-400/20 focus:ring-offset-0";

export default function ContactForm() {
  const t = useTranslations("contact");
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const spotlightRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setIsMounted(true));

    // Force visibility
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
        containerRef.current.style.visibility = 'visible';
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (!spotlightRef.current || !containerRef.current || !isMounted) return;

    const ctx = gsap.context(() => {
      // Set initial state to visible
      gsap.set(spotlightRef.current, { opacity: 1 });

      const anim = gsap.fromTo(
        spotlightRef.current,
        { opacity: 0, y: 120, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
        markers: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    const ctx = gsap.context(() => {
      // Set initial states to visible
      gsap.set([leftRef.current, rightRef.current], {
        opacity: 1,
        x: 0
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reset",
          markers: false,
        }
      });

      tl.fromTo(leftRef.current, {
        x: -100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }).fromTo(
        rightRef.current,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Refresh ScrollTrigger after mount
  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timer);
  }, [isMounted]);

  // If not mounted yet, show basic content without animations
  if (!isMounted) {
    return (
      <div ref={containerRef} className="py-6 px-4 relative contact-section" style={{ opacity: 1, visibility: 'visible' }}>
        <div
          ref={spotlightRef}
          className="h-[1000px] w-[138%] lg:w-[110%] absolute top-0 left-0"
          style={{ opacity: 1 }}
        >
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60 absolute pointer-events-none"
            fill="url(#spotlightGradient)"
          />
        </div>

        <Image
          src={"/images/png/ellipse.png"}
          alt="ellipse"
          height={700}
          width={706}
          className="mx-auto absolute left-1/8 top-0 h-full z-0"
        />

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20 nav_bg p-4 lg:p-10 rounded-[20px] border_map backdrop-blur-[100px] max-w-7xl mx-auto relative z-50">
          {/* LEFT SIDE */}
          <div ref={leftRef} className="relative z-50" style={{ opacity: 1 }}>
            <h2 className="font-semibold text-2xl mb-2">
              Let’s {t("getInTouch")}
            </h2>
            <p className="text-[#FFFFFF99] mb-2">
              {t("weLoveToHear")}
            </p>

            {submitted ? (
              <p className="mt-10 text-green-400/90 text-sm">
                {t("successMessage")}
              </p>
            ) : (
              <form
                className="space-y-4 mt-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <input
                  type="text"
                  placeholder={t("fullName")}
                  className={`w-full ${inputBase}`}
                />
                <input
                  type="email"
                  placeholder={t("workEmail")}
                  className={`w-full ${inputBase}`}
                />
                <input
                  type="text"
                  placeholder={t("organization")}
                  className={`w-full ${inputBase}`}
                />
                <input
                  type="text"
                  placeholder={t("contactNumber")}
                  className={`w-full ${inputBase}`}
                />
                <textarea
                  rows={4}
                  placeholder={t("message")}
                  className={textareaBase}
                />
                <button
                  type="submit"
                  className="w-full buttonbg cursor-pointer text-white rounded-full py-3 mt-4 flex items-center justify-center gap-2.5"
                >
                  {t("submit")}
                </button>
                <p className="text-[10px] text-white/40 mt-2">
                  {t("compliance")}
                </p>
              </form>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div
            ref={rightRef}
            className="flex flex-col justify-between relative z-50"
            style={{ opacity: 1 }}
          >
            <div className="nav_bg rounded-xl p-4 text-white border border-[#3b82f61f]">
              <p className="text-sm font-semibold text-white/90 mb-2">
                {t("regionalContact")}
              </p>
              <a
                href="mailto:caspirasolutions@gmail.com"
                className="text-white/80 hover:text-white text-sm break-all"
              >
                caspirasolutions@gmail.com
              </a>
              <p className="text-white/50 text-xs mt-3">
                {t("responseTime")}
              </p>
            </div>
            <div className="mt-4">
              <RegionalCoverageCard />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-6 px-4 relative contact-section" style={{ opacity: 1, visibility: 'visible' }}>
      <div
        ref={spotlightRef}
        className="h-[1000px] w-[138%] lg:w-[110%] absolute top-0 left-0"
      >
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60 absolute pointer-events-none"
          fill="url(#spotlightGradient)"
        />
      </div>

      <Image
        src={"/images/png/ellipse.png"}
        alt="ellipse"
        height={700}
        width={706}
        className="mx-auto absolute left-1/8 top-0 h-full z-0"
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20 nav_bg p-4 lg:p-10 rounded-[20px] border_map backdrop-blur-[100px] max-w-7xl mx-auto relative z-50">
        {/* LEFT SIDE */}
        <div ref={leftRef} className="relative z-50">
          <h2 className="font-semibold text-2xl mb-2">
            Let’s {t("getInTouch")}
          </h2>
          <p className="text-[#FFFFFF99] mb-2">
            {t("weLoveToHear")}
          </p>

          {submitted ? (
            <p className="mt-10 text-green-400/90 text-sm">
              {t("successMessage")}
            </p>
          ) : (
            <form
              className="space-y-4 mt-10"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input
                type="text"
                placeholder={t("fullName")}
                className={`w-full ${inputBase}`}
              />
              <input
                type="email"
                placeholder={t("workEmail")}
                className={`w-full ${inputBase}`}
              />
              <input
                type="text"
                placeholder={t("organization")}
                className={`w-full ${inputBase}`}
              />
              <input
                type="text"
                placeholder={t("contactNumber")}
                className={`w-full ${inputBase}`}
              />
              <textarea
                rows={4}
                placeholder={t("message")}
                className={textareaBase}
              />
              <button
                type="submit"
                className="w-full buttonbg cursor-pointer text-white rounded-full py-3 mt-4 flex items-center justify-center gap-2.5"
              >
                {t("submit")}
              </button>
              <p className="text-[10px] text-white/40 mt-2">
                {t("compliance")}
              </p>
            </form>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div
          ref={rightRef}
          className="flex flex-col justify-between relative z-50"
        >
          <div className="nav_bg rounded-xl p-4 text-white border border-[#3b82f61f]">
            <p className="text-sm font-semibold text-white/90 mb-2">
              {t("regionalContact")}
            </p>
            <a
              href="mailto:caspirasolutions@gmail.com"
              className="text-white/80 hover:text-white text-sm break-all"
            >
              caspirasolutions@gmail.com
            </a>
            <p className="text-white/50 text-xs mt-3">
              {t("responseTime")}
            </p>
          </div>
          <div className="mt-4">
            <RegionalCoverageCard />
          </div>
        </div>
      </div>
    </div>
  );
}