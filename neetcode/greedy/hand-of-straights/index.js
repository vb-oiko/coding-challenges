/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function (hand, groupSize) {
  hand.sort((a, b) => a - b);

  const map = new Map();
  for (const card of hand) {
    const qty = map.get(card) || 0;
    map.set(card, qty + 1);
  }

  for (const [card, qty] of map.entries()) {
    if (qty === 0) {
      continue;
    }

    for (let offset = 0; offset < groupSize; offset++) {
      const qty1 = map.get(card + offset) || 0;
      if (qty1 < qty) {
        return false;
      }
      map.set(card + offset, qty1 - qty);
    }
  }

  return true;
};

const tests = [
  {
    hand: [1, 2, 3, 6, 2, 3, 4, 7, 8],
    groupSize: 3,
    output: true,
  },
  {
    hand: [1, 2, 3, 4, 5],
    groupSize: 4,
    output: false,
  },
  {
    hand: [1],
    groupSize: 1,
    output: true,
  },
];

for (const { hand, groupSize, output } of tests) {
  const result = isNStraightHand(hand, groupSize);
  console.log({ hand, groupSize, result, output });
}
