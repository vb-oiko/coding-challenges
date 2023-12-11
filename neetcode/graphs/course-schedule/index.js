/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const prerequisitesMap = new Map();

  for (const [course, preCourse] of prerequisites) {
    const preCourses = prerequisitesMap.has(course)
      ? prerequisitesMap.get(course)
      : new Set();
    preCourses.add(preCourse);
    prerequisitesMap.set(course, preCourses);
  }

  function isPrerequisite(course, preCourse) {
    if (!prerequisitesMap.has(course)) {
      return false;
    }

    return prerequisitesMap.get(course).has(preCourse);
  }

  console.warn(prerequisitesMap);

  const noLoopDependencySet = new Set();
  const currentPath = new Set();

  function hasNoLoopDependency(course) {
    if (noLoopDependencySet.has(course)) {
      return true;
    }

    if (!prerequisitesMap.has(course)) {
      noLoopDependencySet.add(course);
      return true;
    }

    if (currentPath.has(course)) {
      return false;
    }

    currentPath.add(course);

    for (const preCourse of prerequisitesMap.get(course)) {
      if (!hasNoLoopDependency(preCourse)) {
        return false;
      }
    }

    currentPath.delete(course);

    noLoopDependencySet.add(course);
    return true;
  }

  for (const course of prerequisitesMap.keys()) {
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
