"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { PrevArrow } from "./common/Icons";
import { products } from "./data/servicesData";
import ProductPreviewModal from "./ProductPreviewModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CardSlider() {
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [activeBtn, setActiveBtn] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    queueMicrotask(() => setIsClient(true));
  }, []);

  const displayProducts = products;

  const cardWidth =
    typeof window === "undefined"
      ? 480
      : window.innerWidth < 450
      ? window.innerWidth * 0.85
      : window.innerWidth < 768
      ? 360
      : 480;

  // Resize
  useEffect(() => {
    if (!isClient) return;
    const handleResize = () => animate(x, 0, { duration: 0.2 });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  const handleNext = () => {
    setActiveBtn("next");
    animate(x, x.get() - cardWidth, { duration: 0.5 });
    setTimeout(() => setActiveBtn(""), 200);
  };

  const handlePrev = () => {
    setActiveBtn("prev");
    animate(x, x.get() + cardWidth, { duration: 0.5 });
    setTimeout(() => setActiveBtn(""), 200);
  };

  // Horizontal Scroll on Vertical Scroll - disabled on mobile to prevent sync issues
  useEffect(() => {
    if (!isClient || !sliderRef.current) return;
    if (window.innerWidth < 768) return;

    const sliderScrollWidth = sliderRef.current.scrollWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const scrollDistance = sliderScrollWidth - containerWidth;

    const ctx = gsap.context(() => {
      gsap.to(sliderRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: () => `+=${scrollDistance}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [isClient, cardWidth]);

  // Sleepy tilt + fade + blur - disabled on mobile for performance
  useEffect(() => {
    if (!isClient || !sliderRef.current) return;
    if (window.innerWidth < 768) return;

    const cards = sliderRef.current.querySelectorAll(".card-item");

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            rotate: -8,
            y: 50,
            scale: 0.92,
            filter: "blur(10px)",
            boxShadow: "0 0 0px rgba(255,255,255,0)",
          },
          {
            opacity: 1,
            rotate: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            boxShadow: "0 0 25px rgba(255,255,255,0.08)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [isClient]);

  // Mouse-follow 3D tilt - desktop only
  useEffect(() => {
    if (!isClient || !sliderRef.current) return;
    if (window.innerWidth < 768) return;

    const cards = sliderRef.current.querySelectorAll(".card-item");

    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x - rect.width / 2) / 30).toFixed(2);
      const rotateX = (-(y - rect.height / 2) / 30).toFixed(2);

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const resetTilt = (card) => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
      card.addEventListener("mouseleave", () => resetTilt(card));
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", resetTilt);
      });
    };
  }, [isClient]);

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto overflow-hidden mb-16 py-10 px-4 sm:px-10"
    >
      {isClient && (
        <>
          <motion.div ref={sliderRef} style={{ x }} className="flex flex-col md:flex-row gap-6 relative z-50">
            {displayProducts.map((item, index) => (
              <div
                key={index}
                className="
                  card-item
                  md:shrink-0 group transition-all duration-300
                  rounded-xl p-3 cursor-pointer
                  w-full md:min-w-[340px] lg:min-w-[480px]
                  glass-card gradient-border-animated shimmer-hover glow-hover
                "
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => setSelectedProduct(item)}
              >
                <div className="overflow-hidden rounded-xl w-full relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    height={280}
                    width={480}
                    className="
                      rounded-xl w-full
                      h-auto object-cover scale-90
                      transition-transform duration-500 group-hover:scale-95
                    "
                  />
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-lg">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <h2 className="font-semibold text-lg text-white mt-2">
                  {item.title}
                </h2>

                <p className="text-[#FFFFFFCC] text-xs my-1.5 line-clamp-2">{item.shortDesc}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {item.ctas?.map((cta, i) => (
                    <Link
                      key={i}
                      href={cta.href}
                      onClick={(e) => e.stopPropagation()}
                      className="font-normal text-sm rounded-[36px] nav_bg py-1.5 px-3.5 inline-block hover:opacity-90 transition-opacity shimmer-hover"
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <div className="hidden justify-center mt-7 gap-3">
            <button
              onClick={handlePrev}
              className={`
                h-9 w-9 rounded-full nav_bg flex justify-center items-center cursor-pointer z-50
                ${activeBtn === "prev" ? "prev_bg" : ""}
              `}
            >
              <PrevArrow />
            </button>

            <button
              onClick={handleNext}
              className={`
                h-9 w-9 rounded-full nav_bg flex justify-center items-center cursor-pointer rotate-180
                ${activeBtn === "next" ? "prev_bg" : ""}
              `}
            >
              <PrevArrow />
            </button>
          </div>
        </>
      )}

      <ProductPreviewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
