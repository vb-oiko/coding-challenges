/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();

  for (const num of nums) {
    const count = map.get(num) || 0;
    map.set(num, count + 1);
  }

  const arr = [];

  for (const [num, count] of map) {
    const bucket = arr[count] || [];
    bucket.push(num);
    arr[count] = bucket;
  }

  const result = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    if (!arr[i]) {
      continue;
    }

    for (const num of arr[i]) {
      result.push(num);
      if (result.length === k) {
        return result;
      }
    }
  }
};

var topKFrequent1 = function (nums, k) {
  const map = new Map();

  for (const num of nums) {
    const count = map.get(num) || 0;
    map.set(num, count + 1);
  }

  const arr = Array.from(map.entries());
  arr.sort(([, count1], [, count2]) => count2 - count1);

  const result = [];

  for (let i = 0; i < k; i++) {
    result.push(arr[i][0]);
  }

  return result;
};

const nums = [1, 1, 1, 2, 2, 3];
const result = topKFrequent(nums, 2);

console.warn({ result });
