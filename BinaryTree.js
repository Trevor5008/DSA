class BinaryTree {
    constructor(value, depth = 1) {
        this.value = value;
        this.depth = depth;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        if (value < this.value) {
            if (!this.left) {
                this.left = new BinaryTree(value, this.depth + 1);
            } else {
                this.left.insert(value);
            }
        } else { // value is greater than root
            if (!this.right) {
                this.right = new BinaryTree(value, this.depth + 1);
            } else {
                this.right.insert(value);
            }
        }
    }

    getNodeByValue(value) {
        if (this.value === value) {
          return this;
        } else if ((this.left) && (value < this.value)) {
            return this.left.getNodeByValue(value);
        } else if (this.right) {
            return this.right.getNodeByValue(value);
        } else {
          return null;
        }
      }
    
      depthFirstTraversal() {
        if (this.left) {
          this.left.depthFirstTraversal();
        }
        console.log(`Depth=${this.depth}, Value=${this.value}`);
        if (this.right) {
          this.right.depthFirstTraversal();
        }
      }

      remove(value, parent = null) {
        // First, we'll check if the value is less than the current node's value. If it is, we'll search the left subtree.
        if (value < this.value) {
          if (this.left !== null) {
            this.left.remove(value, this);
          }
        } else if (value > this.value) {
          // If the value is greater than the current node's value, we'll search the right subtree.
          if (this.right !== null) {
            this.right.remove(value, this);
          }
        } else {
          // If we've reached this point, it means that we've found the node we want to remove.
          // Now we need to determine if it has 0, 1, or 2 children.
    
          if (this.left !== null && this.right !== null) {
            // If the node has two children, we'll find its in-order successor and replace the node's value with the successor's value.
            this.value = this.right.getMinValue();
            this.right.remove(this.value, this);
          } else if (parent === null) {
            // If the node has one child and it is the root node, we'll just make the child the new root of the tree.
            if (this.left !== null) {
              this.value = this.left.value;
              this.right = this.left.right;
              this.left = this.left.left;
            } else if (this.right !== null) {
              this.value = this.right.value;
              this.left = this.right.left;
              this.right = this.right.right;
            }
          } else if (parent.left === this) {
            // If the node has one child and it is the left child of its parent, we'll replace the parent's left child with the node's child.
            parent.left = this.left !== null ? this.left : this.right;
          } else if (parent.right === this) {
            parent.right = this.left !== null ? this.left : this.right;
          }
        }
    }
    

      locateValue(value) {
        if (this.value === value) return this;
        else if ((value < this.value) && (this.left)) return this.left.locateValue(value);
        else if (this.right) return this.right.locateValue(value);
        else return 'Not Found';
      }

      getMinValue() {
        let currentNode = this;
        while (currentNode.left) {
            currentNode = currentNode.left;
        }
        return currentNode.value;
      }
}

module.exports = BinaryTree;