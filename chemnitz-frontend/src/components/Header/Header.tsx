"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown from "../Common/LanguageDropDown";
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from "../Common/Tooltip";
import LoginIcon from '@mui/icons-material/Login';
import HeaderItems from "./HeaderItems";
import { User } from "@/types/User";
import CustomMenu from "../Common/CustomMenu";
import { menuItemData } from "@/data/ComponentsData";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useUser } from "../Auth";

interface HeaderProps {
  user?: User | null;
}

function Header({ user }: HeaderProps) {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeItem, setActiveItem] = useState<string>("home");

  const open = Boolean(anchorEl);
  const router = useRouter();

  const { user: contextUser, setUser } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
      ) {
        setActiveItem(menuItemData[menuItemData.length - 1].target);
        return;
      }

      let closest = menuItemData[0].target;
      let minDistance = Infinity;

      for (const { target } of menuItemData) {
        const section = document.getElementById(target);
        if (section) {
          const rect = section.getBoundingClientRect();
          // You can tune the offset (e.g., 100) if you have a sticky header
          const distance = Math.abs(rect.top - 100);
          if (rect.top <= 100 && distance < minDistance) {
            minDistance = distance;
            closest = target;
          }
        }
      }
      setActiveItem(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null); // Update context
      localStorage.removeItem("user");
      window.location.href = '/'; // or router.refresh();
    } catch (err: any) {
      console.log(err.message || 'Logout failed');
    }
  };

  return (
    <div>
      <div
        className={`
          hidden fixed top-2 left-1/2 -translate-x-1/2 z-[2000]
          lg:flex justify-center items-center
          transition-all duration-500
          ${isScrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
          }
        `}
        style={{ minWidth: 140 }}
      >
        <div className="bg-black bg-opacity-60 rounded-full px-4  shadow-xl flex items-center gap-3 backdrop-blur-sm">
          <HeaderItems menuItems={menuItemData} activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
      </div>

      <header
        className={` w-full z-[500] right-0 left-0 transition-all duration-1000 ease-in-out
    ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
    ${isScrolled
            ? "h-[3rem] bg-black bg-opacity-80 fixed shadow-[0_8px_24px_-6px_rgba(0,0,0,0.38)] lg:absolute"
            : "h-[4rem] fixed"}`}
      >


        <div className="flex w-full h-full justify-between items-center px-6 transition-all duration-500 text-[14px] text-white font-semibold">
          <div className="text-shadow flex items-end">
            <img src="/assets/icons/mainicon.png" alt="" className="h-8" />
            <p className="text-sm inline-block rounded-t-lg transition-colors">Chemnitz</p>
          </div>

          <div className="hidden lg:flex gap-3 items-center">
            <HeaderItems menuItems={menuItemData} activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>

          <div className="flex gap-3 items-center mt-2 sm:mt-0">
            <div className="cursor-pointer flex items-center">
              <Tooltip content={`${contextUser ? 'User Profile' : 'Login'}`}>
                {
                  contextUser
                    ? <div onClick={() => { router.push("/user/profile") }}><PersonIcon /></div>
                    : <div onClick={handleLogin}><LoginIcon /></div>
                }
              </Tooltip>
            </div>
            <div className="cursor-pointer">
              {contextUser && (
                <Tooltip content="logout">
                  <div onClick={handleLogout}>
                    <LogoutOutlinedIcon />
                  </div>
                </Tooltip>
              )}
            </div>
            <div className="text-shadow hidden lg:block">
              <DropDown />
            </div>
            <div className="lg:hidden">
              <CustomMenu menuItems={menuItemData}  activeItem={activeItem} setActiveItem={setActiveItem}/>
            </div>
          </div>
        </div>
      </header>
    </div >
  );
}

export default Header;
