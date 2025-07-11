'use client';
import { FaHeart } from 'react-icons/fa';

interface FavouriteButtonProps {
  active: boolean;
  onClick: () => void;
}

export default function FavouriteButton({ active, onClick }: FavouriteButtonProps) {
  return (
    <button
      type="button"
      aria-label={active ? "Favourited" : "Favourite"}
      onClick={onClick}
      className={`
        flex items-center gap-1
        bg-white
        rounded-md
        px-3 py-3
        shadow
        transition
        duration-150
        select-none
        group
        min-w-[70px]
        border
        ${active ? "bg-[#ffe3d1]/80 border-[#df6c36]" : "border-gray-200"}
      `}
    >
      <FaHeart
        size={18}
        className={`
          transition-colors duration-200
          ${active ? "text-[#df6c36] scale-110" : "text-[#666666]"}
          group-hover:text-[#df6c36] group-hover:scale-110
        `}
      />
      <span className={`
        font-semibold text-xs tracking-tight
        transition-colors whitespace-nowrap
        ${active ? "text-[#df6c36] underline" : "text-[#666666]"}
        group-hover:text-[#df6c36] group-hover:underline
      `}>
        Fav
      </span>
    </button>
  );
}
