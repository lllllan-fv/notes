---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 平衡搜索树

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: 

# 一个页面可以有多个标签
tag:

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



ads



看懂思路之后自己手敲的，还没有拿数据严格校验过。

大体操作和 [二叉搜索树相同](../bst/)，下面只给出不同的地方的代码



## 插入节点

```java {22}
public boolean insert(AVLNode<T> pre, AVLNode<T> node, T value) {
    boolean res;

    int cmp = value.compareTo(node.value);
    if (cmp == 0) {
        res = false;
    } else if (cmp < 0) {
        if (node.left == null) {
            node.left = new AVLNode(value, null, null);
            res = true;
        } else {
            res = insert(node, node.left, value);
        }
    } else {
        if (node.right == null) {
            node.right = new AVLNode(value, null, null);
            res = true;
        } else {
            res = insert(node, node.right, value);
        }
    }

    rebalance(pre, node);

    return res;
}
```



## 删除节点

```java {21}
public boolean delete(AVLNode<T> pre, AVLNode<T> node, T value) {
    if (node == null) return false;
    boolean res;

    int cmp = value.compareTo(node.value);
    if (cmp == 0) {
        delete(pre, node);
        res = true;
    } else if (cmp < 0) {
        res = delete(node, node.left, value);
    } else {
        res = delete(node, node.right, value);
    }

    if (pre == null) {
        root = node;
    } else if (pre.left == node) {
        pre.left = node;
    } else {
        pre.right = node;
    }

    rebalance(pre, node);

    return res;
}
```



```java {37-39}
public void delete(AVLNode<T> pre, AVLNode<T> node) {
    AVLNode ori = node;
    if (node.right == null) {
        // 右子树为空，直接接上左子树
        node = node.left;
    } else if (node.left == null) {
        // 左子树为空，直接接上右子树
        node = node.right;
    } else {
        // 都不为空
        // 找到左子树中，最大的节点，并替换到删除节点位置处
        AVLNode<T> parent = node;
        AVLNode<T> leftMaxValueNode = node.left;
        while (leftMaxValueNode.right != null) {
            parent = leftMaxValueNode;
            leftMaxValueNode = leftMaxValueNode.right;
        }

        node.value = leftMaxValueNode.value;
        if (parent == node) {
            // 如果替换节点，就是删除节点的左节点。将替换节点的左子树，替换删除节点的左子树
            parent.left = leftMaxValueNode.left;
        } else {
            // 否则，将替换节点的左子树，连接到其父亲节点的右子树上
            parent.right = leftMaxValueNode.left;
        }
    }

    if (pre == null) {
        root = node;
    } else if (ori == pre.left) {
        pre.left = node;
    } else {
        pre.right = node;
    }

    // 平衡左右子树，再平衡自己
    rebalance(node, node.left);
    rebalance(node, node.right);
    rebalance(pre, node);
}
```



## 保持平衡

```java
public void rebalance(AVLNode<T> pre, AVLNode<T> node) {
    if (node == null) return;

    node.updateHeight();
    int balance = node.balanceFactor();
    if (balance >= -1 && balance <= 1) return;

    AVLNode link;
    if (balance == -2) {
        AVLNode right = node.right;
        node.right = right.left;
        right.left = node;
        link = right;
    } else {
        AVLNode left = node.left;
        node.left = left.right;
        left.right = node;
        link = left;
    }

    node.updateHeight();
    link.updateHeight();

    if (pre == null) {
        root = link;
    } else if (pre.left == node) {
        pre.left = link;
    } else {
        pre.right = link;
    }
}
```

