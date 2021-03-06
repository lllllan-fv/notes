---
# 这是页面的图标
icon: page

# 这是文章的标题
title: TCP 常见面试题

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

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





::: warning 转载声明

- [4.6 如何理解是 TCP 面向字节流协议？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/tcp_stream.html)
- [4.7 为什么 TCP 每次建立连接时，初始化序列号都要不一样呢？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/isn_deff.html)
- [4.9 已建立连接的TCP，收到SYN会发生什么？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/challenge_ack.html)
- [4.10 四次挥手中收到乱序的 FIN 包会如何处理？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/out_of_order_fin.html)
- [4.11 在 TIME_WAIT 状态的 TCP 连接，收到 SYN 后会发生什么？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/time_wait_recv_syn.html)
- [4.12 TCP 连接，一端断电和进程崩溃有什么区别？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/tcp_down_and_crash.html)
- [4.13 拔掉网线后， 原本的 TCP 连接还存在吗？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/tcp_unplug_the_network_cable.html)

:::



## TCP 面向字节流

==TCP 是面向字节流的协议，UDP 是面向报文的协议==



::: info UDP

当用户消息通过 UDP 协议传输时，**操作系统不会对消息进行拆分**，在组装好 UDP 头部后就交给网络层来处理，所以发出去的 UDP 报文中的数据部分就是完整的用户消息，也就是每个 UDP 报文就是一个用户消息的边界，这样接收方在接收到 UDP 报文后，读一个 UDP 报文就能读取到完整的用户消息。

:::



当用户消息通过 TCP 协议传输时，**消息可能会被操作系统分组成多个的 TCP 报文**，也就是一个完整的用户消息被拆分成多个 TCP 报文进行传输。这时，接收方的程序如果不知道发送方发送的消息的长度，也就是不知道消息的边界时，是无法读出一个有效的用户消息的。



> 至于什么时候真正被发送，**取决于发送窗口、拥塞窗口以及当前发送缓冲区的大小等条件**。也就是说，我们不能认为每次 send 调用发送的数据，都会作为一个整体完整地消息被发送出去。



### 粘包

当两个消息的某个部分内容被分到同一个 TCP 报文时，就是我们常说的 TCP 粘包问题，这时接收方不知道消息的边界的话，是无法读出有效的消息。



一般有三种方式分包的方式：

- 固定长度的消息；
- 特殊字符作为边界；
- 自定义消息结构。



#### 固定长度的消息

这种是最简单方法，即每个用户消息都是固定长度的，比如规定一个消息的长度是 64 个字节，当接收方接满 64 个字节，就认为这个内容是一个完整且有效的消息。

但是这种方式灵活性不高，实际中很少用。



#### 特殊字符作为边界

我们可以在两个用户消息之间插入一个特殊的字符串，这样接收方在接收数据时，读到了这个特殊字符，就把认为已经读完一个完整的消息。

HTTP 是一个非常好的例子。

![图片](README.assets/a49a6bb8cd38ae1738d9c00aec68b444.png)

HTTP 通过设置回车符、换行符作为 HTTP 报文协议的边界。

有一点要注意，这个作为边界点的特殊字符，如果刚好消息内容里有这个特殊字符，我们要对这个字符转义，避免被接收方当作消息的边界点而解析到无效的数据。



#### 自定义消息结构

我们可以自定义一个消息结构，由包头和数据组成，其中包头包是固定大小的，而且包头里有一个字段来说明紧随其后的数据有多大。

比如这个消息结构体，首先 4 个字节大小的变量来表示数据长度，真正的数据则在后面。

```c
struct { 
    u_int32_t message_length; 
    char message_data[]; 
} message;
```

当接收方接收到包头的大小（比如 4 个字节）后，就解析包头的内容，于是就可以知道数据的长度，然后接下来就继续读取数据，直到读满数据的长度，就可以组装成一个完整到用户消息来处理了。



## 不同的初始化序列号

TCP 每次建立连接时，初始化序列号都要不一样。 ==主要原因是为了防止历史报文被下一个相同四元组的连接接收。==



假如我某次连接中某个数据包被网络阻塞了。而当这个数据包达到接收方的时候，此时已经不是原来的连接了，而是断开以后、重新建立的新的 TCP 连接，只是恰巧双方的 IP 地址和端口号都和上一次连接相同。

此时这个数据包到达接收方以后，如果使用序列号，和当前通信过程中的某个数据包的序列号重叠，将发生数据错乱。



详细的看 [4.7 为什么 TCP 每次建立连接时，初始化序列号都要不一样呢？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/isn_deff.html)



## SYN 报文什么情况会被丢弃

没有很懂 [4.8 SYN 报文什么时候情况下会被丢弃？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/syn_drop.html)



## 已经建立连接的TCP收到SYN

一个已经建立的 TCP 连接，客户端中途宕机了，而服务端此时也没有数据要发送，一直处于 establish 状态，客户端恢复后，向服务端建立连接，此时服务端会怎么处理？

- 如果端口号和历史连接不相同，就会建立一个新的连接
- 如果端口号和历史连接相同，服务器返回一个携带正确 ack 的报文，客户端检查发现序列号对不上，回复 RST 报文断开连接



### 端口号和历史连接不相同

