import './Login.scss'
import { Link } from 'react-router-dom';

function Login() {
    return (<div className="login-container">
        <div className="container">
            <div className="row px-3 px-sm-0">
                <div className="content-left d-none col-sm-7 d-sm-block">
                    <div className='brand'>
                        BRAND
                    </div>
                    <div className='detail'>
                        BRAND is website for ...
                    </div>
                </div>
                
                <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3">
                    <div className='brand d-sm-none'>
                        BRAND
                    </div>
                    <input type='text' className='form-control' placeholder='Email Address or phone number'/>
                    <input type='text' className='form-control' placeholder='Password'/>
                    <button className='btn btn-primary'>Login</button>
                    <span className='text-center'><Link className='forgot-password' href='#'>Forgot your password?</Link></span>
                    <hr/>
                    <button className='btn btn-success'><Link to="/register" style={{'text-decoration': 'none','color':'white'}}>Create new account</Link></button>
                </div>
            </div>
        </div>
    </div>  );
}

export default Login;