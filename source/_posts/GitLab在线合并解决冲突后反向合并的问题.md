---
title: GitLab 在线合并解决冲突后反向合并的问题
tags:
  - GIT
categories:
  - Diary
comments: true
hide: false
date: 2023-05-18 16:09:39
permalink:
index_img:
---

## 项目背景

开发项目的时候，使用gitLab合并功能分支feature到test分支上的时候，出现了Conflicts，在线解决冲突之后，点击解决合并，结果反向的把test的分支合并到了feature功能分支!!!

## 后果

导致test分支没有提测的代码合并到了feature分支，分支合并master的时候导致无需上线代码合到master分支，造成线上事故

## 解决方案

### 方法一

临时分支替代法：分支feature要合并到test分支，且出现了冲突，可以先从feature分支拉一个临时分支feature_temp，用临时分支feature_temp合并到test分支

```bash
git checkout feature //先切换到feature 分支
git checkout -b feature_temp //拉出来新的分支
git push origin feature_temp //推送到远端
git branch --set-upstream-to=origin/feature_temp 
```

然后再gitlab界面上面选择feature_temp分支去做合并操作。 点击`Resove Conflicts`，选择要留下的版本，点击`merge`合并

此时test分支合并到了feature_temp分支；***同时test分支也就有了feature分支的代码！！！（解决冲突并且完成合并）***

#### 原理

{% note warning %}
例子：feature分支要合到test分支，使用`Resove Conflicts`在线操作，解决冲突，点就`merge`按钮；
实际先执行了`Merge branch 'test' into 'feature'`，
然后执行了`Merge branch 'conf2-tmp' into 'test'`来解决冲突，
（所以在test分支的提交记录会看到`Merge branch 'conf2-tmp' into 'test'`和`Merge branch 'test' into 'feature'`两天提交记录）

{% endnote %}

{% note danger %}
但是在实际操作中test分支直接merge到feature分支会造成feature分支被污染；
{% endnote %}

{% note success %}
所以新建一个feature_tmp分支（来自于feature分支，带着feature分支代码）,执行`Resove Conflicts`操作来解决冲突合并代码
执行了`Merge branch 'test' into 'feature_tmp'`, 把test分支合并到feature_tmp
再执行了`Merge branch 'feature_tmp' into 'test'`来解决冲突，

此时feature_tmp携带了test分支的代码（受到污染，但是是备份分支则没有关系），test分支也携带了feature_tmp分支的代码，即使feature的代码，间接的完成了冲突解决和合并

feature分支也没必要在合到test分支，因为test分支已经携带了feature的代码
{% endnote %}

### 方法2

 回滚补救法：设feature分支要合并到test分支，且出现了冲突，合并完成后，对feature分支做回滚操作

```bash
git log //找到上一个版本的commitID
git reset --hard commitID  //强制回退本地分支
git push origin HEAD --force 或者 git push -f origin feature //强制回退远程
```

{% note warning %}

1. 远程master分支的`git push -f origin`会推不上去，可能是master分支设置了分支保护，关闭强制push的保护，强行push
2. `git push -f origin`操作如果不是自己的featur分支，是测试分支test或者主分支master可能会冲掉别人的代码！！！！
{% endnote %}

## 正常解决冲突操作方法（local 解决）

用较为纯净的分支合并到有其他功能分支；如feature分支合并到test分支解决冲突，或者master分支合并到feature分支解决冲突

### 如是是feature分支和test分支冲突

```bash
# 本地操作
git checkout test # 切换到test分支
git pull # 拉取最新代码
git merge feature # 将feature分支合并到test分支

# .
# .
# 在test分支解决冲突后，执行git add. ; git commit -m 'conflict: 解决冲突' 提交代码本金代码

git push # 把本地test分支推送到代码仓库
```

### 如果是feature分支和master分支冲突

```bash
# 本地操作
git checkout feature # 切换到feature分支
git pull # 拉取最新代码
git merge master # 将master分支合并到feature分支

# .
# .
# 在feature分支解决冲突后，执行git add. ; git commit -m 'conflict: 解决冲突' 提交代码本金代码

git push # 把本地feature分支推送到代码仓库

# 然后再gitlab远端执行merge操作，完成代码合并
```
