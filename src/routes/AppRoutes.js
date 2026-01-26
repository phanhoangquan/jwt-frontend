import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.js';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register.js';
import Users from '../components/ManageUsers/Users.js';

import PrivateRoutes from './PrivateRoutes.js';

function AppRoutes(props) {
   return (
      <>
         <Routes>
            <Route
               path="/users"
               element={
                  <PrivateRoutes>
                     <Users />
                  </PrivateRoutes>
               }
            />
            <Route
               path="/projects"
               element={
                  <PrivateRoutes>
                     <Users />
                  </PrivateRoutes>
               }
            />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            {/* <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="*"><h1>404 Not Found!</h1></Route> */}
         </Routes>
      </>
   );
}

export default AppRoutes;
