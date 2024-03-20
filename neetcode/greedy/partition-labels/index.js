/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  const charCodeOffset = "a".charCodeAt(0);
  const last = new Array(26);

  for (let i = 0; i < s.length; i++) {
    last[s.charCodeAt(i) - charCodeOffset] = i;
  }

  const result = [];
  let start = 0;
  let end = last[s.charCodeAt(0) - charCodeOffset];

  for (let i = 1; i < s.length; i++) {
    if (i > end) {
      result.push(end - start + 1);
      start = i;
      end = last[s.charCodeAt(i) - charCodeOffset];
      continue;
    }

    end = Math.max(end, last[s.charCodeAt(i) - charCodeOffset]);
  }

  result.push(end - start + 1);

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
