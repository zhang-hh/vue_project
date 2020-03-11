const Mock = require('mockjs');
import data from './data';
//通过mock只能模拟ajax请求,但是 并不是真正进行的ajax请求,
// mock将ajax拦截了,让他没有去后台,生成随机数据返给客户端

//正常接口返回的数据有状态码
Mock.mock('api/seller',{status:1,data:data.sellers});
Mock.mock('api/goods',{status:1,data:data.goods});
Mock.mock('api/ratings',{status:1,data:data.ratings});