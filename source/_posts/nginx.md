---
title: nginx
tags:
  - nginx
  - 技术
categories:
  - 技术
comments: true
hide: false
date: 2021-12-02 13:58:29
permalink:
index_img:
---

## nginx基本操作

1. nginx目录（mac系统）
    `cd /usr/local/etc/nginx`

2. 查看启动的nginx
    `ps -ef | grep nginx`

3. 启动nginx
    `nginx`
    没有任何输出代表启动成功（无输出就是最好的）

4. 检查nginx配置
    `nginx -t`

5. nginx重新加载配置
    `nginx -s reload`

6. 退出nginx
    `nginx -s qiut`

7. 停止nginx
    `nginx -s stop`

8. 重启nginx
    `nginx -s restart`
