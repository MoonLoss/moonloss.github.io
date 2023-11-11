---
title: '使用 Github ssh key 部署 Hexo 博客'
slug: 'hexo-ssh-key'
date: 2016-07-09 10:32:01 +0800
tags: [Blog, Github]
---

*以下方法适合于 Windows 用户，如果是 Linux或者 Mac 用户可以直接用终端的命令进行操作。*  

<!-- more -->

## 列出已存在的 ssh Key  
方法1.打开 Git Bash，并且输入：  
`ls ‐al ~/.ssh
`  

方法2.打开 [cmder](http://cmder.net/) ，并且输入：   
`ls ‐al ~/.ssh
`  

## 生成密钥   
方法1.用 Git Bash，然后输入：  
`ssh‐keygen ‐t rsa ‐C "your_email@example.com"
`   

这个命令将会生成一个以 your_email@example.com 为标签的 ssh key，然后 bash 中会显示：  
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]   

*注*：此处私钥的名称可以自定义，即可以不使用默认的名称 ‘id_rsa’。
另外还有一个常识，RSA 加密算法它的**公钥是从私钥提取而来**。

直接回车，然后出现：  
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]   

因为追求操作方便，所以不打算在 deploy 的时候输入这个 passphrase ，所以直接回车两次设为空。然后你会看到：  
`Your identification has been saved in ~/.ssh/id_rsa.
 Your public key has been saved in ~/.ssh/id_rsa.pub.
The key fingerprint is:
01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
`  

## 加入ssh Agent  

下一步在 Git Bash 或者 cmder 中输入：

`ssh‐agent ‐s
`   

如果出现类似 Agent pid XXXX 这样的字样，则跳过下一步，否则输入：  
``eval `ssh‐agent ‐s`
``

*注*：此处用 cmder 可能会出现下面的提示  
Cmder - 'eval' command is not recognized   
解决方法：使用`bash`命令进入
bash shell。然后`eval`就可以使用了。   

直到出现 Agent pid XXXX 这样的提示之后，输入：    
`ssh‐add ~/.ssh/id_rsa
`  

这样，就成功的在本地生成了一个可用的ssh key。  
## 将ssh Key添加到Github中   

下面将这个 key 添加到 github 网站。 
打开https://github.com/settings/ssh,  点击 Add ssh Key ，复制 id_rsa.pub(或者是你自己重命名的公钥名称) 中的所有内容到 Key 框中，在 Title 框中输入方便自己记忆的名字（建议输入能让自己明白是哪台电脑的名字，方便以后管理）。 
当网页显示添加成功后，就已经完成了全部的操作。
下面进行一些测试，同样是打开 Git Bash 或 cmder，输入： 
`ssh ‐T git@github.com
`
 bash 或 cmder 中会显示如下字样：
`The authenticity of host 'github.com (207.97.227.239)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)?  
`  

输入 yes 之后，计算机会自动将 github.com 列入已知的 host，然后会出现如下提示：   

`Hi username! You've successfully authenticated, but GitHub does not
provide shell access.    
`  

如果成功看见，说明你已经配置好了。 
如果出现任何错误提示，请仔细检查自己的操作。  

*另外* 由于 ssh 配置文件的不匹配，导致的 Permission denied (publickey)及其解决方法：一定要保持新生成的密匙文件的名字同 “ssh_config” 中 “IdentityFile” 字段的值一致即可，其中`ssh_config`文件在`{Git的安装路径}\etc\ssh\ssh_config`路径。
例如：  
```
Host github.com
	User git
	StrictHostKeyChecking no
	IdentityFile ~/.ssh/{你的rsa私钥的名称}
	IdentitiesOnly yes
```
