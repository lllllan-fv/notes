---
# 这是页面的图标
icon: page

# 这是文章的标题
title: HashMap 源码解读

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- 集合
- 源码解读

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



## 基本属性

```java
// 默认初始容量-必须是2的幂。
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16

// 最大容量
static final int MAXIMUM_CAPACITY = 1 << 30;

// 默认的加载因子
static final float DEFAULT_LOAD_FACTOR = 0.75f;

// 树化的阈值，当节点个数到达阈值之后将链表转换为红黑树
static final int TREEIFY_THRESHOLD = 8;

// 收缩的阈值，当节点个数减少的阈值之后将红黑树退化为链表
static final int UNTREEIFY_THRESHOLD = 6;

// 容量达到该值以后才能树化
static final int MIN_TREEIFY_CAPACITY = 64;

// 存放数据的表
transient Node<K,V>[] table;

// 缓存？还不知道是干嘛的
transient Set<Map.Entry<K,V>> entrySet;

// 当前键值对个数
transient int size;

// 修改次数，用于迭代器快速失败？
transient int modCount;

// 下一个要调整大小的大小值（容量 * 加载因子）
int threshold;

// 哈希表的加载因子
final float loadFactor;
```



### 内部类

```java
// 键值对形式的节点
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }

    public final K getKey()        { return key; }
    public final V getValue()      { return value; }
    public final String toString() { return key + "=" + value; }

    public final int hashCode() {
        return Objects.hashCode(key) ^ Objects.hashCode(value);
    }

    public final V setValue(V newValue) {
        V oldValue = value;
        value = newValue;
        return oldValue;
    }

    public final boolean equals(Object o) {
        if (o == this)
            return true;
        if (o instanceof Map.Entry) {
            Map.Entry<?,?> e = (Map.Entry<?,?>)o;
            if (Objects.equals(key, e.getKey()) &&
                Objects.equals(value, e.getValue()))
                return true;
        }
        return false;
    }
}
```



## 构造方法



### 无参构造

```java
public HashMap() {
    // 使用默认的加载因子
    this.loadFactor = DEFAULT_LOAD_FACTOR; 
}
```



### 指定容量

```java
public HashMap(int initialCapacity) {
    // 设置初始容量，使用默认的加载因子
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}
```



### 指定容量和加载因子

