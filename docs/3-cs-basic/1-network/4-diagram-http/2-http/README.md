---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 第二章、简单的HTTP协议

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: 计算机基础

# 一个页面可以有多个标签
tag:
- 计算机网络
- 图解HTTP

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 


---



::: warning

本文作为 《图解HTTP》 的笔记，绝大部分内容均抄自该书。

:::



## 一、HTTP 协议用于客户端和服务器之间的通信



![image-20220227091206726](README.assets/image-20220227091206726.png)



## 二、通过请求和响应的交换达成信息



### 2.1 由客户端发出请求

HTTP 协议规定，请求从客户端发出，最后服务器端响应该请求并返回。即肯定是先从客户端开始建立通信，服务器端在没有接收到请求之前不会发送响应。

![image-20220227091444975](README.assets/image-20220227091444975.png)



### 2.2 请求报文和响应报文

![image-20220227091739545](README.assets/image-20220227091739545.png)

![image-20220227091905174](README.assets/image-20220227091905174.png)

![image-20220227091954558](README.assets/image-20220227091954558.png)



## 三、HTTP 是不保存状态的协议

**HTTP 是一种不保存状态，即无状态协议。**

HTTP 协议自身不对请求和响应之间的通信状态进行保存，也就是说在 HTTP 这个级别，协议对于发送过的请求或处理都不做持久化处理。

![image-20220227092619787](README.assets/image-20220227092619787.png)

HTTP 协议本身并不保留之前一切的请求或响应报文的信息，是为了更快地处理大量事务，确保协议的可伸缩性。而特意把HTTP协议设计成如此简单。

随着 Web 的发展，网站为了能够掌握是谁发出的请求，需要爆粗你用户的状态，于是引入了 Cookie  技术。



## 四、请求 URI 定位资源

![image-20220227093559141](README.assets/image-20220227093559141.png)



## 五、告知服务器意图的 HTTP 方法



### 5.1 GET 获取资源

**GET 方法用来请求访问已被 URI 识别的资源。**

![image-20220227093903573](README.assets/image-20220227093903573.png)



### 5.2 POST 传输实体主体

**POST 方法用来传输实体的主体。**

![image-20220227094258190](README.assets/image-20220227094258190.png)

![image-20220227094312733](README.assets/image-20220227094312733.png)

虽然 POST 的功能和 GET 相似，但是 POST 的主要目的不是获取响应的主体内容。



### 5.3 PUT 传输文件

**PUT 方法用来传输文件。**



::: tip 鉴于 `HTTP/1.1` 的 PUT 方法自身不带验证机制，任何人都可以上传文件，存在安全性问题，因此一般的 Web 网站不适用该方法。

:::



![image-20220227094641387](README.assets/image-20220227094641387.png)



### 5.4 HEAD 获得报文首部

**HEAD 方法用于确认 URI 的有效性及资源更新的日期时间等**

![image-20220227101248661](README.assets/image-20220227101248661.png)



### 5.5 DELETE 删除文件

**DELETE 方法按请求 URI 删除指定的资源**

![image-20220227101428213](README.assets/image-20220227101428213.png)

![image-20220227101441751](README.assets/image-20220227101441751.png)

::: tip HTTP/1.1 的 DELETE 方法本身和 PUT 方法一样不带验证机制，同样有安全性问题，所以一般的 Web 网站也不使用 DELETE 方法

:::



### 5.6 OPTIONS 询问支持的方法

**OPTIONS 方法用来查询针对请求 URI 指定的资源支持的方法。**

![image-20220227101655531](README.assets/image-20220227101655531.png)



### 5.7 TRACE 追踪路径

**TRACE 方法是让 Web 服务器端将之前的请求通信环会给客户端的方法。**

![image-20220227101820954](README.assets/image-20220227101820954.png)



### 5.8 CONNECT 要求用隧道协议连接代理

**CONNECT 方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行 TCP 通信。**

主要使用 SSL（Secure Sockets Layer，安全套接层） 和 TLS（Transport Layer Security，传输层安全）协议把通信内容加密后经网络隧道传输。

![image-20220227102117671](README.assets/image-20220227102117671.png)



### 方法总结

![image-20220227102152508](README.assets/image-20220227102152508.png)