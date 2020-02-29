---
title: 'Debian 上搭建 Caddy Server'
slug: 'caddy-server'
date: 2016-11-13 20:04:50 +0800
tags: [Web]
---

昨天在自己的 VPS (运行 Debian8 64bits)上，使用 [Caddy](https://caddyserver.com/)  作为 Web 服务器。现将配置流程记录一下。  

<!-- more -->

## 安装 Caddy  

Caddy ——『 The HTTP/2 web server with automatic HTTPS 』，使用 GO 编写。  

![caddy-server](https://raw.githubusercontent.com/vitzy/imue/master/imgs/caddy-server.png)  
在本地下载 Caddy ，目录大致如下：  
```
.
|-- caddy
|-- init
|   |-- README.md
|   |-- freebsd
|   |   `-- caddy
|   |-- linux-systemd
|   |   |-- README.md
|   |   `-- caddy.service
|   |-- linux-sysvinit
|   |   |-- README.md
|   |   `-- caddy
|   `-- linux-upstart
|       |-- README.md
|       `-- caddy.conf
```
然后用`scp`命令或者用 [WinScp](https://winscp.net) (一个利用 `SFTP` 协议并且基于 `Putty`的 Windows 上的图形化软件)来上传。  
给 `caddy` 赋予可执行权限后，再复制到`/usr/local/bin`：     

```
chmod +x caddy 
mv caddy /usr/local/bin/
```
## 配置 Caddy  

Caddy 的配置文件为`Caddyfile`(在此之前需要配置好网站`example.com`(你的域名)的权威 DNS 的 A 记录或者 AAAA 记录)：  
```
example.com {
  gzip
  root /var/www/html/
}
```
配置完成后，运行：
```
/usr/local/bin/caddy --conf=/etc/caddy/Caddyfile
```
这样 Web 服务器就运行其来了。接下来后介绍配置`Systemd`运行 Caddy。     
如果没有注册过 SSL 证书，此时会要你输入的邮箱下载[ Let’s encrypt](https://letsencrypt.org) 的证书了，此时要保证域名的 DNS 已经配置好了。

## 配置 Systemd  

使用`Systemd`注册`caddy`为一个服务，开机自动运行。
如上文我们所看到的那样，`caddy`的下载压缩文件中包含一个`init`文件夹，其中包含`systemd`，`upstart`，`sysvinit`等各种的启动脚本。  

`Systemd` 配置文件`caddy.service`：  
```
[Unit]
Description=Caddy HTTP/2 web server
After=syslog.target
After=network.target

[Service]
User=root
Group=root
LimitNOFILE=64000
ExecStart=/usr/local/bin/caddy --conf=/path/to/Caddyfile
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
配置文件写好后，运行：  
```shell
cd init/linux-systemd/
cp caddy.service /etc/systemd/system/
systemctl start caddy  #启动
```

还可查看启动状态：
```shell
systemctl status caddy #查看启动状态
```

## 如何安装插件  

对于如何安装插件，可参考  
[无闻的博客](https://wuwen.org/2015/11/13/caddy-in-action.html)    
[Caddy Doc](https://caddyserver.com/docs/faq)  