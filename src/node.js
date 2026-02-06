export default class Node {
  data;
  left = null;
  right = null;

  constructor(data) {
    if (data !== 0 && !data) {
      throw new TypeError("Argument is missing");
    }

    if (typeof data !== "number") {
      throw new TypeError("Type of first argument is explicitly to be number");
    }

    this.data = data;
  }
}
