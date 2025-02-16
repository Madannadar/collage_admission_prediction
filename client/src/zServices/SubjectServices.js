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

const getAllSubjects = async (payload) => {
    try {
        const { departmentId, Year } = payload; // Extract query parameters from payload
        const response = await axios.get(`${BASE_URL}/get`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: { departmentId, Year }, // Pass query parameters
            withCredentials: false, // Changed from true to false
        });
        return response.data; // Return the data from the response
    } catch (error) {
        throw error;
    }
};

export {
    SubjectServices,
    getAllSubjects,
}