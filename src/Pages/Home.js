import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CategoryIcon from '@mui/icons-material/Category';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import SummarizeIcon from '@mui/icons-material/Summarize';

function Home({showSideBar}) {
  const [selectedOption, setSelectedOption] = useState("Summary");

  // Sidebar items
  const menuItems = [
    { name: "Summary", path: "/summary", icon: <SummarizeIcon className="text-white " sx={{fontSize:'30px'}}/> },
    { name: "Insert Category", path: "/insert-category", icon: <CategoryIcon className="text-white " sx={{fontSize:'30px'}} /> },
    { name: "Insert Product", path: "/insert-product", icon: <InsertDriveFileIcon className="text-white " sx={{fontSize:'30px'}} /> },
    { name: "Delete Category", path: "/delete-category", icon: <DeleteIcon className="text-white " sx={{fontSize:'30px'}} /> },
    { name: "Delete Product", path: "/delete-product", icon: <DeleteIcon className="text-white " sx={{fontSize:'30px'}} /> },
    { name: "Update Category", path: "/update-category", icon: <UpdateIcon className="text-white " sx={{fontSize:'30px'}} /> },
    { name: "Update Product", path: "/update-product", icon: <UpdateIcon className="text-white " sx={{fontSize:'30px'}} /> },
  ];
  

  // Sidebar click handler
  const handleSidebarClick = (item) => {
    setSelectedOption(item);
  };

  // Forms based on selected option
  const renderForm = () => {
    switch (selectedOption) {
      case "Insert Category":
        return <div>Insert Category Form</div>;
      case "Insert Product":
        return <div>Insert Product Form</div>;
      case "Delete Category":
        return <div>Delete Category Form</div>;
      case "Delete Product":
        return <div>Delete Product Form</div>;
      case "Update Category":
        return <div>Update Category Form</div>;
      case "Update Product":
        return <div>Update Product Form</div>;
      default:
        return <div>Summary Content</div>;
    }
  };

  return (
    <div className="flex h-[90vh]">
      {/* Sidebar */}
      <div className="w-1/5 bg-cyan-950 text-white">
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.name}
              onClick={() => handleSidebarClick(item.name)}
              className={`hover:bg-cyan-700 cursor-pointer ${
                selectedOption === item.name ? " bg-cyan-700" : " "
              }`}
            >
              <ListItemIcon >{item.icon}</ListItemIcon>
              {showSideBar&&<ListItemText primary={item.name} />}
            </ListItem>
          ))}
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
