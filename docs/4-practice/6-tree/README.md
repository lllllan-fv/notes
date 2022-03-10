---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 树相关练习

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



## 一、二叉树遍历



### 1. [144. 二叉树的前序遍历 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

> ![image-20220310194705058](README.assets/image-20220310194705058.png)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {

    List<Integer> list = new LinkedList<>();

    public void pre(TreeNode root) {
        if (root == null) return;
        list.add(root.val);
        pre(root.left);
        pre(root.right);
    }

    public List<Integer> preorderTraversal(TreeNode root) {
        pre(root);
        return list;
    }
}
```

