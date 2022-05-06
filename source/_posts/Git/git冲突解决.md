---
title: git 工作中解决分支合并冲突
tags:
  - Git
categories:
  - Git
comments: true
hide: false
date: 2021-12-02 12:38:47
permalink:
index_img:
---

## feature分支开发，合并时解决冲突(防止污染分支代码或者线上代码)

- fearure分支merge到develop分支冲突

    ```Bash
    # 本地操作
    git checkout develop
    git pull ## 最新代码

    git merge feature
    ## 解决冲突
    #...
    git add .
    git commit -m 'ci: 解决冲突'
    git push
    ```

- feature分支merge到master分支冲突

    ```Bash
    # 本地操作
    git checkout online
    git pull ## 最新代码

    git checkout feature # 切到开发分支
    git merge master
    ## 解决冲突
    #...
    git add .
    git commit -m 'ci: 解决冲突'
    git push
    ```