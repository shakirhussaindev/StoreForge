import FeaturedItems from "@/components/home/FeaturedItems";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Features/>
      <FeaturedItems/>
      <Testimonials/>
      <PromoBanner/>
    </div>
  );
}
