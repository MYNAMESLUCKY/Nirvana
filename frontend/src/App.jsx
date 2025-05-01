import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar1 from './Components/Navbar1'
import Report from './Components/Report'
import Emergency from './Components/Emergency'
import History from './Components/History'
import Profile from './Components/Profile'
import Signup from './Components/Signup'
import Login from './Components/Login'

 function App() {
  return (
  
    <Router>
      <div>
        
        <Routes>
         
          <Route path="/" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup/>} />
          <Route path='home' element={<Navbar1/>} />
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
