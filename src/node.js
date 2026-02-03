class Node {
  data;
  left;
  right;

  constructor(data, left = null, right = null) {
    if (data !== 0 && !data) {
      throw new TypeError("Required argument is missing");
    }

    if (typeof data !== "number") {
      throw new TypeError("Type of data is explicitly to be number");
    }

    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export default Node;
