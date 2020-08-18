// 处理错误信息

import ModalAlert from "../components/Models.alert";
import { COMMON_MANAGEMEN, isEnAsZh } from "../translation";
import {clearAuthenticationToken} from "./authentication"

export async function responseFilter(res) {

  if(+res.code === 1) {
      clearAuthenticationToken()
      window.localStorage.removeItem("expire_time");
      if (res.data.indexOf('redirect_uri=') != -1) { //am登录后跳转定位dsc菜单用 （预警邮件）
        localStorage.removeItem("userAbout")
        window.location.replace(res.data);
      }else if(window.localStorage.getItem("userAbout")) {
        let url = getUrl()
        window.location.replace(url+"/login");
      }else {
        window.location.replace((res.data.login_url || res.data).split("?")[0])
      }
      return false
  }else if(+res.code === 1620){
      clearAuthenticationToken()
      window.localStorage.removeItem("expire_time");
      let url = getUrl()
      ModalAlert.showInfo({
          type: 'question',
          title: COMMON_MANAGEMEN[isEnAsZh()].Y_A_I_L_I_S,
          closable: false,
          okText: COMMON_MANAGEMEN[isEnAsZh()].REVAMP,
          callback: () => {
              window.location.replace(url+"/forgetPassword?from=1620")
          },
          cancelCallback: () => {
              window.location.replace(url+"/login")
          }
      })
      return false
  } else {
      return true
  }
}
const getUrl = () => {
    const arr = location.href.split("?");
    let loginHost = JSON.parse(window.localStorage.getItem("userAbout"))[
        "login_url"
        ];
    loginHost = loginHost.replace("login", "");
    let url = arr.length == 2 ? loginHost + "?host=" + location.origin + "&" + arr[1] : loginHost;
    url = url.replace("/default", "");
    return url
}

// 适配新接口规范的响应拦截
export async function responseInterceptor(res) {
    if (+res.code === 1) {
      clearAuthenticationToken()
      setTimeout(() => {
        if (res.data.indexOf('redirect_uri=') != -1) { //am登录后跳转定位dsc菜单用 （预警邮件）
          localStorage.removeItem("userAbout")
          window.location.replace(res.data);
        }else if(window.localStorage.getItem("userAbout")) {
          let url = getUrl()
          window.location.replace(url+"/login");
        }else {
          window.location.replace((res.data.login_url || res.data).split("?")[0])
        }
      }, 200)
      // 登陆失效
    }else if (+res.code === 1506) {
      ModalAlert.showInfo({
        type: "warning",
        title: res.msg,
      })
    } else if (+res.code === 1620) {
      clearAuthenticationToken()
      setTimeout(() => {
        window.location.replace((res.data.login_url || res.data).split("?")[0])
      }, 200)
      
    }
    return res
  }