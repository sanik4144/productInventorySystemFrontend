import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import productService from '../services/productService';
import './ProductForm.css';

const ProductForm = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fetchLoading, setFetchLoading] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        const result = await productService.getProductById(id);
        setFetchLoading(false);

        if (result.success) {
            setFormData(result.data);
        } else {
            setError(result.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (parseFloat(formData.price) <= 0) {
            setError('Price must be greater than 0');
            setLoading(false);
            return;
        }

        if (parseInt(formData.quantity) < 0) {
            setError('Quantity cannot be negative');
            setLoading(false);
            return;
        }

        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
        };

        let result;
        if (isEditMode) {
            result = await productService.updateProduct(id, productData);
        } else {
            result = await productService.createProduct(productData);
        }

        setLoading(false);

        if (result.success) {
            navigate('/products');
        } else {
            setError(result.message);
        }
    };

    if (fetchLoading) {
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
                <div className="form-container">
                    <div className="page-header">
                        <h1 className="page-title">
                            {isEditMode ? 'Edit Product' : 'Add New Product'}
                        </h1>
                        <p className="page-subtitle">
                            {isEditMode
                                ? 'Update product information'
                                : 'Fill in the details for your new product'}
                        </p>
                    </div>

                    <div className="card">
                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Product Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Wireless Mouse"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Provide a detailed description of the product"
                                    rows="4"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="price">Price ($) *</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0.01"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity *</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <Link to="/products" className="btn btn-secondary">
                                    Cancel
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading
                                        ? isEditMode
                                            ? 'Updating...'
                                            : 'Creating...'
                                        : isEditMode
                                            ? '💾 Update Product'
                                            : '➕ Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
