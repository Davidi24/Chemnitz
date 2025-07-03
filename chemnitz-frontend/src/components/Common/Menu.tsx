"use client";
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { HeaderDataType } from '@/types/ComponetsType';

interface MenuProps {
    headerData: HeaderDataType[];
    MenuIconComponent: ReactNode;
    position?: 'left' | 'right';
    backgroundColor?: string;   // e.g., 'bg-red-600'
    textColor?: string;         // e.g., 'text-white'
    selectedColor?: string;     // e.g., 'text-[#df6c36]'
    onCategoryChange: (category: string, idx: number) => void;
    selectedIndex: number;
}

function Menu({
    headerData,
    MenuIconComponent,
    position = 'right',
    backgroundColor = 'bg-gray-800',
    textColor = 'text-white',
    selectedColor = 'text-[#df6c36]',
    onCategoryChange,
    selectedIndex
}: MenuProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const handleItemClick = (target: string, idx: number) => {
        onCategoryChange(target.toLowerCase(), idx);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const positionClass = position === 'left' ? 'left-0' : 'right-0';

    return (
        <div className="relative z-50" ref={menuRef}>
            <button
                className="inline-flex items-center text-sm font-medium text-center"
                onClick={toggleDropdown}
            >
                {MenuIconComponent}
            </button>

            <div
                className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} 
                absolute top-full ${positionClass} mt-2 backdrop-filter bg-black opacity-90 rounded-lg shadow-sm w-56
                ${backgroundColor} transition-all duration-300`}
            >
                <ul className="py-2">
                    {headerData.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.name}>
                                <button
                                    type="button"
                                    onClick={() => handleItemClick(item.name, idx)}
                                    className={`w-full text-left block px-4 py-2 transition-colors duration-200 
                                        ${selectedIndex === idx ? selectedColor : `${textColor} hover:text-gray-300`}`}
                                >
                                    <div className='flex items-center gap-3 whitespace-nowrap'>
                                        {Icon && <Icon fontSize="small" className="opacity-90" />}
                                        <div>{item.name.replace('_', ' ')}</div>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Menu;
