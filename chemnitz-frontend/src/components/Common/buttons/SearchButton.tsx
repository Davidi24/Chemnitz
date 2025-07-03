import React from 'react'
import Button from './Button'

function SearchButton() {
    return (
        <div className="min-w-full mx-auto w-full">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-500 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full px-4 py-3 ps-10 text-sm text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-500 focus:ring-0 focus:outline-none"
                    placeholder="Search places"
                />
                <div className="absolute end-[-5px] bottom-1.5 px-3 overflow-hidden">
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
    )
}

export default SearchButton
