import api from './api';

const loginUser = async (userData) => {
    try {
        const response = await api.post('/user/login',
            userData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.log("login user ", error)
        let err;
        if(error.response.data) err = error.response;
        else err = error;
        throw err;
    }
};

export default loginUser;