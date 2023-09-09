import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export default function SignUp() {
    let navigate = useNavigate();
    const toast = useToast();
    const [credentials, setcredentials] = useState({ name: "", password: "", location: "", email: "" });
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
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                password: credentials.password,
                email: credentials.email,
                location: credentials.location
            })
        });
        const recieve = await response.json();
        if (!recieve.success) {
            toast({
                title:`${recieve.errors[0].msg}`,
                status:'error',
                position:'top',
                duration:3000
            })
            console.log(recieve);
            return;
        } else {
            toast({
                title:'User Registered',
                duration:5000,
                isClosable:true,
                status:'success',
                position:'top'
            });
            localStorage.setItem("authToken", recieve.authToken);
            localStorage.setItem("username", recieve.username);
            localStorage.setItem("userEmail", credentials.email);
            navigate('/');
        }
    };
    const handleChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundImage: 'linear-gradient(45deg,blue,purple)' }}>
            <form onSubmit={handleSubmit} className='border p-5 rounded' style={{ backgroundColor: 'white' }}>
                <div className="mb-3">
                    <label className="form-label fw-bold">Full Name</label>
                    <input type="Text" className="form-control" name='name' value={credentials.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1 fw-bold" className="form-label fw-bold">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <input type="text" className="form-control" name='location' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1 fw-bold" className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleChange} />
                </div>
                <div className='d-flex justify-content-around fw-bold'>
                    <button type="submit" className="btn btn-primary fw-bold">Register</button>
                    <Link to="/login" className='btn btn-danger fw-bold'>Already a User?</Link>
                </div>
                <div className='d-flex mt-5'>
                    <Link to="/" className='m-3 btn btn-dark fw-bold'>Cancel</Link>
                </div>
            </form>
        </div>
    )
}
