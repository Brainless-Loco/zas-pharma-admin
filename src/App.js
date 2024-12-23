import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Pages/Home';
import Appbar from './Components/AppBar/Appbar';
import { useState } from 'react';
import { Router } from 'react-router-dom';

function App() {
  const [showSideBar, setShowSideBar] = useState(true)

  const toggleSideBarShowingState = ()=>{
    setShowSideBar(!showSideBar)
  }
  
  return (
    <HelmetProvider>
      
      <Router>

        <Appbar showSideBar={showSideBar} toggleSideBarShowingState={toggleSideBarShowingState}/>
        <Home showSideBar={showSideBar}/>
        
      </Router>
    </HelmetProvider>
  );
}

export default App;
