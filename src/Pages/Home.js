import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Box } from "@mui/material";
import CollapseList from "../Components/Home/CollapseList";

function Home({ showSideBar }) {
  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const toggleCategory = () => setOpenCategory(!openCategory);
  const toggleProduct = () => setOpenProduct(!openProduct);

  const renderForm = (selectedOption) => {
    switch (selectedOption) {
      case "/insert-category":
        return <div>Insert Category Form</div>;
      case "/update-category":
        return <div>Update Category Form</div>;
      case "/delete-category":
        return <div>Delete Category Form</div>;
      case "/insert-product":
        return <div>Insert Product Form</div>;
      case "/update-product":
        return <div>Update Product Form</div>;
      case "/delete-product":
        return <div>Delete Product Form</div>;
      default:
        return <div>Summary Content</div>;
    }
  };

  return (
    <div className="flex h-[90vh]">
      {/* Sidebar */}
      <div className="w-1/5 bg-cyan-950 text-white">
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
          <ListItem button onClick={toggleProduct} className="hover:bg-cyan-700">
            <ListItemIcon>
              <InsertDriveFileIcon className="text-white" sx={{ fontSize: "30px" }} />
            </ListItemIcon>
            {showSideBar && (
              <ListItemText primary="Product" />
            )}
            {showSideBar ? (openProduct ? <ExpandLessIcon /> : <ExpandMoreIcon />) :<></>}
          </ListItem>
          
          <CollapseList baseUrl={"product"} openState={openProduct}/>
        </List>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-4/5">
        {/* Content Area */}
        <div className="p-4 bg-gray-100 flex-grow">{renderForm()}</div>
      </div>
    </div>
  );
}

export default Home;
