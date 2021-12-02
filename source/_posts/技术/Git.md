---
title: Git
tags:
  - Git
categories:
  - 技术
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

- 修改上次提交描述
`git commit --amend`

- git修改本地和远程分支名称

    ```Bash
    git branch -a #查看所有分支
    git branch -r #查看远程分支
    git branch -vv #查看本地分支所关联的远程分支
    git branch -m old_branch new_branch # Rename branch locally
    git push origin :old_branch # Delete the old branch
    # Push the new branch, set local branch to track the new remote
    git push --set-upstream origin new_branch # 或者git push -u origin new_branch
    
    # 注意： 把origin改为自己的名称（一般默认就为origin）
    ```

    > 参考： [git 修改本地和远程分支名称](https://blog.csdn.net/zhangxiaoyang0/article/details/82454209)

## .gitignore

- .gitignore不生效

`git rm -f -r --cached .`

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

## git revert用法

### 主要用途

revert 用于线上回滚代码

### 原理

- revert可以回滚指定提交，并产生一个新的提交 `eg: revert_commit_id`
- 由于revert之后产生了相反的提交，原来的提交会丢失，所以要回复revert的提交，可以把`revert_commit_id`再次revert

### 与reset区别

- [ ] 待完成

> 引用资料

### 实际如何操作

#### 开发背景

##### 主要分支

- main (线上主要分支)
- develop (测试分支)
- feature (开发分支)

***

#### 情况1：feature分支合并到develop分支

- 可以直接在feature上进行bugfix然后重新合并到develop分支
- 也可以参考下面的revert方法

#### 情况2：feature分支合并到了main分支（上线完成）;发现feature分支存在bug需要回滚代码

- 因为featue分支是通过merge的方式合并到main分支，所以会生成一个新的`merge_commit_id`

- 此时找到该`merge_commit_id`在gitlab上使用revert功能回退代码

- ##### 新建一个revert分支`revert-62021261`，再合并到main分支生成一个`revert_62021261_merge_commit_id` （代码回滚成功）

  - 恢复提交

        ```Bash
        # 切换到main
        
        git checkout main
        git pull
        
        git log // 找到revert_62021261_merge_commit_id
        git revert -m 1 revert_62021261_merge_commit_id # 由于是通过新建revert-62021261合并生成的revert提交 需要参数 -m 1 
        # 中间可能存在冲突，解决玩冲突重新 git add . / git commit -m 'ci: conflict'
        
        # 此时已经恢复到merge_commit_id状态
        
        git checkout featue
        # fixbug
        git add .
        git commit -m 'fix: bugfix'
        
        git chekout main
        git merge feature // 有冲突解决冲突
        git push
        ```

    > 如果是revert的是一个合并节点`mgere_commit`，该`merge_commit`就有两个parent, revert时git无法知道是恢复到哪个分支，所以会报错
    > `git revert -m 1 merge_commit`
    > 1代表当前分支，2代表合并过来的分支

- ##### 没有创建新的分支，直接生成了revert_commit_id（代码回滚成功）

  - 恢复提交（使用main分支）

        ```Bash
        # 切换到main
        
        git checkout main
        git pull
        
        git log # 找到revert_commit_id
        git revert revert_commit_id # 相比较生成新分支的megre不需要 -m 1
        # 中间可能存在冲突，解决玩冲突重新 git add . / git commit -m 'ci: conflict'
        
        # 此时已经恢复到merge_commit_id状态
        
        git checkout featue
        # fixbug
        git add .
        git commit -m 'fix: bugfix'
        
        git chekout main
        git merge feature # 有冲突解决冲突
        git push
        ```

  - 恢复提交（使用feature分支）

        ```Bash
        # 本地
        git checkout main
        git pull
        
        git chekout feature
        git merge main
        git log # 找到revert_commit_id
        
        git revert revert_commit_id
        # 恢复到了原来的状态
        
        # fixbug
        git add .
        git commit -m 'fix: bugfix'
        git push
        
        ```

        再次merge到main分支就可以了

- ##### 直接在gitlab操作

    1.找到`merge_commit_id`使用revert回滚代码（不要使用新建`revert-828929292`分支的方式）生成一个先的`revert_commit_id`（回滚成功)

    2.要想恢复之前的提交 找到`revert_commit_id`的提交，使用revert回滚代码（不使用新建`revert-12773612`分支的方式）生成一个`revert_revert_commit_id` （恢复成功）

### 参考文章

- [git如何回滚一次错误的操作](https://juejin.cn/post/6844903647390744589)
- [代码被revert,你pull了master,代码没了,咋找回来?](https://juejin.cn/post/6856039543628693517)

## github多账号配置

### 操作步骤

1. 首先进入.ssh目录
	```cd ~/.ssh```
2. 生成公私钥
	```ssh-keygen -t rsa -C "moyuderen"```

	{% note warning %}
	注意：到这一步时是对私钥进行命名，这里我命名为moyuderen_id_rsa
	{% endnote %}
	![生成公私钥1](id_rsa.png)

	{% note warning %}
	注意：到这一步时是设置密码，一路回车即可
	{% endnote %}
	![生成公私钥 密码](password.png)

	{% note success %}
	成功：看到下面的样子就是生成公私钥成功了
	{% endnote %}
	![生成公私钥 成功](id_rsa_success.png)

	{% note info %}
	使用`ls`会看到在.ssh目录下多出了 moyuderen_id_rsa和moyuderen_id_rsa.pub 一对公私钥
	{% endnote %}
	![生成公私钥 成功](id_rsa_success2.png)

3. 把moyuderen_id_rsa.pub里面的内容添加到github里即可(相信这一步都会的)
4. 配置config文件

	如果在~/.ssh目录下没有config文件，可以使用`touch config`创建，然后使用`vim config`编辑config文件（或者使用编辑器编辑）

	{% note success %}
	编辑好的config文件内容
	{% endnote %}
	![config](config.png)

	{% note primary %}
	```bash
	Host    moyuderen # 主机别名 拉取代码的时候回用到，默认的是github.com
	HostName    github.com  # 真正的地址github.com,gitlab.com,ip地址等 #
	User    moyuderen # 用户名
	PreferredAuthentications    publickey 
	IdentityFile    ~/.ssh/moyuderen_id_rsa # 另一个账户的私钥
	```
	{% endnote %}
5. 因为系统默认只读取id_rsa，为了让ssh识别新的私钥，可以使用ssh-agent手动添加私钥
	`ssh-add ~/.ssh/moyuderen_id_rsa`
6. 测试连接
	`ssh -T git@moyuderen`

	{% note success %}
	连接成功
	{% endnote %}
	![连接成功](test-t.png)

	{% note warning %}
	注意：这里正常测试为`ssh -T git@github.com`;因为我们在config文件中配置了主机名称`Host moyuderen`所以用moyuderen代替了github.com, 才使用了 `ssh -T git@moyuderen`进行测试连接
	{% endnote %}

7. 拉取仓库代码进行测试
	
	- 原本的操作 `git clone git@github.com:moyuderen/git.git`
	- 现在操作需要替换为 `git clone git@moyuderen:moyuderen/git.git`; 和配置的该账号主机名保持一致

8. 设置该仓库提交人的信息（否则和全局冲突无法提交）

	- `git config --local user.name yourusename`
	- `git config --local user.email youremail`

	最后修改代码提交试试吧

	
### 参考文章

1. [配置多个Git账号](https://blog.csdn.net/q13554515812/article/details/83506172)
2. [工作、开源两不误：Git 多账号管理](https://juejin.cn/post/6844903816609923080)
