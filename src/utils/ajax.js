'use strict';
import {getAuthenticationToken} from "./authentication";
import {clearAxiosPending, popAxiosPending, pushAxiosPending} from "./axiosPendingHandle";

require('es6-promise').polyfill();
import * as _axios from 'axios';
import {url} from "./api";
import {responseFilter} from "./interceptor";
// 新建实例，避免cm和dsc同时定义拦截器出现逻辑冲突
const axios = _axios.create();
const { CancelToken } = _axios;
clearAxiosPending();

axios.defaults.baseURL = '/';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use(function(config) {
    const token = getAuthenticationToken();
    const oid = localStorage.getItem('org_id').replace(/\'/g,'').replace(/\"/g,'')

    config.cancelToken = new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        pushAxiosPending({u: config, c})

    });
    config.headers = config.headers || {};
    config.data = config.data || {};

    if(token) {
        config.headers.token = token;
        config.headers.oid = oid;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(async function(response) {
        try {
            popAxiosPending(response.config);
            let {data} = response;
            const next = await responseFilter(data);
            // if(data.code && data.code != 0) {
            //     return Promise.reject(data);
            // }
            return data
        } catch (error) {
            throw error;
        }

    },
    function(error) {
        return Promise.reject(error);
    });
export const createApi = (method, api, params, data, config) => {
    try {
        if (api.indexOf('apicm') == -1) {
            api = url(api)
        }
        if (method == "get") {
            const list = {
                params
            };
            return axios[method](api, list, config);
        }
        return axios[method](api, params, config);
    } catch (error) {

        throw error;
    }
};



