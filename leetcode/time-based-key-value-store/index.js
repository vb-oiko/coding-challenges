var TimeMap = function () {
    this.map = {};
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
    var timestamps = this.map[key] || [];
    timestamps.push({ value, timestamp });

    this.map[key] = timestamps;
    return null;
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
    var timestamps = this.map[key];
    if (!timestamps) {
        return '';
    }

    var n = timestamps.length;

    if (timestamp < timestamps[0].timestamp) {
        return '';
    }

    for (var i = n - 1; i >= 0; i--) {
        if (timestamp >= timestamps[i].timestamp) {
            return timestamps[i].value;
        }
    }
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

const tests = [
    {
        input: {
            commands: ['TimeMap', 'set', 'get', 'get', 'set', 'get', 'get'],
            values: [
                [],
                ['foo', 'bar', 1],
                ['foo', 1],
                ['foo', 3],
                ['foo', 'bar2', 4],
                ['foo', 4],
                ['foo', 5],
            ],
        },
        output: [null, null, 'bar', 'bar', null, 'bar2', 'bar2'],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = [];
    var obj;

    for (let i = 0; i < test.input.commands.length; i++) {
        const command = test.input.commands[i];
        const values = test.input.values[i];

        if (command === 'TimeMap') {
            obj = new TimeMap(...values);
            result.push(null);
            continue;
        }

        result.push(obj[command](...values));
        console.dir(
            {
                command,
                values,
                result: result[i],
                expected: test.output[i],
                obj,
            },
            { depth: 4 }
        );
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
