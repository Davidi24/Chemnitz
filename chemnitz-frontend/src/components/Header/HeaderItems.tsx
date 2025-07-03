'use client';

import { useState } from "react";
import { MenuItemType } from "@/types/ComponetsType";

interface HeaderItemsProps {
  menuItems: MenuItemType[];
  activeItem: string;
  setActiveItem: (target: string) => void;
}

const HeaderItems = ({ menuItems, activeItem, setActiveItem }: HeaderItemsProps) => {


  const handleItemClick = (target: string) => {
    setActiveItem(target);

    // Try to scroll to the div with id=target
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex gap-8">
      <div className="text-sm font-medium text-center text-white">
        <ul className="flex flex-wrap">
          {menuItems.map(({ label, target, icon }) => (
            <li key={target} className="me-2">
              <button
                type="button"
                onClick={() => handleItemClick(target)}
                className={`p-4 rounded-t-lg transition-colors duration-200 cursor-pointer flex items-center gap-2 ${activeItem === target
                    ? "text-[#df6c36]"
                    : "hover:text-gray-300 text-white"
                  }`}
              >
                {icon && <span className="text-lg">{icon}</span>}
                <span className="mt-1">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderItems;
