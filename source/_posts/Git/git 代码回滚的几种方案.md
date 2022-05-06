---
title: git 代码回滚的几种方案
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

## git 代码回滚的几种方案

### git reset --hard commit_id1 加 git cherry-pick commit_id2 commit_id3

a -> b -> c -> d

要删除b的提交

``` bash
1、git reset --hard a #回退到出错版本前一个commit

2、git cherry-pick c, d #将某次commit的更改应用到当前版本(将出错 cmmit 之后别人提交的代码合并到当前正常代码分支上)

3、git push origin HEAD --force  #强制提交
```

#### 最好不要使用在远端代码

### git rebase -i commit_id

a_commit -> b_commit -> c_commit -> d_commit

想要删除b提交

```bash
git log
```

```bash
git rebase -i a_commit
```

进入到交互模式，会有类似这样的列表

```bash
pick a_commit
pick b_commit
pick c_commit
pick d_commit
```

按 i 进入可编辑模式

把b_commit前面的pick改为drop或者d(pick代表保留，drop代表丢弃这个commit)

`esc`

`shift` + `:`

输入`wq` 保存退出

```bash
# 有冲突解决冲突 
# 解决完冲突之后
git add .
git commit -m 'chore: rebase'

# 可能会解决多次冲突
# 解决完之后使用 git rebase --continue

git rebase --continue

# 如果没有冲突 会直接成功
```

最后查看`git log`会发现在 a_commit后面生成了一个新的提交

### git revert

参考另一篇文章 git revert
