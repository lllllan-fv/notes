---
# 这是页面的图标
icon: page

# 这是文章的标题
title: HTTP和HTTPS

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

- [HTTP 与 HTTPS 的区别 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/http-vs-https.html)
- [《图解HTTP》HTTPS](../diagram-http/7/)
- [HTTPS加密（握手）过程](https://www.jianshu.com/p/e30a8c4fa329)
- [HTTP/1.0、HTTP/1.1、HTTP/2、HTTPS - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/43787334)
- [一文读懂 HTTP/2 特性 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/26559480)
- [刨根问底系列之https到底是如何防篡改的？面试必备 - 掘金 (juejin.cn)](https://juejin.cn/post/6845166890675863559#comment)

:::



## 基本概念



### HTTP

**HTTP**（HyperText Transfer Protocol：超文本传输协议）是一种用于分布式、协作式和超媒体信息系统的应用层协议。 简单来说就是一种发布和接收 HTML 页面的方法，被用于在 Web 浏览器和网站服务器之间传递信息。

HTTP 默认工作在 TCP 协议 80 端口，用户访问网站 **http://** 打头的都是标准 HTTP 服务。

HTTP 协议以明文方式发送内容，不提供任何方式的数据加密，如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，因此，HTTP协议不适合传输一些敏感信息，比如：信用卡号、密码等支付信息。



### HTTPS

[刨根问底系列之https到底是如何防篡改的？面试必备 - 掘金 (juejin.cn)](https://juejin.cn/post/6845166890675863559#comment)

**HTTPS**（Hypertext Transfer Protocol Secure：超文本传输安全协议）是一种透过计算机网络进行安全通信的传输协议。HTTPS 经由 HTTP 进行通信，但利用 SSL/TLS 来加密数据包。HTTPS 开发的主要目的，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。

HTTPS 默认工作在 TCP 协议443端口，它的工作流程一般如以下方式：

- 1、TCP 三次同步握手
- 2、客户端验证服务器数字证书
- 3、DH 算法协商对称加密算法的密钥、hash 算法的密钥
- 4、SSL 安全加密隧道协商完成
- 5、网页以加密的方式传输，用协商的对称加密算法和密钥加密，保证数据机密性；用协商的hash算法进行数据完整性保护，保证数据不被篡改。



## HTTP不同版本之间的区别



### HTTP/1.0 和 HTTP/1.1

1. **缓存处理**：HTTP/1.0 使用 `Pragma:no-cache + Last-Modified/If-Modified-Since`来作为缓存判断的标准；HTTP/1.1 引入了更多的缓存控制策略：`Cache-Control`、`Etag/If-None-Match`等。

2. **错误状态管理**：HTTP/1.1新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。

3. **部分请求**：HTTP/1.1 在请求头引入了 `range` 头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接，支持断点续传。

4. **Host**头：HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。有了Host字段，就可以将请求发往同一台服务器上的不同网站，为虚拟主机的兴起打下了基础。

5. **长连接**：HTTP/1.1 最大的变化就是引入了持久连接（persistent connection），在HTTP/1.1中默认开启 `Connection: keep-alive`，即TCP连接默认不关闭，可以被多个请求复用。

    客户端和服务器发现对方一段时间没有活动，就可以主动关闭连接。不过，规范的做法是，客户端在最后一个请求时，发送Connection: close，明确要求服务器关闭TCP连接。客户端和服务器发现对方一段时间没有活动，就可以主动关闭连接。不过，规范的做法是，客户端在最后一个请求时，发送`Connection: close`，明确要求服务器关闭TCP连接。

6. **管道机制**：HTTP/1.1中引入了管道机制（pipelining），即在同一个TCP连接中，客户端可以**同时**发送多个请求



::: note HTTP/1.1 的缺点

HTTP/1.1 的持久连接和管道机制允许复用TCP连接，在一个TCP连接中，也可以同时发送多个请求，但是所有的数据通信都是按次序完成的，服务器只有处理完一个回应，才会处理下一个回应。比如客户端需要A、B两个资源，管道机制允许浏览器同时发出A请求和B请求，但服务器还是按照顺序，先回应A请求，完成后再回应B请求，这样如果前面的回应特别慢，后面就会有很多请求排队等着，这称为“队头阻塞（Head-of-line blocking）”

:::



### HTTP/2.0

[一文读懂 HTTP/2 特性 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/26559480)



HTTP/2以Google发布的SPDY协议为基础，于2015年发布。它不叫HTTP/2.0，因为标准委员会不打算再发布子版本了，下一个新版本将是HTTP/3。HTTP/2协议只在HTTPS环境下才有效，升级到HTTP/2，必须先启用HTTPS。HTTP/2解决了HTTP/1.1的性能问题，主要特点如下：



1. **二进制分帧**：HTTP/1.1的头信息是文本（ASCII编码），数据体可以是文本，也可以是二进制；HTTP/2 头信息和数据体都是二进制，统称为【帧】：头信息帧和数据帧；
2. **多路复用**（双工通信）：通过单一的 HTTP/2 连接发起多重的请求-响应消息，即在一个连接里，客户端和浏览器都可以同时发送多个请求和响应，而不用按照顺序一一对应，这样避免了【队头堵塞】。HTTP/2 把 HTTP 协议通信的基本单位缩小为一个一个的帧，这些帧对应着逻辑流中的消息。并行地在同一个 TCP 连接上双向交换消息。
3. **数据流**：因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的回应。因此，必须要对数据包做标记，指出它属于哪个回应。HTTP/2 将每个请求或回应的所有数据包，称为一个数据流（stream）。每个数据流都有一个独一无二的**编号**。数据包发送的时候，都必须标记数据流ID，用来区分它属于哪个数据流。另外还规定，客户端发出的数据流，ID一律为奇数，服务器发出的，ID为偶数。数据流发送到一半的时候，客户端和服务器都可以发送信号（`RST_STREAM`帧），取消这个数据流。HTTP/1.1取消数据流的唯一方法，就是关闭TCP连接。这就是说，HTTP/2 可以取消某一次请求，同时保证TCP连接还打开着，可以被其他请求使用。客户端还可以指定数据流的优先级。优先级越高，服务器就会越早回应。
4. **首部压缩**：HTTP 协议不带有状态，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。HTTP/2 对这一点做了优化，引入了头信息压缩机制（header compression）。一方面，头信息压缩后再发送（SPDY 使用的是通用的DEFLATE 算法，而 HTTP/2 则使用了专门为首部压缩而设计的 HPACK 算法）。；另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了。
5. **服务端推送**：HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送（server push）。常见场景是客户端请求一个网页，这个网页里面包含很多静态资源。正常情况下，客户端必须收到网页后，解析HTML源码，发现有静态资源，再发出静态资源请求。其实，服务器可以预期到客户端请求网页后，很可能会再请求静态资源，所以就主动把这些静态资源随着网页一起发给客户端了。





## HTTP 与 HTTPS 区别

- HTTP 明文传输，数据都是未加密的，安全性较差，HTTPS（SSL+HTTP） 数据传输过程是加密的，安全性较好。
- 使用 HTTPS 协议需要到 CA（Certificate Authority，数字证书认证机构） 申请证书，一般免费证书较少，因而需要一定费用。证书颁发机构如：Symantec、Comodo、GoDaddy 和 GlobalSign 等。
- HTTP 页面响应速度比 HTTPS 快，主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，而 HTTPS除了 TCP 的三个包，还要加上 ssl 握手需要的 9 个包，所以一共是 12 个包。
- http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。
- HTTPS 其实就是建构在 SSL/TLS 之上的 HTTP 协议，所以，要比较 HTTPS 比 HTTP 要更耗费服务器资源。



## HTTPS工作流程

[HTTPS协议详解(四)：TLS/SSL握手过程_hherima的博客-CSDN博客_ssl握手](https://blog.csdn.net/hherima/article/details/52469674)

[刨根问底系列之https详细握手过程 - 掘金 (juejin.cn)](https://juejin.cn/post/6847902219745181709)



![img](README.assets/173272d3c783474atplv-t2oaga2asx-zoom-in-crop-mark1304000.awebp)



1. ==客户端发起握手请求 client_hello==

    以明文传输请求信息，包含

    - TLS版本信息
    - 随机数（用于后续的密钥协商）random_C
    - 加密套件候选列表
    - 压缩算法候选列表
    - 扩展字段等信息 

2. ==服务端发送 server_hello 返回协商的信息结果==

    - 选择使用的TLS协议版本
    - 随机数 random_S
    - 选择的加密套件 cipher suite
    - 选择的压缩算法 compression method

3. ==服务端发送证书==

    服务器端配置对应的证书链，用于身份验证和密钥交换

4. ==服务端发送Server Hello Done==

    通知客户端 server_hello 信息发送结束

5. 客户端验证证书的合法性，包括可信性，是否吊销，过期时间和域名

6. ==客户端发送.client_key_exchange + change_cipher_spec + encrypted_handshake_message==

    - **client_key_exchange**，合法性验证通过之后，客户端计算产生随机数字 Pre-master，并用证书公钥加密，发送给服务器。两个明文随机数 random_C 和 random_S 与自己计算产生的 Pre-master，计算得到协商密钥 ` enc_key=Fuc(random_C, random_S, Pre-Master)`
    - **change_cipher_spec**，客户端通知服务器后续的通信都采用协商的通信密钥和加密算法进行加密通信
    - **encrypted_handshake_message**，结合之前所有通信参数的 hash 值与其它相关信息生成一段数据，采用协商密钥 session secret 与算法进行加密，然后发送给服务器用于数据与握手验证

7. ==服务端发送change_cipher_spec + encrypted_handshake_message==

    - 服务器用私钥解密加密的 Pre-master 数据，基于之前交换的两个明文随机数 random_C 和 random_S，计算得到协商密钥：`enc_key=Fuc(random_C, random_S, Pre-Master)`
    - 计算之前所有接收信息的 hash 值，然后解密客户端发送的 encrypted_handshake_message，验证数据和密钥正确性;
    - change_cipher_spec, 验证通过之后，服务器同样发送 change_cipher_spec 以告知客户端后续的通信都采用协商的密钥与算法进行加密通信
    -  encrypted_handshake_message, 服务器也结合所有当前的通信参数信息生成一段数据并采用协商密钥 session secret 与算法加密并发送到客户端

8. 握手结束

    - 客户端计算所有接收信息的 hash 值，并采用协商密钥解密 encrypted_handshake_message，验证服务器发送的数据和密钥，验证通过则握手完成;



::: note 山寨版总结

1. 客户端请求握手 client_hello
2. 服务端发送 server_hello
3. 服务端发送证书
4. 服务端发送 server_hello_down
5. 客户端验证证书，使用随机数计算接下来传输使用的共享密钥（看上面，是几次随机数计算出来的），使用证书中的公钥对共享密钥进行加密，发送给服务端
6. 服务端使用已知的随机数计算出共享密钥，与客户端发送过来的密钥进行比较，验证正确性。
7. 双方确认之后使用共享密钥对数据进行加密后通信

:::



## SSL/TLS

[SSL/TLS原理详解 - 云+社区 - 腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1115445)

[一篇文章让你彻底弄懂SSL/TLS协议 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/133375078)

