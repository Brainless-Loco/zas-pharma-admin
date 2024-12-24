import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Pages/Home';
import Appbar from './Components/AppBar/Appbar';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  const [showSideBar, setShowSideBar] = useState(true)

  const toggleSideBarShowingState = ()=>{
    setShowSideBar(!showSideBar)
  }
  
  return (
    <HelmetProvider>
      
      <Router>
          <Appbar showSideBar={showSideBar} toggleSideBarShowingState={toggleSideBarShowingState}/>
        <Routes>
          <Route path="/" element={<Home showSideBar={showSideBar}/>}/>
          
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
