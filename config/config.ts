import { defineConfig } from "umi";
import {UmiRouter,RouterListExtr} from "./router";

export default defineConfig({
  //devServer: false,
  //路由配置
  routes :[
    ...UmiRouter,
    ...RouterListExtr,
  ],
  define: { 
    // 在项目中，可以通过process.env.NODE_ENV 或者
    // process.env.UMI_ENV 或者process.env.date得到对应环境的值
    'process.env': {
      //--------------------------------------------------------------------------------------------------
      //容器方式发行时的初始值,不能改变
      /*
      REACT_APP_API_URL:'http://192.168.3.110:9090/',   //此配置值仅用于docker compose时的容器打包时的初始值
      ICP:'ICP_ICP_ICP_ICP_ICP',
      OTHERCODE:'OTHERCODE8899OTHERCODE',
      LOGIN_FOOTER_TEXT:'FOOTER_TEXT_INFO_TXT_FOORTER',
      APP_TITLE:'APPTITLEAPPTILE',  
      Footter_line_sider_1:'Footter_line_sider_1_888888888',
      Footter_line_sider_2:'Footter_line_sider_2_999999999',
      Footter_line_1:'Footter_line_1_00000000',
      Footter_line_2:'Footter_line_2_11111111',
      TTLApiToken: 315360000000111,
      TTLCookie:864000000000111, 
      */
      
      //--------------------------------------------------------------------------------------------------
      //源码发行时的值
      REACT_APP_API_URL:'https://api.mm-dns.com/',   //必须是 / 为结束
      //REACT_APP_API_URL:'http://192.168.3.110:9090/',
      //REACT_APP_API_URL:'http://47.115.43.179:9090/', 
      //REACT_APP_API_URL:'http://192.168.3.7:9090/',
      ICP:'粤ICP备2024267436号-1',
      OTHERCODE:'粤公网安备44030002003924号',
      LOGIN_FOOTER_TEXT:'Mobile: 13751090806    email: info@mm-dns.com',
      APP_TITLE:'mmDNS',  
      //sider页脚
      Footter_line_sider_1:'mmDNS',
      Footter_line_sider_2:'mm-dns.com',
      //普通页面页脚
      Footter_line_1:'DNS自主系统',
      Footter_line_2:'by mm-dns.com',
      //前端在产生api Token时为该token配置的TTL
      //#1年=1000*60*60*24*365*1=31536000000
      TTLApiToken: 315360000000,
      //前端所有cookie的TTL值
      //1天:60*60*1000*24
      TTLCookie: 86400000,
      
    },
  },
  npmClient: 'yarn',
});
