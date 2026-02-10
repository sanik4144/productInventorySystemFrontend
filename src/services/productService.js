import api from './api';

const productService = {
    // Get all products
    getAllProducts: async () => {
        try {
            const response = await api.get('/api/products');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch products',
            };
        }
    },

    // Get single product by ID
    getProductById: async (id) => {
        try {
            const response = await api.get(`/api/products/${id}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch product',
            };
        }
    },

    // Create new product
    createProduct: async (productData) => {
        try {
            const response = await api.post('/api/products', productData);
            return { success: true, message: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create product',
            };
        }
    },

    // Update product
    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/api/products/${id}`, productData);
            return { success: true, message: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update product',
            };
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/api/products/${id}`);
            return { success: true, message: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to delete product',
            };
        }
    },
};

export default productService;
