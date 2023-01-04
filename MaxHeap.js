class MaxHeap {
    constructor() {
        this.heap = [];
        this.size = 0;
    }

    insert(value) {
        this.heap.push(value);
        this.size++;
        console.log(`Added ${value} to our heap`);
        this.bubbleUp();
        console.log(`Heap restored: ${this.heap}`)
    }

    bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let { parentIdx } = this.getParentAndChildren(idx);
            if (this.heap[idx] <= this.heap[parentIdx]) break;
            this.swap(parentIdx, idx);
            idx = parentIdx;
        }
    }

    sinkDown() {
        let idx = 0;
        const length = this.size;
        const element = this.heap[idx];
        while (this.size > 0) {
            let { leftChildIdx, rightChildIdx } = this.getParentAndChildren(idx);
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild > element) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (!swap && rightChild > element ||
                    swap && rightChild > leftChild) {
                    swap = rightChildIdx;
                }
            }
            if (!swap) break;
            this.swap(idx, swap);
            idx = swap;
        }
    }

    remove() {
        if (this.size === 0) return null;
        this.swap(0, this.size - 1);
        const removed = this.heap.pop();
        this.size--;
        this.sinkDown();
        return removed;
    } 

    getParentAndChildren(idx) {
        let parentIdx = Math.floor((idx - 1)/2);
        let leftChildIdx = idx * 2 + 1;
        let rightChildIdx = idx * 2 + 2;
        return { parentIdx, leftChildIdx, rightChildIdx };
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
}

module.exports = MaxHeap;