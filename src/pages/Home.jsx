import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="badge-icon">✨</span>
                            <span>Product Inventory Management System</span>
                        </div>
                        <h1 className="hero-title">
                            Manage Your <span className="gradient-text">Inventory</span>
                            <br />
                            With Ease
                        </h1>
                        <p className="hero-subtitle">
                            A modern, efficient solution for tracking and managing your product catalog.
                            Built with Spring Boot and React for a seamless experience.
                        </p>
                        <div className="hero-actions">
                            {isAuthenticated ? (
                                <Link to="/products" className="btn btn-primary btn-lg">
                                    📦 View Products
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn-primary btn-lg">
                                        Get Started
                                    </Link>
                                    <Link to="/login" className="btn btn-secondary btn-lg">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <div className="container">
                    <h2 className="section-title">Key Features</h2>
                    <div className="features-grid">
                        <div className="feature-card card">
                            <div className="feature-icon">🔐</div>
                            <h3 className="feature-title">Secure Authentication</h3>
                            <p className="feature-description">
                                Role-based access control with secure password encryption
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">📊</div>
                            <h3 className="feature-title">Product Management</h3>
                            <p className="feature-description">
                                Full CRUD operations for managing your product inventory
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Real-time Updates</h3>
                            <p className="feature-description">
                                Instant updates to your inventory with live stock tracking
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">🎨</div>
                            <h3 className="feature-title">Modern UI</h3>
                            <p className="feature-description">
                                Beautiful, responsive interface that works on all devices
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">👥</div>
                            <h3 className="feature-title">Multi-User Support</h3>
                            <p className="feature-description">
                                Different roles (Admin/Viewer) with appropriate permissions
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">🚀</div>
                            <h3 className="feature-title">Fast & Reliable</h3>
                            <p className="feature-description">
                                Built with Spring Boot for performance and scalability
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
