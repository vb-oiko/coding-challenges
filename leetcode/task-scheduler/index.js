/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
    var taskMap = {};
    for (var task of tasks) {
        taskMap[task] = (taskMap[task] || 0) + 1;
    }

    var level = MaxPriorityQueue.fromArray(Object.values(taskMap));
    var nextLevel;
    var roundCount = 0;
    var taskCount;
    var currentFreq;
    while (level.size() > 0) {
        // console.dir({ level: level.toArray() });
        nextLevel = [];
        taskCount = 0;

        while (level.size() > 0 && taskCount <= n) {
            currentFreq = level.dequeue();
            taskCount++;
            if (currentFreq > 1) {
                nextLevel.push(currentFreq - 1);
            }
        }
        // console.dir({ nextLevel });

        roundCount++;
        nextLevel.forEach((i) => level.enqueue(i));
    }

    return (roundCount - 1) * (n + 1) + taskCount;
};

const tests = [
    {
        input: { tasks: ['A', 'A', 'A', 'B', 'B', 'B'], n: 2 },
        output: 8,
    },
    {
        input: { tasks: ['A', 'B'], n: 2 },
        output: 2,
    },
    {
        input: { tasks: ['A', 'A'], n: 2 },
        output: 4,
    },
    {
        input: { tasks: ['A'], n: 2 },
        output: 1,
    },
    {
        input: { tasks: ['A', 'C', 'A', 'B', 'D', 'B'], n: 1 },
        output: 6,
    },
    {
        input: { tasks: ['A', 'A', 'A', 'B', 'B', 'B'], n: 3 },
        output: 10,
    },
];

import { MaxPriorityQueue } from '@datastructures-js/priority-queue';

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = leastInterval(...Object.values(test.input));
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