如果客户端恢复后发送的 SYN 报文中的源端口号跟上一次连接的源端口号不一样，此时服务端会认为是新的连接要建立，于是就会通过三次握手来建立新的连接。



对于旧的 TCP 连接，如果服务端一直没有发送数据包给客户端，在超过一段时间后， TCP 保活机制就会启动，检测到客户端没有存活后，接着服务端就会释放掉该连接。



### 端口号和历史连接相同

每次建立连接的时候，SYN 报文中的序列号是随机生成的。处于 establish 的服务器，在接收到这个随机的序列号之后，会回复一个携带正确学历好的 ACK 报文， `Challenge ACK`

客户端收到 `Challenge ACK` 之后，发现序列号不是期望收到的，就会回复 RST 报文，服务器接收到后会释放连接。



![img](README.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5bCP5p6XY29kaW5n,size_20,color_FFFFFF,t_70,g_se,x_16.png)



## 挥手过程中收到乱序的 FIN

先明确一点，在握手过程中，双方第一个序列号是随机生成 的。通信过程中的序列号则是连续的。



==所以如果在挥手过程中，客户端收到了服务器的 FIN，但是发现序列号不连续，则认定存在发送但未到达的数据包，会等待数据接收完毕之后才会进入 `TIME_WAIT` 阶段。==



![img](README.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5bCP5p6XY29kaW5n,size_20,color_FFFFFF,t_70,g_se,x_16-16508607352363.png)



## TIME_WAIT 期间收到 SYN

> - 合法 SYN：客户端的 SYN 的「序列号」比服务端「期望下一个收到的序列号」要**大**，**并且** SYN 的「时间戳」比服务端「最后收到的报文的时间戳」要**大**。
> - 非法 SYN：客户端的 SYN 的「序列号」比服务端「期望下一个收到的序列号」要**小**，**或者** SYN 的「时间戳」比服务端「最后收到的报文的时间戳」要**小**。



- 收到合法 SYN，重用此链接，跳过 TIME_WAIT，进入 SYN_RECV 状态
- 收到非法 SYN，回复第四次挥手的 ACK 报文，客户端接收后返回 RST 报文



### 收到合法 SYN

![图片](README.assets/39d0d04adf72fe3d37623acff9ae2507.png)



### 收到非法 SYN

![图片](README.assets/642a6699c0234da3444e96805dddcc09.png)



### 收到 RST 

处于 TIME_WAIT 状态的连接，收到 RST 会断开连接吗？

会不会断开，关键看 `net.ipv4.tcp_rfc1337` 这个内核参数（默认情况是为 0）：

- 如果这个参数设置为 0， 收到 RST 报文会提前结束 TIME_WAIT 状态，释放连接。
- 如果这个参数设置为 1， 就会丢掉 RST 报文。



## TCP连接中，电脑断电和进程崩溃

- TCP 连接的一方突然断电，另一方是不知道的。
- TCP 连接的一方进程突然崩溃， ==操作系统可以感知得到，会向另一方发送 FIN 报文，进行四次挥手==





### 连接一方宕机以后，仍有数据传输

- 如果一方宕机以后又迅速重启，在接收到数据包以后， ==会向另一方发送 RST 报文，另一方接收到以后会断开连接==
- 如果宕机以后没有重启，发送方会进行超时重传，直到 ==达到「最大重传次数」或者「最大超时时间」这两个的其中一个条件后，就会停止重传==



## 拔网线对TCP连接的影响

==拔掉网线并不会改变客户端的 TCP 连接状态，并且还是处于 ESTABLISHED 状态==



- 如果有数据传输
    - 网线不插回去，发送方会进行超时重传，当重传次数达到上限以后就会断开连接
    - 网线插回去之后还是能够正常通信
- 如果没有数据传输
    - 如果开启了保活机制，在规定时间内一直没有响应，另一方就会断开连接
    - 如果没有开启保活机制，将一直保持连接状态



## 保活机制

定义一个时间段，在这个时间段内，如果没有任何连接相关的活动，TCP 保活机制会开始作用，每隔一个时间间隔，发送一个探测报文，该探测报文包含的数据非常少，如果连续几个探测报文都没有得到响应，则认为当前的 TCP 连接已经死亡，系统内核将错误信息通知给上层应用程序。



```
net.ipv4.tcp_keepalive_time=7200
net.ipv4.tcp_keepalive_intvl=75  
net.ipv4.tcp_keepalive_probes=9
```



- tcp_keepalive_time = 7200：表示保活时间是 7200 秒（2小时），也就 2 小时内如果没有任何连接相关的活动，则会启动保活机制
- tcp_keepalive_intvl = 75：表示每次检测间隔 75 秒；
- tcp_keepalive_probes = 9：表示检测 9 次无响应，认为对方是不可达的，从而中断本次的连接。

也就是说在 Linux 系统中，最少需要经过 2 小时 11 分 15 秒才可以发现一个「死亡」连接。



## tcp_tw_reuse 为什么默认是关闭的

哈哈好难 [4.14 tcptwreuse 为什么默认是关闭的？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/tcp_tw_reuse_close.html)



## HTTPS中TLS和TCP能同时握手吗

[4.14 HTTPS 中 TLS 和 TCP 能同时握手吗？ | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/network/3_tcp/tcp_tls.html)

