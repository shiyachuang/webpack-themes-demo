import { zh_common, en_common } from './translation/common'
import { zh_addCamp, en_addCamp } from './translation/addCampaign'
import { zh_subscription, en_subscription } from './translation/subscription'
import { zh_sgmDashborad, en_sgmDashborad } from './translation/sgmDashboard'
import { zh_Card, en_Card } from "./translation/card"
import { zh_pageManagement, en_pageManagement } from './translation/pageManagement'
import { zh_datasetDetail, en_datasetDetail } from './translation/datasetDetail'
import { zh_layout, en_layout } from './translation/layout'
import { zh_drawer, en_drawer } from './translation/drawer'
import { zh_template, en_template } from './translation/templateMangagement'
import { zh_campaign, en_campaign } from './translation/campaignGroup'
import { zh_template_c, en_template_c } from './translation/template'
import { zh_drill_path, en_drill_path } from "./translation/drillPath"
import { zh_report_path, en_report_path } from "./translation/reportSet"
import { zh_ADDCard, en_ADDCard } from "./translation/addCard"
import { zh_message_center, en_message_center } from "./translation/header"
export const TEMPLATE_TRANSLATION = {
  EN: en_template_c,
  ZH: zh_template_c,
};

export const CAMPAIGN_GROUP_TRANSLATION = {
  EN: en_campaign,
  ZH: zh_campaign,
};

export const ADD_CAMPAIGN_GROUP_TRANSLATION = {
  EN: en_addCamp,
  ZH: zh_addCamp,
};

export const SUBSCRIPTION_TRANSLATION = {
  EN: en_subscription,
  ZH: zh_subscription,
};

export const SGMDASHBORAD_TRANSLATION = {
  EN: en_sgmDashborad,
  ZH: zh_sgmDashborad,
};

export const CARD_TRANSLATION = {
  EN: en_Card,
  ZH: zh_Card,
};

export const PAGEMANAGEMENT_TRANSLATION = {
  EN: en_pageManagement,
  ZH: zh_pageManagement,
};

export const DATASETDETAIL_TRANSLATION = {
  EN: en_datasetDetail,
  ZH: zh_datasetDetail,
}

export const LATOUT_TRANSLATION = {
  EN: en_layout,
  ZH: zh_layout,
}

export const DRAWER_TRANSLATION = {
  EN: en_drawer,
  ZH: zh_drawer,
}

export const TEMPLATE_MANAGEMEN = {
  EN: en_template,
  ZH: zh_template,
}
export const COMMON_MANAGEMEN = {
  EN: en_common,
  ZH: zh_common,
}

export const DRILL_PATH_TRANSLATION = {
  EN: en_drill_path,
  ZH: zh_drill_path,
}
export const REPORTSET_TRANSLATION = {
  EN: en_report_path,
  ZH: zh_report_path,
}

export const ADDCARD_TRANSLATION = {
  EN: en_ADDCard,
  ZH: zh_ADDCard,
}
export const HEADER_TRANSLATION = {
  EN: en_message_center,
  ZH: zh_message_center,
}

export const isEnAsZh = () => localStorage.getItem('i18n') == 'en' ? 'EN' : 'ZH'