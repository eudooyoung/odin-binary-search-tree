import Node from "./node.js";

describe("node class test", () => {
  it("class defined", () => {
    expect(Node).toBeDefined();
  });

  it("constructor requirement", () => {
    expect(() => new Node()).toThrow(TypeError);
    let data = 0;
    expect(() => new Node(data)).not.toThrow(TypeError);
  });

  it("instance properties", () => {
    let node = new Node(0);
    expect(node).toBeInstanceOf(Node);
    expect(node).toHaveProperty("data");
    expect(node).toHaveProperty("left");
    expect(node).toHaveProperty("right");
  });

  it("instance's initial state", () => {
    let data = 0;
    let node = new Node(data);
    expect(node.data).toBe(data);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  it("data type", () => {
    expect(() => new Node("a")).toThrow(TypeError);
  });
});
