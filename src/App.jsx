import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Menu from './Components/Menu';
import Navbar1 from './Components/Navbar1'
import Report from './Components/Report'
import Emergency from './Components/Emergency'
import History from './Components/History'
import Profile from './Components/Profile'

 function App() {
  return (
  
    <Router>
      <div>
        
        <Routes>
         
          <Route path="/" element={<Navbar />} />
          <Route path="menu" element={<Menu />}/>
          <Route path="navbar" element={<Navbar1 />} />
          <Route path="report" element={<Report />}/>
          <Route path="emergency" element={<Emergency/>} />
          <Route path='history' element={<History />}/>
          <Route path='profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
