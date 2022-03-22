---
# 这是页面的图标
icon: page

# 这是文章的标题
title: ArrayList 源码解读

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
// 默认的初始容量 10
private static final int DEFAULT_CAPACITY = 10;

// 空数组，容量为零
private static final Object[] EMPTY_ELEMENTDATA = {};

// 无参构造的空数组，容量为10
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

// 数据存放的数组
transient Object[] elementData; // non-private to simplify nested class access

// 当前大小，即数组内元素个数
private int size;

// 数组的最大大小
// 尝试分配更大的数组可能导致 OutOfMemoryError：请求的数组大小超过虚拟机限制
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
```



### 为什么有两个空数组



::: tip EMPTY_ELEMENTDATA

根据指定的容量不同而选择

- 如果是无参构造，即人为没有选择初始容量。那么默认的初始容量是10，则使用 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`，在第一次添加元素的时候，会进行扩容到10
- 如果使用的构造方法中，明确指定了容量为零，则使用 `EMPTY_ELEMENTDATA`



只有无参构造函数中使用到了 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`，这么做是因为 ArrayList 的默认初始容量是 10，如果遇到这个静态实例第一次添加元素，则会将其容量扩容到10，方便进行判断。

:::



## 构造方法



### 无参构造

```java
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```

::: note 默认的初始容量为10，那为什么指向一个空数组？

1. 为什么指向一个空数组：（个人推测）等真正使用的时候再来请求空间，不急着消耗资源
2. 为什么初始容量为10：数组的扩容是每次增加50%（扩容机制后面会讲）
    1. 设为10而不是0，是为了防止一开始的反复扩容而导致效率降低
    2. 设为10而不是更大，真的需要那么大容量再说，容量变大以后，每次扩容50%也不少了

:::





### 指定容量

- 这个构造方法中并没有限定容量的上限，可能是否能创建成功要看虚拟机能获得的内存了
- 如果指定容量为零，存放数据的数组指向 `EMPTY_ELEMENTDATA`
- 如果指定容量是负数，则会抛出异常 `IllegalArgumentException`

```java
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);
    }
}
```



### 指定集合

将某个集合里的所有元素都复制到一个新的 ArrayList 中。

```java
public ArrayList(Collection<? extends E> c) {
    Object[] a = c.toArray();
    if ((size = a.length) != 0) {
        if (c.getClass() == ArrayList.class) {
            elementData = a;
        } else {
            elementData = Arrays.copyOf(a, size, Object[].class);
        }
    } else {
        // replace with empty array.
        elementData = EMPTY_ELEMENTDATA;
    }
}
```



## 添加元素



四个添加方法中全都用到一个方法 [ensureCapacityInternal(int minCapacity)](#扩容发起)，主要作用就是根据添加元素的个数，计算数组至少需要的容量，从而判断是否需要扩容。



四个方法的返回类型都是 `boolean`，返回是否成功添加元素。



### 添加单个元素

```java {2}
public boolean add(E e) {
    ensureCapacityInternal(size + 1); 
    // 在数组末尾添加元素
    elementData[size++] = e;
    return true;
}
```



### 添加单个元素到指定位置

[rangeCheckForAdd(int index)](#检查索引合法性)

```java {5}
public void add(int index, E element) {
    // 检查索引的合法性
    rangeCheckForAdd(index);

    ensureCapacityInternal(size + 1); 
    
    // 索引后的所有元素整体后移
    System.arraycopy(elementData, index, elementData, index + 1, size - index);
    
    // 在索引处添加指定元素
    elementData[index] = element;
    size++;
}
```



### 添加指定集合内所有元素

```java {5}
public boolean addAll(Collection<? extends E> c) {
    Object[] a = c.toArray();
    int numNew = a.length;
    
    ensureCapacityInternal(size + numNew); 
    
    // 将集合内的所有元素都复制到数组末尾
    System.arraycopy(a, 0, elementData, size, numNew);
    size += numNew;
    return numNew != 0;
}
```



### 添加指定集合内所有元素到指定位置

- [rangeCheckForAdd(int index)](#检查索引合法性)

```java {8}
public boolean addAll(int index, Collection<? extends E> c) {
    // 检查索引的合法性
    rangeCheckForAdd(index);

    Object[] a = c.toArray();
    int numNew = a.length;
    
    ensureCapacityInternal(size + numNew);

    // 计算需要移动的元素个数
    int numMoved = size - index;
    if (numMoved > 0)
        // 索引后的所有元素整体后移
        System.arraycopy(elementData, index, elementData, index + numNew, numMoved);

    // 将集合内的所有元素都复制到索引处
    System.arraycopy(a, 0, elementData, index, numNew);
    
    size += numNew;
    return numNew != 0;
}
```



## 扩容机制



### 扩容发起

`minCapacity` 是在添加元素时候确定的容量，可以理解为需要存放这些数据的最小容量。

- [calculateCapacity(Object[] elementData, int minCapacity)](#比较初始容量)
- [ensureExplicitCapacity(int minCapacity)](#扩容检查)

```java
private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}

