import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import SummarizeIcon from "@mui/icons-material/Summarize";
import Box from "@mui/material/Box";
import CollapseList from "./CollapseList";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EngineeringIcon from '@mui/icons-material/Engineering';

function Sidebar({ showSideBar,toggleSideBarShowingState }) {
  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openActivity, setOpenActivity] = useState(false);
  const [openResponsiblePersons, setOpenResponsiblePersons] = useState(false);

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
  const toggleActivity = () => {
    setOpenActivity(!openActivity);
    if(!showSideBar){
      toggleSideBarShowingState()
    }
  }
  const toggleResponsiblePersons = () => {
    setOpenResponsiblePersons(!openResponsiblePersons);
    if(!showSideBar){
      toggleSideBarShowingState()
    }
  }

  return (
      <Box className={`bg-cyan-950 overflow-y-auto  text-white ${showSideBar?"w-1/6":"w-1/12"}`}>
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

          {/* Activity Dropdown */}
          <ListItem button onClick={toggleActivity} className="hover:bg-cyan-700">
            <ListItemIcon>
              <CalendarMonthIcon className="text-white" sx={{ fontSize: "30px" }} />
            </ListItemIcon>
            {showSideBar && (
              <ListItemText primary="Activity" />
            )}
            {showSideBar ? (openActivity ? <ExpandLessIcon /> : <ExpandMoreIcon />) :<></>}
          </ListItem>
          <CollapseList baseUrl={"activity"} openState={openActivity}/>

          {/* Responsible Persons Dropdown */}
          <ListItem button onClick={toggleResponsiblePersons} className="hover:bg-cyan-700">
            <ListItemIcon>
              <EngineeringIcon className="text-white" sx={{ fontSize: "30px" }} />
            </ListItemIcon>
            {showSideBar && (
              <ListItemText primary="Responsible Persons" />
            )}
            {showSideBar ? (openResponsiblePersons ? <ExpandLessIcon /> : <ExpandMoreIcon />) :<></>}
          </ListItem>
          <CollapseList baseUrl={"responsible-person"} openState={openResponsiblePersons}/>
        </List>
      </Box>
  );
}

export default Sidebar;
