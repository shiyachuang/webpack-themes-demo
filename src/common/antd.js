/*
*   二次封装antd组件 加公共样式
*
* */
import styled from "styled-components";
import {Select, Input, DatePicker, Tooltip, Table, Upload} from "antd/lib/index";
import Loading from '../components/Loading'
const {RangePicker} = DatePicker
export const SelectAntd = styled(Select)`
    &.ant-select {
        .ant-select-selection, .ant-select-focused  {
            border-radius: 0px;
            border: 1px solid #e7e7e7;
            box-shadow: none;
            &:hover {
                border: 1px solid #dedede;
            }
            &:active, &:focus {
                box-shadow: none;
            }
        }
    }
`

export const InputAntd = styled(Input)`
    &.ant-input{
        box-shadow: none;
        border-radius: 0;
        &:active, &:focus {
            box-shadow: none;
            border-radius: 0;
        }
    }
`


export const RangePickerAntd = styled(RangePicker)`
    .ant-calendar-picker-input{
        box-shadow: none;
        border-radius: 0;
        &:active, &:focus {
            box-shadow: none;
            border-radius: 0;
        }
    }
`

//  没有^的白色提示框
export const TooltipAntd = styled(Tooltip)` 
   .ant-tooltip-inner {
        padding: 7px 18px;
        font-size: 12px;
        background: #fff;
        border: 1px solid #e4e4e4;
        -moz-box-shadow: 0 1px 5px 1px rgba(0,0,0,0.13);
        -webkit-box-shadow: 0 1px 5px 1px rgba(0,0,0,0.13);
        box-shadow: 0 1px 5px 1px rgba(0,0,0,0.13);
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        color: #999;
    }
`
export const TableAntd = styled(Table)`
    .ant-table-body::-webkit-scrollbar {
        width: 6px;
        height: 6px !important;
    }
    .ant-table-body::-webkit-scrollbar-thumb {
        &:hover {
            background:#8d8d8d;
        }
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
        padding: 0 0 0 20px;
    }
    .ant-table-header, .ant-table-body {
        overflow: auto !important;
    }
    .ant-table-tbody > tr.ant-table-row-selected td {
        background-color: #fff;
    }
    .ant-table-header {
        margin-bottom: -16px !important;
        th {
            border: none !important;
        }
    }
    .ant-table-row:hover {
        td {
            background: #efefef !important;
        }
    }
    th {
        background-color: #fff !important;
    }
    .ant-empty-image {
        display: none;
    }
    .ant-table-selection-column {
        padding: 0px 0px 0px 8px !important;
    }
    .ant-table-placeholder {
        border-bottom: none;
        .ant-empty-description {
            font-family: "iconfont" !important;
            font: 14px/1.5 'Open Sans', Arial, Helvetica, sans-serif;
            color: rgba(153, 153, 153, 0.8);
            -webkit-font-smoothing: antialiased;
            -webkit-tap-highlight-color: transparent;
            :before {
                content: "\\e692";
            }
        }
    }
    .ant-table-row  {
        &:hover {
            .operation {
                -ms-filter: progid=DXImageTransform.Microsoft.Alpha(Opacity=1) !important;
                filter: alpha(opacity=1) !important;
                opacity: 1 !important;
            }
        }
        .operation {
            line-height: 36px;
            -ms-filter: progid=DXImageTransform.Microsoft.Alpha(Opacity=0);
            filter: alpha(opacity=0);
            opacity: 1;
            -webkit-transition: all ease 0.3s;
            -moz-transition: all ease 0.3s;
            -o-transition: all ease 0.3s;
            transition: all ease 0.3s;
        }
    }
    
`

export const FixedLoading = styled(Loading)`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    .LoadingWarp {
        position: relative;
    }
`


export const UploadAntd = styled(Upload)`
    &.up{
        display: inline-block;
        width: 100%;
    }
    .ant-upload-list {
        display: none;
    }

`