"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    useEffect(() => {
        const cursor = document.querySelector(".cursor");
        const follower = document.querySelector(".cursor-follower");

        let mouseX = 0, mouseY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0,
            });

            gsap.to(follower, {
                x: mouseX - 20,
                y: mouseY - 20,
                duration: 0.2,
                ease: "power3.out",
            });
        });

        // Hover grow effect for buttons
        const hoverItems = document.querySelectorAll("button, a, .hover-grow");

        hoverItems.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                gsap.to(follower, {
                    scale: 1.8,
                    opacity: 0.4,
                    duration: 0.2,
                });
            });

            item.addEventListener("mouseleave", () => {
                gsap.to(follower, {
                    scale: 1,
                    opacity: 0.2,
                    duration: 0.2,
                });
            });
        });

        // Hide cursor on mobile
        const handleResize = () => {
            if (window.innerWidth < 768) {
                cursor.style.display = "none";
                follower.style.display = "none";
            } else {
                cursor.style.display = "block";
                follower.style.display = "block";
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
    }, []);

    return (
        <>
            <div className="cursor"></div>
            <div className="cursor-follower"></div>

            <style>
                {`
          .cursor {
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 999999999;
            transform: translate(-50%, -50%);
          }

          .cursor-follower {
            width: 40px;
            height: 40px;
            background: white;
            border: 1px solid rgba(255,255,255,0.4);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 999999998;
            transform: translate(-50%, -50%);
            transition: 0.2s ease-out;
            backdrop-filter: blur(4px);
          }
        `}
            </style>
        </>
    );
}
