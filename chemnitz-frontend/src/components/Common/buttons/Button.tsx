import React from 'react';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
}

function Button({
  label = 'Search',
  onClick,
  className = '',
  type = 'button',
  bgColor = '#df6c36',
  hoverColor = '#aa4e23',
  textColor = 'white',
}: ButtonProps) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`w-full h-full px-4 py-[0.4rem] focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-lg text-sm ${className}`}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = hoverColor;
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = bgColor;
        }}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
