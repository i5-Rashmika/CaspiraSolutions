"use client";

import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl';
import SubParagraph from './common/SubParagraph';
import CardSlider from './CardSlider';
import Image from 'next/image';
import GradientText from './common/GradientText';
import TextAnimation from './animation/TextAnimation';
import { Spotlight } from './ui/spotlight';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StarsBackground } from './animate-ui/components/backgrounds/stars';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const OurProducts = () => {
    const t = useTranslations('header');
    const spotlightRef = useRef(null);
    const sectionRef = useRef(null);
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

    useEffect(() => {
        if (!spotlightRef.current || !sectionRef.current || !isMounted) return;

        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([spotlightRef.current, titleRef.current], { opacity: 1 });

            // Spotlight animation
            gsap.fromTo(
                spotlightRef.current,
                { opacity: 0, y: 120, scale: 0.85 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                        markers: false,
                    },
                }
            );

            // Direct title animation as fallback
            gsap.fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        // Refresh ScrollTrigger
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => ctx.revert();
    }, [isMounted]);

    // If not mounted, show basic content without animations
    if (!isMounted) {
        return (
            <div id="our-solutions" className='mb-16 relative' ref={sectionRef} style={{ opacity: 1, visibility: 'visible' }}>
            <div ref={spotlightRef} className="h-[500px] sm:h-[600px] lg:h-[700px] w-full sm:w-[108%] lg:w-[100%] absolute top-0 left-0">
                <Spotlight
                className="-top-20 left-0 sm:-top-20 sm:left-40 md:-top-20 md:left-60 absolute pointer-events-none"
                fill="url(#spotlightGradient)"
                />
            </div>
            <Image src={"/images/png/looper.png"} alt="looper" fill className="fixed -bottom-[80%] right-0" />
            {/* <Image
                src={"/images/png/serviceellipse.png"}
                alt='service ellipse'
                height={555}
                width={653}
                className="absolute right-0 -top-20 sm:-top-30 w-full sm:w-auto"
            /> */}

            <GradientText text={t('ourSolutions')} className="absolute -top-10 sm:-top-15 left-1/2 -translate-x-1/2 opacity-60" />

            {/* Show title directly without TextAnimation */}
            <h2
                ref={titleRef}
                className="text-[#FFFFFFE5] font-bold text-xl sm:text-2xl md:text-3xl lg:text-[48px] font_mmr text-center mt-8 sm:mt-12 md:mt-16 px-4"
                style={{ opacity: 1 }}
            >
                {t('ourSolutions')}
            </h2>

            <SubParagraph
                title={t('solutionsSlogan')}
            />

            <CardSlider />
            </div>
        );
    }

    return (
        <div id="our-solutions" className='mb-16 relative' ref={sectionRef} style={{ opacity: 1, visibility: 'visible' }}>
            <StarsBackground
                starColor={'#ffffff'}
                className={cn(
                    'absolute inset-0 flex items-center justify-center rounded-xl '
                )}
            />
            <div ref={spotlightRef} className="h-[700px] w-full lg:w-[110%] absolute top-0 left-0">
                <Spotlight
                    className="-top-40 left-0 md:-top-20 md:left-60 absolute pointer-events-none"
                    fill="url(#spotlightGradient)"
                />
            </div>
            <Image src={"/images/png/looper.png"} alt="looper" fill className="fixed -bottom-[80%] right-0" />
            <Image
                src={"/images/png/serviceellipse.png"}
                alt='service ellipse'
                height={555}
                width={653}
                className="absolute right-0 -top-30 hidden lg:block"
            />

            <GradientText text={t('ourSolutions')} className="absolute -top-15 left-1/2 -translate-x-1/2 opacity-60" />

            {/* Try both approaches - TextAnimation and direct ref */}
            <div ref={titleRef}>
                <TextAnimation delay={0.3} animateOnScroll={true} trigger={sectionRef}>
                    <h2 className="text-[#FFFFFFE5] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font_mmr text-center mt-16">
                        {t('ourSolutions')}
                    </h2>
                </TextAnimation>
            </div>

            <TextAnimation>
                <SubParagraph
                    title={t('solutionsSlogan')}
                />
            </TextAnimation>

            <CardSlider />
        </div>
    )
}

export default OurProducts;