//模块作用
// - 共享性信息
// - 通用变量
import React from 'react';

const ShareInfo = {
    //后端api
    //http_api:"http://api.test.org:9090/",
    http_api:process.env.REACT_APP_API_URL,

    //如下3个key不能在网络上传输，可线下交给前后端。

    //此值用于cookie加解密。必须是16、24、32个字节的字串。
    //前端自己使用。
    //KeyCookie: "abc123oweruwierw11111111",  
    KeyCookie: "9gcETejNwmd0syMb3J4FbEmt",

    //必须是16、24、32位字节的字串。此值必须提供给解密端
    //此值用于解析api的授权token的加解密。
    //前端生成apiToken加密,后端存储并解密。
    //KeyToken:  "abc123oweruwierw11111111",    
    KeyToken:  "6s8MQjzqRfMR6ej80a8AuBjn",  
    
    //页面认证key。此值由后端提供。
    //必须是16、24、32位字节的字串。此值必须提供给解密端
    //react解密使用，由后端提供。前后端务必保持一致。
    //KeyAuth: '012345678901234511111111',
    KeyAuth: "JaWAhEzhzdYdqVUuUhRNK0o0",

    //API解析时的token的有效期
    //tokenTTL: 1000*60*60*24*365*1,

    //前端所有cookie的TTL                
    //TTL: new Date(new Date().getTime() + 60*60*1000*24), 
    TTL: new Date(new Date().getTime() + process.env.TTLCookie), 

}

//--------------------------
//共享数据的结构示例,以下初始值没有任何意义。在后续代码中会对它们进行读写操作。
//在代码中将cookie存储名称定义为appData。
const cookieData = {
   username:"abc",
   userid:0,
   //ns:"ns1.mm-dns.com.",
   title:"test",
   ttlcookie:0,   //该值暂时不用，采用前端配置文件中的TTL。
   ttlapiToken:0,
   footter_line_sider_1:"",
   footter_line_sider_2:"",
   footter_line_1:"",
   footter_line_2:"",
}

//--------------------------
export {
    ShareInfo,
    cookieData,
}