---
title: '通过 Gitlab-CI 将 Hugo blog 自动部署至 GitHub'
slug: 'gitlab-ci'
date: 2016-10-17 09:44:23 +0800
tags: [Github, GitLab]
---

教大家用 Hugo 建个人博客的文章太多了，这次我要介绍的是用 Gitlab-CI 自动部署( 持续集成 ) Hugo blog 到 Github Pages 上 (P.S. 当然前提是你必须有 Gitlab 账号哦 )，其核心就是一个配置文件`.gitlab-ci.yml`:  

<!-- more -->

```yaml
# alpine linux 
#其包管理是 apk
image: alpine:3.4

before_script:
  - apk update 
  - apk add openssl && apk add git && apk add nodejs
  - npm install
  - wget https://github.com/spf13/hugo/releases/download/v0.16/hugo_0.16_linux-64bit.tgz
  - echo "37ee91ab3469afbf7602a091d466dfa5  hugo_0.16_linux-64bit.tgz" | md5sum -c
  - tar xf hugo_0.16_linux-64bit.tgz && cp ./hugo /usr/bin
  - hugo version

pages:
  cache:
    paths:
    - node_modules/

  script:
  - git clone https://<your personal access tokens>@github.com/<your user name>/<your repository name> public
  - npm run build
  - cd ./public
  - git config user.name "<your user name>"
  - git config user.email "<your email>"
  - git config --global push.default simple
  - git add .
  - git commit -m "update site"
  - git push --set-upstream "https://<your personal access tokens>@github.com/<your user name>/<your repository name>"
  artifacts:
    paths:
    - public
  only:
  - master
```
我这里使用的是 Hugo 的 1.6 版本，当然你也可以安装当前最新的 1.7 版本。  
由于我使用了`gulp`压缩 html 和 js 文件，所以需要安装`nodejs`。下面是`gulp`的配置文件`gulpfile.babel.js`的内容：  

```javascript
import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import uglify from 'gulp-uglify'
import runSequence from 'run-sequence'
import shell from 'gulp-shell'

gulp.task('hugo-build', shell.task(['hugo']))

gulp.task('minify-html', () => {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('minify-js', () => {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('build', ['hugo-build'], (callback) => {
  runSequence('minify-html','minify-js', callback)
})
```

这里用`gulp-shell`这个包，执行`hugo`这个命令。  
package.json的内容:

```json
{
  "private": true,
  "scripts": {
    "build": "gulp build"
  },
  "devDependencies": {
    "babel-preset-es2015": "^6.5.0",
    "babel-register": "^6.5.2",
    "gulp": "^3.9.1",
    "gulp-cli": "^1.2.1",
    "gulp-htmlmin": "^1.3.0",
    "gulp-uglify": "^2.0.0",
    "gulp-shell": "^0.5.2",
    "run-sequence": "^1.1.5"
  },
  "babel": {
    "presets": [
      "es2015"
    ]
  }
}
```

由于`gulpfile.babel.js`采用`ECMAScript 6`标准，使用了最新的 JavaScript 语法，需要用`babeljs`将其语法转化。  
这些做完之后就可以在`.gitlab-ci.yml`中用`npm run build`部署你的 blog 了。