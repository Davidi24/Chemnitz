import React, { useState, useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import DropDown from './LanguageDropDown';
import { MenuItemType } from '@/types/ComponetsType';

interface MenuProps {
    menuItems: MenuItemType[];
    activeItem: string;
    setActiveItem: (target: string) => void;
}

function CustomMenu({ menuItems, activeItem, setActiveItem }: MenuProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [isDropDownOpen, setisDropDownOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const handleItemClick = (target: string) => {
        setActiveItem(target);
        setIsDropdownOpen(false);
        const el = document.getElementById(target);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="relative" ref={menuRef}>
            <button
                className="inline-flex items-center p-2 text-sm font-medium text-center"
                onClick={toggleDropdown}
            >
                <MenuIcon />
            </button>

            <div
                className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} 
                absolute top-full right-0 mt-2 bg-black opacity-90
                divide-y  rounded-lg shadow-sm w-44 
                ${isDropDownOpen ? "h-[16rem]" : "h-[13rem]"}`}
            >
                <ul className="py-2">
                    {menuItems.map((item) => (
                        <React.Fragment key={item.target}>

                            <li>
                                <Link
                                    href={`#${item.target}`}
                                    onClick={() => handleItemClick(item.target)}
                                    className={`block px-4 py-2 transition-colors duration-200 
            ${activeItem === item.target
                                            ? 'text-[#df6c36]'
                                            : 'hover:text-gray-300 text-white'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        </React.Fragment>
                    ))}
                    <div className="py-2 border-t border-gray-700 px-4">
                        <DropDown setCheckIfOpen={setisDropDownOpen} />
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default CustomMenu;
