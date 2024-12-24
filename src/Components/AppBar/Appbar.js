import Typography from '@mui/material/Typography';
import React from 'react'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Appbar({showSideBar, toggleSideBarShowingState}) {


    return (
        <Box position="static" className='bg-sky-800 h-[10vh] mt-0 pt-0 flex flex-col flex-wrap items-center'>
            <Box className="w-1/12 h-full">
                <Button onClick={(e)=>{toggleSideBarShowingState(e)}} className='w-[5vw] h-full flex justify-center items-center'>
                    {showSideBar?
                        <MenuOpenIcon className='text-white' sx={{fontSize:35}}/>:
                        <MenuIcon className='text-white' sx={{fontSize:35}}/>
                    }
                </Button>
            </Box>
            <Box className="w-11/12 h-full">
                <Typography variant="h3" className="h-full text-white flex justify-center items-center italic">
                    ZAS Pharma Admin
                </Typography>
            </Box>
        </Box>
    )
}
