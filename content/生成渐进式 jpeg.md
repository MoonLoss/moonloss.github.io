---
title: '生成渐进式 jpeg'
slug: 'progressive-encoding-jpeg'
date: 2016-10-09 10:43:34 +0800
tags: [Python]
---

用`python`实现了一个带参数的命令行将图片转换成`progressive encoding`(渐进式) JPEG 格式。  

<!-- more -->

这里先贴出代码：  
　　
```python
#! /usr/bin/env python3
import platform, sys, os
import getopt
from PIL import Image ,ImageFile

def isWindows():
    return 'Windows' in platform.system()

def isLinux():
    return 'Linux' in platform.system()

def usage():
    print ("-h: This message.")
    print ("-i [file]: the path of the target image file. ")
    print ("-o [filepath]: the path of the output. ")
    print ("EXAMPLES:")
    print ("$py tojpeg.py -i /home/test.jpg - o /home")

def info():
    print ("**************************************************")
    print ("**|''''''''''''''''''''''''''''''''''''''''''''|**")
    print ("**|convert images to progressive encoding JPEG |**")
    print ("**|Version: 1 beta                             |**")
    print ("**|By: zetao yang                              |**")
    print ("**|Email: yangzetao2015[@] outlook             |**")
    print ("**|https://zetaoyang.github.io                 |**")
    print ("**|-                                           |**")
    print ("**|Usage: $tojpeg -h                           |**")
    print ("**|                                            |**")
    print ("**|,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,|**")
    print ("**************************************************")
    print ("")

if(isWindows()):
   os.system("cls")
if(isLinux()):
   os.system("clear")

def main():
    info()
    try:
        #使用sys.argv[1:] 过滤掉第一个参数
        #（它是执行脚本的名字，不应算作参数的一部分）
        opts,args = getopt.getopt(sys.argv[1:],"hi:o:", ["help","input=" ,"output="])
    except getopt.GetoptError as err:
        print (err)
        sys.exit(2)

    if not opts and not args:
        usage()
        sys.exit()

    for opt, arg in opts:
        if opt in ("-h","--help"):
            usage()
            sys.exit()
        elif opt in ("-i","--input"):
            input_file = arg
        elif opt in ("-o","--output"):
            output_path = arg
        else:
            assert False, "unhandled option"

    try:
        img = Image.open(input_file)
        destination = output_path + "/output.jpeg"
        try:
            img.save(destination,"JPEG",quality=80,optimize=True,progressive=True)
            print("conversion is ok.")
        except IOError:
            ImageFile.MAXBLOCK = img.size[0]*img.size[1]
            img.save(destination,"JPEG",quality=80,optimize=True,progressive=True)
    except KeyboardInterrupt:
        print ("\nWell i hope you had a good time.")

if __name__ == "__main__":
    main()
```

最后可以用 [pyinstaller](https://github.com/pyinstaller/pyinstaller) 打包分发了。
