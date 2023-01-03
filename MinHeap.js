class MinHeap {
    constructor() {
        this.heap = [null]; // value at index 0 will be null
        this.size = 0;
    }

    popMin() {
        if (this.size === 0) { // heap is empty
            return null;
        }
        this.swap(1, this.size);
        const min = this.heap.pop(); // after the swap, last element is min
        this.size--;
        this.heapify();
        return min;
    }

    add(value) {
        this.heap.push(value);
        this.size++;
        this.bubbleUp();
    }

    bubbleUp() {
        let current = this.size;
        let swapCount = 0;
        while (current > 1 && this.heap[getParent(current)] > this.heap[current]) {
            this.swap(current, getParent(current));
            current = getParent(current);
            swapCount++;
        }
    }

    heapify() {
        let current = 1;
        let leftChild = getLeft(current);
        let rightChild = getRight(current);
        let swapCount = 0;

        while (this.canSwap(current, leftChild, rightChild)) {
            if (this.exists(leftChild) && this.exists(rightChild)) {
                if (this.heap[leftChild] < this.heap[rightChild]) {
                    this.swap(current, leftChild);
                    current = leftChild;
                    swapCount++;
                } else {
                    this.swap(current, rightChild);
                    current = rightChild;
                    swapCount++;
                }
            } else {
                this.swap(current, leftChild);
                current = leftChild;
                swapCount++;
            }
            leftChild = getLeft(current);
            rightChild = getRight(current);
        }
        console.log(`Heap of ${this.size} restored with ${swapCount} swaps`)
    }

    exists(index) {
        return index <= this.size;
    }

    canSwap(current, leftChild, rightChild) {
        return (
            this.exists(leftChild) && this.heap[current] > this.heap[leftChild]
            || this.exists(rightChild) && this.heap[current] > this.heap[rightChild]
        );
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
}

const getParent = current => Math.floor(current/2);
const getLeft = current => current * 2;
const getRight = current => current * 2 + 1;

module.exports = MinHeap;