var TimeLimitedCache = function () {
    this.cache = {};
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
    var timestamp = Date.now();
    var item = this.cache[key];
    var doesExist = item !== undefined && timestamp <= item.expire;
    this.cache[key] = { value, expire: timestamp + duration };
    return doesExist;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
    var timestamp = Date.now();
    var item = this.cache[key];

    if (!item) {
        return -1;
    }

    if (timestamp > item.expire) {
        delete this.cache[key];
        return -1;
    }

    return item.value;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
    var timestamp = Date.now();

    var count = 0;
    for (var [key, item] of Object.entries(this.cache)) {
        if (item.expire > timestamp) {
            count++;
            continue;
        }

        delete this.cache[key];
    }

    return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */

const tests = [];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = TimeLimitedCache(...Object.values(test.input));
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
