---
title: '用 Github API 上传文件的方法'
slug: 'github-api'
date: 2016-10-08 11:04:19 +0800
tags: [Javascript, Github]
---

前几天，在 V2EX 看见有人用 Github API 基于python实现了一个图床。于是我决定用 nodejs 也实现一个类似功能。首先我看有没现成的第三方库，在 [Libraries | GitHub Developer Guide](https://developer.github.com/libraries/) 我发现有五个跟 javascript 相关的库：  

<!-- more -->

![github-api-js](https://raw.githubusercontent.com/vitzy/imue/master/imgs/github-api-js.png) 

经调研发现 [GitHub.js wrapper around the GitHub API](https://github.com/michael/github) 比较好入手，基本将 Github API 全都实现了，并且封装了自己的接口，但是缺点还是有的，文档写的不太详细。然后就开始看它的文档，其中 Repository 的 writeFile() 方法就是上传文件的函数。  
其中 writeFile():  

![github-api-writeFile-2.3.0](https://raw.githubusercontent.com/vitzy/imue/master/imgs/github-api-writeFile-2.3.0.png)  

先在这里贴出代码( ECMAScript 2015 标准)： 

```javascript
//导入github-api
var GitHub = require("github-api")
var fs = require("fs")

const gh = new GitHub({
	token: '<your personal token>'//这里采用token认证
})

var branch = '<branch_name>'//eg. master
var ufilePath = '<repo_path>'//eg. images/
//{master}/xxx.jpg
var ufileName = '<file_name>'//eg. xxx.jpg
var commit = 'here i am'
var user = '<user name>'//用户名
var repo = '<repository name>'//仓库名

const re = gh.getRepo(user,repo)

//同步读取文件
var imageBlob = fs.readFileSync('<filepath>')
//base64编码
var imageB64 = imageBlob.toString('base64')
//ascii编码
//utf8编码也可以，只不过有些浪费。
var data = imageB64.toString('ascii')

var options = {
    //author:{},
    //commiter:{},
    encode: false
}

re.writeFile(branch, ufilePath + ufileName, data , commit,options, (error,result,request)=>{
    if (error===null) {	console.log(`https://cdn.rawgit.com/${user}/${repo}/${branch}/${ufilePath}${ufileName}`)
	 }
})

```

这其中的关键就是编码问题， GitHub Contents API 要求 content 是 base64 编码。 


​	