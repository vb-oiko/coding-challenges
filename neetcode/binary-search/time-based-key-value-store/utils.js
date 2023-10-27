function nearestIndexOf(values, timestamp) {
  if (values.length === 0) {
    return -1;
  }

  if (timestamp < values[0].timestamp) {
    return -1;
  }

  let left = 0;
  let right = values.length - 1;
  let mid = (left + right) >>> 1;

  if (timestamp < values[left].timestamp) {
    return left - 1;
  }

  if (timestamp >= values[right].timestamp) {
    return right;
  }

  while (right - left > 1) {
    if (values[mid].timestamp === timestamp) {
      return mid;
    }

    if (values[mid].timestamp <= timestamp) {
      left = mid;
    }

    if (values[mid].timestamp >= timestamp) {
      right = mid;
    }

    mid = (left + right) >>> 1;
  }

  if (timestamp < values[left].timestamp) {
    return left - 1;
  }

  if (timestamp > values[right].timestamp) {
    return right;
  }

  return left;
}

const unitTests = [
  {
    values: [],
    timestamp: 1,
    output: -1,
  },
  {
    values: [{ timestamp: 4 }],
    timestamp: 1,
    output: -1,
  },
  {
    values: [{ timestamp: 4 }],
    timestamp: 4,
    output: 0,
  },
  {
    values: [{ timestamp: 4 }],
    timestamp: 5,
    output: 0,
  },
  {
    values: [
      { timestamp: 4 },
      { timestamp: 6 },
      { timestamp: 10 },
      { timestamp: 24 },
      { timestamp: 30 },
    ],
    timestamp: 1,
    output: -1,
  },
  {
    values: [
      { timestamp: 4 },
      { timestamp: 6 },
      { timestamp: 10 },
      { timestamp: 24 },
      { timestamp: 30 },
    ],
    timestamp: 31,
    output: 4,
  },
  {
    values: [
      { timestamp: 4 },
      { timestamp: 6 },
      { timestamp: 10 },
      { timestamp: 24 },
      { timestamp: 30 },
    ],
    timestamp: 10,
    output: 2,
  },
  {
    values: [
      { timestamp: 4 },
      { timestamp: 6 },
      { timestamp: 10 },
      { timestamp: 24 },
      { timestamp: 30 },
    ],
    timestamp: 9,
    output: 1,
  },
  {
    values: [
      { timestamp: 4 },
      { timestamp: 6 },
      { timestamp: 10 },
      { timestamp: 24 },
      { timestamp: 30 },
    ],
    timestamp: 11,
    output: 2,
  },
];

for (const { values, timestamp, output } of unitTests) {
  const result = nearestIndexOf(values, timestamp);

  if (result === output) {
    continue;
  }

  console.warn({ values, timestamp, result, output });
}
