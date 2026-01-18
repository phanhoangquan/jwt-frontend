import './App.scss';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';


import Nav from './components/Navigation/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


function App() {
  return (
  <div className='app-container'>
    <BrowserRouter>
         <Nav />
         <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} /> */}
              {/* <Route path="*"><h1>404 Not Found!</h1></Route> */}

        </Routes>
    </BrowserRouter>
  </div>
);
}
export default App;
