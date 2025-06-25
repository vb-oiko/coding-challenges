class EventEmitter {
    constructor() {
        /**
         * @type {Map<string, Set<Function>}
         */
        this.subscriberMap = new Map();
        return null;
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        var callbackSet = this.subscriberMap.get(eventName) || new Set();
        callbackSet.add(callback);
        this.subscriberMap.set(eventName, callbackSet);
        return {
            unsubscribe: () => {
                this.subscriberMap.get(eventName).delete(callback);
            },
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        var callbackSet = this.subscriberMap.get(eventName);
        if (!callbackSet) {
            return [];
        }

        var results = [];
        var callbacks = callbackSet.values();
        for (var callback of callbacks) {
            results.push(callback(...args));
        }

        return results;
    }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */

const tests = [
    {
        input: {
            commands: [
                'EventEmitter',
                'emit',
                'subscribe',
                'subscribe',
                'emit',
            ],
            values: [
                [],
                ['firstEvent'],
                [
                    'firstEvent',
                    function cb1() {
                        return 5;
                    },
                ],
                [
                    'firstEvent',
                    function cb1() {
                        return 6;
                    },
                ],
                ['firstEvent'],
            ],
        },
        output: [
            [],
            ['emitted', []],
            ['subscribed'],
            ['subscribed'],
            ['emitted', [5, 6]],
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

        if (command === 'EventEmitter') {
            obj = new EventEmitter(...values);
            result.push([]);
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
        if (command === 'emit') {
            result.push(['emitted', obj[command](...values)]);
        }
        if (command === 'subscribe') {
            obj[command](...values);
            result.push(['subscribed']);
        }
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
