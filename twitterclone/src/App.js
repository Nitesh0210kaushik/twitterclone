
import './App.css';
import Signup from './components/Signup'; 
import Login from './components/Login';
import Navbar from './components/Navbar'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Firstpage from './components/Firstpage';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
        
   
    <BrowserRouter>
    <Navbar />
  
    <Routes>     
    <Route path='/' element={<Firstpage />} />
   <Route path="/home" element={<Home />} /> 
   <Route path='/userprofile' element={<UserProfile />} />
   
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
     
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
