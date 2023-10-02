import java.util.*;

class Solution {
    public static int aCode = "a".charAt(0);

    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> result = new ArrayList<List<String>>();
        HashMap<String, ArrayList<Integer>> map = new HashMap<String, ArrayList<Integer>>();

        for (int i = 0; i < strs.length; i++) {
            String s = strs[i];
            String hash = this.getCharHashMap(s);
            ArrayList<Integer> strList = map.getOrDefault(hash, new ArrayList<Integer>());
            strList.add(i);
            map.put(hash, strList);
        }

        for (List<Integer> indexList : map.values()) {
            List<String> stringList = new ArrayList<String>();

            for (int index : indexList) {
                stringList.add(strs[index]);
            }

            result.add(stringList);
        }

        return result;
    }

    private String getCharHashMap(String s) {
        int[] arr = new int[26];

        for (int i = 0; i < s.length(); i++) {
            arr[s.charAt(i) - Solution.aCode]++;
        }

        StringBuilder sb = new StringBuilder();
        sb.append(arr[0]);
        for (int i = 1; i < arr.length; i++) {
            sb.append(',').append(arr[i]);
        }

        String result = sb.toString();
        return result;
    }

    public static void main(String[] args) {
        String[] strs = { "eat", "tea", "tan", "ate", "nat", "bat" };

        Solution solution = new Solution();

        List<List<String>> result = solution.groupAnagrams(strs);
        System.out.println("Input: " + strs);
        System.out.println("Result: " + result);

    }
}