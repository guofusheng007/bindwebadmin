import React from "react";
import {ShareInfo} from "@/public/shareinfo";
import CryptoJS from 'crypto-js';
import { 
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'; 
import NiceModal, { useModal } from "@ebay/nice-modal-react";
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
const UserRegisterModal = NiceModal.create((props:any) => {
  const [form] = Form.useForm();
  const modal = useModal();
  //按扭"submit"的单击事件
  const onFinish = (values: any) => {
    //console.log(values);
    //console.log(values.mobile)
    
    const UserInfojsonData = 
    {
      username: values.username,
      password: CryptoJS.SHA256(form.getFieldValue("password")).toString(),
      email: values.email,
      mobile: values.mobile,
      company: values.company,
      website: values.website,
      address: values.address,
      remark: values.remark,
    }
    console.log(UserInfojsonData)
    //message.error('录入用户名或密码有误，请重新录入')
    //const url = 'http://192.168.3.110:8080/register'
    const url = ShareInfo.http_api + 'register'
      fetch(url,{
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
          },
          body: JSON.stringify(UserInfojsonData)
      })
      .then((response) => {
         if (!response.ok) {
             console.log('Failed to submit data');
              throw new Error('Network response was not ok.');
          }
          return response.json()  //将url的返回body信息转换为json格式
      })
      .then((data) => { 
          console.log(data)   //将返回信息回显到浏览器的console接口
          if (data.info === '用户名称重名') {
             message.error('用户名称重名，请重新录入')
          } else {
             console.log(data.info)
             message.success('恭喜,您已注册成功，请返回登录。')
             modal.hide()
          }
      })
      .catch(error => {
        console.error('Error:', error);
        message.error('后台服务异常:请查看后台服务或网络')
      });


  }
  //按扭"reset"的单击事件
  const onReset = () => {
    form.resetFields();
  };
 
  return (
    <Modal
      title={<><UserOutlined />{props.appName}</>}
      open={modal.visible}
      //onOk={onOk}
      onCancel={modal.hide}
      afterClose={modal.remove}
      footer={null}   //可以取消息页脚信息
    >
        <Form 
            {...layout}
            form={form} 
            //layout="vertical" 
            name="userForm" 
            onFinish={onFinish} 
            validateMessages={validateMessages}
        >
          <Form.Item 
            name="username" 
            label="User Name" 
            rules={[
                { 
                    required: true,
                    message: '此项必须输入',
                },
                {
                    pattern: /^(?!admin).*$/i,
                    message: '用户名称不能以admin(无论大小写)为开头的字串',
                },
                {
                    pattern: /^[a-z][a-zA-Z0-9_-]{4,11}$/,
                    message: '以小写字母为开头,后续字符串可以由字母或数字或下下划线组成,且必须为5到12位' 
                },
            ]}>
            <Input placeholder="用户名称" prefix={<UserOutlined />}  />
          </Form.Item>

          {/* 密码录入 */}
          <Form.Item
            name="password"
            label="Password"
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
             <Input.Password  placeholder="请录入密码" prefix={<LockOutlined />}/>   
          </Form.Item>
          {/* 密码前后录入是否一致性校验 */}
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback={true}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              //自定义函数校验，如下，定义一个匿名函数，并在函数体中采用validator自定义校验
              // getFieldValue回调与validator回调
              ({ getFieldValue }) => ({    //getFieldValue是取某Form.Item当前值的回调
                 validator(_, value) {     //validator是当前Form.Item控件的回调，value是其当前值
                  if (!value || (getFieldValue('password') === value)) {   
                    return Promise.resolve();    //当前值非空，且与指定的Form.Item的值相同时，返回通过校验。
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                 },
              }),
            ]}
          >
            <Input.Password placeholder="校验密码" prefix={<LockOutlined />}/>
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


          {/* 授权同意 */}
          <Form.Item
            {...tailLayout}
            name="agreement"
            valuePropName="checked"
            rules={[
              {  // validator自定义校验，接收 Promise 作为返回值。
                validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
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

    </Modal>
  );
});
 

export default UserRegisterModal;
