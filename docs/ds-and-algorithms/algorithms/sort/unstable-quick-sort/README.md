---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 不稳定的快速排序

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

- [经典排序算法----快速排序算法（不稳定）](https://blog.csdn.net/qianqin_2014/article/details/51207165)

:::



首先，这里的【不稳定】不是指快速排序排序速度的不稳定。不同的算法应对不同的情况都可能出现最坏的时间复杂度。



 排序算法的稳定性，通俗地讲就是能保证排序前2个相等的数其在序列的前后位置顺序和排序后它们两个的前后位置顺序相同。在简单形式化一下，如果Ai = Aj，Ai原来在位置前，排序后Ai还是要在Aj位置前。 



快速排序有两个方向，左边的 i 下标一直往右走，当 `a[i] <= a[center_index]`，其中 center_index 是中枢元素的数组下标，一般取为数组第 0 个元素。而右边的 j 下标一直往左走，当 `a[j] > a[center_index]`。如果i和j都走不动了，`i <= j`，交换 a[i] 和 a[j] ，重复上面的过程，直到 i > j。 交换 a[j] 和 a[center_index]，完成一趟快速排序。在中枢元素和 a[j] 交换的时候，很有可能把前面的元素的稳定性打乱，比如序列为 `5 3 3 4 3 8 9 10 11`，现在中枢元素 5 和 3（第5个元素，下标从1开始计）交换就会把元素3的稳定性打乱，所以快速排序是一个不稳定的排序算法，不稳定发生在中枢元素和a[j] 交换的时刻。



## 一般写法

```java
import java.util.Arrays;

public class Solution {

    public static void sort(int[] arr, int l, int r) {
        if (l >= r) return;

        int i = l, j = r;
        int tmp = arr[l];
        while (i < j) {
            while (tmp <= arr[j] && i < j) --j;
            while (tmp >= arr[i] && i < j) ++i;
            if (i < j) {
                int tem = arr[i];
                arr[i] = arr[j];
                arr[j] = tem;
            }
        }
        arr[l] = arr[i];
        arr[i] = tmp;

        sort(arr, l, j - 1);
        sort(arr, j + 1, r);
    }

    public static void main(String[] args) {
        int[] arr = {3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48};

        sort(arr, 0, arr.length - 1);

        System.out.println(Arrays.toString(arr));
    }
}
```



## 解决不稳定性

![image-20220403205257815](README.assets/image-20220403205257815.png)

为了维持原来的相对顺序，需要借助一个辅助数来来存放，并且还牺牲了很大的时间复杂度。

```java
import java.util.Arrays;

public class Solution {
    int[] tmp;

    public static void sort(int[] arr, int l, int r) {
        if (l >= r) return;

        int idx = l, i = l;
        for (int i = l; i <= r; ++i) {
            if (arr[i] < arr[l]) tmp[idx++] = arr[i];
        }
        for (int i = l; i <= r; ++i) {
            if (arr[i] == arr[l]) tmp[idx++] = arr[i];
        }
        for (int i = l; i <= r; ++i) {
            if (arr[i] > arr[l]) tmp[idx++] = arr[i];
        }
        for (int i = l; i <= r; ++i) {
            arr[i] = tmp[i];
        }

        sort(arr, l, j - 1);
        sort(arr, j + 1, r);
    }

    public static void main(String[] args) {
        int[] arr = {3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48};
        tmp = new int[arr.length];

        sort(arr, 0, arr.length - 1);

        System.out.println(Arrays.toString(arr));
    }
}
```

