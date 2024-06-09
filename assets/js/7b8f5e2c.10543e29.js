"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[479],{7151:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>t,default:()=>p,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var s=r(5893),o=r(1151);const i={title:"\u5feb\u901f\u90e8\u7f72",sidebar_position:5,description:"\u57fa\u4e8edocker compose\u5feb\u901f\u90e8\u7f72."},t=void 0,d={id:"docs/sider/guides/step2",title:"\u5feb\u901f\u90e8\u7f72",description:"\u57fa\u4e8edocker compose\u5feb\u901f\u90e8\u7f72.",source:"@site/docs/docs/sider/guides/step2.md",sourceDirName:"docs/sider/guides",slug:"/docs/sider/guides/step2",permalink:"/docs/docs/sider/guides/step2",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{title:"\u5feb\u901f\u90e8\u7f72",sidebar_position:5,description:"\u57fa\u4e8edocker compose\u5feb\u901f\u90e8\u7f72."},sidebar:"oswSidebar",previous:{title:"\u51c6\u5907",permalink:"/docs/docs/sider/guides/step1"},next:{title:"\u57fa\u672c\u64cd\u4f5c",permalink:"/docs/docs/sider/guides/step4"}},c={},a=[{value:"\u5b89\u88c5\u5305",id:"\u5b89\u88c5\u5305",level:2},{value:"\u5b89\u88c5",id:"\u5b89\u88c5",level:2},{value:"\u6253\u5f00webadmin",id:"\u6253\u5f00webadmin",level:2},{value:"\u914d\u7f6e\u6587\u4ef6\u8bf4\u660e",id:"\u914d\u7f6e\u6587\u4ef6\u8bf4\u660e",level:2},{value:"<code>env.txt</code>\u4e3b\u914d\u7f6e\u6587\u4ef6",id:"envtxt\u4e3b\u914d\u7f6e\u6587\u4ef6",level:3},{value:"api\u540e\u53f0\u914d\u7f6e\u6587\u4ef6<code>app.conf</code>",id:"api\u540e\u53f0\u914d\u7f6e\u6587\u4ef6appconf",level:3}];function l(n){const e={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.admonition,{type:"tip",children:(0,s.jsx)(e.p,{children:"\u4ee5docker compose\u65b9\u5f0f\u4e3a\u4f8b"})}),"\n",(0,s.jsx)(e.h2,{id:"\u5b89\u88c5\u5305",children:"\u5b89\u88c5\u5305"}),"\n",(0,s.jsx)("a",{href:"/download/bind-webadmin.v1.tar.gz",children:"Download Bind-Webadmin v1"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# wget https://bind-webadmin.com/download/bind-webadmin.v1.tar.gz\r\n# tar zxvf bind-webadmin.v1.tar.gz\n"})}),"\n",(0,s.jsx)(e.h2,{id:"\u5b89\u88c5",children:"\u5b89\u88c5"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# cd bind-webadmin.v1\r\n# sh install.sh\r\n# tree /app\r\n/app                     # \u5b89\u88c5\u5728 /app \u76ee\u5f55\u3002\u5728\u5b89\u88c5\u524d\u9700\u4fdd\u8bc1\u672c\u5bbf\u4e3b\u4e2d\u6ca1\u6709\u8be5\u76ee\u5f55\u3002\r\n\u251c\u2500\u2500 cert\r\n\u2502\xa0\xa0 \u251c\u2500\u2500 dhparams.pem\r\n\u2502\xa0\xa0 \u251c\u2500\u2500 fullchain.pem    # \u57df\u540d\u8bc1\u4e66\r\n\u2502\xa0\xa0 \u2514\u2500\u2500 privkey.pem      # \u8bc1\u4e66\u79c1\u94a5\r\n\u251c\u2500\u2500 docker-compose.yml   # docker compose \u914d\u7f6e\u6587\u4ef6\r\n\u251c\u2500\u2500 env.txt              # \u4e3b\u914d\u7f6e\u6587\u4ef6(\u73af\u5883\u53d8\u91cf)\u3002\u4f9b\u5404\u4e2a\u5bb9\u5668\u521d\u59cb\u5316\u65f6\u7edf\u4e00\u8c03\u7528\r\n\u251c\u2500\u2500 mysql\r\n\u251c\u2500\u2500 server\r\n\u2502\xa0\xa0 \u2514\u2500\u2500 app.conf         # api\u63a5\u53e3\u914d\u7f6e\u6587\u4ef6\r\n\u2514\u2500\u2500 start.sh             # \u542f\u52a8\n"})}),"\n",(0,s.jsxs)(e.p,{children:["\u4ee5",(0,s.jsx)(e.code,{children:"NS_DOMAIN='hello.com'"}),"\u4e3a\u4f8b"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'# cd /app\r\n# sh start.sh\r\n# docker ps\r\nCONTAINER ID   IMAGE                                                     COMMAND                  CREATED         STATUS              PORTS                                              NAMES\r\nff5dfdeb80c8   registry.cn-hangzhou.aliyuncs.com/darry/bind_proxy:v1     "/entrypoint.sh"         2 minutes ago   Up About a minute   0.0.0.0:80->80/tcp, 22/tcp, 0.0.0.0:443->443/tcp   app-bind_proxy-1\r\nc243de969590   registry.cn-hangzhou.aliyuncs.com/darry/bind_front:v1     "/docker-entrypoint.\u2026"   2 minutes ago   Up About a minute   80/tcp, 0.0.0.0:9091->9091/tcp                     app-bind_front-1\r\n8cc768945d27   registry.cn-hangzhou.aliyuncs.com/darry/bind:v1           "docker-entrypoint.sh"   2 minutes ago   Up 59 seconds       0.0.0.0:53->53/tcp, 0.0.0.0:53->53/udp, 953/tcp    app-bind9-1\r\nc5754055d43d   registry.cn-hangzhou.aliyuncs.com/darry/bind_backend:v1   "/entrypoint.sh"         2 minutes ago   Up About a minute   0.0.0.0:9090->9090/tcp                             app-bind_backend-1\r\n952156a17811   registry.cn-hangzhou.aliyuncs.com/darry/bind_mysql:v1     "docker-entrypoint.s\u2026"   2 minutes ago   Up 2 minutes        0.0.0.0:3306->3306/tcp, 33060/tcp                  app-bind_mysql-1        \n'})}),"\n",(0,s.jsxs)(e.p,{children:["\u5bbf\u4e3b\u9700\u5f00\u653e",(0,s.jsx)(e.code,{children:"tcp/80,tcp/443,tcp/53,udp/53"})]}),"\n",(0,s.jsx)(e.h2,{id:"\u6253\u5f00webadmin",children:"\u6253\u5f00webadmin"}),"\n",(0,s.jsxs)(e.admonition,{type:"tip",children:[(0,s.jsx)(e.p,{children:"\u7531\u4e8e\u4ee5hello.com\u4e3a\u4f8b\uff0c\u7528\u6237\u9700\u5728\u672c\u5730hosts\u6587\u4ef6\u4e2d\u6dfb\u52a0\u5982\u4e0b\u8bb0\u5f55\uff0c\u5047\u8bbe192.168.3.7\u4e3a\u5bbf\u4e3bip."}),(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-text",children:"    hello.com      A 192.168.1.7\r\n    www.hello.com  A 192.168.1.7\r\n    api.hello.com  A 192.168.1.7\n"})})]}),"\n",(0,s.jsxs)(e.p,{children:['\u5728chrome\u4e2d\u6253\u5f00"',(0,s.jsx)(e.a,{href:"http://hello.com%22,%E9%BB%98%E8%AE%A4%E5%B8%90%E5%8F%B7",children:'http://hello.com",\u9ed8\u8ba4\u5e10\u53f7'})]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"admin/admin1111mm"}),"\n",(0,s.jsx)(e.li,{children:"demo/demo1111mm"}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"\u6b63\u5e38\u60c5\u51b5\u4e0b\u51fa\u73b0\u5982login\u9875\u9762"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Alt text",src:r(2823).Z+"",width:"943",height:"711"})}),"\n",(0,s.jsx)(e.h2,{id:"\u914d\u7f6e\u6587\u4ef6\u8bf4\u660e",children:"\u914d\u7f6e\u6587\u4ef6\u8bf4\u660e"}),"\n",(0,s.jsxs)(e.h3,{id:"envtxt\u4e3b\u914d\u7f6e\u6587\u4ef6",children:[(0,s.jsx)(e.code,{children:"env.txt"}),"\u4e3b\u914d\u7f6e\u6587\u4ef6"]}),"\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.code,{children:"env.txt"}),"\u4e3b\u914d\u7f6e\u6587\u4ef6\u8bf4\u660e"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# \u63d0\u793a\r\n# \u5404\u4e2a\u5bb9\u5668\u4f1a\u542f\u52a8\u65f6\u8bfb\u53d6\u5982\u4e0b\u503c\u5e76\u5230\u66f4\u65b0\u81ea\u5df1\u7684\u76f8\u5e94\u914d\u7f6e\u4e2d\u3002\r\n\r\n# NS_DOMAIN\u503c\u5fc5\u987b\u4e0ebind_backend\u4e2d\u7684\u914d\u7f6e\u6587\u4ef6app.conf\u4e2d\u7684ns\u53d8\u91cf\u503c\u76f8\u540c\u3002\r\nNS_DOMAIN='hello.com'\r\n\r\n\r\n# mysql\u57fa\u672c\u914d\u7f6e\r\nMYSQL_HOST=bind_mysql\r\nMYSQL_ROOT_PASSWORD=mysql+888\r\nMYSQL_ALLOW_EMPTY_PASSWORD=no\r\nMYSQL_POST=3306  \r\nMYSQL_DB=BindDB\r\nMYSQL_USERNAME=root\r\nMYSQL_USERPWD=mysql+888\r\n# \u63d0\u793a\r\n# 1.MYSQL_POST\u503c\u5fc5\u987b\u4e0emysql\u5bb9\u5668\u542f\u52a8\u65f6\u7684\u914d\u7f6e\u76f8\u540c\r\n# 2.MYSQL_HOST\u503c\u5fc5\u987b\u4e0emysql\u7a7a\u5668\u7684\u670d\u52a1\u540d\u79f0\u76f8\u540c\r\n# 3.\u5f53\u91c7\u7528root\u65f6\uff0cMYSQL_USERPWD\u4e0eMYSQL_ROOT_PASSWORD\u76f8\u540c\r\n# 4.\u91c7\u7528\u975eroot\u65b9\u5f0f\uff0c\u9700\u624b\u5de5\u521b\u5efa\u5e10\u53f7\r\n\r\n# mysql\u8fd0\u884c\u73af\u5883(\u521d\u59cb\u5316\u65f6\u4e2d\u6587\u652f\u6301)\r\nLANG=C.UTF-8\r\nMYSQL_CHARSET=utf8mb4\r\nMYSQL_COLLATION=utf8mb4_unicode_ci\r\n\r\n\r\n#\u540e\u9762API\u63a5\u53e3(\u4e0d\u8981\u4ee5/\u4e3a\u7ed3\u5c3e)\r\n#\u8be5\u503c\u5fc5\u987b\u4e0e\u540e\u7aef\u63a5\u53e3\u5bf9\u5916\u5f00\u653e\u7684\u914d\u7f6e\u4fdd\u6301\u4e00\u81f4\uff0c\u5373\u63a5\u53e3\u5916\u90e8\u57df\u540d\u548c\u7aef\u53e3\r\n#\u4e3a\u5916\u90e8\u7684api\u63a5\u53e3\u3002\r\n#API_URL=http://192.168.3.7:9090\r\n#API_URL_SSL=http://192.168.3.7:9090\r\n\r\n#\u82e5\u91c7\u7528\u672c\u7cfb\u7edf\u7684api\u63a5\u53e3\uff0c\u6b64\u503c\u4e3a\r\n# API_URL=http://api.${NS_DOMAIN}\r\n# \u82e5\u6709\u8bc1\u4e66\uff0c\u9700\u914d\u7f6e\u4e3a\r\n# API_URLs=https://api.${NS_DOMAIN}\r\n#API_URL=http://192.168.3.7:9090\r\nSSL=false\r\nAPI_URL=http://api.${NS_DOMAIN}\r\nAPI_URL_SSL=https://api.${NS_DOMAIN}\r\n\r\n\r\n#----------------------------\r\n#\u524d\u7aef\u53c2\u6570\r\nICP=\u7ca4ICP\u59079999999999\u53f7(\u793a\u4f8b)\r\nOTHERCODE=\u7ca4\u516c\u7f51\u5b89\u590788888888888888\u53f7(\u793a\u4f8b)\r\nLOGIN_FOOTER_TEXT='Mobile: 13751090806    email: guofs@139.com'\r\n\r\n#title\u914d\u7f6e\r\nAPP_TITLE=mmDNS724  \r\n\r\n#sider\u9875\u811a\r\nFootter_line_sider_1=test88\r\nFootter_line_sider_2='mm-dns.com'\r\n\r\n#\u666e\u901a\u9875\u9762\u9875\u811a\r\nFootter_line_1='DNS\u81ea\u4e3b\u7cfb\u7edf'\r\nFootter_line_2='by mm-dns.com'\r\n\r\n#\u524d\u7aef\u5728\u4ea7\u751fapi Token\u65f6\u4e3a\u8be5token\u914d\u7f6e\u7684TTL\r\n#1\u5e74=1000*60*60*24*365*1=31536000000\r\nTTLApiToken=315360000000\r\n\r\n#\u524d\u7aef\u6240\u6709cookie\u7684TTL\u503c\r\n#1\u5929:60*60*1000*24\r\nTTLCookie=86400000\n"})}),"\n",(0,s.jsxs)(e.p,{children:["\u5176\u4e2d",(0,s.jsx)(e.code,{children:"NS_DOMAIN"}),"\u53c2\u6570\u662fbind-webadmin\u4e3b\u57df\u540d\u670d\u52a1\u5668\u7684\u57df\u540d\u3002"]}),"\n",(0,s.jsx)(e.p,{children:"\u63d0\u793a"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u7cfb\u7edf\u642d\u5efa\u8005\u7528\u6237\u53ea\u9700\u4fee\u6539",(0,s.jsx)(e.code,{children:"NS_DOMAIN"}),"\u53c2\u6570,\u5176\u5b83\u7684\u53ef\u4ee5\u4e0d\u7528\u4fee\u6539\u3002\u672c\u4f8b\u4ee5",(0,s.jsx)(e.code,{children:"NS_DOMAIN='hello.com'"}),"\u4e3a\u4f8b"]}),"\n",(0,s.jsxs)(e.li,{children:["\u82e5\u6682\u65f6\u6ca1\u6709SSL\u8bc1\u4e66\uff0c\u9700\u914d\u7f6e",(0,s.jsx)(e.code,{children:"SSL=false"})]}),"\n"]}),"\n",(0,s.jsxs)(e.h3,{id:"api\u540e\u53f0\u914d\u7f6e\u6587\u4ef6appconf",children:["api\u540e\u53f0\u914d\u7f6e\u6587\u4ef6",(0,s.jsx)(e.code,{children:"app.conf"})]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:'#httpaddr = "127.0.0.1"\r\n#\u6b64\u7aef\u53e3\u540d\u79f0\u4e0d\u80fd\u66f4\u6539\uff0c\u5df2\u5199\u5165\u76f8\u5173nginx\u914d\u7f6e\u4e2d\r\nhttpport=9090\r\n#\u8fd0\u884c\u6a21\u5f0f\uff1adev\u3001test\u3001prod\r\nrunmode=dev\r\n#testoption=abc\r\nappname=beego\r\n\r\n[dev]\r\nver="v0.1.6"\r\n# \u521b\u5efa\u5bb9\u5668\u65f6\uff0c\u5982\u4e0b6\u4e2a\u53c2\u6570\u52a1\u5fc5\u4f7f\u7528\u5982\u4e0b\u521d\u59cb\u5316\u503c\uff0c\u5373\u5c06\u8be5\u6587\u4ef6\u63d0\u4f9b\u7ed9\u5bb9\u5668\u65f6\uff0c\u9700\u91c7\u7528\u5982\u4e0b\u503c\u3002\r\nmysql_host=bind_mysql\r\nmysql_port=3306\r\nmysql_dbname=BindDB_test\r\nmysql_user=root_root\r\nmysql_password=mysql88899\r\nns=testabcxyz123.org\r\n# \u5982\u4e0a\u8ff0\u521d\u59cb\u5316\u503c\u4e0d\u53ef\u66f4\u6539\uff0c\u5df2\u5199\u5165docker compose\u521d\u59cb\u5316\u811a\u672c\u4e2d\u3002\r\n\r\n# \u6570\u7ec4\u914d\u7f6e\u65b9\u5f0f\r\n# \u57df\u540d\u7c7b\u578b\r\ndomaintypes=".com .net .org .cn .io .top .com.cn .tech .info"\r\n# \u89e3\u6790\u8bb0\u5f55\uff0c\u6682\u4e0d\u652f\u6301ns\u89e3\u6790\r\nrecordtypes="A MX CNAME TXT AAAA"   \r\n# TTL(\u5fc5\u987b\u6709\u6309\u7167\u5982\u4e0b\u683c\u5f0f\u4e66\u5199)\r\nttl="1 1sec,5 5sec,30 30sec,60 1min,300 5min,1800 30min,3600 1h,43200 12h,86400 24h"\r\n\r\n#\u5fc5\u987b\u662f16\u300124\u300132\u4f4d\u5b57\u8282\u7684\u5b57\u4e32\u3002\u6b64\u503c\u5fc5\u987b\u63d0\u4f9b\u7ed9\u89e3\u5bc6\u7aef\r\n#\u6b64\u503c\u7528\u4e8e\u89e3\u6790api\u7684\u6388\u6743token\u7684\u52a0\u89e3\u5bc6\u3002\r\n#\u524d\u7aef\u751f\u6210apiToken\u52a0\u5bc6,\u540e\u7aef\u5b58\u50a8\u5e76\u89e3\u5bc6\u3002\r\n#KeyToken="abc123oweruwierw11111111"\r\nKeyToken="6s8MQjzqRfMR6ej80a8AuBjn"\r\n\r\n#\u9875\u9762\u8ba4\u8bc1key\u3002\u6b64\u503c\u7531\u540e\u7aef\u63d0\u4f9b\u3002\r\n#\u5fc5\u987b\u662f16\u300124\u300132\u4f4d\u5b57\u8282\u7684\u5b57\u4e32\u3002\u6b64\u503c\u5fc5\u987b\u63d0\u4f9b\u7ed9\u89e3\u5bc6\u7aef\r\n#react\u89e3\u5bc6\u4f7f\u7528\uff0c\u7531\u540e\u7aef\u63d0\u4f9b\u3002\u524d\u540e\u7aef\u52a1\u5fc5\u4fdd\u6301\u4e00\u81f4\u3002\r\nKeyAuth="JaWAhEzhzdYdqVUuUhRNK0o0"\r\n\r\n#\u540e\u7aef\u4f7f\u7528\r\n#\u7528\u6237\u8ba4\u8bc1\u65f6\uff0c\u670d\u52a1\u7aef\u521b\u5efa\u7684token\u65f6\u7684TTL\r\n#1000\u8868\u793a1\u79d2\r\n# 1\u5206\u949f: 1\r\n# 1\u5c0f\u65f6: 60\r\n# 1\u5929  : 60*24 = 1440\r\nTTLAuth=1440\r\n\r\n#\u4ec5\u524d\u7aef\u4f7f\u7528\r\n#\u8ba4\u7aef\u8ba4\u8bc1\u6210\u529f\u540e\u5b58\u5165\u524d\u7aef\u7684cookie\u4e2d\u3002\r\n#\u524d\u7aefcookie\u7684TTL\u503c\r\n#1\u5929:60*60*1000*24\r\nTTLCookie=86400000\r\n#\u8be5\u53c2\u6570\u6682\u65f6\u65e0\u7528\r\n\r\n\r\n#\u4ec5\u524d\u7aef\u4f7f\u7528\r\n#\u8ba4\u7aef\u8ba4\u8bc1\u6210\u529f\u540e\u5b58\u5165\u524d\u7aef\u7684cookie\u4e2d\u3002\r\n#\u524d\u7aef\u5728\u4ea7\u751fapi Token\u65f6\u4e3a\u8be5token\u914d\u7f6e\u7684TTL\r\n#1\u5e74=1000*60*60*24*365*1=31536000000\r\nTTLApiToken=63072000000\r\n#\u8be5\u53c2\u6570\u6682\u65f6\u65e0\u7528\r\n\r\n#\u4ec5\u4f9b\u524d\u7aef\u4f7f\u7528\u3002\r\n#Title\uff0c\u7ad9\u70b9\u6807\u9898\r\ntitle="DarryFS"\r\n#\u8be5\u53c2\u6570\u6682\u65f6\u65e0\u7528\r\n\r\n#\u524d\u7aef\u9875\u811a\u914d\u7f6e\r\nFootter_line_sider_1="Test"\r\nFootter_line_sider_2="by guofs.com"\r\nFootter_line_1="testtesttest8"\r\nFootter_line_2="by guofs.com"\r\n#\u4e0a\u97624\u4e2a\u53c2\u6570\u6682\u65f6\u65e0\u7528\r\n\r\n#login\u9875\u5e95\u90e8\u6587\u5b57\uff0c\u53ef\u7528\u4e8e\u914d\u7f6e\u5907\u6848\u53f7\u4fe1\u606f\u7b49\r\nLoginText="\u5907\u6848\u53f7(\u793a\u4f8b)\uff1a\u6df1ICP\u59072020017848\u53f7-8"\r\n#\u8be5\u53c2\u6570\u6682\u65f6\u65e0\u7528\r\n\r\n\r\n[test]\r\nmysql_dbname=beego\r\nmysql_user=root\r\nmysql_password=12qwaszx\r\nmysql_host=192.168.3.52:3306\r\n\r\n[prod]\r\nmysql_user=root\r\nmysql_password=12qwaszx\r\nmysql_host=192.168.3.52:3306\r\nmysql_dbname=beego\n'})})]})}function p(n={}){const{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}},2823:(n,e,r)=>{r.d(e,{Z:()=>s});const s=r.p+"assets/images/1717778156078-fb90e7eaa66440583f1903eb616a9ec7.png"},1151:(n,e,r)=>{r.d(e,{Z:()=>d,a:()=>t});var s=r(7294);const o={},i=s.createContext(o);function t(n){const e=s.useContext(i);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:t(n.components),s.createElement(i.Provider,{value:e},n.children)}}}]);