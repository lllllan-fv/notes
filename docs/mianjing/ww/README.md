---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 字节|客户端|春招

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



## 一面



- 死锁发生的条件
    - [死锁 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/2/4/)
- 计算机的五层网络结构
    - [OSI 和 TCP/IP 网络分层模型详解 | lllllan](http://blog.lllllan.cn/cs-basic/network/osi&tcp/)
- 传输层的协议
    - TCP和UDP的区别
    - [计算机网络-常见面试题 | lllllan](http://blog.lllllan.cn/cs-basic/network/#tcp、udp协议的区别)
- 为什么是三次握手，而不是两次或者四次
    - [三次握手 | lllllan](http://blog.lllllan.cn/cs-basic/network/3-handshake/#为什么要三次握手-⭐)
- 应用层的协议
- HTTP的常见操作
    - [第二章、简单的HTTP协议 | lllllan](http://blog.lllllan.cn/cs-basic/network/diagram-http/2/#五、告知服务器意图的-http-方法)
    - GET和POST的区别
- ~~构造函数和拷贝构造函数和虚函数的区别~~
- ~~STL里面比较常见的容器~~
- ~~map和unordered_map的区别~~
- map是怎么保证有序的
- 散列会出现什么问题
    - 哈希冲突怎么解决，除了开链法外还有什么解决方案
    - [常见面试题 | lllllan](http://blog.lllllan.cn/java/basic/#java程序是如何执行的)
- ~~指针和引用的区别~~
- Java的内存回收
    - Java怎么判断需要回收内存（不是引用计数）
    - [对象已死 | lllllan](http://blog.lllllan.cn/java/jvm/3/2/)
- 你为什么要选客户端开发岗位
- 比赛中的最大挑战
- 算法题（肯定不会出比较麻烦的）
    - 最大连续子数组和最小值
    - [907. 子数组的最小值之和 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/sum-of-subarray-minimums/)
    - 最长回文子串
    - [5. 最长回文子串 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/longest-palindromic-substring/)
- 反问





## 二面

- 进程和线程的概念
    - 进程的共享资源 - 临界区
    - 线程的共享资源 - 临界区 + 进程资源
    - 线程的私有资源 - 栈 + 程序计数器
- 进程之间通信的方式
    - [进程间通信 | lllllan](http://blog.lllllan.cn/cs-basic/os/def/process-communication/)
- ~~C++共享内存的机制~~
- mmap了解嘛
    - ==[阿里二面：什么是mmap？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/357820303)==
    - ==[认真分析mmap：是什么 为什么 怎么用 - 胡潇 - 博客园 (cnblogs.com)](https://www.cnblogs.com/hu==xiao-tee/p/4660352.html)
- 共享内存和管道的通信效率的比较
- 用户态和内核态的数据拷贝
- 管道大小是不是可以调整，怎么调整
- CPU调度算法
    - [处理机调度 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/2/2/#四、典型的调度算法)
    - 时间片轮转的缺点：平均等待时间长、上下文切换浪费时间
- 为什么要区分内核态和用户态
    - 处于安全考虑
    - [操作系统运行环境 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/1/3/#一、处理器运行模式)
- 虚拟内存有了解嘛
    - [虚拟内存管理 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/3/2/)
    - 虚拟内存的作用
- TCP和UDP的区别
    - [计算机网络-常见面试题 | lllllan](http://blog.lllllan.cn/cs-basic/network/#tcp、udp协议的区别)
- TCP的拥塞控制
    - ==[通俗易懂跟你讲解什么是拥塞控制？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/97709686)==
- 应用层协议主要用到TCP的协议有哪些
- 应用层协议主要用到UDP的协议有哪些
- FTP协议 SMTP协议
- HTTP请求格式
- 请求头包含了哪些东西
    - 有哪些比较经典的请求头
- 请求方法有哪些
    - POST和GET的区别
- HTTP响应报文包括哪些
    - ==[第三章、HTTP报文 | lllllan](http://blog.lllllan.cn/cs-basic/network/diagram-http/3/)==
- HTTP返回码
    - 各举一个例子
    - [第四章、Http状态码 | lllllan](http://blog.lllllan.cn/cs-basic/network/diagram-http/4/)
- 内存泄漏和内存溢出的区别
    - 区别：内存溢出是指程序在申请内存时，没有足够的内存空间供其使用， 系统已经不能再分配出你所需要的空间；内存泄露是指程序在申请内存后，无法释放已申请的内存空间，一次内存泄露危害可以忽略，但是内存泄漏次数多了就会导致内存溢出。
    - 内存泄漏是怎么引起的
        - ==[什么是内存泄漏，常见引起引起内存泄漏的原因,及解决办法_Lonely池的博客-CSDN博客_内存泄漏](https://blog.csdn.net/baidu_32015283/article/details/87916080)==
    - 内存溢出是怎么引起的
        - [运行时数据区域 | lllllan](http://blog.lllllan.cn/java/jvm/2/1/)
- ~~C++中内存泄露的分类~~
- 堆栈队列的概念
- 二叉树的中序前序后序遍历的概念
- 什么是线程安全，是有什么风险
- ~~C++里是怎么保证线程安全的~~
- 线程池了解过嘛，线程池是什么概念
- ~~什么是多态，C++有什么机制来实现多态，具体有什么关键字~~
- ~~virtual关键字有用过嘛~~
- ~~C++的sizeof的计算，什么样的原理，是怎么用的~~
- ~~什么是虚函数~~
- 之前来面试过字节嘛
- ~~什么是LRU，应用场景是什么，在C++里面~~
- SQL语句了解嘛
- HTTPS建立的流程
    - [HTTP和HTTPS | lllllan](http://blog.lllllan.cn/cs-basic/network/http-and-https/#https工作流程)
- HTTP1.1/HTTP2.0/HTTP3.0有什么改进嘛
    - ==[了解 HTTP3.0 吗？简要说一下 HTTP 的一个发展历程？_CreatorRay的博客-CSDN博客_http3.0](https://blog.csdn.net/m0_46171043/article/details/115167824)==
- 算法题
    - 二叉树的中序遍历非递归
    - [94. 二叉树的中序遍历 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
    - 二叉树最大子路径和
    - [124. 二叉树中的最大路径和 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)
- 你平时是怎么学习的
- 后续的职业发展怎么考虑的
- 后面想做什么方向
- 为什么想做客户端
- 反问