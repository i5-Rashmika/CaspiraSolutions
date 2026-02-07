"use client";

import { useState, useEffect } from "react";
import BackToTop from "@/components/BackToTop";
import ContactUs from "@/components/ContactUs";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import OurProducts from "@/components/OurProducts";
import OurServices from "@/components/OurServices";
import OurWork from "@/components/OurWork";
import Testimonial from "@/components/Testimonial";

export default function Home() {
    const [loadingDone, setLoadingDone] = useState(false);

    useEffect(() => {
        // If no loader is shown, dispatch pageLoaded immediately
        if (!loadingDone) {
            const timer = setTimeout(() => {
                window.dispatchEvent(new Event("pageLoaded"));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [loadingDone]);

    return (
        <>
            {!loadingDone && <Loader onFinish={() => setLoadingDone(true)} />}

            <div className={loadingDone ? "block" : "hidden"}>
                <Header />
                <OurServices />
                <OurWork />
                <OurProducts />
                <Testimonial />
                <ContactUs />
                <BackToTop />
            </div>
        </>
    );
}