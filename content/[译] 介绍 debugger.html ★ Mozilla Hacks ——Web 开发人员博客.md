---
title: '[译] 介绍 debugger.html ★ Mozilla Hacks ——Web 开发人员博客'
slug: 't-debugger-html'
date: 2016-10-01 16:30:00 +0800
tags: [firefox, debugger]
---

> 本文是在众成翻译认领翻译的，原文链接在此 https://hacks.mozilla.org/2016/09/introducing-debugger-html/?utm_source=javascriptweekly&utm_medium=email 。

_debugger.html_ 是一个来自于 Mozilla 的现代 JavaScript 调试器， 它是由 [React](https://facebook.github.io/react/)和[Redux](http://redux.js.org/) 技术搭建的 web应用。该项目于今年年初开始，是为了取代 [Firefox Developer Tools](https://developer.mozilla.org/en/docs/Tools) 中目前的调试器。而且，我们也曾想过让一个调试器能调试多个目标并且工作在独立模式下。

<!-- more -->

![collage of debugger targets](http://p9.qhimg.com/t01884f42bb9cc90d53.png)  



目前， debugger.html 可以连接到并调试 Firefox ，而且还可以连接到 Chrome 和 Node(目前是实验性的)。调试器用 Mozilla 的[远程调试协议](https://wiki.mozilla.org/Remote_Debugging_Protocol)(RDP)( Mozilla’s Remote Debug Protocol)连接到 Firefox ,而与 Node、Chrome 则通过[Chrome远程调试协议](https://developer.chrome.com/devtools/docs/debugger-protocol)(Chrome’s RDP)通信。

debugger.html 项目托管在 [GitHub](https://github.com/devtools-html/debugger.html) 上而且使用现代框架和工具链，使其随时可以参阅，吸引广大的开发人员。

# debugger.html

用户界面分为三个主要区域: 源面板、编辑器面板和右边栏。

*   _源面板_ 显示所有当前正在调试的应用程序的源代码树状图。

*   _编辑器面板_ 用来显示项目的各种源文件并且提供设置断点和修饰美化源文件的功能。

*   _右边栏_ 用于显示当调试器暂停调试时,当前的断点，当前的调用堆栈，以及限定了作用域的变量，集。

*   调试器支持 pausing(暂停) ,step over(跳过) , step in(跳入) , step out(跳出) ,并且尽其所能调试 JavaScript。
> 译者注：  
> _step over_ 是指在单步执行时，在函数内遇到子函数时不会进入子函数内单步执行，而是将子函数整个执行完在停止，也就是把子函数整个作为一步；  
> _step in_ 是指单步执行，遇到子函数就进入并且继续单步执行；  
> _step out_ 是指当单步执行到子函数内时，用step out就可以执行完子函数余下部分，并返回到上一层函数。  

*   _调用堆栈面板_ 显示调用堆栈帧的一个给定的暂停条件。_作用域面板_ 显示基于所选框架的展开变量树。



![debug demonstration Gif](http://p2.qhimg.com/t01318b9b3656ffd49a.gif)



# 入门

若要开始使用调试器你可以查阅托管于 Github 的代码，也可以看[入门指南](https://github.com/devtools-html/debugger.html/blob/master/CONTRIBUTING.md#getting-started)。

如果你想直接着手，运行以下命令︰

```
npm install - Install dependencies
npm start - Start development web server
open http://localhost:8000 - Open in any modern browser
```

一旦你在8000端口打开了浏览器调试器，将显示调试器主页面，你可以从其列出的清单中选择任何可调试目标。为了使调试器进行连接和调试目标，调试器必须运行开启远程调试。这通常需要你启动设置一组标志的目标。例如，你可以启动 Firefox (以运行在MacOS上举例)，使用下面的命令开启远程调试︰

```
$ /Applications/Firefox.app/Contents/MacOS/firefox-bin
--start-debugger-server 6080 -P development
```

关于 Chrome 和 Firefox 的其他操作列在[这里](https://github.com/devtools-html/debugger.html/blob/master/docs/remotely-debuggable-browsers.md#)。

调试 Node 需要 node [6.3.0](https://nodejs.org/en/blog/release/v6.3.0/)或者以上版本环境。运行 Node ,你需要设置检查标志。例如，如果你想要调试 `myserver.js` 你需要使用类似于以下内容的命令。

```
`$ node --inspect myserver.js`
```

更多信息可以在[入门](https://github.com/devtools-html/debugger.html/blob/master/CONTRIBUTING.md#getting-started)指南里查阅

# Firefox Developer Tools

我们正在将此调试器集成到 Firefox 的[Developer Tools](https://developer.mozilla.org/en-US/docs/Tools)。第一代版本，已经在[Nightly](https://nightly.mozilla.org/)登陆了，你可以尝试一下。


![example debugging jsfiddle](http://p9.qhimg.com/t016a6422793b28bd2f.png)



# 参与进来

正如上面所说的，此项目仍在开发中，我们将感谢您的帮助，使得最好的调试器成为可能。如果您有兴趣加入我们的工作，请看看[协助](https://github.com/devtools-html/debugger.html/blob/master/CONTRIBUTING.md)指南。

## 关于
[Bryan Clark](https://hacks.mozilla.org/author/bclarkmozilla-com/) 

Firefox Developer Tools 技术产品经理

*   [@clarkbw](http://twitter.com/clarkbw)

[更多文章 由 Bryan Clark…](https://hacks.mozilla.org/author/bclarkmozilla-com/)