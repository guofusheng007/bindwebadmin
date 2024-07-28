import React from 'react';
import {ShareInfo} from "@/public/shareinfo";

export default {
    //title配置
    //title: AppConf.title,
    
    //背景图片
    /*
    bgLayoutImgList: [
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          left: 85,
          bottom: 100,
          height: '303px',
        },
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          bottom: -68,
          right: -45,
          height: '303px',
        },
        {
          src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
          bottom: 0,
          left: 0,
          width: '331px',
        },
   ],
   */
   //跨站点导航列表: logo前面的应用列表
  appList: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'Ant Design',
      desc: '杭州市较知名的 UI 设计语言',
      url: 'https://ant.design',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      title: 'AntV',
      desc: '蚂蚁集团全新一代数据可视化解决方案',
      url: 'https://antv.vision/',
      target: '_blank',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
      title: 'Pro Components',
      desc: '专业级 UI 组件库',
      url: 'https://procomponents.ant.design/',
    },
    {
      icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
      title: 'umi',
      desc: '插件化的企业级前端应用框架。',
      url: 'https://umijs.org/zh-CN/docs',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
      title: 'qiankun',
      desc: '可能是你见过最完善的微前端解决方案🧐',
      url: 'https://qiankun.umijs.org/',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      title: '语雀',
      desc: '知识创作与分享工具',
      url: 'https://www.yuque.com/',
    },
  ],

  //通过 token 修改样式
  /*
  token: {
    colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
    colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
    colorTextAppListIcon: 'rgba(255,255,255,0.85)',
    sider: {
      colorBgCollapsedButton: '#fff',
      colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
      colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
      colorMenuBackground: '#004FD9',
      colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
      colorMenuItemDivider: 'rgba(255,255,255,0.15)',
      colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
      colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
      colorTextMenuSelected: '#fff',
      colorTextMenuItemHover: 'rgba(255,255,255,0.75)',
      colorTextMenu: 'rgba(255,255,255,0.75)',
      colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
      colorTextMenuTitle: 'rgba(255,255,255,0.95)',
      colorTextMenuActive: 'rgba(255,255,255,0.95)',
      colorTextSubMenuSelected: '#fff',
    },
    header: {
      colorBgHeader: '#004FD9',
      colorBgRightActionsItemHover: 'rgba(0,0,0,0.06)',
      colorTextRightActionsItem: 'rgba(255,255,255,0.65)',
      colorHeaderTitle: '#fff',
      colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
      colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
      colorTextMenuSelected: '#fff',
      colorTextMenu: 'rgba(255,255,255,0.75)',
      colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
      colorTextMenuActive: 'rgba(255,255,255,0.95)',
    },
  },
  */
}