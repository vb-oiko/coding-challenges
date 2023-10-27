/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const maxIndex = nums1.length + nums2.length - 1;
  const leftMedianIndex = Math.floor(maxIndex / 2);
  const rightMedianIndex = Math.ceil(maxIndex / 2);

  if (maxIndex + 1 === 1 && nums1.length === 1) {
    return nums1[0];
  }

  if (maxIndex + 1 === 1 && nums2.length === 1) {
    return nums2[0];
  }

  let leftIndex = 0;
  let rightIndex = 0;

  function getNextElem() {
    if (leftIndex >= nums1.length && rightIndex >= nums2.length) {
      throw new Error("Both leftIndex and rightIndex out of bounds");
    }

    if (leftIndex >= nums1.length) {
      const result = nums2[rightIndex];
      rightIndex++;
      return result;
    }

    if (rightIndex >= nums2.length) {
      const result = nums1[leftIndex];
      leftIndex++;
      return result;
    }

    if (nums1[leftIndex] < nums2[rightIndex]) {
      const result = nums1[leftIndex];
      leftIndex++;
      return result;
    }

    const result = nums2[rightIndex];
    rightIndex++;
    return result;
  }

  let sum = 0;

  while (leftIndex + rightIndex <= rightMedianIndex) {
    const currentIndex = leftIndex + rightIndex;
    const current = getNextElem();

    if (currentIndex === rightMedianIndex) {
      sum += current;
    }

    if (currentIndex === leftMedianIndex) {
      sum += current;
    }
  }

  return sum / 2;
};

const tests = [
  //   {
  //     nums1: [1, 3],
  //     nums2: [2],
  //     output: 2.0,
  //   },
  //   {
  //     nums1: [1, 2],
  //     nums2: [3, 4],
  //     output: 2.5,
  //   },
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
