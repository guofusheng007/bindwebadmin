//import React from 'react';
import React, {useEffect,useState,useRef} from 'react';
import cookie from 'react-cookies'
import {ShareInfo} from "@/public/shareinfo";
import {GetStringRand,UpdaterecordInfo,getTotal,getLisenceInfo} from "@/public/sharefun";
import { Encrypt, Decrypt,EncryptIV, DecryptIV } from '@/public/crypto';

import { 
  Form,
  Progress,
  Descriptions,
  Badge,
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
  const totalLisenceInfo = getLisenceInfo()
  console.log("total:",total)
  console.log("totalLisenceInfo:",totalLisenceInfo)


  const [total_data, setTotal_data] = useState<any>({}); 
  const [monitordata, setMonitodata] = useState<any>({}); 
  const [lisenceinfo_cur, setLisenceInfo_cur] = useState<any>({});
  const [lisenceinfo_txt, setLisenceInfo_txt] = useState<any>({});
  useEffect(() => {
      //提取PromiseResult
      total.then((PromiseResult:any)=>{
        console.log("Promise的数据:",PromiseResult)
        setTotal_data(PromiseResult)
        setMonitodata(PromiseResult.monitordata)
      });
      //lisence信息统计
      totalLisenceInfo.then((PromiseResult:any)=>{
        console.log("Promise的数据:",PromiseResult)
        setLisenceInfo_cur(PromiseResult)
        setLisenceInfo_txt(PromiseResult.Lisence_info)
      });
  }, []);
  
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
      label: 'User',
      children: lisenceinfo_txt.username,
    },
    {
      key: '2',
      label: 'Address',
      children: lisenceinfo_txt.address,
    },
    {
      key: '3',
      label: 'Email',
      children: lisenceinfo_txt.email,
    },
    {
      key: '4',
      label: 'Tel',
      children: lisenceinfo_txt.mobile,
    },
    {
      key: '5',
      label: 'Company',
      children: lisenceinfo_txt.company,
    },
    {
      key: '6',
      label: 'Company website',
      children: lisenceinfo_txt.website,
    },
    {
      key: '7',
      label: 'Lisence nsdomain',
      children: lisenceinfo_txt.nsdomain,
    },
    {
      key: '8',
      label: 'Domain total',
      children: <>{lisenceinfo_txt.count_domains} ( current : <div style={{"color":"red","display":"inline"}}>{lisenceinfo_cur.cur_count_domains}</div> )</>,
    },
    {
      key: '9',
      label: 'Records total',
      children: <>{lisenceinfo_txt.count_records} ( current : <div style={{"color":"red","display":"inline"}}>{lisenceinfo_cur.cur_count_records}</div> )</>,
    },
    {
      key: '10',
      label: 'RegisterUsers total',
      children: <>{lisenceinfo_txt.count_users} ( current : <div style={{"color":"red","display":"inline"}}>{lisenceinfo_cur.cur_count_users}</div> )</>,
    },
    {
      key: '11',
      label: 'Days total',
      children: <>{lisenceinfo_txt.count_days} ( current : <div style={{"color":"red","display":"inline"}}>{lisenceinfo_cur.cur_count_days}</div> )</>,
    },
    {
      key: '12',
      label: 'Lisence Flag',
      children: <>{lisenceinfo_txt.flag}</>,
    },
    {
      key: '13',
      label: 'Date Limit',
      children: <>From: {(new Date(lisenceinfo_txt.registe_date)).toLocaleString()} To: <div style={{"color":"red","display":"inline"}}>{(new Date(new Date(lisenceinfo_txt.registe_date).getTime() + lisenceinfo_txt.count_days*24*60*60*1000)).toLocaleString()} </div> </>,
    },
    {
      key: '14',
      label: 'Status',
      children: <Badge status="processing" text="Running" />,
      span: 3,
    },
  ]

  const items3: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '域名数量',
      children: total_data.domain,
    },
    {
      key: '2',
      label: '解析数量',
      children: total_data.record,
    },
  ]

  return (<div>
    <h2>你好，{username}</h2>
    <br/>
    {
      (AppConf.username == 'admin') ? (
        <>
        <Descriptions 
          title="服务器信息"                  //描述列表的标题，显示在最顶部.支持嵌html代码
          bordered                           //是否展示边框
          items={items1}                      //描述列表项内容
          layout="horizontal"                //描述布局,horizontal | vertical
          //contentStyle={{CSSProperties}}   //自定义内容样式
          //labelStyle={{CSSProperties}}     //自定义label样式
        />
        <br/>
        {
          (lisenceinfo_cur.resule_code != 100) ?(<>
            <h2><div style={{"color":"red"}}>激活出错</div></h2>
            <div>
              如下原因造成
              <ul>
                <li>授权文件不存在、或损坏、或错误文件</li>
                <li>授权过期</li>
                <li>授权nsdomain,与当前使用的nsdomain不匹配</li>
              </ul>
            </div>
            <h3>请打开页面进行<a href="https://mm-dns.com/lisence" target="_blank">授权申请</a></h3>
            <br/>
          </>):(<>
            <Descriptions 
              title={<>授权信息 <a href="https://mm-dns.com/lisence" target="_blank">更新授权</a></>}                  //描述列表的标题，显示在最顶部.支持嵌html代码
              bordered                           //是否展示边框
              items={items2}                      //描述列表项内容
              layout="horizontal"                //描述布局,horizontal | vertical
            />
            <br/>
          </>)
        }
        </>
      ):(
        <></>
      )
    }
    <Descriptions 
      title="当前用户的域名信息统计"           //描述列表的标题，显示在最顶部.支持嵌html代码
      bordered                           //是否展示边框
      items={items3}                      //描述列表项内容
      layout="horizontal"                //描述布局,horizontal | vertical
      //contentStyle={{CSSProperties}}   //自定义内容样式
      //labelStyle={{CSSProperties}}     //自定义label样式
    />
    <>
    
    </>
  </div>)

}