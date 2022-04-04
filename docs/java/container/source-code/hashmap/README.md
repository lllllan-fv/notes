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



## 添加键值对





### 添加一个键值对

```java
public V put(K key, V value) {
    // 调用 putVal 方法来添加
    return putVal(hash(key), key, value, false, true);
}
```



### 添加一个键值对，原来存在不做修改

```java
@Override
public V putIfAbsent(K key, V value) {
    // 调用 putVal 方法插入键值对，onlyIfAbsent 为 true，表示不修改原来的键值对
    return putVal(hash(key), key, value, true, true);
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



### 链表中的添加方法

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
            
            // onlyIfAbsent 如果为 true，表示如果原来存在键值对，不做修改
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



### 红黑树中的添加方法 ★

不太行，不懂红黑树看不太懂

```java
final TreeNode<K,V> putTreeVal(HashMap<K,V> map, Node<K,V>[] tab,
                               int h, K k, V v) {
    Class<?> kc = null;
    boolean searched = false;
    TreeNode<K,V> root = (parent != null) ? root() : this;
    
    // 从树的根节点开始
    for (TreeNode<K,V> p = root;;) {
        int dir, ph; 
        K pk;
        if ((ph = p.hash) > h)
            dir = -1;
        else if (ph < h)
            dir = 1;
        else if ((pk = p.key) == k || (k != null && k.equals(pk)))
            return p;
        else if ((kc == null &&
                  (kc = comparableClassFor(k)) == null) ||
                 (dir = compareComparables(kc, k, pk)) == 0) {
            if (!searched) {
                TreeNode<K,V> q, ch;
                searched = true;
                if (((ch = p.left) != null &&
                     (q = ch.find(h, k, kc)) != null) ||
                    ((ch = p.right) != null &&
                     (q = ch.find(h, k, kc)) != null))
                    return q;
            }
            dir = tieBreakOrder(k, pk);
        }

        TreeNode<K,V> xp = p;
        if ((p = (dir <= 0) ? p.left : p.right) == null) {
            Node<K,V> xpn = xp.next;
            TreeNode<K,V> x = map.newTreeNode(h, k, v, xpn);
            if (dir <= 0)
                xp.left = x;
            else
                xp.right = x;
            xp.next = x;
            x.parent = x.prev = xp;
            if (xpn != null)
                ((TreeNode<K,V>)xpn).prev = x;
            moveRootToFront(tab, balanceInsertion(root, x));
            return null;
        }
    }
}
```





## 获取键值对



### 获取 value，1

```java
public V get(Object key) {
    Node<K,V> e;
    // 调用 getNode 方法，返回值为空代表不存在 key 的键值对
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}
```



### 获取 value，2

```java
@Override
public V getOrDefault(Object key, V defaultValue) {
    Node<K,V> e;
    // 调用 getNode 方法查询 key 对应的 value，若查询不到返回形参 defaultValue
    return (e = getNode(hash(key), key)) == null ? defaultValue : e.value;
}
```





### 是否包含 key

```java
public boolean containsKey(Object key) {
    // 调用 getNode
    return getNode(hash(key), key) != null;
}
```



### 是否包含 value

```java
public boolean containsValue(Object value) {
    Node<K,V>[] tab; 
    V v;
    if ((tab = table) != null && size > 0) {
        for (int i = 0; i < tab.length; ++i) {
            // 最暴力的办法，遍历整个数组的所有链表
            for (Node<K,V> e = tab[i]; e != null; e = e.next) {
                if ((v = e.value) == value ||
                    (value != null && value.equals(v)))
                    return true;
            }
        }
    }
    return false;
}
```



### getNode

```java
final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; 
    Node<K,V> first, e; 
    int n; K k;
    
    // 如果数组不为空，获取对应索引处的链表
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        
        if (first.hash == hash && // 单独判断一下第一个节点，不知道有什么用
            ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        
        if ((e = first.next) != null) {
            // 如果该链表已经树化，调用对应的 getTreeNode
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            
            // 遍历链表，比较 key
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    
    // 遍历结束，没有相同的 key，返回 null
    return null;
}
```



## 删除键值对



### 删除 key

```java
public V remove(Object key) {
    Node<K,V> e;
    
    // 调用 removeNode，返回原键值对的 value
    return (e = removeNode(hash(key), key, null, false, true)) == null ? null : e.value;
}
```



### 删除指定键值对

```java
@Override
public boolean remove(Object key, Object value) {
    // 调用 removeNode 方法，matchValue 为 true，表示键值对必须严格 key、value 都相等才能删除
    return removeNode(hash(key), key, value, true, true) != null;
}
```



### 删除整个map

```java
public void clear() {
    Node<K,V>[] tab;
    modCount++;
    if ((tab = table) != null && size > 0) {
        size = 0;
        // 遍历整个数组，删除所有的链表
        // 索引处置为 null，链表失去引用等待gc回收
        for (int i = 0; i < tab.length; ++i)
            tab[i] = null;
    }
}
```



### 链表中的删除方法

```java
final Node<K,V> removeNode(int hash, Object key, Object value,
                           boolean matchValue, boolean movable) {
    Node<K,V>[] tab; 
    Node<K,V> p; 
    int n, index;
    
    // 只要数组不为空，就获取对应索引处的链表
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (p = tab[index = (n - 1) & hash]) != null) {
        
        Node<K,V> node = null, e; 
        K k; 
        V v;
   		
        // 单独判断第一个节点
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            node = p;
        
        else if ((e = p.next) != null) {
            // 如果该链表已经树化，调用对应的 getTreeNode
            if (p instanceof TreeNode)
                node = ((TreeNode<K,V>)p).getTreeNode(hash, key);
            
            // 遍历链表
            else {
                do {
                    if (e.hash == hash &&
                        ((k = e.key) == key ||
                         (key != null && key.equals(k)))) {
                        node = e;
                        break;
                    }
                    p = e;
                } while ((e = e.next) != null);
            }
        }
        // 如果找到对应的 key，获取该节点
        
        // remove函数中的 matchValue 为 false，标识别管 value值，直接删除键值对
        // 其他时候必须当前键值对的 value 和形参中的 value 相等才可以删除
        if (node != null && (!matchValue || (v = node.value) == value ||
                             (value != null && value.equals(v)))) {
            
            // 如果链表已经树化，调用对应的 removeTreeNode
            if (node instanceof TreeNode)
                ((TreeNode<K,V>)node).removeTreeNode(this, tab, movable);
            
            // 该节点刚好是链表第一个节点，数组索引直接改到 node.next
            else if (node == p)
                tab[index] = node.next;
            
            // 该节点在链表中间
            else
                p.next = node.next;
            
            ++modCount;
            --size;
            // 不知道做了什么
            afterNodeRemoval(node);
            return node;
        }
    }
    
    return null;
}
```



### 红黑树中的删除方法 ★

乐了，看不懂

```java
final void removeTreeNode(HashMap<K,V> map, Node<K,V>[] tab,
                          boolean movable) {
    int n;
    
    // 数组为空，别搞了
    if (tab == null || (n = tab.length) == 0)
        return;
    
    int index = (n - 1) & hash;
    TreeNode<K,V> first = (TreeNode<K,V>)tab[index], root = first, rl;
    TreeNode<K,V> succ = (TreeNode<K,V>)next, pred = prev;
    
    // 不知道 pred/prev 指代什么节点，
    // 数组索引处指向 first
    if (pred == null)
        tab[index] = first = succ;
    else
        pred.next = succ;
    if (succ != null)
        succ.prev = pred;
    if (first == null)
        return;
    if (root.parent != null)
        root = root.root();
    
    if (root == null
        || (movable
            && (root.right == null
                || (rl = root.left) == null
                || rl.left == null))) {
        
        // 树中节点太少（根为空，左子树为空，右子树为空），退化为链表
        tab[index] = first.untreeify(map);  // too small
        return;
    }
    
    TreeNode<K,V> p = this, pl = left, pr = right, replacement;
    if (pl != null && pr != null) {
        TreeNode<K,V> s = pr, sl;
        while ((sl = s.left) != null) // find successor
            s = sl;
        boolean c = s.red; s.red = p.red; p.red = c; // swap colors
        TreeNode<K,V> sr = s.right;
        TreeNode<K,V> pp = p.parent;
        if (s == pr) { // p was s's direct parent
            p.parent = s;
            s.right = p;
        }
        else {
            TreeNode<K,V> sp = s.parent;
            if ((p.parent = sp) != null) {
                if (s == sp.left)
                    sp.left = p;
                else
                    sp.right = p;
            }
            if ((s.right = pr) != null)
                pr.parent = s;
        }
        p.left = null;
        if ((p.right = sr) != null)
            sr.parent = p;
        if ((s.left = pl) != null)
            pl.parent = s;
        if ((s.parent = pp) == null)
            root = s;
        else if (p == pp.left)
            pp.left = s;
        else
            pp.right = s;
        if (sr != null)
            replacement = sr;
        else
            replacement = p;
    }
    else if (pl != null)
        replacement = pl;
    else if (pr != null)
        replacement = pr;
    else
        replacement = p;
    if (replacement != p) {
        TreeNode<K,V> pp = replacement.parent = p.parent;
        if (pp == null)
            root = replacement;
        else if (p == pp.left)
            pp.left = replacement;
        else
            pp.right = replacement;
        p.left = p.right = p.parent = null;
    }

    TreeNode<K,V> r = p.red ? root : balanceDeletion(root, replacement);

    if (replacement == p) {  // detach
        TreeNode<K,V> pp = p.parent;
        p.parent = null;
        if (pp != null) {
            if (p == pp.left)
                pp.left = null;
            else if (p == pp.right)
                pp.right = null;
        }
    }
    if (movable)
        moveRootToFront(tab, r);
}
```



## 替换键值对



### 替换键值对1

```java
@Override
public V replace(K key, V value) {
    Node<K,V> e;
    // 如果表中存在 key，将原来的 value 替换为新的 value
    if ((e = getNode(hash(key), key)) != null) {
        V oldValue = e.value;
        e.value = value;
        // 不知道做了什么
        afterNodeAccess(e);
        // 返回原来的 value
        return oldValue;
    }
    return null;
}
```



### 替换键值对2

```java
@Override
public boolean replace(K key, V oldValue, V newValue) {
    Node<K,V> e; V v;
    // 如果表中存在 key，并且当前 value 等于指定的形参 oldValue，替换为形参 newValue
    if ((e = getNode(hash(key), key)) != null &&
        ((v = e.value) == oldValue || (v != null && v.equals(oldValue)))) {
        e.value = newValue;
        afterNodeAccess(e);
        return true;
    }
    return false;
}
```



### 替换指定集合

```java
@Override
public void replaceAll(BiFunction<? super K, ? super V, ? extends V> function) {
    Node<K,V>[] tab;
    
    // 指定集合为空，抛出异常
    if (function == null)
        throw new NullPointerException();
    
    // 当前数组不为空
    if (size > 0 && (tab = table) != null) {
        int mc = modCount;
        // 遍历数组中的所有链表
        for (int i = 0; i < tab.length; ++i) {
            for (Node<K,V> e = tab[i]; e != null; e = e.next) {
                // 调用指定集合的 apply 方法，不知道在干嘛
                e.value = function.apply(e.key, e.value);
            }
        }
        if (modCount != mc)
            throw new ConcurrentModificationException();
    }
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



### split ★

红黑树部分都看不懂

```java
final void split(HashMap<K,V> map, Node<K,V>[] tab, int index, int bit) {
    TreeNode<K,V> b = this;
    // Relink into lo and hi lists, preserving order
    TreeNode<K,V> loHead = null, loTail = null;
    TreeNode<K,V> hiHead = null, hiTail = null;
    int lc = 0, hc = 0;
    for (TreeNode<K,V> e = b, next; e != null; e = next) {
        next = (TreeNode<K,V>)e.next;
        e.next = null;
        if ((e.hash & bit) == 0) {
            if ((e.prev = loTail) == null)
                loHead = e;
            else
                loTail.next = e;
            loTail = e;
            ++lc;
        }
        else {
            if ((e.prev = hiTail) == null)
                hiHead = e;
            else
                hiTail.next = e;
            hiTail = e;
            ++hc;
        }
    }

    if (loHead != null) {
        if (lc <= UNTREEIFY_THRESHOLD)
            tab[index] = loHead.untreeify(map);
        else {
            tab[index] = loHead;
            if (hiHead != null) // (else is already treeified)
                loHead.treeify(tab);
        }
    }
    if (hiHead != null) {
        if (hc <= UNTREEIFY_THRESHOLD)
            tab[index + bit] = hiHead.untreeify(map);
        else {
            tab[index + bit] = hiHead;
            if (loHead != null)
                hiHead.treeify(tab);
        }
    }
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



### computeIfAbsent

```java
@Override
public V computeIfAbsent(K key,
                         Function<? super K, ? extends V> mappingFunction) {
    if (mappingFunction == null)
        throw new NullPointerException();
    int hash = hash(key);
    Node<K,V>[] tab; Node<K,V> first; int n, i;
    int binCount = 0;
    TreeNode<K,V> t = null;
    Node<K,V> old = null;
    if (size > threshold || (tab = table) == null ||
        (n = tab.length) == 0)
        n = (tab = resize()).length;
    if ((first = tab[i = (n - 1) & hash]) != null) {
        if (first instanceof TreeNode)
            old = (t = (TreeNode<K,V>)first).getTreeNode(hash, key);
        else {
            Node<K,V> e = first; K k;
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k)))) {
                    old = e;
                    break;
                }
                ++binCount;
            } while ((e = e.next) != null);
        }
        V oldValue;
        if (old != null && (oldValue = old.value) != null) {
            afterNodeAccess(old);
            return oldValue;
        }
    }
    V v = mappingFunction.apply(key);
    if (v == null) {
        return null;
    } else if (old != null) {
        old.value = v;
        afterNodeAccess(old);
        return v;
    }
    else if (t != null)
        t.putTreeVal(this, tab, hash, key, v);
    else {
        tab[i] = newNode(hash, key, v, first);
        if (binCount >= TREEIFY_THRESHOLD - 1)
            treeifyBin(tab, hash);
    }
    ++modCount;
    ++size;
    afterNodeInsertion(true);
    return v;
}
```



### computeIfPresent

```java
public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction) {
    if (remappingFunction == null)
        throw new NullPointerException();
    Node<K,V> e; V oldValue;
    int hash = hash(key);
    if ((e = getNode(hash, key)) != null &&
        (oldValue = e.value) != null) {
        V v = remappingFunction.apply(key, oldValue);
        if (v != null) {
            e.value = v;
            afterNodeAccess(e);
            return v;
        }
        else
            removeNode(hash, key, null, false, true);
    }
    return null;
}
```

