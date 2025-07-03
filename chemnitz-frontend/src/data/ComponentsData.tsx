import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuseumIcon from '@mui/icons-material/Museum';
import { CardHeaderType, MenuItemType } from '@/types/ComponetsType';

export const headerData:CardHeaderType[] = [
    { name: 'Restaurants', icon: RestaurantIcon },
    { name: 'Hotel', icon: HotelIcon },
    { name: 'Shopping', icon: ShoppingCartIcon },
    { name: ' Art & Monuments', icon: MuseumIcon },
    { name: 'Shoppingg', icon: ShoppingCartIcon },
];

import { FaHome, FaInfoCircle, FaMapMarkedAlt, FaEnvelope } from 'react-icons/fa';

//Menu Data
export const menuItemData: MenuItemType[] = [
  { label: 'Home', target: 'home', icon: <FaHome /> },
  { label: 'About', target: 'about', icon: <FaInfoCircle /> },
  { label: 'Map', target: 'map', icon: <FaMapMarkedAlt /> },
  { label: 'Contacts', target: 'contacts', icon: <FaEnvelope /> },
];
