/*
 * @Author: renfeng 
 * @Date: 2020-03-21 10:27:55 
 * @Last Modified by: renfeng
 * @Last Modified time: 2020-03-26 15:29:32
 */

import axios from 'axios';
import {Message} from 'element-ui';
import qs from 'qs';
const apiContextPath_auth = '/ct'; // 登录认证

export const aliOsSite = 'http://ori-portal.oss-cn-shanghai.aliyuncs.com/portal/'; //图片存储地址
let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',

};
export function storeToken(accessToken){
    sessionStorage.setItem('access_token', accessToken);
}
export function removeToken(){
    sessionStorage.removeItem('accessToken');
}
function getToken(){
    const userToken = {
        'access_token': sessionStorage.getItem('access_token'),
    };
    return userToken;
}
let flagException = false ;//是否有异常提示，防止页面同时存在多个异常提示
function exceptionHandler(code, message){
    if(flagException) return;
    flagException = true;
    setTimeout(() =>{
        flagException = false;
    },3000);
    if (code === 401 ||code === -4 ||code === -5){
        Message({
            type: 'error',
            message: '登录失效请重新登录'
        });
        setTimeout(function(){
            removeToken();
            location.href = location.protocol + '//' + location.host +'/#/login';
        },1000);
    }else{
        message && Message({
            type: 'error',
            message: message
        });
    }
}
let expiration = sessionStorage.getItem('expiration'); //token过期时间
export function refreshToken(){
    const userToken = getToken();
    headers['access-token'] = userToken['access_token'];
    // headers.token = userToken.accessToken
    return new Promise((resolve) =>{
        axios.request(apiContextPath_auth + '/auth/token', {
            headers: headers,
            method: 'get',
            data: JSON.stringify({
                // token: userToken.accessToken,
                Authorization: userToken.refreshToken
            })
        }).then(result =>{
            const res = result.data;
            if (res.result === 200) {
                expiration = res.data.expiration;
                sessionStorage.setItem('expiration', expiration);
                storeToken(res.data.token, res.data.refreshToken);
                resolve(res.data.token);
            } else {

                exceptionHandler(res.result, res.message);
            }
        }).catch(err =>{
            //err.response.status === 500 && 
            exceptionHandler(err.response.status, '服务异常！');
            
        });
    });
}
function openFile(url, filename, target){
    let link = document.createElement('a');
    link.setAttribute('id', 'simulate_a_clickEvent');
    link.setAttribute('href', url);
    target && link.setAttribute('target', target);
    filename && link.setAttribute('download', filename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
export  function apiAxios(options, downloadName) {
    const userToken = getToken();
    headers['access-token'] = userToken['access_token'];
    // delete headers.refreshToken
    options.headers = headers;
    return new Promise((resolve, reject) =>{
        axios.request(options)
            .then(result =>{
                const res = result.data;
                if(options.responseType === 'blob'){ //download
                    const reader = new FileReader();
                    reader.readAsDataURL(res);
                    const href = window.URL.createObjectURL(res);
                    reader.onload = (e) => {                        
                        //openFile(e.target.result)
                        let str = e.target.result;
                        try {
                            str = !str || JSON.parse(str);
                            exceptionHandler(500, '下载失败');
                            reject();
                        } catch (e) {
                            const href = window.URL.createObjectURL(res);
                            openFile(href, downloadName);
                            resolve(href);
                        }
                    };
                }else{
                    if(res &&  res.code === 0){
                        resolve(res);
                    }else{
                        res && exceptionHandler(res.code, res.msg || '服务异常');
                        reject();
                    }
                }
                
            }).catch(error => {
                
                const res = error.response;
                res && exceptionHandler(res.status || 500, '服务异常');
                reject();
            });
    });
    
}

export default {
    get: (url, data) =>{
        let options = { url ,method: 'get'};
        data && (options.params = data);
        return apiAxios(options);
    },
    post: (url, data)=>{
        let options = { url, method: 'post'};
        data && (options.data = qs.stringify(data));
        return apiAxios(options);
    },
    put: (url, data)=>{
        let options = { url, method: 'put'};
        data && (options.data = JSON.stringify(data));
        return apiAxios(options);
    },
    delete: (url, data) =>{
        let options = { url ,method: 'delete'};
        data && (options.params = data);
        return apiAxios(options);
    },
    download: (url,name,data, method) =>{
        let options = { url ,method: method||'get',responseType: 'blob'};
        if(data){
            if(options.method === 'get'){
                options.params = data;
            }else{
                options.data = JSON.stringify(data);
            }
        }
        return apiAxios(options,name);
    }
};

