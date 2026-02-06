import Node from "./node.js";

describe("Node test", () => {
  it("class defined", () => {
    expect(Node).toBeDefined();
  });

  it("constructor argument", () => {
    expect(() => new Node()).toThrow(TypeError);
    expect(() => new Node("abc")).toThrow(TypeError);
  });

  it("initial state", () => {
    const node = new Node(0);
    expect(node).toHaveProperty("data", 0);
    expect(node).toHaveProperty("left", null);
    expect(node).toHaveProperty("right", null);
  });
});
