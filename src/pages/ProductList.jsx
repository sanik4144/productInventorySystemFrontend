import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.username; // In a real app, you'd check the role properly

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const result = await productService.getAllProducts();
        setLoading(false);

        if (result.success) {
            setProducts(result.data);
        } else {
            setError(result.message);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        const result = await productService.deleteProduct(id);

        if (result.success) {
            setDeleteMessage(`Successfully deleted "${name}"`);
            fetchProducts(); // Refresh list
            setTimeout(() => setDeleteMessage(''), 3000);
        } else {
            setError(result.message);
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="container">
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                <div className="page-header flex-between">
                    <div>
                        <h1 className="page-title">Product Inventory</h1>
                        <p className="page-subtitle">Manage your product catalog</p>
                    </div>
                    <Link to="/products/new" className="btn btn-primary">
                        ➕ Add Product
                    </Link>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {deleteMessage && (
                    <div className="alert alert-success">
                        {deleteMessage}
                    </div>
                )}

                {products.length === 0 ? (
                    <div className="empty-state card">
                        <div className="empty-icon">📦</div>
                        <h3>No Products Yet</h3>
                        <p>Start by adding your first product to the inventory</p>
                        <Link to="/products/new" className="btn btn-primary mt-lg">
                            Add Your First Product
                        </Link>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card card">
                                <div className="product-header">
                                    <h3 className="product-name">{product.name}</h3>
                                    <span className={`stock-badge ${product.quantity > 10 ? 'in-stock' : 'low-stock'}`}>
                                        {product.quantity > 10 ? 'In Stock' : 'Low Stock'}
                                    </span>
                                </div>

                                <p className="product-description">{product.description}</p>

                                <div className="product-info">
                                    <div className="info-item">
                                        <span className="info-label">Price</span>
                                        <span className="info-value">${product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Quantity</span>
                                        <span className="info-value">{product.quantity}</span>
                                    </div>
                                </div>

                                <div className="product-actions">
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="btn btn-sm btn-secondary"
                                    >
                                        👁️ View
                                    </Link>
                                    <Link
                                        to={`/products/${product.id}/edit`}
                                        className="btn btn-sm btn-primary"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id, product.name)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
