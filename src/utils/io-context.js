import RequestContext from './request-context'
const rc = new RequestContext()

const context = rc.context({
  // 后期做一下相关配置，暂不支持 19.7.26
  urlPrefix: '/api/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  withCredentials: false,
  mockUrlPrefix: '/api/',
})

export default context