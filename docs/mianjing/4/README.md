---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 字节|后端|实习

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



[已发offer | 字节跳动 后端 实习一二三面_笔经面经_牛客网 (nowcoder.com)](https://www.nowcoder.com/discuss/870251)



3.8投简历，3.9约面试，3.16下午连着走完了三面所有流程，3.21下午HR沟通，半小时后发offer，不得不感叹字节效率是真的高。  



 本人所在部门目前hc还有很多，如果有想实习的同学，欢迎联系我进行内推投递，反馈很快

 

 面试体验极佳，面试官都很有耐心和礼貌，遇到问题时会不断地引导。

 下面记录一下面试内容：

#  **一面:** 

1. HashMap和ConcurrentHashMap，说一下扩容过程，有什么区别。
    1. [HashMap 源码解读 | lllllan](http://blog.lllllan.cn/java/container/source-code/hashmap/)
    2. [ConcurrentHashMap 源码解读 | lllllan](http://blog.lllllan.cn/java/container/source-code/concurrent-hashmap/)

2. Java的泛型如何实现？泛型擦除是什么
    1. [面试官问我：“泛型擦除是什么，会带来什么问题？” - 云+社区 - 腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1649866)

3. java的类加载为什么要使用双亲委派机制
    1. [JVM 常见问题 | lllllan](http://blog.lllllan.cn/java/jvm/#双亲委派机制)
    2. 避免一个类的重复加载
    3. 保护框架需要加载的类不会被应用程序覆盖

4. 挖项目，问数据库表和字段的设计（有点紧张，说得很磕巴）
5. 说一下MySQL事务隔离级别，默认的级别是什么？是否解决了幻读？如何解决？MVCC如何实现？
    1. [事务 | lllllan](http://blog.lllllan.cn/mysql/transaction/)
    2. [MVCC | lllllan](http://blog.lllllan.cn/mysql/mvcc/)

6. MySQL主从复制了解吗，如果让你设计，你会如何实现？（直说没了解，想了半天也没有想出来如何设计，面试官不断引导，奈何本人不争气）
7. 说一下https和http区别，说一下握手过程（这里说得比较详细，从非对称加密开始讲起
8. time_wait是什么？如何解决？（结合项目中实际遇到的问题，也说得很详细）
9. Spring如何解决循环依赖？（没遇到过，没有了解
10. 算法题：第一题是lc983，没做出来，表示不擅长动态规划。然后换成了根据前序和中序序列重建二叉树。

 以为要凉，结果面试官让我等等，马上二面，我有点懵逼。

 一面过程中非常紧张，然而还是给过了。。感谢面试官。  

---

- [ ] 各种map的扩容过程
    - [x] hashMap
    - [ ] ConcurrentHashMap
- [ ] Java泛型
    - [ ] 如何实现
    - [ ] 泛型擦除
- [x] 双亲委派机制
- [ ] MySQL事务隔离级别
    - [x] 默认级别
    - [x] 怎么解决幻读
    - [x] mvcc
- [ ] MySQL主从复制
- [ ] http和https
    - [x] 握手过程
- [x] time_wait、如何解决
- [ ] spring循环依赖
- [ ] 算法
    - [ ] lc983
    - [ ] 重建二叉树



#  **二面:** 

1. 了解Flink吗？用过什么算子？（说了一下Flink架构，还有常见的几个算子
2. 了解JVM吗？说一说G1GC的过程，和CMS的区别。
3. 了解Linux网络模型吗？（ 没答上来，只说了个epoll
4. 了解微服务吗？组件有什么？（我说不了解，但他还是追问，我就说了SpringCloud的那些组件
5. 了解k8s吗？了解云原生吗？（我说我了解docker，他说docker只是个容器。我说云原生没有很确切的概念，他说没错，看来你看过相关的。。
6. 了解AQS吗？（讲了一下AQS的源码，比较满意）
7. 了解java内存模型吗？说说volatile底层原理。（讲了一下JMM，内存读写屏障）
    1. [第六章、Java内存模型基础知识 | lllllan](http://blog.lllllan.cn/java/concurrent/2/6/)

8. 项目中遇到什么问题？如何解决？（说了一些技术细节
9. 算法题：最长回文子串，求x的算术平方根，验证一个树是否为另一个的子树。

反问环节：有什么建议？（让我别紧张，大家都是这么过来的，多面几次就好了，听到这话我以为凉了，然后让我等通知，后续有面试的话会通知我。洗了把脸准备出门，出门5分钟就被通知马上三面，有点懵逼）  

---

- [ ] Flink
- [ ] G1和CMS的GC过程、区别
- [ ] linux网络模型
- [ ] 微服务、组件
- [ ] k8s、云原生
- [ ] AQS
- [ ] java内存模型
    - [x] JMM
    - [ ] volatile底层
    - [ ] 内存读写屏障
- [ ] 算法
    - [ ] 最长回文子串
    - [ ] 算数平方根
    - [ ] 子树



#  **三面：** 

1. 先介绍项目，然后做了一道SQL索引设计题，没什么难度。
2. 算法题，镜像二叉树
3. 自主命题，把List结构转换成树结构
4.  然后继续问项目中遇到的困难，如何解决
5. 问能否接受更换语言？Go
6. 最后开始聊人生。

---

- [ ] SQL索引设计
- [ ] 镜像二叉树



#  offer 

 3.21下午接到HR电话，介绍了一下福利、地点等，沟通了入职时间，已收到offer。
