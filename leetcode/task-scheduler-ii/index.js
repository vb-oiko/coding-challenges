/**
 * @param {number[]} tasks
 * @param {number} space
 * @return {number}
 */
var taskSchedulerII = function (tasks, space) {
    var n = tasks.length;
    var scheduleMap = [];
    var i = 0;
    var day = 0;
    var scheduledDay;

    while (i < n) {
        scheduledDay = scheduleMap[tasks[i]];
        if (!scheduledDay) {
            scheduleMap[tasks[i]] = day + space + 1;
            i++;
            day++;
            continue;
        }

        if (scheduledDay <= day) {
            scheduleMap[tasks[i]] = day + space + 1;
            i++;
            day++;
            continue;
        }

        day += scheduledDay - day;
    }

    return day;
};

const tests = [
    { input: { tasks: [1, 2, 1, 2, 3, 1], space: 3 }, output: 9 },
    { input: { tasks: [5, 8, 8, 5], space: 2 }, output: 6 },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = taskSchedulerII(...Object.values(test.input));
    if (!deepEqual(result, test.output)) {
        console.log('❌ fail:');
        console.dir(
            { ...test.input, result, expected: test.output },
            { depth: null }
        );
    } else {
        console.log('✅ pass');
    }
}
