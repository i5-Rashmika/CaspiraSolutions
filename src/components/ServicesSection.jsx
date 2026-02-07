"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { servicesData, servicesList as servicesListIcons } from "./data/servicesData";
import SubParagraph from "./common/SubParagraph";
import Image from "next/image";
import { RightArrow } from "./common/Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "./common/GradientText";
import TextAnimation from "./animation/TextAnimation";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
    const t = useTranslations("services");
    const [activeService, setActiveService] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const servicesList = useMemo(
        () =>
            [0, 1, 2, 3, 4].map((i) => ({
                name: t(`items.${i}.name`),
                description: t(`items.${i}.description`),
                features: [0, 1, 2, 3].map((j) => ({ title: t(`items.${i}.features.${j}`) })),
                icon: servicesListIcons[i].icon,
            })),
        [t]
    );

    const contentRef = useRef(null);
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const animationContext = useRef(null);
    const scrollBarRef = useRef(null);

    // 滑鼠滚轮：在横向服务栏上滑动时，仅左右移动内容，完全拦截不带动整页滚动
    useEffect(() => {
        const el = scrollBarRef.current;
        if (!el) return;
        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();
            el.scrollLeft += e.deltaY;
        };
        // passive: false 才能 preventDefault；capture: true 在捕获阶段先拦截，避免被其他逻辑或默认行为抢走
        el.addEventListener("wheel", handleWheel, { passive: false, capture: true });
        return () => el.removeEventListener("wheel", handleWheel, { capture: true });
    }, [isMounted]);

    // Set mounted state and ensure component is visible
    useEffect(() => {
        queueMicrotask(() => setIsMounted(true));

        // Force a reflow to ensure DOM is ready
        setTimeout(() => {
            if (sectionRef.current) {
                sectionRef.current.style.opacity = '1';
            }
        }, 100);
    }, []);

    // Section scroll animation - only run after mount
    useEffect(() => {
        if (!sectionRef.current || !isMounted) return;

        // Create GSAP context for proper cleanup
        animationContext.current = gsap.context(() => {
            // Set initial state to visible
            gsap.set(sectionRef.current.querySelectorAll(".animate-service"), {
                opacity: 1,
                y: 0
            });

            // Create the animation timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false, // Set to true for debugging
                }
            });

            tl.fromTo(sectionRef.current.querySelectorAll(".animate-service"),
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                }
            );

        }, sectionRef);

        return () => {
            if (animationContext.current) {
                animationContext.current.revert();
            }
        };
    }, [isMounted]);

    // Animate when activeService changes
    useEffect(() => {
        if (!contentRef.current || !isMounted) return;

        // Kill any existing animations
        gsap.killTweensOf(contentRef.current);
        cardsRef.current.forEach(card => gsap.killTweensOf(card));

        // Set initial state
        gsap.set(contentRef.current, { opacity: 1 });
        cardsRef.current.forEach(card => {
            if (card) gsap.set(card, { opacity: 1 });
        });

        // Timeline for content + cards
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Animate main content (title + description)
        tl.fromTo(
            contentRef.current,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6 }
        );

        // Animate each feature card staggered
        cardsRef.current.forEach((card, i) => {
            if (card) {
                tl.fromTo(
                    card,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, delay: i * 0.1 },
                    "<0.2"
                );
            }
        });

        return () => tl.kill();
    }, [activeService, isMounted]);

    // Refresh ScrollTrigger when component mounts/updates
    useEffect(() => {
        if (!isMounted) return;

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
            // Force refresh after a bit longer to ensure everything is loaded
            setTimeout(() => ScrollTrigger.refresh(), 500);
        }, 200);

        return () => clearTimeout(timer);
    }, [isMounted]);

    // Additional refresh on window load
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 300);
        };

        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    // If not mounted yet, show a basic version to prevent flash
    if (!isMounted) {
        return (
            <div id="our-services" ref={sectionRef} className="ourService_bg relative" style={{ opacity: 1 }}>
                <Image
                    src={"/images/png/serviceellipse.png"}
                    alt="service new ellipse"
                    height={555}
                    width={653}
                    className="absolute right-0 -top-65 hidden lg:block"
                />

                <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
                    <Image
                        src={"/images/png/ellipse.png"}
                        alt="ellipse"
                        height={555}
                        width={653}
                        className="absolute top-1/2 left-1/3 hidden lg:block"
                    />

                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <div className="relative mx-auto">
                            <GradientText
                                text={t("title")}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-60"
                            />
                            <h2 className="text-[#FFFFFFE5] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] uppercase text-center font_mmr relative">
                                {t("title")}
                            </h2>
                        </div>

                        <SubParagraph title={t("description")} />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Left Menu */}
                        <div className="lg:w-1/4">
                            <div className="nav_bg rounded-lg p-3 lg:p-4 w-full lg:min-w-[14rem] lg:max-w-[18rem] h-full">
                                {/* Mobile buttons */}
                                <div
                                    ref={scrollBarRef}
                                    className="lg:hidden overflow-x-auto overflow-y-hidden pb-2 scroll-smooth"
                                    style={{ scrollBehavior: "smooth" }}
                                >
                                    <div className="flex space-x-2 w-full min-w-max">
                                        {servicesList.map((service, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveService(index)}
                                                className={`px-4 py-3 rounded-lg transition-all duration-200 text-xs font-medium flex items-center gap-2 border-l-2 border-transparent whitespace-nowrap cursor-pointer shrink-0 ${activeService === index
                                                    ? "bg-[#0D1528] text-white border-l-[#3B82F6]"
                                                    : "text-[#9E9FA7]"
                                                    }`}
                                            >
                                                <span className="shrink-0">{service.icon}</span>
                                                <span className="truncate max-w-[160px] sm:max-w-[220px]">{service.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Desktop buttons：名称可换行完整显示 */}
                                <ul className="hidden lg:block space-y-4">
                                    {servicesList.map((service, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => setActiveService(index)}
                                                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium flex items-start gap-3 border-l-2 border-transparent cursor-pointer ${activeService === index
                                                    ? "bg-[#0D1528] text-white border-l-[#3B82F6]"
                                                    : "text-[#9E9FA7] hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                <span className="shrink-0 mt-0.5">{service.icon}</span>
                                                <span className="flex-1 min-w-0 break-words leading-snug">
                                                    {service.name}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="lg:w-3/4 min-w-0">
                            <div className="flex items-center gap-3 mb-1.5">
                                <h3 className="font-medium text-lg sm:text-xl lg:text-[20px] text-white leading-snug break-words">
                                    {servicesList[activeService].name}
                                </h3>
                            </div>

                            {/* Main Description */}
                            <div className="mb-8 sm:mb-10 lg:mb-12">
                                <div className="space-y-3 sm:space-y-4 font-normal text-xs sm:text-[12px] text-[#9E9FA7] break-words">
                                    <p className="break-words">{servicesList[activeService].description}</p>
                                </div>
                            </div>

                            {/* What we provide */}
                            <div>
                                <h4 className="text-sm sm:text-base text-white font-medium mb-4 sm:mb-6">
                                    {t("whatWeProvide")}
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {servicesList[activeService].features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="nav_bg rounded-lg p-4 sm:p-6 transition-colors duration-200 hover:bg-white/5 min-w-0"
                                        >
                                            <div className="flex items-start space-x-3">
                                                <span className="text-green-500 font-bold mt-1 shrink-0">
                                                    <RightArrow />
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <h5 className="font-medium text-xs sm:text-[12px] text-white mb-2 break-words">
                                                        {feature.title}
                                                    </h5>
                                                    {feature.description && (
                                                        <p className="font-normal text-[10px] sm:text-[10px] tracking-[-2%] text-[#9E9FA7] leading-relaxed break-words">
                                                            {feature.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div id="our-services" ref={sectionRef} className="ourService_bg relative animate-service" style={{ opacity: 1 }}>
            <Image
                src={"/images/png/serviceellipse.png"}
                alt="service new ellipse"
                height={555}
                width={653}
                className="absolute right-0 -top-65 hidden lg:block animate-service"
            />

            <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
                <Image
                    src={"/images/png/ellipse.png"}
                    alt="ellipse"
                    height={555}
                    width={653}
                    className="absolute top-1/2 left-1/3 hidden lg:block animate-service"
                />

                {/* Header */}
                <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-service">
                    <div className="relative mx-auto">
                        <GradientText
                            text={t("title")}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-60"
                        />
                        <TextAnimation>
                            <h2 className="text-[#FFFFFFE5] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] uppercase text-center font_mmr relative">
                                {t("title")}
                            </h2>
                        </TextAnimation>
                    </div>

                    <SubParagraph title={t("description")} />
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 animate-service">
                    {/* Left Menu */}
                    <div className="lg:w-1/4 animate-service">
                        <div className="nav_bg rounded-lg p-3 lg:p-4 w-full lg:min-w-[14rem] lg:max-w-[18rem] h-full">
                            {/* Mobile buttons */}
                            <div
                                ref={scrollBarRef}
                                className="lg:hidden overflow-x-auto overflow-y-hidden pb-2 scroll-smooth"
                                style={{ scrollBehavior: "smooth" }}
                            >
                                <div className="flex space-x-2 w-full min-w-max">
                                    {servicesList.map((service, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveService(index)}
                                            className={`px-4 py-3 rounded-lg transition-all duration-200 text-xs font-medium flex items-center gap-2 border-l-2 border-transparent whitespace-nowrap cursor-pointer shrink-0 ${activeService === index
                                                ? "bg-[#0D1528] text-white border-l-[#3B82F6]"
                                                : "text-[#9E9FA7]"
                                                }`}
                                        >
                                            <span className="shrink-0">{service.icon}</span>
                                            <span className="truncate max-w-[160px] sm:max-w-[220px]">{service.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop buttons：名称可换行完整显示 */}
                            <ul className="hidden lg:block space-y-4">
                                {servicesList.map((service, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => setActiveService(index)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium flex items-start gap-3 border-l-2 border-transparent cursor-pointer ${activeService === index
                                                ? "bg-[#0D1528] text-white border-l-[#3B82F6]"
                                                : "text-[#9E9FA7] hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <span className="shrink-0 mt-0.5">{service.icon}</span>
                                            <span className="flex-1 min-w-0 break-words leading-snug">
                                                {service.name}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:w-3/4 min-w-0 animate-service" ref={contentRef}>
                        <div className="flex items-center gap-3 mb-1.5">
                            <h3 className="font-medium text-lg sm:text-xl lg:text-[20px] text-white leading-snug break-words">
                                <TextAnimation>
                                    {servicesList[activeService].name}
                                </TextAnimation>
                            </h3>
                        </div>

                        {/* Main Description */}
                        <div className="mb-8 sm:mb-10 lg:mb-12">
                            <div className="space-y-3 sm:space-y-4 font-normal text-xs sm:text-[12px] text-[#9E9FA7] break-words">
                                <TextAnimation>
                                    <p className="break-words">{servicesList[activeService].description}</p>
                                </TextAnimation>
                            </div>
                        </div>

                        {/* What we provide */}
                        <div>
                            <h4 className="text-sm sm:text-base text-white font-medium mb-4 sm:mb-6">
                                {t("whatWeProvide")}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
                                {servicesList[activeService].features.map((feature, index) => (
                                    <div
                                        key={index}
                                        ref={(el) => (cardsRef.current[index] = el)}
                                        className="nav_bg rounded-lg p-4 sm:p-6 transition-colors duration-200 hover:bg-white/5 min-w-0"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <span className="text-green-500 font-bold mt-1 shrink-0">
                                                <RightArrow />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <TextAnimation>
                                                    <h5 className="font-medium text-xs sm:text-[12px] text-white mb-2 break-words">
                                                        {feature.title}
                                                    </h5>
                                                </TextAnimation>
                                                {feature.description && (
                                                    <TextAnimation>
                                                        <p className="font-normal text-[10px] sm:text-[10px] tracking-[-2%] text-[#9E9FA7] leading-relaxed break-words">
                                                            {feature.description}
                                                        </p>
                                                    </TextAnimation>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesSection;