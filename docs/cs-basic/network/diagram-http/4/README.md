---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 第四章、Http状态码

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



## 一、状态码告知从服务器返回的请求结果

![image-20220312143535794](README.assets/image-20220312143535794.png)

![image-20220312143606430](README.assets/image-20220312143606430.png)



## 二、2XX 成功



### 200 OK

![image-20220312143852661](README.assets/image-20220312143852661.png)



### 204 No Content

![image-20220312144027275](README.assets/image-20220312144027275.png)



### 206 Partical Content

![image-20220312144154578](README.assets/image-20220312144154578.png)



## 三、3XX 重定向



### 301 Moved Permanently

![image-20220312144429807](README.assets/image-20220312144429807.png)



### 302 Found

![image-20220312144620679](README.assets/image-20220312144620679.png)



### 303 See Other

![image-20220312144755166](README.assets/image-20220312144755166.png)



::: tip

![image-20220312144816542](README.assets/image-20220312144816542.png)

:::



### 304 Not Modified

![image-20220312145005364](README.assets/image-20220312145005364.png)



### 307 Temporary Redirect

![image-20220312145120022](README.assets/image-20220312145120022.png)



## 四、客户端错误



### 400 Bad Request

![image-20220312145224621](README.assets/image-20220312145224621.png)



### 401 Unauthorized

表示发送的请求需要有通过 Http 认证的认证信息。如果之前请求过一次，则表示用户认证失败

![image-20220312145322171](README.assets/image-20220312145322171.png)



### 403 Forbidden

![image-20220312145525501](README.assets/image-20220312145525501.png)



### 404 Not Found

![image-20220312145618848](README.assets/image-20220312145618848.png)



## 五、5XX 服务器错误



### 500 Internal Server Error

![image-20220312145810119](README.assets/image-20220312145810119.png)



### 503 Service Unavailable

![image-20220312145905292](README.assets/image-20220312145905292.png)

