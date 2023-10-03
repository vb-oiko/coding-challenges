# Key takeaways while solving the tasks

## [Contains duplicate](https://leetcode.com/problems/contains-duplicate/)

- You should use opportunity to exit loop than reaching the end of the array and not iterate until the end of the array

## [Valid anagram](https://leetcode.com/problems/valid-anagram/)

- Pay attention to constrains. The condition says that the string contains low case letters of the English alphabet which limit the size of the hash map to 26 and thus a simple number array can be used instead of HshMap class

## [Group anagrams](https://leetcode.com/problems/group-anagrams/)

- Again attention to constrains. String length is less than 100, so we can sort the array to get the hash key rather than creating a hash map of the characters frequencies and serializing it.

## [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

- Using a trick of grouping elements by their frequencies and storing them in array whose index is the frequency and the elemet is an array of number with that frequency.