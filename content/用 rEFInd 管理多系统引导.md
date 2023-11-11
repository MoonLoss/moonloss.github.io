---
title: '用 rEFInd 管理多系统引导'
slug: 'refind'
date: 2016-10-28 21:13:00 +0800
tags: [OS]
---

今年1月份就想写个关于如何用 [rEFInd](http://www.rodsbooks.com/refind/) 管理多系统引导，但是一直拖到现在。回到正题，rEFInd 相当于一个菜单，开机进入这个菜单，选择菜单上的某个系统进入就可以了。当然它的魅力不仅在于此，还在于如果此时你挂载一个 U 盘或者移动硬盘,里面装了你喜欢的操作系统，硬件识别之后 ，rEFInd 也会在菜单上显示出来。  

<!-- more -->

![图片来自于贴吧，非默认主题](https://raw.githubusercontent.com/vitzy/imue/master/imgs/refind-interface.jpg)  

对于默认主题，配置文件`refind.conf`文件可以这样写：  
```
#设置默认时间5s，时间到后进入默认操作系统。
#0表示一直等待选择
timeout 5

scan_driver_dirs EFI/refind/drivers_x64

scanfor manual,external,optical

default_selection Windows 10

menuentry "Windows 10" {
	icon \EFI\refind\icons\os_win10.png
    loader \EFI\Microsoft\Boot\bootmgfw.efi
}	

menuentry "Linux Mint"{
	icon /EFI/refind/icons/os_linuxmint.png
    loader /EFI/ubuntu/shimx64.efi
}
```
注：`shimx64.efi`这个引导文件是已经加过签名的，而`grubx64.efi`则没有。因此，使用`shimx64.efi`后是可以开启 BIOS 的`secure boot`的 。
**若开启了`secure boot`，还需在 BIOS 中加入 rEFInd 的证书，是这个两个文件`refind.cer`和`refind.crt` **。

Windows 用户可以使用 DiskGenius 和 [BOOTICE](http://www.ipauly.com/2015/11/15/bootice/) (可以修改多系统启动顺序，另外它还有其他主要功能) 这两个工具进行相关的设置。

Linux 用户可使用 efibootmgr 管理 efi 启动项(添加、删除、改变顺序): `sudo efibootmgr -o 0000,0002,0001,0003`

```
BootCurrent: 0001

Timeout: 2 seconds

BootOrder: 0000,0002,0001,0003

Boot0000* rEFInd

Boot0001* ubuntu

Boot0002* Windows Boot Manager

Boot0003* ubuntu
```

说明：

- 创建一个新的boot option 
  `efibootmgr -c`
- 修改boot 顺序 
  `efibootmgr -o X,Y,Z` 
- 启用/禁用boot option 
  `efibootmgr -a -b X`          启用标号为X的启动项 
  `efibootmgr -A -b X`          禁用标号为X的启动项