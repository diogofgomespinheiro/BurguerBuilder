import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burguer-27a49.firebaseio.com/'
})

export default instance;