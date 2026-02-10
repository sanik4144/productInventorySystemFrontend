import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <span className="brand-icon">📦</span>
                        <span className="brand-text">Product Inventory</span>
                    </Link>

                    <div className="navbar-menu">
                        {isAuthenticated && (
                            <Link to="/products" className="nav-link">
                                Products
                            </Link>
                        )}
                    </div>

                    <div className="navbar-actions">
                        {isAuthenticated ? (
                            <>
                                <span className="user-badge">
                                    <span className="user-icon">👤</span>
                                    {user?.username}
                                </span>
                                <button onClick={handleLogout} className="btn btn-sm btn-secondary">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-sm btn-primary">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-sm btn-secondary">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
