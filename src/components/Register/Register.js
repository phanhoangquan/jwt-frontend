import { Link } from 'react-router-dom';
import './Register.scss'
import { useEffect } from 'react';
import axios from 'axios';

function Register() {

    useEffect(()=>{
        axios.get('https://dummyjson.com/ip')
        .then(data =>{
            console.log(data);
        })
    },[])

    return (<div className="register-container">
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
                
                <div className="content-right py-4 col-12 col-sm-5 d-flex flex-column gap-3">
                    <div className='brand d-sm-none'>
                        BRAND
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input type='text' className='form-control' placeholder='Email Address'/>
                    </div>
                    <div className='form-group'>
                        <label>Phone number:</label>
                        <input type='text' className='form-control' placeholder='Phone number'/>
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input type='text' className='form-control' placeholder='Password'/>
                    </div>
                    <div className='form-group'>
                        <label>Re-enter Password:</label>
                        <input type='text' className='form-control' placeholder='Password'/>
                    </div>
                    <button className='btn btn-primary'>Register</button>
                    <hr/>
                    <button className='btn btn-success'><Link to="/login" style={{'textDecoration': 'none','color':'white'}}>Already've an account . Login </Link></button>
                </div>
            </div>
        </div>
    </div>  );
}

export default Register;