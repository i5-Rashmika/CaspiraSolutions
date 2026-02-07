"use client";

import Image from "next/image";
import { TestimonialCards } from "./data/testimonialCard";
import { motion } from "framer-motion";
import { QuoteIcon } from "./common/Icons";

const AVATAR_FALLBACK = "/images/png/man.jpg";

export default function TestimonialsCards() {
  const data = TestimonialCards;

  // Row 1: Systems / Operations  |  Row 2: UI/UX / Customer Support  |  Row 3: AI / Systems
  const systems = data.filter((i) => i.tag === "Systems");
  const row1Systems = systems.slice(0, 4);
  const row3Systems = systems.slice(4, 8);
  const row1 = [...data.filter((i) => i.tag === "Operations"), ...row1Systems];
  const row2 = [...data.filter((i) => i.tag === "UI/UX"), ...data.filter((i) => i.tag === "Customer Support")];
  const row3 = [...data.filter((i) => i.tag === "AI"), ...row3Systems];

  // Animation variants
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  const marqueeVariantsRight = {
    animate: {
      x: [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  // Card component: tag as small neutral pill (opacity 50–60%), semantic only
  const TestimonialCard = ({ item, index }) => (
    <div
      key={index}
      className="nav_bg backdrop-blur-md rounded-xl p-4 transition-all w-[280px] sm:w-[350px] md:w-[450px] shrink-0 mx-3"
    >
      <div className="flex items-start justify-between gap-2">
        <QuoteIcon />
        {item.tag && (
          <span
            className="shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/55 font-medium"
            aria-hidden
          >
            {item.tag}
          </span>
        )}
      </div>

      <p className="text-white text-sm leading-relaxed my-3 min-h-20">
        &quot;{item.text}&quot;
      </p>

      <div className="flex items-center gap-3 mt-4 pt-3">
        <span className="relative shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden bg-white/10">
          <img
            src={item.img}
            alt=""
            width={42}
            height={42}
            className="h-full w-full rounded-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = AVATAR_FALLBACK;
            }}
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-white font-semibold text-sm sm:text-base truncate">
            {item.name}
          </p>
          <p className="text-white/60 text-xs sm:text-sm truncate">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="mt-6 testimonials-blur overflow-hidden relative py-8">
      <Image
        src={"/images/png/lefttesti.png"}
        alt='left testi'
        height={900}
        width={452}
        className='absolute left-0 z-100 h-[900px] hidden lg:block -top-30'
      />
      <Image
        src={"/images/png/righttesti.png"}
        alt='right testi'
        height={900}
        width={452}
        className='absolute right-0 z-1000 h-[900px] hidden lg:block -top-30'
      />

      {/* Row 1 - Left to Right */}
      <motion.div
        className="flex mb-6 "
        variants={marqueeVariants}
        animate="animate"
      >
        {[...row1, ...row1].map((item, i) => (
          <TestimonialCard   key={`row1-${i}`} item={item} index={i} />
        ))}
      </motion.div>

      {/* Row 2 - Right to Left */}
      <motion.div
        className="flex mb-6"
        variants={marqueeVariantsRight}
        animate="animate"
      >
        {[...row2, ...row2].map((item, i) => (
          <TestimonialCard key={`row2-${i}`} item={item} index={i} />
        ))}
      </motion.div>

      {/* Row 3 - Left to Right */}
      <motion.div
        className="flex"
        variants={marqueeVariants}
        animate="animate"
      >
        {[...row3, ...row3].map((item, i) => (
          <TestimonialCard key={`row3-${i}`} item={item} index={i} />
        ))}
      </motion.div>
    </section>
  );
}