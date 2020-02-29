---
title: '初探 PhantomJS + Selenium 模拟浏览器行为'
slug: 'phantomjs'
date: 2017-04-28 14:38:00 +0800
tags: [Python]
---

## PhantomJS

首先，简单介绍一下 [PhantomJS](http://phantomjs.org/) ，它是一个基于 WebKit 的服务器端 JavaScript API ，无需浏览器的支持即可实现对 Web 的支持，且原生支持各种 Web 标准。适合使用在 _Web 测试_ ，当然也可以应对反爬虫。

<!-- more -->

## 获取 Cookie

有些网站的 cookie 很难用普通的爬虫获取，因为很多网站使用 ajax 动态加载网页内容，而且大多数时候 ajax 请求都会经过后台鉴权，这时就可以通过 **PhantomJS + Selenium** 模拟浏览器的行为，拿到经过 javascript 渲染后页面的内容。

请看下面的这段代码，以 _[cnzz统计](http://www.umeng.com/)_ 为例：

```python
#!/usr/bin/python
# coding:utf-8
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

url_login = 'https://i.umeng.com/loginframe?app_id=cnzz' 
# driver = webdriver.Remote(
# command_executor='http://127.0.0.1:8080',
# desired_capabilities=DesiredCapabilities.CHROME)
# 这里为 phantomjs 的路径
driver = webdriver.PhantomJS(executable_path="/home/phantomjs/bin/phantomjs")
driver.get(url_login)

# cnzz 用户名
driver.find_element_by_xpath("//input[@data-reactid='.0.0.0.1.0.0.0.0.0.1']").send_keys('<your cnzz email address>') 
# cnzz 密码
driver.find_element_by_xpath("//input[@data-reactid='.0.0.0.1.0.0.1.0.0']").send_keys('<your cnzz password>') 
# 1 秒后再模拟点击登录按钮事件，这样更接近真实的用户交互
time.sleep(1)
driver.find_element_by_xpath("//input[@data-reactid='.0.0.0.1.2.0']").click()  
# 等待 5 秒后，再获取 cookie
time.sleep(5)
cookie_list = driver.get_cookies()
# print cookie_list

cookie_str=''
for cookie in cookie_list:
    # print ("%s=%s;" % (cookie['name'], cookie['value']))
    cookie_str=cookie_str + cookie['name']+'='+cookie['value']+';'
    driver.quit()
    return cookie_str
```



### 小实战

有这样一个场景：

假如我有一个网站(托管在 Github Pages 的静态网站)使用 cnzz 的网站访问统计，我需要一个这样的提醒服务：当有特定的 IP 访问我的网站时，要发邮箱提醒我。



```python
#!/usr/bin/python3
# coding:utf-8

import requests
import time
import datetime
import pickle

__author__ = 'zetaoyang'
__version__ = '0.3.0'

# 使用了 mailgun 的邮箱服务
def send_simple_message(visit_count,visit_time,listshow_ip):
    return requests.post(
"https://api.mailgun.net/v3/sandboxfd8956dd22c742899928f5556dd679c7.mailgun.org/messages",
        auth=("api", "key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"), # 此处填 mailgun 的 key
        data={"from": "Monitor Robot <postmaster@sandboxfd8956dd22c742899928f5556dd679c7.mailgun.org>",
              "to": ["xxxxx@xxx.xxx"], # 此处填 收件人邮箱地址
              "subject": "Hello,xxx",
              "html": "<html><body>IP:2xx.1xx.2xx.0 ~ 2xx.1xx.2xx.255 has visited your website "+str(visit_count)+" times!<br>Monitor time: "+visit_time+"<br>"+"detail is :"+ str(listshow_ip)+"</body></html>"})

def FileCheck(fn):
    try:
        favorite_color = pickle.load(open(fn,"rb"))
        return (1,favorite_color)
    except IOError:
        # print ("Error: File does not appear to exist.")
        return (0,'error')

def get_cookie_from_network():
    from selenium import webdriver
    from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
    import time

    url_login = 'https://i.umeng.com/loginframe?app_id=cnzz' 
    # driver = webdriver.Remote(
    # command_executor='http://127.0.0.1:8080',
    # desired_capabilities=DesiredCapabilities.CHROME)
    driver = webdriver.PhantomJS(executable_path="/home/phantomjs/bin/phantomjs")
    driver.get(url_login)
    
    driver.find_element_by_xpath("//input[@data-reactid='.0.0.0.1.0.0.0.0.0.1']").send_keys('<your cnzz email address>') 
    driver.find_element_by_xpath("//input[@data-reactid='.0.0.0.1.0.0.1.0.0']").send_keys('<your cnzz password>') 

    time.sleep(1)
    driver.find_element_by_xpath("//input[@data-reactid='.0.0.0.1.2.0']").click()   
    time.sleep(5)

    cookie_list = driver.get_cookies()

    cookie_str=''

    for cookie in cookie_list:
       # print ("%s=%s;" % (cookie['name'], cookie['value']))
        cookie_str=cookie_str + cookie['name']+'='+cookie['value']+';'
    # print (cookie_list)
    driver.quit()
    return cookie_str


current_unix_time = int(time.time()) + 28800 

query_date = datetime.datetime.fromtimestamp(current_unix_time).strftime('%Y-%m-%d') # '2017-03-08'

detail_time = datetime.datetime.fromtimestamp(current_unix_time).strftime('%Y-%m-%d %H:%M:%S') 

site_id = 'xxxxxxxxxx' # your siteid

cookie = get_cookie_from_network() 

url = 'https://web.umeng.com/main.php?c=flow&a=detail&ajax=module%3DfluxData_option%3Dpv%7Cmodule%3DdetailPvList_currentPage%3D{current_page}_pageType%3D{page_size}&siteid={site_id}&st={start_date}&et={end_date}&visitorType=&visitorAgent=&visitorAct=&location=&refererType=&ip=&referer=&keyword=&hour=24&page=&cnzz_eid='

pv_logs = []
page = 1
has_next = True

# 保存上一次的查询结果到本地文件，防止重复发邮件
if(FileCheck("/home/target_data.pkl")[0] ==1):
    target_num = FileCheck("/home/target_data.pkl")[1]['num']
else:
    pickle.dump({'num':'0000000000c1'},open("/home/target_data.pkl","wb"))
    target_num = '0000000000c1'

while has_next:
    print ("GET page %d " % page)
    response = requests.get(
        url=url.format(current_page=page, page_size=90, start_date=query_date, end_date=query_date, site_id=site_id),
        headers={
            'Cookie': cookie,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch, br',
            #'X-Requested-With': 'XMLHttpRequest',
        },
    )

    data = response.json()['data']['detailPvList']
    pv_logs.extend(data['items'])
    has_next = data['page']['hasNext'] == u'1'

    page += 1

print ('Got %d pv logs' % len(pv_logs))

ip_visits = {}
visit_counts = {}

for pv in pv_logs:
    ip_visits[pv['ip']] = ip_visits.get(pv['ip'], 0) + 1

list_ip = []
found_flag = False
total_visits = 0

for ip, visits in sorted(ip_visits.items(), key=lambda ip: ip[1], reverse=True):
    # 2xx.1xx.2xx.0~2xx.1xx.2xx.255 
    ip_match=ip.split(".")
    # print (len(ip_visits.items()))

    if(ip_match[0]=='2xx' and ip_match[1]=='1xx' and int(ip_match[2]) <= 2xx and int(ip_match[2]) >= 2xx):
        print ('here it is')
        found_flag = True
        list_ip.append(ip)
        list_ip.append(visits)
        total_visits += visits

        query_unix_time = time.mktime(datetime.datetime.strptime(query_date, "%Y-%m-%d").timetuple())
        favorite_number={"num":str(int(query_unix_time)) +'c'+ str(total_visits)}
        # print (favorite_number['num'])
        # if(target_num != favorite_number['num'] or found_flag==True):

    
    visit_counts[visits] = visit_counts.get(visits, 0) + 1

print (list_ip)

if(found_flag==True):
    if(target_num != favorite_number['num']):
        pickle.dump(favorite_number,open("/home/target_data.pkl","wb"))
        send_simple_message(total_visits,detail_time,list_ip)
        print ('sended')
else:
    print ('not found')
```

最后部署到服务器上，我部署到了 [IBM Bluemix](https://console.ng.bluemix.net/) 的 docker 容器(容器镜像是 [baseimage-docker](https://github.com/phusion/baseimage-docker) )上 ,crontab 定时任务`0 */3 * * * /usr/bin/python3 /home/cnzz_ip_count_and_email-v3.py`每3小时 访问一次 cnzz 获取数据。

总结： 上面的方案不是最好的解决方案，因为实时性监测不好。我想到的另一种解决方案是 类似于 [IFTTT](https://ifttt.com/) ，网页前端 检测 特定IP 是否访问网站，然后触发访问一个发邮件接口(自己在 openshift 或 heroku 等平台搭建一个 接口服务)，这样似乎更好一些。最后感谢 [Brucezz](https://github.com/brucezz/) 和 [wuchangfeng](https://github.com/wuchangfeng) 提供的第一版脚本原型。

## [补充]CasperJS

[CasperJS](http://casperjs.org/) 是对 PhantomJS 更好的封装。

再看一例，cnzz 统计设置了查看密码的情形：

```javascript
var casper = require("casper").create();
var x = require("casper").selectXPath;  //用来简化XPath操作

casper.userAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36');

var siteid = '<your siteid>' // cnzz 站点id,比如 1763173848
var url = 'http://new.cnzz.com/v1/login.php?siteid=1' + siteid;
casper.start(url, function(){
    this.fill('form[name="form1"]', {
    'password': '<your cnzz view password >'  // cnzz 的查看密码
}, true);   //true, 填充完毕后,立刻提交表单
});

casper.then(function(){
    casper.wait(2000, function(){
        this.capture('cnzz.png'); //截取整个页面
    });
});

casper.then(function(){
    //this.captureSelector('cnzz.png', x('//*[@id="overview_top_order_table"]')); //截取指定的selector
});

casper.then(function(){
    var today=this.evaluate(function(){
        var tbl=document.getElementById("overview_top_order_table");
        return {
            pv: tbl.rows[1].cells[1].innerHTML,
            uv: tbl.rows[1].cells[2].innerHTML,
            ip: tbl.rows[1].cells[3].innerHTML,
        };
    });
    console.log(today.pv);
    console.log(today.uv);
    console.log(today.ip);
});
casper.run();

```

## 参考资料

[How to get the client IP address with Javascript only](http://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only)  

类似想法的服务还有：

- [IFTTT](https://ifttt.com/) (if **this** then **that**)
- [zapier](https://zapier.com/)

3rd party ip service:

- https://l2.io  
- https://www.ipify.org  
- https://myexternalip.com  
- http://www.whatismypublicip.com  
- https://ipinfo.io 
- https://ipinfo.io/developers  
- https://ip.sb  
- http://www.ipip.net   
- https://www.maxmind.com/en/geoip2-services-and-databases  


