---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 第六章、Http 首部

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



::: warning 转载声明

- 《图解HTTP》 

:::





## 一、HTTP 报文首部

**HTTP协议的请求报文和响应报文中必定包含HTTP首部**

![image-20220315081406241](README.assets/image-20220315081406241.png)



### 请求报文

HTTP 请求报文中报文首部由 **方法、URI、HTTP版本、HTTP首部字段等部分** 构成

![image-20220315081628361](README.assets/image-20220315081628361.png)



### 响应报文

HTTP 响应报文中报文首部由 **HTTP版本、状态码（数字和原因短语）、HTTP首部** 三部分构成

![image-20220315081816767](README.assets/image-20220315081816767.png)



## 二、HTTP 首部字段



### 2.1 HTTP 首部字段传递重要信息

![image-20220315082122552](README.assets/image-20220315082122552.png)



### 2.2 HTTP 首部字段结构

HTTP 首部字段是由首部字段名和字段值构成，中间用冒号分隔。

```java
// 首部字段名:字段值
    
Content-Type: text/html
Keep-Alive: timeout=15, max=100
```



::: tip HTTP 首部字段重复会怎么样

这种情况在规范内尚未明确，根据浏览器内部逻辑不同，结果可能不同。

:::



### 2.3 四种HTTP首部字段类型



**通用首部字段**

请求和响应报文都会使用的首部

----



**请求首部字段**

从客户端向服务器发送请求报文时使用的首部。

----



**响应首部字段**

从服务器向客户端返回响应报文时使用的首部。

---



**实体首部字段**

针对请求报文和响应报文的实体部分使用的首部。



### 2.4 首部字段一览

HTTP/1.1 规范定义了47种首部字段。太多了自行百度。



### 2.5 非首部字段

比如 Cookie、Set-Cookie、Content-Disposition等



### 2.6 End-to-end 首部和 Hop-by-hop 首部

HTTP首部字段将定义成缓存代理和非缓存代理的行为，分成两种类型：



**端到端首部 End-to-end**

此类别中的首部会转发给请求/响应对应的 ==最终接收目标，且必须保存在由缓存生成的响应中，另外规定他必须被转发==

---



**逐跳首部**

此类别的首部 ==只对单次转发有效== ，会因为通过缓存和代理而不再转发。HTTP/1.1 和之后的版本要求提供 Connection 首部字段



## 三、通用首部字段



### 3.1 Cache-Control

![image-20220315084027826](README.assets/image-20220315084027826.png)



表示是否能缓存的指令：

```java
Cache-Control: public   // 可以缓存
Cache-Control: private  // 只以特定用户为对象。缓存服务器会对该特定用户提供缓存资源的服务、其他用户不行
    
Cache-Control: no-cache // 客户端的no-cache表示不接受缓存
    					// 服务器端的no-cache表示不允许缓存
```



其他很多指令，暂略。



### 3.2 Connection

- 控制不再转发给代理的首部字段
- 管理持久连接

![image-20220315085019624](README.assets/image-20220315085019624.png)

---



![image-20220315085052151](README.assets/image-20220315085052151.png)

---



![image-20220315085144036](README.assets/image-20220315085144036.png)



### 3.3 其他字段概览

**Date**

![image-20220315085254170](README.assets/image-20220315085254170.png)

---



**Pragma**

![image-20220315085355485](README.assets/image-20220315085355485.png)

---



**Trailer**

![image-20220315085439849](README.assets/image-20220315085439849.png)

---



**Transfer-Encoding**

![image-20220315085517992](README.assets/image-20220315085517992.png)

---



**Upgrade**

![image-20220315085700533](README.assets/image-20220315085700533.png)

---



**Via**

![image-20220315085753639](README.assets/image-20220315085753639.png)

---



**Warning**

![image-20220315090210633](README.assets/image-20220315090210633.png)



## 四、其他首部 

太多了先不管
