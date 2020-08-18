import React, { Component }  from "react";
import { Provider } from "mobx-react";
import { Router } from "react-router";
import AuthorizedRoute from "./routes/AuthorizedRoute";
import MainRoute from "./routes/MainRoute";
import history from "./history";
import RoutingStore from "./models/RoutingStore";
import TemplateManStore from './models/domain/TemplateManStore'
import CampaignGroupStore from './models/domain/CampaignGroupStore'
import CampaignViewStore from './models/domain/CampaignViewStore'
import CampaignDetailStore from './models/domain/CampaignDetailStore'
import CampaignAddStore from './models/domain/CampaignAddStore'
import { setConfiguration } from "./utils/configuration";
import "./css/index.less";
import "react-virtualized/styles.css";
import "react-virtualized-tree/lib/main.css";
import {Spin} from "antd";
import TranslationStore from "./models/domain/TranslationStore";
import SubscriptionStore from "./models/domain/SubscriptionStore";
import AddSubscriptionStore from "./models/domain/AddSubscriptionStore";
import AddSubscriptionModal from "./models/domain/AddSubscriptionModalStore";
import SGMDashboardStore from "./models/domain/SGMDashboardStore";
import BUICKDashboardStore from "./models/domain/BUICKDashboardStore";
import DataSetStore from "./models/domain/DataSetStore"
import Loading from "./components/Loading"
Spin.setDefaultIndicator(<Loading/>)

setConfiguration(`API_ROOT`, `/api`);

const stores = {
  routing: RoutingStore,
  translation: new TranslationStore(),
  templateman: TemplateManStore,            //模板管理
  campaignAdd: CampaignAddStore,
  campaignGroup: CampaignGroupStore,
  campaignView: CampaignViewStore,
  campaignDetail: CampaignDetailStore,
  dataSetStore: DataSetStore,
  subscription: SubscriptionStore,          // 订阅
  addSubscription: AddSubscriptionStore,
  addSubscriptionModal: AddSubscriptionModal,
  sgmDashboard: SGMDashboardStore,          // 通用Dashborad
  buickDashboard: BUICKDashboardStore,      // 别克Dashborad
};
class App extends Component {
  componentDidMount() {
    moment.locale(localStorage.getItem('i18n') == 'en' ? 'en' : 'zh-cn'); // moment 国际化
  }
  render() {
    return (
      <div className="measurelib-box" style={{height: '100%', position: 'relative'}}>
      <Provider {...stores}>
        <Router history={history}>
          <AuthorizedRoute path="/measurelibApp" component={MainRoute} />
        </Router>
      </Provider>
      <div id="measurelib-box-global-loading">
          <Spin style={{position: "absolute", top: '50%', left: '50%'}}/>
      </div>
    </div>
    );
  }
}


export default App;
