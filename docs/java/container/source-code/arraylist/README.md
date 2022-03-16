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



::: warning

本文转载自 [ArrayList源码&扩容机制分析 | JavaGuide](https://javaguide.cn/java/collection/arraylist-source-code/)，略有改动

:::



## 一、ArrayList 简介

`ArrayList` 的底层是数组队列，相当于动态数组。与 Java 中的数组相比，它的容量能动态增长。在添加大量元素前，应用程序可以使用`ensureCapacity`操作来增加 `ArrayList` 实例的容量。这可以减少递增式再分配的数量。

`ArrayList`继承于 **`AbstractList`** ，实现了 **`List`**, **`RandomAccess`**, **`Cloneable`**, **`java.io.Serializable`** 这些接口。

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable{

  }Copy to clipboardErrorCopied
```

- `RandomAccess` 是一个标志接口，表明实现这个这个接口的 List 集合是支持**快速随机访问**的。在 `ArrayList` 中，我们即可以通过元素的序号快速获取元素对象，这就是快速随机访问。
- `ArrayList` 实现了 **`Cloneable` 接口** ，即覆盖了函数`clone()`，能被克隆。
- `ArrayList` 实现了 `java.io.Serializable`接口，这意味着`ArrayList`支持序列化，能通过序列化去传输。



### 1.1 ArrayList 和 Vector 的区别

`ArrayList` 是 `List` 的主要实现类，底层使用 `Object[]`存储，适用于频繁的查找工作，线程不安全 ；

`Vector` 是 `List` 的古老实现类，底层使用`Object[]` 存储，线程安全的（代价就是效率差一些）。



### 1.2 ArrayList  和 LinkedList 的区别

**是否保证线程安全：** `ArrayList` 和 `LinkedList` 都是不同步的，也就是不保证线程安全；

**底层数据结构：** `Arraylist` 底层使用的是 **`Object` 数组**；`LinkedList` 底层使用的是 **双向链表** 数据结构（JDK1.6 之前为循环链表，JDK1.7 取消了循环。注意双向链表和双向循环链表的区别，下面有介绍到！）

**插入和删除是否受元素位置的影响：**

- `ArrayList` 采用数组存储，所以插入和删除元素的时间复杂度受元素位置的影响。 比如：执行`add(E e)`方法的时候， `ArrayList` 会默认在将指定的元素追加到此列表的末尾，这种情况时间复杂度就是 O(1)。但是如果要在指定位置 i 插入和删除元素的话（`add(int index, E element)`）时间复杂度就为 O(n-i)。因为在进行上述操作的时候集合中第 i 和第 i 个元素之后的(n-i)个元素都要执行向后位/向前移一位的操作。
- `LinkedList` 采用链表存储，所以，如果是在头尾插入或者删除元素不受元素位置的影响（`add(E e)`、`addFirst(E e)`、`addLast(E e)`、`removeFirst()` 、 `removeLast()`），近似 O(1)，如果是要在指定位置 `i` 插入和删除元素的话（`add(int index, E element)`，`remove(Object o)`） 时间复杂度近似为 O(n) ，因为需要先移动到指定位置再插入。

**是否支持快速随机访问：** `LinkedList` 不支持高效的随机元素访问，而 `ArrayList` 支持。快速随机访问就是通过元素的序号快速获取元素对象(对应于`get(int index)`方法)。

**内存空间占用：** ArrayList 的空 间浪费主要体现在在 list 列表的结尾会预留一定的容量空间，而 LinkedList 的空间花费则体现在它的每一个元素都需要消耗比 ArrayList 更多的空间（因为要存放直接后继和直接前驱以及数据）。



## 二、ArrayList 核心源码

```java
package java.util;

import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;
import sun.misc.SharedSecrets;

public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable {
    private static final long serialVersionUID = 8683452581122892189L;

    /**
     * Default initial capacity. 默认/初始 容量大小为10
     */
    private static final int DEFAULT_CAPACITY = 10;

    /**
     * 空数组（用于空实例）
     */
    private static final Object[] EMPTY_ELEMENTDATA = {};

    /**
     * 另一个空数组（用于无参构造）
     */
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    /**
     * 真正保存数据的数组
     */
    transient Object[] elementData; // non-private to simplify nested class access

    /**
     * 数组中的元素个数
     */
    private int size;

    /**
     * 有参构造（指定数组的初始大小）
     */
    public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            // 如果指定大小 > 0，创建指定大小的数组
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            // 如果指定大小 == 0，创建空数组
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            // 如果指定大小 < 0，抛出异常
            throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);
        }
    }

    /**
     * 默认无参构造函数
     * 存放数据的数组指向了另一个空数组，当添加第一个元素之后，才将数组扩容至 10
     */
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }

    /**
     * 有参构造（指定集合）
     */
    public ArrayList(Collection<? extends E> c) {
        // 将指定集合转换为数组
        Object[] a = c.toArray();
        if ((size = a.length) != 0) {
            // 数组长度不为零的情况
            if (c.getClass() == ArrayList.class) {
                // 如果数据类型相同，直接使用该数组
                elementData = a;
            } else {
                // 如果数据类型不相同，则复制一份相同数据类型的数组
                elementData = Arrays.copyOf(a, size, Object[].class);
            }
        } else {
            // 数组长度为零，指向空数组
            elementData = EMPTY_ELEMENTDATA;
        }
    }

    /**
     * 修改数组容量为当前元素个数，以最小化实例的存储
     */
    public void trimToSize() {
        modCount++;
        // size为数组中元素个数，len为数组（容量）大小
        if (size < elementData.length) {
            // 如果个数为零，指向空数组
            // 否则复制一个大小为 size 的数组
            elementData = (size == 0) ? EMPTY_ELEMENTDATA : Arrays.copyOf(elementData, size);
        }
    }

    /**
     * 核心扩容机制见后面解释
     */

    /**
     * 获取元素个数
     */
    public int size() {
        return size;
    }

    /**
     * 判断列表是否为空
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * 判断列表中是否包含目标元素
     */
    public boolean contains(Object o) {
        return indexOf(o) >= 0;
    }

    /**
     * 返回此列表中指定元素的首次出现的索引，如果此列表不包含此元素，则为-1
     */
    public int indexOf(Object o) {
        if (o == null) {
            // 如果是 null，需要单独判断
            for (int i = 0; i < size; i++)
                if (elementData[i]==null)
                    return i;
        } else {
            for (int i = 0; i < size; i++)
                if (o.equals(elementData[i]))
                    return i;
        }
        return -1;
    }

    /**
     * 返回此列表中指定元素的最后一次出现的索引，如果此列表不包含元素，则返回-1。.
     */
    public int lastIndexOf(Object o) {
        if (o == null) {
            // 如果是 null，需要单独判断
            for (int i = size-1; i >= 0; i--)
                if (elementData[i]==null)
                    return i;
        } else {
            for (int i = size-1; i >= 0; i--)
                if (o.equals(elementData[i]))
                    return i;
        }
        return -1;
    }

    /**
     * 返回实例的浅拷贝 ！！！浅拷贝
     */
    public Object clone() {
        try {
            ArrayList<?> v = (ArrayList<?>) super.clone();
            v.elementData = Arrays.copyOf(elementData, size);
            v.modCount = 0;
            return v;
        } catch (CloneNotSupportedException e) {
            // this shouldn't happen, since we are Cloneable
            throw new InternalError(e);
        }
    }

    /**
     * 以正确的顺序（从第一个到最后一个元素）返回一个包含此列表中所有元素的数组。
     */
    public Object[] toArray() {
        return Arrays.copyOf(elementData, size);
    }

    /**
     * 以正确的顺序返回一个包含此列表中所有元素的数组（从第一个到最后一个元素）;
     * 返回数组的类型，需要时运行时类型
     */
    @SuppressWarnings("unchecked")
    public <T> T[] toArray(T[] a) {
        if (a.length < size)
            // 新建一个运行时类型的数组，但是内容为该列表的元素
            return (T[]) Arrays.copyOf(elementData, size, a.getClass());
        System.arraycopy(elementData, 0, a, 0, size);
        if (a.length > size)
            a[size] = null;
        return a;
    }

    // Positional Access Operations

    @SuppressWarnings("unchecked")
    E elementData(int index) {
        return (E) elementData[index];
    }

    /**
     * 获取索引 index 处的元素
     */
    public E get(int index) {
        rangeCheck(index);

        return elementData(index);
    }

    /**
     * 修改索引 index 处的元素为 element，并返回原元素
     */
    public E set(int index, E element) {
        // 检查 index 是否合法
        rangeCheck(index);

        E oldValue = elementData(index);
        elementData[index] = element;
        return oldValue;
    }

    /**
     * 在列表最后面插入一个元素
     */
    public boolean add(E e) {
        // 如有必要，进行扩容
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }

    /**
     * 在索引 index 处插入一个元素
     */
    public void add(int index, E element) {
        // 检查 index 是否合法
        rangeCheckForAdd(index);

        // 如有必要，进行扩容
        ensureCapacityInternal(size + 1);  
        // 整体后移
        System.arraycopy(elementData, index, elementData, index + 1, size - index);
        elementData[index] = element;
        size++;
    }

    /**
     * 删除指定索引 index 处的元素，并返回该元素
     */
    public E remove(int index) {
        // 先检查 index 是否合法
        rangeCheck(index);

        modCount++;
        E oldValue = elementData(index);

        int numMoved = size - index - 1;
        if (numMoved > 0)
            System.arraycopy(elementData, index+1, elementData, index, numMoved);
        elementData[--size] = null; // clear to let GC do its work

        return oldValue;
    }

    /**
     * 从列表中删除第一个出现的元素 o
     * 返回是否成功删除（如果列表中不含该元素，则为 false）
     */
    public boolean remove(Object o) {
        if (o == null) {
            // 如果目标元素是 null，则需要特别判断
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

    /*
     * （快速）删除指定索引 index 处的元素，无返回值
     */
    private void fastRemove(int index) {
        modCount++;
        int numMoved = size - index - 1;
        if (numMoved > 0)
            System.arraycopy(elementData, index+1, elementData, index, numMoved);
        elementData[--size] = null; // clear to let GC do its work
    }

    /**
     * 删除列表中所有元素
     */
    public void clear() {
        modCount++;

        // clear to let GC do its work
        for (int i = 0; i < size; i++)
            elementData[i] = null;

        size = 0;
    }

    /**
     * 将指定集合的所有元素插入到列表最后
     */
    public boolean addAll(Collection<? extends E> c) {
        Object[] a = c.toArray();
        int numNew = a.length;
        // 如有必要则进行扩容
        ensureCapacityInternal(size + numNew);  // Increments modCount
        System.arraycopy(a, 0, elementData, size, numNew);
        size += numNew;
        return numNew != 0;
    }

    /**
     * 将指定集合 c 中的所有元素，插入到该列表索引 index 处
     */
    public boolean addAll(int index, Collection<? extends E> c) {
        // 先检查 index 是否合法
        rangeCheckForAdd(index);

        Object[] a = c.toArray();
        int numNew = a.length;
        // 如有必要则进行扩容
        ensureCapacityInternal(size + numNew);  // Increments modCount

        int numMoved = size - index;
        if (numMoved > 0)
            // 如有必要，将原 index 索引及后续所有元素整体后移
            System.arraycopy(elementData, index, elementData, index + numNew, numMoved);

        // 将集合中的所有元素复制进来
        System.arraycopy(a, 0, elementData, index, numNew);
        size += numNew;
        return numNew != 0;
    }

    /**
     * 删除 fromIndex 到 toIndex 之间的所有元素
     */
    protected void removeRange(int fromIndex, int toIndex) {
        modCount++;
        int numMoved = size - toIndex;
        // 将 toIndex 索引开始 numMoved 个元素整体复制（移动）到 fromIndex 索引处
        System.arraycopy(elementData, toIndex, elementData, fromIndex, numMoved);

        // 计算得到删除后的元素个数，将后面所有元素赋为 null
        int newSize = size - (toIndex-fromIndex);
        for (int i = newSize; i < size; i++) {
            elementData[i] = null;
        }
        size = newSize;
    }

    /**
     * 检查给定索引是否在范围内
     * 对比的是（元素个数）size，而不是 （容量大小）length
     */
    private void rangeCheck(int index) {
        if (index >= size)
            throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
    }

    /**
     * add 和 addAll 前检查 index 的范围是否有异常
     * 对比的是（元素个数）size，而不是 （容量大小）length
     */
    private void rangeCheckForAdd(int index) {
        if (index > size || index < 0)
            throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
    }

    /**
     * 返回 outOfBoundsMsg 的具体信息
     */
    private String outOfBoundsMsg(int index) {
        return "Index: "+index+", Size: "+size;
    }

    /**
     * 从此列表中删除（指定集合 c 中出现过的所有）元素
     */
    public boolean removeAll(Collection<?> c) {
        Objects.requireNonNull(c);
        return batchRemove(c, false);
    }

    /**
     * 仅保留此列表中（在指定集合 c 中出现过的）元素
     */
    public boolean retainAll(Collection<?> c) {
        Objects.requireNonNull(c);
        return batchRemove(c, true);
    }

    /**
     * 返回第 index 个元素的迭代器
     */
    public ListIterator<E> listIterator(int index) {
        if (index < 0 || index > size)
            throw new IndexOutOfBoundsException("Index: "+index);
        return new ListItr(index);
    }

    /**
     * 获取第一个元素的迭代器
     */
    public ListIterator<E> listIterator() {
        return new ListItr(0);
    }

    /**
     * 以正确的顺序返回该列表中的元素的迭代器
     */
    public Iterator<E> iterator() {
        return new Itr();
    }

}
```



## 三、ArrayList 扩容机制



### 3.1 ArrayList 的构造方法

**以无参数构造方法创建 `ArrayList` 时，实际上初始化赋值的是一个空数组。当真正对数组进行添加元素操作时，才真正分配容量。即向数组中添加第一个元素时，数组容量扩为 10。**

```java
 	public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            // 如果指定大小 > 0，创建指定大小的数组
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            // 如果指定大小 == 0，创建空数组
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            // 如果指定大小 < 0，抛出异常
            throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);
        }
    }

    /**
     * 默认无参构造函数
     * 存放数据的数组指向了另一个空数组，当添加第一个元素之后，才将数组扩容至 10
     */
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }

    /**
     * 有参构造（指定集合）
     */
    public ArrayList(Collection<? extends E> c) {
        // 将指定集合转换为数组
        Object[] a = c.toArray();
        if ((size = a.length) != 0) {
            // 数组长度不为零的情况
            if (c.getClass() == ArrayList.class) {
                // 如果数据类型相同，直接使用该数组
                elementData = a;
            } else {
                // 如果数据类型不相同，则复制一份相同数据类型的数组
                elementData = Arrays.copyOf(a, size, Object[].class);
            }
        } else {
            // 数组长度为零，指向空数组
            elementData = EMPTY_ELEMENTDATA;
        }
    }
