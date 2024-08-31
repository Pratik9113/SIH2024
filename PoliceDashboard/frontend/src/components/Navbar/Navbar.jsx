import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const navRef = useRef();
    const { token, setToken } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const showNavbar = () => {
        if (navRef.current) {
            navRef.current.classList.toggle("responsive_nav");
        }
    };

    return (
        <nav style={{ backgroundColor: '#f8f9fa' }} className="p-4 navbar">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="navbar-logo-left text-white text-2xl font-bold">
                    <img className="w-96 h-16" src={assets.PoliceLogo} />
                </div>

                {/* Navigation Links */}
                <nav ref={navRef} className="navbar-menu lg:flex lg:items-center lg:space-x-6">
                    <li><Link onClick={showNavbar} to="/" className="text-black hover:text-blue-400">Home</Link></li>
                    <li><Link onClick={showNavbar} to="/dashboard" className="text-black hover:text-blue-400">Dashboard</Link></li>
                    <li><Link onClick={showNavbar} to="/services" className="text-black hover:text-blue-400">Services</Link></li>
                    <li><Link onClick={showNavbar} to="/chatbot" className="text-black hover:text-blue-400">Chatbot</Link></li>
                    <li><Link onClick={showNavbar} to="/feedback" className="text-black hover:text-blue-400">Feedback</Link></li>
                    <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>

                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>

                {/* Authentication Buttons */}
                <div className="lg:flex lg:items-center lg:space-x-4 navbar-right">
                    {!token ? (
                        <button onClick={() => { setShowLogin(true); }} className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                            Sign In
                        </button>
                    ) : (
                        <div className="navbar-profile">
                            <img src={assets.profile_icon} alt="Profile" />
                            <ul className="dropdown">
                                <li onClick={logout}>
                                    <img src={assets.cross_icon} alt="Logout Icon" />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
