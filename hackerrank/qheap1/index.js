function processData(input) {
  const data = input
    .split("\n")
    .map((item) => item.split(" ").map((el) => Number(el)));

  const len = data[0][0];
  const heap = new Heap();

  for (let i = 1; i <= len; i++) {
    const item = data[i];

    if (item[0] === 3) {
      console.log(heap.peep());
    }

    if (item[0] === 1) {
      heap.push(item[1]);
    }

    if (item[0] === 2) {
      heap.findAndPop(item[1]);
    }
  }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});

process.stdin.on("end", function () {
  processData(_input);
});

class Heap {
  arr;

  constructor() {
    this.arr = [];
  }

  push(x) {
    this.arr.push(x);
    this.heapifyUp(this.arr.length - 1);
  }

  getLeftChildIdx(i) {
    const childIdx = 2 * i + 1;
    return childIdx < this.arr.length ? childIdx : null;
  }

  getRightChildIdx(i) {
    const childIdx = 2 * i + 2;
    return childIdx < this.arr.length ? childIdx : null;
  }

  swap(i, j) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  getParentIdx(i) {
    if (i < 1) {
      return null;
    }

    return Math.floor((i - 1) / 2);
  }

  heapifyUp(i) {
    let currentIdx = i;
    let parentIdx = this.getParentIdx(currentIdx);

    while (parentIdx !== null && this.arr[currentIdx] < this.arr[parentIdx]) {
      this.swap(parentIdx, currentIdx);
      currentIdx = parentIdx;
      parentIdx = this.getParentIdx(currentIdx);
    }
  }

  heapifyDown(i) {
    let currentIdx = i;
    let leftChildIdx;
    let rightChildIdx;

    while (currentIdx !== null) {
      leftChildIdx = this.getLeftChildIdx(currentIdx);
      rightChildIdx = this.getRightChildIdx(currentIdx);

      if (
        leftChildIdx !== null &&
        this.arr[leftChildIdx] < this.arr[rightChildIdx] &&
        this.arr[leftChildIdx] < this.arr[currentIdx]
      ) {
        this.swap(leftChildIdx, currentIdx);
        currentIdx = this.getLeftChildIdx(currentIdx);
        continue;
      }

      if (
        rightChildIdx !== null &&
        this.arr[rightChildIdx] < this.arr[leftChildIdx] &&
        this.arr[rightChildIdx] < this.arr[currentIdx]
      ) {
        this.swap(rightChildIdx, currentIdx);
        currentIdx = this.getRightChildIdx(currentIdx);
        continue;
      }

      break;
    }
  }

  peep() {
    if (this.arr.length === 0) {
      console.log("Heap is empty");
      return null;
    }

    return this.arr[0];
  }

  pop() {
    if (this.arr.length === 0) {
      console.log("Heap is empty");
      return null;
    }
    console.log(this.arr);

    if (this.arr.length === 1) {
      return this.arr.pop();
    }

    const result = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.heapifyDown(0);
    return result;
  }

  findAndPop(x) {
    const foundIdx = this.arr.findIndex((item) => x === item);
    if (foundIdx === -1) {
      console.log(`${x} is not found`);
      return null;
    }

    if (this.arr.length === 1 || foundIdx === this.arr.length - 1) {
      return this.arr.pop();
    }

    const result = this.arr[foundIdx];
    this.arr[foundIdx] = this.arr.pop();
    this.heapifyDown(foundIdx);
    return result;
  }
}
