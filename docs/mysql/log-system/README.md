---
# 这是页面的图标
icon: page

# 这是文章的标题
title: MySQL 日志系统

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: 数据库

# 一个页面可以有多个标签
tag:

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 


---



::: warning 转载声明

- [MySQL实战45讲 (gitee.io)](https://funnylog.gitee.io/mysql45/iframe/)
- [MySQL之Redo log - 简书 (jianshu.com)](https://www.jianshu.com/p/d13b3c98ce30)
- [详细分析MySQL事务日志(redo log和undo log) - 骏马金龙 - 博客园 (cnblogs.com)](https://www.cnblogs.com/f-ck-need-u/p/9010872.html#!comments) ★

:::



执行更新语句会涉及到两个重要的日志模块：redo log（重做日志）和 binlog（归档日志）。





## redo log



::: danger redo log 是提升MySQL效率的同时保证数据持久化的物理日志

:::



### 提升效率

首先我们先明确一下 InnoDB 的修改数据的基本流程，当我们想要修改 DB 上某一行数据的时候，==InnoDB 是把数据从磁盘读取到内存的缓冲池上进行修改==。

这个时候数据在内存中被修改，与磁盘中相比就存在了差异，我们称这种有差异的数据为**脏页**。==InnoDB 对脏页的处理不是每次生成脏页就将脏页刷新回磁盘，这样会产生海量的 IO 操作==，严重影响 InnoDB 的处理性能。

既然脏页与磁盘中的数据存在差异，那么如果在这期间 DB 出现故障就会造成数据的丢失。为了解决这个问题，redo log 就应运而生了。每次都修改都将内容写进 redo log，事后有时间再更新到磁盘当中。



### 数据持久化

写内存要比写磁盘更快，所以 redo log 有一部分在内存当中。每次对数据修改只要写入 redo log 的内存部分，能够提升很多性能。但如果只是存在内存当中，发生故障的时候这个 redo log 照样也会丢失。

实际上，redo log 包括两部分：==重做日志缓冲（redo log buffer）== ，这部分日志是易失性的， ==重做日志文件（redo log file）== ，这部分日志是持久的。

==想要保证持久化，就需要将数据/日志写到磁盘当中== ，否则一出故障内存中的数据都会一起丢失。也就是说必须以损耗一定性能的代价，去保证数据的持久化。InnoDB 会采取一定的策略，将 buffer 中的日志写入到磁盘文件当中。如果某时刻出现故障，事后只要到 redo log file 中逐一将日志内容更新到数据库当中即可。



::: info 都是要写入磁盘，那还要 redo log 干嘛

区别就在于，数据库中的修改，你需要找到具体的位置对具体的信息进行修改。

如果是日志，你只要将这次修改的信息写到文件末即可。

:::



### log file

[详细分析MySQL事务日志(redo log和undo log) - 骏马金龙 - 博客园 (cnblogs.com)](https://www.cnblogs.com/f-ck-need-u/p/9010872.html#auto_id_2)

在概念上，innodb 通过 **force log at commit** 机制实现事务的持久性，即在事务提交的时候，必须先将该事务的所有事务日志写入到磁盘上的 redo log file 和 undo log file 中进行持久化。

为了确保每次日志都能写入到事务日志文件中，在每次将 log buffer 中的日志写入日志文件的过程中都会调用一次操作系统的 fsync 操作（即fsync()系统调用）。因为 MariaDB/MySQL 是工作在用户空间的，而 log buffer 处于用户空间的内存中。要写入到磁盘上的 log file 中，中间还要经过操作系统内核空间的 os buffer，调用 fsync() 的作用就是将 OS buffer 中的日志刷到磁盘上的 log file 中。

![img](README.assets/733013-20180508101949424-938931340.png)



::: danger log file

在此处需要注意一点，一般所说的 log file 并不是磁盘上的物理日志文件，而是 ==操作系统缓存中的 log file==，官方手册上的意思也是如此（例如：With a value of 2, the contents of the **InnoDB log buffer are written to the log file** after each transaction commit and **the log file is flushed to disk approximately once per second**）。但说实话，这不太好理解，既然都称为 file 了，应该已经属于物理文件了。所以在本文后续内容中都以 os buffer 或者 file system buffer 来表示官方手册中所说的 Log file，然后 log file 则表示磁盘上的物理日志文件，即log file on disk。

:::



### 刷盘策略



MySQL支持用户自定义在 commit 时如何将 log buffer 中的日志刷 log file 中。

这种控制通过变量 `innodb_flush_log_at_trx_commit` 的值来决定。该变量有3种值：0、1、2，默认为1。但注意，这个变量只是控制 commit 动作是否刷新 log buffer 到磁盘。

- 当设置为 1 的时候，==事务每次提交都会将 log buffer 中的日志写入 os buffer 并调用 fsync() 刷到磁盘的 log file 中==。这种方式即使系统崩溃也不会丢失任何数据，但是因为每次提交都写入磁盘，IO 的性能较差。
- 当设置为 0 的时候，事务提交时不会将 log buffer 中日志写入到 os buffer，而是 ==每秒写入 os buffer 并调用 fsync() 写入到磁盘的 log file 中== 。也就是说设置为0时是(大约)每秒刷新写入到磁盘中的，当系统崩溃，会丢失1秒钟的数据。
- 当设置为 2 的时候，==每次提交都仅写入到 os buffer，然后是每秒调用 fsync() 将 os buffer 中的日志写入到磁盘的 log file 中==。

![img](README.assets/733013-20180508104623183-690986409.png)



::: tip 其实值为2和0的时候，它们的差距并不太大，但2却比0要安全的多。

:::



::: warning 问自己

1. redo log 中记录什么，修改是以什么形式记录下来的
2. checkpoint
3. log sequence number



有点复杂，暂时不深究

:::



## binlog

redo log 是 InnoDB 引擎特有的日志，而 Server 层也有自己的日志，称为 binlog（归档日志）。



因为最开始 MySQL 里并没有 InnoDB 引擎。MySQL 自带的引擎是 MyISAM，但是 MyISAM 没有 crash-safe 的能力，binlog 日志只能用于归档。而 InnoDB 是另一个公司以插件形式引入 MySQL 的，既然只依靠 binlog 是没有 crash-safe 能力的，所以 InnoDB 使用另外一套日志系统——也就是 redo log 来实现 crash-safe 能力。



::: tip 

1. redo log 是 InnoDB 引擎特有的；binlog 是 MySQL 的 Server 层实现的，所有引擎都可以使用。
2. redo log 是物理日志，记录的是【在某个数据页上做了什么修改】；binlog 是逻辑日志，记录的是这个语句的原始逻辑，比如【给 ID = 2 这一行的 c 字段加 1】。
3. redo log 是循环写的，空间固定会用完；binlog 是可以追加写入的。【追加写】是指 binlog 文件写到一定大小后会切换到下一个，并不会覆盖以前的日志。

:::



