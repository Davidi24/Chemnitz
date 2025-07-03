import Image from 'next/image';

function ImageContainer() {
    return (
        <div className=''>
            <div className='flex'>
                <div className='w-1/2'>
                    <div className='w-full flex justify-end'>
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
                        className='rounded-3xl -mb-6 min-w-[11rem] min-h-[13rem] pl-3 lg:min-w-[20rem]'
                    />
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/2 flex justify-end pr-2 pt-4'>
                    <Image
                        src="/assets/image/about/img3.png"
                        alt="Example Image"
                        width={280}
                        height={350}
                        priority
                        className='rounded-3xl max-h-[13rem] min-h-[13rem]'
                    />
                </div>
                <div className='w-1/2'> <Image
                    src="/assets/image/about/img2.png"
                    alt="Example Image"
                    width={250}
                    height={600}
                    priority
                    className='rounded-3xl min-h-[15rem] pl-1 mt-10'
                /></div>
            </div>
        </div>
    )
}

export default ImageContainer