import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
   const session = sessionStorage.getItem('account');

   if (!session) {
      return <Navigate to="/login" replace />;
   }

   return children;
};

export default PrivateRoute;
