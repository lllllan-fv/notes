---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 【腾讯】Java岗 暑期实习面经

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: 面经

# 一个页面可以有多个标签
tag:

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 

---



::: warning 

转载自以下文章：

1. [【腾讯】Java岗-暑假实习面经](https://www.iamshuaidi.com/2251.html)
2. [MySQL存储引擎精讲](http://c.biancheng.net/view/2418.html)
2. [Mysql 中 MyISAM 和 InnoDB 的区别有哪些？](https://www.zhihu.com/question/20596402/answer/211492971)

:::



## 一、项目

（应该就是和面试官聊聊自己的项目，做了什么，应用了什么）





## 二、MySQL 存储引擎及使用场景



### 2.1 什么是存储引擎

**数据库引擎是数据库 ==底层软件组织==**

MySQL中的数据用各种不同的技术存储在文件（或者内存）中。这些技术中的每一种技术都使用不同的存储机制、索引技巧、锁定水平并且最终提供广泛的不同的功能和能力。通过选择不同的技术，你能够获得额外的速度或者功能，从而改善你的应用的整体功能。



### 2.2 MySQL 各种存储引擎

|     功能     | MyISAM  | MEMORY  | InnoDB  | Archive |
| :----------: | :-----: | :-----: | :-----: | :-----: |
|   存储限制   |  256TB  |   RAM   |  64TB   |  None   |
|   支持事务   |   No    |   No    | ==Yes== |   No    |
| 支持全文索引 | ==Yes== |   No    |   No    |   No    |
|  支持树索引  |   Yes   |   Yes   |   Yes   |   No    |
| 支持哈希索引 |   No    | ==Yes== |   No    |   No    |
| 支持数据缓存 |   No    |   N/A   | ==Yes== |   No    |
|   支持外键   |   No    |   No    | ==Yes== |   No    |



### 2.3 存储引擎的选择

1. 如果需要提供提交、回滚和恢复的 ==事务安全== 能力，并要求 ==并发控制==  → InnoDB
2. 如果数据表主要用来 ==插入和查询== 记录 → MyISAM
3. 如果只是临时存放数据，==数据量不大==，并且**不需要提高数据的安全性** → MEMORY
4. 如果 ==只有插入和查询== → Archive，支持高并发的插入，但是非事务安全



### 2.4 MyISAM 和 InnoDB 的区别

**区别：**

1. InnoDB 支持事务，MyISAM 不支持事务。这是 MySQL 将默认存储引擎从 MyISAM 编程的 InnoDB 的重要原因之一。
2. InnoDB 支持外键，MyISAM 不支持。
3. InnoDB 事聚集索引，MyISAM 是非聚集索引。
4. InnoDB 不保存表的具体行数，执行 `select count(*) from table` 需要全表扫描。 而 MyISAM 用一个变量保存了整个表的行数，查询行数时速度更快。
5. InnoDB 最小的锁粒度是行锁，MyISAM 最小的锁粒度是表锁。一个更新语句会锁住整张表，导致其他查询和更新都会被阻塞，因此并发访问受限。



**如何选择：**

1. 需要支持事务，InnoDB
2. 主要是查询工作，MyISAM；如果读写也频繁，InnoDB
3. MyISAM 系统崩溃后恢复更困难



## 三、B+树（待学）

B+树是一种树数据结构，通常用于[数据库](https://baike.baidu.com/item/数据库)和[操作系统](https://baike.baidu.com/item/操作系统)的[文件系统](https://baike.baidu.com/item/文件系统)中。B+树的特点是能够保持数据稳定有序，其插入与修改拥有较稳定的[对数](https://baike.baidu.com/item/对数/91326)时间复杂度。B+树元素自底向上插入，这与[二叉树](https://baike.baidu.com/item/二叉树)恰好相反。



## 四、TCP



### 4.1 三次握手

三次握手：为了对每次发送的数据量进行跟踪与协商，**确保数据段的发送和接收同步**，根据所接收到的数据量而确认数据发送、接收完毕后何时撤销联系，并建立虚连接。



具体看 [计算机网络-常见面试题 | lllllan](../../../3-cs-basic/1-network/2-interview-questions/#_2-1-三次握手流程)

1. 客户端向服务器端发送连接请求，`SYN = 1, seq = x`
2. 服务器端接收后返回确认报文，`ACK = 1, SYN = 1, ack = x + 1, seq = y`
3. 客户端再次发送确认，`ACK = 1, ack = y + 1, seq = x + 1`

