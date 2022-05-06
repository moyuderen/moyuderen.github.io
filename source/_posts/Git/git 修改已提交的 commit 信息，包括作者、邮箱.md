---
title: git 修改已提交的 commit 信息，包括作者、邮箱
tags:
  - Git
categories:
  - Git
comments: true
hide: false
date: 2021-05-06 12:38:47
permalink:
index_img:
---


## 背景

不同电脑配置了不同的用户名、邮箱，例如：不小心用公司电脑提交了 commit 到个人的github 仓库，想改掉已经提交的 commit 的信息。

## 修改用户名、邮箱

```bash
# 全局修改
git config --global user.name "moyuderen"
git config --global user.email "moyuderen@gmail.com"

# 针对某个仓库修改
git config user.name "moyuderen"
git config user.email "moyuderen@gmail.com"
```

> 只对修改之后的提交有效

## 修改 commit 信息，包括作者、邮箱

### 修改最后一次 commit 的信息

1. 修改 commit 注释信息

```bash
git commit --amend
```

出现修改注释信息的界面， 输入 i 进入修改模式，修改好注释后，按 Esc 键 退出编辑模式，输入 :wq 保存并退出。
注：注释信息一般显示在第一行，窗口下面第一个字符是 # 的内容不需要修改

2. 修改作者、邮箱

```bash
git commit --amend --author="{username} <{email}>"
```

例如：`git commit --amend --author="moyuderen <moyuderen@gmail.com>"`

### 修改某几次 commit 的信息

1. 查看提交记录`git log`

2. rebase

```bash
git rebase -i HEAD~2
# 或者
git rebase -i {commitID}

# 如果是修改所有
git rebase -i --root
```

执行 rebase 命令后，会出现 reabse 的编辑窗口，窗口底下会有提示怎么操作。

这里把需要修改的 commit 最前面的 pick 改为 edit，可以一条或者多条。:wq保存退出会出现下面的命令提示

```bash
Stop at 88921h...

You can amend the commit now, with

    git commit --amend

Once you are satisfied with your changes, run

    git rebase --continue
```

根据提示，接下来同样使用 --amend 进行修改

#### 修改 commit 信息

- 只修改注释信息

```bash
git commit --amend
```

- 只修改作者、邮箱

```bash
git commit --amend --author="{username} <{email}>" --no-edit
```

- 同时修改注释信息、作者、邮箱

```bash
git commit --amend --author="{username} <{email}>"
```

- 修改完成后，继续执行下面命令

```bash
git rebase --continue
```

如果是修改多条的话，重复以上操作即可。

直到出现以下提示，说明全部修改已经完成。

Successfully rebased and updated refs/heads/master.

- 强制push

```bash
git push --force origin master
```
> 注：当仓库是多人操作时，可能会覆盖别人push 的代码，请谨慎操作。

### 使用脚本批量修改

## 参考

[重写历史](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)