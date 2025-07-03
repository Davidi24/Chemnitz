import React from 'react';
import Menu from './Common/Menu';
import ScrollableTabsButtonAuto from './Common/Tabs';
import MenuIcon from '@mui/icons-material/Menu';
import Search from './Common/Search';
import FavouriteButton from './Common/buttons/FavouriteButton';
import { headerData } from '@/data/FeatureData';

interface Props {
  onCategoryChange: (category: string, idx?: number) => void;
  handleSetFeature: (featureId: string) => void;
  selectedIndex: number;
  showFavourites: boolean;
  onShowFavourites: () => void;
  searchResetSignal: number;
}

function MapHeader({
  onCategoryChange,
  handleSetFeature,
  selectedIndex,
  showFavourites,
  onShowFavourites,
  searchResetSignal,
}: Props) {
  return (
    <div className="w-full h-full flex justify-between items-center text-[14px] text-white font-semibold">
      <div className="border-gray-200 hidden xl:block">
        <ScrollableTabsButtonAuto
          onCategoryChange={onCategoryChange}
          headerData={headerData}
          selectedIndex={selectedIndex}
        />
      </div>
      <div className="xl:hidden">
        <Menu
          onCategoryChange={onCategoryChange}
          headerData={headerData}
          MenuIconComponent={<MenuIcon className="text-black" />}
          position="left"
          backgroundColor="d#51615e"
          selectedIndex={selectedIndex}
        />
      </div>
      <div className="flex gap-6">
        <div>
          <FavouriteButton active={showFavourites} onClick={onShowFavourites} />
        </div>
        <Search
          handleSetFeature={handleSetFeature}
          resetSignal={searchResetSignal}
        />
      </div>
    </div>
  );
}

export default MapHeader;
