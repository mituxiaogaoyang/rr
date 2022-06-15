import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/login';
import Home from '@/components/index';
import Banner from '@/page/index';
import news from '@/components/news';
import newsAdd from '@/components/newsAdd';
import inRuirui from '@/page/inRuirui';
import richText from '@/components/richText';
import caltpp from '@/page/caltpp';
import metting from '@/page/metting';
import train from '@/page/train';
import contact from '@/page/contact';
import newsDetail from '@/components/newsDetail';
import user from '@/components/user';
import job from '@/components/job';
import addJob from '@/components/jobAdd';
import fileManager from '@/page/fileManager';
import addBanner from '@/components/bannerAdd';
import otherApp from '@/page/otherApp';
import database from '@/page/database';
import appDetail from '@/page/app/appDetail';
import noticeDetail from '@/page/service/noticeDetail';

import databaseDetail from '@/page/app/databaseDetail';
import tecAndConsult from '@/page/service/tecAndConsult';
import orderList from '@/page/orderList'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/newsDetail/:id',
    name: 'newsDetail',
    component: newsDetail
  },
  {
    path: '/home',
    name:'home',
    component:Home,
    redirect:'/banner',
    children:[
      {
        path: '/banner',
        name:'banner',
        component:Banner,
      },
      {
        path: '/addBanner',
        name:'bannerAdd',
        component:addBanner,
      },
      {
        path: '/otherApp',
        name:'otherApp',
        component:otherApp,
      },
      {
        path: '/appDetail',
        name:'appDetail',
        component:appDetail,
      },
      // {
      //   path: '/otherApp',
      //   name:'allProducts',
      //   component:otherApp,
      // },
      {
        path: '/job',
        name:'job',
        component:job,
      },
      {
        path: '/addJob',
        name:'addJob',
        component:addJob,
      },
      {
        path: '/news',
        name:'news',
        component:news,
      },
      {
        path: '/addNews',
        name:'newsAdd',
        component:newsAdd,
      },
      {
        path: '/inRuirui',
        name:'inRuirui',
        component:inRuirui,
      },
      {
        path: '/richTextEdit/:page',
        name:'richText',
        component:richText,
      },
      {
        path: '/caltpp',
        name:'caltpp',
        component:caltpp,
      },
      {
        path: '/metting',
        name:'metting',
        component:metting,
      },
      {
        path: '/train',
        name:'train',
        component:train,
      },
      {
        path: '/contact',
        name:'contact',
        component:contact,
      },
      {
        path: '/user',
        name:'user',
        component:user,
      },
      {
        path: '/fileManager',
        name:'fileManager',
        component:fileManager,
      },
      {
        path: '/noticeDetail',
        name: 'noticeDetail',
        component: noticeDetail,
      },
      {
        path: '/tecAndConsult',
        name: 'tecAndConsult',
        component: tecAndConsult,
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: orderList,
      },{
        path: '/database',
        name: 'database',
        component: database,
      },
      {
        path: '/databaseDetail',
        name: 'databaseDetail',
        component: databaseDetail,
      },
    ]
  }
];

const router = new VueRouter({
  routes
});
// router.beforeEach((to, from, next) =>{
//   const token = sessionStorage.getItem('accessToken');
//   const refreshToke =  sessionStorage.getItem('refreshToken');
//   const isLogin = token && refreshToke;
//   if(!isLogin && to.name !== 'login'){
//     next({ path: '/login' });
//   }else{
//     next();
//   }
// });


export default router;
