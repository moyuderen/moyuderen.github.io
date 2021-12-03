---
title: 免费CDN github+jsdelivr
tags:
  - 技术
  - CDN
categories:
  - 技术
comments: true
hide: false
date: 2021-12-03 14:21:24
permalink:
index_img:
---

## 背景

折腾了一晚上 在网上找了神作**塞尔达荒野之息**的高清图片，更换了博客的banner图，放在了博客的静态资源下面

部署后发现图片很大，加载特别慢

so, 灵机一动使用了在线压缩工具[tinify](https://tinify.cn/)对图片进行压缩（尝试几次发现压缩效果已经不是很明显了，图片依然很大）。内心os: 王德发? 熬不住了先睡了。

第二天早上来决定使用CDN图片，首先想到的是七牛云，但是七牛云每月10G流量，可是地址只能使用30天（真的是坑）

接着找了很多，不是需要注册或者实名备案，总之很麻烦。

最后找到了github+jsdelivr的方案

## 如何白嫖CDN

### 1. 新建一个github仓库。 eg:CDN

- 里面随便上传几个图片，打开图片的目录 eg: <https://github.com/moyuderen/CDN/blob/main/moyuderen/blog/srd-about.png>

- 打一个releases包

    {% note warning %}
    注意：这一步是必须的
    {% endnote %}

### 2. 用jsdelivr地址替换github上的地址（releases包的地址）

- `https://cdn.jsdelivr.net/gh/moyuderen/CDN/moyuderen/blog/srd-about.png`
替换
- `https://github.com/moyuderen/CDN/blob/main/moyuderen/blog/srd-about.png`

### 3. 原理

`https://github.com/${yourUsername}/${repositoryName}/${branchName}/${filePathName}`

`https://cdn.jsdelivr.net/gh/${yourUsername}/${repositoryName}[${@version}]/${filePathName}`

{% note warning %}
备注：
`@version`是release包（tag）的名称如@0.0.2或者@latest

1. 如果没有version参数，默认为@latest。 eg: `https://cdn.jsdelivr.net/gh/moyuderen/CDN@0.0.3/moyuderen/blog/srd-about.png`
2. 可以用version来区分版本
{% endnote %}

{% note danger %}
重要：每次更新仓库内容，必须重新创建release包（新的tag），最新的资源才能生效（生效有一点点延迟，稍等就可以啦）
{% endnote %}

## 参考

1. [jsdelivr官网](https://www.jsdelivr.com/?docs=gh)
2. [Jsdelivr+Github = 免费CDN??](https://cloud.tencent.com/developer/article/1847396)
3. [自动使用jsdelivr CDN 加速hexo的图片等静态资源加载](https://renzibei.com/2020/07/12/%E4%BD%BF%E7%94%A8jsdelivr-CDN-%E5%8A%A0%E9%80%9Fhexo%E7%9A%84%E5%9B%BE%E7%89%87%E7%AD%89%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E5%8A%A0%E8%BD%BD/)
