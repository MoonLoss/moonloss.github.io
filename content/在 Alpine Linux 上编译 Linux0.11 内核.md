---
title: '在 Alpine Linux 上编译 Linux0.11 内核'
slug: 'compile-linux-kernal'
date: 2016-10-10 10:48:19 +0800
tags: [Linux]
---

  近日，想在 Windows 系统下编译 Linux-0.11 内核。 于是就在 VirtualBox 中安装了 [Alpine Linux](http://alpinelinux.org/) 3.4 。  

<!-- more -->
  
  其中 VirtualBox 下的网络配置(双网卡)如下：  
使用2块网卡，第一块设置为`host-only`方式：  
![vbox-network-1](https://raw.githubusercontent.com/vitzy/imue/master/imgs/vbox-network-1.png)  
  第二块设置为`nat`方式：
![vbox-network-2](https://raw.githubusercontent.com/vitzy/imue/master/imgs/vbox-network-2.png)  
  其中，VirtualBox Host-Only Ethernet Adapter 的配置如下：  
![vbox-hostonly](https://raw.githubusercontent.com/vitzy/imue/master/imgs/vbox-hostonly.png)   

![vbox-hostonly-ipv4](https://raw.githubusercontent.com/vitzy/imue/master/imgs/vbox-hostonly-ipv4.png)  
  其中, DNS 服务器地址设置和本地上网的设置相同。   IP 地址是自动生成，也可手动修改。这里我使用的是阿里的公共 DNS 。  
  然后登陆 Alpine Linux ，查看 MAC 地址是否和在 VirtualBox 中网络设置中的 MAC 地址一样。
![alpine-network](https://raw.githubusercontent.com/vitzy/imue/master/imgs/alpine-network.png)  
  这样主机和虚拟机就可以互 ping ，主机还可通过   ssh 连接虚拟机。例如：`ssh root@192.168.56.101`   (ps. 我用的是 [cmder](http://cmder.net/) 上的 ssh 工具)。  

>* 推荐1： 在 Windows 上可以用 [SSH Secure Shell Client](http://www.wm.edu/offices/it/services/software/licensedsoftware/webeditingsftp/sshsecureshell/index.php) 这个工具替代`scp`命令在主机和虚拟机之间传输文件。  
>   ![SSHSecureShellClient](https://raw.githubusercontent.com/vitzy/imue/master/imgs/SSHSecureShellClient.png)   
>* 推荐2： 在 Windows 上还可以用 [WinScp](https://winscp.net/eng/docs/lang:chs) 这个工具在主机和虚拟机之间传输文件。  


  到这儿，都是些准备工作，接下来才是本文要说的东西。  
由于 linux 0.11 (原版)内核编译需要 gcc3.4.6  ,而这个 gcc 版本太老了。于是就出现了 linux 0.11-gcc4 这个版本(网上可以搜到),可以用 gcc4.x 去编译。在我的 Linux Mint 18 上，修改了几个错误之后，用自带的 gcc5.4.0 编译成功了（此处为我修改的[源码](https://raw.githubusercontent.com/qanno/qanno.github.io/master/downloads/linux-gcc5.4.0.zip)，如果还有错误编译不通过，请参考[这篇文章](http://www.voidcn.com/blog/hjq842382134/article/p-5955492.html)），我不甘心，我想用更高的 gcc 版本去完成这件事。在 Gihub 上 search   了一番，发现了这个：[Linux-0.11](https://github.com/yuanxinyu/Linux-0.11)，这个修改版我终于在 Alpine Linux 上编译成功了（如果遇到： "make: execvp: /tools/build.sh Permission denied ." 请修改build.sh的权限。）。
  最后，用 [bochs](http://bochs.sourceforge.net) 模拟启动成功了。  
  ![bochs-linux0.11](https://raw.githubusercontent.com/vitzy/imue/master/imgs/bochs-linux0.11.png)
其中 bochs 的 bxrc 文件：  
```
#BIOS映像文件和VGA BIOS映像文件
#XXX为Bochs的安装盘
romimage: file=XXX:\Bochs-2.6.8\BIOS-bochs-latest
#运行内存
megs: 64
vgaromimage: file=XXX:\Bochs-2.6.8\VGABIOS-lgpl-latest
#这个是启动软盘
floppya: 1_44=C:\Users\xxxx\Desktop\Image,status=inserted
ata0-master: type=disk, path="C:\Users\xxxx\Desktop\linux_0_11-master\hdc-0.11.img", mode=flat, cylinders=204, heads=16, spt=38
#确定启动方式
boot: c
log: C:\Users\xxxx\Desktop\bochsout.txt
cpu: count=1, ips=1000000
```
