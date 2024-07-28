//import React from "react";
import { useNavigate,Navigate} from "react-router-dom";
import React, {useEffect,useState} from 'react';
import axios from 'axios';
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


//统一配置validateMessages
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
      url: '${label} is not a valid url!',
      domain: '${label} is not a valid domain!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
};

//弹页组件
const UserInfoForm = (() => {

  //form handle
  const [form] = Form.useForm();

  //按扭"submit"的单击事件
  const onFinish = (values: any) => {
    //表单数据
    const LisenceInfojsonData = 
    {
      username: values.username,
      address: values.address,
      email: values.email,
      mobile: values.mobile,
      company: values.company,
      website: values.website,
      nsdomain: values.nsdomain,
      count_domains:values.count_domains,
      count_records:values.count_records,
      count_users:values.count_users,
      count_days:values.count_days,
      remark: values.remark,
    }
    console.log(LisenceInfojsonData)

    const url = 'https://data.mm-dns.com/postlisence'
    axios({
      url:url,
      method: 'post',    //get或post等html方法。不区分大小写
      headers: {
         'Content-Type':'application/json',
      },
      data: JSON.stringify(LisenceInfojsonData)  //body参数。
    }).then(response => {
      if(response && response.status == 200){
        console.log('Data submitted successfully');

        // 响应成功的回调
        const db_result = response.data
        console.log("info:",db_result.info)
        if (response.data.info === 'ok') {
          message.success('申请信息发送成功，请耐心等，会以邮件告知！')
        } else {
          message.error('无需多次申请，管理员会及时处理。')
        } 
      }else{
         // 响应失败
         console.log('Failed to submit data');
         message.error('后台服务异常:请查看后台服务或网络')
      }
    })

  }
  //按扭"reset"的单击事件
  const onReset = () => {
    form.resetFields();
  };

  //样式
  const layout = {
    labelCol: { span: 4,offset:0},
    wrapperCol: { span:19},
  };
 
  return (<>
        <div style={{
            'border':'0px solid red',
            'width':'100vw', 
            'margin':'auto',
            'display': 'flex',
            'flexDirection':'column',
            'alignItems': 'center',
            'gap': '20px',
            }}>
                <h1>授权申请表</h1>
        <Form 
            {...layout}
            form={form} 
            //layout="vertical" 
            name="userForm" 
            onFinish={onFinish} 
            validateMessages={validateMessages}
            style={{
                'border': '0px dotted rgb(47, 0, 255)',
                'width': '80vw',
                'marginRight':'20px',
                //'gap': '60px',
            }}
        >

          <Form.Item 
            name="username" 
            label="User Name" 
            rules={[{ required: true,message: '此项必须输入' }]}
            >
            <Input placeholder="用户名称" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item name='email' label="Email" rules={[{ required: true,message: '此项必须输入' },{ type: 'email' }]}>
             <Input placeholder="授权文件新收邮箱" />
          </Form.Item>

          <Form.Item name='mobile' label="mobile" rules={[
              { required: true,message: '此项必须输入' },
              {
                pattern: /^1\d{10}$/,
                message: '手机号码格式不正确'
              },
              ]}
           >
             <Input placeholder="联系人电话"/>
          </Form.Item>

          <Form.Item name='company' label="公司名称" rules={[{ required: true,message: '此项必须输入' }]}>
             <Input placeholder="公司名称"/>
          </Form.Item>

          <Form.Item name='website' label="公司网站" rules={[{ required: true,message: '此项必须输入' },{ type: 'url' }]}>
             <Input placeholder="公司网站" />
          </Form.Item>

          <Form.Item name='nsdomain' label="NS域名" 
            rules={[
                { required: true,message: '此项必须输入' },
                { pattern: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/, message: '域名书写格式不正确'},
            ]}>
               <Input placeholder="授权域名" />
          </Form.Item>

          
          <Form.Item
            name="count_domains"
            label="域名数量"
            rules={[
                { required: true, message: 'Please input donation amount!' },
                { type: 'number', min: 0, max: 5000 }
            ]}
            initialValue={50}
          >
            <InputNumber style={{ width: '120px' }}  />
          </Form.Item>

          <Form.Item
            name="count_records"
            label="解析记录数量"
            rules={[
                { required: true, message: 'Please input donation amount!' },
                { type: 'number', min: 0, max: 20000 }
            ]}
            initialValue={500}
          >
            <InputNumber style={{ width: '120px' }}  />
          </Form.Item>

          <Form.Item
            name="count_users"
            label="注册用户数量"
            rules={[
                { required: true, message: 'Please input donation amount!' },
                { type: 'number', min: 0, max: 2000 }
            ]}
            initialValue={200}
          >
            <InputNumber style={{ width: '120px' }}  />
          </Form.Item>

          <Form.Item
            name="count_days"
            label="授权天数"
            rules={[
                { required: true, message: 'Please input donation amount!' },
                { type: 'number', min: 0, max: 36500 }
            ]}
            initialValue={365}
          >
            <InputNumber style={{ width: '120px' }}  />
          </Form.Item>


          <Form.Item name='address' label="地址">
             <Input placeholder="地址"/>
          </Form.Item>

          <Form.Item name='remark' label="备注">
             <Input.TextArea showCount maxLength={200} placeholder="备注"/>
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
         </div>
  </>);
});
 

export default UserInfoForm;
