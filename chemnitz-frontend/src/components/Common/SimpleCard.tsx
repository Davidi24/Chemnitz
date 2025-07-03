import React from 'react';

function SimpleCard({ item }) {
  return (
    <div className="flex items-center gap-2  pl-0">
      <div className="text-[#6c6e62] opacity-60">{item.icon}</div>
      <div>
        <div className="font-semibold text-md opacity-70 text-[#df6c36] whitespace-nowrap">
          {item.title}
        </div>
        <div className="text-xs text-gray-400 font-normal">
          {item.description}
        </div>
      </div>
    </div>
  );
}

export default SimpleCard;
