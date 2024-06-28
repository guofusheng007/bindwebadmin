//import React from 'react';
import React, {useEffect,useState,useRef} from 'react';
import { history } from 'umi';
import cookie from 'react-cookies'
import {ShareInfo} from "@/public/shareinfo";
import {GetStringRand,UpdaterecordInfo,getTotal} from "@/public/sharefun";
import { Encrypt, Decrypt,EncryptIV, DecryptIV } from '@/public/crypto';

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
  Progress,
  Badge,
  Descriptions,
} from "antd";
import CryptoJS from 'crypto-js';
import type { DescriptionsProps } from 'antd';



export default () => {
  const [form] = Form.useForm();
  //从cookie中读取当前用户的登录信息
  const appData = cookie.load('appData')
  const txt_dec = Decrypt(appData,ShareInfo.KeyCookie) 
  const AppConf = JSON.parse(txt_dec)
  const userid = AppConf.userid
  const username = AppConf.username
  const total = getTotal(username)
  console.log("total:",total)


  const [total_data, setTotal_data] = useState<any>({}); 
  const [monitordata, setMonitodata] = useState<any>({}); 
  useEffect(() => {
      //提取PromiseResult
      total.then((PromiseResult:any)=>{
        console.log("Promise的数据:",PromiseResult)
        setTotal_data(PromiseResult)
        setMonitodata(PromiseResult.monitordata)
      })
  }, []);

  //console.log(typeof total_data.monitordata.cpu,total_data.monitordata.cpu)
  
  const items1: DescriptionsProps['items'] = [
    {
      key: '0',
      label: '软件版本',
      children: total_data.ver,
    },
    {
      key: '1',
      label: '操作系统',
      children: monitordata.hostos,
    },
    {
      key: '2',
      label: 'BootTime',
      children: monitordata.boottime,
    },
    {
      key: '3',
      label: 'Uptime',
      children: monitordata.hostUptime,
    },
    {
      key: '4',
      label: 'CPU uage',
      children: <>
        <Progress 
          type="dashboard" 
          //percent={total_data.monitordata.cpu}
          percent={monitordata.cpu}
          //percent={50}

          //进度条的尺寸,number | [number | string, number] | "small" | "default"
          //半径
          size={180} 

          format={(percent) => {
            return (<>
              <div style={{"fontSize":"20px"}}>
                CPU Uage<br/>{`${percent}%`}
              </div>
            </>) 
          }}

          //圆形进度条线的宽度，单位是进度条画布宽度的百分比
          strokeWidth={10}

          //仪表盘进度条缺口角度，可取值 0 ~ 295
          gapDegree={80}

          strokeColor={{
            '0%': 'green',
            '50%': 'yellow',
            '100%': 'red',
          }}

          status="exception"

          //仪表盘进度条缺口位置	top | bottom | left | right
          gapPosition="bottom"
      />
      </>,
    },
    {
      key: '5',
      label: 'Mem uage',
      children: <>
        <Progress 
          type="dashboard" 
          //percent={total_data.monitordata.cpu}
          percent={monitordata.mem}
          //percent={50}

          //进度条的尺寸,number | [number | string, number] | "small" | "default"
          //半径
          size={180} 

          format={(percent) => {
            return (<>
              <div style={{"fontSize":"20px"}}>
                Mem Uage<br/>{`${percent}%`}
              </div>
            </>) 
          }}

          //圆形进度条线的宽度，单位是进度条画布宽度的百分比
          strokeWidth={10}

          //仪表盘进度条缺口角度，可取值 0 ~ 295
          gapDegree={80}

          strokeColor={{
            '0%': 'green',
            '50%': 'yellow',
            '100%': 'red',
          }}

          status="exception"

          //仪表盘进度条缺口位置	top | bottom | left | right
          gapPosition="bottom"
      />
      </>,
    },
  ]
  const items2: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '域名数量(无限制)',
      children: total_data.domain,
    },
    {
      key: '2',
      label: '解析数量(无限制)',
      children: total_data.record,
    },
  ]

  return (<div>
    <h2>你好，{username}</h2>
    <Descriptions 
      title="服务器信息"                  //描述列表的标题，显示在最顶部.支持嵌html代码
      bordered                           //是否展示边框
      items={items1}                      //描述列表项内容
      layout="horizontal"                //描述布局,horizontal | vertical
      //contentStyle={{CSSProperties}}   //自定义内容样式
      //labelStyle={{CSSProperties}}     //自定义label样式
    />
    <br/><br/>
    <Descriptions 
      title="域名信息"                  //描述列表的标题，显示在最顶部.支持嵌html代码
      bordered                           //是否展示边框
      items={items2}                      //描述列表项内容
      layout="horizontal"                //描述布局,horizontal | vertical
      //contentStyle={{CSSProperties}}   //自定义内容样式
      //labelStyle={{CSSProperties}}     //自定义label样式
    />
  </div>)
}