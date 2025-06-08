'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";  // Make sure this is only used in client-side components
import DropDown from "./Common/DropDown";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from "./Common/Tooltip";
import LoginIcon from '@mui/icons-material/Login';
import { withOptionalUser, OptionalUserProps } from "@/utilities/OptionalUserProps ";

interface HeaderProps extends OptionalUserProps { }

function Header() {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter(); // Use useRouter inside a component that is client-rendered

  const handleLogin = () => {
    // router.push('/auth/login'); // Redirect to login page
  };

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
        absolute z-[500] right-0 left-0 
        transition-all duration-1000 ease-in-out 
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${isScrolled ? "h-[3rem]" : "h-[4rem]"}
      `}
    >
      <div className="w-full h-full flex justify-between items-center px-6 transition-all duration-500 text-[14px] text-white font-semibold">
        <div className="text-shadow flex items-end">
          <img src="/assets/icons/mainicon.png" alt="" className="h-8" />
          <p className="text-sm inline-block rounded-t-lg transition-colors">Chemnitz</p>
        </div>

        <HeaderItems />

        <div className="flex gap-3 items-center">
          <div className="cursor-pointer">
            {/* <Tooltip content="Login">
              {
                user ? <PersonIcon /> : <div onClick={handleLogin}><LoginIcon /></div>
              }
            </Tooltip> */}
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
  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    { label: 'Profile', target: 'profile' },
    { label: 'Dashboard', target: 'dashboard' },
    { label: 'Settings', target: 'settings' },
    { label: 'Contacts', target: 'contacts' },
    { label: 'Supertest', target: 'supertest' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offsets = menuItems.map((item) => {
        const el = document.getElementById(item.target);
        return el ? { id: item.target, offset: el.offsetTop } : null;
      }).filter(Boolean) as { id: string; offset: number }[];

      const scrollY = window.scrollY + 100;
      const current = offsets.reverse().find(({ offset }) => scrollY >= offset);
      if (current && current.id !== activeItem) {
        setActiveItem(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeItem, menuItems]);

  return (
    <div className="flex gap-8">
      <div className="text-sm font-medium text-center text-white">
        <ul className="flex flex-wrap">
          {menuItems.map(({ label, target }) => (
            <li key={target} className="me-2">
              <a
                href={`#${target}`}
                className={`inline-block p-4 rounded-t-lg transition-colors duration-200 cursor-pointer ${activeItem === target
                  ? 'text-[#df6c36]'
                  : 'hover:text-gray-300 text-white'
                  }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
