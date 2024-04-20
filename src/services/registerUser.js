import axios from 'axios';

const registerUser = async (userData) => {
    try {
        console.log(userData);
        const response = await axios.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user', error);
        throw error;
    }
};

export default registerUser;