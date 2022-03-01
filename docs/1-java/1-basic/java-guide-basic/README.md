---
# 这是页面的图标
icon: page

# 这是文章的标题
title: JavaGuide - Java 基础知识

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- Java基础

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning

本文转载自以下文章，略有改动

- [Java基础常见知识&面试题总结 | JavaGuide](https://javaguide.cn/java/basis/java-basic-questions-01/)
- [java是解释执行吗](https://blog.csdn.net/qq_23191031/article/details/81677057)
- [浅谈JDK、JRE、JVM区别与联系](https://blog.csdn.net/ancientear/article/details/79483592)

:::

## 一 基础概念与常识







## 二、基本语法





## 三、基本数据类型



### 3.0 基本数据类型存放位置

一：在方法中声明的变量，即该变量是局部变量，每当程序调用方法时，系统都会为该方法建立一个方法栈，其所在方法中声明的变量就放在方法栈中，当方法结束系统会释放方法栈，其对应在该方法中声明的变量随着栈的销毁而结束，这就局部变量只能在方法中有效的原因

在方法中声明的变量可以是基本类型的变量，也可以是引用类型的变量。

​     （1）当声明是基本类型的变量的时，其 ==变量名及值（变量名及值是两个概念）是放在方法栈中==

​     （2）当声明的是引用变量时，所声明的 ==变量（该变量实际上是在方法中存储的是内存地址值）是放在方法的栈中==，该变量所指向的 ==对象是放在堆类存中== 的。

二：在类中声明的变量是成员变量，也叫全局变量，放在堆中的（因为全局变量不会随着某个方法执行结束而销毁）。

​    同样在类中声明的变量即可是基本类型的变量 也可是引用类型的变量

​    （1）当声明的是基本类型的变量其 ==变量名及其值放在堆内存中== 的

​    （2）引用类型时，其声明的变量仍然会存储一个内存地址值，该内存地址值指向所引用的对象。==引用变量名和对应的对象仍然存储在相应的堆中==





### 3.1 包装类型的常量池

`Byte`,`Short`,`Integer`,`Long` 这 4 种包装类默认创建了数值 **[-128，127]** 的相应类型的缓存数据，`Character` 创建了数值在 **[0,127]** 范围的缓存数据，`Boolean` 直接返回 `True` or `False`。 



解释来说呢，大概就是以上几种类型中，创建的对象大小在约定的范围之内，该对象会在cache中长生（如果已存在将会复用）。

- 节省内存空间：常量池中所有相同的对象常量被合并，只占用一个空间。
- 节省运行时间：比较字符串时，==比equals()快。对于两个引用变量，只用==判断引用是否相等，也就可以判断实际值是否相等。



## 四、Java面向对象



### 4.1 面向对象和面向过程的区别

-  因为类调用时需要实例化，开销比较大，比较消耗资源，所以当性能是最重要的考量因素的时候，比如单片机、嵌入式开发、Linux/Unix 等一般采用面向过程开发。

-  因为面向对象有封装、继承、多态性的特性，所以可以设计出低耦合的系统，使系统更加灵活、更加易于维护。



::: tip

**面向对象易维护、易复用、易扩展。面向过程性能相对较高。**

:::



### 4.2 成员变量和局部变量的区别

![image-20220116180214826](README.assets/image-20220116180214826.png)



### 4.3 对象实体和对象引用

一个对象引用可以指向 0 个或 1 个对象（一根绳子可以不系气球，也可以系一个气球）;一个对象可以有 n 个引用指向它（可以用 n 条绳子系住一个气球）。



### 4.4 对象相等和引用相等

对象的相等，比的是内存中存放的内容是否相等。而引用相等，比较的是他们指向的内存地址是否相等。



### 4.5 构造方法的特点

1. 名字与类名相同。
2. 没有返回值，但不能用 void 声明构造函数。
3. 生成类的对象时自动执行，无需调用。



::: tip 

构造方法不能被 override（重写）,但是可以 overload（重载）,所以你可以看到一个类中有多个构造函数的情况。

:::



### 4.6 面向对象三大特征



#### 4.6.1 封装

封装是指把一个对象的状态信息（也就是属性）隐藏在对象内部，不允许外部对象直接访问对象的内部信息。但是可以提供一些可以被外界访问的方法来操作属性。



::: tip 封装的好处

- 隐藏实现细节，提供公共的访问方式
- 提高代码的复用性
- 提高安全性（别人不能通过 变量名.属性名 的方式来修改私有的成员属性）

:::



```java
public class Student {
    private int id;//id属性私有化
    private String name;//name属性私有化

    //获取id的方法
    public int getId() { return id; }

    //设置id的方法
    public void setId(int id) { this.id = id; }

    //获取name的方法
    public String getName() { return name; }

    //设置name的方法
    public void setName(String name) { this.name = name; }
}
```



#### 4.6.2 继承

继承是使用已存在的类的定义作为基础建立新类的技术，新类的定义可以增加新的数据或新的功能，也可以用父类的功能，但不能选择性地继承父类。通过使用继承，可以快速地创建新的类，可以提高代码的重用，程序的可维护性，节省大量创建新类的时间 ，提高我们的开发效率。

1. 子类拥有父类对象所有的属性和方法（包括私有属性和私有方法），但是父类中的私有属性和方法子类是无法访问，**只是拥有**。
2. 子类可以拥有自己属性和方法，即子类可以对父类进行扩展。
3. 子类可以用自己的方式实现父类的方法。



::: tip 继承的优点

1. 提高代码的复用性
2. 提高代码的易维护性
3. 提高代码的可扩展性
4. 使代码结构清晰

:::



::: tip 继承的缺点

1. 高耦合性：父子类联系紧密，修改父类的同时，需要兼顾子类
2. 破坏封装性、降低灵活性

:::



#### 4.6.3 多态

表示一个对象具有多种的状态，具体表现为父类的引用指向子类的实例。

- 对象类型和引用类型之间具有继承（类）/实现（接口）的关系；
- 引用类型变量发出的方法调用的到底是哪个类中的方法，必须在程序**运行期间**才能确定；
- 多态不能调用“**只在子类存在但在父类不存在**”的方法；
- 如果子类重写了父类的方法，真正执行的是**子类覆盖**的方法，如果子类没有覆盖父类的方法，执行的是父类的方法。



::: tip 多态存在的必要条件

1. 要有继承
2. 要有重写
3. **父类引用指向子类对象**

::: 



::: tip 多态的好处

1. 提高了代码的可扩展性
2. 可替换性
3. 接口性：向子类提供共同接口，由子类来完善或覆盖
4. 灵活性
5. 简化性

::: 



### 4.7 `String`、`StringBuffer`、`StringBuilder`



#### 4.7.1 `String` 为什么是不可变的

[String为什么不可变 - 梦醒点灯](https://www.cnblogs.com/leskang/p/6110631.html)

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    private final char value[];
	//...
}
```

1. 保存字符串的数组被 `final` 修饰且为私有的，并且`String` 类没有提供/暴露修改这个字符串的方法。
2. `String` 类被 `final` 修饰导致其不能被继承，进而避免了子类破坏 `String` 不可变。



#### 4.7.2 `StringBuffer`、`StringBuilder`

`StringBuilder` 与 `StringBuffer` 都继承自 `AbstractStringBuilder` 类，在 `AbstractStringBuilder` 中也是使用字符数组保存字符串，不过没有使用 `final` 和 `private` 关键字修饰，最关键的是这个 `AbstractStringBuilder` 类还提供了很多修改字符串的方法比如 `append` 方法。

```java
abstract class AbstractStringBuilder implements Appendable, CharSequence {
    char[] value;
    public AbstractStringBuilder append(String str) {
        if (str == null)
            return appendNull();
        int len = str.length();
        ensureCapacityInternal(count + len);
        str.getChars(0, len, value, count);
        count += len;
        return this;
    }
  	//...
}
```



#### 4.7.3 线程安全性



::: tip 

`String`、`StringBuffer` 是线程安全的，`StringBuilder` 非线程安全。

:::



- `String` 中的对象是不可变的，也就可以理解为常量，线程安全。
- `AbstractStringBuilder` 是 `StringBuilder` 与 `StringBuffer` 的公共父类，定义了一些字符串的基本操作，如 `expandCapacity`、`append`、`insert`、`indexOf` 等公共方法。
  - `StringBuffer` 对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的。
  - `StringBuilder` 并没有对方法进行加同步锁，所以是非线程安全的。



#### 4.7.4 性能

`StringBuilder` > `StringBuffer` > `String`

每次对 `String` 类型进行改变的时候，都会生成一个新的 `String` 对象，然后将指针指向新的 `String` 对象。`StringBuffer` 每次都会对 `StringBuffer` 对象本身进行操作，而不是生成新的对象并改变对象引用。相同情况下使用 `StringBuilder` 相比使用 `StringBuffer` 仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。 

1. 操作少量的数据: 适用 `String`
2. 单线程操作字符串缓冲区下操作大量数据: 适用 `StringBuilder`
3. 多线程操作字符串缓冲区下操作大量数据: 适用 `StringBuffer`



### 4.8 `Object` 类的常见方法

```java
//native方法，用于返回当前运行时对象的Class对象，使用了final关键字修饰，故不允许子类重写。
public final native Class<?> getClass()
    
//native方法，用于返回对象的哈希码，主要使用在哈希表中，比如JDK中的HashMap。
public native int hashCode() 
    
//用于比较2个对象的内存地址是否相等，String类对该方法进行了重写用户比较字符串的值是否相等。
public boolean equals(Object obj)
    
//naitive方法，用于创建并返回当前对象的一份拷贝。一般情况下，对于任何对象 x，表达式 x.clone() != x 为true，x.clone().getClass() == x.getClass() 为true。Object本身没有实现Cloneable接口，所以不重写clone方法并且进行调用的话会发生CloneNotSupportedException异常。
protected native Object clone() throws CloneNotSupportedException
    
//返回类的名字@实例的哈希码的16进制的字符串。建议Object所有的子类都重写这个方法。
public String toString()
    
//native方法，并且不能重写。唤醒一个在此对象监视器上等待的线程(监视器相当于就是锁的概念)。如果有多个线程在等待只会任意唤醒一个。
public final native void notify()

//native方法，并且不能重写。跟notify一样，唯一的区别就是会唤醒在此对象监视器上等待的所有线程，而不是一个线程。
public final native void notifyAll()
    
//native方法，并且不能重写。暂停线程的执行。注意：sleep方法没有释放锁，而wait方法释放了锁 。timeout是等待时间。
public final native void wait(long timeout) throws InterruptedException
    
//多了nanos参数，这个参数表示额外时间（以毫微秒为单位，范围是 0-999999）。 所以超时的时间还需要加上nanos毫秒。
public final void wait(long timeout, int nanos) throws InterruptedException
    
//跟之前的2个wait方法一样，只不过该方法一直等待，没有超时时间这个概念
public final void wait() throws InterruptedException
    
//实例被垃圾回收器回收的时候触发的操作
protected void finalize() throws Throwable { }
```



### 4.9 深拷贝和浅拷贝、引用拷贝



::: tip

**浅拷贝**：浅拷贝会在堆上创建一个新的对象（区别于引用拷贝的一点），不过，如果原对象内部的属性是引用类型的话，浅拷贝会直接复制内部对象的引用地址，也就是说拷贝对象和原对象共用同一个内部对象。

**深拷贝** ：深拷贝会完全复制整个对象，包括这个对象所包含的内部对象。

:::



引用拷贝就是两个不同的引用指向同一个对象。

![img](README.assets/shallow&deep-copy.64ee0760.png)



## 五、反射



### 5.1 什么是反射

Java反射就是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意方法和属性；并且能改变它的属性。而这也是Java被视为动态（或准动态，为啥要说是准动态，因为一般而言的动态语言定义是程序运行时，允许改变程序结构或变量类型，这种语言称为动态语言。从这个观点看，Perl，Python，Ruby是动态语言，C++，Java，C#不是动态语言。）语言的一个关键性质。



### 5.2 反射能做什么？

我们知道反射机制允许程序在运行时取得任何一个已知名称的class的内部信息，包括包括其modifiers(修饰符)，fields(属性)，methods(方法)等，并可于运行时改变fields内容或调用methods。那么我们便可以更灵活的编写代码，代码可以在运行时装配，无需在组件之间进行源代码链接，降低代码的耦合度；还有动态代理的实现等等；但是需要注意的是反射使用不当会造成很高的资源消耗！



### 5.3 反射机制优缺点

- **优点** ： 可以让咱们的代码更加灵活、为各种框架提供开箱即用的功能提供了便利
- **缺点** ：让我们在运行时有了分析操作类的能力，这同样也增加了安全问题。比如可以无视泛型参数的安全检查（泛型参数的安全检查发生在编译时）。另外，反射的性能也要稍差点，不过，对于框架来说实际是影响不大的



### 5.4 反射的应用场景

[Java基础知识&面试题总结 | JavaGuide # 反射的应用场景](https://javaguide.cn/java/basis/java基础知识总结/#反射的应用场景)

（看不懂）



## 六、注解

[java 注解-最通俗易懂的讲解](https://zhuanlan.zhihu.com/p/37701743)



### 6.0 注解是什么

**初学者可以这样理解注解：想像代码具有生命，注解就是对于代码中某些鲜活个体的贴上去的一张标签。简化来讲，注解如同一张标签。**



### 6.1 注解的作用

- 提供信息给编译器： 编译器可以利用注解来探测错误和警告信息
- 编译阶段时的处理： 软件工具可以用来利用注解信息来生成代码、Html文档或者做其它相应处理。
- 运行时的处理： 某些注解可以在程序运行的时候接受代码的提取
  值得注意的是，注解不是代码本身的一部分。



### 6.2 注解的语法、定义、运用

暂且不谈，等到练习中认识即可



## 七、异常



### 7.1 异常类层次结构图

在 Java 中，所有的异常都有一个共同的祖先 `java.lang` 包中的 `Throwable` 类。`Throwable` 类有两个重要的子类 `Exception`（异常）和 `Error`（错误）。`Exception` 能被程序本身处理(`try-catch`)， `Error` 是无法处理的(只能尽量避免)。

- **`Exception`** :程序本身可以处理的异常，可以通过 `catch` 来进行捕获。`Exception` 又可以分为 **受检查异常**(必须处理) 和 **不受检查异常**(可以不处理)。

- **`Error`** ：`Error` 属于程序无法处理的错误 ，我们没办法通过 `catch` 来进行捕获 。例如，Java 虚拟机运行错误（`Virtual MachineError`）、虚拟机内存不够错误(`OutOfMemoryError`)、类定义错误（`NoClassDefFoundError`）等 。这些异常发生时，Java 虚拟机（JVM）一般会选择**线程终止**。

  

![img](README.assets/Java异常类层次结构图.png)

![img](README.assets/Java异常类层次结构图2.png)



#### 7.1.1 受检查异常

Java 代码在编译过程中，如果受检查异常没有被 `catch`/`throw` 处理的话，就没办法通过编译 。比如下面这段 IO 操作的代码

![check-exception](README.assets/check-exception.png)



#### 7.1.2 不受检查异常

Java 代码在编译过程中 ，我们即使不处理不受检查异常也可以正常通过编译。

`RuntimeException` 及其子类都统称为非受检查异常，例如：`NullPointerException`、`NumberFormatException`（字符串转换为数字）、`ArrayIndexOutOfBoundsException`（数组越界）、`ClassCastException`（类型转换错误）、`ArithmeticException`（算术错误）等。



### 7.2 Throwable 类常用方法

- **`public String getMessage()`**:返回异常发生时的简要描述
- **`public String toString()`**:返回异常发生时的详细信息
- **`public String getLocalizedMessage()`**:返回异常对象的本地化信息。使用 `Throwable` 的子类覆盖这个方法，可以生成本地化信息。如果子类没有覆盖该方法，则该方法返回的信息与 `getMessage()`返回的结果相同
- **`public void printStackTrace()`**:在控制台上打印 `Throwable` 对象封装的异常信息



### 7.3 try-catch-finally

- **`try`块：** 用于捕获异常。其后可接零个或多个 `catch` 块，如果没有 `catch` 块，则必须跟一个 `finally` 块。
- **`catch`块：** 用于处理 try 捕获到的异常。
- **`finally` 块：** 无论是否捕获或处理异常，`finally` 块里的语句都会被执行。当在 `try` 块或 `catch` 块中遇到 `return` 语句时，**`finally` 语句块将在方法返回之前被执行。**



::: tip

**在以下 3 种特殊情况下，`finally` 块不会被执行：**

1. 在 `try` 或 `finally`块中用了 `System.exit(int)`退出程序。但是，如果 `System.exit(int)` 在异常语句之后，`finally` 还是会被执行

2. 程序所在的线程死亡。

3. 关闭 CPU。

:::



### 7.4 使用 `try-with-resources` 来代替`try-catch-finally`

1. **适用范围（资源的定义）：** 任何实现 `java.lang.AutoCloseable`或者 `java.io.Closeable` 的对象
2. **关闭资源和 finally 块的执行顺序：** 在 `try-with-resources` 语句中，任何 catch 或 finally 块在声明的资源关闭后运行

```java
try (Scanner scanner = new Scanner(new File("test.txt"))) {
    while (scanner.hasNext()) {
        System.out.println(scanner.nextLine());
    }
} catch (FileNotFoundException fnfe) {
    fnfe.printStackTrace();
}
```



## 八、IO流



### 8.1 （反）序列化

理解序列化 -> [序列化理解起来很简单](https://zhuanlan.zhihu.com/p/40462507)

- **序列化**： 将数据结构或对象转换成二进制字节流的过程
- **反序列化**：将在序列化过程中所生成的二进制字节流转换成数据结构或者对象的过程



#### 8.1.1 为什么要序列化？

> 序列化最终的目的是为了对象可以**跨平台存储，和进行网络传输**。

我们进行跨平台存储和网络传输的方式就是IO，而我们的IO支持的数据格式就是字节数组。



因为我们单方面的只把对象转成字节数组还不行，因为没有规则的字节数组我们是没办法把对象的本来面目还原回来的，所以我们必须在把对象转成字节数组的时候就制定一种规则**（序列化）**，那么我们从IO流里面读出数据的时候再以这种规则把对象还原回来**（反序列化）。**

如果我们要把一栋房子从一个地方运输到另一个地方去，**序列化**就是我把房子拆成一个个的砖块放到车子里，然后留下一张房子原来结构的图纸，**反序列化**就是我们把房子运输到了目的地以后，根据图纸把一块块砖头还原成房子原来面目的过程



#### 8.1.2 什么时候需要序列化？

凡是需要进行“跨平台存储”和”网络传输”的数据，都需要进行序列化。

本质上存储和网络传输 都需要经过 把一个对象状态保存成一种跨平台识别的字节格式，然后其他的平台才可以通过字节信息解析还原对象信息。



### 8.2 如果有些字段不想进行序列化（看不懂）

[Java基础知识&面试题总结 | JavaGuide # 如果有些字段不想进行序列化](https://javaguide.cn/java/basis/java基础知识总结/#java-序列化中如果有些字段不想进行序列化-怎么办)



### 8.3 获取用键盘输入常用的两种方法

1. `Scanner`

```java
Scanner input = new Scanner(System.in);
String s  = input.nextLine();
input.close();
```

2. `BufferedReader`

```java
BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
String s = input.readLine();
```



### 8.4 IO流分类

- 按照流的流向分，可以分为输入流和输出流；
- 按照操作单元划分，可以划分为字节流和字符流；
- 按照流的角色划分为节点流和处理流（**对一个已存在的流的连接和封装，通过所封装的流的功能调用实现数据读写**）。

![IO-操作方式分类](README.assets/IO-操作方式分类.png)

![IO-操作对象分类](README.assets/IO-操作对象分类.png)



### 8.5 字符流的意义

**不管是文件读写还是网络发送接收，信息的最小存储单元都是字节，那为什么 I/O 流操作要分为字节流操作和字符流操作呢？**

字符流是由 Java 虚拟机将字节转换得到的，问题就出在这个过程还算是非常耗时，并且，如果我们不知道编码类型就很容易出现乱码问题。所以， I/O 流就干脆提供了一个直接操作字符的接口，方便我们平时对字符进行流操作。如果音频文件、图片等媒体文件用字节流比较好，如果涉及到字符的话使用字符流比较好。