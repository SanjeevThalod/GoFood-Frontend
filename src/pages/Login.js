import { useState } from 'react';
import React from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials,setcredentials] = useState({email:"",password:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:credentials.email,
                password:credentials.password
            })
        });
        const recieved = await response.json();
        if(!recieved.success){
            alert('Try logging in with correct credentials');
        }else{
            localStorage.setItem("authToken",recieved.authToken);
            localStorage.setItem("username",recieved.username);
            localStorage.setItem("userEmail",credentials.email);
            navigate('/');
        }
    }
    const handleChange = (event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value});
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <form onSubmit={handleSubmit} className='p-5 border rounded'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/signup" className='m-3 btn btn-danger'>New User?</Link>
            </form>
        </div>
    )
}
