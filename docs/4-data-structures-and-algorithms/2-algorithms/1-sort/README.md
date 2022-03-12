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

