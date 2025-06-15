/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
var findInMountainArray = function (target, mountainArr) {
    var n = mountainArr.length();
    var arr = new Array(n).fill(null);

    function at(index) {
        if (index < 0) {
            return -Infinity;
        }

        if (arr[index] !== null) {
            return arr[index];
        }

        arr[index] = mountainArr.get(index);
        return arr[index];
    }

    var peak;

    l = 0;
    r = n - 1;
    var m;

    while (l <= r) {
        m = Math.floor((l + r) / 2);

        if (at(m - 1) < at(m) && at(m) > at(m + 1)) {
            peak = m;
            break;
        }

        if (at(m - 1) < at(m) && at(m) < at(m + 1)) {
            l = m + 1;
            continue;
        }

        r = m - 1;
    }

    if (at(peak) === target) {
        return peak;
    }

    l = 0;
    r = peak;
    while (l <= r) {
        m = Math.floor((l + r) / 2);

        if (at(m) === target) {
            return m;
        }

        if (target < at(m)) {
            r = m - 1;
            continue;
        }

        l = m + 1;
    }

    l = peak;
    r = n - 1;

    while (l <= r) {
        m = Math.floor((l + r) / 2);
        if (at(m) === target) {
            return m;
        }

        if (target > at(m)) {
            r = m - 1;
            continue;
        }

        l = m + 1;
    }

    return -1;
};

const tests = [
    {
        arr: [1, 2, 3, 4, 5, 3, 1],
        target: 3,
        output: 2,
    },
    {
        arr: [1, 5, 2],
        target: 5,
        output: 1,
    },
    {
        arr: [1, 2, 3, 5, 3],
        target: 3,
        output: 2,
    },
    {
        arr: [3, 5, 3, 2, 0],
        target: 0,
        output: 4,
    },
];

class MountainArray {
    constructor(arr) {
        this.arr = arr;
        this.count = 0;
    }

    get(index) {
        this.count++;
        return this.arr[index];
    }

    length() {
        return this.arr.length;
    }
}

for (const { arr, target, output } of tests) {
    const mountainArr = new MountainArray(arr);
    const result = findInMountainArray(target, mountainArr);
    console.dir({ arr, target, result, output, count: mountainArr.count });
}
