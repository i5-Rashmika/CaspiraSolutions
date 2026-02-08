"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductPreviewModal({ product, onClose }) {
  // Scroll lock & Escape key
  useEffect(() => {
    if (!product) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="
              relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
              rounded-2xl p-5 md:p-8
              glass-card-strong gradient-border
              md:origin-center
            "
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="
                absolute top-4 right-4 z-10
                h-9 w-9 rounded-full nav_bg
                flex items-center justify-center
                text-white/70 hover:text-white
                transition-colors cursor-pointer
              "
              aria-label="Close preview"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Image */}
            <div className="overflow-hidden rounded-xl w-full">
              <Image
                src={product.img}
                alt={product.title}
                height={450}
                width={900}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>

            {/* Title */}
            <h2 className="font-semibold text-2xl md:text-3xl text-white mt-5">
              {product.title}
            </h2>

            {/* Description */}
            <p className="text-[#FFFFFFCC] text-sm md:text-base leading-relaxed mt-3">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#FFFFFFCC]">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            {product.ctas && product.ctas.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {product.ctas.map((cta, i) => (
                  <Link
                    key={i}
                    href={cta.href}
                    className="
                      font-normal text-base rounded-[36px] nav_bg
                      py-2.5 px-6 inline-block
                      hover:opacity-90 transition-opacity shimmer-hover
                    "
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
