"use client"; 
import Image from 'next/image';
import React, { useEffect } from 'react';
import "../styles/cardcor.css";

import image1 from "@/../public/assets/image/img1.jpg";
import image2 from "@/../public/assets/image/img2.jpg";
import image3 from "@/../public/assets/image/img3.jpg";
import image4 from "@/../public/assets/image/img4.jpg";


function CardCorousel() {
    useEffect(() => {
        const nextDom = document.getElementById('next')!;
        const prevDom = document.getElementById('prev')!;
        const carouselDom = document.querySelector('.carousel')!;
        const SliderDom = carouselDom.querySelector('.carousel .list')!;
        const thumbnailBorderDom = document.querySelector('.carousel .thumbnail')!;
        const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
        const timeDom = document.querySelector('.carousel .time');

        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

        const timeRunning = 10000;
        const timeAutoNext = 10000;

        let runTimeOut: NodeJS.Timeout;
        let runNextAuto: NodeJS.Timeout;

        const showSlider = (type: 'next' | 'prev') => {
            const SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
            const thumbnailItems = thumbnailBorderDom.querySelectorAll('.item');

            if (type === 'next') {
                SliderDom.appendChild(SliderItemsDom[0]);
                thumbnailBorderDom.appendChild(thumbnailItems[0]);
                carouselDom.classList.add('next');
            } else {
                SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
                thumbnailBorderDom.prepend(thumbnailItems[thumbnailItems.length - 1]);
                carouselDom.classList.add('prev');
            }

            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carouselDom.classList.remove('next');
                carouselDom.classList.remove('prev');
            }, timeRunning);

            clearTimeout(runNextAuto);
            runNextAuto = setTimeout(() => {
                nextDom.click();
            }, timeAutoNext);
        };

        nextDom.onclick = () => showSlider("next");
        prevDom.onclick = () => showSlider("prev");
        runNextAuto = setTimeout(() => nextDom.click(), timeAutoNext);

        return () => {
            clearTimeout(runTimeOut);
            clearTimeout(runNextAuto);
        };
    }, []);


    return (
        <div>
            <div className="carousel">
                <div className="list">
                    <div className="item">
                        {/* <Image src="/assets/image/img1.jpg" alt=''/> */}
                                                <img src={image1.src} />
                        <div className="content">
                            <div className="author">LUNDEV</div>
                            <div className="title">DESIGN SLIDER</div>
                            <div className="topic">ANIMAL</div>
                            <div className="des">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                            </div>
                            <div className="buttons">
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={image2.src} />
                        <div className="content">
                            <div className="author">LUNDEV</div>
                            <div className="title">DESIGN SLIDER</div>
                            <div className="topic">ANIMAL</div>
                            <div className="des">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                            </div>
                            <div className="buttons">
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={image3.src} />
                        <div className="content">
                            <div className="author">LUNDEV</div>
                            <div className="title">DESIGN SLIDER</div>
                            <div className="topic">ANIMAL</div>
                            <div className="des">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                            </div>
                            <div className="buttons">
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={image4.src} />
                        <div className="content">
                            <div className="author">LUNDEV</div>
                            <div className="title">DESIGN SLIDER</div>
                            <div className="topic">ANIMAL</div>
                            <div className="des">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                            </div>
                            <div className="buttons">
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                         <div className="item">
                        <img src={image4.src} />
                        <div className="content">
                            <div className="author">LUNDEV</div>
                            <div className="title">DESIGN SLIDER</div>
                            <div className="topic">ANIMAL</div>
                            <div className="des">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                            </div>
                            <div className="buttons">
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="thumbnail">
                    <div className="item">
                        <img src={image1.src} />
                        <div className="content">
                            <div className="title">
                                Name Slider
                            </div>
                            <div className="description">
                                Description
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={image2.src} />
                        <div className="content">
                            <div className="title">
                                Name Slider
                            </div>
                            <div className="description">
                                Description
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={image3.src} />
                        <div className="content">
                            <div className="title">
                                Name Slider
                            </div>
                            <div className="description">
                                Description
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={image4.src} />
                        <div className="content">
                            <div className="title">
                                Name Slider
                            </div>
                            <div className="description">
                                Description
                            </div>
                        </div>
                    </div>
                       <div className="item">
                        <img src={image4.src} />
                        <div className="content">
                            <div className="title">
                                Name Slider
                            </div>
                            <div className="description">
                                Description
                            </div>
                        </div>
                    </div>
                </div>


                <div className="arrows">
                    <button id="prev"></button>
                    <button id="next"></button>
                </div>

                <div className="time"></div>
            </div>
        </div>
    );
}

export default CardCorousel;
