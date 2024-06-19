import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import User from './components/User';
import Admin from './components/Admin';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/landing' element={<LandingPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
