'use client';

import React from 'react';
import Popover from '@mui/material/Popover';

interface CustomPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomPopover({
  open,
  anchorEl,
  onClose,
  children,
}: CustomPopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{ sx: { p: 2, maxWidth: 350 } }}
    >
      {children}
    </Popover>
  );
}
