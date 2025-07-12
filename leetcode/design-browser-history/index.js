/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
    this.history = [homepage];
    this.index = 0;
};

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function (url) {
    this.history.length = this.index + 1;
    this.history.push(url);
    this.index++;
    return null;
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function (steps) {
    this.index = Math.max(0, this.index - steps);
    return this.history[this.index];
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function (steps) {
    this.index = Math.min(this.history.length - 1, this.index + steps);
    return this.history[this.index];
};

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */

const tests = [
    {
        input: {
            commands: [
                'BrowserHistory',
                'visit',
                'visit',
                'visit',
                'back',
                'back',
                'forward',
                'visit',
                'forward',
                'back',
                'back',
            ],
            values: [
                ['leetcode.com'],
                ['google.com'],
                ['facebook.com'],
                ['youtube.com'],
                [1],
                [1],
                [1],
                ['linkedin.com'],
                [2],
                [2],
                [7],
            ],
        },
        output: [
            null,
            null,
            null,
            null,
            'facebook.com',
            'google.com',
            'facebook.com',
            null,
            'linkedin.com',
            'google.com',
            'leetcode.com',
        ],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = [];
    var obj;

    for (let i = 0; i < test.input.commands.length; i++) {
        const command = test.input.commands[i];
        const values = test.input.values[i];

        if (command === 'BrowserHistory') {
            obj = new BrowserHistory(...values);
            result.push(null);
            continue;
        }

        // console.dir(
        //     {
        //         command,
        //         values,
        //         result: result[i],
        //         expected: test.output[i],
        //         obj,
        //     },
        //     { depth: 3 }
        // );
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
