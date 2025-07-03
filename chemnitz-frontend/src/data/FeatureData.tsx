
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuseumIcon from '@mui/icons-material/Museum';
import { HeaderDataType } from '@/types/ComponetsType';

export const headerData:HeaderDataType[] = [
  { name: 'Museum', icon: MuseumIcon, type: 'tourism' },
  { name: 'Gallery', icon: MuseumIcon, type: 'tourism' },
  { name: 'Artwork', icon: MuseumIcon, type: 'tourism' },
  { name: 'Guest_House', icon: HotelIcon, type: 'tourism' },
  { name: 'Hotel', icon: HotelIcon, type: 'tourism' },
  { name: 'Restaurant', icon: RestaurantIcon, type: 'amenity' },
  { name: 'Bench', icon: ShoppingCartIcon, type: 'amenity' },
  { name: 'Theatre', icon: ShoppingCartIcon, type: 'amenity' },
  { name: 'Clock', icon: ShoppingCartIcon, type: 'amenity' },
  { name: 'Deli', icon: ShoppingCartIcon, type: 'shop' },
];

export const categoryMap = Object.fromEntries(
  headerData.map(item => [item.name.toLowerCase(), item.type])
);