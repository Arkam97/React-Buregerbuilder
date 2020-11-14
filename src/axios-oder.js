import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burgerbuilder-7c1e8.firebaseio.com/'
});


export default instance;