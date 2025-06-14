// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import Navbar1 from './Components/Navbar1';
import Report from './Components/Report';
import Emergency from './Components/Emergency';
import History from './Components/History';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signup />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

          {/* Private Routes */}
          <Route
            path="home"
            element={
              <PrivateRoute>
                <Navbar1 />
              </PrivateRoute>
            }
          />
          <Route
            path="report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="emergency"
            element={
              <PrivateRoute>
                <Emergency />
              </PrivateRoute>
            }
          />
          <Route
            path="history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
