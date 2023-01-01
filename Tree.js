class Tree {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    addChild(child) {
        if (child instanceof Tree) {
            this.children.push(child);
        } else {
            this.children.push(new Tree(child));
        }
    }

    removeChild(childToRemove) {
        const length = this.children.length;
        this.children = this.children.forEach(child => {
            if (childToRemove instanceof Tree) {
                return child !== childToRemove;
            } else {
                return child.data !== childToRemove;
            }
        });
        if (this.children.length === length) {
            this.children.forEach(child => child.removeChild(childToRemove));
        }
    }

    depthFirstTraversal() {
        console.log(this.data)
        this.children.forEach(child => {
            return child.depthFirstTraversal();
        });
    }

    breadthFirstTraversal() {
        let queue = [this];
        while (queue.length) {
            const current = queue.shift();
            queue = queue.concat(current.children);
            console.log(current.data)
        }
    }

    print(level = 0) {
        let result = '';
        for (let i = 0; i < level; i++) {
            result += '-- ';
        }
        console.log(`${result}${this.data}`);
        this.children.forEach(child => child.print(level + 1));
    }
};

module.exports = Tree;