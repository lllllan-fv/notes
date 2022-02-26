---
# 这是页面的图标
icon: page

# 这是文章的标题
title: TikTok 后端开发-国际化电商-深圳

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

转载自 [面试经验｜个人秋招经验和面筋分享](https://leetcode-cn.com/circle/discuss/JlrHm3/)、[剖析Linux内核文件系统之（inode）](https://zhuanlan.zhihu.com/p/385384549)

:::



## 一面 7月20 1h30min



### 1.1 Linux 文件系统相关



#### 1.1.1 inode结构

> inode(发音：eye-node)译成中文就是[索引节点](https://baike.baidu.com/item/索引节点/4506518)，它用来存放档案及目录的基本信息，包含时间、档名、使用者及群组等。

以下内容转载自 [剖析Linux内核文件系统之（inode）](https://zhuanlan.zhihu.com/p/385384549)

![image-20220226213956826](README.assets/image-20220226213956826.png)



*inode* 是 UNIX 操作系统中的一种数据结构，其本质是结构体，它包含了与文件系统中各个文件相关的一些重要信息:

- inode 编号
- 用来识别文件类型，以及用于 stat C 函数的模式信息
- 文件的链接数目
- 属主的ID (UID)
- 属主的组 ID (GID)
- 文件的大小
- 文件所使用的磁盘块的实际数目
- 最近一次修改的时间 
- 最近一次访问的时间
- 最近一次更改的时间



#### 1.1.2 软硬连接



#### 1.1.3 文件描述符是什么，怎么去修改，最多允许多少？

