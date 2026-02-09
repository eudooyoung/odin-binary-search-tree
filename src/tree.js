import Node from "./node.js";

export default class Tree {
  root = null;

  constructor(arr) {
    if (!arr) {
      throw new TypeError("Argument is expected");
    }

    if (!Array.isArray(arr)) {
      throw new TypeError("Argumet should be an array");
    }

    this.root = this.#buildTree(this.#filterArray(arr));
  }

  #filterArray = (arr) => {
    const sorted = arr.toSorted((a, b) => a - b);
    const filtered = sorted.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);

    // check filtered arr
    // console.log(filtered);
    return filtered;
  };

  #buildTree = (arr) => {
    const n = arr.length;
    if (n < 1) {
      return null;
    }

    const mid = Math.floor(n / 2);
    const root = new Node(arr[mid]);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid + 1);

    root.left = this.#buildTree(leftArr);
    root.right = this.#buildTree(rightArr);

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
    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      if (current.data === value) {
        return true;
      }
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return false;
  };

  insert = (value) => {
    if (this.includes(value)) {
      return;
    }

    let current = this.root;
    while (current) {
      if (current.data > value && current.left) {
        current = current.left;
      } else if (current.data < value && current.right) {
        current = current.right;
      } else {
        // break the loop when
        // current.data > value && !current.left || current.data > value && !current.right
        break;
      }
    }

    if (current.data > value) {
      current.left = new Node(value);
    } else {
      current.right = new Node(value);
    }
  };

  deleteItem = (value) => {
    if (!this.includes(value)) {
      return;
    }

    this.root = this.#delNode(this.root, value);
  };

  #delNode = (root, value) => {
    if (!root) {
      return null;
    }

    if (root.data > value) {
      root.left = this.#delNode(root.left, value);
    } else if (root.data < value) {
      root.right = this.#delNode(root.right, value);
    } else {
      // Node with 0 or 1 child
      if (!root.left) {
        return root.right;
      }
      if (!root.right) {
        return root.left;
      }

      // Node with 2 children
      const successor = this.#getSuccessor(root);
      root.data = successor.data;
      root.right = this.#delNode(root.right, successor.data);
    }
    return root;
  };

  #getSuccessor = (current) => {
    current = current.right;
    while (current && current.leff) {
      current = current.left;
    }
    return current;
  };

  levelOrderForEachIterative = (callback) => {
    if (!callback || typeof callback !== "function") {
      throw new TypeError("A callback function is required");
    }

    const queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const current = queue.shift();
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
    const levels = [];
    this.#visitLevel(root, 0, levels);

    levels.forEach((level) => {
      level.forEach((item) => {
        callback(item);
      });
    });
  };

  #visitLevel = (root, level, levels) => {
    if (root === null) {
      return;
    }

    if (levels.length <= level) {
      levels.push([]);
    }

    levels[level].push(root.data);

    this.#visitLevel(root.left, level + 1, levels);
    this.#visitLevel(root.right, level + 1, levels);
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

    if (root.left) {
      this.#inOrderVisit(root.left, callback);
    }

    callback(root.data);

    if (root.right) {
      this.#inOrderVisit(root.right, callback);
    }
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
    if (root.left) {
      this.#preOrderVisit(root.left, callback);
    }

    if (root.right) {
      this.#preOrderVisit(root.right, callback);
    }
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

    if (root.left) {
      this.#postOrderVisit(root.left, callback);
    }

    if (root.right) {
      this.#postOrderVisit(root.right, callback);
    }

    callback(root.data);
  };

  height = (value) => {
    if (!this.includes(value)) {
      return;
    }

    const root = this.root;
    const node = this.#findNode(root, value);
    console.log(node);
    // const height = this.#getHeight(node, 0);
    // return height;
  };

  #findNode = (root, value) => {
    const queue = [];
    queue.push(root);
    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr.data === value) {
        return curr;
      }
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
  };

  // #getHeight = (root, height) => {
  //   if (!root.left && !root.right) {
  //     return height;
  //   }

  //   if (root.left) {
  //     return this.#getHeight(root.left, height + 1);
  //   }

  //   if (root.right) {
  //     return this.#getHeight(root.right, height + 1);
  //   }
  // };
}

// const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let tree = new Tree(arr);
// tree.prettyPrint();
// tree.height(5);
