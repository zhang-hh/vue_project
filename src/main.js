import Vue from 'vue'
import App from './App.vue'
import router from './router';
// 使用 Mock
import '@/mock';//没有向外暴露任何东西,整个文件也是要执行的
import '@/common/stylus/style.styl';
import '@/common/stylus/transition.styl';

Vue.config.productionTip = false;
/*Mock.mock(obj)用来返回一些随机数,返回的随机数类型是由obj来确定的
mock返回一个对象,list是他的属性随机有1-10个对象,这个对象的id值根据你有几个对象每次加1*/

import myAxios from './api/myAxios';
Vue.prototype.myAxios = myAxios; //每一个组件都都能访问到myAxios

new Vue({
  beforeMount() {
    Vue.prototype.bus = this;
  },
  router,
  render: h => h(App),
}).$mount('#app')
