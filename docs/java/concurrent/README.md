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
- [看完你就明白的锁系列之自旋锁 - 程序员cxuan - 博客园 (cnblogs.com)](https://www.cnblogs.com/cxuanBlog/p/11679883.html)
- [拜托，线程间的通信真的很简单。 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/138689342)
- [什么是上下文切换_有关心情的博客-CSDN博客_上下文切换](https://blog.csdn.net/qq_41359051/article/details/89673188)
- [送命题：进程切换与线程切换的区别 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/258956479)
- [Java 什么是守护线程 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/107649830)

:::



## 上下文切换 ▲

[什么是上下文切换_有关心情的博客-CSDN博客_上下文切换](https://blog.csdn.net/qq_41359051/article/details/89673188)

[送命题：进程切换与线程切换的区别 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/258956479)

还是有点模糊，稍后再看。





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



## 线程通信

[线程通信方式](1/5/)

[拜托，线程间的通信真的很简单。 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/138689342)



通信大体可以分为【共享内存】、【消息传递】和【管道流】

- 共享内存：
    - volatile修饰的变量
    - 临界区

- 消息传递：
    - 等待/通知机制：使用锁的 `wait()` 和 `notify()` 来阻塞和唤醒线程。
    - join：阻塞当前线程去执行另一线程x，直到x的执行结束之后才会接触当前线程的阻塞。
- 管道输入输出：



## 线程安全

如果你的代码在多线程下执行和在单线程下执行永远都能获得一样的结果，那么这个代码就是线程安全的。



1. 不可变。像String、Integer、Long这些，都是final类型的类，任何一个线程都改变不了它们的值，要改变除非新创建一个，因此这些不可变对象不需要任何同步手段就可以直接在多线程环境下使用
2. 绝对线程安全。不管运行时环境如何，调用者都不需要额外的同步措施。要做到这一点通常需要付出许多额外的代价，Java中标注自己是线程安全的类，实际上绝大多数都不是线程安全的，不过绝对线程安全的类，Java中也有，比方说CopyOnWriteArrayList、CopyOnWriteArraySet
3. 相对线程安全。相对线程安全也就是我们通常意义上所说的线程安全，像 Vector 这种，add、remove方法都是原子操作，不会被打断，但也仅限于此，如果有个线程在遍历某个Vector、有个线程同时在add这个Vector，99% 的情况下都会出现 `ConcurrentModificationException`，也就是 fail-fast 机制。
4. 非线程安全。这个就没什么好说的了，ArrayList、LinkedList、HashMap等都是线程非安全的类



### 线程安全需要保证的特性

- 原子性。线程的操作中途不会被其他线程干扰，需要通过同步机制实现。
- 可见性。某个线程修改了共享变量，需要立即通知到其他线程。
- 有序性。保证线程内串行语义，避免指令重排序。



## 线程方法



### notify 和 notifyAll

[notify() 和 notifyAll() 有什么区别？_ConstXiong的博客-CSDN博客_notifyall](https://blog.csdn.net/meism5/article/details/90238268)

先解释两个概念。

- 锁池：获得锁的线程能够执行，没有获得锁的线程则在锁池中争夺这个锁。
- 等待池：某个线程获得锁之后，调用了 wait() 方法，则会进入等待池。进入等待池的线程不会去争夺锁。



区别：notify() 方法随机唤醒对象的等待池中的一个线程，进入锁池；notifyAll() 唤醒对象的等待池中的所有线程，进入锁池。

只是调入锁池，但是一定只有一个线程能够获得锁并执行。



### sleep 和 wait

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



### yield

Yield方法可以暂停当前正在执行的线程对象，让其它有相同优先级的线程执行。它是一个静态方法而且只保证当前线程放弃CPU占用而不能保证使其它线程一定能占用CPU，执行yield()的线程有可能在进入到暂停状态后马上又被执行。



### wait 和 notify 必须要在同步块中调用

1. 这些方法都是对象级别的，时从锁出发去执行的方法。因此只有获得了独占锁的线程，才能够去调用该对象的方法
2. 如果不这么做，就会抛出 `IllegalMonitorStateException`
3. 为了避免 wait 和 notify 之间产生竞态条件



### interrupted 和 isInterrupted ★

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



## synchronized 和锁 ★

synchronized 关键字解决的是多个线程之间访问资源的同步性，synchronized 关键字可以保证被它修饰的方法或者代码块在任意时刻只能有一个线程执行。



[synchronized和锁](2/9/)

Java 早期版本 synchronized 属于重量级锁，效率底下。Java 6 为了减少获得锁和释放锁带来的性能消耗，引入了【偏向锁】和【轻量级锁】。



::: info 自旋锁

当一个线程尝试去获取某一把锁的时候，如果这个锁此时已经被别人获取（占用），那么此线程就无法获取到这把锁，该线程将会等待，间隔一段时间后会再次尝试获取。这种采用循环加锁 -> 等待的机制被称为【自旋锁(spinlock)】

自旋锁尽可能的减少线程的阻塞，这对于锁的竞争不激烈，且占用锁时间非常短的代码块来说性能能大幅度的提升，因为自旋的消耗会小于线程阻塞挂起再唤醒的操作的消耗，这些操作会导致线程发生两次上下文切换！

但是如果锁的竞争激烈，或者持有锁的线程需要长时间占用锁执行同步块，这时候就不适合使用自旋锁了，因为自旋锁在获取锁前一直都是占用 cpu 做无用功，占着 XX 不 XX，同时有大量线程在竞争一个锁，会导致获取锁的时间很长，线程自旋的消耗大于线程阻塞挂起操作的消耗，其它需要 cpu 的线程又不能获取到 cpu，造成 cpu 的浪费。所以这种情况下我们要关闭自旋锁。

:::



::: note 自适应锁

自适应锁就是自适应的自旋锁，自旋的时间不是固定时间，而是由前一次在同一个锁上的自旋时间和锁的持有者状态来决定。

简单来说就是线程如果自旋成功了，则下次自旋的次数会更多，如果自旋失败了，则自旋的次数就会减少。

:::



::: info 偏向锁

> 当第一个线程获取锁，或者在没有其他线程占用锁的时候，此时的锁是偏向锁。

偏向锁在资源无竞争情况下消除了同步语句，连CAS操作都不做了，提高了程序的运行性能

:::



::: note 轻量级锁

> 当多个线程竞争同一把锁的时候，偏向锁会升级为轻量级锁。

线程通过自旋来获取锁。消耗cpu，但是减少了线程阻塞挂起再唤醒的消耗。

::: 



::: info 重量级锁

> 线程长时间的自旋依然不能得到锁就会导致锁升级为重量级锁。

获取不到锁的线程会被阻塞挂起，等待占有锁的线程执行完之后来唤醒他们。

:::



### synchronized 和 ReentrantLock ★

不太懂。[Java锁](3/14/)



他们都是加锁方式同步，而且都是阻塞式的同步。当一个线程获得了对象锁，进入了同步块，其他访问该同步块的线程都必须阻塞在同步块外面等待。



ReentrantLock提供了一些功能：

1. 等待可中断。持有锁的线程长期不释放的时候，正在等待的线程可以选择放弃等待，相对于synchronized来说可以避免出现死锁的情况
2. 公平锁。ReentrantLock默认是非公平锁，可以通过参数设为公平锁（多个线程等待同一个锁时必须按照申请锁的时间顺序来获得锁），但是性能不是很好。
3. 锁绑定多个条件。一个ReentrantLock对象可以同时绑定多个对象



### SynchronizedMap 和 ConcurrentMap ▲

（还有点小问题）

[65. SynchronizedMap 和 ConcurrentHashMap 有什么区别？_江湖@小小白的博客-CSDN博客](https://blog.csdn.net/zhu_fangyuan/article/details/110455386)



1. SynchronizedMap 一次锁住整张表来保证线程安全，所以每次只能有一个线程来访问Map.
2. ConcurrentHashMap 中则是一次锁住一个桶。ConcurrentHashMap 默认将 hash 表分为 16 个桶，诸如get、put、remove 等常用操作只锁当前需要用到的桶。这样，原来只能一个线程进入，现在却能同时有 16 个写线程执行，并发性能的提升是显而易见的。
3. 另外 ConcurrrentHashMap 使用一种不同的迭代方式。在这种迭代方式中，当 iterator 被创建后集合再发生改变就不再是抛出 ConcurrentModificationException，取而代之的是在改变 new 新的数据从而不影响原有的数据，iterator 完成后再将头指针替换为新的数据，这样 iterator 线程可以使用原来老的数据，而写线程也可以并发的完成改变。



## 悲观锁和乐观锁

[乐观锁 & 悲观锁 & CAS](2/10/)



## CAS ★

[CompareAndSwap](2/10/)



## volatile ★

[volatile](2/8/)



### 内存可见性

因为每个线程在自己私有的工作内存中对共享变量有一份拷贝（类的（静态）成员变量），所以当一个线程试图修改一个成员变量的时候，其实只修改了自己工作内存中的拷贝，其他线程不能知道这次修改。这就是不可见性

使用 volatile 修饰以后，当一个线程试图修改一个成员变量，会同时修改主内存中的值；当其他线程试图获取这个成员变量，也会到主内存中重新读取。这就是保证可见性



### 禁止重排序

计算机在执行程序时，为了提高性能，编译器和处理器常常会对指令做重排。

但是在多线程下，这个重排序可能会导致一些问题，见 [禁止重排序 | 多线程下重排序的危害](2/8/#_2-2-禁止重排序)

使用 volatile 修饰以后，会对重排序做一定的限制。



## 线程池 ★

线程池原理、执行流程、拒绝策略，[线程池](3/12/)

线程池如何使用 —— 线程池的好处 —— 线程池的启动策略



### 线程池的优点

1. 降低资源的消耗。线程本身是一种资源，创建和销毁线程会有CPU开销，线程池可以**复用已创建的线程**。
2. 提高任务执行的响应速度。任务执行时，可以不必等到线程创建完之后再执行。
3. 方便线程并发数的管控。线程若是无限制的创建，不仅会额外消耗大量系统资源，更是占用过多资源而阻塞系统或oom等状况，从而降低系统的稳定性。线程池能有效管控线程，统一分配、调优，提供资源使用率
4. 更强大的功能，线程池提供了定时、定期以及可控线程数等功能的线程池，使用方便简单。



### 常用线程池

- newSingleThreadExecutor：创建一个单线程的线程池，此线程池保证所有任务的执行顺序按照任务的提交顺序执行。 
- newFixedThreadPool：创建固定大小的线程池，每次提交一个任务就创建一个线程，直到线程达到线程池的最大大小。 
- newCachedThreadPool：创建一个可缓存的线程池，此线程池不会对线程池大小做限制，线程池大小完全依赖于操作系统（或者说JVM）能够创建的最大线程大小。 
- newScheduledThreadPool：创建一个大小无限的线程池，此线程池支持定时以及周期性执行任务的需求。 



### 线程池方法 submit() 和 execute()

- 两个方法都可以向线程池提交任务。
- execute() 方法的返回类型是 void，它定义在 Executor 接口中。而 submit() 方法可以返回持有计算结果的 Future 对象，它定义在 ExecutorService 接口中，它扩展了 Executor 接口
- 其它线程池类像 ThreadPoolExecutor 和 ScheduledThreadPoolExecutor 都有这些方法。



### 常用队列

[阻塞队列](3/13/)

- `ArrayBlockingQueue`，基于数组结构的有界阻塞队列，按先进先出原则进行排序
- `LinkedBlockingQueue`，基于链表的阻塞队列，按照先进先出排序元素，吞吐量高于 ArrayBlocklingQueue
- `SynchronousQueue`，不存储元素的阻塞队列
- `PriorityBlockingQueue`，具有优先级的无限阻塞队列
- `DelayQueue`，队列中的元素只有当其指定的延迟时间到了，才能够从队列中获取到该元素；没有大小限制的队列，因此往队列中插入数据的操作（生产者）永远不会被阻塞，而只有获取数据的操作（消费者）才会被阻塞。



## ThreadLocal 原理

没太看懂，先放一下。



## JMM ★

[Java内存模型](2/6/)



## AQS ★

[抽象队列同步器](2/11/)



## 守护线程

[Java 什么是守护线程 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/107649830)

守护线程可以理解是一种服务线程。和用户线程的区别在于，当所有的用户线程都执行结束了，即时守护线程还在执行，但也没有执行的必要了，此时就可以结束程序了。

比如垃圾回收线程就是典型的守护线程。所有的用户线程都执行完了，也没有再回收垃圾的必要了，直接结束程序即可。
