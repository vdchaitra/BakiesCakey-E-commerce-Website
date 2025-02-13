import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getCount, token, setToken } = useContext(StoreContext); // Destructure getCount
    const navigate = useNavigate()
    
    const logout =() =>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
        

    }




    const toggleMenu = () => {
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
    };

    return (
        <header className='navbar'>
            <Link to='/'>
                <img className='logo' src={assets.cake_icon} alt="logo" />
            </Link>

            <nav id="nav" className='nav'>   
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""} >Home</Link>
                <a href='#exploremenu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#blog' onClick={() => setMenu("blog")} className={menu === "about" ? "active" : ""}>About</a>
                <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
            </nav>

            <div className='icons'>
                <div id="menu-btn" className='fas fa-bars' onClick={toggleMenu}></div>
                
                <Link to="/wishlist">
                    <div id="wish-btn" className='fas fa-heart'></div>
                </Link>
                <Link to="/cart">
                    <div id="cart-btn" className='fas fa-shopping-cart'>
                        <div className={getCount() === 0 ? "" : "dot"}>{getCount() === 0 ? "" : getCount()}</div>
                    </div>
                </Link>
                {!token ? 
                    <a onClick={() => setShowLogin(true)} id="login-btn" className='fas fa-user' href="#"></a> :
                    <div className="navbar-profile">
                        <img src={assets.accouct} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={()=>navigate('/myorders')}>< img src={assets.bag} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>

            <div className='hamburger' onClick={toggleMenu}>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>
        </header>
    );
}

export default Navbar;
