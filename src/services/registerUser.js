import api from './api';

const registerUser = async (userData) => {
    try {
        console.log("chamando api ")
        console.log(userData);
        const response = await api.post('/user/register',
            JSON.stringify({userData}),
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