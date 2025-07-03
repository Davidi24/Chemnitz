import React from 'react';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
  disabled?: boolean;
}

function Button({
  label = 'Search',
  onClick,
  className = '',
  type = 'button',
  bgColor = '#df6c36',
  hoverColor = '#aa4e23',
  textColor = 'white',
  disabled = false,
}: ButtonProps) {
  const disabledBgColor = '#f3b697'; 

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`
          w-full h-full px-4 py-[0.4rem]
          focus:ring-4 focus:outline-none focus:ring-transparent
          font-medium rounded-lg text-sm
          ${className}
          disabled:cursor-not-allowed
        `}
        style={{
          backgroundColor: disabled ? disabledBgColor : bgColor,
          color: textColor,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        disabled={disabled}
        onMouseEnter={(e) => {
          if (!disabled) (e.target as HTMLButtonElement).style.backgroundColor = hoverColor;
        }}
        onMouseLeave={(e) => {
          if (!disabled) (e.target as HTMLButtonElement).style.backgroundColor = bgColor;
        }}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
