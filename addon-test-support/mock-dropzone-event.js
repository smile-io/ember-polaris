class DataTransfer {
  constructor(options) {
    this.setProperties(options);
  }

  setProperties(props) {
    for (let prop in props) {
      this[prop] = props[prop];
    }

    return this;
  }
}

export default class MockEvent {
  constructor(options = {}) {
    this.dataTransfer = new DataTransfer(options.dataTransfer);
    this.originalEvent = this;
  }

  preventDefault() {}
  stopPropagation() {}
}
