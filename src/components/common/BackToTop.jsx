"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        show && (
            <motion.button
                onClick={scrollTop}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="
          fixed bottom-6 right-6 z-9999
          contact_bg text-white font-bold h-10 w-10 cursor-pointer rounded-full flex items-center justify-center 
          shadow-[0_0_25px_rgba(255,255,255,0.5)]
          hover:scale-110 transition-transform animate-bounce
        "
            >
                <ArrowUp />
            </motion.button>
        )
    );
}
