/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  if (right === 1) {
    return piles.length;
  }

  const countHours = (k) =>
    piles.reduce((hours, pile) => hours + Math.ceil(pile / k), 0);

  let mid;
  let midH;

  while (left <= right) {
    mid = Math.round((left + right) / 2);
    midH = countHours(mid);

    if (midH <= h) {
      right = mid - 1;
    }

    if (midH > h) {
      left = mid + 1;
    }
  }

  return left;
};

const tests = [
  {
    piles: [3, 6, 7, 11],
    h: 8,
    output: 4,
  },
  {
    piles: [30, 11, 23, 4, 20],
    h: 5,
    output: 30,
  },
  {
    piles: [30, 11, 23, 4, 20],
    h: 6,
    output: 23,
  },
];

for (const { piles, h, output } of tests) {
  const result = minEatingSpeed(piles, h);

  let isValid = result === output;

  console.warn({ piles, h, result, output, isValid });
  console.warn();
}
