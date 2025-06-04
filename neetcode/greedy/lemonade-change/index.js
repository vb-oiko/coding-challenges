/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
    const COST = 5;

    const cash = {
        20: 0,
        10: 0,
        5: 0
    }


    for (const bill of bills) {
        let change = bill - COST
        let maxBill = 20;

        cash[bill] += 1
        if (change === 0) {
            continue
        }

        while (change > 0) {
            // console.dir({ bill, change, maxBill, cash })
            if (cash[change] > 0) {
                cash[change] = cash[change] - 1;
                change = 0
                break
            }

            if (change > maxBill && cash[maxBill] > 0) {
                change -= maxBill
                cash[maxBill] -= 1
                continue
            }

            if (change < maxBill || cash[maxBill] === 0 && maxBill > 5) {
                maxBill /= 2
                continue
            }

            break

        }

        if (change !== 0) {
            return false
        }

    }

    return true
};

const tests = [
    {
        bills: [5, 5, 5, 10, 20],
        output: true
    },
    {
        bills: [5, 5, 10, 10, 20],
        output: false
    }
]

for (const { bills, output } of tests) {
    const result = lemonadeChange(bills)
    console.dir({ bills, result, output })
}