import { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';

function Nav(props) {
   const location = useLocation();
   const [isShow, setIsShow] = useState(true);
   useEffect(() => {
      let session = sessionStorage.getItem('account');
      if (location.pathname === '/login') {
         setIsShow(false);
      }
   }, []);
   return (
      <div>
         {isShow && (
            <ul className="mb-0">
               <li>
                  <NavLink to="/">Home</NavLink>
               </li>
               <li>
                  <NavLink to="/users">Users</NavLink>
               </li>
               <li>
                  <NavLink to="/projects">Projects</NavLink>
               </li>
               <li>
                  <NavLink to="/about">About</NavLink>
               </li>
            </ul>
         )}
      </div>
   );
}

export default Nav;
