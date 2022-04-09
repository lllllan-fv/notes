---
 # 这是页面的图标
icon: page

# 这是文章的标题
title: 字节|抖音直播支付|日常实习

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



[字节跳动 抖音直播支付 日常实习面经 (已oc)_笔经面经_牛客网 (nowcoder.com)](https://www.nowcoder.com/discuss/816404?type=2&order=3&pos=1&page=2&source_id=discuss_tag_nctrack&channel=-1&ncTraceId=54dc7a9f0e894e9eba08bb844d43d679.4532.16487083812994999&gio_id=C04414E246388416475DED5620E560A6-1648708382329)



学历双非本科，大一打过算法比赛，后来学的java方向，学长帮我推的抖音直播。三轮面试官和hr都非常nice，因为才第二次面试，三轮都非常紧张，面试官会引导我说，直到我了解的最深的地方。 





## 一面: 

1. 自我介绍 x 1 
2. 项目深挖(整体架构，技术对比和选择原因，负载均衡策略，几种io模型，这块比较熟悉说了很多，面试官也没有打断，还追问了epoll具体实现，触发方式等) 
3. [hashmap原理](../../java/container/source-code/hashmap/),扩容,问了我hashmap怎么缩容(这里应该说红黑树退化链表的，hashmap没有缩容，我还以为自己记错了😭) 
4. hashtable hashmap synchronizedmap concurrentmap(细说，这里我紧张，面试官开始引导我，爱了！！！) 
5. [代理模式](../../framework/design-pattern/agent/) （静态动态，动态的两种方式及区别，cglib缺点我说了final和首次字节码生成的效率） 
6. 快排归并，区别，手撕时间复杂度推导 
7. 思维题：两个人轮流扔硬币，谁先扔正面谁赢，求先抛的人赢得概率(淦，这里理解错题意了，就是简单的等比数列求和加极限就能做) 
8. 算法题：排列组合

----



- [ ] HashMap 扩容、退化
    - [x] 基本的put和get
    - [ ] 红黑树相关的操作

- [ ] Java各类Map对比
- [x] 代理模式
    - [x]  代理模式概念，静态代理、动态代理（JDK动态代理、CGlib动态代理）
    - [x]  两种代理的区别





## 二面: 

1. 自我介绍x2 
2. 看你第一个项目聊了很多，这次说说第二个项目(麻了，第二个项目是一个落地的crud,只问了5分钟不太感兴趣就没再问) 
3. 经典题~从输入url到显示页面的过程(这里提了dns,tcp连接,http协议，然后开始追问，把这几个玩意都细讲了) 
4. [dns解析出错，怎么排查错误]([dns错误怎么解决？怎么排查及解决dns解析故障？-贝锐花生壳官网 (oray.com)](https://hsk.oray.com/news/7898.html))
5. tcp,udp 
6. [http,https,https理解，秘钥交换过程](../../cs-basic/network/http-and-https/)
7. 口述几个sql语句 
8. mysql索引(这里说了b+树，感觉面试官问的是唯一索引聚集索引那些，理解错意思x2) 
9. 创建索引的原则(区分度，是否是查询时使用，插入性能和读取性能权衡，减少回表) 
10. ACID(每个都问了细节) 
11. [MVCC](../../mysql/mvcc/) 
12. 用过的设计模式(提了项目里的代理模式，aqs的模板方法模式) 
13. spring,springmvc中代理模式用在哪些地方 
14. aop 
15. 思维题 ： [如何实现稳定的快速排序](../../ds-and-algorithms/algorithms/sort/unstable-quick-sort/)、 对一个省上百万考生的考试成绩排序 要求o(n)  交叉链表找交叉节点 
16. 算法题：数组峰值元素 

---



- [x] 从输入url到页面显示的详细过程
- [x] dns解析出错（查不到太具体的答案）
- [ ] http、https，密钥
  - [x] http、https的区别
  - [x] https请求过程
  - [ ] SSL、TLS

- [ ] sql语句
- [ ] mysql索引
- [ ] 创建索引的原则
- [x] ACID
- [x] MVCC
- [ ] 设计模式
- [ ] spring中的代理模式
- [ ] aop
- [x] 稳定快排



[细说Spring——AOP详解（AOP概览）_Jivan2233的博客-CSDN博客_aop](https://blog.csdn.net/q982151756/article/details/80513340)





## 三面: 

1. 自我介绍x3 
2. 介绍项目 
3. netty作用，自己的理解，组件(我明明记了很多！没说出来，我不李姐) 
4. 项目整体流程(三面项目问的很短，直接开始做题了还以为被挂了，慌得一b) 
5. 算法题：[两个有序数组找第k小元素要求时间复杂度o(logn)]([4. 寻找两个正序数组的中位数 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)) 、 二叉树从根节点到叶子结点和为k的所有路径 

---



- [ ] netty
- [x] 两个有序数组第k小元素



 唠嗑，聊学习方式，顺便问基础知识，三面后面还问了很多基础知识，挺广的，从csrf,xss到sql注入一大堆。三面当时没记面经，靠回忆8太记得了 
三面主要是知识的深度广度还有场景题，ld面确实很顶 

 

## hr面: 

自我介绍x4 
略😂😂😂
