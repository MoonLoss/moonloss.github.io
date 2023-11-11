---
title: 'Geohash 编码解码 C 语言实现'
slug: 'geohash'
date: 2017-03-20 08:21:27 +0800
tags: [Algorithm]
---

##  什么是 Geohash

Geohash，是由 Gustavo Niemeyer  提出对地图坐标进行编码的一种方式。其思想策略是分治，将地理坐标值转化为二进制码。

例如：坐标北京海淀区附近 L(116.308785,39.980778)，先对经度进行编码：

<!-- more -->

首先，将区间 (-180.0,180.0) 分为 (-180.0,0.0)，(0.0,180.0)，如果经度属于前者，则二进制码为 0，否则为 1。因为 116.308785 属于 (0.0,180.0)，所以第一位为 1。  

然后对 (0.0,180.0) 再进行一次二分，分为 (0.0,90.0),(90.0,180.0)，该经度属于后者，因此第二位仍然为 1。  

第三次对 (90.0,180.0) 二分，第四次对 (90.0,135.0) 二分，这样经过多次分割之后(二分次数取决于经纬度的精度，这里经度的精度是 6 位小数)，就可以得到一个表示经度的二进制串：

```
1101001010110101010111100
```

同样地，对纬度 39.980778 也进行编码，可以得到表示纬度的二进制串：

```
1011100011011100100011101
```

最后一步，需要将两个经纬度编码进行合并，两个串「剪开」再「拼接」为一个二进制编码。

依次取经度和纬度的每一位进行合并(奇数位为经度，偶数位为纬度)：
```
lon: 1 1 0 1 0 0 1 0 1 0 1 1 0 1 0 1 0 1 0 1 1 1 1 0 0

     11100111010010001101101101110010011000101111110001
     
lat: 1 0 1 1 1 0 0 0 1 1 0 1 1 1 0 0 1 0 0 0 1 1 1 0 1
```

得到合并的二进制码后，需要将其每 5 位分为一组，并使用 base32 将其转化为对应的字符。介绍就这么多，如果还想详细地了解 Geohash ，就看本文最后的参考资料吧。

## base32 编解码

大家一定很好奇，为什么这里要提 base32 呢？因为我是用 C 实现嘛！(得自己造轮子)
`base32.c`文件：  
```C
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "../include/base32.h"

//base32 表包含 0~9 以及小写字母 (去除'a','i','l','o')，
//共 32 个字符
static const char base32_alphabet[32] = {
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
};

/**
 * 匹配 base32_alphabet
 * @param m char
 * @return i int
 */
int find_number(char m) {
    int i;
    for(i = 0; i < 32; ++i)
    {
        if(m == base32_alphabet[i])
            return i;
    }
    return -1;
}

/**
 * base32 编码
 * @param bin_source char*
 * @return str char*
 */

char* base32_encode(char *bin_source){
    int i;
    int j = 0;
    static char str[10];

    for(i=0;i<strlen(bin_source);++i){
        if((i+1)%5==0){
            j++;
            int num = (bin_source[i]-'0')+(bin_source[i-1]-'0')*2\
            +(bin_source[i-2]-'0')*2*2+(bin_source[i-3]-'0')*2*2*2\
            +(bin_source[i-4]-'0')*2*2*2*2;

            str[j-1] = base32_alphabet[num];
        }

    }
    return str;
}

/**
 * base32 解码
 * @param str_source char*
 * @return dec int*
 */
int* base32_decode(char *str_source){
    int i,j;
    static int dec[50];
    int count=0;
    for(i=0;i<strlen(str_source);++i){
        for(j=5-1;j>=0;--j){
            count++;
            //位运算十进制转二进制
            dec[count-1] = find_number(str_source[i])>>(j%5)&1;
        }
    }
    return dec;
}
```

## Geohash 实现

