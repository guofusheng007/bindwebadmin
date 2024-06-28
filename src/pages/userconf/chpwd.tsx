//import React from "react";
import React, {useEffect,useState} from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import cookie from 'react-cookies'
import { history } from 'umi';
import {ShareInfo} from "@/public/shareinfo";
import { Encrypt, Decrypt,EncryptIV, DecryptIV} from '@/public/crypto';
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
const UserInfoFormChangePwd = (() => {
  /*
  //从cookie中读取token
  const userid = cookie.load('UserID')
  //判断userid是否存在，若不存在，就退出
  console.log("userid:",userid)
  if ((userid === undefined) || (userid === '')) {
    history.push('/login');
  } 
  */
 
  const appData = cookie.load('appData')
  const txt_dec = Decrypt(appData,ShareInfo.KeyCookie) 
  const AppConf = JSON.parse(txt_dec)
  const userid = AppConf.userid
  AppConf.username

  //form handle
  const [form] = Form.useForm();

  //按扭"submit"的单击事件
  const onFinish = (values: any) => {
    //
    if (AppConf.username == 'demo') {
      message.error('当前用户 demo 是公测帐号，不支持修改密码。')
      return
    }
    //表单数据
    const UserPwdinfo = 
    {
      oldpwd: CryptoJS.SHA256(values.oldpwd).toString(),
      newpwd: CryptoJS.SHA256(values.newpwd).toString(),
    }
    console.log(UserPwdinfo)
    //message.error('录入用户名或密码有误，请重新录入')
    //const url = 'http://192.168.3.110:8080/changepwd/'+ userid
    const url = ShareInfo.http_api + 'changepwd/' + userid
    axios({
      url:url,
      method: 'post',    //get或post等html方法。不区分大小写
      headers: {
         'Content-Type':'application/json',
         'AuthToken':token,
         'dycode': ((new Date()).getTime() - 1010101010101) 
      },
      data: JSON.stringify(UserPwdinfo)  //body参数。

    }).then(response => {
      if(response && response.status == 200){
        console.log('Data submitted successfully');
        console.log(response.data.info)
        if(response.data.info === 'ok') {
            message.success('密码修改成功, 请固记新密码。')
        } else {
            message.error('密码修改失败。请提供正确的原密码。')
        }  
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

  }
  //按扭"reset"的单击事件
  const onReset = () => {
    form.resetFields();
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
          {/* 旧密码录入 */}
          <Form.Item
            name="oldpwd"
            label="旧密码"
            rules={[
              { required: true,message: '此项必须输入' },
            ]}
            //hasFeedback={true} 
            validateStatus="success"
          >
             <Input.Password  placeholder="请录入旧密码" prefix={<LockOutlined />}/>   
          </Form.Item>

          {/* 新密码录入 */}
          <Form.Item
            name="newpwd"
            label="新密码"
            rules={[
              { required: true,message: '此项必须输入' },
              { min: 8,message: '字串长度不能小于8' },
              { max: 20,message: '字串长度不能大于20' },
              {
                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_,@,!,%,*,$])(?=.{6,16}).*/,
                message: '必须包含大写字母、小写字母、数字，特殊字符(_,@,!,%,*,$)',
              },
            ]}
            //hasFeedback={true} 
            validateStatus="success"
          >
             <Input.Password  placeholder="请录入新密码" prefix={<LockOutlined />}/>   
          </Form.Item>
          {/* 密码前后录入是否一致性校验 */}
          <Form.Item
            name="confirm"
            label="再输入一次"
            dependencies={['newpwd']}
            hasFeedback={true}
            rules={[
              {
                required: true,
                message: '再输入一次新密码!',
              },
              //自定义函数校验，如下，定义一个匿名函数，并在函数体中采用validator自定义校验
              // getFieldValue回调与validator回调
              ({ getFieldValue }) => ({    //getFieldValue是取某Form.Item当前值的回调
                 validator(_, value) {     //validator是当前Form.Item控件的回调，value是其当前值
                  if (!value || (getFieldValue('newpwd') === value)) {   
                    return Promise.resolve();    //当前值非空，且与指定的Form.Item的值相同时，返回通过校验。
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                 },
              }),
            ]}
          >
            <Input.Password placeholder="再输入一次新密码" prefix={<LockOutlined />}/>
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
 

export default UserInfoFormChangePwd;
