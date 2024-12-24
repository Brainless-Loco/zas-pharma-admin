import React from 'react'
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from "@mui/icons-material/Update";

export default function CollapseList({baseUrl, openState}) {
  return (
    <Collapse in={openState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <Link to={`/insert-${baseUrl}`}>
            <ListItem button className="pl-8 hover:bg-cyan-700">
                <ListItemIcon>
                    <LibraryAddIcon className="text-sky-300 text-2xl"/>
                </ListItemIcon>
                <ListItemText primary="Insert" />
            </ListItem>
            </Link>
            <Link to={`/update-${baseUrl}`}>
            <ListItem button className="pl-8 hover:bg-cyan-700">
                <ListItemIcon>
                    <UpdateIcon className="text-green-700  text-2xl"  />
                </ListItemIcon>
                <ListItemText primary="Update" />
            </ListItem>
            </Link>
            <Link to={`/delete-${baseUrl}`}>
            <ListItem button className="pl-8 hover:bg-cyan-700">
                <ListItemIcon>
                    <DeleteForeverIcon className="text-red-700  text-2xl" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
            </ListItem>
            </Link>
        </List>
    </Collapse>
  )
}
