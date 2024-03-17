import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const SideBarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/adminlayout/dashboard",
  },

  {
    title: "Products",
    icon: <InventoryIcon />,
    link: "/adminlayout/products",
  },
  {
    title: "Retailers",
    icon: <PersonIcon />,
    link: "/adminlayout/retailerdata",
  },
  {
    title: "Farmers",
    icon: <PeopleOutlineIcon />,
    link: "/adminlayout/farmerdata",
  },
  {
    title: "Add Product",
    icon: <AddIcon />,
    link: "/adminlayout/addadminproduct",
  },
  {
    title: "Profile", // Add a new sidebar item for the user profile
    icon: <AccountBoxIcon />, // Assuming you have an icon for the profile
    link: "/adminlayout/profile", // Link to the user profile page
  },
  // {
  //     title: "Transactions",
  //     icon:  <ReceiptLongIcon/>,
  //     link:  "/transactions"
  // },
];
