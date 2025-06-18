// using Map which preserves the order of keys insertion

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (!this.map.has(key)) {
        return -1;
    }

    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);

    return value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
        const mapIter = this.map.keys();
        const firstItem = mapIter.next();
        this.map.delete(firstItem.value);
    }
    return null;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const tests = [
    {
        input: {
            commands: [
                'LRUCache',
                'put',
                'put',
                'get',
                'put',
                'get',
                'put',
                'get',
                'get',
                'get',
            ],
            values: [
                [2],
                [1, 1],
                [2, 2],
                [1],
                [3, 3],
                [2],
                [4, 4],
                [1],
                [3],
                [4],
            ],
        },
        output: [null, null, null, 1, null, -1, null, -1, 3, 4],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = [];
    var obj;

    for (let i = 0; i < test.input.commands.length; i++) {
        const command = test.input.commands[i];
        const values = test.input.values[i];

        switch (command) {
            case 'LRUCache':
                obj = new LRUCache(...values);
                result.push(null);
                break;

            case 'put':
                result.push(obj.put(...values));
                break;

            case 'get':
                result.push(obj.get(...values));
                break;
        }
    }
    console.dir(obj, { depth: 2 });

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
