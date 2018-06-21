class DataTransfer {
  constructor(options = {}) {
    Object.assign(this, options);
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
