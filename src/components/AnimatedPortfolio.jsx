"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icons } from "./common/Icons";
import { categories, portfolioItems, categoryDescriptions, allWorkDescription } from "./data/servicesData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from './common/Button';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
    const [active, setActive] = useState("All Work");
    const [isMounted, setIsMounted] = useState(false);
    /** 点击标题才显示解释层：当前展开的卡片 id，null 为都不显示 */
    const [expandedDescId, setExpandedDescId] = useState(null);

    const gridRef = useRef(null);
    const filterRef = useRef(null);
    const sectionRef = useRef(null);

    const filteredItems =
        active === "All Work"
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === active);

    const isSingleCategory = active !== "All Work";
    const categoryDescription = isSingleCategory ? categoryDescriptions[active] : null;
    /** 分类栏下方一行：All Work 用筛选意图说明，单分类用 categoryDescriptions */
    const introLine = active === "All Work" ? allWorkDescription : categoryDescription;

    const toggleDesc = (id) => setExpandedDescId((prev) => (prev === id ? null : id));

    /** 切换分类时收起已展开的解释层 */
    useEffect(() => setExpandedDescId(null), [active]);

    // Set mounted state
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

    // Animate portfolio items (replay on scroll)
    useEffect(() => {
        if (!isMounted || !sectionRef.current || !gridRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial state to visible
            gsap.set(".portfolio-item", { opacity: 1, y: 0 });

            const items = gridRef.current.querySelectorAll(".portfolio-item");

            gsap.fromTo(
                items,
                {
                    opacity: 0,
                    y: 40,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reset",
                        markers: false,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [active, isMounted]);

    // Animate filter buttons
    useEffect(() => {
        if (!isMounted || !sectionRef.current || !filterRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial state to visible
            gsap.set(".filter-btn", { opacity: 1, y: 0 });

            const buttons = filterRef.current.querySelectorAll(".filter-btn");

            gsap.fromTo(
                buttons,
                {
                    opacity: 0,
                    y: -12
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "bottom 20%",
                        toggleActions: "play none none reset",
                        markers: false,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isMounted]);

    // Refresh ScrollTrigger after mount
    useEffect(() => {
        if (!isMounted) return;

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => clearTimeout(timer);
    }, [isMounted]);

    // Additional refresh on window load
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);
        };

        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    // If not mounted yet, show basic content without animations
    if (!isMounted) {
        return (
            <div
                ref={sectionRef}
                className="w-full text-white px-4 sm:px-6 md:px-10 lg:px-20 relative pb-20"
                style={{ opacity: 1, visibility: 'visible' }}
            >
                {/* Background Ellipse */}
                <Image
                    src={"/images/png/portfolioellipse.png"}
                    alt="ellipse"
                    height={555}
                    width={653}
                    className="absolute left-0 -top-40 lg:-top-60 hidden lg:block z-[-1] pointer-events-none select-none"
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Filter Buttons */}
                    <div
                        ref={filterRef}
                        className="flex gap-3 mt-10 nav_bg py-3 justify-between px-2 rounded-[36px] overflow-x-auto whitespace-nowrap w-full"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`filter-btn px-5 py-2 rounded-[36px] border border-transparent cursor-pointer transition-all duration-200 text-sm sm:text-base ${active === cat
                                    ? "buttonbg text-white scale-105"
                                    : "text-gray-300 hover:text-white"
                                    }`}
                                style={{ opacity: 1 }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* 分类下方一行：All Work 为筛选意图说明，单分类为极简说明（灰字） */}
                    {introLine && (
                        <p className="text-[#9E9FA7] text-sm sm:text-base text-center max-w-2xl mx-auto mt-6">
                            {introLine}
                        </p>
                    )}

                    {/* Portfolio Grid：单分类时居中精选；All Work 时 2 列平衡 (2+2+1) */}
                    <div
                        ref={gridRef}
                        className={`grid gap-8 sm:gap-10 mt-12 ${isSingleCategory
                            ? "grid-cols-1 max-w-2xl mx-auto justify-items-center"
                            : "grid-cols-1 sm:grid-cols-2"
                            }`}
                    >
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className={`portfolio-item group cursor-pointer rounded-xl p-2 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] ${isSingleCategory ? "w-full max-w-md" : ""}`}
                                style={{ opacity: 1 }}
                            >
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-52 sm:h-60 md:h-64 lg:h-56 object-cover rounded-lg transition-all duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); toggleDesc(item.id); }}
                                            className="text-left text-lg font-medium hover:text-white/90 cursor-pointer select-none"
                                        >
                                            {item.title}
                                        </button>
                                        <span className="transition-all duration-500 group-hover:rotate-45 prev_bg rounded-full p-2">
                                            <Icons />
                                        </span>
                                    </div>
                                    {item.shortDesc && expandedDescId === item.id && (
                                        <p className="text-sm mt-1 text-white/80 line-clamp-1">{item.shortDesc}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 单分类显示 Back to All Work，All Work 显示 View All */}
                    <div className="flex justify-center mt-14">
                        {isSingleCategory ? (
                            <button
                                type="button"
                                onClick={() => setActive("All Work")}
                                className="prev_bg text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                Back to All Work
                            </button>
                        ) : (
                            <Button title="View All" />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={sectionRef}
            className="w-full text-white px-4 sm:px-6 md:px-10 lg:px-20 relative pb-20"
            style={{ opacity: 1, visibility: 'visible' }}
        >
            {/* Background Ellipse */}
            <Image
                src={"/images/png/portfolioellipse.png"}
                alt="ellipse"
                height={555}
                width={653}
                className="absolute left-0 -top-40 lg:-top-60 hidden lg:block z-[-1] pointer-events-none select-none"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Filter Buttons */}
                <div
                    ref={filterRef}
                    className="flex gap-3 mt-10 nav_bg py-3 justify-between px-2 rounded-[36px] overflow-x-auto whitespace-nowrap w-full"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`filter-btn px-5 py-2 rounded-[36px] border border-transparent cursor-pointer transition-all duration-200 text-sm sm:text-base ${active === cat
                                ? "buttonbg text-white scale-105"
                                : "text-gray-300 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 分类下方一行：All Work 为筛选意图说明，单分类为极简说明（灰字） */}
                {introLine && (
                    <p className="text-[#9E9FA7] text-sm sm:text-base text-center max-w-2xl mx-auto mt-6">
                        {introLine}
                    </p>
                )}

                {/* Portfolio Grid：单分类时居中精选；All Work 时 2 列平衡 (2+2+1) */}
                <div
                    ref={gridRef}
                    className={`grid gap-8 sm:gap-10 mt-12 ${isSingleCategory
                        ? "grid-cols-1 max-w-2xl mx-auto justify-items-center"
                        : "grid-cols-1 sm:grid-cols-2"
                        }`}
                >
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className={`portfolio-item group cursor-pointer rounded-xl p-2 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] ${isSingleCategory ? "w-full max-w-md" : ""}`}
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={500}
                                    height={300}
                                    className="w-full h-52 sm:h-60 md:h-64 lg:h-56 object-cover rounded-lg transition-all duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); toggleDesc(item.id); }}
                                        className="text-left text-lg font-medium hover:text-white/90 cursor-pointer select-none"
                                    >
                                        {item.title}
                                    </button>
                                    <span className="transition-all duration-500 group-hover:rotate-45 prev_bg rounded-full p-2">
                                        <Icons />
                                    </span>
                                </div>
                                {item.shortDesc && expandedDescId === item.id && (
                                    <p className="text-sm mt-1 text-white/80 line-clamp-1">{item.shortDesc}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 单分类显示 Back to All Work，All Work 显示 View All */}
                <div className="flex justify-center mt-14">
                    {isSingleCategory ? (
                        <button
                            type="button"
                            onClick={() => setActive("All Work")}
                            className="prev_bg text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            Back to All Work
                        </button>
                    ) : (
                        <Button title="View All" />
                    )}
                </div>
            </div>
        </div>
    );
}