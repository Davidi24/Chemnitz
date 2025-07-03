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
        flex items-center gap-2
        bg-white
        rounded-md
        px-5 py-2.5
        shadow-md
        transition
        duration-150
        select-none
        group
        min-w-[120px]
        ${active ? "bg-[#ffe3d1]/80 border-[#df6c36]" : ""}
      `}
    >
      <FaHeart
        size={22}
        className={`
          drop-shadow-[0_1px_2px_rgba(223,108,54,0.16)]
          transition-colors  duration-200
          ${active ? "text-[#df6c36] scale-110" : "text-[#666666]"}
          group-hover:text-[#df6c36] group-hover:scale-110
        `}
      />
      <span className={`
        font-semibold text-base tracking-tight
        transition-colors whitespace-nowrap
        ${active ? "text-[#df6c36] underline" : "text-[#666666]"}
        group-hover:text-[#df6c36] group-hover:underline
      `}>
        Show Favourite
      </span>
    </button>
  );
}
