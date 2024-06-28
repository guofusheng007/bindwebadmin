//import React from "react";
import { useNavigate,Navigate} from "react-router-dom";
import {ShareInfo} from "@/public/shareinfo";
import { Encrypt, Decrypt,EncryptIV, DecryptIV} from '@/public/crypto';
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
import { history } from 'umi';
import { 
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'; 
import { 
  Button,
  Flex,
  Input,
  Modal,
  Space,
  Form,
  InputNumber,
  message,
  Checkbox,
} from "antd";

const token = cookie.load('TOKEN')

//样式
const layout = {
    labelCol: { span: 7,offset:2},
    wrapperCol: { span:12},
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
//统一配置validateMessages
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
      url: '${label} is not a valid url!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
};

//弹页组件
const UserInfoForm = (() => {

  //从cookie中读取当前用户的登录信息
  const appData = cookie.load('appData')
  const txt_dec = Decrypt(appData,ShareInfo.KeyCookie) 
  const AppConf = JSON.parse(txt_dec)
  const userid = AppConf.userid

  //form handle
  const [form] = Form.useForm();

  //返回值定义
  const [userinfo, setUserinfo] = useState({
    id:'',
    username: '',
    password:'',
    email: '',
    mobile: '',
    company: '',
    website: '',
    address: '',
    remark: '',
  });
  //在组件挂载后获取数据库中的初始值
  useEffect(() => {
    //const url = 'http://192.168.3.110:8080/updateuserinfo/'+ userid
    const url = ShareInfo.http_api + 'updateuserinfo/'+ userid
    axios({
      url:url,
      method: 'get',    //get或post等html方法。不区分大小写
      headers: {
         'Content-Type':'application/json',
         'AuthToken':token,
         'dycode': ((new Date()).getTime() - 1010101010101) //此算法，需前后端保持可逆。
      },
    }).then(response => {  
      if(response && response.status == 200){
        console.log('Data submitted successfully');
         // 响应成功的回调
         // 将返回的数据传递给外部参数
         //const data = response.data
         //console.log(response.data[0])   
         //console.log(response.data[0].username)  
         setUserinfo(response.data[0])
         //console.log("userinfo(useEffect):",userinfo)    
      }else{
         // 响应失败
         console.log('Failed to submit data');
         message.error('后台服务异常:请查看后台服务或网络')
      }
    }).catch((Error) => {
      console.log("error",Error)
      if (Error.response.status == 302) {
        //return <Navigate to="/login" />
        history.push('/login');
      }
    });
  }, []);

  //表单初始值
  useEffect(() => {
    if (Object.keys(userinfo).length > 0) {
      form.setFieldsValue(userinfo); // 设置表单初始值
    }
  }, [userinfo, form]);

  //按扭"submit"的单击事件
  const onFinish = (values: any) => {
    //表单数据
    const UserInfojsonData = 
    {
      username: values.username,
      password:'',
      email: values.email,
      mobile: values.mobile,
      company: values.company,
      website: values.website,
      address: values.address,
      remark: values.remark,
    }
    console.log(UserInfojsonData)
    //message.error('录入用户名或密码有误，请重新录入')
    //const url = 'http://192.168.3.110:8080/updateuserinfo/'+ userid
    //const dycode = (new Date()).getTime()
    //console.log("dycode:",dycode)
    const url = ShareInfo.http_api + 'updateuserinfo/'+ userid
    axios({
      url:url,
      method: 'post',    //get或post等html方法。不区分大小写
      headers: {
         'Content-Type':'application/json',
         'AuthToken':token,
         'dycode': ((new Date()).getTime() - 1010101010101)
         //'dycode':(new Date()).getTime(),
      },
      data: JSON.stringify(UserInfojsonData)  //body参数。
    }).then(response => {
      if(response && response.status == 200){
        console.log('Data submitted successfully');
        message.success('修改成功，已保存。')    
      }else{
         // 响应失败
         console.log('Failed to submit data');
         message.error('后台服务异常:请查看后台服务或网络')
      }
    })

  }
  //按扭"reset"的单击事件
  const onReset = () => {
    //form.resetFields();
    form.setFieldsValue(userinfo);
  };
 
  return (<>
        <Form 
            {...layout}
            form={form} 
            //layout="vertical" 
            name="userForm" 
            onFinish={onFinish} 
            validateMessages={validateMessages}
            style={{
                'border': '0px dotted rgb(47, 0, 255)',
                'maxWidth': '900px',
            }}
        >
          <Form.Item 
            name="username" 
            label="User Name" 
            >
            <Input placeholder="用户名称" prefix={<UserOutlined />} disabled />
          </Form.Item>

          <Form.Item name='email' label="Email" rules={[{ required: true,message: '此项必须输入' },{ type: 'email' }]}>
             <Input placeholder="用于忘记密码验证" />
          </Form.Item>

          <Form.Item name='mobile' label="mobile" rules={[
              { required: true,message: '此项必须输入' },
              {
                pattern: /^1\d{10}$/,
                message: '手机号码格式不正确'
              },
              ]}
           >
             <Input placeholder="用于忘记密码验证"/>
          </Form.Item>

          <Form.Item name='company' label="公司名称" rules={[{ required: true,message: '此项必须输入' }]}>
             <Input placeholder="公司名称"/>
          </Form.Item>

          <Form.Item name='website' label="公司网站" rules={[{ required: true,message: '此项必须输入' },{ type: 'url' }]}>
             <Input placeholder="公司网站" />
          </Form.Item>

          <Form.Item name='address' label="地址">
             <Input placeholder="地址"/>
          </Form.Item>

          <Form.Item name='remark' label="备注">
             <Input placeholder="备注"/>
          </Form.Item>
  
          {/* button */}
          <Space 
            style={{ 
                //'border': '1px dotted green',
                'width':'100%',
                'flexDirection': 'row',
                'justifyContent': 'center',
               }} 
            size={28}
          >
            <Button type="primary" htmlType="submit">提交</Button>
            <Button htmlType="button" onClick={onReset}>重填</Button>
          </Space>
         </Form>
  </>);
});
 

export default UserInfoForm;
