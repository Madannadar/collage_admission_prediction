import axios from 'axios'

const BASE_URL = `http://localhost:8001/api/v1/user`;

const registerServices = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: false, // Changed from true to false
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const loginService = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: false, // Changed from true to false
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export {
    registerServices,
    loginService,
}