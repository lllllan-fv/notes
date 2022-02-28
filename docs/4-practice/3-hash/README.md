---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 哈希表练习

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



## 一、使用数组



### 1.1 [242. 有效的字母异位词 - 力扣](https://leetcode-cn.com/problems/valid-anagram/)

> ![image-20220228203957979](README.assets/image-20220228203957979.png)

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] cnt = new int[30];

        for (int i = 0, len = s.length(); i < len; ++i) {
            char c = s.charAt(i);
            cnt[c - 'a']++;
        }

        for (int i = 0, len = t.length(); i < len; ++i) {
            char c = t.charAt(i);
            cnt[c - 'a']--;
        }

        for (int i = 0; i < 26; ++i) {
            if (cnt[i] != 0) return false;
        }
        return true;
    }
}
```



### 1.2 [383. 赎金信 - 力扣](https://leetcode-cn.com/problems/ransom-note/)

> ![image-20220228205408793](README.assets/image-20220228205408793.png)

```java
class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {

        int[] cnt = new int[30];
        for (int i = 0, len = ransomNote.length(); i < len; ++i) {
            char c = ransomNote.charAt(i);
            cnt[c - 'a']++;
        }
        for (int i = 0, len = magazine.length(); i < len; ++i) {
            char c = magazine.charAt(i);
            cnt[c - 'a']--;
        }
        for (int i = 0; i < 26; ++i) {
            if (cnt[i] > 0) return false;
        }
        return true;
    }
}
```



## 二、Map



### 2.1 [49. 字母异位词分组 - 力扣](https://leetcode-cn.com/problems/group-anagrams/)

> ![image-20220228211606812](README.assets/image-20220228211606812.png)

字母异位词排序之后能够得到相同的字符串

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            List<String> orDefault = map.getOrDefault(key, new LinkedList<String>());
            orDefault.add(str);
            map.put(key, orDefault);
        }
        return new LinkedList<List<String>>(map.values());
    }
}
```

