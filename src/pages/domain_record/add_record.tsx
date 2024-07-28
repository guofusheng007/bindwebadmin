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
  Switch,
  Space,
} from "antd";
import { 
  UserOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  EditOutlined,
} from '@ant-design/icons'; 
import TokenForm from './token'
import axios from 'axios';
import { history } from 'umi';
import cookie from 'react-cookies'
import {ShareInfo} from "@/public/shareinfo";
import {GetStringRand,UpdaterecordInfo,getTotal} from "@/public/sharefun";
import { Encrypt, Decrypt,EncryptIV, DecryptIV} from '@/public/crypto';
const { Option } = Select;   //下拉框单项值配置。可同时供多个下拉框使得。

const token = cookie.load('TOKEN')

//弹页组件
const FormModal = NiceModal.create((props:any,ref) => {
  const modal = useModal();
  const [form] = Form.useForm();
  //从cookie中读取当前用户的登录信息
  const appData = cookie.load('appData')
  const txt_dec = Decrypt(appData,ShareInfo.KeyCookie) 
  const AppConf = JSON.parse(txt_dec)
  const userid = AppConf.userid
  const username = AppConf.username
  const ns = AppConf.ns
  const total = getTotal(username)

  //提取用户名下的域名列表
  const [domailist, setDomailist] = useState([]); 
  //解析记录的类型
  const [types, setTypes] = useState([]);
  //解析记录的TTL
  const [ttls, setTtls] = useState([]);

  //域名录入框中的下拉列表
  const domainList_array = domailist.map(
    (item:any,index:number) => <Option value={item.id} key={index}>{item.domain}</Option>
  );
  
  //类型下拉列表
  const types_array = types.map(
    (item:any,index) => <Option value={item} key={index}>{item}</Option>
  );

  //TTL下拉列表
  const ttls_array = ttls.map(
      (item:any,index) => <Option value={item.value} key={index}>{item.label}</Option>
  );

  //表单初始值
  const formDefault = props.defaultForm                //表单参数。表单初始值
  const [recordID,setRecordID] = useState<number>(-1)  //记录id变量，-1为新增记录，其它值为修改记录
  //监控事件
  useEffect(() => {
      console.log("add_record.tsx[]",(new Date()).toLocaleString())
      //提取PromiseResult
      total.then((PromiseResult:any)=>{
        //console.log("Promise的数据:",PromiseResult)
        setDomailist(PromiseResult.domainlist)
        setTypes(PromiseResult.recordtypes)
        setTtls(PromiseResult.ttl)
      })
      //当从域名列表中跳转过来时
      

      
      //edit操作时，初始化表单
      if (Object.keys(formDefault).length > 0){
        setRecordID(formDefault.id)
        form.setFieldsValue({
          "domain":formDefault.domain,
          "name":formDefault.name,
          "ttl":formDefault.ttl,
          "data":formDefault.data,
          "token":formDefault.token,
          "remark":formDefault.remark
        });  
      } else {
        //当不是edit操作时，判断是否是从域名列表中的action中的"解析"跳转而来。
        if (!(props.domainFlag == "null")) {
          form.setFieldsValue({
            "domain":props.domainFlag
          })
        }
      }
      console.log("props.domainFlag:",props.domainFlag)

  }, []);

  //表单变化监视
  const [validate, setValidate] = useState(false);
  const values = Form.useWatch([],form);          //Watch all values
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })     //当form所有项通过校验时，validate为true
      .then(() => setValidate(true))
      .catch(() => setValidate(false));
  }, [values,recordID]);


  //弹页中自定义按钮的事件
  const handleButton= (e:any) =>{
    //console.log(typeof e.target, String(e.target),e.target.textContent)
    switch(e.target.textContent) {
      case "Submit" :
        const t0 = new Date()
        console.log("单击submit")
        form.submit();
        console.log(t0.toLocaleString(),",提交后的validate:",validate)
        var currentDomain:any = null  //当前下拉框中的域名。需其id和域名。
        if ( recordID > 0 ) {
          currentDomain = domailist.find((item:any) => (item.domain == formDefault.domain));
        } else {
          if (props.domainFlag == "null") {
            currentDomain = domailist.find((item:any) => (item.id == form.getFieldValue("domain")));
          } else {
            currentDomain = domailist.find((item:any) => (item.domain == props.domainFlag));
          }
        }
        console.log("sumbit formDefault:",formDefault)

        if (validate) {  
          const jsonData = 
          {
            id:recordID,    //当id=-1时，表示是新增记录，否为更新记录
            username:username,
            zone_id:currentDomain.id,
            domain:currentDomain.domain,
            name:form.getFieldValue("name").toLowerCase(),
            recordtype:form.getFieldValue("type"),
            ttl:form.getFieldValue("ttl"),
            data:form.getFieldValue("data"),
            token:form.getFieldValue("token"),
            remark:form.getFieldValue("remark"),        
          }
          console.log("提交的数据:",jsonData)

          //添加或修改记录
          const url = ShareInfo.http_api + 'addrecord'
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
               if (response.data.info == 'ok') {
                 if ( recordID > 0 ) { message.success('数据修改成功！')} else { message.success('添加成功！') }
                 //添加成功后关闭页面，并将如下信息返回给父组件，以便父组件更新列表
                 props.onOkClick(jsonData);  //调用父组件传递来的事件，并提供参数值.
                 modal.hide();
               } else if (response.data.info === 'lisence_err') {
                 message.error('添加解析记录失败,可能原因:授权出错,或解析记录数量超限,请联系管理员.')
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
        
        } else {
          if ( recordID > 0 ) {
            message.error('数据未任何修改。若确认不修改，请单击 Close 按扭')
          } 
        }
        break;
      case "Close" :
        console.log("单击Close")
        modal.hide();
        break;
    }
  } 

  //
  //此函数传递给子组件。其中data是来自子组件在调用该事件时提供的数据，即子组件中的数据。
  const onOkHandle = (data:any) => {
    console.log("父组件中从子组件提取的值",data)   //data是从子弹页上产生的token值
    form.setFieldsValue({"token":data});
  }
  //创建token
  const onCreateToken=() => {
    NiceModal.show(
      TokenForm, 
      {
        appName:<><Space><EditOutlined />Add record</Space></>,
        onOkClick: onOkHandle,    //向子组件传递事件
        //defaultForm:{},           //form初始值
        //domainFlag:domainFlag,    //若domainFlag非空为域名时，表示此时为域名列边中跳转而来。
      }
    )
  }
 
  return (<>
    
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
            name="user_Form_addrecord" 
        >
          {
            ((recordID > 0 ) || ( props.domainFlag != "null")) ? (
              <Form.Item name="domain" label="Domain" rules={[{ required: true }]}>
              <Select
                placeholder="Select a option and change input text above"   // 录入框提示信息
                //onChange={onGenderChange}                                   // 下拉值改变时触发的事件
                //allowClear
                disabled   //当为edit操作，或由域名列跳转而来时，禁止修改域名
              >
                {domainList_array}
              </Select>
              </Form.Item>
            ) : (
              <Form.Item name="domain" label="Domain" rules={[{ required: true }]}>
              <Select
                placeholder="Select a option and change input text above"   // 录入框提示信息
                //onChange={onGenderChange}                                   // 下拉值改变时触发的事件
                //allowClear
              >
                {domainList_array}
              </Select>
              </Form.Item>
            )
          }


          <Form.Item name="name" label="Name" rules={[
            { required: true },
            {type: 'string',whitespace: true,message: '只能输入字串，且不能为空字串'},
            //{pattern:/^(?!\.)([\w@\.]+?)(?<!\.)$/, message: '格式不对'},
            {pattern:/^[^.]*$/, message: '格式不对,字串中不能有点(.)'},
            ]}>
            <Input placeholder="add your record name" />
          </Form.Item>

          <Form.Item name="type" label="Type" rules={[{ required: true }]} initialValue="A">
            <Select
              placeholder="Select a option and change input text above"   // 录入框提示信息
              allowClear
            >
              {types_array}
            </Select>
          </Form.Item>

          <Form.Item name="ttl" label="TTL" rules={[{ required: true }]} initialValue={1800}>
            <Select
              placeholder="Select a option and change input text above"   // 录入框提示信息
              allowClear
            >
              {ttls_array}
            </Select>
          </Form.Item>

          <Form.Item name="data" label="Data" rules={[{ required: true }]}>
            <Input.TextArea showCount maxLength={50} placeholder="解析内容"/>
          </Form.Item>

          <Form.Item 
            name="token" 
            label={<>
                <div style={{"display":"inline-block"}}>
                  API Token<Button onClick={onCreateToken} type="link" style={{ margin: 0 }} >Create Token</Button>
                </div>
            </>}
          >
            <Input.TextArea showCount maxLength={128} placeholder="api解析授权码" disabled />
          </Form.Item>

          <Form.Item name="remark" label="Remark">
            <Input.TextArea showCount maxLength={50} placeholder="备注,可以不添写"/>
          </Form.Item>
         </Form>
    </Modal>
    

    </>);
});
 
export default FormModal;
