import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const toast = useToast();
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        for(const key in credentials){
            if(credentials[key].length < 5){
                toast({
                    title:`${key} should consist at least 5 characters`,
                    status:'warning',
                    duration:3000,
                    position:'top'
                });
                return;
            }
        }
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });
        const recieved = await response.json();
        if (!recieved.success) {
            toast({
                title:`${recieved.error}`,
                status:'error',
                position:'top',
                duration:3000
            })
            console.log(recieved);
            return;
        } else {
            localStorage.setItem("authToken", recieved.authToken);
            localStorage.setItem("username", recieved.username);
            localStorage.setItem("userEmail", credentials.email);
            toast({
                title:'Logged In ✔️',
                duration:5000,
                isClosable:true,
                status:'success',
                position:'top'
            });
            navigate('/');
        }
    }
    const handleChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundImage: 'linear-gradient(45deg,blue,purple)' }}>
            <form onSubmit={handleSubmit} className='p-5 border rounded' style={{ backgroundColor: 'white' }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleChange} />
                </div>
                <div className='d-flex justify-content-around'>
                    <button type="submit" className="btn btn-primary fw-bold">Login</button>
                    <Link to="/signup" className='btn btn-danger fw-bold'>New User?</Link>
                    <Link to="/" className='btn btn-dark fw-bold'>Cancel</Link>
                </div>
                <div className='d-flex mt-3'>
                </div>
            </form>
        </div>
    )
}