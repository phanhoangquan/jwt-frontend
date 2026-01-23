import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Users() {
   const navigate = useNavigate();

   useEffect(() => {
      let session = sessionStorage.getItem('account');
      if (!session) {
         navigate('/login');
      }
   }, []);
   return <div> User Page</div>;
}

export default Users;
