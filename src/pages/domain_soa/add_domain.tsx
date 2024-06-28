import React, {useState,useEffect} from 'react';
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { 
  Button,
  Flex,
  Input,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import axios from 'axios';
import cookie from 'react-cookies'
import {ShareInfo} from "@/public/shareinfo";
import { history } from 'umi';
import {GetStringRand,UpdaterecordInfo,getTotal} from "@/public/sharefun";
import { Encrypt, Decrypt,EncryptIV, DecryptIV} from '@/public/crypto';
const { Option } = Select;   //下拉框单项值配置。可同时供多个下拉框使得。

const token = cookie.load('TOKEN')

//弹页组件
const FormModal = NiceModal.create((props:any,ref) => {
  //从cookie中读取当前用户的登录信息
  const appData = cookie.load('appData')
  const txt_dec = Decrypt(appData,ShareInfo.KeyCookie) 
  const AppConf = JSON.parse(txt_dec)
  const userid = AppConf.userid
  const username = AppConf.username
  const total = getTotal(username)

  const modal = useModal();
  const [form] = Form.useForm();

  //提取域名类型表
  const [domainTypes, setDomainTypes] = useState([]); 
  useEffect(() => {
        console.log("add_domain.tsx[]",(new Date()).toLocaleString())
        //提取PromiseResult
        total.then((PromiseResult:any)=>{
          //console.log("Promise的数据:",PromiseResult)
          setDomainTypes(PromiseResult.domaintypes)
        })
  }, []);
  //将域名类型数组转换成下拉菜单格式
  const  array =  domainTypes.map(
    (item,index) => <Option value={item} key={index}>{item}</Option>
  );
  const suffixSelectorDomain = <>
    <Form.Item name="suffixDomain" noStyle initialValue=".com">
      <Select style={{ width: 90 }}>
       {array}
      </Select>
    </Form.Item>
  </>


  //表单变化监视
  const [validate, setValidate] = useState(false);
  const values = Form.useWatch([],form);          //Watch all values
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })     //当form所有项通过校验时，validate为true
      .then(() => setValidate(true))
      .catch(() => setValidate(false));
  }, [values,props]);


  //弹页中自定义按钮的事件
  const handleButton= (e:any) =>{
    //console.log(typeof e.target, String(e.target),e.target.textContent)
    switch(e.target.textContent) {
      case "Submit" :
        console.log("单击submit")
        form.submit();
        if (validate) {  
          //域名新增信息
          const jsonData = 
          {
            domain: form.getFieldValue("domain").toLowerCase() + form.getFieldValue("suffixDomain"),
            //ns:ns,
            username:username,
            remark:form.getFieldValue("remark"),
          }
          //添加域名
          const url = ShareInfo.http_api + 'adddomain'
          axios({
            url:url,
            method: 'post',    //get或post等html方法。不区分大小写
            headers: {
               'Content-Type':'application/json',
               'AuthToken':token,
               'dycode': ((new Date()).getTime() - 1010101010101) 
            },
            data: JSON.stringify(jsonData)  //body参数。
          }).then(response => {
            if(response && response.status == 200){
              console.log('Data submitted successfully');
              console.log(response.data)
               // 响应成功的回调
               const db_result = response.data
               console.log("info:",db_result.info)
               if (response.data.info === 'ok') {
                 message.success('添加成功！')
                 //添加成功后关闭页面，并将如下信息返回给父组件，以便父组件更新列表
                 props.onOkClick(jsonData);  //调用父组件传递来的事件，并提供参数值.
                 //modal.hide();
               } else {
                 message.error('添加失败,该域名已存在系统中。请确认后再添加！')
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
        break;
      case "Close" :
        console.log("单击Close")
        modal.hide();
        break;
    }
  } 
 
  return (
    <Modal
      title={props.appName}
      open={modal.visible}
      onCancel={modal.hide}
      afterClose={modal.remove}
      footer={
        <Flex gap="middle" justify="center" align="center">
        <Button htmlType="button" type="primary" onClick={handleButton}>Submit</Button>
        <Button htmlType="button" onClick={handleButton}>Close</Button>
        </Flex>
      }
    >
        <Form 
             form={form} 
             layout="vertical" 
             name="user_Form" 
        >
          <Form.Item name="domain" label="Domain" rules={[
            { required: true },
            {type: 'string',whitespace: true,message: '只能输入字串，且不能为空字串'},
            {pattern:/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/, message: '以字母或数字为开头和结束'},
            ]}>
            <Input addonAfter={suffixSelectorDomain} placeholder="add your doamin" />
          </Form.Item>
          <Form.Item name="remark" label="Remark">
            <Input.TextArea showCount maxLength={50} placeholder="备注,可以不添写"/>
          </Form.Item>
         </Form>
    </Modal>
  );
});
 
export default FormModal;
