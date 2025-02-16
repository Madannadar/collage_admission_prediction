import axios from 'axios'

const BASE_URL = `http://localhost:8001/api/v1/subjects`;

const SubjectServices = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/save`, payload, {
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
    SubjectServices,
}