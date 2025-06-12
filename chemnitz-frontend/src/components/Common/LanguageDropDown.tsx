import React, { useState, useRef, useEffect } from 'react';
type DropDownProps = {
  setCheckIfOpen?: (isOpen: boolean) => void;
};

function DropDown({ setCheckIfOpen }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
    if (setCheckIfOpen) {
      setCheckIfOpen(isOpen);
    }
  }, [isOpen, setCheckIfOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  const alternativeLanguage = selectedLanguage === "English" ? "German" : "English";

  return (
    <div className="relative inline-block w-fit" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-white border border-white focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center"
        type="button"
      >
        {selectedLanguage}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 border rounded-lg shadow-sm min-w-full">
          <ul className="py-2 text-sm text-white ">
            <li>
              <button
                onClick={() => handleLanguageChange(alternativeLanguage)}
                className="block w-full text-left px-4  hover:text-[#df6c36]"
              >
                {alternativeLanguage}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDown;
