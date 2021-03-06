---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 字节|后端|日常实习

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: 面经

# 一个页面可以有多个标签
tag:
- 字节实习

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



[字节后端日常实习一二三面经_笔经面经_牛客网 (nowcoder.com)](https://www.nowcoder.com/discuss/927475?type=post&order=create&pos=&page=1&ncTraceId=&channel=-1&source_id=search_post_nctrack)



第一次面字节，总结一下三次面经。
面试的是后端开发日常实习岗，部门是电商商家与运营（上海）。技术栈主要是 Go，所以 Java 问题偏少，集中在操作系统、网络和数据库的问题上，当然算法和项目是必问的。
字节面试官感觉都很忙，面试体验一般，但总体效率很高，一般当天就会给结果。最后三面过了，因为目前在 gap 还没入学，所以 Offer 审核没过。



## 一面（3月9日，60分钟）

1. 自我介绍
2. 项目讨论
3. MySQL 有哪些索引？（主键，唯一，普通）
    1. [索引 | lllllan](http://blog.lllllan.cn/mysql/index/)
4. 聚类、非聚类索引区别？
5. 联合索引 abc，查 a（走索引），查 b （不走），查 b = 1 and a = 1（走），查 a > 0 and b = 1 （走，但 b 列走不了）
    - 最后一个情况，为什么 a 走 b 不走？（最左匹配） 
    - 你给我详细分析一下 a > 0 and b = 1 查询索引的过程？（我说先匹配 a，再通过叶子节点链表取出数据过滤 b） 
    - 如果一定要用索引匹配 b，怎么设计这个算法？（二分？想了一下挺麻烦的） 
    - B+ 树叶子节点是链表怎么二分？（同页上的数据可以二分，页结构中有一个数组） 
6. 怎么知道命中索引了没？（explain）
    1. [如何监测MySQL是否命中索引？_空心人(・。・)的博客-CSDN博客_mysql怎么查看索引是否命中](https://blog.csdn.net/ba_qi/article/details/88799093)

7. 索引失效的情况？（比如条件里带函数，is null 等一些字段，like 左边加了通配符）
    1. [索引失效的情况及解决(超详细)_zyy_demon的博客-CSDN博客_索引失效的几种情况和解决](https://blog.csdn.net/sy_white/article/details/122112440)

8. like 左边有通配符为什么不匹配？（不知道，感觉和最左匹配差不多）
9. 场景题：字符串左右模糊匹配，比如“我爱中国”匹配“爱中”怎么设计索引？（我说存一个反序，通配符都加后面行不行？面试官说有问题，不过也没往下聊了）
    1. 全文索引

10. 浏览器输入 URL？（八股）
    1. [输入url网址到页面显示 | lllllan](http://blog.lllllan.cn/cs-basic/network/url-to-page/)

11. 具体到 HTTP 协议？（我说了 TCP 握手， HTTP 协议的报文，面试官感觉我应该懂就直接打断了）
12. 算法：岛屿数量（只要求写核心函数）
13. 反问

总结：**大部分时间花在 MySQL 的讨论上，需要在八股文的基础之上深入思考。**面试官性格蛮好的，除了提问他也会参与讨论给出他的意见。Java，操作系统，框架，Redis…… 一个没问。

---

- [ ] MySQL索引
    - [x] 聚集、非聚集索引区别
    - [x] 联合索引
    - [x] 最左匹配
    - [ ] B+树叶子节点怎么二分
- [ ] 怎么知道索引命中了没有
- [x] 索引失效的情况
- [x] like左边有通配符为什么不匹配
- [ ] 字符串左右模糊匹配
- [x] url到页面显示
    - [ ] 具体用到什么协议
- [x] 算法：岛屿数量





## 二面（3月11日，80分钟）

1. 自我介绍 

2. 项目讨论（两个项目问了 15 分钟，疯狂轰炸原理、代码细节） 

3. HTTP 的 keep-alive 和 TCP 的 keep-alive（项目延伸问题，讨论了 10 分钟）
    1. [keep-alive | lllllan](http://blog.lllllan.cn/cs-basic/network/keep-alive/)	
    2. HTTP 的 keep-alive 多长？（不了解，提到 Nginx 好像是 60s，但理论上应该没限制？） 

4. HTTP 怎么拆包的？（CRLF 分隔，同时有一个 Content-Length 字段决定 body 长度） 
    1. [第二章、用电信号传输 TCP/IP 数据 | lllllan](http://blog.lllllan.cn/cs-basic/network/how-is-the-network-connected/2/#_3-2-对较大数据进行拆分)
    1. [应用层的拆包和粘包 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/77275039)

    > - 请求行的边界是CRLF，如果读取到CRLF，则意味着请求行的信息已经读取完成。
    >
    > - Header的边界是CRLF，如果连续读取两个CRLF，则意味着header的信息读取完成。
    > - body的长度是有Content-Length 来进行确定。如果没有Content-Length ，则是chunked协议(具体参考前面的trunked协议)。

5. HTTP 如何传输大文件呢？（分块传输，Transfer-Encoding: chunked）  
    - 分块传输怎么判断什么时候传输完成呢？（最后一个包是空的） 
    - [HTTP 传输大文件 | lllllan](http://blog.lllllan.cn/cs-basic/network/def/http-big-data/)

6. 为什么 TCP 会粘包？（TCP 是字节流）  
    - 怎么解决粘包？（刚才不一直在聊 HTTP 解决粘包吗。。。） 
    - [计算机网络-常见面试题 | lllllan](http://blog.lllllan.cn/cs-basic/network/interview-questions/#tcp粘包和拆包-★)m/kex1n/p/6502002.html)

7. Java 的 Object 有哪些方法？（记不全会提醒你，然后一个一个问）  

    - [Java - 面向对象 | lllllan](http://blog.lllllan.cn/java/basic/4-object/#八、-object-类的常见方法)

    1. equals() 和 hashcode() 八股 
    2. 哈希冲突如何解决？（开放定址，链接法，再哈希）    
        - 这些办法的优缺点？ 
        - 负载因子是什么？怎么算？ 
    3. clone() 怎么用？引用拷贝深拷贝浅拷贝？ 

    - [java对象clone()方法_客 人的博客-CSDN博客_clone](https://blog.csdn.net/qq_33314107/article/details/80271963)

    1. wait() 和 sleep() 八股 

    - [第五章、Java线程间的通信 | lllllan](http://blog.lllllan.cn/java/concurrent/1/5/#_5-2-sleep方法)

8. 场景题：2T 的两个大文件，每一行存储一个字符串，内存只有 1G，找出两个文件中相同的字符串？（哈希，分治）  
   
    - [算法系列-大数据面试题-两个大文件中找出共同记录_五癫的博客-CSDN博客_两个超大文件找共同出现的单词](https://blog.csdn.net/tiankong_/article/details/77234726)

    - 你设计的算法，每一个字符串需要被读几次？ 
    - 复杂度多少？还可以优化吗？ 
    
9. 算法题：最长有效括号（磨了 20 分钟才写出来，把测试通过就行了） 

10. 没反问...... 

总结：**网络问得很细，Java 问得偏八股。**面试官全程面无表情，但没啥反馈。做算法题的时间有点长，可能着急结束，代码跑通了就行，甚至连代码都没细看，面试体验很一般。

---

- [x] HTTP 的 keep-alive 和 TCP 的 keepalive
    - [ ] 多长时间
- [ ] HTTP 拆包
- [ ] HTTP 传输大文件
    - [x] 分块传输
    - [ ] 怎么判断什么时候传输完成
- [ ] TCP 为什么会粘包
    - [ ] 怎么解决
- [ ] Object的方法
    - [x] equals 和 hashcode
    - [x] 哈希冲突解决
        - [ ] 各自的优缺点
        - [ ] 负载因子
    - [ ] clone 怎么用，深浅
    - [x] wait 和 sleep
- [ ] 2T 的两个大文件，每一行存储一个字符串，内存只有 1G，找出两个文件中相同的字符串
- [x] 算法：最长有效括号







## 三面（3月18日，60分钟）

1. 自我介绍 
2. epoll 怎么用？（项目相关） 
3. buffer 用来干嘛？（没说两句被打断，面试官指的是项目中的，开始没理解到） 
4. 用过哪些 Linux 命令？ 
5. 路由器和交换机区别？  
    - [路由器和交换机 | lllllan](http://blog.lllllan.cn/cs-basic/network/def/router-and-switch/#路由器)
    - 链路层是干什么的？有哪些协议？ 
    - IP 地址和 MAC 地址的区别？ 
    - [计算机网络-常见面试题 | lllllan](http://blog.lllllan.cn/cs-basic/network/#ip地址和mac地址)
6. 事务 ACID 知道吧，解释 C 的含义？（说了很久，面试官说基本对，下去再看看） 
7. 物理地址和虚拟地址区别？  
    - 怎么转换？ 
    - 为什么要多级页表和快表？ 
    - [内存管理概念 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/3/1/#_4-3-具有快表的地址变换机构)
    - 缺页中断处理流程？ 
    - [虚拟内存管理 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/3/2/#_2-2-缺页中断机构)
    - 页表项的结构？（页地址、页偏移，各种标记位标识 CPU 特权级、读写权限、是否在内存中......） 
    - [虚拟内存管理 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/3/2/#_2-1-页表机制)
    - 你提到了 CPU 特权级？怎么转换的？（中断） 
    - [操作系统运行环境 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/1/3/#三、系统调用)
    - 具体有哪些中断？（外部中断，异常，软中断） 
    - [操作系统运行环境 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/1/3/#_2-2-中断和异常的分类)
8. 数据从网卡到内存的过程描述一下？  
    - 具体有几次中断？ 
    - [计算机网络——数据从网卡到应用的过程_JMW1407的博客-CSDN博客_数据包从网卡到应用层的过程](https://blog.csdn.net/JMW1407/article/details/108636657)
    - [第二章、用电信号传输 TCP/IP 数据 | lllllan](http://blog.lllllan.cn/cs-basic/network/how-is-the-network-connected/2/#_5-10-接受返回包)
9. CPU 4 个核有共享缓存对吧，怎么保证缓存一致性？（总线锁，MESI） 
    - [CPU 缓存 | lllllan](http://blog.lllllan.cn/cs-basic/os/def/cpu-cache/)
10. 平时怎么学的？ 
11. 反问 

总结：可能是之前没问操作系统，**终面的操作系统问得特别详细**。面试官很严肃，哪怕有一点不对就会被追问，中途有一次口误他显得很不高兴。

----

- [ ] epoll 怎么用
- [ ] buffer 干嘛
- [ ] linux 命令
- [ ] 路由器和交换机
    - [ ] 链路层干嘛，协议
    - [x] IP地址和MAC地址
- [x] ACID
- [ ] 物理地址和虚拟地址
    - [ ] 地址转换
    - [x] 快表和多级页表
    - [ ] 缺页中断处理流程
    - [x] 页表项结构
    - [ ] CPU 特权指令，转换
    - [x] 中断分类
- [ ] 数据从网卡到内存的过程
    - [ ] 几次中断
- [ ] CPU 共享缓存
    - [x] 缓存一致性

