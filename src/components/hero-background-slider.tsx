"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type HeroBackgroundSlide = {
  title: string;
  image: string;
};

type HeroBackgroundSliderProps = {
  slides: HeroBackgroundSlide[];
};

export function HeroBackgroundSlider({ slides }: HeroBackgroundSliderProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[active];

  return (
    <>
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.image}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.36, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority={active === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-navy/78" />
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 gap-2 md:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            aria-label={`Show ${slide.title}`}
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full transition ${
              active === index ? "w-9 bg-aqua" : "w-2.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </>
  );
}
