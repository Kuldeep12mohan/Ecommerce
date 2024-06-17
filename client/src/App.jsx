import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import User from './components/User';
import Admin from './components/Admin';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