// private void ensureCapacityInternal(int minCapacity) {
// 	   int capacity = calculateCapacity(elementData, minCapacity);
//     ensureExplicitCapacity(capacity);
// }
```



### 比较初始容量

一般情况下都是直接返回 `minCapacity`

只有当数组还指向默认的空数组实例的时候，才会指定10的初始容量，将两个值取较大值返回

```java
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    // minCapacity 指定了需要的容量
    // 如果数组指向了默认的空数组实例，在指定容量和默认初始容量10中选较大值
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}
```



### 扩容检查

当需要存放数据的最小容量正式超过当前数组的大小时候，就要开始扩容了。

- [grow(int minCapacity)](#扩容方法)

```java
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}
```



### 扩容方法

默认每次扩容50%，除非是一次性添加了太多的元素，扩容50%都不够，就会按照计算得到的最小容量来进行扩容。

并且规定有数组大小的上限，当超过上限时，还允许申请 `Integer.MAX_VALUE` 以内的大小，再大就要抛出异常了

- [hugeCapacity(int minCapacity)](#超大容量)

```java
private void grow(int minCapacity) {
    int oldCapacity = elementData.length;
    
    // 在原来的容量基础上，扩容50%
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    
    // 如果这个容量还不够，就按照指定的容量大小
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    
    // 如果扩容容量超过了最大值，就要判断是否造成内存溢出
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```



### 超大容量

当扩容到一定大小时，就要时刻注意这个值了。

源码中设置的最大数组大小是 `Integer.MAX_VALUE - 8`，当申请的容量超过这个值，就会返回 `Integer.MAX_VALUE`，再大呢就会变成负数了，这个时候将抛出异常 `OutOfMemoryError()`

```java
private static int hugeCapacity(int minCapacity) {
    if (minCapacity < 0) // overflow
        throw new OutOfMemoryError();
    return (minCapacity > MAX_ARRAY_SIZE) ? Integer.MAX_VALUE : MAX_ARRAY_SIZE;
}
```



## 删除元素

删除部分就不重点解读了，先略过



### 删除指定元素

```java
public boolean remove(Object o) {
    if (o == null) {
        for (int index = 0; index < size; index++)
            if (elementData[index] == null) {
                fastRemove(index);
                return true;
            }
    } else {
        for (int index = 0; index < size; index++)
            if (o.equals(elementData[index])) {
                fastRemove(index);
                return true;
            }
    }
    return false;
}
```



### 删除指定索引处元素

```java
public E remove(int index) {
    rangeCheck(index);

    modCount++;
    E oldValue = elementData(index);

    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);
    elementData[--size] = null; // clear to let GC do its work

    return oldValue;
}
```



### 删除指定集合内所有元素

```java
public boolean removeAll(Collection<?> c) {
    Objects.requireNonNull(c);
    return batchRemove(c, false);
}
```



### 删除指定范围内所有元素

```java
public boolean removeIf(Predicate<? super E> filter) {
    Objects.requireNonNull(filter);
    // figure out which elements are to be removed
    // any exception thrown from the filter predicate at this stage
    // will leave the collection unmodified
    int removeCount = 0;
    final BitSet removeSet = new BitSet(size);
    final int expectedModCount = modCount;
    final int size = this.size;
    for (int i=0; modCount == expectedModCount && i < size; i++) {
        @SuppressWarnings("unchecked")
        final E element = (E) elementData[i];
        if (filter.test(element)) {
            removeSet.set(i);
            removeCount++;
        }
    }
    if (modCount != expectedModCount) {
        throw new ConcurrentModificationException();
    }

    // shift surviving elements left over the spaces left by removed elements
    final boolean anyToRemove = removeCount > 0;
    if (anyToRemove) {
        final int newSize = size - removeCount;
        for (int i=0, j=0; (i < size) && (j < newSize); i++, j++) {
            i = removeSet.nextClearBit(i);
            elementData[j] = elementData[i];
        }
        for (int k=newSize; k < size; k++) {
            elementData[k] = null;  // Let gc do its work
        }
        this.size = newSize;
        if (modCount != expectedModCount) {
            throw new ConcurrentModificationException();
        }
        modCount++;
    }

    return anyToRemove;
}
```



## 其他方法



### 检查索引合法性

```java
private void rangeCheckForAdd(int index) {
    if (index > size || index < 0)
        throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
}
```

