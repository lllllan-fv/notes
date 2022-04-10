---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 常见面试题

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- Java 多线程

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning 转载声明

- [如何正确地停止一个线程？ - 王晓符 - 博客园 (cnblogs.com)](https://www.cnblogs.com/greta/p/5624839.html)
- [notify() 和 notifyAll() 有什么区别？_ConstXiong的博客-CSDN博客_notifyall](https://blog.csdn.net/meism5/article/details/90238268)

:::



## 如何停止一个线程



### stop

stop()方法以及作废，因为如果强制让线程停止有可能使一些清理性的工作得不到完成。另外一个情况就是对锁定的对象进行了解锁，导致数据得不到同步的处理，出现数据不一致的问题。

```java
public class MyThread extends Thread {
    private int i = 0;
    public void run(){
        super.run();
        try {
            while (true){
                System.out.println("i=" + i);
                i++;
                Thread.sleep(200);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

public class Run {
    public static void main(String args[]) throws InterruptedException {
        Thread thread = new MyThread();
        thread.start();
        Thread.sleep(2000);
        thread.stop();
    }
}
```



### interrupt

interrupt()方法的使用效果并不像for+break语句那样，马上就停止循环。调用interrupt方法是在当前线程中打了一个停止标志，并不是真的停止线程。

因此可以使用interrupt配合条件判断或者异常捕捉使用，当检查到线程被interrupt，即可退出循环，让线程结束。

```java
public class MyThread extends Thread {
    public void run(){
        super.run();

        while(true) {
            System.out.println(getName() + " is running");
            
            tru {
                sleep(1000);
            } catch(InterruptedException e) {
                System.out.println("被停止");
                break;
            }
        }

    }
}

public class Run {
    public static void main(String args[]) throws InterruptedException {
        Thread thread = new MyThread();
        thread.start();
        Thread.sleep(2000);
        thread.stop();
    }
}
```



## notify 和 notifyAll

[notify() 和 notifyAll() 有什么区别？_ConstXiong的博客-CSDN博客_notifyall](https://blog.csdn.net/meism5/article/details/90238268)

先解释两个概念。

- 锁池：获得锁的线程能够执行，没有获得锁的线程则在锁池中争夺这个锁。
- 等待池：某个线程获得锁之后，调用了 wait() 方法，则会进入等待池。进入等待池的线程不会去争夺锁。



区别：notify() 方法随机唤醒对象的等待池中的一个线程，进入锁池；notifyAll() 唤醒对象的等待池中的所有线程，进入锁池。

只是调入锁池，但是一定只有一个线程能够获得锁并执行。
