"use client";

import ContactUs from "@/components/ContactUs";
import Header from "@/components/Header";
import OurProducts from "@/components/OurProducts";
import OurWork from "@/components/OurWork";
import Testimonial from "@/components/Testimonial";
import ServicesSection from './../components/ServicesSection';
import BackToTop from "@/components/common/BackToTop";


export default function Home() {

  return (
    <>
      <div className="overflow-x-clip">
        <Header />
        <ServicesSection />
        <OurWork />
        <OurProducts />
        <Testimonial />
        <ContactUs />
        <BackToTop />
      </div>
    </>
  );
}
 