import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import Appbar from './Components/AppBar/Appbar';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Summary from './Components/Tabs/Summary';
import { Box } from '@mui/material';
import InsertCategory from './Components/Tabs/Category/Insert';

function App() {
  const [showSideBar, setShowSideBar] = useState(true)

  const toggleSideBarShowingState = ()=>{
    setShowSideBar(!showSideBar)
  }
  
  return (
    <HelmetProvider>
      
      <Router>
          <Appbar showSideBar={showSideBar} toggleSideBarShowingState={toggleSideBarShowingState}/>
          
          <Box className="flex w-full h-[90vh]">
            <Sidebar showSideBar={showSideBar} toggleSideBarShowingState={toggleSideBarShowingState}/>
            <Box className={`${showSideBar?"w-5/6":"w-11/12"}`}>
              <Routes>
                {
                  ["/","summary","Summary"].map((path)=>(
                    <Route path={path} element={<Summary/>}/>
                  ))
                }

{
                  ["/insert-category","/add-category","/new-category"].map((path)=>(
                    <Route path={path} element={<InsertCategory/>}/>
                  ))
                }
              
              </Routes>
            </Box>
            
        </Box>
      </Router>
    </HelmetProvider>
  );
}

export default App;
