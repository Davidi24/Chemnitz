"use client";
import { CardHeaderType } from '@/types/ComponetsType';
import React, { useState } from 'react';
import Button from '../Common/buttons/Button';

type Props = {
    headerData: CardHeaderType[];
};

function CardHeader({ headerData }: Props) {
    const [activeTab, setActiveTab] = useState(headerData[0].name);

    return (
        <div className="w-full h-full flex justify-between items-center transition-all duration-500 text-[14px] text-white font-semibold">
            <div className="border-b border-gray-200 ">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
                    {headerData.map(({ name, icon: Icon }) => (
                        <li key={name} className="me-2">
                            <button
                                onClick={() => setActiveTab(name)}
                                className={`inline-flex items-center justify-center p-4 rounded-t-lg border-b-2 group ${activeTab === name
                                    ? 'text-[#df6c36] border-[#df6c36] '
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                                    }`}
                            >
                                {Icon && (
                                    <Icon
                                        className={`w-4 h-4 me-2 ${activeTab === name
                                            ? 'text-[#df6c36] '
                                            : 'text-gray-400 group-hover:text-gray-500 '
                                            }`}
                                    />
                                )}
                                {name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-2 ">

                <div className="min-w-[20rem] mx-auto w-full ">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-500 sr-only ">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full px-4 py-3 ps-10 text-sm text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-500  focus:ring-0 focus:outline-none" placeholder="Search places" />
                        <div className='absolute end-[-5px] bottom-1.5   px-3 overflow-hidden'>
                            <Button
                                label="Search"
                                bgColor="#df6c36"
                                hoverColor="#aa4e23"
                                textColor="#ffffff"
                                onClick={() => console.log('Clicked')}
                            />

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CardHeader;
