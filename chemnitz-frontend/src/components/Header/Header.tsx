'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown from "../Common/LanguageDropDown";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from "../Common/Tooltip";
import LoginIcon from '@mui/icons-material/Login';
import HeaderItems from "./HeaderItems";
import { User } from "@/types/User";
import Menu from "../Common/Menu";
import { menuItemData } from "@/data/ComponentsData";

interface HeaderProps {
  user: User | null;
}

function Header({ user }: HeaderProps) {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
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

        <div className="hidden lg:flex gap-3 items-center">
          <HeaderItems menuItems={menuItemData} />
        </div>

        <div className="flex gap-3 items-center mt-2 sm:mt-0">
          <div className="cursor-pointer flex items-center">
            <Tooltip content="Login">
              {
                user ? <PersonIcon /> : <div onClick={handleLogin}><LoginIcon /></div>
              }
            </Tooltip>
          </div>
          <div className="cursor-pointer">
            <Tooltip content="Favourite Places">
              <FavoriteBorderIcon />
            </Tooltip>
          </div>
          <div></div>
          <div className="text-shadow hidden lg:block">
            <DropDown />
          </div>
          <div className="lg:hidden">
            <Menu menuItems={menuItemData} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