```C
#include <stdio.h>
#include "include/base32.h"

/**
 * 经纬度 二进制混合编码
 * @param lon double
 * @param lat double
 * @return char*
 */
char* encode(double lon, double lat){
    double latM,lonM;
    char lon_ans[25];
    char lat_ans[25];
    static char ans[50];
    double lonL = -180.0, lonR = 180.0;
    double latL = -90.0, latR = 90.0;
    int i,j;
    for(i=0;i<25;++i){
        latM = (latL + latR) / 2.0;
        lonM = (lonL + lonR) / 2.0;
        if(lon - lonM >= 0) lon_ans[i] = '1', lonL = lonM;
        else    lon_ans[i] = '0', lonR = lonM;
        if(lat - latM >= 0) lat_ans[i] = '1', latL = latM;
        else    lat_ans[i] = '0', latR = latM;
    }

    //将两个经纬度进行合并，组合为一个二进制编码
    for(j=0;j<50;++j) {
        if((j+1)%2==1) ans[j] = lon_ans[(j+1)/2];
        else ans[j] = lat_ans[j/2];
    }

    return ans;
}

/**
 * 将二进制解码为经纬度
 * @param bin_num int*
 * @return double*
 */
double* decode(int *bin_num){
    int i;
    double latM,lonM;
    static double result[2];
    double lonL = -180.0, lonR = 180.0;
    double latL = -90.0, latR = 90.0;
    int lon_ans[25];
    int lat_ans[25];
    for(i=0;i<50;++i){
        if((i+1)%2==1){
            lon_ans[(i+1)/2] = bin_num[i];
        }else{
            lat_ans[(i/2)] = bin_num[i];
        }
    }

    for(i=0;i<25;++i){
        if(lon_ans[i]==1){
            lonL = lonM;
            lonM = (lonL+lonR)/2.0;
        }else if(lon_ans[i]==0){
            lonR = lonM;
            lonM = (lonL+lonR)/2.0;
        }

        if(lat_ans[i]==1){
            latL = latM;
            latM = (latL+latR)/2.0;
        }else if(lat_ans[i]==0){
            latR = latM;
            latM = (latL+latR)/2.0;
        }

    }
    result[0] = latM;
    result[1] = lonM;
    return result;
}

int main(){
    int n,m;
    double x,y;
    double *lon_lat_res;
    char *bin_str;
    char *str;
    char des_str[10];
    int *bin_num;
    int i,j;
    scanf("%d %d",&n,&m);

//输入经纬度，输出 geohash 编码
    for(i=0;i<n;++i){
        scanf("%lf %lf",&x,&y);
        bin_str = encode(x,y);
        str = base32_encode(bin_str);
        for(j=0;j<10;++j){
            printf("%c",*(str+j));
        }
        printf("\n");
    }

//输入 geohash 编码，输出 经纬度
    for(i=0;i<m;++i){
        scanf("%s",des_str);
        bin_num = base32_decode(des_str);
        lon_lat_res = decode(bin_num);
        //前面是经度，后面是纬度
        printf("%lf %lf\n",*(lon_lat_res+1),*lon_lat_res);
    }

    return 0;
}
```

输入：

第 1 行：2 个整数 n,m。1≤n,m≤100。  
第 2..n+1 行：每行 2 个实数 x,y，第 i+1 行表示第 i 个点的纬度和经度。-90≤x≤90，-180≤y≤180  
第 n+2..n+m+1 行：每行 1 个字符串，表示需要解码的 Geohash 串。  

输出：

第 1..n 行：每行 1 个字符串，第 i 行表示以第 i 个点的 Geohash 编码，长度为 10。  
第 n+1..n+m 行：每行 2 个实数 x,y。  
第 n+i 行表示以第 i 个 geohash 编码所表示的区域中心点坐标，保留 6 位小数。  

运行结果：
```
>>> ./geohash.exe
>>> 3 2
>>> 117.103367 36.255833
ww7q2b0jd1
>>> 112.688922 27.293056
wsb5k299d4
>>> 110.082600 34.477861
wqnk0ux8n7 
>>> wx0csn0ng8
113.730624 39.672792 
>>> ww0k7k0et7
112.995302 34.519663
```

完整 Clion 工程[在这](https://github.com/ZetaoYang/Code/tree/hihocoder)(包含 .exe 可执行文件)。

## 代码解释

我认为算法实现的核心就是「二分」，这部分没什么可讲的。在实现过程中最令我头疼是十进制转二进制(不要告诉我用 itoa()，sprintf()，因为 itoa() 在 Linux 中没有此函数 )，需要将十进制数转为 5 位的二进制数，这里用位运算更方便一些。例如：x 为需要转化的十进制数，  
```C
for(i=5-1;i>=0;--i) printf("%d",x>>i&1);
```

我们都知道，奇数的二进制最后一位全部为`1`，而偶数的二进制最后一位全部为`0`，这样用按位与运算可以很方便地知道一个数是奇数还是偶数，只要让数字`&1`就可以了，因为`奇数 & 1=1`，而`偶数 & 1=0`。`x>>i`—— x 右移 i 位，相当于被 2 除了 i 遍。

这段代码被用在 bas32.c 的 base32_decode() 函数。

## 参考资料

* [Geohash,Wikipedia](https://en.wikipedia.org/wiki/Geohash)
* [GeoHash 核心原理解析](http://www.cnblogs.com/LBSer/p/3310455.html)
* [Geohash 算法的 8 个矩形](http://evthoriz.com/2015/07/02/Geohash%20%E7%AE%97%E6%B3%95%E7%9A%84%E8%BE%B9%E7%95%8C%E9%97%AE%E9%A2%98/)
* [geohash：用字符串实现附近地点搜索](http://charlee.li/geohash-intro.html)
* [Python module Geohash](https://github.com/vinsci/geohash/)