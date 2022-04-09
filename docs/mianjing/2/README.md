---
 # 这是页面的图标
icon: page

# 这是文章的标题
title: 字节|飞书后端|春招

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



[春招 已oc 字节 成都 飞书后端 人力套件 一二三面经_笔经面经_牛客网 (nowcoder.com)](https://www.nowcoder.com/discuss/868973?type=0&order=7&pos=7&page=1&source_id=discuss_center_0_nctrack&channel=1009&ncTraceId=d0a73883bdb740f3968ec2e23effb273.353.16493833740621503&gio_id=C91C10B51FF30120EDE03275F6698FF2-1649383374967)





## 2022.03.19   1面 

1.  项目介绍 
2. [发送方发送fin之后进入什么状态，接收方进入什么状态? ](../../cs-basic/network/interview-questions/#_3-1-四次挥手流程)
3.  [进程通信的方式? ](../../cs-basic/os/def/process-communication/)
4.  什么时候会用到管道
5.  管道的底层原理是什么?
6. socket有使用过吗? 
7.  Java对http1.1 keep-alive的实现，[http的keep-alive和tcp的keepalive](../../cs-basic/network/keep-alive/)
8.  底层如何通过socket传输数据? 如何知道是那个请求的数据? 
9.  讲讲[多路复用](../../cs-basic/os/def/multiplexing/)
10.  mybatis源码?不会 
11.  说一下你对[索引](../../mysql/index/)的理解，聚集索引 和 非聚集索引 
12.  为什么索引会采用B+树? 
13. B+树如何分裂? 
14. 算法题: 找出数据中,满足 prefix 的所有字符串 

---

- [x] TCP挥手
  - [x] 每个包发送之后的状态
- [ ] 进程通信方式
  - [ ] 管道的底层原理 - 看不懂
  - [ ] socket
    - [ ] 底层、怎么知道哪个请求的数据
- [ ] http1.1
  - [ ] http各版本区别
  - [ ] keep-alive 实现，查不到原理啊

- [ ] 多路复用
    - [x] IO多路复用
    - [x] 时分复用
    - [ ] 空分复用

- [ ] 索引理解
  - [ ] 聚簇索引
  - [ ] 非聚簇索引
- [ ] B+树
  - [ ] 为什么是B+ 树
  - [ ] 底层实现
- [ ] 题：满足prefis的所有字符串



##  2面 

1.  自我介绍 
2.  了解linux 嘛
3.  Linux 中 怎么排查对应的程序 占用内存 或者 使用cpu? top
4.  一个请求 从 输入网址到返回
5.  HTTPS加密流程 
6. spring 的设计模式 
7.  IOC 和 AOP
8. JWT加密如何实现?如何预防攻击?
9. 数据库的索引怎么理解?
10.  数据库的隔离级别有哪些?
11. 什么情况下该采用那个级别?
12. Java中的锁有哪些?
13. synchronize锁的升级 和 降级?
14. hashmap的实现
15. hashmap安全嘛? concurrenthashmap
16. 算法题: 括号匹配 

---

- [ ] linux
  - [ ] 排查对应程序 占用内存、使用CPU情况
- [ ] url到页面显示
- [ ] https加密流程
- [ ] spring设计模式
- [ ] ioc、aop
- [ ] JWT加密
  - [ ] 如何实现
  - [ ] 如何预防攻击
- [ ] 索引理解
- [ ] 数据库隔离级别
  - [ ] 怎么选择
- [ ] Java 锁
  - [ ] synchronize锁的升级和降级
- [ ] hashmap实现
  - [ ] 是否安全
  - [ ] concurrentHashMap
- [x] 题：括号匹配





##   3面 

1. 自我介绍 
2. 了解redis嘛? 
3. 手写sql 给两张成绩表 一张数学表 一张英语表(course_score,stu_id) 求每个同学的数学和英语的总成绩
4. 数据库的隔离级别有哪些?
5. RR 和 串行读取有什么区别?
6. 什么场景下该使用什么样的数据库隔离级别? 
7. 算法: https://leetcode-cn.com/problems/search-a-2d-matrix-ii/

---

- [ ] redis
- [ ] 手写sql
- [ ] 数据库隔离级别
  - [ ] RR和串行读区别
  - [ ] 选择
- [ ] 题：搜索二维矩阵 II

