import Tree from "./tree.js";

describe("tree class test", () => {
  it("class defined", () => {
    expect(Tree).toBeDefined();
  });

  it("constructor requirement", () => {
    expect(() => new Tree()).toThrow(TypeError);

    let arr = [];
    expect(() => new Tree(arr)).not.toThrow(TypeError);
  });

  it("instance properties", () => {
    let arr = [];
    const tree = new Tree(arr);

    expect(tree).toHaveProperty("root");
    expect(tree).toHaveProperty("arr");
  });

  it("buildTree function", () => {
    const tree = new Tree([]);
    const buildTree = tree.buildTree;

    expect(buildTree).toBeDefined();
    expect(typeof buildTree).toBe("function");
  });
});
