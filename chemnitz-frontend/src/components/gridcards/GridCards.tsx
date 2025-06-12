import React from 'react'
import CardHeader from './CardHeader'
import { headerData } from '@/data/ComponentsData';
import CardContainer from './CardContainer';

function GridCards() {
  const cardsArray = Array.from({ length: 6 });

  return (
    <div>


      <div className="text-center text-[16px] font-semibold px-4">
        <h4 className="text-[#df6c36] text-[20px]  font-medium mb-2 tracking-wide">
          Top Destination —
        </h4>

        <h1 className="text-3xl md:text-[40px] font-semibold text-[] leading-tight text-gray-700">
          <span className="text-[#152727]">    Let&apos;s Explore</span> Your Dream <br />
          <p className='mt-1'>   Destination Here!</p>
        </h1>

        <p className="mt-4 text-gray-400 text[12px] font-normal max-w-xl mx-auto">
          We have recommended popular destinations every week so you don&apos;t have to worry about your dream destination with travel.
        </p>
      </div>

      <br />
      <div className=' px-4 '>  <CardHeader headerData={headerData} /></div>
      <br />
      <br />
      <div className="grid lg:grid-cols-3 grid-cols-1 justify-items-center gap-6 gap-y-16">
        {cardsArray.map((_, index) => (
          <CardContainer key={index} />
        ))}
      </div>

    </div>
  );
}

export default GridCards;
