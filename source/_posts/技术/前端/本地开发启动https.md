---
title: 本地开发启动https
tags:
  - 开发 
  - https
  - 技术
categories:
  - 技术
  - 前端
comments: true
hide: false
date: 2021-12-02 14:06:15
permalink:
index_img:
---

## 一、[vue-cli](https://cli.vuejs.org/zh/), [vite](https://cn.vitejs.dev/)等脚手架支持https方式

## 二、 nginx代理

1. 切到nginx目录

2. 自己生成签名
    `openssl req -x509 -nodes -days 36500 -newkey rsa:2048 -keyout ./ssl_certificate/nginx.key -out .ssl_certificate/nginx.crt`

    {% note primary %}
    如果没有ssl_certificate目录自己创建一个
    {% endnote %}

3. 配置niginx的conf文件

    ```nginx
        server {
            listen      443 ssl;
            listen      80;
            # listen    somename:8080;
            server_name  你的开发地址-cloud.com;
            
            ssl_certificate     /usr/local/etc/nginx/ssl_certificate/nginx.crt;
            ssl_certificate_key     /usr/local/etc/nginx/ssl_certificate/nginx.key;
            ssl_session_timeout     5m;
            ssl_ciphers     ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
            ssl_protocols   TLSv1 TLSv1.1 TLSv1.2;
            ssl_prefer_server_ciphers   on;

            location / {
                proxy_pass http://127.0.0.1:7777;
            }
        }
    ```

4. 重新加载nginx配置

    ```bash
    nginx -t
    nginx -s reload
    ```

5. 配置host转发-可使用[SwitchHosts](https://github.com/oldj/SwitchHosts/blob/master/README_cn.md)工具

    `127.0.0.0.1 你的开发地址-cloud.com`

6. 出现是私密连接，表示chrome认为签名是自己伪造

    {% note %}
    临时解决方案，在该页面盲写输入 `thisisunsafe`
    {% endnote%}

7. 如果出现`net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)`， 表示无权限，使用`sudo niginx` 重新启动nginx