[HashMap之tableSizeFor方法图解](https://www.cnblogs.com/xiyixiaodao/p/14483876.html)

```java
public HashMap(int initialCapacity, float loadFactor) {
    // 如果指定容量小于零，抛出异常
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
    
    // 如果指定容量超过允许的最大容量，使用允许的最大容量
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    
    // 检查指定的加载因子的合法性
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
    
    this.loadFactor = loadFactor;
    // 求得不小于指定容量，并且最近的2的幂次
    this.threshold = tableSizeFor(initialCapacity);
}
```



### 指定集合

```java
public HashMap(Map<? extends K, ? extends V> m) {
    // 使用默认加载因子
    this.loadFactor = DEFAULT_LOAD_FACTOR;
    putMapEntries(m, false);
}
```



## 添加元素





### 添加键值对

```java
public V put(K key, V value) {
    // 调用 putVal 方法来添加
    return putVal(hash(key), key, value, false, true);
}
```



### 添加指定集合

```java
final void putMapEntries(Map<? extends K, ? extends V> m, boolean evict) {
    int s = m.size();
    if (s > 0) {
        if (table == null) { // pre-size
            float ft = ((float)s / loadFactor) + 1.0F;
            int t = ((ft < (float)MAXIMUM_CAPACITY) ? (int)ft : MAXIMUM_CAPACITY);
            if (t > threshold)
                threshold = tableSizeFor(t);
        }
        else if (s > threshold) resize();
        
        // 遍历指定的集合，将其中的键值对，逐一添加到表中
        for (Map.Entry<? extends K, ? extends V> e : m.entrySet()) {
            K key = e.getKey();
            V value = e.getValue();
            putVal(hash(key), key, value, false, evict);
        }
    }
}
```



### 实际执行的添加方法

- hash：键 key 的 hash
- key：键
- value：值
- onlyIfAbsent：不知道
- evict：不知道

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; 
    Node<K,V> p; 
    int n, i;
    
    // 如果当前表为空，或者表大小为零，调用 resize 创建表
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    
    // (n - 1) & hash 就是 n % hash
    // 根据hash值计算一个索引，将键值对存放在该索引处的链表（or红黑树）
    if ((p = tab[i = (n - 1) & hash]) == null)
        // 如果索引处没有节点（键值对），直接将指定键值对放入
        tab[i] = newNode(hash, key, value, null);
    
    else {
        Node<K,V> e; K k;
        // 如果索引处的节点（键值对）等于当前指定键值对，
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        
        // 如果索引处的链表已经树化，则调用 putTreeVal 来添加键值对
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        
        
        else {
            // 遍历索引处的链表
            for (int binCount = 0; ; ++binCount) {
                // 遍历到链表末尾，说明没有出现过该键值，则链表末尾添加该键值对
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    
                    // 如果此时链表的大小，不小于规定的树化的阈值，则对该链表进行树化
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                
                // 遍历到某个节点（键值对），并且该节点的键值都和指定添加的键值对相等，那就没添加的必要了
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        
        // 如果是在链表末尾添加指定键值对，那么 e=null
        // 如果链表中出现过某个节点（键值对）的键和指定键相等，则 e!=null
        if (e != null) {
            V oldValue = e.value;
            
            // onlyIfAbsent 是啥？
            if (!onlyIfAbsent || oldValue == null)
                // 将指定的 value 覆盖原来的 value
                e.value = value;
            
            // 不知道干了什么
            afterNodeAccess(e);
            
            // 返回添加之前，原来的value
            return oldValue;
        }
    }
    
    ++modCount;
    
    // 如果节点个数超过阈值，对数组进行扩容。阈值 = 当前数组大小 * 加载因子0.75
    if (++size > threshold)
        resize();
    
    // 不知道干了什么
    afterNodeInsertion(evict);
    return null;
}
```



## 数组扩容

```java
final Node<K,V>[] resize() {
    // 获取当前的数组
    Node<K,V>[] oldTab = table;
    
    // 获取数组的大小
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    
    // 获取当前的阈值
    int oldThr = threshold;
    int newCap, newThr = 0;
    
    if (oldCap > 0) {
        // 如果数组的大小，已经不小于允许的最大容量
        if (oldCap >= MAXIMUM_CAPACITY) {
            // 将阈值调到最大 = Integer的最大值
            threshold = Integer.MAX_VALUE;
            // 不能再扩容了，返回原数组
            return oldTab;
        }
        
        // 如果数组的大小 >= 默认初始大小，并且扩容一倍以后还在允许的最大容量范围内
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            // 将阈值放大一倍
            newThr = oldThr << 1;
    }
    
    // 如果阈值 > 0
    else if (oldThr > 0) 
        // 将阈值设置为新的大小
        newCap = oldThr;
    
    // 如果数组大小等于零，阈值也等于零
    else {
        // 设置默认的初始容量
        newCap = DEFAULT_INITIAL_CAPACITY;
        // 容量8 * 加载因子0.75 = 新的阈值6
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    
    // 计算新的阈值 = min(允许的最大容量，新容量 * 加载因子)
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    
    // 更改阈值
    threshold = newThr;
    
    // 创建一个临时的新的数组
    @SuppressWarnings({"rawtypes","unchecked"})
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    
    // 下面这一步，是扩容之后，将所有的节点重新分布
    if (oldTab != null) {
        // 遍历原来的数组，获取每个索引处的链表（or红黑树）
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            
            // 获取索引处的节点（可能是链表中的节点，也可能是红黑树中的节点）
            if ((e = oldTab[j]) != null) {
                // 将原数组的索引处置为 null，方便后续回收
                oldTab[j] = null;
                
                // 如果当前链表中只有一个节点
                if (e.next == null)
                    // 直接将该节点插入到新数组的指定索引处
                    newTab[e.hash & (newCap - 1)] = e;
                
                // 如果该节点是树上的节点
                else if (e instanceof TreeNode)
                    // split，不知道在干嘛
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                else {
                    // 因为是两倍扩容，索引的计算方式为 = hash & (数组大小 - 1)
                    // 所以扩容以后，该链表下的节点，最多会被分配到两条新的链表当中
                    // 因此创建两条链表，分别存储对应的节点
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    
                    // 链表不为空，将该链表置于新数组的j索引处
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    
                    // 另一条链表不为空，将该链表置于新数组j + oldCap索引处
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```



## 红黑树相关



### 链表树化

```java
final void treeifyBin(Node<K,V>[] tab, int hash) {
    int n, index; 
    Node<K,V> e;
    
    // 如果数组为空，或者数组大小都没到达规定的最小树化大小
    if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
        先对数组进行扩容
        resize();
    
    // 获取指定索引处的链表
    else if ((e = tab[index = (n - 1) & hash]) != null) {
        // 创建红黑树的节点
        TreeNode<K,V> hd = null, tl = null;
        
        // 将链表中的节点，逐一添加到红黑树中
        do {
            TreeNode<K,V> p = replacementTreeNode(e, null);
            if (tl == null)
                hd = p;
            else {
                p.prev = tl;
                tl.next = p;
            }
            tl = p;
        } while ((e = e.next) != null);
        
        // 红黑树不为空， 调用 treeify，正式树化
        if ((tab[index] = hd) != null)
            hd.treeify(tab);
    }
}
```



### 正式树化

```java
final void treeify(Node<K,V>[] tab) {
    TreeNode<K,V> root = null;
    
    // 遍历树中的节点
    for (TreeNode<K,V> x = this, next; x != null; x = next) {
        next = (TreeNode<K,V>)x.next;
        
        // 左右节点置为null
        x.left = x.right = null;
        
        // 将第一个节点作为跟，黑节点
        if (root == null) {
            x.parent = null;
            x.red = false;
            root = x;
        }
        
        else {
            K k = x.key;
            int h = x.hash;
            Class<?> kc = null;
            
            // 从根遍历树，不懂红黑树，每太看懂。反正就是决定s
            for (TreeNode<K,V> p = root;;) {
                int dir, ph;
                K pk = p.key;
                if ((ph = p.hash) > h)
                    dir = -1;
                else if (ph < h)
                    dir = 1;
                else if ((kc == null &&
                          (kc = comparableClassFor(k)) == null) ||
                         (dir = compareComparables(kc, k, pk)) == 0)
                    dir = tieBreakOrder(k, pk);

                TreeNode<K,V> xp = p;
                if ((p = (dir <= 0) ? p.left : p.right) == null) {
                    x.parent = xp;
                    if (dir <= 0)
                        xp.left = x;
                    else
                        xp.right = x;
                    root = balanceInsertion(root, x);
                    break;
                }
            }
        }
    }
    moveRootToFront(tab, root);
}
```





## 其他方法



### hash

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```



### comparableClassFor

```java
static Class<?> comparableClassFor(Object x) {
    if (x instanceof Comparable) {
        Class<?> c; Type[] ts, as; Type t; ParameterizedType p;
        if ((c = x.getClass()) == String.class) // bypass checks
            return c;
        if ((ts = c.getGenericInterfaces()) != null) {
            for (int i = 0; i < ts.length; ++i) {
                if (((t = ts[i]) instanceof ParameterizedType) &&
                    ((p = (ParameterizedType)t).getRawType() ==
                     Comparable.class) &&
                    (as = p.getActualTypeArguments()) != null &&
                    as.length == 1 && as[0] == c) // type arg is c
                    return c;
            }
        }
    }
    return null;
}
```



### compareComparables

```java
static int compareComparables(Class<?> kc, Object k, Object x) {
    return (x == null || x.getClass() != kc ? 0 :
            ((Comparable)k).compareTo(x));
}
```



### tableSizeFor

```java
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

