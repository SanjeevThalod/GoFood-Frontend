import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function SignUp() {
    let navigate = useNavigate();
    const [credentials,setcredentials] = useState({name:"",password:"",location:"",email:""});
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/create`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:credentials.name,
                password:credentials.password,
                email:credentials.email,
                location:credentials.location
            })
        });
        const recieve = await response.json();
        if(!recieve.success){
            alert('Enter valid Credentials')
        }else{
            navigate('/login');
        }
    };
    const handleChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value});
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <form onSubmit={handleSubmit} className='border p-5 rounded'>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="Text" className="form-control" name='name' value={credentials.name} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name='location' onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a User?</Link>
            </form>
        </div>
    )
}
