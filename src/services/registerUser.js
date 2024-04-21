import api from './api';

const registerUser = async (userData) => {
    try {
        const response = await api.post('/user/register',
            JSON.stringify({userData}),
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log("API RESPONSE =>>>", response.data)
        return response.data;
    } catch (error) {
        console.log("API ERROR =>>>", error)
        let err;
        if(error.response.data) err = error.response;
        else err = error;
        throw err;
    }
};

export default registerUser;