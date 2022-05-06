---
title: git cherry pick
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

## git cherry pick

如果你在使用 git 进行多人协作的代码管理，合并代码（ git merge ）的操作你一定不陌生。 git merge 会将指定分支的所有提交历史合并到当前所在的分支，它的合并单位是“分支”。但有的时候，我只想取某个分支的某几个提交的内容来合并。

遇到这种操作需求，我们可以使用 cherry-pick 命令，它是以“提交”为单位的合并，可以帮助你安全快速地达到目的。

### cherry-pick 命令官方介绍

git-cherry-pick 它可以在当前分支应用其他已经存在的 commit 修改，并对每一个合并过来的 commit 产生一个新的提交记录（commit hash）。

cherry-pick - Given one or more existing commits, apply the change each one introduces, recording a new commit for each.

### cherry-pick 的使用

1. 基本命令
    指定任何本地分支上的某个存在的提交

    `git cherry-pick <commitHash>`
    例如代码仓库有两个分支 dev 和 feat：

    ```

    a - b - c - d - e   #dev
        \
        f - g - h - i  #feat
    ```

    现在要将 feat 分支上的提交 g 应用到 dev 分支：

    ``` sh
    git checkout dev
    git cherry-pick g
    ```

    代码库的结构将变成：

    ```sh
    a - b - c - d - e - g‘  #dev
        \
        f - g - h - i  #feat
    ```

    dev 分支后面将会增加一个提交 g’，这个提交的 commit 信息跟 feat 分支的 g 提交默认是一样的（你可以在提交过程中用 -m 选项追加内容，或者在处理冲突之后在 –continue 的时候修改，不过大部分时候，使用默认的就可以），但是会产生一个新的 commitHash。

2. 转移多个提交

    - 多个不连续的提交，提交之间用空格相隔
        `git cherry-pick <commitHash1> <commitHash2>`

    - 连续的提交（左开右闭），使用..注意中间没有任何空格
        `git cherry-pick <start-commitHash>..<end-commitHash>`

    - 连续的提交（左闭右闭）给第一个提交右侧加上^符号

        `git cherry-pick <start-commitHash>^..<end-commitHash>`
        注：连续的提交命令中，start-commitHash 一定要是 end-commitHash 之前的提交，否则命令将会失败，但不会报错。

3. 转移最顶端的提交

    `git cherry-pick <branchName>`
    会将指定分支的最后一次提交应用到当前分支。

4. 转移另一个代码库的提交
    其实 cherry-pick 的奥义就是，只要是在一个.git仓库管理下的本地代码，任何提交都可以被应用到任何可访问的本地分支，哪怕是跨代码库：

    ```sh
    git remote add repo2 git@xxx.git # 添加另一个代码库
    git fetch repo2 # 抓取新代码库到本地
    git log repo2/master # 查看新代码库master分支的提交记录
    git cherry-pick <commitHashInRepo2> # 将新的代码库的某个提交应用到当前分支（跨代码库的合并）
    ```

5. 冲突处理
    如果在cherry-pick的过程中，代码产生了冲突，cherry-pick 会停下来，等待我们的下一步操作决策。

    处理冲突。我们可以先将代码冲突在编辑器中处理好，然后回到命令行，使用 –countinue 参数让 cherry-pick 过程继续执行：
    `git cherry-pick --countinue`

    放弃合并，代码回到操作前的样子
    `git cherry-pick --abort`

    退出cherry-pick，但是代码不回到操作前的样子
    `git cheerry-pick --quit`

6. cherry-pick 的一些常用配置项

    -n, –no-commit
    只更新工作区和暂存区。不产生新的提交

    -x
    在提交信息末尾追加一行（cherry picked from commit…）方便以后查到这个提交是如何产生的。

    -m parent-number, –mainline parent-number
    如果原始分支是一个合并节点，那么 cherry-pick 默认会失败，因为不知道应该采用哪个分支的代码变动。 -m 配置项告诉 git 应该采用哪个分支分变动，parent-number 代表原始提交的父分支编号。

    `git cherry-pick -m 1 <commitHash>`
    一般1号父分支是接受变动分支（the branch being merged into），2号父分支是作为变动来源的分支（the branch being merged from)。

### 参考

1. [Git之cherry-pick](https://champyin.com/2021/05/23/Git%E4%B9%8Bcherry-pick/)