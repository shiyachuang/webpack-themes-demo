import React, { Component, Suspense, lazy } from 'react';
import { observer, inject } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { Spin } from "antd"
import moment from "moment"

// let TestComp = lazy(()=>import('./b.js'))

@observer
class App extends Component  {
  @observable visibleSetCells = "B"                                         
  
  render() {

    return (
      <div>
        <h1>点击按钮aaaa切换主题</h1>
        {/* <PageManagement/> */}
        <button onClick={this.resetTheme}>default {this.visibleSetCells}</button>
        {/* <Suspense fallback="正在加载中...">
                <TestComp />
            </Suspense> */}
        {/* {
          themes.map(theme => (
            <button key={theme} onClick={() => this.changeTheme(theme)}>{theme}</button>
          ))
        } */}
      </div>
    );
  }
}

export default App;

