import axios from './index.js';

export function getLuo() {
    return axios.get('/api/users');
}