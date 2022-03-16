---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 第二章、Java多线程入门类和接口

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

- [深入浅出多线程 - 第二章 - GitHub](https://github.com/RedSpider1/concurrent/tree/develop/article/01/2.md)

:::



## 一、Thread 类和 Runnable 接口

JDK提供了 `Thread` 类和 `Runnable` 接口来让我们实 现自己的“线程”类。

-  继承 `Thread` 类，并重写 `run` 方法；
- 实现 `Runnable` 接口的 `run` 方法；



### 1.1 继承 Thread 类

注意要调用 start() 方法后，该线程才算启动

```java
public class Demo {
    public static class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("MyThread");
        }
    }
    public static void main(String[] args) {
        Thread myThread = new MyThread();
        myThread.start();
    }
}
```

> 我们在程序里面调用了 `start()` 方法后，虚拟机会先为我们创建一个线程，然 后等到这个线程第一次得到时间片时再调用 `run()` 方法。 
>
> ==注意不可多次调用 `start()` 方法。在第一次调用 `start()` 方法后，再次调用 `start()` 方法会抛出`IllegalThreadStateException`异常。==



### 1.2 实现 Runnable 接口

```java
@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```

Runnable 是一个函数式接口，这意味着我们可以使用Java 8的函数式编程来简化代码。

```java
public class Demo {
    public static class MyThread implements Runnable {
        @Override
        public void run() {
            System.out.println("MyThread");
        }
    }
    public static void main(String[] args) {
        new Thread(new MyThread()).start();
        // Java 8 函数式编程，可以省略MyThread类
        new Thread(() -> {
            System.out.println("Java 8 匿名内部类");
        }).start();
    }
}
```



## 二、Thread 类



### 2.1 Thread 的构造方法

```java
// Thread类源码
// 片段1 - init方法
private void init(ThreadGroup g, Runnable target, String name,
                  long stackSize, AccessControlContext acc,
                  boolean inheritThreadLocals)
    
// 片段2 - 构造函数调用init方法
public Thread(Runnable target) {
    init(null, target, "Thread-" + nextThreadNum(), 0);
}
// 片段3 - 使用在init方法里初始化AccessControlContext类型的私有属性
this.inheritedAccessControlContext = 
    acc != null ? acc : AccessController.getContext();

// 片段4 - 两个对用于支持ThreadLocal的私有属性
ThreadLocal.ThreadLocalMap threadLocals = null;
ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
```

- g：线程组，指定这个线程是在哪个线程组下

- target：指定要执行的任务

- name：线程的名字，多个线程的名字是可以重复的。如果不指定名字，见片段2；

- acc：见片段3，用于初始化私有变量 `inheritedAccessControlContext`

  > 这个变量有点神奇。它是一个私有变量，但是在 Thread 类里只 有 init 方法对它进行初始化，在 exit 方法把它设为 null 。其它没有任何地方使用它。一般我们是不会使用它的，那什么时候会使用到这个变量呢？可以参考这个stackoverflow的问题：[java - Restricting permissions of threads that execute third party software - Stack Overflow](https://stackoverflow.com/questions/13516766/restricting-permissions-of-threads-that-execute-third-party-software)

- inheritThreadLocals：可继承的 ThreadLocal ，见片段4， Thread 类里面有两个私有属性来支持 ThreadLocal ，我们会在后面的章节介绍 ThreadLocal 的概念



实际情况下，我们大多是直接调用下面两个构造方法： 

```java
Thread(Runnable target) 
Thread(Runnable target, String name)
```



### 2.2 Thread 类的几个常用方法

- `currentThread()`：静态方法，返回对当前正在执行的线程对象的引用； 
- `start()`：开始执行线程的方法，java虚拟机会调用线程内的run()方法； 
- `yield()`：指的是当前线程愿意让出对当前处理器的占用。这里需要注意的是，==就算当前线程调用了yield() 方法，程序在调度的时候，也还有可能继续运行这个线程的==
- `sleep()`：静态方法，使当前线程睡眠一段时间； 
- `join()`：使当前线程等待另一个线程执行完毕之后再继续执行，内部调用的是 Object类的wait方法实现的



## 三、Thread类与Runnable接口的比较

- 由于Java“单继承，多实现”的特性，Runnable接口使用起来比Thread **更灵活**。 
- Runnable接口出现更符合面向对象，将线程单独进行对象的封装。 
- Runnable接口出现，**降低了线程对象和线程任务的耦合性**。 
- 如果使用线程时不需要使用Thread类的诸多方法，显然使用Runnable接口 **更为轻量**。

我们通常优先使用“实现 Runnable 接口”这种方式来自定义线程类



## 四、Callable、Future与FutureTask

通常来说，我们使用 Runnable 和 Thread 来创建一个新的线程。但是它们有一个弊端，**就是 run 方法是没有返回值**的。而有时候我们希望开启一个线程去执行一个任务，并且这个任务执行完成后有一个返回值。 

JDK提供了 `Callable` 接口与 `Future` 接口为我们解决这个问题，这也是所谓的 ==“异步” 模型==



### 4.1 Callable接口

`Callable` 与 `Runnable` 类似，同样是只有一个抽象方法的函数式接口。不同的 是， Callable 提供的方法是有**返回值的，而且支持泛型。**

```java
@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}
```

`Callable` 一般是配合线程池工具 `ExecutorService` 来使用的。 这里只介绍 `ExecutorService` 可以使用 `submit` 方法来让一个 `Callable` 接口执行。它会返回一 个 `Future` ，我们后续的程序可以通过这个 Future 的 get 方法得到结果。

```java
// 自定义Callable
class Task implements Callable<Integer>{
    @Override
    public Integer call() throws Exception {
        // 模拟计算需要一秒
        Thread.sleep(1000);
        return 2;
    }
    	
    public static void main(String args[]) throws Exception {
        // 使用
        ExecutorService executor = Executors.newCachedThreadPool();
        Task task = new Task();
        Future<Integer> result = executor.submit(task);
        // 注意调用get方法会阻塞当前线程，直到得到结果。
        // 所以实际编码中建议使用可以设置超时时间的重载get方法。
        System.out.println(result.get()); 
    }
}
```

```java
2
```



### 4.2 Future接口

```java
public abstract interface Future<V> {
    public abstract boolean cancel(boolean paramBoolean);
    public abstract boolean isCancelled();
    public abstract boolean isDone();
    public abstract V get() throws InterruptedException, ExecutionException;
    public abstract V get(long paramLong, TimeUnit paramTimeUnit)
        throws InterruptedException, ExecutionException, TimeoutException;
}
```

cancel 方法是试图取消一个线程的执行。 

注意是 **试图取消**，并不一定能取消成功。因为任务可能已完成、已取消、或者一些其它因素不能取消，存在取消失败的可能。 

boolean 类型的返回值是“是否取消成功”的意思。参数 `paramBoolean` 表示 **是否采用中断的方式取消线程执行**。 

所以有时候，为了让任务有能够取消的功能，就使用 `Callable` 来代替 `Runnable` 。如果为了可取消性而使用 `Future` 但又不提供可用的结果，则可以声明 Future 形式类型、并返回 null 作为底层任务的结果。



### 4.3 FutureTask类

`Future` 接口有一个实现类叫 `FutureTask` 。 

`FutureTask` 是实现 的 `RunnableFuture` 接口的，而 `RunnableFuture` 接口同时继承了 `Runnable` 接口 和 `Future` 接口

```java
public interface RunnableFuture<V> extends Runnable, Future<V> {
    /**
 	 * Sets this Future to the result of its computation
 	 * unless it has been cancelled.
 	 */
    void run();
}
```

 Future 只是 一个接口，而它里面的 `cancel` ，`get` ， `isDone` 等方法要自己实现起来都是非常复杂的。所以JDK提供了一个 FutureTask 类来供我们使用。

```java
// 自定义Callable，与上面一样
class Task implements Callable<Integer>{
    @Override
    public Integer call() throws Exception {
        // 模拟计算需要一秒
        Thread.sleep(1000);
        return 2;
    }
    public static void main(String args[]) throws Exception {
        // 使用
        ExecutorService executor = Executors.newCachedThreadPool();
        FutureTask<Integer> futureTask = new FutureTask<>(new Task());
        executor.submit(futureTask);
        System.out.println(futureTask.get());
    }
}
```

- 调用 submit 方法是没有返回值的。 这里实际上是调用的 submit(Runnable task) 方法，而上面的Demo，调用的 是 submit(Callable task) 方法。
- 是使用 FutureTask 直接取 get 取值，而上面的Demo是通过 submit 方法 返回的 Future 去取值
- 在很多高并发的环境下，有可能Callable和FutureTask会创建多次。FutureTask能 够在高并发环境下确保任务只执行一此



### 4.4 FutureTask的几个状态

```java
/**
 *
 * state可能的状态转变路径如下：
 * NEW -> COMPLETING -> NORMAL
 * NEW -> COMPLETING -> EXCEPTIONAL
 * NEW -> CANCELLED
 * NEW -> INTERRUPTING -> INTERRUPTED
 */
private volatile int state;
private static final int NEW = 0;
private static final int COMPLETING = 1;
private static final int NORMAL = 2;
private static final int EXCEPTIONAL = 3;
private static final int CANCELLED = 4;
private static final int INTERRUPTING = 5;
private static final int INTERRUPTED = 6;
```

tate表示任务的运行状态，初始状态为NEW。运行状态只会在 `set`、 `setException`、`cancel` 方法中终止。COMPLETING、INTERRUPTING是任 务完成后的瞬时状态。
