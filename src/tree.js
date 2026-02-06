class Tree {
  root;
  arr;

  constructor(arr) {
    if (!arr) {
      throw new TypeError("An array is required as an argument");
    }

    this.arr = arr;
  }

  buildTree(arr) {}
}

export default Tree;
