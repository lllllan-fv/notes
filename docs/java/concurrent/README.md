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
- [65. SynchronizedMap 和 ConcurrentHashMap 有什么区别？_江湖@小小白的博客-CSDN博客](https://blog.csdn.net/zhu_fangyuan/article/details/110455386)

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



## sleep 和 wait

[sleep和wait的区别](1/5/#_5-2-sleep方法)



sleep是Thread的方法，可以在任意位置使用，让线程睡眠。

wait是Object的方法，必须在同步块/同步方法中使用。wait方法是让当前获得锁的线程释放锁，因此必须在同步块/同步方法中使用，确保该线程获得了锁。

```java
synchronized (lock) {
    try {
        System.out.println("before wait");
        
        lock.wait();

        // 进入等待被唤醒之后，会从这里重新执行
        System.out.println("after wait");
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```



## wait 和 notify 必须要在同步块中调用

1. 这些方法都是对象级别的，时从锁出发去执行的方法。因此只有获得了独占锁的线程，才能够去调用该对象的方法
2. 如果不这么做，就会抛出 `IllegalMonitorStateException`
3. 为了避免 wait 和 notify 之间产生竞态条件



## volatile ★

[volatile](2/8/)



### 内存可见性

因为每个线程在自己私有的工作内存中对共享变量有一份拷贝（类的（静态）成员变量），所以当一个线程试图修改一个成员变量的时候，其实只修改了自己工作内存中的拷贝，其他线程不能知道这次修改。这就是不可见性

使用 volatile 修饰以后，当一个线程试图修改一个成员变量，会同时修改主内存中的值；当其他线程试图获取这个成员变量，也会到主内存中重新读取。这就是保证可见性



### 禁止重排序

计算机在执行程序时，为了提高性能，编译器和处理器常常会对指令做重排。

但是在多线程下，这个重排序可能会导致一些问题，见 [禁止重排序 | 多线程下重排序的危害](2/8/#_2-2-禁止重排序)

使用 volatile 修饰以后，会对重排序做一定的限制。



## interrupted 和 isInterrupted ★

```java
public static boolean interrupted() {
    return currentThread().isInterrupted(true);
}

public boolean isInterrupted() {
    return isInterrupted(false);
}

private native boolean isInterrupted(boolean ClearInterrupted);
```



看源代码，两个方法都会调用同一个方法 `isInterrupted(boolean ClearInterrupted)`，返回值是该线程的中断标识。

区别在于，调用 `interrupted()` 方法会清楚中断状态，而 `isInterrupted()` 方法并不会。



## synchronized 和 ReentrantLock ★

不太懂。[Java锁](3/14/)



他们都是加锁方式同步，而且都是阻塞式的同步。当一个线程获得了对象锁，进入了同步块，其他访问该同步块的线程都必须阻塞在同步块外面等待。



ReentrantLock提供了一些功能：

1. 等待可中断。持有锁的线程长期不释放的时候，正在等待的线程可以选择放弃等待，相对于synchronized来说可以避免出现死锁的情况
2. 公平锁。ReentrantLock默认是非公平锁，可以通过参数设为公平锁（多个线程等待同一个锁时必须按照申请锁的时间顺序来获得锁），但是性能不是很好。
3. 锁绑定多个条件。一个ReentrantLock对象可以同时绑定多个对象



## SynchronizedMap 和 ConcurrentMap ▲

（还有点小问题）

[65. SynchronizedMap 和 ConcurrentHashMap 有什么区别？_江湖@小小白的博客-CSDN博客](https://blog.csdn.net/zhu_fangyuan/article/details/110455386)



1. SynchronizedMap 一次锁住整张表来保证线程安全，所以每次只能有一个线程来访问Map.
2. ConcurrentHashMap 中则是一次锁住一个桶。ConcurrentHashMap 默认将 hash 表分为 16 个桶，诸如get、put、remove 等常用操作只锁当前需要用到的桶。这样，原来只能一个线程进入，现在却能同时有 16 个写线程执行，并发性能的提升是显而易见的。
3. 另外 ConcurrrentHashMap 使用一种不同的迭代方式。在这种迭代方式中，当 iterator 被创建后集合再发生改变就不再是抛出 ConcurrentModificationException，取而代之的是在改变 new 新的数据从而不影响原有的数据，iterator 完成后再将头指针替换为新的数据，这样 iterator 线程可以使用原来老的数据，而写线程也可以并发的完成改变。

