//模块作用
// - 通用函数

import axios from 'axios';
import React, {useEffect,useState,useRef} from 'react';
import {message} from 'antd';
import cookie from 'react-cookies'
import {ShareInfo} from './shareinfo'
import { history } from 'umi';

const token = cookie.load('TOKEN')

//在域名表和普通记录表中档位上直接更新。
//暂时支持更新如下档位
//- active
//- remark
//- Action中的delete
async function UpdaterecordInfo(jsonData:any) {
    /*
    const jsonData = {
      id: record.id,
      domain: record.domain,
      active: record.active,
      remark: text,
      flag:'remark'   //用于指定是操作任务，remark表示更remark,active表示更新active档位,delete表示删除该记录。
      db: 'zones'     //表示哪些数据表被操作。Zones和ZoneData两个表
    }
    */
    const url = ShareInfo.http_api + 'updaterecordinfo'
    await axios({
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
           message.success('修改成功！')
           //setUpdate(GetStringRand(4));    //更新列表
         } else {
           message.error('修改失败,请确认后再修改！')
         }
      }else{
         // 响应失败
         console.log('Failed to submit data');
         message.error('后台服务异常:请查看后台服务或网络')
      }
    })
}

//随机数
function GetStringRand(len:any) {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const stringLength = parseInt(len); // 你想要生成的字符串长度
    let randomString = '';
  
    for (let i = 0; i < stringLength; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      randomString += possibleCharacters.charAt(randomIndex);
    }
    return randomString
 }


//返回哪下信息
//- 用户名下的域名数量
//- 用户名下解析数量
//- 用户名下域名列表(已排序)
//- 系统的ns值
//- api后台系统的cpu/ram/hd/network使用情况,通常，api接口服务与bind9在同一台机器
//- 其它
//返回值为Promise格式：同步方式
const getTotal = async (username:any) => {
   let result:any = null
   //const url = 'http://192.168.3.110:8080/updateuserinfo/'+ userid
   const url = ShareInfo.http_api + 'gettotal/' + username
   try{
      await axios({
         url:url,
         method: 'get',
         headers: {
            'Content-Type':'application/json',
            'AuthToken':token,
            'dycode': ((new Date()).getTime() - 1010101010101) 
         },
      }).then(response => {
         if(response && response.status == 200){
           //console.log("1:",response.data)   //正常
           result = response.data
           //console.log("2:",result)              //正常
           //return (result)                    //在此返回时，无数据。
         } else {
            //console.log("3:",response.data)  //nul
            return "Error fetching data"
         }
         //return (result)   //在此返回时，无数据。
      }).catch((Error) => {
         console.log("error",Error)
         if (Error.response.status == 302) {
           //return <Navigate to="/login" />
           history.push('/login');
         }
      });
   } catch (error){
      console.error("Error fetching data", error);
      return "Error fetching data"
      // 处理错误的情况
   }
   return (result)    //在try后面返回。
}


 export {
    GetStringRand,
    UpdaterecordInfo,
    getTotal,
}