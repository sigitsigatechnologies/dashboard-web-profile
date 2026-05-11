"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroSliderProps {
    images: string[];
}

export function HeroSlider({ images }: HeroSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full h-full group">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute inset-0 transition-all duration-1000 ease-in-out",
                        index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                    )}
                >
                    <Image
                        src={image}
                        alt={`School Hero ${index + 1}`}
                        fill
                        className="object-cover mix-blend-multiply opacity-90"
                        priority={index === 0}
                        unoptimized
                    />
                </div>
            ))}
            
            {/* Slider Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                index === currentIndex 
                                    ? "w-8 bg-primary" 
                                    : "w-2 bg-white dark:bg-slate-950/40 hover:bg-white dark:bg-slate-950/60"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
