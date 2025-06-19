/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
    this.capacity = capacity;
    this.valueMap = new Map();
    this.frequencyMap = new Map();
    this.nextMinFreq = Infinity;
};

/**
 * @param {node} object
 * @return {void}
 */
LFUCache.prototype.incrementCounter = function (node) {
    var prevFreq = node.counter;
    var nextFreq = node.counter + 1;
    var prevFreqSet = this.frequencyMap.get(prevFreq) || new Set();
    var nextFreqSet = this.frequencyMap.get(nextFreq) || new Set();

    if (prevFreq === 1) {
        this.nextMinFreq = 2;
    } else if (prevFreq === this.nextMinFreq && prevFreqSet.size === 1) {
        this.nextMinFreq = nextFreq;
    }

    prevFreqSet.delete(node);
    nextFreqSet.add(node);

    this.frequencyMap.set(prevFreq, prevFreqSet);
    this.frequencyMap.set(nextFreq, nextFreqSet);

    node.counter++;
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
    var node = this.valueMap.get(key);

    if (!node) {
        return -1;
    }

    this.incrementCounter(node);

    this.valueMap.set(key, node);

    return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
    var node;

    // it's a hit
    if (this.valueMap.has(key)) {
        node = this.valueMap.get(key);
        node.value = value;
        this.incrementCounter(node);

        return null;
    }

    // it's a miss
    node = { key, value, counter: 1 };
    this.valueMap.set(key, node);

    // cache is not yet full
    if (this.valueMap.size <= this.capacity) {
        var freqSet = this.frequencyMap.get(1) || new Set();
        freqSet.add(node);
        this.frequencyMap.set(1, freqSet);
        return null;
    }

    // cache is full

    // there are key/values with frequency of 1
    var minFreqSet = this.frequencyMap.get(1);
    var freqSetIterator;
    var nodeToDelete;
    if (minFreqSet.size > 0) {
        freqSetIterator = minFreqSet.values();
        nodeToDelete = freqSetIterator.next().value;
        minFreqSet.delete(nodeToDelete);
        minFreqSet.add(node);
        this.frequencyMap.set(1, minFreqSet);
        this.valueMap.delete(nodeToDelete.key);
        return null;
    }

    // there are only keys with frequency greater than 1
    minFreqSet = this.frequencyMap.get(this.nextMinFreq);
    freqSetIterator = minFreqSet.values();
    nodeToDelete = freqSetIterator.next().value;
    this.valueMap.delete(nodeToDelete.key);
    minFreqSet.delete(nodeToDelete);
    this.frequencyMap.set(this.nextMinFreq, minFreqSet);
    if (minFreqSet.size === 0) {
        this.nextMinFreq = 2;
    }
    minFreqSet = this.frequencyMap.get(1) || new Set();
    minFreqSet.add(node);
    this.frequencyMap.set(1, minFreqSet);

    return null;
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const tests = [
    // {
    //     input: {
    //         commands: [
    //             'LFUCache',
    //             'put',
    //             'put',
    //             'get',
    //             'put',
    //             'get',
    //             'get',
    //             'put',
    //             'get',
    //             'get',
    //             'get',
    //         ],
    //         values: [
    //             [2],
    //             [1, 1],
    //             [2, 2],
    //             [1],
    //             [3, 3],
    //             [2],
    //             [3],
    //             [4, 4],
    //             [1],
    //             [3],
    //             [4],
    //         ],
    //     },
    //     output: [null, null, null, 1, null, -1, 3, null, -1, 3, 4],
    // },
    {
        input: {
            commands: [
                'LFUCache',
                'put',
                'put',
                'put',
                'put',
                'put',
                'get',
                'put',
                'get',
                'get',
                'put',
                'get',
                'put',
                'put',
                'put',
                'get',
                'put',
                'get',
                'get',
                'get',
                'get',
                'put',
                'put',
                'get',
                'get',
                'get',
                'put',
                'put',
                'get',
                'put',
                'get',
                'put',
                'get',
                'get',
                'get',
                'put',
                'put',
                'put',
                'get',
                'put',
                'get',
                'get',
                'put',
                'put',
                'get',
                'put',
                'put',
                'put',
                'put',
                'get',
                'put',
                'put',
                'get',
                'put',
                'put',
                'get',
                'put',
                'put',
                'put',
                'put',
                'put',
                'get',
                'put',
                'put',
                'get',
                'put',
                'get',
                'get',
                'get',
                'put',
                'get',
                'get',
                'put',
                'put',
                'put',
                'put',
                'get',
                'put',
                'put',
                'put',
                'put',
                'get',
                'get',
                'get',
                'put',
                'put',
                'put',
                'get',
                'put',
                'put',
                'put',
                'get',
                'put',
                'put',
                'put',
                'get',
                'get',
                'get',
                'put',
                'put',
                'put',
                'put',
                'get',
                'put',
                'put',
                'put',
                'put',
                'put',
                'put',
                'put',
            ],
            values: [
                [10],
                [10, 13],
                [3, 17],
                [6, 11],
                [10, 5],
                [9, 10],
                [13],
                [2, 19],
                [2],
                [3],
                [5, 25],
                [8],
                [9, 22],
                [5, 5],
                [1, 30],
                [11],
                [9, 12],
                [7],
                [5],
                [8],
                [9],
                [4, 30],
                [9, 3],
                [9],
                [10],
                [10],
                [6, 14],
                [3, 1],
                [3],
                [10, 11],
                [8],
                [2, 14],
                [1],
                [5],
                [4],
                [11, 4],
                [12, 24],
                [5, 18],
                [13],
                [7, 23],
                [8],
                [12],
                [3, 27],
                [2, 12],
                [5],
                [2, 9],
                [13, 4],
                [8, 18],
                [1, 7],
                [6],
                [9, 29],
                [8, 21],
                [5],
                [6, 30],
                [1, 12],
                [10],
                [4, 15],
                [7, 22],
                [11, 26],
                [8, 17],
                [9, 29],
                [5],
                [3, 4],
                [11, 30],
                [12],
                [4, 29],
                [3],
                [9],
                [6],
                [3, 4],
                [1],
                [10],
                [3, 29],
                [10, 28],
                [1, 20],
                [11, 13],
                [3],
                [3, 12],
                [3, 8],
                [10, 9],
                [3, 26],
                [8],
                [7],
                [5],
                [13, 17],
                [2, 27],
                [11, 15],
                [12],
                [9, 19],
                [2, 15],
                [3, 16],
                [1],
                [12, 17],
                [9, 1],
                [6, 19],
                [4],
                [5],
                [5],
                [8, 1],
                [11, 7],
                [5, 2],
                [9, 28],
                [1],
                [2, 2],
                [7, 4],
                [4, 22],
                [7, 24],
                [9, 26],
                [13, 28],
                [11, 26],
            ],
        },
        output: [],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = [];
    var obj;

    for (let i = 0; i < test.input.commands.length; i++) {
        const command = test.input.commands[i];
        const values = test.input.values[i];

        if (command === 'LFUCache') {
            obj = new LFUCache(...values);
            result.push(null);
            continue;
        }

        console.dir(
            {
                command,
                values,
                // result: result[i],
                // expected: test.output[i],
                obj,
            },
            { depth: 3 }
        );

        result.push(obj[command](...values));
    }

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
