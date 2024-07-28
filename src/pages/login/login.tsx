//import React,{useRef,useState} from 'react';
import React, {useRef,useEffect,useState} from 'react';
import {ShareInfo,cookieData} from "@/public/shareinfo";
import { Encrypt, Decrypt,EncryptIV, DecryptIV} from '@/public/crypto';
import cookie from 'react-cookies'
import { history } from 'umi';

//import React, {useRef,useEffect,useState} from 'react';
import axios from 'axios';
//import {ShareInfo,cookieData} from "@/public/shareinfo";


import CryptoJS from 'crypto-js';
import CaptchaInput from './captchainput.tsx'   //图形验证码组件
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import UserRegisterModal from './modal.tsx'
//从antd组件中选用的控件
import { 
  ConfigProvider,
  theme,
  Form, 
  Input, 
  Space,
  Button,
  Row,
  Col,
  Layout,
  Watermark,
  message,
  Flex,
} from 'antd';

import { 
    UserOutlined,
    LockOutlined,
    TrademarkCircleFilled,
    LoginOutlined,
} from '@ant-design/icons';

import './login.scss'



import pngLogo from '@/assets/logo.png';

const { Header, Footer, Sider, Content } = Layout;



export default () => {
   
  //const { token } = theme.useToken();
  //创建 Form 实例，用于管理所有数据状态。通过 Form.useForm 对表单数据域进行交互。
  const [form] = Form.useForm();  
  const childRef = useRef()   //图形校验码ref


  /*
  const [footerinfo, setFooterinfo] = useState({
    logintext:'',
  })
  useEffect(() => {
    const url = ShareInfo.http_api + 'getbaseinfo'
     axios({
       url:url,
       method: 'get',    //get或post等html方法。不区分大小写
       headers: {
          'Content-Type':'application/json',
       },
     }).then(response => {
       if(response && response.status == 200){
         console.log('Data submitted successfully');
         console.log("data:",response.data)
         //message.success('修改成功，已保存。')  
         setFooterinfo(response.data)  
       }else{
          // 响应失败
          console.log('Failed to submit data');
          message.error('后台服务异常:请查看后台服务或网络')
       }
     })
  }, []);
  */

  //样式
  const layout = {
    labelCol: { span: 6,offset:2},
    wrapperCol: { span:12 },
  };

  //按扭"submit"的单击事件
  const onFinish = (values: any) => {
    //读取form数据
    //console.log(values);
    //console.log(form.getFieldValue("username"))
    //console.log(form.getFieldValue("password"))
    const jsonData = 
    {
      //username: values.username,
      username: form.getFieldValue("username").toString(),
      password: CryptoJS.SHA256(form.getFieldValue("password")).toString(),
    }
    //console.log(jsonData)
    //提交数据到后台验证密码
    
    const url = ShareInfo.http_api + 'login'
    //console.log("url:",url)
      fetch(url,{
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData)
      })
      .then((response) => {
         if (!response.ok) {
             console.log('Failed to submit data');
              throw new Error('Network response was not ok.');
          }
          //提取后台提供的token,并写入cookie
          const token:any = response.headers.get('token')
          console.log("token值:",token)
          //const TTL = new Date(new Date().getTime() + data.ttlcookie)
          cookie.save('TOKEN', token,{expires: ShareInfo.TTL });
          return response.json()  //将url的返回body信息转换为json格式
      })
      .then((data) => {       //此部分测试正常
          console.log("返回值:",data)   //将返回信息回显到浏览器的console接口
          //console.log(data.info)   //将post时返回信息显示到指定标签上。

          if (data.info === '验证成功') {
            cookieData.userid = data.id
            cookieData.username = data.username
            //cookieData.ns = data.ns
            cookieData.title = data.title
            cookieData.ttlcookie = data.ttlcookie
            cookieData.ttlapiToken = data.ttlapiToken
            cookieData.footter_line_sider_1 = data.footter_line_sider_1
            cookieData.footter_line_sider_2 = data.footter_line_sider_2
            cookieData.footter_line_1 = data.footter_line_1
            cookieData.footter_line_2 = data.footter_line_2
            console.log("login_cookieData:",cookieData)
            const txt_enc = Encrypt(JSON.stringify(cookieData, null, 2),ShareInfo.KeyCookie)   //加密
            cookie.save('appData',txt_enc,{expires: ShareInfo.TTL });    //密文存储在cookie中
            history.push('/');   //跳转到主页
          } else {
            //console.log(data.info)
            message.error('录入用户名或密码有误，请重新录入')
          }
      })
      .catch(error => {
        console.error('Error:', error);
        message.error('后台服务异常:请查看后台服务或网络')
      });
  };

  //按扭"reset"的单击事件
  const onReset = () => {
    form.resetFields();
  };

 

  //渲染
  return (<>
    <ConfigProvider 
      theme={{algorithm: theme.darkAlgorithm}}
    >
     {/*  <Watermark content="guo-fs.com"> */}
     <Layout className="login_container">
      <div className="login_content">
        {/* 页首配置 */}
        <div style={{'marginBottom': "30px"}}>
          <div>
            <div style={{
                'border': "0px dotted red",
                'display': 'flex',
                'flexDirection': 'row',
                }}>
              <div style={{'display':'inline'}}><img src={pngLogo} height={64} className="App-logo-login" /></div>
              <div style={{'display':'inline','fontSize':'24px','margin':'auto',}}>DNS自助服务系统</div>
            </div>
          </div>
          <div style={{'border': "0px dotted red",'textAlign': 'center',}} >基于bind9全球最大的DNS引擎</div>
        </div>
        <Form
          className="login_form"
          {...layout}                                         // form.item的label与控件的样式
          colon={true}                                        //表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)
          form={form}
          onFinish={onFinish}                                 // form事件，form会把值传递给事件      
        >
            <Form.Item 
              name="username" 
              label="User Name"
              rules={[   //rule配置校验规则
                  { 
                    required: true,
                    message: '此项必须输入',
                  },
                  {                               
                    type: 'string',
                    message: '只能输入字串，且不能为空字串(如全部是空格)',
                  },
              ]}
            >
              <Input
                size="large" 
                placeholder="用户名称" 
                prefix={<UserOutlined />} 
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Pass Word"
              rules={[
                  { required: true,message: '此项必须输入' },
                  { min: 5,message: '字串长度不能小于5' },
                  { max: 25,message: '字串长度不能大于5' },
              ]}
              //hasFeedback={true}   //配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 此外，它还可以通过 Icons 属性获取反馈图标。
              validateStatus="success"
            >
               <Input.Password  placeholder="请录入密码" prefix={<LockOutlined />} /> 
            </Form.Item>

            {/*  
            extra="We must make sure that your are a human." 
                          <Row gutter={8}>
                <Col span={8}>
                <Col span={8} style={{'border': "1px dotted red"}}>
                <Row style={{'border': "1px dotted #fff "}}>

                <Space.Compact style={{'border': "0px dotted #fff","width":"100%"}}>
            */}
            <Form.Item label="图形校验码"  rules={[{required: true}]} extra="We must make sure that your are a human.">
            
                <Flex style={{'border': "0px dotted #fff","width":"100%"}}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      { required: true, message: 'Please input the captcha you got!' },
                      {
                        validator(_, value) {
                          if (!value) {
                            return new Promise((reject) => {reject('')})
                          } else {
                            const status = childRef.current.validate(value)
                            return status
                              ? Promise.resolve()
                              : Promise.reject(new Error('验证码不正确'))
                          }
                       }
                      }
                    ]}
                  >
                   <Input  style={{"width":"120px"}} />
                  </Form.Item>
                  <CaptchaInput  cRef={childRef} />
                  </Flex>
              
            </Form.Item>

            <Space 
                style={{ 
                    //'border': '1px dotted green',
                    'width':'100%',
                    'flexDirection': 'row',
                    'justifyContent': 'center',
                   }} 
                size={18}
              >
                <Button type="primary" htmlType="submit" icon={<LoginOutlined />}> {/* 不指定事件时，默认采用form中定义的事件。此时，form会把值传递给事件 */}
                  登录
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  清空
                </Button>
                {/* 
                <Button type="text" onClick={onResetPwd} disabled>
                  忘记密码
                </Button>
                */}
            </Space>
        </Form>

        <NiceModal.Provider>
          <Button type="text" onClick={() => NiceModal.show(UserRegisterModal, {appName:"新用户注册"})}>
            注册用户
          </Button>
        </NiceModal.Provider>

        {/* 页脚配置 */}
        <div style={{'border': "0px dotted red",'textAlign': 'center',}}><br/>Copyright © 2023-{new Date().getFullYear()} Created by <a href="https://bind-webadmin.com" target='_blank'>bind webadmin project</a><br/><a href="http://beian.miit.gov.cn/" target='_blank'>{process.env.ICP}</a>&nbsp;&nbsp;&nbsp;&nbsp;{process.env.OTHERCODE}&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://creativecommons.org/licenses/by/4.0/deed.en" target='_blank'>CC BY 4.0</a><br/>{process.env.LOGIN_FOOTER_TEXT}</div>
      </div>
     </Layout>
     {/* </Watermark> */}
    </ConfigProvider>
  </>);
};
