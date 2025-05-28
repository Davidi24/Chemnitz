"use client";

import React, { useEffect, useState, useRef } from 'react';
import "../styles/cardcor.css";
import Transition from './Common/Transition';

import image1 from "@/../public/assets/image/img1.png";
import image2 from "@/../public/assets/image/img2.png";
import image3 from "@/../public/assets/image/img3.png";
import image4 from "@/../public/assets/image/img4.png";

export default function CardCorousel() {
    const slides = [
        {
            image: image1,
            author: "LUNDEV",
            title: "MOUNTAIN LIFE",
            topic: "NATURE",
            description: "Explore the serene beauty of mountain landscapes, fresh air, and peaceful nature all around."
        },
        {
            image: image2,
            author: "LUNDEV",
            title: "WILD WORLD",
            topic: "ANIMALS",
            description: "Get closer to wildlife and witness the raw beauty of nature’s most majestic creatures."
        },
        {
            image: image3,
            author: "LUNDEV",
            title: "CITY VIBES",
            topic: "URBAN",
            description: "Feel the rhythm of the city with lights, streets, and endless opportunities to discover."
        },
        {
            image: image4,
            author: "LUNDEV",
            title: "OCEAN CALLS",
            topic: "WATER",
            description: "Dive into the calm and powerful presence of the ocean and its vast blue horizons."
        },
        {
            image: image1,
            author: "LUNDEV",
            title: "MOUNTAIN LIFE",
            topic: "NATURE",
            description: "Explore the serene beauty of mountain landscapes, fresh air, and peaceful nature all around."
        },
        {
            image: image2,
            author: "LUNDEV",
            title: "WILD WORLD",
            topic: "ANIMALS",
            description: "Get closer to wildlife and witness the raw beauty of nature’s most majestic creatures."
        },
        {
            image: image3,
            author: "LUNDEV",
            title: "CITY VIBES",
            topic: "URBAN",
            description: "Feel the rhythm of the city with lights, streets, and endless opportunities to discover."
        },
        {
            image: image4,
            author: "LUNDEV",
            title: "OCEAN CALLS",
            topic: "WATER",
            description: "Dive into the calm and powerful presence of the ocean and its vast blue horizons."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const transitionLock = useRef(false);
    const timeRunning = 1000;

    function animateTransition(carouselDom: HTMLDivElement | null) {
        if (!carouselDom || transitionLock.current) return;
        transitionLock.current = true;
        carouselDom.classList.add('next');
        setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
            transitionLock.current = false;
        }, timeRunning);
    }

    useEffect(() => {
        const nextDom = document.getElementById('next') as HTMLButtonElement | null;
        const prevDom = document.getElementById('prev') as HTMLButtonElement | null;
        const carouselDom = carouselRef.current;

        if (!nextDom || !prevDom || !carouselDom) return;

        function updateSlider(idx: number) {
            if (!transitionLock.current) {
                setActiveIndex(idx);
                animateTransition(carouselDom);
            }
        }

        function showSlider(type: 'next' | 'prev') {
            if (transitionLock.current) return;
            let newIndex = activeIndex;
            newIndex = type === 'next' ? (activeIndex + 1) % slides.length : (activeIndex - 1 + slides.length) % slides.length;
            updateSlider(newIndex);
        }

        nextDom.onclick = () => showSlider('next');
        prevDom.onclick = () => showSlider('prev');
    }, [activeIndex, slides.length]);

    const getShiftedSlides = (index: number) => {
        const reordered = [...slides.slice(index + 1), ...slides.slice(0, index + 1)];
        return reordered;
    };

    const reorderedSlides = getShiftedSlides(activeIndex);
    const backgroundSlide = slides[activeIndex];

    return (
        <>


            <div className="carousel" ref={carouselRef}>
                <div className="list">
                    <div className="item" style={{ zIndex: 1 }}>
                        <img src={backgroundSlide.image.src} alt={`Slide`} />
                        <div className="content">
                            <div className="author">{backgroundSlide.author}</div>
                            <div className="title">{backgroundSlide.title}</div>
                            <div className="topic">{backgroundSlide.topic}</div>
                            <div className="des">{backgroundSlide.description}</div>
                            <div className="buttons">
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="thumbnail">
                    {reorderedSlides.map((slide, index) => {
                        const realIndex = slides.findIndex(s => s.image.src === slide.image.src);
                        const isSelected = realIndex === activeIndex;
                        const isFirst = index === 0;
                        return (
                            <div
                                className={`item ${index === reorderedSlides.length - 1 ? 'active' : ''} ${isFirst ? "h-[18rem] w-[13rem]" : "h-[14rem] w-[9rem]"}`}
                                key={index}
                                onClick={() => {
                                    if (!transitionLock.current) {
                                        setActiveIndex(realIndex);
                                        animateTransition(carouselRef.current);
                                    }
                                }}
                                style={{

                                    order: index,
                                    alignSelf: 'flex-end',
                                    marginBottom: '0'
                                }}
                            >
                                <Transition direction='up' _duration={0.5 + index} className='w-full h-full'>
                                    <img src={slide.image.src} alt={`Thumbnail ${index + 1}`} />

                                    <div className="content">
                                        <div className="title">{slide.title}</div>
                                        <div className="description">{slide.topic}</div>
                                    </div>
                                </Transition>
                            </div>
                        );
                    })}
                </div>

                <div className="arrows">
                    <button id="prev">&lt;</button>
                    <button id="next">&gt;</button>
                </div>

                <div className="time"></div>
            </div>
        </>
    );
}
