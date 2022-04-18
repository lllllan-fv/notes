---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 字节|番茄后端|实习

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



[字节跳动 后端暑期实习 一二三面凉经_笔经面经_牛客网 (nowcoder.com)](https://www.nowcoder.com/discuss/924126)



## 字节一面3.28

1. 自我介绍
2. new/delete和malloc/free的区别
3. new操作符可以被重载吗
4. static关键字的作用
    1. [Java - 基础语法 | lllllan](http://localhost:8080/java/basic/2-grammar/#_3-3-static-的作用)

5. C++的多态了解吗
6. 构造函数和析构函数可以是虚函数吗
7. vector底层实现机制
    1. [Vector 源码解读 | lllllan](http://localhost:8080/java/container/source-code/vector/)

8. map和unordered_map的区别
9. 哈希冲突的解决方法
    1. [常见面试题 | lllllan](http://localhost:8080/java/basic/#哈希冲突的解决办法)

10. 进程和线程的区别
    1. [操作系统 | lllllan](http://localhost:8080/cs-basic/os/#二、进程和线程)

11. 进程中的一个线程有问题，会有什么影响
12. 实现一个服务，可以多进程，单进程，多线程，会怎么选择实现的方式，考虑是什么
13. 高并发线程不够用怎么办
14. epoll的两种模式
15. 常见的进程间的通信方式，哪个最快
    1. [进程间通信 | lllllan](http://localhost:8080/cs-basic/os/def/process-communication/)

16. 为什么共享内存最快
17. 介绍一下虚拟地址和物理地址，虚拟地址怎么映射到物理地址
18. TCP和UDP的区别
    1. [计算机网络-常见面试题 | lllllan](http://localhost:8080/cs-basic/network/interview-questions/#四、tcp、udp协议的区别)

19. TCP粘包是什么
    1. [计算机网络-常见面试题 | lllllan](http://localhost:8080/cs-basic/network/interview-questions/#tcp粘包和拆包-★)

20. 描述一下TCP的四次挥手
    1. [四次挥手 | lllllan](http://localhost:8080/cs-basic/network/4-wave/)

21. TIME_WAIT状态的作用
    1. [四次挥手 | lllllan](http://localhost:8080/cs-basic/network/4-wave/#四次挥手流程)

22. MySQL索引底层什么实现的
23. 为什么采用B+树
    1. [索引 | lllllan](http://localhost:8080/mysql/index/)

24. 聚簇索引和非聚簇索引的区别
25. 聚簇索引一个表可以有多个吗

做题：n*m的格子，1表示小岛，求最大小岛面积。

反问

---

- [ ] new/delete、malloc/free
    - [ ] new可以被重载吗
- [ ] static 关键字作用
    - [ ] 各种关键字
- [x] vector底层实现
- [ ] 哈希冲突的解决办法
- [x] 进程和线程的区别
    - [x] 进程中的一个线程出现问题，会有什么影响
    - [ ] 实现一个服务，怎么考虑进程和线程的使用
- [ ] 高并发线程不够用
- [ ] epoll两种模式
- [ ] 进程通信方式，哪个最快
    - [x] 为什么共享内存最快 - 直接在内存存取
- [ ] 虚拟地址怎么映射到物理地址
- [x] TCP和UDP的区别
    - [x] TCP粘包是什么
    - [x] TCP四次挥手
    - [x] TIME_WAIT状态的作用
- [ ] mysql索引底层实现
    - [x] 为什么采用B+树
    - [x] 聚簇索引和非聚簇索引
    - [x] 一个表中可以有多个聚簇索引吗



[解决哈希冲突（四种方法）_君诀的博客-CSDN博客_解决哈希冲突的方法](https://blog.csdn.net/qq_48241564/article/details/118613312)

地址转换 [内存管理概念 | lllllan](http://blog.lllllan.cn/cs-basic/os/wangdao/3/1/#_4-2-基本地址变换机构)



## 字节二面3.30

1. 自我介绍
2. 在校期间有做过什么实习的东西吗
3. 引用和指针的区别
4. 引用可以为空吗
5. const修饰一个引用表示什么意思
6. set的底层是怎么实现的
7. 为什么采用红黑树，为什么不用哈希
    1. [在Java8中为什么要使用红黑树来实现的HashMap？_清风追梦enjoy的博客-CSDN博客_hashmap为什么要用红黑树](https://blog.csdn.net/it_qingfengzhuimeng/article/details/103308308)

8. http协议和https协议的区别
    1. [HTTP和HTTPS | lllllan](http://localhost:8080/cs-basic/network/http-and-https/#http-与-https-区别)

9. https的建连，有几次握手
10. http协议工作在哪一层
    1. 应用层

11. 传输层协议有哪些
    1. tcp、udp

12. http的长连接和短连接
    1. [keep-alive | lllllan](http://localhost:8080/cs-basic/network/keep-alive/)

13. tcp的长连接和短连接
    1. HTTP的长连接和短连接本质上是TCP长连接和短连接

14. 常用的IO模型
15. 什么是IO复用
16. IO多路复用模型的区别
17. select、poll、epoll分别适用于什么场景
18. 了解什么是局部性原理吗
    1. 空间局部性、时间局部性

19. 什么情况会使用局部性原理
20. 使用索引的优点和缺点
    1. 检索快、维护难占空间

21. b+树索引和哈希索引了解吗
    1. [索引 | lllllan](http://localhost:8080/mysql/index/)

22. 实际场景，有一个查询语句select * from table where a>1 and b=1，怎么给a，b建一个联合索引性能比较好
    1. 当遇到范围查询(>、<、between、like)就会停止匹配
    2. 联合索引（b，a）

23. 什么是事务
    1. [事务 | lllllan](http://localhost:8080/mysql/transaction/)

24. 事务有哪些特性
25. Innodb支持哪些隔离级别
    1. [事务 | lllllan](http://localhost:8080/mysql/transaction/#事务隔离级别)

26. 幻读可以举个例子吗
27. MySQL怎么解决幻读问题
28. 什么是间隙锁
29. 间隙锁只有RR级别下才有的吗

做题：大数相乘，字符串模拟

反问

---

- [ ] 引用和指针
    - [ ] 引用可以为空吗
- [ ] const
- [ ] set底层实现
    - [ ] 为什么采用红黑树，而不是哈希
- [ ] http和https
    - [x] https的握手
    - [x] http在哪一层工作
    - [x] http长连接和短连接
    - [ ] tcp长连接和短连接
    - [x] 传输层协议有哪些
- [ ] 常用的IO模型
    - [ ] IO多路复用
    - [ ] IO多路复用模型的区别
    - [ ] select、poll、epoll适用场景
- [ ] 局部性原理
    - [ ] 什么情况下使用局部性原理
- [ ] 索引的优点和缺点
    - [ ] b+树索引和哈希索引
- [ ] `select * from table where a>1 and b=1` 怎么简历联合索引性能好
    - [x] 最左匹配原则

- [ ] 事务
    - [x] 事务特性
- [ ] innodb隔离级别
    - [x] 幻读例子
    - [x] mysql怎么解决幻读
    - [ ] 间隙锁
    - [ ] 间隙锁只有在RR级别下才有吗
- [ ] 大树相乘



## 字节三面4.2

1. map和unordered_map的实现
2. 怎么处理哈希冲突
    1. [常见面试题 | lllllan](http://localhost:8080/java/basic/#哈希冲突的解决办法)

3. 了解哪些程序语言的锁
4. 阻塞到唤醒为什么还会有开销
5. 了解cas吗
    1. [第十章、CAS与原子操作 | lllllan](http://localhost:8080/java/concurrent/2/10/)

6. 怎么实现一个优先级队列
7. 对2000万高考考生的分数进行[排序]()

做题：给m个不重复字符和一个长度为n的字符串，能否在这个字符串中找到一个长度为m的连续子串，使得子串都由上面的m个字符组成。

反问

今天看官网，挂了。。。

---



- [ ] map实现
- [x] 怎么处理哈希冲突
- [ ] java锁
- [ ] 阻塞到唤醒为什么有开销
- [x] cas
- [ ] 怎么实现优先队列
- [ ] 给m个不重复字符和一个长度为n的字符串，能否在这个字符串中找到一个长度为m的连续子串，使得子串都由上面的m个字符组成。
