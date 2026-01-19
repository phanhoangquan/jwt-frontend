import { Link } from 'react-router-dom';
import './Register.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Register() {
    
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setconfirmPassword] = useState('')

    const handleRegister = ()=>{
        let userData = { email , phone, username, password, confirmPassword }
        console.log(userData);
    }

    // useEffect(()=>{
    //     axios.get('http://localhost:8080/api/test-api')
    //     .then(data =>{
    //         console.log(data);
    //     })
    // },[])

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
                        <input type='text' className='form-control' placeholder='Email Address' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label>Phone number:</label>
                        <input type='text' className='form-control' placeholder='Phone number'value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label>Username:</label>
                        <input type='text' className='form-control' placeholder='Username'value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input type='text' className='form-control' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label>Re-enter Password:</label>
                        <input type='text' className='form-control' placeholder='Password' value={confirmPassword} onChange={(e)=>{setconfirmPassword(e.target.value)}}/>
                    </div>
                    <button className='btn btn-primary' onClick={()=>{handleRegister()}}>Register</button>
                    <hr/>
                    <button className='btn btn-success'><Link to="/login" style={{'textDecoration': 'none','color':'white'}}>Already've an account . Login </Link></button>
                </div>
            </div>
        </div>
    </div>  );
}

export default Register;