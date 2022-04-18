---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 第四章、Java线程的状态及主要转化方法

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- Java 多线程
- 深入浅出多线程

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 



---



::: warning 转载声明

- [深入浅出多线程 - 第四章 - GitHub](https://github.com/RedSpider1/concurrent/tree/develop/article/01/4.md)
- [线程状态转换图及各部分介绍](https://blog.csdn.net/sspudding/article/details/89220595)
- [面试问题——阻塞和等待状态的区别](https://blog.csdn.net/a543760828/article/details/119886943)

:::



## 一、操作系统中的线程状态转换

> 在现在的操作系统中，线程是被视为轻量级进程的，所以 **操作系统线程的状态其实和操作系统进程的状态是一致的**。

![系统进程状态转换图](README.assets/系统进程状态转换图.png)

操作系统线程主要有以下三个状态：

- 就绪状态(ready)：线程正在等待使用 CPU，经调度程序调用之后可进入 running 状态。
- 执行状态(running)：线程正在使用 CPU。
- 等待状态(waiting)：线程经过等待事件的调用或者正在等待其他资源（如 I/O）。



## 二、Java 线程的六个状态

![线程状态转换图](README.assets/线程状态转换图.png)

```java
// Thread.State 源码
public enum State {
    NEW,
    RUNNABLE,
    BLOCKED,
    WAITING,
    TIMED_WAITING,
    TERMINATED;
}
```



### 2.1 NEW

处于 NEW 状态的线程此时尚未启动。这里的尚未启动指的是 **还没调用 Thread 实例的 start() 方法。**

```java
private void testStateNew() {
    Thread thread = new Thread(() -> {});
    System.out.println(thread.getState()); // 输出 NEW 
}
```



::: tip 关于 start() 的两个引申问题

1. 反复调用同一个线程的 start() 方法是否可行？ 

   > 不行。在调用一次 start() 之后，threadStatus 的值会改变（threadStatus !=0），此时再次调用 start() 方法会抛出 IllegalThreadStateException 异常。

2. 假如一个线程执行完毕（此时处于 TERMINATED 状态），再次调用这个线程的 start() 方法是否可行？

   > 不行

:::



:::: code-group

::: code-group-item start() 源码

```java {2,3}
public synchronized void start() {
    if (threadStatus != 0)
        throw new IllegalThreadStateException();

    group.add(this);

    boolean started = false;
    try {
        start0();
        started = true;
    } finally {
        try {
            if (!started) {
                group.threadStartFailed(this);
            }
        } catch (Throwable ignore) {

        }
    }
}
```

:::

::: code-group-item 查看当前线程状态的源码

```bash
// Thread.getState方法源码：
public State getState() {
    // get current thread state
    return sun.misc.VM.toThreadState(threadStatus);
}

// sun.misc.VM 源码：
public static State toThreadState(int var0) {
    if ((var0 & 4) != 0) {
        return State.RUNNABLE;
    } else if ((var0 & 1024) != 0) {
        return State.BLOCKED;
    } else if ((var0 & 16) != 0) {
        return State.WAITING;
    } else if ((var0 & 32) != 0) {
        return State.TIMED_WAITING;
    } else if ((var0 & 2) != 0) {
        return State.TERMINATED;
    } else {
        return (var0 & 1) == 0 ? State.NEW : State.RUNNABLE;
    }
}
```

:::

::::



==在 start() 内部，这里有一个 threadStatus 的变量。如果它不等于 0，调用 start() 是会直接抛出异常的。==



### 2.2  RUNNABLE

表示当前线程正在运行中。处于 RUNNABLE 状态的线程在 Java 虚拟机中运行，也有可能在等待 CPU 分配资源。



::: tip Java 的 Runnable

Java 线程的 **RUNNABLE** 状态其实是包括了传统操作系统线程的 **ready** 和 **running** 两个状态的。

:::



```java
/**
 * Thread state for a runnable thread.  A thread in the runnable
 * state is executing in the Java virtual machine but it may
 * be waiting for other resources from the operating system
 * such as processor.
 */
```



### 2.3 BLOCKED

阻塞状态。处于 BLOCKED 状态的线程 ==正等待锁的释放== 以进入同步区。



### 2.4 WAITING

等待状态。==原本获得锁== 的线程被要求等待，变成RUNNABLE状态需要其他线程唤醒。

调用如下 3 个方法会使线程进入等待状态：

- Object.wait()：使当前线程处于等待状态直到另一个线程唤醒它；
- Thread.join()：等待线程执行完毕，底层调用的是 Object 实例的 wait 方法；
- LockSupport.park()：除非获得调用许可，否则禁用当前线程进行线程调度



### 2.5 TIMED_WAITING

超时等待状态。 ==线程等待一个具体的时间，时间到后会被自动唤醒。==

调用如下方法会使线程进入超时等待状态：

- Thread.sleep(long millis)：使当前线程睡眠指定时间；
- Object.wait(long timeout)：线程休眠指定时间，等待期间可以通过 notify()/notifyAll() 唤醒；
- Thread.join(long millis)：等待当前线程最多执行 millis 毫秒，如果 millis 为 0，则会一直执行；
- LockSupport.parkNanos(long nanos)： 除非获得调用许可，否则禁用当前线程进行线程调度指定时间；
- LockSupport.parkUntil(long deadline)：同上，也是禁止线程进行调度指定时间；



::: info 阻塞、等待和超时等待

**阻塞**

Java 文档将 **BLOCKED** 状态正式定义为：【被阻塞等待监视器锁的线程处于此状态】

举个栗子：你出门需要开车，但是车已经被你老爸开走了，你想要用车就必须等你老爸回来。

你是线程 **T1**，你老爸是线程 **T2**，锁是汽车。**T1** 在锁（即汽车）上被 **BLOCKED**，因为 **T2** 已经获得了这个锁。

------



**等待**

Java 文档将 **WAITING** 状态正式定义为：【无限期等待另一个线程执行特定操作的线程处于此状态】

还是这个栗子：你老爸回来之后车空闲了，你本来都已经上车了，但是你老妈叫你等她把饭做好，然后让你把便当带走。

你是线程 **T1**，老妈是线程 **T2**。你松开了锁（上了车又下来了），并进入 WAITING 状态。直到老妈（即**T2**）把便当做好给你，你会一直被困在这个 **WAITING** 状态。

----



**超时等待**

还是这个栗子：老妈的便当还没做好，但是你上班快迟到了，最多只能再等她五分钟，五分钟后不管便当能不能做好，都要开车离开了。

你是线程 **T1**，老妈是线程 **T2**，你只等待五分钟，并进入 TIMED_WAITING 状态。五分钟后将不再等待。

:::



### 2.6 TERMINATED

终止状态。此时线程已执行完毕。



## 三、线程状态的转换

![线程状态转换图](README.assets/线程状态转换图.png)





### 3.1 BLOCKED与RUNNABLE状态的转换

处于 BLOCKED 状态的线程是因为在等待锁的释放。假如这里有两个线程 a 和 b，a 线程提前获得了锁并且暂未释放锁，此时 b 就处于 BLOCKED 状态

```java
@Test
public void blockedTest() {

    Thread a = new Thread(new Runnable() {
        @Override
        public void run() {
            testMethod();
        }
    }, "a");
    Thread b = new Thread(new Runnable() {
        @Override
        public void run() {
            testMethod();
        }
    }, "b");

    a.start();
    b.start();
    System.out.println(a.getName() + ":" + a.getState()); // 输出？
    System.out.println(b.getName() + ":" + b.getState()); // 输出？
}

// 同步方法争夺锁
private synchronized void testMethod() {
    try {
        Thread.sleep(2000L);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```

初看之下，大家可能会觉得线程 a 会先调用同步方法，同步方法内又调用了 Thread.sleep() 方法，必然会输出 TIMED_WAITING ，而线程 b 因为等待线程 a 释放锁所以必然会输出 BLOCKED。

其实不然，有两点需要值得大家注意，一是 **在测试方法 blockedTest() 内还有一个 main 线程**，二是**启动线程后执行 run 方法还是需要消耗一定时间的**。

> 测试方法的 main 线程只保证了 a，b 两个线程调用 start() 方法（转化为 RUNNABLE 状态），如果 CPU 执行效率高一点，还没等两个线程真正开始争夺锁，就已经打印此时两个线程的状态（RUNNABLE）了。
>
> 当然，如果 CPU 执行效率低一点，其中某个线程也是可能打印出 BLOCKED 状态的（此时两个线程已经开始争夺锁了）。

这时你可能又会问了，要是我想要打印出 BLOCKED 状态我该怎么处理呢？BLOCKED状态的产生需要两个线程争夺锁才行。那我们处理下测试方法里的 main 线程就可以了，让它“休息一会儿”，调用一下 `Thread.sleep()` 方法。

这里需要注意的是 main 线程休息的时间，要保证在线程争夺锁的时间内，不要等到前一个线程锁都释放了你再去争夺锁，此时还是得不到BLOCKED状态的。

我们把上面的测试方法blockedTest()改动一下：

```
public void blockedTest() throws InterruptedException {
    ······
    a.start();
    Thread.sleep(1000L); // 需要注意这里main线程休眠了1000毫秒，而testMethod()里休眠了2000毫秒
    b.start();
    System.out.println(a.getName() + ":" + a.getState()); // 输出？
    System.out.println(b.getName() + ":" + b.getState()); // 输出？
}
```

在这个例子中两个线程的状态转换如下

- a的状态转换过程：RUNNABLE（`a.start()`） -> TIMED_WATING（`Thread.sleep()`）->RUNABLE（sleep()时间到）->*BLOCKED(未抢到锁)* -> TERMINATED
- b的状态转换过程：RUNNABLE（`b.start()`) -> *BLOCKED(未抢到锁)* ->TERMINATED

> 斜体表示可能出现的状态， 大家可以在自己的电脑上多试几次看看输出。同样，这里的输出也可能有多钟结果。



### 3.2 WAITING状态与RUNNABLE状态的转换

**Object.wait()**

> 调用 `wait()` 方法前线程 ==必须持有对象的锁。==
>
> 线程调用 `wait()` 方法时， ==会释放当前的锁==，直到有其他线程调用 `notify()/notifyAll()` 方法唤醒等待锁的线程。
>
> 需要注意的是，其他线程调用 `notify()` 方法只会唤醒**单个等待锁的线程**，<u>如有有多个线程都在等待这个锁的话不一定会唤醒到之前调用wait()方法的线程。</u>
>
> 同样，调用 `notifyAll()` 方法唤醒所有等待锁的线程之后，也不一定会马上把时间片分给刚才放弃锁的那个线程，具体要看系统的调度。

**Thread.join()**

> 调用 `join()` 方法，会一直等待这个线程执行完毕（转换为TERMINATED状态）。

我们再把上面的例子线程启动那里改变一下：

```
public void blockedTest() {
    ······
    a.start();
    a.join();
    b.start();
    System.out.println(a.getName() + ":" + a.getState()); // 输出 TERMINATED
    System.out.println(b.getName() + ":" + b.getState());
}
```

要是没有调用join方法，main线程不管a线程是否执行完毕都会继续往下走。

a线程启动之后马上调用了join方法，这里main线程就会等到a线程执行完毕，所以这里a线程打印的状态固定是**TERMINATED**。

至于b线程的状态，有可能打印RUNNABLE（尚未进入同步方法），也有可能打印TIMED_WAITING（进入了同步方法）。



### 3.3 TIMED_WAITING与RUNNABLE状态转换

TIMED_WAITING与WAITING状态类似，只是TIMED_WAITING状态等待的时间是指定的。

**Thread.sleep(long)**

> 使当前线程睡眠指定时间。需要注意这里的“睡眠”只是暂时使线程停止执行， ==并不会释放锁==。时间到后，线程会重新进入RUNNABLE状态。

**Object.wait(long)**

> wait(long)方法使线程进入TIMED_WAITING状态。这里的wait(long)方法与无参方法wait()相同的地方是，都可以通过其他线程调用notify()或notifyAll()方法来唤醒。
>
> 不同的地方是，有参方法wait(long)就算其他线程不来唤醒它，经过指定时间long之后它会自动唤醒，拥有去争夺锁的资格。

**Thread.join(long)**

> join(long)使当前线程执行指定时间，并且使线程进入TIMED_WAITING状态。
>
> 我们再来改一改刚才的示例:

```
public void blockedTest() {
    ······
    a.start();
    a.join(1000L);
    b.start();
    System.out.println(a.getName() + ":" + a.getState()); // 输出 TIEMD_WAITING
    System.out.println(b.getName() + ":" + b.getState());
}
```

这里调用a.join(1000L)，因为是指定了具体a线程执行的时间的，并且执行时间是小于a线程sleep的时间，所以a线程状态输出TIMED_WAITING。

b线程状态仍然不固定（RUNNABLE 或 BLOCKED）。

### 3.4 线程中断

> 在某些情况下，我们在线程启动后发现并不需要它继续执行下去时，需要中断线程。目前在Java里还没有安全直接的方法来停止线程，但是Java提供了线程中断机制来处理需要中断线程的情况。
>
> 线程中断机制是一种协作机制。需要注意，通过中断操作并不能直接终止一个线程，而是通知需要被中断的线程自行处理。

简单介绍下Thread类里提供的关于线程中断的几个方法：

- Thread.interrupt()：中断线程。这里的中断线程并不会立即停止线程，而是设置线程的中断状态为true（默认是flase）；
- Thread.currentThread().isInterrupted()：测试当前线程是否被中断。线程的中断状态受这个方法的影响，意思是调用一次使线程中断状态设置为true，连续调用两次会使得这个线程的中断状态重新转为false；
- Thread.isInterrupted()：测试当前线程是否被中断。与上面方法不同的是调用这个方法并不会影响线程的中断状态。

> 在线程中断机制里，当其他线程通知需要被中断的线程后，线程中断的状态被设置为true，但是具体被要求中断的线程要怎么处理，完全由被中断线程自己而定，可以在合适的实际处理中断请求，也可以完全不处理继续执行下去。
