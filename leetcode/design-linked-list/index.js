var MyLinkedList = function () {
    this.head = null;
    this.tail = null;
    this.length = 0;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.find = function (index) {
    let i = 0;
    let node = this.head;

    while (i < index && node !== null) {
        node = node.next;
        i++;
    }

    if (!node) {
        return null;
    }

    return node;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    const node = this.find(index);

    if (node === null) {
        return -1;
    }

    return node.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    const node = { val, prev: null, next: this.head };

    if (this.head) {
        this.head.prev = node;
    }

    this.head = node;

    if (!this.tail) {
        this.tail = node;
    }

    this.length++;
    return null;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    const node = { val, prev: this.tail, next: null };

    if (this.tail) {
        this.tail.next = node;
    }

    this.tail = node;

    if (!this.head) {
        this.head = node;
    }

    this.length++;
    return null;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index > this.length) {
        return null;
    }

    if (index === this.length) {
        return this.addAtTail(val);
    }

    if (index === 0) {
        return this.addAtHead(val);
    }

    const next = this.find(index);
    const prev = next.prev;

    const node = { val, prev, next };
    next.prev = node;
    prev.next = node;
    this.length++;
    return null;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (this.length === 0) {
        return null;
    }

    if (index === 0) {
        // delete head
        const next = this.head.next;
        this.head = next;
        if (next) {
            next.prev = null;
        }
        this.length--;
        return null;
    }

    if (index === this.length - 1) {
        // delete tail
        const prev = this.tail.prev;
        this.tail = prev;

        if (prev) {
            prev.next = null;
        }

        this.length--;
        return null;
    }

    const node = this.find(index);

    if (!node) {
        return null;
    }

    const prev = node.prev;
    const next = node.next;
    if (prev) {
        prev.next = next;
    }
    if (next) {
        next.prev = prev;
    }
    node.prev = null;
    node.next = null;
    this.length--;
    return null;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

const tests = [
    // {
    //     input: {
    //         commands: [
    //             'MyLinkedList',
    //             'addAtHead',
    //             'addAtTail',
    //             'addAtIndex',
    //             'get',
    //             'deleteAtIndex',
    //             'get',
    //         ],
    //         values: [[], [1], [3], [1, 2], [1], [1], [1]],
    //     },
    //     output: [null, null, null, null, 2, null, 3],
    // },
    {
        input: {
            commands: [
                'MyLinkedList',
                'addAtHead',
                'addAtTail',
                'addAtTail',
                'get',
                'get',
                'addAtTail',
                'addAtIndex',
                'addAtHead',
                'addAtHead',
                'addAtTail',
                'addAtTail',
                'addAtTail',
                'addAtTail',
                'get',
                'addAtHead',
                'addAtHead',
                'addAtIndex',
                'addAtIndex',
                'addAtHead',
                'addAtTail',
                'deleteAtIndex',
                'addAtHead',
                'addAtHead',
                'addAtIndex',
                'addAtTail',
                'get',
                'addAtIndex',
                'addAtTail',
                'addAtHead',
                'addAtHead',
                'addAtIndex',
                'addAtTail',
                'addAtHead',
                'addAtHead',
                'get',
                'deleteAtIndex',
                'addAtTail',
                'addAtTail',
                'addAtHead',
                'addAtTail',
                'get',
                'deleteAtIndex',
                'addAtTail',
                'addAtHead',
                'addAtTail',
                'deleteAtIndex',
                'addAtTail',
                'deleteAtIndex',
                'addAtIndex',
                'deleteAtIndex',
                'addAtTail',
                'addAtHead',
                'addAtIndex',
                'addAtHead',
                'addAtHead',
                'get',
                'addAtHead',
                'get',
                'addAtHead',
                'deleteAtIndex',
                'get',
                'addAtHead',
                'addAtTail',
                'get',
                'addAtHead',
                'get',
                'addAtTail',
                'get',
                'addAtTail',
                'addAtHead',
                'addAtIndex',
                'addAtIndex',
                'addAtHead',
                'addAtHead',
                'deleteAtIndex',
                'get',
                'addAtHead',
                'addAtIndex',
                'addAtTail',
                'get',
                'addAtIndex',
                'get',
                'addAtIndex',
                'get',
                'addAtIndex',
                'addAtIndex',
                'addAtHead',
                'addAtHead',
                'addAtTail',
                'addAtIndex',
                'get',
                'addAtHead',
                'addAtTail',
                'addAtTail',
                'addAtHead',
                'get',
                'addAtTail',
                'addAtHead',
                'addAtTail',
                'get',
                'addAtIndex',
            ],
            values: [
                [],
                [84],
                [2],
                [39],
                [3],
                [1],
                [42],
                [1, 80],
                [14],
                [1],
                [53],
                [98],
                [19],
                [12],
                [2],
                [16],
                [33],
                [4, 17],
                [6, 8],
                [37],
                [43],
                [11],
                [80],
                [31],
                [13, 23],
                [17],
                [4],
                [10, 0],
                [21],
                [73],
                [22],
                [24, 37],
                [14],
                [97],
                [8],
                [6],
                [17],
                [50],
                [28],
                [76],
                [79],
                [18],
                [30],
                [5],
                [9],
                [83],
                [3],
                [40],
                [26],
                [20, 90],
                [30],
                [40],
                [56],
                [15, 23],
                [51],
                [21],
                [26],
                [83],
                [30],
                [12],
                [8],
                [4],
                [20],
                [45],
                [10],
                [56],
                [18],
                [33],
                [2],
                [70],
                [57],
                [31, 24],
                [16, 92],
                [40],
                [23],
                [26],
                [1],
                [92],
                [3, 78],
                [42],
                [18],
                [39, 9],
                [13],
                [33, 17],
                [51],
                [18, 95],
                [18, 33],
                [80],
                [21],
                [7],
                [17, 46],
                [33],
                [60],
                [26],
                [4],
                [9],
                [45],
                [38],
                [95],
                [78],
                [54],
                [42, 86],
            ],
        },
        output: [null, null, null, null, 2, null, 3],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = [];
    var obj;

    for (let i = 0; i < test.input.commands.length; i++) {
        const command = test.input.commands[i];
        const values = test.input.values[i];

        if (command === 'MyLinkedList') {
            obj = new MyLinkedList(...values);
            result.push(null);
            continue;
        }

        result.push(obj[command](...values));

        // console.dir({ command, values, obj }, { depth: 2 });
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
