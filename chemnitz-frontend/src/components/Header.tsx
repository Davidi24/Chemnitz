"use client";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import Transition from "./Common/Transition";
import { icons } from "@/data/IconData";

function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header
        className={`
          px-6 fixed text-white z-[500] right-0 left-0 h-[3rem]
          transform transition-all duration-700 ease-out
          ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        `}
      >
        djdjhhfh
      </header>
    </>
  );
}

export default Header;
