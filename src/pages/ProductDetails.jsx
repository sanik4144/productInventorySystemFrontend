import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        const result = await productService.getProductById(id);
        setLoading(false);

        if (result.success) {
            setProduct(result.data);
        } else {
            setError(result.message);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            return;
        }

        const result = await productService.deleteProduct(id);

        if (result.success) {
            navigate('/products');
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

    if (error || !product) {
        return (
            <div className="page">
                <div className="container">
                    <div className="alert alert-danger">
                        {error || 'Product not found'}
                    </div>
                    <Link to="/products" className="btn btn-secondary">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                <div className="details-container">
                    <Link to="/products" className="back-link">
                        ← Back to Products
                    </Link>

                    <div className="card details-card">
                        <div className="details-header">
                            <div>
                                <h1 className="details-title">{product.name}</h1>
                                <span className={`stock-badge ${product.quantity > 10 ? 'in-stock' : 'low-stock'}`}>
                                    {product.quantity > 10 ? 'In Stock' : 'Low Stock'}
                                </span>
                            </div>
                            <div className="details-actions">
                                <Link to={`/products/${id}/edit`} className="btn btn-primary">
                                    ✏️ Edit
                                </Link>
                                <button onClick={handleDelete} className="btn btn-danger">
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>

                        <div className="details-body">
                            <div className="detail-section">
                                <h3 className="section-title">Description</h3>
                                <p className="section-content">{product.description}</p>
                            </div>

                            <div className="details-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Product ID</span>
                                    <span className="detail-value">#{product.id}</span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Price</span>
                                    <span className="detail-value price">${product.price.toFixed(2)}</span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Quantity in Stock</span>
                                    <span className="detail-value">{product.quantity} units</span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Total Value</span>
                                    <span className="detail-value price">
                                        ${(product.price * product.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
