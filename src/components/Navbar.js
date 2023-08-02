import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../pages/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
    let data = useCart();
    const [cartview, setCartView] = useState(false);
    let navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userEmail");
        navigate('/login');
    }
    const badgeStyle = {
        backgroundColor: 'red',
        borderRadius: '50%', // This makes it circular
        padding: '0px 6px', // Adjust the padding to control the size of the circle
        lineHeight: '1', // Set the line height to 1 to make it more round
        color: 'white',
        marginLeft: '6px',
        marginBottom: '2px' // Set the text color to white
    };
    const badgeStyle2 = {
        backgroundColor: 'white',
        borderRadius: '50%', // This makes it circular
        padding: '0px 6px', // Adjust the padding to control the size of the circle
        lineHeight: '1', // Set the line height to 1 to make it more round
        color: 'red',
        position:'relative',
        bottom: '15px',
        right: '7px',
        marginLeft: '6px',
        marginBottom: '2px' // Set the text color to white
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-primary" data-bs-theme="dark" style={{ backgroundColor: 'rgb(13, 110, 253)' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fw-bold" to="/">GoFood</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon">{data.length > 0 ? <span pill bg="danger" style={badgeStyle2}>{data.length}</span> : ""}</span>
                    </button>
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex="-1"
                        id="navbarSupportedContent"
                        aria-labelledby="navbarSupportedContentLabel"
                    >
                        <div className="offcanvas-header" >
                            <h5 className="offcanvas-title" id="navbarSupportedContentLabel">
                                GoFood
                            </h5>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body" >
                            <ul className="navbar-nav mb-2 mb-lg-0 user-icon-container">
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/">
                                        Home
                                    </Link>
                                </li>
                                {localStorage.getItem("authToken") && (
                                    ""
                                )}
                                {localStorage.getItem("authToken") ? (
                                    <li className="nav-item d-flex">
                                        <div className="nav-link dropdown-toggle" style={{ paddingRight: '20px', color: 'white' }} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-regular fa-user" style={{ color: 'white', fontSize: '24px' }}></i>{data.length > 0 ? <span pill bg="danger" style={badgeStyle2}>{data.length}</span> : ""}
                                        </div>
                                        <ul className="dropdown-menu dropdown-menu-end" data-bs-theme="dark">
                                            <li><span className="dropdown-item">{localStorage.getItem("username")}</span></li>
                                            <li><span className="dropdown-item">
                                                <div className="btn text-primary fw-bold" onClick={() => setCartView(true)}>My Cart
                                                    {data.length > 0 ? <span pill bg="danger" style={badgeStyle}>{data.length}</span> : ""}
                                                </div>
                                                {cartview ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                                            </span>
                                            </li>

                                            <li><hr className="dropdown-divider" /></li>
                                            <li><span className="dropdown-item" >
                                                <div className="btn text-danger m-1 fw-bold" onClick={handlelogout}>Log Out</div>
                                            </span></li>
                                        </ul>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="btn bg-white text-primary mx-1" aria-current="page" to="/login">
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="btn bg-white text-primary mx-1" to="/signup">
                                                SignUp
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
