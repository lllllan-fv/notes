---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 反射机制

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- Java基础
- 反射

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning

本文转载自 [反射机制详解！ | JavaGuide](https://javaguide.cn/java/basis/反射机制详解/)，略有改动

:::



> 总之反射就是能获取一个类的所有方法和属性，并能够调用。
>
> 然后还能增加代码的灵活性。
>
> 
>
> 但是，我还是没有感受到，灵活在哪里。。。

## 什么是反射？

反射就是Reflection，Java的反射是指程序在**运行期**可以拿到一个对象的所有信息，，你还可以调用这些方法和属性。



## 反射的应用场景

- 模块化的开发，通过反射去调用对应的字节码
- 框架中大量使用动态代理，而动态代理依赖反射机制实现
- 注解的实现也用到了反射



**JDBC的数据库连接**

```java
public static final String DBDRIVER = "com.mysql.jdbc.Driver";  
public static final String DBURL = "jdbc:mysql://localhost:3306/test";  
public static final String DBUSER = "root";  
public static final String DBPASS = "";  

public static void main(String[] args) throws Exception {  
    Connection con = null;
    Class.forName(DBDRIVER); //1、使用CLASS 类加载驱动程序 ,反射机制的体现 
    con = DriverManager.getConnection(DBURL,DBUSER,DBPASS); //2、连接数据库  
    ...
    con.close(); // 3、关闭数据库  
}  
```



## 反射的优缺点

**优点：** 让代码更加灵、为各种框架提供开箱即用的功能提供便利

**缺点：** 在运行时有了分析操作类的能力，同样增加了安全问题。性能略差，不过对于框架的影响比较小。



## 反射的使用



### 获取Class对象的四种方式



**1.知道具体类的情况下可以使用**

```java
Class alunbarClass = TargetObject.class;
```



**2.通过 `Class.forName()` 传入类的路径获取**

```java
Class alunbarClass1 = Class.forName("cn.javaguide.TargetObject");
```



**3.通过对象实例 `instance.getClass()` 获取**

```java
TargetObject o = new TargetObject();
Class alunbarClass2 = o.getClass();
```



**4.通过类加载器 `xxxClassLoader.loadClass()` 传入类路径获取**

```java
Class clazz = ClassLoader.loadClass("cn.javaguide.TargetObject");
```



### 反射的基本操作



**1.定义一个类**

```java
public class TargetObject {
    private String value;

    public TargetObject() {
        value = "JavaGuide";
    }

    public void publicMethod(String s) {
        System.out.println("I love " + s);
    }

    private void privateMethod() {
        System.out.println("value is " + value);
    }
}
```



**2.使用反射来操作这个类的方法及参数**

```java
public class Main {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InstantiationException, InvocationTargetException, NoSuchFieldException {
        /**
         * 获取TargetObject类的Class对象并且创建TargetObject类实例
         */
        Class<?> tagetClass = Class.forName("cn.javaguide.TargetObject");
        TargetObject targetObject = (TargetObject) tagetClass.newInstance();
        /**
         * 获取所有类中所有定义的方法
         */
        Method[] methods = tagetClass.getDeclaredMethods();
        for (Method method : methods) {
            System.out.println(method.getName());
        }
        /**
         * 获取指定方法并调用
         */
        Method publicMethod = tagetClass.getDeclaredMethod("publicMethod",
                String.class);

        publicMethod.invoke(targetObject, "JavaGuide");
        /**
         * 获取指定参数并对参数进行修改
         */
        Field field = tagetClass.getDeclaredField("value");
        //为了对类中的参数进行修改我们取消安全检查
        field.setAccessible(true);
        field.set(targetObject, "JavaGuide");
        /**
         * 调用 private 方法
         */
        Method privateMethod = tagetClass.getDeclaredMethod("privateMethod");
        //为了调用private方法我们取消安全检查
        privateMethod.setAccessible(true);
        privateMethod.invoke(targetObject);
    }
}
```



**3.输出结果**

```java
publicMethod
privateMethod
I love JavaGuide
value is JavaGuide
```

