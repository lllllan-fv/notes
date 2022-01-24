---
# 这是页面的图标
icon: info

# 这是文章的标题
title: 数组练习

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



::: info

感谢 [「代码随想录」刷题攻略 (qq.com)](https://mp.weixin.qq.com/s/3olK6pBq1tzdoz2EzQZ6Gg) 的整理，本章是数组相关题型的简单整理

:::



## 二分

[【二分查找】详细图解](https://blog.csdn.net/qq_45978890/article/details/116094046)



### 1. [704-二分查找](https://leetcode-cn.com/problems/binary-search/)

> 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
>

```java
class Solution {
    public int search(int[] nums, int target) {
        int l = 0;
        int r = nums.length - 1;

        int mid = 0;
        while (l <= r) {
            mid = l + (r - l) / 2;
            if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        if (l >= nums.length || nums[l] != target) l = -1;

        return l;
    }
}
```



### 2. [35-搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)

> 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
>
> 请必须使用时间复杂度为 O(log n) 的算法。
>

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int l = 0, r = nums.length - 1;

        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        } 

        return l;
    }
}
```



### 3. [34-在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

> 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
>
> 如果数组中不存在目标值 target，返回 [-1, -1]。
>
> 进阶：
>
> 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
>

```java
class Solution {
    public int bs(int[] nums, int val, int tmp) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] < val) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        l -= tmp;
        if (l >= 0 && l < nums.length && nums[l] == val - tmp) return l;
        return -1;
    }

    public int[] searchRange(int[] nums, int target) {
        return new int[]{bs(nums, target, 0), bs(nums, target + 1, 1)};
    }
}
```



### 4. [69-Sqrt(x)](https://leetcode-cn.com/problems/sqrtx/)

> 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
>
> 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
>
> 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
>

注意x的范围，无脑平方可能会爆出int的范围

```java
class Solution {
    public int mySqrt(int x) {
        int l = 0, r = x;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            long tmp = 1l * mid * mid;
            if (tmp < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        long tmp = 1l * l * l;
        if (tmp > x) l--;
        return l;
    }
}
```



### 5. [367-有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/)

> 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
>
> 进阶：不要 使用任何内置的库函数，如  sqrt 。

```java
class Solution {
    public boolean isPerfectSquare(int num) {
        int l = 0, r = num;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            long tmp = 1l * mid * mid;
            if (tmp < num) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        long tmp = 1l * l * l;
        return tmp == num;
    }
}
```



## 移除元素/双指针



### 1. [27-移除元素](https://leetcode-cn.com/problems/remove-element/)

> 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
>
> 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
>
> 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
>

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        int l = 0;

        for (int num : nums) {

            if (num != val) nums[l++] = num;
        }

        return l;
    }
}
```



### 2. [26-删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

> 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
>
> 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
>

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) return 0;

        int ans = 0;

        for (int i = 1, len = nums.length; i < len; ++i) {
            if (nums[i] != nums[ans]) {
                nums[++ans] = nums[i];
            }
        }

        return ans + 1;
    }
}
```



### 3. [283-移动零](https://leetcode-cn.com/problems/move-zeroes/)

> 给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int l = 0;
        for (int i = 0, len = nums.length; i < len; ++i) {
            if (nums[i] != 0) {
                nums[l++] = nums[i];
            }
        }

        for (int i = l, len = nums.length; i < len; ++i) {
            nums[i] = 0;
        }
    }
}
```



### 4. [844-比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)

> 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，请你判断二者是否相等。# 代表退格字符。
>
> 如果相等，返回 true ；否则，返回 false 。
>
> 注意：如果对空文本输入退格字符，文本继续为空。
>

```java
class Solution {
    public boolean backspaceCompare(String s, String t) {
        String ss = back(s);
        String tt = back(t);
        return ss.equals(tt);
    }

    public String back(String s) {
        StringBuilder sb = new StringBuilder("");

        for (int i = 0, len = s.length(); i < len; ++i) {
            if (s.charAt(i) == '#') {
                int sz = sb.length();
                if (sz > 0) {
                    sb.deleteCharAt(sz - 1);
                }
            } else {
                sb.append(s.charAt(i));
            }
        }

        return sb.toString();
    }
}
```



### 5. [977-有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

> 给你一个按 **非递减顺序** 排序的整数数组 `nums`，返回 **每个数字的平方** 组成的新数组，要求也按 **非递减顺序** 排序。

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int len = nums.length;
        int[] ans = new int[len];

        int l = 0, r = --len;
        while (l <= r) {
            int lef = nums[l] * nums[l];
            int rig = nums[r] * nums[r];
            if (lef >= rig) {
                l++;
                ans[len--] = lef;
            } else {
                r--;
                ans[len--] = rig;
            }
        }

        return ans;
    }
}
```



## 滑动窗口



### 1. [209-长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

> 给定一个含有 n 个正整数的数组和一个正整数 target 。
>
> 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
>

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int len = nums.length;
        int ans = len;

        int l = 0, r = 0, sum = 0;
        while (r < len) {
            sum += nums[r++];
            if (sum >= target) {
                ans = Math.min(ans, r - l);
            }
            while (l < r) {
                if (sum - nums[l] >= target) {
                    sum -= nums[l++];
                    ans = Math.min(ans, r - l);
                } else {
                    break;
                }
            }
        }
        if (sum < target) return 0;

        return ans;
    }
}
```



### 2. [904-水果成篮](https://leetcode-cn.com/problems/fruit-into-baskets/)

> 你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果 种类 。
>
> 你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：
>
> 你只有 两个 篮子，并且每个篮子只能装 单一类型 的水果。每个篮子能够装的水果总量没有限制。
> 你可以选择任意一棵树开始采摘，你必须从 每棵 树（包括开始采摘的树）上 恰好摘一个水果 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到下一棵树，并继续采摘。
> 一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。
> 给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。

```java
class Solution {
    class node {
        private int num;
        private int cnt;

        public node() {
            num = cnt = 0;
        }

        public boolean add(int x) {
            if (cnt == 0) {
                num = x;
                cnt = 1;
                return true;
            } else if (num == x) {
                cnt++;
                return true;
            } else {
                return false;
            }
        }

        public void del(int x) {
            if (num == x && cnt > 0) {
                cnt--;
            }
        }
    }

    public int totalFruit(int[] fruits) {
        int ans = 0, right = 0;

        node a = new node(), b = new node();

        if (fruits.length == 0) return 0;
        a.add(fruits[right++]);

        for (int i = 0, len = fruits.length; i < len; ++i) {
            while (right < len) {
                if (a.add(fruits[right]) || b.add(fruits[right])) {
                    right++;
                } else {
                    break;
                }
            }

            ans = Math.max(ans, right - i);

            a.del(fruits[i]);
            b.del(fruits[i]);
        }

        return ans;
    }
}
```

