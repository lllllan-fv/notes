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

# 此页面会在文章列表指定
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning

本文转载自 [2. ArrayList 核心源码解读](https://snailclimb.gitee.io/javaguide/#/docs/java/collection/arraylist-source-code)，略有改动

:::



## [一、ArrayList 简介](https://snailclimb.gitee.io/javaguide/#/docs/java/collection/arraylist-source-code?id=_1-arraylist-简介)

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

