import { Link } from 'react-router-dom';
import './Register.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userServices';

function Register() {
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setconfirmPassword] = useState('');

   const objValidInputs = {
      email: true,
      phone: true,
      username: true,
      password: true,
      confirmPassword: true,
   };
   const [objIsValidInputs, setObjIsValidInputs] = useState(objValidInputs);

   const isValidInputs = () => {
      setObjIsValidInputs({ ...objValidInputs });
      if (!email) {
         setObjIsValidInputs({ ...objValidInputs, email: false });
         toast.error('Email is required');
         return false;
      }
      let regexEmail = /\S+@\S+\.\S+/;
      if (!regexEmail.test(email)) {
         setObjIsValidInputs({ ...objValidInputs, email: false });
         toast.error('Email is invalid');
         return false;
      }
      if (!phone) {
         setObjIsValidInputs({ ...objValidInputs, phone: false });
         toast.error('Phone is required');
         return false;
      }
      if (!username) {
         setObjIsValidInputs({ ...objValidInputs, username: false });
         toast.error('Username is required');
         return false;
      }
      if (!password) {
         setObjIsValidInputs({ ...objValidInputs, password: false });
         toast.error('Password is required');
         return false;
      }
      if (password !== confirmPassword) {
         setObjIsValidInputs({ ...objIsValidInputs, confirmPassword: false });
         toast.error('Password and Confirm Password do not match');
         return false;
      }

      return true;
   };

   const handleRegister = async () => {
      let isValid = isValidInputs();
      if (isValid) {
         //call api register
         let response = await registerNewUser(email, username, phone, password);
         console.log('>>> check response register: ', response);
         let serverData = response && response.data ? response.data : null;
         if (serverData && +serverData.EC === 0) {
            toast.success(serverData.EM);
         } else {
            toast.error(serverData.EM);
         }
      }
   };

   useEffect(() => {
      // axios.get('http://localhost:8080/api/v1/test-api').then((data) => {
      //    console.log(data);
      // });
   }, []);

   return (
      <div className="register-container">
         <div className="container">
            <div className="row px-3 px-sm-0">
               <div className="content-left d-none col-sm-7 d-sm-block">
                  <div className="brand">BRAND</div>
                  <div className="detail">BRAND is website for ...</div>
               </div>

               <div className="content-right py-4 col-12 col-sm-5 d-flex flex-column gap-3">
                  <div className="brand d-sm-none">BRAND</div>
                  <div className="form-group">
                     <label>Email:</label>
                     <input
                        type="text"
                        className={objIsValidInputs.email ? 'form-control' : 'form-control is-invalid'}
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                        }}
                     />
                  </div>
                  <div className="form-group">
                     <label>Phone number:</label>
                     <input
                        type="text"
                        className={objIsValidInputs.phone ? 'form-control' : 'form-control is-invalid'}
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => {
                           setPhone(e.target.value);
                        }}
                     />
                  </div>
                  <div className="form-group">
                     <label>Username:</label>
                     <input
                        type="text"
                        className={objIsValidInputs.username ? 'form-control' : 'form-control is-invalid'}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                           setUsername(e.target.value);
                        }}
                     />
                  </div>
                  <div className="form-group">
                     <label>Password:</label>
                     <input
                        type="text"
                        className={objIsValidInputs.password ? 'form-control' : 'form-control is-invalid'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                           setPassword(e.target.value);
                        }}
                     />
                  </div>
                  <div className="form-group">
                     <label>Re-enter Password:</label>
                     <input
                        type="text"
                        className={objIsValidInputs.confirmPassword ? 'form-control' : 'form-control is-invalid'}
                        placeholder="Password"
                        value={confirmPassword}
                        onChange={(e) => {
                           setconfirmPassword(e.target.value);
                        }}
                     />
                  </div>
                  <button
                     className="btn btn-primary"
                     onClick={() => {
                        handleRegister();
                     }}
                  >
                     Register
                  </button>
                  <hr />
                  <button className="btn btn-success">
                     <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                        Already've an account . Login{' '}
                     </Link>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Register;
