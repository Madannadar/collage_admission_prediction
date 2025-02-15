import axios from 'axios'

const BASE_URL = `${process.env.BASE_URL}/user/register`;

const registerServices = async (payload) => {
    try {
        const response = await axios.post(`${BACKEND_URL}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export {
    registerServices,
}