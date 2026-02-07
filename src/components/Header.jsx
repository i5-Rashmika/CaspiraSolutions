"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "@/context/LocaleContext";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import hy from "@/messages/hy.json";
import hi from "@/messages/hi.json";
import Paragraph from "./common/paragraph";
import SubParagraph from "./common/SubParagraph";
import {
    Boltshit,
    FeatherDev,
    GlobalBank,
    LightBox,
    LogoIp,
    Star,
    StarIcon,
} from "./common/Icons";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimation from "./animation/TextAnimation";
import Button from './common/Button';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const headerMessagesMap = { en, ru, hy, hi };

/** Hero 主标题：第一行固定，第二行 3 个词轮播（约 5 秒一切换） */
const HERO_ROTATING_KEYS = ["bottomWord1", "bottomWord2", "bottomWord3"]; // Implementation, Technology, Execution

const Header = () => {
    const t = useTranslations("header");
    const { locale } = useLocale();
    const headerMsg = headerMessagesMap[locale]?.header ?? en.header;
    const headerRef = useRef(null);
    const rectRef = useRef(null);
    const sliderRef = useRef(null);
    const mainImageRef = useRef(null);
    const imageContainerRef = useRef(null);
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const runHeaderAnimations = () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    defaults: { ease: "power3.out", duration: 0.7 }
                });

                // Set up 3D perspective
                gsap.set(imageContainerRef.current, {
                    perspective: 1200,
                    transformStyle: "preserve-3d"
                });

                // Main image 3D animation on load - tilted backward
                gsap.fromTo(mainImageRef.current,
                    {
                        rotationX: 25,
                        rotationY: 0,
                        scale: 0.9,
                        opacity: 0,
                        y: 100,
                        z: -150, // Push back in 3D space
                        transformOrigin: "center center",
                        filter: "brightness(0.8)",
                    },
                    {
                        rotationX: 0, // Straighten up
                        rotationY: 0,
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        z: 0,
                        filter: "brightness(1)",
                        duration: 1.8,
                        ease: "power3.out",
                        delay: 0.3
                    }
                );

                // Scroll animation - image lifts up with 3D effect
                gsap.to(mainImageRef.current, {
                    rotationX: -8, // Tilt forward slightly while scrolling
                    y: -50, // Lift up
                    scale: 1.05, // Scale up
                    z: 30, // Come forward in 3D space
                    filter: "brightness(1.1)",
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: mainImageRef.current,
                        start: "top 80%",
                        end: "bottom top",
                        scrub: 1.5,
                    }
                });

                tl.to(".header-title", { opacity: 1, y: 0 })
                    .to(".header-subtitle", { opacity: 1, y: 0 }, "-=0.4")
                    .to(".header-stars", { opacity: 1, y: 0 }, "-=0.35")
                    .to(".header-buttons", { opacity: 1, y: 0, stagger: 0.15 })
                    .to(".company-title", { opacity: 1, y: 0 })
                    .to(".company-logos", { opacity: 1, y: 0, stagger: 0.12 });
            }, headerRef);

            // BG RECT Image
            gsap.fromTo(
                rectRef.current,
                {
                    opacity: 0,
                    y: -150,
                    scale: 0.9,
                    filter: "blur(20px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 3,
                    ease: "power3.out",
                }
            );

            // Infinite Logo Slider
            gsap.to(sliderRef.current, {
                x: "-50%",
                duration: 12,
                ease: "none",
                repeat: -1,
            });
        };

        // Run animations after ref is ready
        const timer = setTimeout(runHeaderAnimations, 100);
        // 若 GSAP 未生效，2.5 秒后强制显示标题/副标题等，避免首页内容不显示
        const fallbackTimer = setTimeout(() => {
            if (!headerRef.current) return;
            const el = headerRef.current;
            const singleSelectors = [".header-title", ".header-subtitle", ".header-stars", ".header-buttons", ".company-title"];
            singleSelectors.forEach((sel) => {
                const node = el.querySelector(sel);
                if (node && node.style) {
                    node.style.opacity = "1";
                    node.style.transform = "translateY(0)";
                }
            });
            el.querySelectorAll(".company-logos").forEach((node) => {
                if (node.style) {
                    node.style.opacity = "1";
                    node.style.transform = "translateY(0)";
                }
            });
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(fallbackTimer);
            // Cleanup GSAP context
            if (headerRef.current) {
                gsap.context(() => { }).revert();
            }
        };
    }, []);

    // 第二行标题每 5 秒轮播：Implementation → Technology → Execution → 循环
    useEffect(() => {
        const timer = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % HERO_ROTATING_KEYS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const rotatingWord = t(HERO_ROTATING_KEYS[wordIndex]);

    return (
        <div ref={headerRef} className="mt-10 lg:mt-18 mx-auto relative overflow-x-clip">
            {/* Rectangle BG */}
            <div ref={rectRef} className="absolute right-0 -top-30 h-full w-full z-0 overflow-hidden">
                <Image
                    src={"/images/png/headerlightray.png"}
                    alt="background"
                    height={863}
                    width={700}
                    className="h-[400px] lg:h-[863px] w-[350px] lg:w-[700px] absolute right-0 -top-20"
                />
            </div>

            <Image
                src={"/images/png/Leftstroke.png"}
                alt="left stroke"
                height={700}
                width={500}
                className="mx-auto mt-10 lg:w-[500px] lg:-top-50 w-[300px] absolute left-0 lg:h-full z-[-1]"
            />

            <Image
                src={"/images/png/ellipse.png"}
                alt="ellipse"
                height={700}
                width={706}
                className="mx-auto absolute left-0 top-0 h-full z-[-1] hidden lg:block"
            />

            <Image
                src={"/images/png/lightEffect.png"}
                alt="light effect"
                height={700}
                width={706}
                className="mx-auto -top-10 absolute left-0 h-full z-[-100] main_blur w-full"
            />

            <Image
                src={"/images/png/Rightstroke.png"}
                alt="right stroke"
                height={700}
                width={500}
                className="mx-auto absolute right-0 lg:-top-50 lg:w-[500px] w-[300px] lg:h-full z-[-1]"
            />

            {/* Badges */}
            <div className="flex flex-col items-center sm:flex-row justify-center mb-6 gap-3">
                {[t("tag1"), t("tag2")].map((title, index) => (
                    <button
                        key={index}
                        className="header-badge header_btn py-1.5 px-2 rounded-[36px] flex items-center gap-1"
                    >
                        <StarIcon />
                        {title}
                    </button>
                ))}
            </div>

            {/* ⭐ Hero 主标题：第一行固定 Where Strategy Meets，第二行 3 词轮播 */}
            <div className="header-title opacity-0 translate-y-5">
                <div className="text-center mb-5 text-2xl sm:text-4xl lg:text-6xl">
                    <p className="font-semibold gradient_text">
                        {t.rich("typed5", { i: (chunks) => <i>{chunks}</i> })}
                    </p>
                    <p className="font-bold text-white mt-2 text-[1.08em]">{rotatingWord}</p>
                </div>
            </div>

            {/* ⭐ Subtitle */}
            <div className="header-subtitle opacity-0 translate-y-5">
                <TextAnimation delay={0.8} animateOnScroll={false}>
                    <SubParagraph title={t("slogan")} />
                </TextAnimation>
            </div>

            {/* ⭐ Stars */}
            <div className="header-stars opacity-0 translate-y-5 flex flex-col text-white items-center mt-6">
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                        <Star key={i} size={20} fill="#F7C948" stroke="#F7C948" />
                    ))}
                </div>
                <p className="text-base mt-1">{t("reviews")}</p>
            </div>

            {/* ⭐ Buttons：Our Services 滚动到服务区，Selected Projects 滚动到作品区 */}
            <div className="flex header-buttons opacity-0 translate-y-5 flex-col items-center sm:flex-row justify-center mt-6 gap-3 relative z-9999">
                <Button title={t("ourServices")} href="#our-services" />
                <Button title={t("selectedProjects")} href="#selected-projects" />
            </div>

            {/* ⭐ Main Image with 3D Effect */}
            <div ref={imageContainerRef} className="relative preserve-3d">
                <Image
                    ref={mainImageRef}
                    src={"/images/png/header.png"}
                    alt="header main image"
                    height={700}
                    width={1280}
                    className="mx-auto mt-10 max-w-full h-auto object-contain transform-gpu will-change-transform"
                    priority
                />
            </div>

            <Image
                src="/images/png/blurimage.png"
                alt="blur image"
                width={1000}
                height={297}
                className="absolute bottom-0 w-full"
                layout="responsive"
            />

            {/* Company Logos */}
            <div className="max-w-full header_blur bg-[#00010B] pt-10">
                <div className="max-w-7xl mx-auto">
                    <p className="company-title opacity-0 translate-y-5 font-semibold text-base sm:text-[20px] text-center px-4">
                        {t("companies")}
                    </p>

                    <div className="relative mt-10 overflow-hidden h-[100px] lg:h-[220px]">

                        <Image
                            src={"/images/png/leftellipse.png"}
                            alt="left stroke"
                            height={220}
                            width={208}
                            className="absolute -left-15 -top-1/2 z-20 pointer-events-none hidden lg:block"
                        />
                        {/* Decorative Strokes */}
                        <Image
                            src={"/images/png/rightellipse.png"}
                            alt="right stroke"
                            height={220}
                            width={208}
                            className="absolute -right-15 -top-1/2 z-20 pointer-events-none hidden lg:block"
                        />

                        <div ref={sliderRef} className="slider-wrapper flex gap-8 lg:gap-20 whitespace-nowrap z-10">
                            {[Boltshit, LightBox, FeatherDev, GlobalBank, LogoIp].map((Logo, i) => (
                                <div key={i} className="company-logos opacity-0 translate-y-5">
                                    <Logo />
                                </div>
                            ))}

                            {[Boltshit, LightBox, FeatherDev, GlobalBank, LogoIp].map((Logo, i) => (
                                <div key={i + 10} className="company-logos opacity-0 translate-y-5">
                                    <Logo />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;