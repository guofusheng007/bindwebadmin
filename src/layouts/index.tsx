import React, {useEffect, useState } from 'react';
import { useNavigate,Navigate} from "react-router-dom";
import { Outlet } from 'umi'
import { useLocation } from 'react-router-dom';
import { UpdateToken } from '../pages/login/token_update.js'
import { history } from 'umi';
import cookie from 'react-cookies'
import { Encrypt, Decrypt,EncryptIV, DecryptIV} from '@/public/crypto';
import {ShareInfo,cookieData} from "@/public/shareinfo";

import {
  Dropdown,
} from 'antd';

import {
    PageContainer,
    ProLayout,
    DefaultFooter,
    MenuDataItem,
    ProConfigProvider,
} from '@ant-design/pro-components';

import {
  LogoutOutlined,
  EditOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';

import defaultProps from './_defaultProps';

//引入菜单文件(从路由提取)
import  {RouterListProLayout} from '../../config/router'

//图标动画css
import '../assets/logo.scss';

//网站图标
const logoPNG = require('../assets/logo.png');

//-------用户配置的菜单-----------------------------------------------------
const Useritems: MenuProps['items'] = [
    {
      key: 'userconf',
      icon: <EditOutlined />,
      label: '配置修改',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
]

//-----主程序-----------------------------------------------------------------------
const BasicLayout: React.FC<{}> = () => {
  //const navigate = useNavigate();
  //token校验
  //在框架主程序做token校验，所有在框架内的嵌套路由，都会被校验。无需每一个页面做校验。
  var auth = UpdateToken()
  //console.log("authInfo",auth)
  if (( !auth.Auth )) {
      console.log("认证过期,",auth.Msg)
      //history.push('/login');
      //navigate('/login');
      return <Navigate to="/login" />
  }
  //console.log("认证未过期,",auth.Msg)
  //const username = cookie.load('UserIcon')

  //appData校验
  //从cookie中读取密文
  const appData = cookie.load('appData')
  //判断cookie中是否有txt_enc是否存在，若不存在，就退出
  //console.log("txt_enc:",appData)
  if ((appData === undefined) || (appData === '')) {
    console.log("cookie中没有appData记录,请重新生成。")
    //history.push('/login');
    //navigate('/login');
    return <Navigate to="/login" />
  } 
  const txt_dec = Decrypt(appData,ShareInfo.KeyCookie)   //解密
  const AppConf = JSON.parse(txt_dec)
  console.log("AppConf:",AppConf)

  /*
  const appData = cookie.load('appData')
  const txt_dec = Decrypt(appData,ShareInfo.KEY) 
  const AppConf = JSON.parse(txt_dec)
  const userid = AppConf.userid
  const username = AppConf.username
  const ns = AppConf.ns
  */

  //跳转函数
  const navigate = useNavigate();

  //当前应用会话的位置信息
  //指定页面的完整路径，并不是url,而是页面在layout中的地址表达。
  const [pathname, setPathname] = useState('/about');

  //是否需要页面容器的状态变量。当单页面是是需要的。
  //页面容器自带面包路径功能，单页面是不需要，只有sider时需要。
  const [isPageContainer, setIsPageContainer] = useState(false);

  //------------------若直接打开url，则状态保持--------------------------------------
  const location = useLocation()
  const path = location.pathname
  useEffect(() => {
    //const pathnamenew = path.slice(10,path.length)   //原始路径中带有"/dashborad"字串，取消
    const pathnamenew = path
    if (pathnamenew.length == 0) {   //当直接打开"http://ip"时
      setPathname('/about')
      setIsPageContainer(false)
    } else {                         //当直接打开"http://ip/xxx"时
      //由于menu2有sider菜单，需面包宵。因此需识别面包宵状态。
      if ((pathnamenew.slice(1,6) == "menu2") || (pathnamenew.slice(1,9) == "userconf") || (pathnamenew.slice(1,7) == "domain")){   
        setIsPageContainer(true)
      } else {
        setIsPageContainer(false)
      }
      setPathname(pathnamenew)
    }
    },
    []   //触发条件:页面直接url方式加载或关闭时。
  );

  //菜单光标复位
  //用于嵌套页面中跳转(如Link、history.push、navigate)到其它页面后的菜单光标复位
  useEffect(() => {
    const pathnamenew = path
    if (pathnamenew.length != 0) {
      setPathname(pathnamenew)
    }
  },[path]);

  //------------------导航菜单单击事件--------------------------------------
  function onMenuItemRender(item:any, dom:any){
    //console.log(item)
    //console.log(dom)
    return(
      <a
        onClick={() => {
          //console.log(item)
          setPathname(item.path || '/about');
          switch (item.key) {
            case "about":
              setIsPageContainer(false)
              navigate("/about");
              break;
            case "userconf":
              setIsPageContainer(true)
              navigate("/userconf");
              break;
            case "userinfo":
              setIsPageContainer(true)
              navigate("/userconf/userinfo");
              break;
            case "chpwd":
              setIsPageContainer(true)
              navigate("/userconf/chpwd");
              break;
            case "active":
              setIsPageContainer(true)
              navigate("/userconf/active");
              break;
            case "domain":
              setIsPageContainer(true)
              navigate("/domain");
              break;
            case "domainlist":
              setIsPageContainer(true)
              navigate("/domain/domainlist");
              break;
            case "recordlist":
              setIsPageContainer(true)
              //navigate("/domain/recordlist");
              navigate("/domain/recordlist/?domain=null");
              console.log("记录列表显示")
              break;
            }
        }}
      >
        {dom}
      </a>
    )

  }

  //------------------当前用户下接菜单--------------------------------------
  //单击用户菜单
  function onUserConf(e:any) {
    console.log('click', e);
    switch (e.key) {
      case "userconf":
        setPathname('/userconf/userinfo');
        setIsPageContainer(true)
        navigate("/userconf/userinfo");
        break;
      case "logout":
        cookie.remove('TOKEN')    //用户自己退出，清空token. 防止别人通过回退页面方式进入。
        cookie.remove('appData')  //用户自己退出，清空token. 防止别人通过回退页面方式进入。
        setIsPageContainer(false)
        navigate("/login");
        break;
    }
  }
  //当前用户下拉菜单渲染
  const avatarPropsRender = (props:any, dom:any) => {
    //console.log(props)    //通过console口打印出props有哪些参数
    if (props.isMobile) return [];
    return (
      <Dropdown
        menu={{
          onClick: onUserConf,  //单击事件
          items: Useritems,     //下拉菜单条目
        }}
      >
        {dom}
      </Dropdown>
    )
  }

  //------------------side底部的footer--------------------------------------
  const menuFooterRender = (props:any) => {
    //console.log(props)    //通过console口打印出props有哪些参数
    if (props?.collapsed) return undefined;
    return (
      <div
        style={{
          textAlign: 'center',
          paddingBlockStart: 12,
        }}
      >
        <div>{process.env.Footter_line_sider_1}</div>
        <div>{process.env.Footter_line_sider_2}</div>
      </div>
    );
  }

  //脚本文字
  const line1Text = <><div style={{'color':'red','display':'inline'}} >test</div></>
  const line2Text = <><div style={{'display':'inline'}} >by guo-fs.com</div></>

  //------------------渲染--------------------------------------
  return (<>
    <ProConfigProvider dark={true}>
        <ProLayout
          //导入外部配置
          //{...defaultProps}

          //title配置
          //title="Darry"   
          title={process.env.APP_TITLE} 

          //logo
          logo={logoPNG}      //图片路径: project_root/public/

          //title与logo渲染
          //在此可指定单击logo或title时的跳转
          headerTitleRender={(logo, title, _) => {
            const defaultDom = (
              <a href="/about">
                <img src={logoPNG} className="App-logo" />
                {title}
              </a>
            );
            if (typeof window === 'undefined') return defaultDom;
            if (document.body.clientWidth < 1400) {
              return defaultDom;
            }
            if (_.isMobile) return defaultDom;
            return (
              <>
                {defaultDom}
              </>
            );
          }}
          //单击logo或title时的的事件
          /*
          onMenuHeaderClick={(e) => {
            console.log(e)
            navigate("/");
          }}
          */

          //sider宽度
          siderWidth={216}

          //菜单布局方式
          layout="mix"            //layout 的菜单模式，side | top | mix
          splitMenus={true}       //仅当 layout="mix" 有效
          //fixSiderbar={true}    //是否固定导航

          //当前用户图示
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: AppConf.username,
            render: avatarPropsRender,
          }}

          //当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性，
          location={{
            //pathname: '/dashborad/menu1',    //定义默认显示的菜单或页面。若定义默认页面，则子菜单无法显示
            pathname,
          }}

          //使用 IconFont 的图标配置.
          iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"

          //自定义菜单列表。
          //此功能可以实现动态路由，用来渲染访问路由
          //menuDataRender={() =>MenuItemList}
          //{...menuList}
          //route={{routes:RouterListProLayout}}
          route={{routes:RouterListProLayout}}
          
          //menuDataRender={() => loopMenuItem(route.routes)}
          //menuDataRender={() => (props.routes)}
          
          //自定义菜单项的 render 方法,单击事件
          menuItemRender={onMenuItemRender}
          

          //onPageChange={(location)=>{
          //  console.log("页面切换事件",location)
          //</ProConfigProvider>}}

          //内容区样式
          /*
          contentStyle={{
            'border': '1px dashed rgb(255, 0, 55)',
            //'height': 'calc(inherit - 200px)'
          }}
          */
          //layout 的内容模式，Fluid：自适应，Fixed：定宽 1200px
          contentWidth="Fluid"

          //脚本配置,有bug。
          // - 在contentStyle中配置height时，若页面过大，显示内容会超过页脚信息。
          // - 当内容过少时，不会沉底
          /*
          footerRender={() => (
            <DefaultFooter
              style={{ 
                     'border': '1px solid rgb(0, 0, 255)',
                     //'height': '60px',
                     //'marginTop': '-80px',
                     //'padding': '-100px',
                     //'marginBottom': '5px',
                    }}
                
              links={[
                { key: 'test', title: 'layout', href: 'www.alipay.com' },
                { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
              ]}
              copyright="这是一条测试文案"
            />
          )}
          */

          //side底部的footer
          menuFooterRender={menuFooterRender}
        >
          {
            //菜单为sider时，需要PageContainer,它自带了面包路径。否则不需要。
            //菜单为sider时,页面底部不配置页脚。在sider底部配置页脚。
            isPageContainer ? 
            (
              <PageContainer
                style={{
                  //'border': '1px dashed rgb(255, 0, 55)',
                }}
              >
                  <Outlet />
              </PageContainer>
  
            )
            : (
            //采用flex方式，将页脚显示在底部。
            <div style={{
                        //'border': '1px solid rgb(255, 0, 55)',
                        'display': 'flex',
                        'flexDirection':'column',
                        'justifyContent':'space-between',
                        'height':'calc(100vh - 60px)',  //'height':'calc(100vh - 60px)'
                        'marginTop': '-40px',
                        'marginBottom': '-80px',
                        }}>
              {/* 嵌套路由显示区 */}
              <Outlet />
              {/* 页脚 */}
              <div style={{
                //'border': '1px solid rgb(255, 0, 55)',
                'display':'flex',
                //'marginBottom': '-40px',
                'height': '60px',
                'width':'100%',
                }}>
                  <div style={{
                    //'border': '1px solid rgb(255, 255, 55)',
                    'margin':'auto',
                    //'marginBottom': '5px',
                    'textAlign':'center',
                    'fontSize':'16px'
                    }}>
                      {process.env.Footter_line_1}<br/>{process.env.Footter_line_2}
                  </div>
              </div>
            </div>
            )
          }

        </ProLayout>
    </ProConfigProvider>
  </>)
}

export default BasicLayout
