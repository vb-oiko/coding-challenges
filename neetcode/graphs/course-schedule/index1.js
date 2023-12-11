/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const prerequisitesMap = new Array(numCourses).fill().map(() => []);

  for (const [course, preCourse] of prerequisites) {
    prerequisitesMap[course].push(preCourse);
  }

  const noLoopDependencySet = new Array(numCourses).fill(false);
  const currentPath = new Array(numCourses).fill(false);

  function hasNoLoopDependency(course) {
    if (noLoopDependencySet[course]) {
      return true;
    }

    if (!prerequisitesMap[course].length) {
      noLoopDependencySet[course] = true;
      return true;
    }

    if (currentPath[course]) {
      return false;
    }

    currentPath[course] = true;

    for (const preCourse of prerequisitesMap[course]) {
      if (!hasNoLoopDependency(preCourse)) {
        return false;
      }
    }

    currentPath[course] = false;

    noLoopDependencySet[course] = true;
    return true;
  }

  for (let course = 0; course < numCourses; course++) {
    if (!hasNoLoopDependency(course)) {
      return false;
    }
  }

  return true;
};

const tests = [
  {
    numCourses: 2,
    prerequisites: [[1, 0]],
    output: true,
  },
  {
    numCourses: 2,
    prerequisites: [
      [1, 0],
      [0, 1],
    ],
    output: false,
  },
];

for (const { numCourses, prerequisites, output } of tests) {
  const result = canFinish(numCourses, prerequisites);
  console.warn({ numCourses, prerequisites, result, output });
}
