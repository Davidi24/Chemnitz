import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content = 'Tooltip' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>

      {showTooltip && (
        <div
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 px-3 py-2 text-sm font-medium text-white backdrop-blur-3xl rounded-lg shadow opacity-100"
        >
          {content}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
