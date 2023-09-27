import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {

        Map<Integer, Integer> map = new HashMap<Integer, Integer>();

        for (int i = 0; i < nums.length; i++) {
            int currentEl = nums[i];
            int currentIndex = i;
            int secondEl = target - currentEl;

            if (map.containsKey(secondEl)) {
                int secondIndex = map.get(secondEl);
                int[] result = { i, secondIndex };
                return result;
            }

            map.put(currentEl, currentIndex);

        }
        int[] result = {};
        return result;
    }
}