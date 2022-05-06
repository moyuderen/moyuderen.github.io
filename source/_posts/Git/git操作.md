---
title: git操作
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

## git操作

- 查看所有分支
`git branch -a`

- 查看远程分支
`git branch -r`

- 查看本地分支所关联的远程分支
`git branch -vv`

- gitk 查看分支情况 会打卡GUI界面
`gitk`

### 修改上次提交描述

`git commit --amend`

### git修改本地和远程分支名称

1. 方法一

```Bash
# 本地分支重命名
git branch -m oldName newName

# 将重命名后的分支推送到远程
git push origin newName
# 注意： 把origin改为自己的名称（一般默认就为origin）
## 或者git push --set-upstream origin newName # 或者git push -u origin newName

# 删除远程的旧分支
git push origin :oldName
# 或者 git push --delete origin oldName

```

2. 方法2

```bash
# 需要使用高版本的git
git branch -M newName 
```

> 参考： [git 修改本地和远程分支名称](https://blog.csdn.net/zhangxiaoyang0/article/details/82454209)
> 参考： [Git分支重命名](https://juejin.cn/post/6893041983674122254)

## .gitignore

- .gitignore不生效

`git rm -f -r --cached .`

## 参考

[git](https://git-scm.com/book/zh/v2)
