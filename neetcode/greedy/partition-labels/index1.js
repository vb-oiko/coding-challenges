/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    const { start } = map.get(s[i]) || { start: i, end: i + 1 };
    map.set(s[i], { start, end: i + 1 });
  }

  const strings = [...map.values()];

  let subStart = strings[0].start;
  let subEnd = strings[0].end;
  let result = [];

  for (let i = 1; i < strings.length; i++) {
    const { start, end } = strings[i];
    if (start === subEnd) {
      result.push(subEnd - subStart);
      subStart = start;
      subEnd = end;
      continue;
    }

    subEnd = Math.max(end, subEnd);
  }
  result.push(subEnd - subStart);

  return result;
};

const tests = [
  {
    s: "ababcbacadefegdehijhklij",
    output: [9, 7, 8],
  },
  {
    s: "eccbbbbdec",
    output: [10],
  },
];

for (const { s, output } of tests) {
  const result = partitionLabels(s);
  console.log({ s, result, output });
}
