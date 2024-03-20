/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function (triplets, target) {
  const result = new Array(3).fill(false);

  for (const triplet of triplets) {
    if (
      triplet[0] > target[0] ||
      triplet[1] > target[1] ||
      triplet[2] > target[2]
    ) {
      continue;
    }

    for (let j = 0; j < 3; j++) {
      if (triplet[j] === target[j]) {
        result[j] = true;
      }
    }

    if (result[0] && result[1] && result[2]) {
      return true;
    }
  }

  return false;
};

const tests = [
  {
    triplets: [
      [2, 5, 3],
      [1, 8, 4],
      [1, 7, 5],
    ],
    target: [2, 7, 5],
    output: true,
  },
  {
    triplets: [
      [3, 4, 5],
      [4, 5, 6],
    ],
    target: [3, 2, 5],
    output: false,
  },
  {
    triplets: [
      [2, 5, 3],
      [2, 3, 4],
      [1, 2, 5],
      [5, 2, 3],
    ],
    target: [5, 5, 5],
    output: true,
  },
];

for (const { triplets, target, output } of tests) {
  const result = mergeTriplets(triplets, target);
  console.log({ triplets, target, result, output });
}
