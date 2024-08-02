# about bind webadmin project
DNS is one of the cornerstones of Internet communication. The reliability, flexibility, and security of DNS (Domain Name System) are indispensable key factors for enterprise success.

Bind-webadmin is based on bind9 and manages various types of records through web methods. The use of bind-webadmin can quickly deploy a professional DNS server, enabling each bind-webadmin user to have their own dynamic DNS platform without relying on third-party platforms.

website
https://bind-webadmin.com

demo
https://mm-dns.com

> 提示
> 此部分开源的为bind-webadmin project的前端代码，欢迎大家讨论和指导。

# 安装
```bash
# wget https://data.bind-webadmin.com/dw/bind-webadmin.v0.1.tar.gz
# tar zxvf bind-webadmin.v0.1.tar.gz
# cd bind-webadmin.v0.1
# sh install.sh  /bindwebadmin  # 格式: sh install.sh  /install_dir 
                                # 安装目录为 /install_dir
                                # 书写格式: 以 / 开头，且不能以 / 为结尾
                                # 例如：
                                #    /abc/123    正确
                                #    /abc/123/   错误
# tree /bindwebadmin
/bindwebadmin            # 安装在 /bindwebadmin 目录。在安装前需保证本宿主中没有该目录。安装过程中会创建该目录。
├── cert
│   ├── dhparams.pem
│   ├── fullchain.pem    # 域名证书
│   └── privkey.pem      # 证书私钥
├── docker-compose.yml   # docker compose 配置文件
├── mysql
├── server
│   └── app.conf         # api接口配置文件
└── env.txt              # 主配置文件(环境变量)。供各个容器初始化时统一调用 

# cd /bindwebadmin
# vi env.txt
NS_DOMAIN='hello.com'
SSL=false

# docker compose up -d 
# docker ps
CONTAINER ID   IMAGE                                                     COMMAND                  CREATED         STATUS              PORTS                                              NAMES
ff5dfdeb80c8   registry.cn-hangzhou.aliyuncs.com/darry/bind_proxy:v1     "/entrypoint.sh"         2 minutes ago   Up About a minute   0.0.0.0:80->80/tcp, 22/tcp, 0.0.0.0:443->443/tcp   app-bind_proxy-1
c243de969590   registry.cn-hangzhou.aliyuncs.com/darry/bind_front:v1     "/docker-entrypoint.…"   2 minutes ago   Up About a minute   80/tcp, 0.0.0.0:9091->9091/tcp                     app-bind_front-1
8cc768945d27   registry.cn-hangzhou.aliyuncs.com/darry/bind:v1           "docker-entrypoint.sh"   2 minutes ago   Up 59 seconds       0.0.0.0:53->53/tcp, 0.0.0.0:53->53/udp, 953/tcp    app-bind9-1
c5754055d43d   registry.cn-hangzhou.aliyuncs.com/darry/bind_backend:v1   "/entrypoint.sh"         2 minutes ago   Up About a minute   0.0.0.0:9090->9090/tcp                             app-bind_backend-1
952156a17811   registry.cn-hangzhou.aliyuncs.com/darry/bind_mysql:v1     "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes        0.0.0.0:3306->3306/tcp, 33060/tcp                  app-bind_mysql-1        
```

添加如下A记录到hosts文件
```text
    hello.com      A x.x.x.x
    www.hello.com  A x.x.x.x
    api.hello.com  A x.x.x.x
```

在chrome中打开 http://hello.com ,默认帐号
- admin/admin1111mm
- demo/demo1111mm


# 功能介绍
- web方式管理bind9解析的域名和各类记录。
- 解析记录TTL值自由化，最小可配置为1秒，满足实性要求较高的应用场景
- 提供api接口，供用户实现编程式解析各类记录
- 提供客户端程序，自动识别用户IP(可选择公网出口IP或用户本机IP)变化，并主动更新。
- 用户可配置自己的域名为动态域名，自由实时解析。
- 支持IPv6记录写入
