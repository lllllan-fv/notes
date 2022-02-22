---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 从输入 url 网址到显示页面的过程

# 设置作者
author: lllllan

# 设置写作时间
time: 2022-2-22

# 一个页面只能有一个分类
category: 计算机基础

# 一个页面可以有多个标签
tag:
- 计算机网络
- 面试题

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning

本文转载自 [前端经典面试题: 从输入URL到页面加载发生了什么？ - SegmentFault 思否](https://segmentfault.com/a/1190000006879700)，略有改动

:::



## 从输入 url 到页面显示发生了什么

总体来说分为以下几个过程:

1. DNS解析
2. TCP连接
3. 发送HTTP请求
4. 服务器处理请求并返回HTTP报文
5. 浏览器解析渲染页面
6. 连接结束



