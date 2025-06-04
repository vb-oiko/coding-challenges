/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
    let count5 = 0;
    let count10 = 0;


    for (const bill of bills) {
        if (bill === 5) {
            count5++;
            continue;
        }

        if (bill === 10 && count5 > 0) {
            count5--
            count10++
            continue
        }

        if (bill === 20) {
            if (count10 > 0 && count5 > 0) {
                count10--
                count5--
                continue
            }

            if (count5 > 2) {
                count5 -= 3
                continue
            }
        }

        return false
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