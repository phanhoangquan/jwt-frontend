import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Home from './pages/Home/Home';

import Nav from './components/Navigation/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/ManageUsers/Users';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function App() {
   const [account, setAccount] = useState({});

   useEffect(() => {
      let session = sessionStorage.getItem('account');
      if (session) {
         setAccount(JSON.parse(session));
      }
   }, []);

   return (
      <div className="app-container">
         <BrowserRouter>
            {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/users" element={<Users />} />
               {/* <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} /> */}
               {/* <Route path="*"><h1>404 Not Found!</h1></Route> */}
            </Routes>
            <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick={false}
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"
               transition={Bounce}
            />
         </BrowserRouter>
      </div>
   );
}
export default App;
