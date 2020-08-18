export const clearAxiosPending = () => {
    window.axiosPending = [];
}
export const pushAxiosPending = (config) => {
    if (Object.prototype.toString.call(window.axiosPending) === '[object Array]') {
        window.axiosPending.push(config);
    } else {
        window.axiosPending = new Array(1).fill(config);
    }
}
export const popAxiosPending = ({url}) => {
    if (Object.prototype.toString.call(window.axiosPending) === '[object Array]') {
        for (let i = 0; i < window.axiosPending.length; i ++) {

            const {u} = window.axiosPending[i];
            if (url == u.url) {
                window.axiosPending.splice(i,1);
                break;
            }
        }
    }
}
/*
*   config = undefined ：取消所有请求
*   config = object ：取消某一个请求
* */
export const cancelAxios = (config) => {
    if (Object.prototype.toString.call(window.axiosPending) === '[object Array]') {
        for (let i = 0; i < window.axiosPending.length; i ++) {
            const {c, u} = window.axiosPending[i];
            if (config && config.url == u.url) {
                c('axios：Operation canceled by the user.');
                window.axiosPending.splice(i,1);
                // c.cancel('axios：Operation canceled by the user.');
                break;
            } /*else {
                // c.cancel('axios：Operation canceled by the user.');
                c('axios：Operation canceled by the user.');
            }*/
        }
    }
}