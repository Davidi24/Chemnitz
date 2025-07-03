import React from 'react';
import SimpleCard from '../Common/SimpleCard';
import ImageContainer from './ImageContainer';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
const data = [
    {
        icon: <ColorLensOutlinedIcon fontSize="large" />,
        title: 'Cultural Capital',
        description:
            'Named European Capital of Culture 2025, Chemnitz is becoming a hotspot for art, events, and creative spaces.',
    },
    {
        icon: <ConstructionOutlinedIcon fontSize="large" />,
        title: 'Industrial Heritage',
        description:
            'Once known as the Saxon Manchester, the city preserves its rich industrial roots through museums and architecture.',
    },
    {
        icon: <ForestOutlinedIcon fontSize="large" />,
        title: 'Green City',
        description:
            'From large parks to forest trails, Chemnitz offers plenty of nature right within and around the city.',
    },
    {
        icon: <SavingsOutlinedIcon fontSize="large" />,
        title: 'Affordable Stay',
        description:
            'Compared to bigger cities, Chemnitz offers lower costs for food, housing, and everyday living.',
    },
];

function About() {
    return (
        <div>
            <div className="flex flex-col justify-center h-[85rem] lg:flex-row lg:h-[45rem] lg:overflow-hidden">
                {/* Left Side - Text Section */}
                <div className="h-full flex items-center w-full lg:w-1/2 relative">
                <div className='absolute right-[-8rem] top-0  opacity-10 hidden lg:flex'>
                    <img src="/assets/image/about/bigplane.png" className='w-[30rem]' alt="" />
                </div>
                    <div>
                        <div className="px-1 -mt-12 flex flex-col items-center justify-center lg:items-start lg:text-left lg:tracking-wider">
                            <div className="flex gap-2 items-center">
                                <img
                                    src="/assets/image/about/plane.png"
                                    alt=""
                                    className="w-16"
                                />
                                <h4 className="text-[#df6c36] text-[20px] font-medium mb-2 tracking-wide mt-3">
                                    Top Destination —
                                </h4>
                            </div>

                            <div className="text-[50px] -mt-4 font-medium leading-[4rem] text-center lg:text-left md:text-[60px] xl:tracking-wider">
                                <p className="font-semibold text-[#152727] tracking-wide">
                                    Discover the
                                </p>
                                <p className="text-[#152727] min-w-full overflow-hidden text-ellipsis">
                                    <span className="text-[45px]">Best Destination</span>
                                </p>
                                <p className="text-[#152727]">in Chemnitz</p>
                            </div>

                            <div className="w-full mt-3 text-[14px] text-shadow flex items-center text-center md:w-[80%] lg:text-left lg:items-start">
                                <p className="mt-4 text-gray-500 font-normal mx-auto px-2 lg:mx-0">
                                    Let's find you dream destinations here we will recommend you a
                                    beautiful place and a cheap trip with your beloved family.
                                    Let's find you dream destinations here we will recommend you a
                                    beautiful place and a cheap trip with your beloved family.
                                </p>
                            </div>
                        </div>

                        <div className="w-full flex justify-center mt-6 sm:px-2 sm:pl-6">
                            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-2 max-w-2xl mx-auto xl:gap-6 xl:place-items-start">
                                {data.map((item, index) => (
                                    <SimpleCard key={index} item={item} />
                                ))}
                            </div>
                            <div className="items-center px-1 w-full lg:w-1/2 hidden md:flex lg:hidden">
                                <ImageContainer />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image Section */}
                <div className="flex items-center px-1 w-full lg:w-1/2 md:hidden lg:flex">
                    <ImageContainer />
                </div>
            </div>
        </div>
    );
}

export default About;
