import axios from 'axios'

const BASE_URL = `http://localhost:8001/api/v1/user/register`;

const registerServices = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}`, payload, {
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

export {
    registerServices,
}