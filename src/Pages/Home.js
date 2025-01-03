import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import SummarizeIcon from "@mui/icons-material/Summarize";
import CollapseList from "../Components/Sidebar/CollapseList";
import Box from "@mui/material/Box";
import InsertCategory from "../Components/Home/Tabs/InsertCategory";

function Home({ showSideBar,toggleSideBarShowingState }) {
  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const toggleCategory = () => {
    setOpenCategory(!openCategory);
    if(!showSideBar){
      toggleSideBarShowingState()
    }
  };
  const toggleProduct = () => {
    setOpenProduct(!openProduct);
    if(!showSideBar){
      toggleSideBarShowingState()
    }
  }

  return (
    <Box className="flex h-[90vh]">
      {/* Sidebar */}
      <Box className={` bg-cyan-950 text-white ${showSideBar?"w-1/6":"w-1/12"}`}>
        <List>
          {/* Summary */}
          <Link to="/summary">
            <ListItem button className="hover:bg-cyan-700">
              <ListItemIcon>
                <SummarizeIcon className="text-white" sx={{ fontSize: "30px" }} />
              </ListItemIcon>
              {showSideBar && <ListItemText primary="Summary" />}
            </ListItem>
          </Link>

          {/* Category Dropdown */}
          <ListItem button onClick={toggleCategory} className="hover:bg-cyan-700">
            <ListItemIcon>
              <CategoryIcon className="text-white" sx={{ fontSize: "30px" }} />
            </ListItemIcon>
            {showSideBar && (
              <ListItemText primary="Category" />
            )}
            {showSideBar ? (openCategory ? <ExpandLessIcon /> : <ExpandMoreIcon />) :<></>}
          </ListItem>
          <CollapseList baseUrl={"category"} openState={openCategory}/>
          {/* Product Dropdown */}
          <ListItem button onClick={toggleProduct} className="hover:bg-cyan-700">
            <ListItemIcon>
              <MedicationLiquidIcon className="text-white" sx={{ fontSize: "30px" }} />
            </ListItemIcon>
            {showSideBar && (
              <ListItemText primary="Product" />
            )}
            {showSideBar ? (openProduct ? <ExpandLessIcon /> : <ExpandMoreIcon />) :<></>}
          </ListItem>
          
          <CollapseList baseUrl={"product"} openState={openProduct}/>
        </List>
      </Box>

      {/* Main Content */}
      <Routes>

      <Route path="/summary" element={<InsertCategory/>}/>
      </Routes>
    </Box>
  );
}

export default Home;
