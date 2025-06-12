'use client';

import {  useState } from "react";
import Link from "next/link";
import { MenuItemType } from "@/types/ComponetsType";

interface HederItemsProps {
  menuItems: MenuItemType[]
}

const HeaderItems = ({menuItems} : HederItemsProps) => {
  const [activeItem, setActiveItem] = useState('profile');



  const handleItemClick = (target: string) => {
    setActiveItem(target);
  };

  return (
    <div className="flex gap-8">
      <div className="text-sm font-medium text-center text-white">
        <ul className="flex flex-wrap">
          {menuItems.map(({ label, target }) => (
            <li key={target} className="me-2">
              <Link
                href={`#${target}`}
                onClick={() => handleItemClick(target)}
                className={`inline-block p-4 rounded-t-lg transition-colors duration-200 cursor-pointer ${
                  activeItem === target
                    ? 'text-[#df6c36]'
                    : 'hover:text-gray-300 text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderItems;
