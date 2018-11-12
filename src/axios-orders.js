import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-fbf05.firebaseio.com/'
});

export default instance;