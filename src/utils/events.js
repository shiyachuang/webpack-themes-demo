/**
 * TODO 自定义通知事件 
 * **/ 


import { EventEmitter } from 'events';
export default new EventEmitter();


/**
 * componentDidMount() {
 *    组件装载完成以后声明一个自定义事件
 *    this.eventEmitter = emitter.addListener('CardSizeChange', (message) => {
 *       console.log(message);
 *     });
 *    }
 *    componentWillUnmount() {
 *     emitter.removeListener(this.eventEmitter);
 *    }
 *   
 *    通知
 *    emitter.emit("CardSizeChange", {cardId, imgsize})
 * 
 * **/ 