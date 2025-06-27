/**
 * Class that stores messages grouped by fixed-size, non-overlapping time windows.
 */
class MessageWindow {
    /**
     * @param {number} windowInMilliseconds - Size of each time window in milliseconds (e.g. 60 for 1 hour).
     */
    constructor(windowInMilliseconds) {
        this.window = windowInMilliseconds;
        this.messages = [];
    }

    /**
     * Adds a message with the current timestamp and returns grouped messages by time windows.
     *
     * @param {string} message - The message content to store.
     * @returns {string[]} - An array of comma-separated message groups,
     *                       ordered from the most recent window to older ones.
     */
    addMessage(message) {
        var now = Date.now();
        this.messages.push({ timestamp: now, value: message });

        var period = null;
        var chunk = [];
        var result = [];

        for (var { timestamp, value } of this.messages) {
            var currentPeriod = Math.floor((now - timestamp) / this.window);

            if (period === null) {
                period = currentPeriod;
            }

            if (currentPeriod === period) {
                chunk.push(value);
                continue;
            }

            result.push(chunk.join(', '));
            chunk = [value];
            period = currentPeriod;
        }

        if (chunk.length) {
            result.push(chunk.join(', '));
        }

        return result;
    }
}

const tests = [
    {
        input: {
            commands: [
                'MessageWindow',
                'addMessage',
                'addMessage',
                'addMessage',
            ],
            values: [[500], ['hello'], ['hello1'], ['hello2']],
            delays: [null, 0, 400, 1000],
        },
        output: [
            null,
            ['hello'],
            ['hello, hello1'],
            ['hello, hello1', 'hello2'],
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
        const delay = test.input.delays[i];

        if (command === 'MessageWindow') {
            obj = new MessageWindow(...values);
            result.push(null);
            continue;
        }

        setTimeout(() => {
            result.push(obj[command](...values));
            // console.dir(
            //     {
            //         command,
            //         values,
            //         result: result[i],
            //         expected: test.output[i],
            //         obj,
            //     },
            //     { depth: 4 }
            // );
        }, delay);
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
