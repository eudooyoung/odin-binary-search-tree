import Tree from "./tree.js";

describe("Tree test", () => {
  let tree;
  const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

  beforeEach(() => {
    tree = new Tree(arr);
  });

  it("class defined", () => {
    expect(Tree).toBeDefined();
  });

  it("constructor requirement", () => {
    expect(() => new Tree("abc")).toThrow(TypeError);
  });

  it("root", () => {
    expect(tree.root.data).toBe(8);
  });

  it.only("includes function", () => {
    expect(tree.includes(1)).toBe(true);
    expect(tree.includes(2)).toBe(false);
    expect(tree.includes(3)).toBe(true);
    expect(tree.includes(6)).toBe(false);
  });

  it("insert function", () => {
    tree.insert(6);
    expect(tree.includes(6)).toBe(true);
    tree.insert(10);
    expect(tree.includes(10)).toBe(true);
  });

  it("deleteItem function", () => {
    tree.deleteItem(1);
    expect(tree.includes(1)).toBe(false);
    tree.deleteItem(7);
    expect(tree.includes(7)).toBe(false);
    tree.deleteItem(-1);
    expect(tree.includes(-1)).toBe(false);
  });

  it("levelOrderForEach function", () => {
    let arr = [];
    const callback = (data) => arr.push(data);
    tree.levelOrderForEachIterative(callback);
    expect(arr).toEqual([8, 4, 67, 3, 7, 23, 6345, 1, 5, 9, 324]);

    expect(() => tree.levelOrderForEachIterataive()).toThrow(TypeError);
  });

  it("levelOrderForEachRecurive function", () => {
    let arr = [];
    const callback = (data) => arr.push(data);
    tree.levelOrderForEachRecursive(callback);
    expect(arr).toEqual([8, 4, 67, 3, 7, 23, 6345, 1, 5, 9, 324]);

    expect(() => tree.levelOrderForEachRecursive()).toThrow(TypeError);
  });

  it("inOrderForEach function", () => {
    let arr = [];
    const callback = (data) => arr.push(data);
    tree.inOrderForEach(callback);
    expect(arr).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);

    expect(() => tree.inOrderForEach()).toThrow(TypeError);
  });

  it("preOrderForEach function", () => {
    let arr = [];
    const callback = (data) => arr.push(data);
    tree.preOrderForEach(callback);
    expect(arr).toEqual([8, 4, 3, 1, 7, 5, 67, 23, 9, 6345, 324]);

    expect(() => tree.preOrderForEach()).toThrow(TypeError);
  });

  it("postOrderForEach function", () => {
    let arr = [];
    const callback = (data) => arr.push(data);
    tree.postOrderForEach(callback);
    expect(arr).toEqual([1, 3, 5, 7, 4, 9, 23, 324, 6345, 67, 8]);

    expect(() => tree.preOrderForEach()).toThrow(TypeError);
  });

  it("height function", () => {
    expect(tree.height(-1)).toBeUndefined();
    expect(tree.height(1)).toBe(0);
    expect(tree.height(3)).toBe(1);
    expect(tree.height(4)).toBe(2);
    expect(tree.height(5)).toBe(0);
    expect(tree.height(7)).toBe(1);
    expect(tree.height(8)).toBe(3);
    expect(tree.height(324)).toBe(0);
    expect(tree.height(9)).toBe(0);
    expect(tree.height(23)).toBe(1);
    expect(tree.height(6345)).toBe(1);
    expect(tree.height(67)).toBe(2);
  });

  it("depth function", () => {
    expect(tree.depth(-1)).toBeUndefined();
    expect(tree.depth(8)).toBe(0);
    expect(tree.depth(4)).toBe(1);
    expect(tree.depth(67)).toBe(1);
    expect(tree.depth(3)).toBe(2);
    expect(tree.depth(7)).toBe(2);
    expect(tree.depth(23)).toBe(2);
    expect(tree.depth(6345)).toBe(2);
    expect(tree.depth(1)).toBe(3);
    expect(tree.depth(5)).toBe(3);
    expect(tree.depth(9)).toBe(3);
    expect(tree.depth(324)).toBe(3);
  });
});