```



### 3.2 `add` 方法

每次添加元素之前，都会调用一次 `ensureCapacityInternal()`，如有需要，则会进行扩容。然后才会执行添加元素的操作。

```java
 	/**
     * 在列表最后面插入一个元素
     */
    public boolean add(E e) {
        // 如有必要，进行扩容
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }

    /**
     * 在索引 index 处插入一个元素
     */
    public void add(int index, E element) {
        // 检查 index 是否合法
        rangeCheckForAdd(index);

        // 如有必要，进行扩容
        ensureCapacityInternal(size + 1);  
        // 整体后移
        System.arraycopy(elementData, index, elementData, index + 1, size - index);
        elementData[index] = element;
        size++;
    }
```



### 3.3 `ensureCapacityInternal()` 方法

1. 先调用 `calculateCapacity`，计算一个得到一个合适的容量
2. 再调用 `ensureExplicitCapacity` ，正式判断是否需要扩容

```java
private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}
```



### 3.4 `calculateCapacity()` 方法

判断是否需要扩容之前，需要计算一个 **理论容量**（我自己取的名字）：

- 如果原数组是一个空数组，ArrayList 提供了一个初始的默认大小为10，与传入的参数比较取较大值
- 如果原数组是一个非空数组，那就直接返回这个传入的参数即可

> 个人认为，让空数组第一次扩容至少获得 10 大小的容量。是为了防止 `1、2、3、4` 这类低效的扩容存在

```java
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    // 如果是空数组，取 minCapacity 与 10 之间的较大值
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}
```



### 3.5 `ensureExplicitCapacity()` 方法

判断需要扩容之后，调用 `grow()` 方法

```java
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // 如果“理论容量”超过了当前容量，则进行扩容
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}
```



### 3.6 `grow()` 方法

单次扩容理论上是扩容1.5倍（防止每次增加1个大小这类低效的扩容），如果小于传入的指定大小，则会扩容更大。

```java
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    // 原容量 * 1.5 得到一个扩容的 容量
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    // 如果传入的参数更大，则将扩容容量修改为该参数
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    // 如果扩容容量甚至比 MAX_ARRAY_SIZE 还大，则调用 hugeCapacity 获得一个指定大小进行扩容
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```



### 3.7 `hugeCapacity()` 方法

如果 minCapacity 大于最大容量，则新容量则为`Integer.MAX_VALUE`，否则，新容量大小则为 MAX_ARRAY_SIZE 即为 `Integer.MAX_VALUE - 8`

```java
private static int hugeCapacity(int minCapacity) {
    if (minCapacity < 0) // overflow
        throw new OutOfMemoryError();
    //MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
    return (minCapacity > MAX_ARRAY_SIZE) ? Integer.MAX_VALUE : MAX_ARRAY_SIZE;
}
```



### 3.9 具体的扩容模拟

具体的模拟详见 [ArrayList源码&扩容机制分析 | JavaGuide](https://javaguide.cn/java/collection/arraylist-source-code/#_3-2-4-grow-方法)



## 四、数组复制



### 4.1 `System.arraycopy()` 方法

源码：

```java
    // 我们发现 arraycopy 是一个 native 方法,接下来我们解释一下各个参数的具体意义
    /**
    *   复制数组
    * @param src 源数组
    * @param srcPos 源数组中的起始位置
    * @param dest 目标数组
    * @param destPos 目标数组中的起始位置
    * @param length 要复制的数组元素的数量
    */
    public static native void arraycopy(Object src,  int  srcPos,
                                        Object dest, int destPos,
                                        int length);
