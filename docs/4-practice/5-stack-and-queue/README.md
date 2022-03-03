---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 栈与队列

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: 刷题

# 一个页面可以有多个标签
tag:

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 

---



## 一、栈



### 1.1 [232. 用栈实现队列 - 力扣](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

> ![image-20220303203442224](README.assets/image-20220303203442224.png)

```java
import java.util.Stack;

class MyQueue {

    Stack<Integer> in, out;

    public MyQueue() {
        in = new Stack<>();
        out = new Stack<>();
    }

    public void push(int x) {
        in.add(x);
    }

    public void CheckOut() {
        if (out.size() == 0) {
            while (in.size() > 0) out.add(in.pop());
        }
    }

    public int pop() {
        CheckOut();
        return out.pop();
    }

    public int peek() {
        CheckOut();
        return out.peek();
    }

    public boolean empty() {
        return in.empty() && out.empty();
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```

