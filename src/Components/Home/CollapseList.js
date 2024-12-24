import React from 'react'
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

export default function CollapseList({baseUrl, openState}) {
  return (
    <Collapse in={openState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <Link to={`/insert-${baseUrl}`}>
            <ListItem button className="pl-8 hover:bg-cyan-700">
                <ListItemIcon>
                <InsertDriveFileIcon className="text-white text-2xl"/>
                </ListItemIcon>
                <ListItemText primary="Insert" />
            </ListItem>
            </Link>
            <Link to={`/update-${baseUrl}`}>
            <ListItem button className="pl-8 hover:bg-cyan-700">
                <ListItemIcon>
                <UpdateIcon className="text-white  text-2xl"  />
                </ListItemIcon>
                <ListItemText primary="Update" />
            </ListItem>
            </Link>
            <Link to={`/delete-${baseUrl}`}>
            <ListItem button className="pl-8 hover:bg-cyan-700">
                <ListItemIcon>
                <DeleteIcon className="text-white  text-2xl" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
            </ListItem>
            </Link>
        </List>
    </Collapse>
  )
}