```



场景：

```java
/**
 * 在此列表中的指定位置插入指定的元素。
 *先调用 rangeCheckForAdd 对index进行界限检查；然后调用 ensureCapacityInternal 方法保证capacity足够大；
 *再将从index开始之后的所有成员后移一个位置；将element插入index位置；最后size加1。
 */
public void add(int index, E element) {
    rangeCheckForAdd(index);

    ensureCapacityInternal(size + 1);  // Increments modCount!!
    //arraycopy()方法实现数组自己复制自己
    //elementData:源数组;index:源数组中的起始位置;elementData：目标数组；index + 1：目标数组中的起始位置； size - index：要复制的数组元素的数量；
    System.arraycopy(elementData, index, elementData, index + 1, size - index);
    elementData[index] = element;
    size++;
}
```



### 4.2 `Arrays.copyOf()`方法

源码：

```java
public static int[] copyOf(int[] original, int newLength) {
    // 申请一个新的数组
    int[] copy = new int[newLength];
    // 调用System.arraycopy,将源数组中的数据进行拷贝,并返回新的数组
    System.arraycopy(original, 0, copy, 0, Math.min(original.length, newLength));
    return copy;
}
```



场景：

```java
/**
以正确的顺序返回一个包含此列表中所有元素的数组（从第一个到最后一个元素）; 返回的数组的运行时类型是指定数组的运行时类型。
*/
public Object[] toArray() {
    //elementData：要复制的数组；size：要复制的长度
    return Arrays.copyOf(elementData, size);
}
```



### 4.3 联系和区别

**联系：**

看两者源代码可以发现 `copyOf()`内部实际调用了 `System.arraycopy()` 方法

**区别：**

`arraycopy()` 需要目标数组，将原数组拷贝到你自己定义的数组里或者原数组，而且可以选择拷贝的起点和长度以及放入新数组中的位置 `copyOf()` 是系统自动在内部新建一个数组，并返回该数组



## 五、`ensureCapacity`方法

ArrayList 源码中有一个 `ensureCapacity` 方法， ArrayList 内部没有被调用过，所以很显然是提供给用户调用的，那么这个方法有什么作用呢？

**最好在 add 大量元素之前用 `ensureCapacity` 方法，以减少增量重新分配的次数**

```java
/**
如有必要，增加此 ArrayList 实例的容量，以确保它至少可以容纳由minimum capacity参数指定的元素数。
*
* @param   minCapacity   所需的最小容量
*/
public void ensureCapacity(int minCapacity) {
    int minExpand = (elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
        // any size if not default element table
        ? 0
        // larger than default for default empty table. It's already
        // supposed to be at default size.
        : DEFAULT_CAPACITY;

    if (minCapacity > minExpand) {
        ensureExplicitCapacity(minCapacity);
    }
}
```



我们通过下面的代码实际测试以下这个方法的效果：

```java
public class EnsureCapacityTest {
	public static void main(String[] args) {
		ArrayList<Object> list = new ArrayList<Object>();
		final int N = 10000000;
		long startTime = System.currentTimeMillis();
		for (int i = 0; i < N; i++) {
			list.add(i);
		}
		long endTime = System.currentTimeMillis();
		System.out.println("使用ensureCapacity方法前："+(endTime - startTime));

	}
}
```



运行结果：

```text
使用ensureCapacity方法前：2158
```



```java
public class EnsureCapacityTest {
    public static void main(String[] args) {
        ArrayList<Object> list = new ArrayList<Object>();
        final int N = 10000000;
        list = new ArrayList<Object>();
        long startTime1 = System.currentTimeMillis();
        list.ensureCapacity(N);
        for (int i = 0; i < N; i++) {
            list.add(i);
        }
        long endTime1 = System.currentTimeMillis();
        System.out.println("使用ensureCapacity方法后："+(endTime1 - startTime1));
    }
}
```



运行结果：

```text
使用ensureCapacity方法后：1773
```

通过运行结果，我们可以看出向 ArrayList 添加大量元素之前最好先使用`ensureCapacity` 方法，以减少增量重新分配的次数。

