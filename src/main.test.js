import Main from "./main.js";
import Tree from "./tree.js";

describe("main test", () => {
  beforeEach(() => {
    Main.createRandomArray(16);
    Main.buildTree();
  });

  it("create random numbers array", () => {
    expect(Main.arr.length).toBe(16);
    Main.arr.forEach((number) => {
      expect(number).toBeLessThan(100);
    });
  });

  it("init tree", () => {
    expect(Main.tree).toBeInstanceOf(Tree);
    expect(Main.tree.isBalanced()).toBe(true);
  });

  it("insert numbers to tree", () => {
    Main.tree.insert(210);
    Main.tree.insert(250);
    Main.tree.insert(710);
    Main.tree.insert(1210);
    expect(Main.tree.isBalanced()).toBe(false);
    Main.tree.rebalance();
    expect(Main.tree.isBalanced()).toBe(true);
  });
});
