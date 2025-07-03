"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/styles/cardcor.css";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import image1 from "@/../public/assets/image/img1.png";
import image2 from "@/../public/assets/image/img2.png";
import image3 from "@/../public/assets/image/img3.png";
import image4 from "@/../public/assets/image/img4.png";
import image5 from "@/../public/assets/image/img5.png";
import image6 from "@/../public/assets/image/img6.png";
import image7 from "@/../public/assets/image/img7.png";
import image8 from "@/../public/assets/image/img8.png";
import Transition from "./Common/Transition";

const chemnitzSlides = [
    {
        image: image1, // Replace with a warm welcoming image
        title: "WELCOME TO CHEMNITZ",
        topic: "Germany",
        tagline: "Dream, Explore, Belong",
        description:
            "Welcome to Chemnitz — a city where innovation meets culture, and every corner invites discovery. It's not just a place, it's a feeling of possibility, creativity, and connection.",
    },
    {
        image: image2,
        title: "HEART OF CREATIVITY",
        topic: "CULTURE",
        tagline: "Creative, Bold, Alive",
        description:
            "Chemnitz blends creativity, history, and innovation. As the European Capital of Culture 2025, it offers rich events, vibrant museums, and diverse architecture. The city continues to grow as a hub of expression and identity.",
    },
    {
        image: image3,
        title: "ART HISTORY",
        topic: "MUSEUMS",
        tagline: "Explore, Learn, Enjoy",
        description:
            "From industrial exhibits to fine art and local history, Chemnitz museums offer something for every explorer. Institutions like the Kunstsammlungen and Museum Gunzenhauser add layers of depth to the city’s story.",
    },
    {
        image: image4,
        title: "GREEN SPACES",
        topic: "PARKS",
        tagline: "Breathe and Relax",
        description:
            "Küchwald, Schlossteich, and other green spaces offer fresh air, walking paths, and family relaxation in the heart of Chemnitz. Nature and city life blend effortlessly here.",
    },
    {
        image: image5,
        title: "FAMOUS MONUMENT",
        topic: "LANDMARK",
        tagline: "Bold and Historic",
        description:
            "The 7-meter Karl Marx bust is Chemnitz’s most iconic symbol and a reminder of its past identity as Karl-Marx-Stadt. Visitors come from around the world to see this monumental presence.",
    },
    {
        image: image6,
        title: "ARCHITECTURAL CHARM",
        topic: "BUILDINGS",
        tagline: "Old Meets New",
        description:
            "Chemnitz’s unique architecture blends historical charm with modern design. From medieval churches to contemporary buildings, the city offers a visual journey through time.",
    },
    {
        image: image7,
        title: "STUDENT LIFE",
        topic: "EDUCATION",
        tagline: "Young, Bold, Creative",
        description:
            "A rising tech scene, student life, cafés, and modern culture make Chemnitz a city full of life and new ideas. It's a place where young minds thrive and communities evolve.",
    }, {
        image: image8,
        title: "PEACEFUL LIVING",
        topic: "FAMILY",
        tagline: "Quiet, Family-Friendly",
        description:
            "Chemnitz is an ideal place for raising a family. With its safe environment, well-kept parks, and great schools, the city offers a perfect balance of tranquility and modern living.",
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

    const [slides, setSlides] = useState(chemnitzSlides);

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
        <div className="carousel relative" ref={carouselRef}>
            <div className="absolute left-0 right-0 top-0 h-64 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10"></div>
            <div className="list " ref={listRef}>
                {slides.map((slide, index) => (
                    <div className="item" key={`slide-${index}`}>


                        <img src={slide.image.src} alt={slide.title} />
                        <div className="content px-4 py-6">
                            <div className="custum-shadow absolute w-[60rem] h-[50rem] bg-[radial-gradient(circle,_rgba(0,0,0,0.6)_0%,_transparent_70%)] -mt-[12rem] -ml-[15rem] rounded-full"></div>
                            <div className="author">{slide.tagline}</div>
                            <div className="title mt-1">{slide.title}</div>
                            <div className="topic mt-1">{slide.topic}</div>
                            <div className="des max-w-[60%] lg:max-w-[97%] mb-4 mt-4 flex justify-center font-medium"
                                style={{ fontSize: "14px" }}
                            >
                                {slide.description}
                            </div>
                            <div className="buttons mt-9 border border-white ">
                                <button className="border-white">SUBSCRIBE</button>
                                <NotificationsActiveOutlinedIcon />
                            </div>


                            <div className="flex gap-8 z-[50000000] mt-[2rem]  curaselchanger relative
            ">
                                <button className="bg-gray-500 bg-opacity-75  p-2 rounded-full cursor-pointer hover:bg-white hover:text-black" id="prev" onClick={() => showSlider("prev")}>
                                    <NavigateBeforeIcon />
                                </button>
                                <button className="bg-gray-500 bg-opacity-75  p-2 rounded-full  cursor-pointer hover:bg-white hover:text-black" id="next" onClick={() => showSlider("next")}>
                                    <NavigateNextIcon />
                                </button>

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
                            <div className="absolute rounded-[20px] bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-black/85 to-transparent" />
                            <img src={slide.image.src} alt={slide.title} />
                            <div className="content">
                                <div className="title">{slide.title}</div>
                                <div className="description">{slide.topic}</div>
                            </div>
                        </Transition>
                    </div>

                ))}
            </div>







            <div className="time"></div>
        </div >
    );
}