"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/styles/cardcor.css";

import image1 from "@/../public/assets/image/img1.png";
import image2 from "@/../public/assets/image/img2.png";
import image3 from "@/../public/assets/image/img3.png";
import image4 from "@/../public/assets/image/img4.png";
import Transition from "./Common/Transition";

const originalSlides = [
    {
        image: image1,
        author: "LUNDEV",
        title: "MOUNTAIN LIFE",
        topic: "NATURE",
        description:
            "Explore the serene beauty of mountain landscapes, fresh air, and peaceful nature all around.",
    },
    {
        image: image2,
        author: "LUNDEV",
        title: "WILD WORLD",
        topic: "ANIMALS",
        description:
            "Get closer to wildlife and witness the raw beauty of nature’s most majestic creatures.",
    },
    {
        image: image3,
        author: "LUNDEV",
        title: "CITY VIBES",
        topic: "URBAN",
        description:
            "Feel the rhythm of the city with its vibrant culture, nightlife, and architectural marvels.",
    },
    {
        image: image4,
        author: "LUNDEV",
        title: "OCEAN DEEP",
        topic: "SEA",
        description:
            "Dive into the mysteries of the ocean and discover the hidden world beneath the waves.",
    },
    {
        image: image1,
        author: "LUNDEV",
        title: "MOUNTAIN LIFE",
        topic: "NATURE",
        description:
            "Explore the serene beauty of mountain landscapes, fresh air, and peaceful nature all around.",
    },
    {
        image: image2,
        author: "LUNDEV",
        title: "WILD WORLD",
        topic: "ANIMALS",
        description:
            "Get closer to wildlife and witness the raw beauty of nature’s most majestic creatures.",
    },
    {
        image: image3,
        author: "LUNDEV",
        title: "CITY VIBES",
        topic: "URBAN",
        description:
            "Feel the rhythm of the city with its vibrant culture, nightlife, and architectural marvels.",
    },
    {
        image: image4,
        author: "LUNDEV",
        title: "OCEAN DEEP",
        topic: "SEA",
        description:
            "Dive into the mysteries of the ocean and discover the hidden world beneath the waves.",
    },
];

export default function CardCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const thumbnailRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const autoNextRef = useRef<NodeJS.Timeout | null>(null);

    const timeRunning = 1000;
    const timeAutoNext = 7000;

    const [slides, setSlides] = useState(originalSlides);

    // Rotated version for thumbnails: [2, 3, 4, 1]
    const slideCopy = [...slides.slice(1), slides[0]];

    const showSlider = (type: "next" | "prev") => {
        const list = listRef.current;
        const thumbnails = thumbnailRef.current;
        if (!list || !thumbnails || !carouselRef.current) return;

        const items = list.querySelectorAll(".item");
        const thumbs = thumbnails.querySelectorAll(".item");

        if (type === "next") {
            list.appendChild(items[0]);
            thumbnails.appendChild(thumbs[0]);
            carouselRef.current.classList.add("next");
        } else {
            list.insertBefore(items[items.length - 1], items[0]);
            thumbnails.insertBefore(thumbs[thumbs.length - 1], thumbs[0]);
            carouselRef.current.classList.add("prev");
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            carouselRef.current?.classList.remove("next");
            carouselRef.current?.classList.remove("prev");
        }, timeRunning);

        if (autoNextRef.current) clearTimeout(autoNextRef.current);
        autoNextRef.current = setTimeout(() => {
            showSlider("next");
        }, timeAutoNext);
    };

    useEffect(() => {
        autoNextRef.current = setTimeout(() => {
            showSlider("next");
        }, timeAutoNext);
        return () => {
            if (autoNextRef.current) clearTimeout(autoNextRef.current);
        };
    }, []);

    return (
        <div className="carousel" ref={carouselRef}>
              <div className="absolute left-0 right-0 top-0 h-64 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10"></div>
            <div className="list" ref={listRef}>
                {slides.map((slide, index) => (
                    <div className="item" key={`slide-${index}`}>
                        

                        <img src={slide.image.src} alt={slide.title} />
                        <div className="content">
                            <div className="author">{slide.author}</div>
                            <div className="title">{slide.title}</div>
                            <div className="topic">{slide.topic}</div>
                            <div className="des">{slide.description}</div>
                            <div className="buttons">
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="thumbnail items-end" ref={thumbnailRef}>
                {slideCopy.map((slide, index) => (

                    <div
                        key={`thumb-${index}`}
                        className="item w-[10rem] h-[14rem] first:w-[14rem] first:h-[18rem] transition-all duration-1000 ease-in-out first:cursor-pointer"
                        ref={(el) => {
                            if (el && index === 0) {
                                el.dataset.index = index.toString();
                            }
                        }}
                        onClick={(e) => {
                            const thumbnailParent = thumbnailRef.current;
                            const firstThumbnail = thumbnailParent?.querySelector(".item");
                            const isFront = firstThumbnail === e.currentTarget;
                            if (isFront) showSlider("next");
                        }}
                    >
                        <Transition direction="up" _duration={0.2 + (index / 3)} className='w-full h-full'>
                            <img src={slide.image.src} alt={slide.title} />
                            <div className="content">
                                <div className="title">{slide.title}</div>
                                <div className="description">{slide.topic}</div>
                            </div>
                        </Transition>
                    </div>

                ))}
            </div>





            <div className="arrows">
                <button id="prev" onClick={() => showSlider("prev")}>
                    &lt;
                </button>
                <button id="next" onClick={() => showSlider("next")}>
                    &gt;
                </button>
            </div>

            <div className="time"></div>
        </div >
    );
}
