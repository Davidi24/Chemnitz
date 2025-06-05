import React from 'react'
import Image from 'next/image';

function About() {
    return (
        <div>
            <div className='flex h-[40rem] overflow-hidden'>
                <div className='w-1/2 '>1</div>
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