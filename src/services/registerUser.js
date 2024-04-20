import api from './api';

const registerUser = async (userData) => {
    try {
        console.log("chamando api ")
        console.log(userData);
        const response = await api.post('/example/example',
            JSON.stringify({userData}),
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error registering user', error);
        throw error;
    }
};

export default registerUser;