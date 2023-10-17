/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
  const unsortedData = [];
  for (let i = 0; i < position.length; i++) {
    unsortedData.push({
      position: position[i],
      speed: speed[i],
      arrival: (target - position[i]) / speed[i],
    });
  }

  const cars = unsortedData.sort((a, b) => b.position - a.position);

  const result = [];
  let fleets = 1;
  let currentArrival = cars[0].arrival;

  for (let i = 1; i < cars.length; i++) {
    if (cars[i].arrival <= currentArrival) {
      continue;
    }

    fleets++;
    currentArrival = cars[i].arrival;
  }

  return fleets;
};

const tests = [
  {
    target: 12,
    position: [10, 8, 0, 5, 3],
    speed: [2, 4, 1, 1, 3],
    output: 3,
  },
  {
    target: 10,
    position: [3],
    speed: [3],
    output: 1,
  },
  {
    target: 100,
    position: [0, 2, 4],
    speed: [4, 2, 1],
    output: 1,
  },
];

for (const { target, position, speed, output } of tests) {
  const result = carFleet(target, position, speed);

  let isValid = result === output;

  console.warn({ target, position, speed, result, output, isValid });
}
