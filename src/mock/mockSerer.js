import Mock from 'mockjs';
import banner from './banners.json';
import floor  from './floors.json';
// json数据虽然没有暴露但是可以引入
// weboack默认对外暴露

// mock数据() 第一个参数是请求地址 第二个参数 请求数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});