import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Appbar({showSideBar, toggleSideBarShowingState}) {


    return (
        <Box position="static" className='bg-sky-800 h-[10vh] mt-0 pt-0'>
            <Toolbar>
            <Button onClick={(e)=>{toggleSideBarShowingState(e)}} className='w-[5vw] h-[9vh]'>
                {showSideBar?
                    <MenuOpenIcon className='text-white' sx={{fontSize:35}}/>:
                    <MenuIcon className='text-white' sx={{fontSize:35}}/>
                }
            </Button>
            <Typography variant="h5" className="pl-5 text-white">
                ZAS Pharma Admin
            </Typography>
            </Toolbar>
        </Box>
    )
}
