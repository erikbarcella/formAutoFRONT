import api from './api';

const registerUser = async (userData) => {
    try {
        const response = await api.post('/user/register',
            userData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        let err;
        if(error.response.data) err = error.response;
        else err = error;
        throw err;
    }
};

export default registerUser;