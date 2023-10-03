/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const arr = new Array(nums.length);

  arr[0] = 1;
  let currentProduct = 1;
  for (let i = 1; i < nums.length; i++) {
    currentProduct = currentProduct * nums[i - 1];
    arr[i] = currentProduct;
  }

  currentProduct = 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    currentProduct = currentProduct * nums[i + 1];
    arr[i] = arr[i] * currentProduct;
  }

  return arr;
};

const tests = [
  [2, 5, 3, 4],
  [1, 2, 3, 4],
  [-1, 1, 0, -3, 3],
  [0, 0],
  [2, 2, 2, 2],
];

for (const test of tests) {
  const result = productExceptSelf(test);
  console.log({ test, result });
}
