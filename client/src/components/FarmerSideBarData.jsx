import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const FarmerSideBarData = [
  {
    title: "All Products",
    icon: <InventoryIcon />,
    link: "/farmerdashboard/products",
  },
  {
    title: "Add Product",
    icon: <AddIcon />,
    link: "/farmerdashboard/addfarmerproduct",
  },
  {
    title: "Profile", // Add a new sidebar item for the user profile
    icon: <AccountBoxIcon />, // Assuming you have an icon for the profile
    link: "/farmerdashboard/profile", // Link to the user profile page
  },
];
