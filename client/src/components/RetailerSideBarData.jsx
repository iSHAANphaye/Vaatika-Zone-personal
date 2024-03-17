
import InventoryIcon from '@mui/icons-material/Inventory';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const RetailerSideBarData = [
    
    {
        title: "All Products",
        icon:  <InventoryIcon/>,
        link:  "/retailerdashboard/allproducts"
    },
    {
        title: "Wishlist",
        icon:  <FavoriteIcon/>,
        link:  "/retailerdashboard/wishlist"
    },
    {
        title: "Profile", // Add a new sidebar item for the user profile
        icon: <AccountBoxIcon />, // Assuming you have an icon for the profile
        link: "/retailerdashboard/profile" // Link to the user profile page
      },

]

