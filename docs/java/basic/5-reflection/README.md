---
# 这是页面的图标
icon: page

# 这是文章的标题
title: Java - 反射

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-22 16:07

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



::: warning 转载声明

- [JavaGuide](https://javaguide.cn/)

:::



## 一、什么是反射

Java反射就是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意方法和属性；并且能改变它的属性。

而这也是Java被视为动态（或准动态，为啥要说是准动态，因为一般而言的动态语言定义是程序运行时，允许改变程序结构或变量类型，这种语言称为动态语言。从这个观点看，Perl，Python，Ruby是动态语言，C++，Java，C#不是动态语言。）语言的一个关键性质。



## 二、反射能做什么？

我们知道反射机制允许程序在运行时取得任何一个已知名称的class的内部信息，包括其modifiers(修饰符)，fields(属性)，methods(方法)等，并可于运行时改变fields内容或调用methods。那么我们便可以更灵活的编写代码，代码可以在运行时装配，无需在组件之间进行源代码链接，降低代码的耦合度；还有动态代理的实现等等；但是需要注意的是反射使用不当会造成很高的资源消耗！



## 三、反射机制优缺点

- **优点** ： 可以让代码更加灵活、为各种框架提供开箱即用的功能提供了便利
- **缺点** ：让我们在运行时有了分析操作类的能力，这同样也增加了安全问题。比如可以无视泛型参数的安全检查（泛型参数的安全检查发生在编译时）。另外，反射的性能也要稍差点，不过，对于框架来说实际是影响不大的



## 四、反射的应用场景

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



## 五、反射的使用



### 5.1 获取 Class 对象的四种方式



**1.知道具体类的情况下可以使用**

```java
Class class = TargetObject.class;
```



**2.通过 `Class.forName()` 传入类的路径获取**

```java
Class class = Class.forName("cn.javaguide.TargetObject");
```



**3.通过对象实例 `instance.getClass()` 获取**

```java
TargetObject o = new TargetObject();
Class class = o.getClass();
```



**4.通过类加载器 `xxxClassLoader.loadClass()` 传入类路径获取**

```java
Class class = ClassLoader.loadClass("cn.javaguide.TargetObject");
```



### 5.2 反射的基本操作



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

