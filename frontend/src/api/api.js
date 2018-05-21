import axios from 'axios';
import { base } from 'config';

axios.defaults.withCredentials = true;

var qs = require('qs');

let form_header = { 'Content-Type': 'application/x-www-form-urlencoded' };

// 全局注册异常处理方法
export const handleException = el => {
  axios.interceptors.response.use(function(response) {
    // 未登录
    if (response.data.code === 1101) {
      localStorage.removeItem('user');
      el.$router.push({ path: '/login' });
    }
    if (response.data.flush_storage) {
      localStorage.removeItem('user');
      axios.get(`${ base }/auth`).then((ret) => {
        let { code, data } = ret.data;
        if (code !== 1) {
          el.$router.push({path: el.$route.query.redirect});
        } else {
          localStorage.setItem('user', JSON.stringify(data));
        }
      });
    }
    return response;
  });
};

// 远程调用 get/delete/post/put/patch
export const call = (api, method, params) => {
  method = method ? method : 'get';

  if (api.substr(0, 1) !== '/') {
    api = '/' + api;
  }

  api = base.substr(-1) === '/' ? (base.substr(0, base.length - 1) + api) : (base + api);

  // get请求
  if (method === 'get') {
    return axios.get(api, {params: params}).then(ret => ret.data);
  }

  // delete请求
  if (method === 'delete') {
    return axios.delete(api, {params: params}).then(ret => ret.data);
  }

  // post请求
  if (method === 'post') {
    return axios.post(api, qs.stringify(params), {headers: form_header}).then(ret => ret.data);
  }

  // put请求
  if (method === 'put') {
    return axios.put(api, qs.stringify(params), {headers: form_header}).then(ret => ret.data);
  }

  // patch请求
  if (method === 'patch') {
    return axios.patch(api, qs.stringify(params), {headers: form_header}).then(ret => ret.data);
  }
};
