---
title: '让 Disqus「重获新生」'
slug: 'regain-disqus'
date: 2017-10-06 20:18:43 +0800
tags: [Web]
---

## 前言

由于 Disqus 大陆无法正常访问，所以很长一段时间我博客原生的 Disqus 评论框，只有大陆外和「掌握科学上网」技能的人，才能看见和评论。访客要留言，和我交流都得要「科学上网」吗？如果评论系统不能正常评论，那还要它干啥？后来，找到了比较好的解决之道。另外， 为什么大费周章地折腾 Disqus，而不去试试国内的类似服务呢？简单来说，还是 Disqus 可靠些，这不是崇洋媚外，事实如此。这里引用 [Jerry Qu](https://imququ.com) 的一段话：  

<!-- more -->

> 作为一个免费产品，如果不能找到可靠的盈利模式，什么时候停止服务就取决于老板的耐心和决心了。

## 实现方法

借「路」大陆外的服务器或支持 cURL 的虚拟空间(理论上，大陆内的网络大多无法直接访问 Disqus，虽然可以使用指定 IP，但访问 Disqus 的速度明显没有大陆外的主机快，所以最好是大陆外的主机)。[**disqus-php-api**](https://github.com/fooleap/disqus-php-api) 这个项目就是后端代码，项目作者选择了 PHP cURL，因为PHP 的虚拟空间好找呀。  

## 后端部署

[**disqus-php-api**](https://github.com/fooleap/disqus-php-api)  下`api`目录下的就是 PHP 后台代码。  

```
├─disqus-php-api
│      demo.html
│      gulpfile.js
│      index.js
│      package.json
│      update-thread.html
│      webpack.config.js
│
├─api
│  │  cacert.pem
│  │  config.php
│  │  count.php
│  │  createthread.php
│  │  getcomments.php
│  │  getgravatar.php
│  │  init.php
│  │  popular.php
│  │  postcomment.php
│  │  removecomment.php
│  │  sendemail.php
│  │  updatecomment.php
│  │  updatethread.php
│  │  upload.php
│  │
│  ├─emojione
│  │  │  autoload.php
│  │  │
│  │  └─src
│  │          Client.php
│  │          ClientInterface.php
│  │          Emojione.php
│  │          Ruleset.php
│  │          RulesetInterface.php
│  │
│  └─PHPMailer
│          class.phpmailer.php
│          class.smtp.php
│
├─dist
│      eac.min.json
│      iDisqus.min.css
│      iDisqus.min.js
│
└─src
       eac.json
       iDisqus.js
       iDisqus.scss
       jsonminify
```



按照`config.php`文件里的代码注释，将相关个人 Disqus  配置信息填好。然后就直接把整个`api`文件夹拷贝到自己的境外服务器或者 PHP 虚拟空间。至此，后端就部署好了。

**注**：如果使用的是虚拟 PHP 空间，此 PHP API 的 URL 可以使用虚拟空间提供的二级域名，也可以使用自己的域名，URL 的地址可以规范一下，比如：`//api.xxx.com/disqus/v1`。  

## 前端使用

前端需要 [**disqus-php-api**](https://github.com/fooleap/disqus-php-api) 下`dist`目录下的三个文件：`eac.min.json`(压缩的 emoji unicode 编码文件)，`iDisqus.min.css`，`iDisqus.min.js`。  

主要分三步：

- 引入 CSS, JS： 

```html
<link rel="stylesheet" href="path/to/iDisqus.min.css" />
```

```html
<script src="path/to/iDisqus.min.js"></script>
```

- 创建容器：

```html
<div id="comment"></div>
```

- 创建实例：

这里贴出我的大体配置，详细如何配置参看 [README](https://github.com/fooleap/disqus-php-api/blob/master/readme.md)。

```javascript
var disq = new iDisqus('comment', {
    forum: 'your_disqus_short_name',
    api: 'https://api.xxx.com/disqus/v1',
    site: 'https://your_website.com',
    mode: 3,
    timeout: 3000,
    init: true,
    toggle: 'comment-toggle',
    sort: 'newest',
    emoji_preview: true,
	badge: '博主'
 });
disq.popular();
disq.count();
```



对于切换评论框，具体用法是在网页中放置一个 Checkbox ：

```html
<div class="comment-toggle"> 
	<input type="checkbox" id="comment-toggle" class="comment-toggle-input" disabled> 
	<label class="comment-toggle-icon" for="comment-toggle"></label> 
	<label class="comment-toggle-button" for="comment-toggle">评论框</label> 
</div>
```



**注**：这里有一个小坑，可能因人而已，才可能会遇到，就是实例创建的配置`site: 'https://your_website.com'`这一项，网址`https://your_website.com`后千万不要再加`/`，否则，切换评论框失效。这个「坑」我是看到`iDisqus.js`里的这段代码才发现的：

```javascript
var _ = this;
var _tip = _.dom.querySelector('.loading-container').dataset.tip;
if(_.opts.site != location.origin){
//console.log('本地环境不加载 Disqus 评论框！');
if( _.opts.mode == 1 ){
	_.getlist();
 }
   return;
}
```

看到`if(_.opts.site != location.origin)` 才恍然大悟。  

最后，前端剩下的就是一些 CSS 样式的调整了。

## 补充

还有很多评论的系统可以参考，比如基于 Github Issues 的，如 [gitment](https://github.com/imsun/gitment)。还有一些基于 PaaS 的，例如 [Valine](https://github.com/xCss/Valine) 是一款基于 Leancloud 的极简评论系统。



## 相关资料

[**disqus-php-api**](https://github.com/fooleap/disqus-php-api) 作者博客：  

- [Disqus 的 @ 提及功能](http://blog.fooleap.org/mention-people-on-disqus.html)   
- [科学使用 Disqus ](http://blog.fooleap.org/use-disqus-correctly.html) 
- [像 Disqus 一样获取链接颜色 ](http://blog.fooleap.org/get-link-color-like-disqus.html) 
- [Disqus 的 URL 编码问题 ](http://blog.fooleap.org/disqus-url-encode.html) 
- [使用 Disqus API 上传图片](http://blog.fooleap.org/use-disqus-api-to-upload-image.html)  
- [Disqus API 评论嵌套问题](http://blog.fooleap.org/disqus-api-comments-order-by-desc.html)  
- [Disqus API 的权限问题 ](http://blog.fooleap.org/disqus-api-permissions.html) 
- [Disqus 的评论预审核 ](http://blog.fooleap.org/pre-moderation-on-disqus.html) 
- [Disqus Moderator Badge Text 已支持中文](http://blog.fooleap.org/disqus-moderator-badge-text.html)  



[**disqus-php-api**](https://github.com/fooleap/disqus-php-api) DEMO 演示：

- [Disqus PHP API 示例](http://blog.fooleap.org/disqus-php-api.html)  



