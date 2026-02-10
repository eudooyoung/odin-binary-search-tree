import Node from "./node.js";

export default class Tree {
  root = null;

  constructor(arr) {
    if (!arr) {
      throw new TypeError("Argument is expected");
    }

    if (!Array.isArray(arr)) {
      throw new TypeError("Argument should be an array");
    }

    this.root = this.#buildTree(arr);
  }

  #buildTree = (arr) => {
    const clean = this.#normalizeArray(arr);
    return this.#buildTreeRecursive(clean, 0, clean.length - 1);
  };

  #normalizeArray = (arr) => {
    const uniqueSet = new Set(arr);
    const uniqueArr = Array.from(uniqueSet);
    const sortedUnique = uniqueArr.sort((a, b) => a - b);

    return sortedUnique;
  };

  #buildTreeRecursive = (arr, start, end) => {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.#buildTreeRecursive(arr, start, mid - 1);
    root.right = this.#buildTreeRecursive(arr, mid + 1, end);

    return root;
  };

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  };

  includes = (value) => {
    let current = this.root;
    while (current) {
      if (current.data === value) {
        return true;
      }

      if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  };

  insert = (value) => {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let current = this.root;
    while (true) {
      if (current.data === value) {
        return;
      }
      if (value < current.data) {
        if (!current.left) {
          current.left = new Node(value);
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node(value);
          return;
        }
        current = current.right;
      }
    }
  };

  deleteItem = (value) => {
    this.root = this.#deleteRecursive(this.root, value);
  };

  #deleteRecursive = (node, value) => {
    if (!node) {
      return null;
    }

    if (value < node.data) {
      node.left = this.#deleteRecursive(node.left, value);
      return node;
    } else if (node.data < value) {
      node.right = this.#deleteRecursive(node.right, value);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // get successor only when the node.left and node.right exist
      const successor = this.#getSuccessor(node.right);
      node.data = successor.data;
      node.right = this.#deleteRecursive(node.right, successor.data);
      return node;
    }
  };

  #getSuccessor = (current) => {
    while (current.left) {
      current = current.left;
    }
    return current;
  };

  levelOrderForEachIterative = (callback) => {
    if (!callback || typeof callback !== "function") {
      throw new TypeError("A callback function is required");
    }

    const root = this.root;

    if (!root) {
      return;
    }

    const queue = [];
    let head = 0;
    queue.push(root);

    while (head < queue.length) {
      const current = queue[head];
      head++;
      callback(current.data);

      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  };

  levelOrderForEachRecursive = (callback) => {
    if (!callback || typeof callback !== "function") {
      throw new TypeError("A callback function is required");
    }

    const root = this.root;

    if (!root) {
      return;
    }

    const levels = [];
    this.#visitLevelRecursive(root, 0, levels);

    levels.forEach((level) => {
      level.forEach((item) => {
        callback(item);
      });
    });
  };

  #visitLevelRecursive = (root, level, levels) => {
    if (root === null) {
      return;
    }

    if (levels.length <= level) {
      levels.push([]);
    }

    levels[level].push(root.data);

    this.#visitLevelRecursive(root.left, level + 1, levels);
    this.#visitLevelRecursive(root.right, level + 1, levels);
  };

  inOrderForEach = (callback) => {
    if (!callback || typeof callback !== "function") {
      throw new TypeError("A callback function is required");
    }

    const root = this.root;
    this.#inOrderVisit(root, callback);
  };

  #inOrderVisit = (root, callback) => {
    if (!root) {
      return;
    }

    this.#inOrderVisit(root.left, callback);
    callback(root.data);
    this.#inOrderVisit(root.right, callback);
  };

  preOrderForEach = (callback) => {
    if (!callback || typeof callback !== "function") {
      throw new TypeError("A callback function is required");
    }

    const root = this.root;
    this.#preOrderVisit(root, callback);
  };

  #preOrderVisit = (root, callback) => {
    if (!root) {
      return;
    }

    callback(root.data);
    this.#preOrderVisit(root.left, callback);
    this.#preOrderVisit(root.right, callback);
  };

  postOrderForEach = (callback) => {
    if (!callback || typeof callback !== "function") {
      throw new TypeError("A callback function is required");
    }

    const root = this.root;
    this.#postOrderVisit(root, callback);
  };

  #postOrderVisit = (root, callback) => {
    if (!root) {
      return;
    }

    this.#postOrderVisit(root.left, callback);
    this.#postOrderVisit(root.right, callback);
    callback(root.data);
  };

  height = (value) => {
    const node = this.#findNode(value);
    if (!node) {
      return;
    }
    const height = this.#heightRecursive(node);
    return height;
  };

  #findNode = (value) => {
    let current = this.root;
    while (current) {
      if (current.data === value) {
        return current;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  };

  #heightRecursive = (node) => {
    if (!node) {
      return -1;
    }

    const height = Math.max(
      this.#heightRecursive(node.left),
      this.#heightRecursive(node.right),
    );

    return height + 1;
  };

  depth = (value) => {
    let current = this.root;
    let depth = 0;
    while (current) {
      if (value === current.data) {
        return depth;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      depth++;
    }
  };

  isBalanced = () => {
    const root = this.root;
    if (!root) {
      return true;
    }

    return this.#checkBalacedWithHeight(root) !== -2;
  };

  #checkBalacedWithHeight = (node) => {
    if (!node) {
      return -1;
    }

    const left = this.#checkBalacedWithHeight(node.left);
    if (left === -2) {
      return -2;
    }

    const right = this.#checkBalacedWithHeight(node.right);
    if (right === -2) {
      return -2;
    }

    const diff = Math.abs(left - right);
    if (diff > 1) {
      return -2;
    }

    return 1 + Math.max(left, right);
  };

  rebalance = () => {
    if (this.isBalanced()) {
      return;
    }
    const dataAsArray = [];
    this.inOrderForEach((data) => dataAsArray.push(data));
    this.root = this.#buildTree(dataAsArray);
  };
}

// const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let tree = new Tree(arr);
// console.log(tree.isBalanced());
// tree.insert(7001);
// console.log(tree.isBalanced());
// tree.prettyPrint();
// console.log(tree.height(324));
// console.log(tree.height(9));
