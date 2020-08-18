import { syncHistoryWithStore } from "mobx-react-router";
import createBrowserHistory from "history/createBrowserHistory";
import RoutingStore from "./models/RoutingStore";

const browserHistory = createBrowserHistory();
/*
*   location就是window.location的一个子集
*   action可能的值，"PUSH", "REPLACE", "POP"
*   添加history listen 的原因：
*   history.push(...)会触发PUSH 和 POP 两次路由的变化
*   导致路由组件重复挂载两次 会导致dashboard echarts 报错
*   页面渲染失真
* */
browserHistory.listen( (location,action) => {
    if (action == "PUSH") {
        location.pathname = ""
    }
});
const history = syncHistoryWithStore(browserHistory, RoutingStore);

export default history;