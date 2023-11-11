---
title: '我的 Linux Mint 『配置』清单'
slug: 'my-linux-mint-configuration'
date: 2017-06-20 14:37:52 +0800
tags: [Linux]
---

## 前言

在使用自己的系统 (Linux Mint) 时，不由地担心万一哪天坏掉，要重装系统，这么多配置好的环境怎么恢复呀，因此整理出一篇博文记录一下自己平时常用软件以及开发环境配置，以备不时之需。另外，Linux Mint 非常适合Windows 用户过渡到 Linux。Linux Mint 虽然第一眼看到界面不怎么“美”，可越用感觉越好用。

下面从 Linux Mint 18.2 安装开始说起：

<!-- more -->

**tl,dr**

## 安装

现在的 GNU/Linux 除了纯的 Arch Linux 外，安装都很简单。所以如何安装此处略过。

![首次安装后的桌面](https://raw.githubusercontent.com/vitzy/imue/master/imgs/desktop-1.png)

接下来要特别强调一下安装完系统后该干的事。

## 基本配置

更换镜像源(选择你的网络环境下最快的)，安装无线网卡，显卡等驱动，安装视频解码器(P.S. 会安装 VLC)，

![安装多媒体解码器](https://raw.githubusercontent.com/vitzy/imue/master/imgs/mutil-codecs.png)


再安装输入法框架，比如 fcitx, ibus 等(可以命令行安装，也可以在系统设置 -> 输入法 安装)，添加简体繁体中文支持(因为我安装的是英文系统)。如图：

![语言设置](https://raw.githubusercontent.com/vitzy/imue/master/imgs/setting-language.png)

安装中文输入法，比如[搜狗输入法](http://pinyin.sogou.com/linux/?r=pinyin)，[Rime](http://rime.im/download/) ，然后如下设置(再次说明，我装的是英文系统，不是中文，如果是中文就无需做此设置)。

![打开 Fctix 设置](https://raw.githubusercontent.com/vitzy/imue/master/imgs/input-method-1.png)



![添加 Sogou、Rime 输入法](https://raw.githubusercontent.com/vitzy/imue/master/imgs/input-method-2.png)

## 美化

任务栏优化，在系统设置里添加热区。

安装「任务栏图标自动折叠」applet ——“[Drawer (show/hide applets)](https://cinnamon-spices.linuxmint.com/applets/view/169#)”，可以手动安装，安装解压在 `~/.cinnamon/configs` 后添加即可。也可在系统设置的 Applets 在线安装，像下图一样：

![显示/隐藏 applets](https://raw.githubusercontent.com/vitzy/imue/master/imgs/show-hide-applets.png)


在任务栏添加后效果如下：

![任务栏图标自动隐藏](https://raw.githubusercontent.com/vitzy/imue/master/imgs/desktop-2.png)


安装主题 [Numix](https://numixproject.org) 的图标集，执行：

```
sudo add-apt-repository ppa:numix/ppa
sudo apt-get update
sudo apt-get install numix-icon-theme-circle
```

如果还想使用Numix 的壁纸，执行：

`sudo apt-get install numix-wallpaper-*`

字体(P.S. Linux 下太缺少字体了)：

下面是我整理出的一些字体，仅供参考：

| No.  | Fonts for Linux (most only personal usage) |
| ---- | ---------------------------------------- |
| 1    | **[方正字体](http://shop.foundertype.com/index.php/FindFont/index.html)**     包括四种免费字体：方正黑体、方正书宋、方正仿宋、方正楷体。 |
| 2    | **王汉宗自由字形**     由中原大學數學系王漢宗教授所研發、捐贈，採用GPL授權，免費使用。各位老師及網友，可以推廣使用。 |
| 3    | **[文鼎公众授权字体](http://www.arphic.com.tw/zh-tw/support/index)** |
| 4    | **[思源黑体](https://github.com/adobe-fonts/source-han-sans)**     思源黑体（英语：Source Han Sans）是Adobe与Google所领导开发的开源字体家族，1.001及更早版本以Apache 2.0许可证授权，而1.002及更新版本则使用SIL开源字体授权，属于无衬线黑体。思源黑体于2014年7月16日首次发布，支持繁体中文、简体中文、日文及韩文，并且各有7种字体粗细。公开之时为当时涵盖字元数量最多的字体，44,666个字元分属于65,535个字形中，此为OpenType字体技术的极限。 |
| 5    | **文泉驿字体**     文泉驿是一个开源汉字字体项目，由旅美学者房骞骞（FangQ）于2004年10月创建，集中力量解决GNU/Linux高质量中文字体匮乏的状况。目前，文泉驿已经开发并发布了第一个完整覆盖GB18030汉字（包含27000多个汉字）的多规格点阵汉字字库，第一个覆盖GBK字符集的开源矢量字库（文泉驿正黑），并提供了目前包含字符数目最多的开源字体——GNU Unifont——中绝大多数中日韩文相关的符号。这些字库已经逐渐成为主流Linux/Unix发行版中文桌面的首选中文字体。目前Ubuntu、Fedora、Slackware、Magic Linux、CDLinux使用文泉驿作为默认中文字体，Debian、Gentoo、Mandriva、ArchLinux、Frugalware则提供了官方源支持，而FreeBSD则在其ports中有提供。文泉驿的网站（除了论坛）采用Wiki搭建。 |
| 6    | **[濑户字体](https://www.justfont.com/fonts)**     字体为濑户制作的免费字体，字体包含中文繁体常用字及多国语言。 |
| 7    | **[书体坊免费字体](http://fonts.mobanwang.com/shutifang/)**    专注于古今书法名家计算机字体开发的书体坊提供的免费字体。 |
| 8    | **[站酷高端黑](http://www.zcool.com.cn/special/gaoduanhei/)**     “汉字百人舞”计划，由字体设计师胡晓波、刘兵克发起，在站酷网征集100位字体设计师共同完成一套字库创作，供所有人永久免费下载。 |
| 9    | **[造字工房](http://makefont.com/fonts.html)**   有个人免费授权使用。 |
| 10   | **[Free-Chinese-Fonts](http://zenozeng.github.io/Free-Chinese-Fonts/)** |
| 11   | **[新蒂字体](http://www.sentyfont.com/)**    |
| 12   | **[mononoki](https://github.com/madmalik/mononoki)**    a programming typeface. |
| 13   | **[source code pro](https://github.com/adobe-fonts/source-code-pro)**     Monospaced font family for user interface and coding environments. |
| 14   | **[编程等宽字体](http://blog.jobbole.com/42556/)** |

(P.S. 如果是和 Windows 的双系统，当然可以把 Windows 里的字体拷贝到 Linux 里呀。)  

这里贴一下我的系统字体配置方案：  

![系统字体设置](https://raw.githubusercontent.com/vitzy/imue/master/imgs/linuxmint-system-font-setting.png)

另外，对于 Chrome 浏览器字体发虚的问题，只要在`chrome://settings/fonts`里设置 `xxx CJK`字体就行了(等宽字体 monospace 默认就好，这里的 CJK 是指中日韩三国字体)。  

## 软件

(注：此处的软件是指非系统自带的软件)

Daily：

- Chrome 浏览器；

- [GitKraken](https://www.gitkraken.com/)  ，需要先安装 libcurl3 的依赖；

- [Typora](https://typora.io/) ；

- [shadowsocks-qt](https://github.com/shadowsocks/shadowsocks-qt5) ；

- [WPS Office 2016 for Linux](http://wps-community.org/downloads) (基本和MS Office 2007 差不多了)；

  安装后`Some formula symbols might not be displayed correctly due to missing `字体问题解决方案：

  - http://community.wps.cn/wiki/No_necessary_symbol_fonts
  - https://github.com/so-zengtao/nginx-wps-community/tree/master/root/download/fonts

- [telegram](https://telegram.org/)   亦可以用第三方 [PPA 源](https://launchpad.net/~atareao/+archive/ubuntu/telegram)安装：

```
sudo add-apt-repository ppa:atareao/telegram
sudo apt-get update
sudo apt-get install telegram
```

-  openvpn 客户端(CLI) `sudo apt-get install openvpn`（已经自带无需安装），再安装图形化的客户端 gopenvpn，虽然 [PPA 源](https://launchpad.net/~gopenvpn/+archive/ubuntu/gopenvpn)有，但是它不适合用 PPA 源来安装。我们可以直接从 [launchpad net](https://launchpad.net/~gopenvpn/+archive/ubuntu/gopenvpn/+sourcepub/1701862/+listing-archive-extra) 直接下载 deb 来安装，然后在`/etc/openvpn`目录下添加 xxx.ovpn 格式的配置文件。
-  Ubuntu Cleaner  为 Ubuntu/LinuxMint 释放空间，PPA 源安装：

```
sudo add-apt-repository ppa:gerardpuig/ppa
sudo apt update
sudo apt install ubuntu-cleaner
```

- [Stacer](https://github.com/oguzhaninan/Stacer)  Linux System Optimizer and Monitoring  

- [f.lux GUI](https://launchpad.net/~nathan-renniewaldock/+archive/ubuntu/flux)     PPA 源安装：

```
sudo add-apt-repository ppa:nathan-renniewaldock/flux
sudo apt-get update
sudo apt-get install fluxgui
```

- [uget](http://ugetdm.com) 下载器以及安装 aria2 插件；
- [Persepolis](https://persepolisdm.github.io)  a Download Manager & a GUI For aria2；
- [网易云音乐](http://music.163.com/) ；
- [Spotify](https://www.spotify.com/jp/download/linux/)  ；
- [FileZilla](https://filezilla-project.org/) 并配置 menu 菜单-> 站点管理菜单；
- [FF-Multi-Converter](https://github.com/Ilias95/FF-Multi-Converter)  [PPA 源](https://launchpad.net/~cteehayder/+archive/ubuntu/ffmulticonverter)；
- [octave](https://www.gnu.org/software/octave)  类似于 Matlab
- [Dukto](https://software.opensuse.org/download.html?project=home:colomboem&package=dukto)  命令行安装：

```
sudo sh -c "echo 'deb http://download.opensuse.org/repositories/home:/colomboem/xUbuntu_16.04/ /' > /etc/apt/sources.list.d/dukto.list"
sudo apt-get update
sudo apt-get install dukto
```
- 播客：   

 1.gpodder [PPA 源](https://launchpad.net/~thp/+archive/ubuntu/gpodder)安装：

```
sudo add-apt-repository ppa:thp/gpodder
sudo apt-get update
sudo apt-get install gpodder
```
 2.[vocal](http://vocalproject.net) (很难在非 elementary OS 上安装，但是界面很漂亮) :

  可以下载我重新打包的 [vocal_2.0.20-2_amd64.deb](https://github.com/needle-and-thread/vocal/files/1550662/vocal_2.0.20-2_amd64.deb.zip)  

 3.[cumulonimbus](https://github.com/z-------------/cumulonimbus)：

   Electron 技术开发，安装包体积较大。

-  [albert](https://github.com/albertlauncher/albert)  [PPA 源](https://launchpad.net/~nilarimogard/+archive/ubuntu/webupd8)安装：

```
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt-get update
sudo apt-get install albert
```

- Grub Customizer 是个能修改 GRUB 的工具  [PPA 源](https://launchpad.net/~danielrichter2007/+archive/ubuntu/grub-customizer/+packages)安装：


```
sudo add-apt-repository ppa:danielrichter2007/grub-customizer
sudo apt-get update
sudo apt-get install grub-customizer
```

- 编译安装 [putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/)  (依赖 GTK 库 libgtk-3-dev)  
- 安装 [sublime](https://www.sublimetext.com) 并解决 fctix 中文无法输入的问题，参考[这儿](https://blog.waydrow.com/2015/12/07/ubuntu%E4%B8%8Bsublime-text3%E6%97%A0%E6%B3%95%E8%BE%93%E5%85%A5%E4%B8%AD%E6%96%87%E7%9A%84%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95/)
- 安装 wireshark     [PPA 源](https://launchpad.net/~wireshark-dev/+archive/ubuntu/stable)安装：


```
sudo add-apt-repository ppa:wireshark-dev/stable
sudo apt-get update
sudo apt-get install wireshark
```
出现
```
sudo wireshark
报错信息为：
Lua: Error during loading:
[string "/usr/share/wireshark/init.lua"]:45:dofile has been disabled
```

的解决办法：

```
方法一：
编辑init.lua文件的倒数第二行：(使用命令：sudo vim /etc/wireshark/init.lua)；改为：--dofile(DATA_DIR.."console.lua")
重启wireshark即可。但是这样无法使用 Lua 脚本。

方法二(更好的解决方案)：
改变/usr/share/dumpcap的group，添加一个group：wireshark，将 dumpcap 这个文件 chgrp 到 wireshark 组，再改成 4755 权限，这样方便权限控制，具体步骤如下：

1、添加用户组，我以wireshark为例
sudo groupadd wireshark

2、将dumpcap更改为wireshark用户组
sudo chgrp wireshark /usr/bin/dumpcap

3、让wireshark用户组有root权限使用dumpcap
sudo chmod 4755 /usr/bin/dumpcap

4、将自己加入wireshark用户组，我的用户是yang，你添加需要更改这个。
sudo gpasswd -a yang wireshark

这样就完成，你可以使用自己的用户打开Wireshark，并且有权限进行操作了。
注：如果 Wireshark 更新了，需要重新执行上面的 2，3 两步。
```

-  [VirtualBox](https://www.virtualbox.org/wiki/Linux_Downloads) ；
-  安装 [texlive](https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/Images/) 相关教程：
  - http://www.linuxidc.com/Linux/2016-08/133913.htm
  - http://blog.csdn.net/qq_33429968/article/details/62928742
  - http://seisman.info/install-texlive-under-linux.html
  - https://tieba.baidu.com/p/5164988580
  - http://www.bagualu.net/wordpress/archives/6523
  - http://www.peijun.me/latex-configurtion.html

-  [texstudio](http://texstudio.sourceforge.net/)   (如果是 KDE 桌面环境，建议使用 [Kile](https://code.launchpad.net/~kile/+archive/ubuntu/2.1-daily/+build/8788610) )；
-  [Master PDF Editor](https://code-industry.net/free-pdf-editor/#get)  (P.S. 居然是 QT 的静态编译)

***



Development：

- [Git](https://git-scm.com/)    `sudo apt-get install git` ；
- [jdk](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) ；
- [Nodejs](https://nodejs.org/) ；
- [Golang](https://golang.org/) ；
- codeblocks    [PPA 源](https://launchpad.net/~damien-moore/+archive/ubuntu/codeblocks-stable)安装:


```
sudo add-apt-repository ppa:damien-moore/codeblocks-stable
sudo apt-get update
sudo apt-get install codeblocks codeblocks-contrib
```


- [JetBrains](https://www.jetbrains.com/products.html) 系列：

  - Clion
  - idea-IU
  - Webstorm
- Android Studio
- [Qt](http://download.qt.io/)
- 系统环境变量设置：


  修改`/etc/profile`文件为：

  ```
  # /etc/profile: system-wide .profile file for the Bourne shell (sh(1))
  # and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).

  if [ "$PS1" ]; then
    if [ "$BASH" ] && [ "$BASH" != "/bin/sh" ]; then
      # The file bash.bashrc already sets the default PS1.
      # PS1='\h:\w\$ '
      if [ -f /etc/bash.bashrc ]; then
        . /etc/bash.bashrc
      fi
    else
      if [ "`id -u`" -eq 0 ]; then
        PS1='# '
      else
        PS1='$ '
      fi
    fi
  fi

  if [ -d /etc/profile.d ]; then
    for i in /etc/profile.d/*.sh; do
      if [ -r $i ]; then
        . $i
      fi
    done
    unset i
  fi

  # Java Development Enviroment
  export JAVA_HOME=/opt/jdk
  export PATH=$JAVA_HOME/bin:$PATH
  export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

  # Nodejs Development Enviroment
  export NODE_HOME=/opt/node
  export PATH=$PATH:$NODE_HOME/bin
  export NODE_PATH=$NODE_HOME/lib/node_modules

  # Android Development Enviroment
  export ANDROID_HOME=/opt/android/sdk
  export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
  export ANDROID_NDK_HOME=/opt/android/ndk
  export PATH=$ANDROID_NDK_HOME:$PATH 

  #GO Development Enviroment
  #GOPATH 是 Golang 的开发目录
  #GOROOT 为 Golang 的安装目录
  export GOPATH="/home/yang/projects/Go_workspace"
  export GOROOT="/opt/go"
  export PATH=$GOROOT/bin:$PATH
  ```

  ​

***

浏览器插件：

- Chrome 插件：
  - [Awesome Autocomplete for GitHub](https://chrome.google.com/webstore/detail/awesome-autocomplete-for/djkfdjpoelphhdclfjhnffmnlnoknfnd)
  - [cVim](https://chrome.google.com/webstore/detail/cvim/ihlenndgcmojhcghmfjfneahoeklbjjh)
  - [Intelli-Octo](https://chrome.google.com/webstore/detail/intelli-octo/hbkpjkfdheainjkkebeoofkpgddnnbpk)
  - [IP Whois & Flags Chrome & Websites Rating](https://chrome.google.com/webstore/detail/ip-whois-flags-chrome-web/kmdfbacgombndnllogoijhnggalgmkon)
  - [Local CDN](https://chrome.google.com/webstore/detail/local-cdn/dgfedofdiaapcideaajjaklpmdpcdapg)
  - [Octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)
  - [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)
  - [Save to Pocket](https://chrome.google.com/webstore/detail/save-to-pocket/niloccemoadcdkdjlinkgdfekeahmflj)
  - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  - [二管家:拓展管理，更新通知，自动管理拓展](https://chrome.google.com/webstore/detail/nooboss-extensions-manage/aajodjghehmlpahhboidcpfjcncmcklf)
  - [优酷HTML5播放器](https://chrome.google.com/webstore/detail/youku-html5-player/fpnknfakcmgkbhccgpgnbaddggjligol)
  - [广告终结者](https://chrome.google.com/webstore/detail/广告终结者/fpdnjdlbdmifoocedhkighhlbchbiikl)
  - [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)



- FireFox 插件：
  - [Hide Caption Titlebar Plus](https://addons.mozilla.org/en-US/firefox/addon/hide-caption-titlebar-plus-sma/) (FireFox 57+ 暂不可用)
  - [优酷HTML5播放器](https://addons.mozilla.org/zh-CN/firefox/addon/youku-html5-player/)
  - [FoxyProxy Standard](https://addons.mozilla.org/zh-CN/firefox/addon/foxyproxy-standard/) (检测「科学上网」可用性前清除浏览器缓存)
  - [Proxy SwitchyOmega](https://addons.mozilla.org/zh-CN/firefox/addon/switchyomega) 
  - [Octotree](https://addons.mozilla.org/zh-CN/firefox/addon/octotree/)
  - [Tampermonkey](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
  - [uBlock Origin](https://addons.mozilla.org/zh-CN/firefox/addon/ublock-origin/)

**注**：Chrome 书签、Firefox 书签登陆自己账号，多平台同步。(当然，也可以浏览器设置，插件多平台同步)



## 一些小技巧

1.为鼠标右键添加新建 Word 文档，新建 Excel 文档，新建 Power Point 文档：

把一个空白的文档放在“模板”文件夹(/home/<your-user-name>/模板 或者 ~/模板，英文为 Templates 。如果没有此文件夹，则新建一个。)中，即刻生效，使用鼠标右键，马上就有了新建 Word 文档等这几个条目了。效果如图：

![tips-office-templates](https://raw.githubusercontent.com/vitzy/imue/master/imgs/tips-office-templates.png)

2.修复蓝牙蓝牙不可用问题（芯片组 BCM43142）
   直接参考[这篇文章](https://memo.ink/fix-ubuntu-bluetooth-bcm/) 或者 [broadcom-bt-firmware](https://github.com/winterheart/broadcom-bt-firmware)。


## 包搜索

可从以下的网站搜索一些 .deb 和 .rpm 包：

- https://pkgs.org
- https://www.rpmfind.net
- https://packages.ubuntu.com/search?keywords=search


## 注意事项 

不要轻易去动 menu 菜单编辑；
不要轻易再安装或升级内核(因为动态内核模块 (DKMS) 等组件停留在原先的版本上，因此可能会产生不兼容的问题)。

[Ubuntu 16.04 HWE内核安装Xtables-addons](https://www.kaijia.me/2017/05/ubuntu-16-04-hwe-kernel-install-xtables-addons/)



## 补充

这里补充的仅是一些比较感兴趣的软件，本人并未安装：

- [Best Free and Open Source Alternatives to Adobe Products for Linux](https://itsfoss.com/adobe-alternatives-linux/)  
  (Adobe 系列开源替代品)   


## 总结

目前，就这么多吧，随时间的推移会间断地修改一些。