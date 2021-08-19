import axios from 'axios';
import {Message} from 'element-ui';
import qs from 'qs';
// import apiService, {storeToken, removeToken} from './http';
export function getCode(){
    return axios.get('/apiPath/api/captcha/get');
}
export function loginIn(userName, pwd){
    return axios({
        method: 'post',
        url: '/ct/login',
        data: qs.stringify({password: pwd,loginName: userName}),
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    })
}0