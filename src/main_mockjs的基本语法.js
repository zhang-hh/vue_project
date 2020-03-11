import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
// 使用 Mock
const Mock = require('mockjs')
Vue.config.productionTip = false;
/*Mock.mock(obj)用来返回一些随机数,返回的随机数类型是由obj来确定的
mock返回一个对象,list是他的属性随机有1-10个对象,这个对象的id值根据你有几个对象每次加1*/
// 数据模板定义规范 DTD

/*const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-3': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})*/
//数据占位符定义规范 DPD
// 用 @ 来标识其后的字符串是 占位符。
// 占位符 引用的是 Mock.Random 中的方法 要字段包起来
// const data = Mock.mock({
//     name: {
//         first: '@FIRST',
//         middle: '@FIRST',
//         last: '@LAST',
//         full: '@first @middle @last'
//     },
//     'zhh':{color:'@color()'}
// })
// console.log(data)
// (async function() {
//     const response = await axios.get('http://localhost:8080/api/goods');
//   console.log(response)
// })()
new Vue({
  render: h => h(App),
}).$mount('#app')
