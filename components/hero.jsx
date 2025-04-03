
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

 import Link from "next/link";
const HeroSection = () => {


 
  return (
    <section className="w-full pt-36 md:pt-40 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight animate-in fade-in duration-1000 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] text-[rgba(255,255,255,0.9)] text-opacity-90">
            Your AI Career Pilot <br /> For Your Career
          </h1>
          <p>
            Get personalized career advice and insights from top industry
            expert and make resume and cover letter with AI.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
            <div className="hero-image">
                <Image src={"/banner.jpg"} alt="banner" className="rounded-lg shadow-2xl border mx-auto" priority width={1200} height={1280} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
