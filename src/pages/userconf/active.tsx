//import React from 'react';
import React, {useEffect,useState} from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import cookie from 'react-cookies'
import CryptoJS from 'crypto-js';
import {ShareInfo} from "@/public/shareinfo";
import { Encrypt, Decrypt,EncryptIV, DecryptIV} from '@/public/crypto';

const { Dragger } = Upload;


const App: React.FC = () => {
    const token = cookie.load('TOKEN')
    const appData = cookie.load('appData')
    const txt_dec = Decrypt(appData,ShareInfo.KeyCookie) 
    const AppConf = JSON.parse(txt_dec)
    const userid = AppConf.userid

    //只有admin用户可以上传授权文件
    const active_boole = ()=> {
        //console.log("user:",AppConf.username)
        if (AppConf.username == 'admin') {
            return false
        } 
        else {
            return true
        }
    }

    //上传的文件类型控制
    function beforeUpload(file:any) {
      const allowedTypes = [
        'text/plain',    //纯文本
      ];
   
      if (!allowedTypes.includes(file.type)) {
        message.error('只能上传JPG/PNG格式的文件!');
        return false;
      }

      //文件大小控制
      let isLt4M = file.size / 1024 / 1024 <= 0.5;
      if (!isLt4M) {
        message.error('文件最大不能超过0.5MB!');
        return false;
      }

      return true;
    }

    //上传授权文件的api
    const url = ShareInfo.http_api + 'lisenceupload'
    console.log("url:",url)
    const props: UploadProps = {
        name: 'lisence_file',
        action: url,
        disabled: active_boole(),
        accept: ".txt",  
        multiple: false,

          //header配置
        headers: {
          //authorization: 'authorization-text',
          'AuthToken':token,
          dycode: ((new Date()).getTime() - 1010101010101),
        },
        
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed, 或 文件内容不正确无法解析。`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    return (
  <Dragger 
    {...props} 
    beforeUpload={beforeUpload}
    method="post"
    maxCount={1}
    listType="text"
  >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag lisence file to this area to upload(only admin)</p>
    <p className="ant-upload-hint">
      Support for a single upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
    )
};

export default App;