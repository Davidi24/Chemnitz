import type { SvgIconComponent } from '@mui/icons-material';

export type CardHeaderType = {
  name: string;
  icon: SvgIconComponent;
};

export type MenuItemType = {
  label: string;
  target: string;
  isSeparate?: boolean;
};

