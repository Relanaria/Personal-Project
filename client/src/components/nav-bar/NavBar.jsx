import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useLogout } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import "./navbar.css"

export default function NavBar() {
    const authUserContext = useAuthContext();
    // remember to remove onClick event from logoutLink
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogout = () => {
        logout(authUserContext.accessToken);
        navigate('/');
    };

    return (
        <nav className="navbar">

            <div className="logo">
                <Link to="/">
                    <img src="/images/logo.png" alt="SecondHandManga Logo" />
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/store">Store</Link></li>
                {authUserContext.isAuthenticated && 
                <>
                {authUserContext.accountStatus == 'Admin' && <li><Link to='/createCatalogItem'>Create Catalog</Link></li>}
                <li><Link to="/createItem">List Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
                </>
                }
                <li><Link to="/about">About Us</Link></li>
            </ul>

            {authUserContext.isAuthenticated && 
            <ul className="nav-links">
                <li>
                    <Link to="/myCart" className="cart-icon-wrapper">
                        <img src="/images/3225209.png" alt="My Image Button"  className="cart-icon"/>
                        <span className="cart-count">{authUserContext.products.length ? authUserContext.products.length : 0 }</span>
                    </Link>
                </li>
            </ul>
            }

            <div className="auth-links">
                {!authUserContext.isAuthenticated && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                {authUserContext.isAuthenticated ? 
                <>
                    
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                </>
                :
                ""
                }
                
            </div>
        </nav>
    );
};


