const LinkedList = require('./LinkedList');
const Node = require('./Node');

class HashMap {
    constructor(size = 0) {
        this.hashMap = new Array(size).fill(null).map(() => new LinkedList());
    }

    hash (key) {
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode += hashCode + key.charCodeAt(i);
        }
        return hashCode % this.hashMap.length;
    }

    assign (key, value) {
        const arrayIndex = this.hash(key);
        const linkedList = this.hashMap[arrayIndex];
        if (!linkedList.head) {
            linkedList.addToHead({key, value});
            return;
        }
        let current = linkedList.head;
        while (current) {
            if (current.data.key === key) {
                current.data.value = value;
            }
            if (!current.next) { // tail of linkedList
                current.next = new Node({ key, value });
                break;
            }
            current = current.next;
        }
    }

    retrieve (key) {
        const arrayIndex = this.hash(key);
        let current = this.hashMap[arrayIndex].head;
        while (current) {
            if (current.data.key === key) {
                return current.data.value;
            }
            current = current.next;
        }
        return null;
    }
}

module.exports = HashMap;