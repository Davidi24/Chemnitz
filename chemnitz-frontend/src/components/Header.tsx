"use client";
import { useEffect, useState } from "react";
import DropDown from "./Common/DropDown";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from "./Common/Tooltip";

function Header() {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed z-[500] right-0 left-0 
        transition-all duration-1000 ease-in-out 
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${isScrolled ? "h-[3rem] shadow-lg backdrop-blur-md" : "h-[4rem]"}
      `}
    >
      <div className="w-full h-full flex justify-between items-center px-6 transition-all duration-500 text-[14px] text-white font-semibold">
        <div className="text-shadow flex items-end">
          <img src="/assets/icons/mainicon.png" alt="" className=" h-8"/>
          <p className="text-sm inline-block  rounded-t-lg transition-colors">Chemnitz</p>
        </div>
        <HeaderItems />
        <div className="flex gap-3 items-center">
          <div className="cursor-pointer">
            <Tooltip content="Login">
              <PersonIcon />
            </Tooltip>
          </div>
          <div className="cursor-pointer">
            <Tooltip content="Favourite Places">
              <FavoriteBorderIcon />
            </Tooltip>
          </div>
          <div></div>
          <div className="text-shadow">

            <DropDown />
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;


const HeaderItems = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const menuItems = ['Profile', 'Dashboard', 'Settings', 'Contacts', 'supertest'];

  return (
    <div className="flex gap-8">
      <div className="text-sm font-medium text-center text-white">
        <ul className="flex flex-wrap">
          {menuItems.map((item) => (
            <li key={item} className="me-2">
              <a
                className={`inline-block p-4 rounded-t-lg transition-colors duration-200 cursor-pointer ${
                  activeItem === item
                    ? 'text-[#df6c36]'
                    : 'hover:text-gray-300 text-white'
                }`}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
