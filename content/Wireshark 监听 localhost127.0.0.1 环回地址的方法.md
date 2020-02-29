---
title: 'Wireshark 监听 localhost/127.0.0.1 环回地址的方法'
slug: 'wireshark-npcap'
date: 2016-12-04 14:14:50 +0800
tags: [Network]
---

由于 Windows 系统没有提供本地环回网络的接口，所以用 [Wireshark](https://www.wireshark.org) 只能看到经过网卡的数据流量，看不到访问 localhost/127.0.0.1 的流量。
现有四种解决方案：  

<!-- more -->

一、 操作本机网络路由表(不推荐)  

1. 以管理员权限运行终端(或 cmd)；
2. `route add 本机ip mask 255.255.255.255 网关ip`

eg.  `route add 172.29.163.161 mask 255.255.255.255 172.29.163.1`

注：使用完后再用`route delete 172.29.163.161 mask 255.255.255.255 172.29.163.1`删除这条记录，否则的话所有本机的报文都要经过网卡。  

**背后的原理**：这样做是将发往本机的包发到网关，此时 Wireshark 就可以捕获到网卡驱动的报文。但是，如果本地请求的 URL 的 ip 只能写成本地的 ip 地址，不能写成 localhost 或 127.0.0.1，否则还是抓不到环回包。



二、添加 Microsoft Loopback Adapter(不推荐)  

之所以我不推荐的原因是，因为我也没折腾过。



三、使用 RawCap   

需要管理员权限运行 [RawCap](http://www.netresec.com/?page=RawCap)  。

进入终端(cmd),然后运行：  

```
RawCap.exe 127.0.0.1 dumpfile.pcap 
或
RawCap.exe 本地IP dumpfile.pcap
```

抓好包后，按 `Ctrl+C`，停止抓包。此时会在 RawCap 的同级目录下生成一个`dumpfile.pcap`文件。用 Wireshark 打开，就可以看到本地环回的数据包了。  



四、使用 Npcap

 [Npcap](https://github.com/nmap/npcap/releases) 是对当前最流行的 WinPcap 工具包进行改进的一个项目。

**安装前请先卸载 WinPcap**(可以在Wireshark 的`Help`一栏查看是否在使用 Npcap)  。

安装时要勾选

`Use DLT_NULL protocol sa Loopback ... `和 

`install npcap in winpcap api-compat mode`(选这个，是要兼容 WinPcap)

![npcap-0.78-r2](https://raw.githubusercontent.com/vitzy/imue/master/imgs/npcap-0.78-r2.png)



安装完成启动 Wireshark, 可以看到在网络接口列表中，多了一项 `Npcap Loopback adapter`，这个就是来抓本地环回包的网络接口。

![wireshark-npcap 捕获界面](https://raw.githubusercontent.com/vitzy/imue/master/imgs/wireshark-npcap.png)



**参考资料**

[替代 WinPcap 的新型 Windows 网络数据包截获软件——NPcap](http://blog.csdn.net/hsluoyc/article/details/46483151)

[CaptureSetup/Loopback](https://wiki.wireshark.org/CaptureSetup/Loopback)

