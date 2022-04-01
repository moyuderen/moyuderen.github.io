---
title: CICD
tags:
  - CICD
  - 部署
  - gitlab
categories:
  - 技术
  - CICD
comments: true
hide: false
date: 2022-03-24 14:57:42
permalink:
index_img:
---

## gitlab的CICD

### 创建一个gitlab项目

### gitlab-runner

- 使用gitlab提高的的免费runner需要visa卡验证
- 使用自己安装的runner: [官方 install gitlab runner](https://docs.gitlab.com/runner/install/)
    1. 购买云服务器
    2. 按照官方的安装方式对于不同的系统进行安装
    3. `sudo gitlab-runner register`

## 问题

- dpkg: error: requested operation requires superuser privilege

    ```
    sudo -i
    ```

- dpkg:: command not found

- dpkg-deb: error: 'gitlab-runner_arm.deb' is not a Debian format archive
dpkg: error processing archive gitlab-runner_arm.deb (--install):
 dpkg-deb --control subprocess returned error exit status 2
Errors were encountered while processing:
 gitlab-runner_arm.deb

## 参考文章

- [GitLab CI 打造一条自己的流水线](https://mp.weixin.qq.com/s/yzIga9tsuLU22kiWPHVrBQ)
- [用 GitLab CI 进行持续集成](<https://scarletsky.gi>

## 问题

- dpkg: error: requested operation requires superuser privilegethub.io/2016/07/29/use-gitlab-ci-for-continuous-integration/)
- [GitLab CI/CD 实践](https://xiangflight.github.io/gitlab-cd-practice/)
