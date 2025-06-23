var Trie = function () {
    this.root = { map: {}, terminal: true };
    return null;
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    var n = word.length;
    var node = this.root;

    for (var i = 0; i < n; i++) {
        var child = node.map[word[i]];
        if (!child) {
            child = { map: {}, terminal: false };
            node.map[word[i]] = child;
        }

        if (i === n - 1) {
            child.terminal = true;
        }

        node = child;
    }

    return null;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    var n = word.length;
    var node = this.root;

    for (var i = 0; i < n; i++) {
        var child = node.map[word[i]];
        if (!child) {
            return false;
        }

        if (i === n - 1) {
            return child.terminal;
        }

        node = child;
    }
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    var n = prefix.length;
    var node = this.root;

    for (var i = 0; i < n; i++) {
        var child = node.map[prefix[i]];
        if (!child) {
            return false;
        }
        node = child;
    }

    return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

const tests = [
    {
        input: {
            commands: [
                'Trie',
                'insert',
                'search',
                'search',
                'startsWith',
                'insert',
                'search',
            ],
            values: [
                [],
                ['apple'],
                ['apple'],
                ['app'],
                ['app'],
                ['app'],
                ['app'],
            ],
        },
        output: [null, null, true, false, true, null, true],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = [];
    var obj;

    for (let i = 0; i < test.input.commands.length; i++) {
        const command = test.input.commands[i];
        const values = test.input.values[i];

        if (command === 'Trie') {
            obj = new Trie(...values);
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
