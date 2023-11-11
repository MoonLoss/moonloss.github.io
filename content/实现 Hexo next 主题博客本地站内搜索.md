---
title: '实现 Hexo next 主题博客本地站内搜索'
slug: 'hexo-localsearch'
date: 2016-07-08 14:49:45 +0800
tags: [Blog]
---

一、要使用搜索，必须先生成博客索引数据，Hexo  可以通过下面的这个插件生成：
```
npm install hexo-generator-search --save
```

<!-- more -->

二、只需要在 Hexo 站点 _config.yml 中添加如下配置即可：
```
search:
  path: search.xml
  field: post
```
- **path** - file path. Default is `search.xml` .
- **field** - the search scope you want to search, you can chose:
  * **post** (Default) - will only covers all the posts of your blog.
  * **page** - will only covers all the pages of your blog.
  * **all** - will covers all the posts and pages of your blog.


   更多配置说明可到插件页面查看：[hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)  

三、然后在 themes/next/layout/_partials/search 目录下修改 localsearch.swig 文件。  
  原始文件内容如下：   

```javascript
 <script type="text/javascript">
     var search_path = "<%= config.search.path %>";
     if (search_path.length == 0) {
     	search_path = "search.xml";
     }
     var path = "<%= config.root %>" + search_path;
     searchFunc(path, 'local-search-input', 'local-search-result');
 </script>
```

 修改后的文件内容为:  

```html
<div class="popup">
 <span class="search-icon fa fa-search"></span>
 <input type="text" id="local-search-input" placeholder="search my blog...">
 <div id="local-search-result"></div>
 <span class="popup-btn-close">close</span>
</div>
```

其他的地方都不需要改，这样 Hexo 本地站内搜索就完成了。(P.S. 此处 **hexo-theme-next** 的版本为5.0.0，以后较新的 Next 版本里 localsearch.swig 原始文件内容可能会和以上列的内容不一致，**此处不必再改** 。)  



四、补充

看到这，我先说说一下静态站关于实现站内搜索的方式，它有两种方式：一是本地建立索引，二是采用第三方线上服务。在 next 主题所在目录下的 `/layout/_partials/search` 目录中分别有三个文件：`localsearch.swig`、`swiftype.swig`、`tinysou.swig` ，其中 [tinysou](https://github.com/tinysou/) 这个项目已经很长时间没在维护了，不推荐使用。剩下的两个就是本地搜索和第三方线上服务。然而 [swiftype](https://swiftype.com) 不再提供免费账户(老用户还可以免费用)了，那剩下的就只有 localsearch 这条路了。

在目前最新 5.13 版本中 [hexo-theme-next search 目录](https://github.com/iissnan/hexo-theme-next/tree/master/layout/_partials/search) 中`localsearch.swig`已经更新为：

```html
<div class="popup search-popup local-search-popup">
  <div class="local-search-header clearfix">
    <span class="search-icon">
      <i class="fa fa-search"></i>
    </span>
    <span class="popup-btn-close">
      <i class="fa fa-times-circle"></i>
    </span>
    <div class="local-search-input-wrapper">
      <input autocomplete="off"
             placeholder="{{ __('search.placeholder') }}" spellcheck="false"
             type="text" id="local-search-input">
    </div>
  </div>
  <div id="local-search-result"></div>
</div>
```

搜索部分的网页样式已经修复了，因此，`localsearch.swig`不必再改。剩下关键的部分就是 [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)  的配置了。  



五、效果演示  

后来由于我，博客主题不再使用 [Next](https://github.com/iissnan/hexo-theme-next) ，所以上面的效果展示在原来的博客上 [THE TIME MACHINE](https://www.codeomega.ga/)。如果链接打不开，直接看下面的 GIF 动画效果演示：

![hexo-theme-next 本地搜索效果演示](https://raw.githubusercontent.com/vitzy/imue/master/imgs/hexo-localsearch.gif)