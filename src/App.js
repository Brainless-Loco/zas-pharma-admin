import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import Appbar from './Components/AppBar/Appbar';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Summary from './Components/Summary/Summary';
import { Box } from '@mui/material';
import InsertCategory from './Components/Tabs/Category/Insert';
import InsertProduct from './Components/Tabs/Products/Insert';
import InsertActivity from './Components/Tabs/Activity/Insert';
import InsertResponsiblePerson from './Components/Tabs/ResponsiblePersons/Insert';

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
            <Box className={`${showSideBar?"w-5/6":"w-11/12"} h-full overflow-y-auto`}>
              <Routes>
                {
                  ["/","summary","Summary"].map((path)=>(
                    <Route path={path} key={path} element={<Summary/>}/>
                  ))
                }

                {
                  ["/insert-category","/add-category","/new-category", "/create-category"].map((path)=>(
                    <Route path={path} key={path} element={<InsertCategory/>}/>
                  ))

                }

                { 
                
                  ["/insert-product","/add-product","/new-product","/create-product"].map((path)=>(
                    <Route path={path} key={path} element={<InsertProduct/>}/>
                  ))
                }

                {
                  
                  ["/insert-activity","/add-activity","/new-activity","/create-activity"].map((path)=>(
                    <Route path={path} key={path} element={<InsertActivity/>}/>
                  ))
                }

                { 
                
                  ["/insert-responsible-person","/add-responsible-person","/new-product","/create-responsible-person"].map((path)=>(
                    <Route path={path} key={path} element={<InsertResponsiblePerson/>}/>
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
