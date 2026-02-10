import api from './api';

const authService = {
    // Login - store credentials in localStorage
    login: async (username, password) => {
        try {
            // Test authentication by fetching products
            const credentials = btoa(`${username}:${password}`);
            const response = await api.get('/api/products', {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            });

            // If successful, store user data
            const user = { username, password };
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, user };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            };
        }
    },

    // Register new user
    register: async (userData) => {
        try {
            const response = await api.post('/api/auth/register', userData);
            return { success: true, message: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
            };
        }
    },

    // Logout - clear user data
    logout: () => {
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return localStorage.getItem('user') !== null;
    },
};

export default authService;
