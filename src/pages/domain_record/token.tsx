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
  DatePicker,
} from "antd";
import cookie from 'react-cookies'
import {ShareInfo} from "@/public/shareinfo";
import {GetStringRand,UpdaterecordInfo,getTotal} from "@/public/sharefun";
import { Encrypt, Decrypt,EncryptIV, DecryptIV} from '@/public/crypto';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const { RangePicker } = DatePicker;

//const token = cookie.load('TOKEN')

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

  const dateFormat = 'YYYY-MM-DD';
  const t0 = new Date()
  //const t1 = new Date(new Date().getTime() + ShareInfo.tokenTTL)
  //const t1 = new Date(new Date().getTime() + AppConf.ttlapiToken)
  const t1 = new Date(new Date().getTime() + process.env.TTLApiToken)

  //弹页中自定义按钮的事件
  const handleButton= (e:any) =>{
    //console.log(typeof e.target, String(e.target),e.target.textContent)
    switch(e.target.textContent) {
      case "Submit" :
        const t0 = new Date()
        console.log("单击submit")
        form.submit();
        //创建token
        const rangeData = form.getFieldValue("rangepicker")
        const tokenObj = {
          createDate: (new Date()).getTime(),
          beginDate: (new Date(Date.parse(rangeData[0].toLocaleString()))).getTime(),
          endDate: (new Date(Date.parse(rangeData[1].toLocaleString()))).getTime()
        }
        /*
        创建的token有创建间、tokene有效期(开始时间、结整时间).
        加密后(共计128个字节)存储入mysql。
        在使用时，api提供token值和data值(解析内容)，后面验证有效期。
        在有效期内，采用token密文作为查找条件，在ZoneData表中查找域名、记录类型、解析名称等信息。
        然后将api提供的data值更新到ZoneData表中相应记录。
    
        由于以toke密文为查找条件，为防止token密文在ZoneData表中重复，
        因此配置创建时间的原子时间在token密文中，减少密文重复概率。
        */
        console.log("tokenObj:",tokenObj)
        const KEY= "abc123oweruwierw11111111"   //必须是16、24、32位字节的字串。此值必须提供给解密端
        const txt_enc = Encrypt(JSON.stringify(tokenObj, null, 2),ShareInfo.KeyToken)   //加密
        console.log("密文:",txt_enc)
        console.log("密文length:",txt_enc.length)
        props.onOkClick(txt_enc);
        modal.hide();
        break;
      case "Close" :
        console.log("单击Close")
        modal.hide();
        break;
    }
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
            //layout="vertical" 
            name="user_Form_token" 
        >
         <Form.Item label="Token有效期" name="rangepicker" initialValue={[dayjs(t0), dayjs(t1)]} rules={[{ required: true }]}>
            <RangePicker 
              //defaultValue={[dayjs('2015-01-01', dateFormat), dayjs('2016-01-01', dateFormat)]}
              format={dateFormat} 
            />
         </Form.Item>
         </Form>
    </Modal>
    </>);
});
 
export default FormModal;
