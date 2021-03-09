// 导入 axios 请求实例
import axios from './index.js';

export function getLunbo() {
    return axios.get('http://api.w0824.com/api/getlunbo')
}