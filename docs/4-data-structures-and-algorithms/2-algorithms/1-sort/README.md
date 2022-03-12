---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 排序算法

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: 数据结构和算法

# 一个页面可以有多个标签
tag:
- 算法
- 排序

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning 转载声明

- [java实现10种排序算法](https://blog.csdn.net/weixin_44531966/article/details/116464294)
- [十大经典排序算法的复杂度分析](https://blog.csdn.net/alzzw/article/details/98100378)

- [排序：希尔排序](https://www.jianshu.com/p/d730ae586cf3)
- [10大经典排序算法动图演示，看这篇就够了！](https://www.cnblogs.com/aishangJava/p/10092341.html)

:::



## 一、冒泡排序

时间复杂度：O(n^2^)

空间复杂度：O(1)

```java
import java.util.Arrays;

public class Solution {
    public static void main(String[] args) {
        int[] arr = {3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48};

        for (int i = 0, len = arr.length; i < len; ++i) {
            for (int j = len - 1; j > i; --j) {
                if (arr[j] < arr[j - 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = tmp;
                }
            }
        }

        System.out.println(Arrays.toString(arr));
    }
}
```



## 二、选择排序

时间复杂度：O(n^2^)

空间复杂度：O(1)

![在这里插入图片描述](README.assets/20210506221249385.gif)

```java
import java.util.Arrays;

public class Solution {
    public static void main(String[] args) {
        int[] arr = {3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48};

        for (int i = 0, len = arr.length; i < len; ++i) {
            int idx = i;
            for (int j = i + 1; j < len; ++j) {
                if (arr[j] < arr[idx]) idx = j;
            }
            int tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }

        System.out.println(Arrays.toString(arr));
    }
}
```



## 三、插入排序

时间复杂度：O(n^2^)

空间复杂度：O(1)

![在这里插入图片描述](README.assets/2021050622130485.gif)

```java
import java.util.Arrays;

public class Solution {
    public static void main(String[] args) {
        int[] arr = {3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48};

        for (int i = 0, len = arr.length; i < len; ++i) {
            int val = arr[i];
            int idx = i - 1;

            while (idx >= 0 && arr[idx] > val) {
                arr[idx + 1] = arr[idx];
                idx--;
            }
            arr[idx + 1] = val;
        }

        System.out.println(Arrays.toString(arr));
    }
}
```



## 四、希尔排序

时间复杂度：O(nlog2n)

空间复杂度：

希尔排序是将待排序的数组元素 按下标的一定增量分组 ，分成多个子序列，然后对各个子序列进行直接插入排序算法排序；然后依次缩减增量再进行排序，直到增量为1时，进行最后一次直接插入排序，排序结束。

![img](README.assets/640.gif)

```java
import java.util.Arrays;

public class Solution {
    public static void main(String[] args) {
        int[] arr = {3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48};

        int len = arr.length;
        for (int step = len / 2; step > 0; step /= 2) {
            for (int i = step; i < len; ++i) {
                for (int j = i - step; j >= 0; j -= step) {
                    if (arr[j] > arr[j + step]) {
                        int tmp = arr[j];
                        arr[j] = arr[j + step];
                        arr[j + step] = tmp;
                    }
                }
            }
        }

        System.out.println(Arrays.toString(arr));
    }
}
```

