import { useEffect, useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';

function Login() {
   const [valueLogin, setValueLogin] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();

   const defaultobjValidInputs = {
      valueLogin: true,
      password: true,
   };
   const [objIsValidInputs, setObjIsValidInputs] = useState(defaultobjValidInputs);

   const handleLogin = async () => {
      setObjIsValidInputs(defaultobjValidInputs);
      if (!valueLogin) {
         setObjIsValidInputs({ ...defaultobjValidInputs, valueLogin: false });
         toast.error('Email or phone number is required');
         return;
      }
      if (!password) {
         setObjIsValidInputs({ ...defaultobjValidInputs, password: false });
         toast.error('Password is required');
         return;
      }
      let response = await loginUser(valueLogin, password);

      if (response && response.data && +response.data.EC === 0) {
         let data = {
            isAuthenticated: true,
            token: 'fake token',
         };
         sessionStorage.setItem('account', JSON.stringify(data));
         navigate('/users');
         window.location.reload();
      }
      if (response && response.data && +response.data.EC !== 0) {
         //error
         toast.error(response.data.EM);
      }
   };

   const handlePressEnter = (e) => {
      if (e.code === 'Enter') {
         handleLogin();
      }
   };

   useEffect(() => {
      let session = sessionStorage.getItem('account');
      if (session) {
         navigate('/');
      }
   }, []);

   return (
      <div className="login-container">
         <div className="container">
            <div className="row px-3 px-sm-0">
               <div className="content-left d-none col-sm-7 d-sm-block">
                  <div className="brand">BRAND</div>
                  <div className="detail">BRAND is website for ...</div>
               </div>

               <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-4">
                  <div className="brand d-sm-none">BRAND</div>
                  <input
                     type="text"
                     className={objIsValidInputs.valueLogin ? 'form-control' : 'form-control is-invalid'}
                     placeholder="Email Address or phone number"
                     value={valueLogin}
                     onChange={(e) => setValueLogin(e.target.value)}
                  />
                  <input
                     type="text"
                     className={objIsValidInputs.password ? 'form-control' : 'form-control is-invalid'}
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     onKeyDown={(e) => {
                        handlePressEnter(e);
                     }}
                  />
                  <button
                     className="btn btn-primary"
                     onClick={() => {
                        handleLogin();
                     }}
                  >
                     Login
                  </button>
                  <span className="text-center">
                     <Link className="forgot-password" href="#">
                        Forgot your password?
                     </Link>
                  </span>
                  <hr />
                  <button className="btn btn-success">
                     <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                        Create new account
                     </Link>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
