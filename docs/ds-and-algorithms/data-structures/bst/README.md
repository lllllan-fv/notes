---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 二叉搜索树 代码实现

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





偷懒就不写思路了，贴个代码和一些简单注释



## 创建类

```java
public class BSTree<T extends Comparable<T>> {

    private BSTNode<T> root;

    public BSTree() {
    }
    
    public class BSTNode<T extends Comparable<T>> {
        T value;
        BSTNode<T> left;
        BSTNode<T> right;

        public BSTNode(T value, BSTNode<T> left, BSTNode<T> right) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

}
```



## 遍历方法



### 前序遍历

```java
/**
 * 打印前序遍历
 */
public void printPreOrder() {
    StringBuilder str = new StringBuilder("前序遍历：[");
    if (root != null) {
        str.append(preOrder(root));
        str.deleteCharAt(str.length() - 1);
    }
    str.append("]");

    System.out.println(str);
}

public StringBuilder preOrder(BSTNode<T> node) {
    if (node == null) return new StringBuilder("");

    StringBuilder res = preOrder(node.left);
    res.append(node.value.toString()).append(",");
    res.append(preOrder(node.right));

    return res;
}
```



### 中序遍历

```java
/**
 * 打印中序遍历
 */
public void printInOrder() {
    StringBuilder str = new StringBuilder("中序遍历：[");
    if (root != null) {
        str.append(inOrder(root));
        str.deleteCharAt(str.length() - 1);
    }
    str.append("]");

    System.out.println(str);
}

public StringBuilder inOrder(BSTNode<T> node) {
    if (node == null) return new StringBuilder("");

    StringBuilder res = new StringBuilder(node.value.toString()).append(",");
    res.append(inOrder(node.left));
    res.append(inOrder(node.right));

    return res;
}
```



### 后序遍历

```java
/**
 * 打印后序遍历
 */
public void printPostOrder() {
    StringBuilder str = new StringBuilder("后序遍历：[");
    if (root != null) {
        str.append(postOrder(root));
        str.deleteCharAt(str.length() - 1);
    }
    str.append("]");

    System.out.println(str);
}

public StringBuilder postOrder(BSTNode<T> node) {
    if (node == null) return new StringBuilder("");

    StringBuilder res = new StringBuilder(postOrder(node.left));
    res.append(postOrder(node.right));
    res.append(node.value.toString()).append(",");

    return res;
}
```





## 查找方法



### 查找特定值

```java
/**
 * 查找
 *
 * @param value
 * @return
 */
public BSTNode<T> search(T value) {
    return search(root, value);
}

public BSTNode<T> search(BSTNode<T> node, T value) {
    if (root == null || value == null) return null;
    int cmp = value.compareTo(node.value);
    if (cmp == 0) {
        return node;
    } else if (cmp < 0) {
        return search(node.left, value);
    } else {
        return search(node.right, value);
    }
}
```



### 查找最小值

```java
/**
 * 找最小值
 *
 * @return
 */
public T searchMinValue() {
    if (root == null) return null;

    BSTNode<T> node = searchMinValue(root);
    return node == null ? null : node.value;
}

public BSTNode<T> searchMinValue(BSTNode<T> node) {
    while (node.left != null) node = node.left;
    return node;
}
```



### 查找最大值

```java
/**
 * 找最大值
 *
 * @return
 */
public T searchMaxValue() {
    if (root == null) return null;

    BSTNode<T> node = searchMaxValue(root);
    return node == null ? null : node.value;
}

public BSTNode<T> searchMaxValue(BSTNode<T> node) {
    while (node.right != null) node = node.right;
    return node;
}
```



## 插入节点

```java
/**
 * 插入节点 （去重）
 *
 * @param value
 * @return 是否插入成功
 */
public boolean insert(T value) {
    if (value == null) return false;
    if (root == null) {
        root = new BSTNode<>(value, null, null);
        return true;
    }

    return insert(root, value);
}

public boolean insert(BSTNode<T> node, T value) {
    int cmp = value.compareTo(node.value);
    if (cmp == 0) {
        return false;
    } else if (cmp < 0) {
        if (node.left == null) {
            node.left = new BSTNode(value, null, null);
            return true;
        } else {
            return insert(node.left, value);
        }
    } else {
        if (node.right == null) {
            node.right = new BSTNode(value, null, null);
            return true;
        } else {
            return insert(node.right, value);
        }
    }
}
```



## 删除节点

```java
/**
 * 删除节点
 *
 * @param value
 * @return 是否删除成功
 */
public boolean delete(T value) {
    if (value == null) return false;
    return delete(null, root, value);
}

public boolean delete(BSTNode<T> pre, BSTNode<T> node, T value) {
    if (node == null) return false;

    int cmp = value.compareTo(node.value);
    if (cmp == 0) {
        delete(pre, node);
        return true;
    } else if (cmp < 0) {
        return delete(node, node.left, value);
    } else {
        return delete(node, node.right, value);
    }
}

public void delete(BSTNode<T> pre, BSTNode<T> node) {
    if (node.right == null) {
        // 右子树为空，直接接上左子树
        node = node.left;
    } else if (node.left == null) {
        // 左子树为空，直接接上右子树
        node = node.right;
    } else {
        // 都不为空
        // 找到左子树中，最大的节点，并替换到删除节点位置处
        BSTNode<T> parent = node;
        BSTNode<T> leftMaxValueNode = node.left;
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
}
```

