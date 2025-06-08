import React from 'react'
import Image from 'next/image';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function About() {
    return (
        <div>
            <div className='flex h-[40rem] overflow-hidden'>
                <div className='w-1/2 h-full flex items-center'>
                    <div>
                        <div className='ml-10 -mt-12'>
                            <div className='flex gap-2 items-center'>
                                <img src="/assets/image/about/plane.png" alt="" className='w-16' />
                                <h4 className="text-[#df6c36] text-[20px]  font-medium mb-2 tracking-wide mt-3">
                                    Top Destination —
                                </h4>
                            </div>
                            <div className='text-[60px] -mt-4 font-medium leading-[4.5rem]'>
                                <p className='font-semibold text-[#152727]'>Discover the</p>
                                <p className='text-[#152727]'>Best Destination</p>
                                <p className='text-[#152727]'>in Chemnitz</p>
                            </div>
                            <div className='w-[80%] mt-3 text-[14px]  text-shadow'>
                                      <p className="mt-4 text-gray-400 font-normal max-w-xl mx-auto">
                                    Let's find you dream destinations here we will recommend you a
                                    beautiful place and a cheap trip with your beloved family.
                                    Let's find you dream destinations here we will recommend you a
                                    beautiful place and a cheap trip with your beloved family.
                                </p>
                            </div>
                        </div>
                        <div className='w-full flex justify-center'>
                            <div className='w-16 h-16 mt-8 rounded-full border-2 border-[#df6c36] flex items-center justify-center text-[#df6c36]'>
                                <ArrowDownwardIcon fontSize='large' />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-1/2 '>
                    <div className='flex'>
                        <div className='w-1/2'>
                            <div className='w-full flex justify-end pr-4'>
                                <Image
                                    src="/assets/image/about/img1.png"
                                    alt="Example Image"
                                    width={200}
                                    height={300}
                                    priority
                                    className='rounded-3xl '
                                />
                            </div>
                        </div>
                        <div className='w-1/2 flex items-end'>
                            <Image
                                src="/assets/image/about/img4.png"
                                alt="Example Image"
                                width={550}
                                height={400}
                                priority
                                className='rounded-3xl -mb-6 min-w-[25rem]'
                            />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-1/2 flex justify-end pr-4 pt-4'>
                            <Image
                                src="/assets/image/about/img3.png"
                                alt="Example Image"
                                width={280}
                                height={350}
                                priority
                                className='rounded-3xl max-h-[15rem] min-h-[15rem]'
                            />
                        </div>
                        <div className='w-1/2'> <Image
                            src="/assets/image/about/img2.png"
                            alt="Example Image"
                            width={250}
                            height={600}
                            priority
                            className='rounded-3xl min-h-[17rem] mt-10'
                        /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About