---
title: '谈谈 RIME'
slug: 'rime'
date: 2016-11-01 16:40:00 +0800
tags: [input-method]
---

『聰明的輸入法懂我心意』，正如 [RIME](http://rime.im/) 官网所说得那样。Windows 平台下叫『小狼毫』(英文名:Weasel) ,Linux 平台下叫『中州韻』(英文名:Rime)，MAC 平台叫『鼠鬚管』(英文名:Squirrel)，当然也有 Android 版的，叫『同文』。我个人觉得是输入法中做得非常独特的一个，做得非常好，用着非常舒服。  

<!-- more -->

下面我先来说说 Linux 下的安装：  

首先我 Linux 上的输入法框架是`fctix`,所以我安装`fctix-rime`。(注意，最好不要在 Linux 上安装多个输入法框架)只需一条命令(debian 系列及其衍生版)就可以了：  

```
sudo apt install fcitx-rime
```
然后注销重新登录就可以尽情使用了。  `fcitx-rime`的更多内容，可参阅 [fcitx-rime](https://github.com/fcitx/fcitx-rime)。  
对于是 ibus 框架的，请参考这里[RimeWithIBus](https://github.com/rime/home/wiki/RimeWithIBus)。  

再提一下 Windows 下的安装：  

如果是 Windows7 及以下，则直接可以在官网下载使用。若是 Windows8及以上，包括 Windows10，很不幸，其兼容性不好，卡 modern 界面。但是有解决方案，目前其中一种解决方案是 [PRIME](https://github.com/osfans/PRIME) ,这其中还带来了 emoji 输入。  但切换输入法时很卡，使用时也稍有卡顿。

![PRIME](https://cdn.rawgit.com/qanno/qanno.github.io/master/images/prime.png)  

另外一种就是 改进版 的 Rime，目前可在官方的 appveyor 持续集成中的 [artifacts](https://ci.appveyor.com/project/rime/weasel/build/artifacts) 下载。


至于如何去配置，我简单说几个重要的地方，然后就去看 [Wiki](https://github.com/rime/home/wiki/UserGuide) 好了。

- 修改配置时，不建议直接修改`default.yaml`或是`weasel.yaml` ，这两文件路径在 rime 安装路径的 `data` 目录下。这样的坏处是如果更新输入法，先前的改动可能会被覆盖而失效。
- 修改保存之后要重新部署。操作步骤：在 Windows开始菜单中，找到`小狼毫輸入法`这个目录，进去之后点击`【小狼毫】重新部署`即可。
- 添加自定义设置时，改`C:\Users\XXX\AppData\Roaming\Rime\default.custom.yaml`. 和`C:\Users\XXX\AppData\Roaming\Rime\weasel.custom.yaml`内容即可，不要忘了再**重新部署**。
- 提供`default.custom.yaml`和`weasel.custom.yaml` 样例：  

default.custom.yaml:   
```yaml
customization:
  distribution_code_name: Weasel
  distribution_version: 0.9.30
  generator: "Rime::SwitcherSettings"
  modified_time: "Tue Feb 27 18:56:22 2018"
  rime_version: 1.2.10
patch:
  schema_list:
    - {schema: luna_pinyin}
    - {schema: cangjie5}
    - {schema: luna_pinyin_fluency}
    - {schema: luna_pinyin_simp}
    - {schema: luna_pinyin_tw}
    - {schema: bopomofo}
    - {schema: bopomofo_tw}
    - {schema: luna_quanpin}
    
  menu/page_size: 7
```  
weasel.custom.yaml:  
```yaml
customization:
  distribution_code_name: Weasel
  distribution_version: 0.9.30
  generator: "Weasel::UIStyleSettings"
  modified_time: "Tue Feb 27 20:42:22 2018"
  rime_version: 1.2.10
patch:
  "style/color_scheme": rimeblue
  "style/inline_preedit": true
  "style/layout/border_width": 0
```
- 提供一个配色方案：
#### rimeblue
```yaml
rimeblue:
  name: "RimeBlue"
  horizontal: false                           # 候选条横向显示
  inline_preedit: true                        # 启用内嵌编码模式，候选条首行不显示拼音
  candidate_format: "%c.\u2005%@\u2005"       # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间。
  corner_radius: 10                            # 候选条圆角半径
  border_height: 0                            # 窗口边界高度，大于圆角半径才生效
  border_width: 12                            # 窗口边界宽度，大于圆角半径才生效
  back_color: 0x4F4F4F                        # 候选条背景色
  line_spacing: 0                             # 候选词的行间距
  # spacing: 3                                  # 在非内嵌编码模式下，预编辑和候选词之间的间距
  border_color: 0xE0B693                      # 边框色
  font_face: "PingFangSC-Regular"             # 候选词字体
  font_point: 20                              # 预选栏文字字号
  label_font_face: "PingFangSC-Regular"       # 候选词编号字体
  label_font_point: 20                        # 预选栏编号字号
  text_color: 0xFFFFFF                        # HEX颜色代码，但是要注意顺序是蓝绿红（倒序）0xBBGGRR
  candidate_text_color: 0xFFFFFF              #非第一候选项
  hilited_candidate_back_color: 0xD1BA53      #第一候选项背景
  hilited_candidate_text_color: 0xFFFFFF      #第一候选项
```
  来源：https://www.v2ex.com/t/413553
  效果如图：
  ![rimeblue](https://raw.githubusercontent.com/vitzy/imue/master/imgs/color_scheme_rimeblue.png)
- 在线 Rime 配色方案编辑 [RIME See Me](https://rime.netlify.com) 。

阅读材料：[Windows 输入法的 metro 应用兼容性改造](https://hcyue.me/2018/01/13/Windows%20%E8%BE%93%E5%85%A5%E6%B3%95%E7%9A%84%20metro%20%E5%BA%94%E7%94%A8%E5%85%BC%E5%AE%B9%E6%80%A7%E6%94%B9%E9%80%A0/#more) 