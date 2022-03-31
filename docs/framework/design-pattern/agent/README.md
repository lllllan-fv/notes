---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 代理模式

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- Java基础
- 代理

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 

# 版权信息
copyright: true
---



::: warning 转载声明

- [JavaGuide](https://javaguide.cn/)
- [代理模式（代理设计模式）详解 (biancheng.net)](http://c.biancheng.net/view/1359.html)
- [设计模式之——代理模式](https://www.jianshu.com/p/9cdcf4e5c27d)
- [谈谈反射机制，动态代理基于什么原理](https://cloud.tencent.com/developer/article/1625434#:~:text=动态代理是一种方便运行时动态构建代理、动态处理代理方法调用的机制，很多场景都是利用类似机制做到的，比如用来包装RPC调用、面向切面的编程（AOP）,实现动态代理的方式很多，比如JDK自身提供的动态代理，就是主要利用了上面提到的反射机制。)

:::



## 代理模式

代理模式又叫委托模式，是为某个对象提供一个代理对象，并且由代理对象控制对原对象的访问。代理模式通俗来讲就是我们生活中常见的中介。



![Understanding the Proxy Design Pattern | by Mithun Sasidharan | Medium](README.assets/1DjWCgTFm-xqbhbNQVsaWQw.png)



### 代理的优缺点

代理模式的主要优点：

1. 将客户端与目标对象分离，业务类只需要关注业务本身逻辑，一定程度上降低了耦合度、保证了业务类的重用性
2. 代理模式在客户端和目标对象之间，起到一个中介和保护目标对象的作用
3. 可以不修改业务类的功能，通过代理对象来对目标功能进行扩展



代理模式的主要缺点：

- 代理模式会造成系统设计中类数量的增加
- 在客户端和目标对象之间增加一个代理对象，会造成请求处理速度变慢
- 增加了系统的复杂度



### 代理的使用场景

代理类主要负责为委托类预处理消息、过滤消息、把消息转发给委托类，以及事后对返回结果的处理等。代理类本身并不真正实现服务，而是通过调用委托类的相关方法，来提供特定的服务。真正的业务功能还是由委托类来实现，但是可以在业务功能执行的前后加入一些公共的服务。例如我们想给项目加入缓存、日志这些功能，我们就可以使用代理类来完成，而没必要打开已经封装好的委托类。





## 静态代理

 **静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。**



### 代码示例

静态代理实现步骤:

1. 定义一个接口及其实现类；
2. 创建一个代理类同样实现这个接口
3. 将目标对象注入进代理类，然后在代理类的对应方法调用目标类中的对应方法。这样的话，我们就可以通过代理类屏蔽对目标对象的访问，并且可以在目标方法执行前后做一些自己想做的事情。





1. 定义接口

```java
public interface Subject {
    /**
     * 接口方法
     */
    public void request();
}
```



2. 实现接口的具体类

```java
public class ConcreteSubject implements Subject {
    /**
     * 具体的业务逻辑实现
     */
    @Override
    public void request() {
        //业务处理逻辑
    }
}
```



3. 代理类

```java
public class Proxy implements Subject {

    /**
     * 要代理的实现类
     */
    private Subject subject = null;

    /**
     * 默认代理自己
     */
    public Proxy() {
        this.subject = new Proxy();
    }

    public Proxy(Subject subject) {
        this.subject = subject;
    }

    /**
     * 构造函数，传递委托者
     *
     * @param objects 委托者
     */
    public Proxy(Object... objects) {
    }

    /**
     * 实现接口方法
     */
    @Override
    public void request() {
        this.before();
        this.subject.request();
        this.after();
    }

    /**
     * 预处理
     */
    private void before() {
        //do something
    }

    /**
     * 后处理
     */
    private void after() {
        //do something
    }
}
```



4. 客户端类

```java
public class Client {
    public static void main(String[] args) {
        Subject subject = new ConcreteSubject();
        Proxy proxy = new Proxy(subject);
        proxy.request();
    }
}
```



### 优缺点

优点：

1. 业务类只需要关注业务本身逻辑，保证了业务类的重用性（这是代理共有的优点）。
2. 可以不修改业务类对象的功能，通过代理对象对目标功能进行扩展



缺点：

1. 代理类和委托类实现了相同的接口。代理类需要一一实现委托类的功能方法，如果新增一个方法，所有代理类都需要手动实现这个方法，增加了维护的复杂度。
2. 代理对象只服务于一种类型的对象，如果需要服务多类型的对象，就需要为每一种对象都创建对应的代理类。当程序规模稍大之后，静态代理将会非常麻烦。



## 动态代理

==动态代理是一种方便运行时动态构建代理、动态处理代理方法调用的机制==，很多场景都是利用类似机制做到的，比如用来包装RPC调用、面向切面的编程（AOP） 实现动态代理的方式很多。



**从 JVM 角度来说，动态代理是在运行时动态生成类字节码，并加载到 JVM 中的**



### JDK 动态代理

[深度剖析JDK动态代理机制 - MOBIN](https://www.cnblogs.com/MOBIN/p/5597215.html)

```java
// 业务接口
interface SmsService {
    String send(String message);
}

// 业务类
class SmsServiceImpl implements SmsService {
    public String send(String message) {
        System.out.println("send message:" + message);
        return message;
    }
}

// JDK 动态代理类
class DebugInvocationHandler implements InvocationHandler {
    /**
     * 代理类中的真实对象
     */
    private final Object target;

    public DebugInvocationHandler(Object target) {
        this.target = target;
    }

    public Object invoke(Object proxy, Method method, Object[] args) 
        throws InvocationTargetException, IllegalAccessException {
        
        //调用方法之前，我们可以添加自己的操作
        System.out.println("before method " + method.getName());
        
        Object result = method.invoke(target, args);
        
        //调用方法之后，我们同样可以添加自己的操作
        System.out.println("after method " + method.getName());
        return result;
    }
}

class JdkProxyFactory {
    public static Object getProxy(Object target) {
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(), // 目标类的类加载
                target.getClass().getInterfaces(),  // 代理需要实现的接口，可指定多个
                new DebugInvocationHandler(target)   // 代理对象对应的自定义 InvocationHandler
        );
    }
}

public class Main {
    public static void main(String[] args) {
        SmsService smsService = (SmsService) JdkProxyFactory.getProxy(new SmsServiceImpl());
		smsService.send("java");
    }
}
```



运行上述代码之后，控制台打印出：

```text
before method send
send message:java
after method send
```



### CGLIB 动态代理机制



**JDK 动态代理有一个最致命的问题是其只能代理实现了接口的类。为了解决这个问题，我们可以用 CGLIB 动态代理机制来避免。**



[CGLIB  (opens new window)](https://github.com/cglib/cglib)(*Code Generation Library*)是一个基于[ASM  (opens new window)](http://www.baeldung.com/java-asm)的字节码生成库，它允许我们在运行时对字节码进行修改和动态生成。CGLIB 通过继承方式实现代理。很多知名的开源框架都使用到了[CGLIB  (opens new window)](https://github.com/cglib/cglib)， 例如 Spring 中的 AOP 模块中：如果目标对象实现了接口，则默认采用 JDK 动态代理，否则采用 CGLIB 动态代理。



不同于 JDK 动态代理不需要额外的依赖。[CGLIB  (opens new window)](https://github.com/cglib/cglib)(*Code Generation Library*) 实际是属于一个开源项目，如果你要使用它的话，需要手动添加相关依赖。

```xml
<dependency>
  <groupId>cglib</groupId>
  <artifactId>cglib</artifactId>
  <version>3.3.0</version>
</dependency>
```





```java
class AliSmsService {
    public String send(String message) {
        System.out.println("send message:" + message);
        return message;
    }
}

class DebugMethodInterceptor implements MethodInterceptor {


    /**
     * @param o           代理对象（增强的对象）
     * @param method      被拦截的方法（需要增强的方法）
     * @param args        方法入参
     * @param methodProxy 用于调用原始方法
     */
    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        //调用方法之前，我们可以添加自己的操作
        System.out.println("before method " + method.getName());
        
        Object object = methodProxy.invokeSuper(o, args);
        
        //调用方法之后，我们同样可以添加自己的操作
        System.out.println("after method " + method.getName());
        return object;
    }

}

class CglibProxyFactory {

    public static Object getProxy(Class<?> clazz) {
        // 创建动态代理增强类
        Enhancer enhancer = new Enhancer();
        // 设置类加载器
        enhancer.setClassLoader(clazz.getClassLoader());
        // 设置被代理类
        enhancer.setSuperclass(clazz);
        // 设置方法拦截器
        enhancer.setCallback(new DebugMethodInterceptor());
        // 创建代理类
        return enhancer.create();
    }
}

public class Main{
    public static void main(String[] args) {
        AliSmsService aliSmsService = (AliSmsService) CglibProxyFactory.getProxy(AliSmsService.class);
        aliSmsService.send("java");
    }
}
```



运行上述代码之后，控制台打印出：

```bash
before method send
send message:java
after method send
```



### 对比

- **JDK 动态代理只能代理实现了接口的类或者直接代理接口，而 CGLIB 可以代理未实现任何接口的类。** 另外， CGLIB 动态代理是通过生成一个被代理类的子类来拦截被代理类的方法调用，因此不能代理声明为 final 类型的类和方法。

- 就二者的效率来说，大部分情况都是 JDK 动态代理更优秀，随着 JDK 版本的升级，这个优势更加明显。



## 静态代理和动态代理的对比

1. **灵活性** ：动态代理更加灵活，不需要必须实现接口，可以直接代理实现类，并且可以不需要针对每个目标类都创建一个代理类。另外，静态代理中，接口一旦新增加方法，目标对象和代理对象都要进行修改，这是非常麻烦的！
2. **JVM 层面** ：静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。而动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。

