import Tree from "./tree.js";

export default class Main {
  static arr = [];
  static tree = null;

  static createRandomArray = (size) => {
    this.arr = new Array(size);
    for (let i = 0; i < size; i++) {
      this.arr[i] = Math.floor(Math.random() * 100);
    }
  };

  static buildTree = () => {
    this.tree = new Tree(this.arr);
  };
}

// Main.createRandomArray(16);
// console.log(Main.arr);
// Main.buildTree();
// Main.tree.prettyPrint();
// console.log("---level order---");
// Main.tree.levelOrderForEachRecursive(console.log);
// console.log("---pre order---");
// Main.tree.preOrderForEach(console.log);
// console.log("---post order---");
// Main.tree.postOrderForEach(console.log);
// console.log("---in order---");
// Main.tree.inOrderForEach(console.log);
// Main.tree.insert(210);
// Main.tree.insert(250);
// Main.tree.insert(710);
// Main.tree.insert(1210);
// Main.tree.rebalance();
// Main.tree.prettyPrint();
// console.log("---level order---");
// Main.tree.levelOrderForEachRecursive(console.log);
// console.log("---pre order---");
// Main.tree.preOrderForEach(console.log);
// console.log("---post order---");
// Main.tree.postOrderForEach(console.log);
// console.log("---in order---");
// Main.tree.inOrderForEach(console.log);
