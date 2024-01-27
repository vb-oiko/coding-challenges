/*
 * Complete the 'rotLeft' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER d
 */

function rotLeft(a, d) {
  // Write your code here
  const n = a.length;

  let offset = d % n;

  if (offset === 0) {
    return a;
  }

  let fromIndex = 0;
  let temp = a[0];

  for (let i = 0; i < n; i++) {
    const toIndex =
      fromIndex < offset ? fromIndex - offset + n : fromIndex - offset;
    const swap = a[toIndex];
    a[toIndex] = temp;
    temp = swap;
    fromIndex = toIndex;
  }

  return a;
}

const tests = [{ a: [1, 2, 3, 4, 5], d: 3 }];

for (const { a, d } of tests) {
  const result = rotLeft(a, d);
  console.warn({ a, d, result });
}
