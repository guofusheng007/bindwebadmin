import React from 'react';   //此行为必须项

import {
  MailOutlined,
  AppstoreTwoTone,
  AppstoreOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overridden)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});

//定义数据类型
interface LayoutRouterType {
  key?: string;
  path: string;
  name: string;
  icon?: any;
  component?: string;
  hideInMenu?: boolean;
  routes?:LayoutRouterType[];
}

//这类路由用于prolayout框架内。
const RouterListProLayout:LayoutRouterType[] = [   
  //直接采用url
  {
    key:"about",
    path:"/about",
    name:"Home",
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    //icon: <MailOutlined />,
    component: "@/pages/about.tsx",
    //component: "@/test/about.tsx",
  },

  {
    key:"domain",
    path:"/domain",
    name:"域名管理",
    //icon:<MailOutlined />,
    icon: <IconFont type="icon-python" />,  
    component: "@/pages/domain.tsx",
    routes: [
      {
        key:"domainlist",
        path:"domainlist",
        name:"域名列表",
        icon:<MailOutlined />,
        component: "@/pages/domain_soa/domain_list.tsx",
      },
      {
        key:"recordlist",
        path:"recordlist",
        name:"域名解析表",
        icon:<MailOutlined />,
        component: "@/pages/domain_record/record_list.tsx",
      },
    ]
  },


  {
    key:"userconf",
    path:"/userconf",
    name:"配置",
    icon:<AppstoreOutlined />,
    component: "@/pages/userconf/userconf.tsx",
    //hideInMenu:true,
    routes: [
      {
        key:"userinfo",
        path:"userinfo",
        name:"基本信息",
        icon:<MailOutlined />,
        component: "@/pages/userconf/userinfo.tsx",
      },
      {
        key:"chpwd",
        path:"chpwd",
        name:"修改密码",
        icon:<MailOutlined />,
        component: "@/pages/userconf/chpwd.tsx",
      },
    ]
  },
]

//这类路由用于prolayout框架外
const RouterListExtr = [
  { path: "/", redirect: '/about'}, 
  {
    key:"login",
    path:"/login",
    name:"login",
    component: "@/pages/login/login.tsx",
    layout:false,
  },
  /*
  {
    key:"userconf",
    path:"/userconf",
    name:"userconf",
    //icon:<MailOutlined />,
    //hideInMenu:true,
    component: "@/test/userconf.tsx",
    //layout:false,
  },
  */
  { path: "*", component: "@/pages/404.tsx"}, 

]

//在umi中，路由中配置图标时采用字串方式，如
//   icon:"MailOutlined"
//而在prolayout中，菜单的图标配置采用dom对像方式，如下
//   icon:<MailOutlined />
//此函数功能就是将图标格式转换一下。
//   先配置成icon:<MailOutlined />供prolayout使用，再转换成icon:"MailOutlined"供路由配置使用。
//   若icon本身是http方式，不再转换。
//其实路由不需要图标，可以不配置，在转换过程过程中直接配置空该项即可。
function loopMenuItem(routerlist: LayoutRouterType[]):any {
  return (
    routerlist.map(
      ( { icon, routes, ...item } ) => { 
          let iconname = ''
          //const iconname = icon.type.displayName
          //console.log("icon name:",iconname)
          if (icon) {
            if ((typeof icon) === "string") {
              iconname = icon
            } else {
              iconname = icon.type.displayName
            }
          } {
            iconname = ''
          }
          //返回新item
          return ({
            ...item,
            icon: iconname,
            routes: routes && loopMenuItem(routes),
        })
       }
    )
  )
}

//将prolayout菜单配置格式转换成umi路由识别格式。
const UmiRouter = loopMenuItem(RouterListProLayout)


export {
  RouterListProLayout,   //供prolayout导航菜单使用,作为其参数routes值使用。与UmiRouter条目一一对应。
  UmiRouter,             //供umi路由配置,此类路由嵌套在prolayout框架内有菜单条目
  RouterListExtr,        //供umi路由配置,此类路由在prolayout框架没有菜单条目。显示内容可以框架内或外。
}
