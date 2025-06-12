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


//Menu Data
export const menuItemData:MenuItemType[] =[
        { label: 'Profile', target: 'profile' },
        { label: 'Dashboard', target: 'dashboard' },
        { label: 'Settings', target: 'settings' },
        { label: 'Contacts', target: 'contacts' },
        { label: 'Supertest', target: 'supertest' },
        { label: 'Help Center', target: 'help', isSeparate: true },
]
