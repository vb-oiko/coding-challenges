/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const arrA = nums1.length < nums2.length ? nums1 : nums2;
  const arrB = nums1.length >= nums2.length ? nums1 : nums2;

  const totalLength = nums1.length + nums2.length;
  const halfLength = Math.floor(totalLength / 2);

  let l = 0;
  let r = arrA.length - 1;

  while (true) {
    const aIdx = Math.floor((l + r) / 2);
    const bIdx = halfLength - aIdx - 2;

    const leftA = aIdx >= 0 ? arrA[aIdx] : -Infinity;
    const rightA = aIdx + 1 < arrA.length ? arrA[aIdx + 1] : Infinity;
    const leftB = bIdx >= 0 ? arrB[bIdx] : -Infinity;
    const rightB = bIdx + 1 < arrB.length ? arrB[bIdx + 1] : Infinity;

    if (leftA <= rightB && leftB <= rightA) {
      if (totalLength % 2 === 1) {
        return Math.min(rightA, rightB);
      }

      return (Math.max(leftA, leftB) + Math.min(rightA, rightB)) / 2;
    }

    if (leftA > rightB) {
      r = aIdx - 1;
      continue;
    }

    l = aIdx + 1;
  }
};

const tests = [
  {
    nums1: [],
    nums2: [1],
    output: 1.0,
  },
  {
    nums1: [1, 3],
    nums2: [2],
    output: 2.0,
  },
  {
    nums1: [1, 2],
    nums2: [3, 4],
    output: 2.5,
  },
  {
    nums1: [100000],
    nums2: [100001],
    output: 100000.5,
  },
];

for (const { nums1, nums2, output } of tests) {
  const result = findMedianSortedArrays(nums1, nums2);

  console.warn({ nums1, nums2, result, output, isValid: result === output });
}
