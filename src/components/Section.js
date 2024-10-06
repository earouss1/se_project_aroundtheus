export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    const itemsToRender = items || this._items;

    itemsToRender.forEach((item) => {
      this._renderer(item);
    });
    //this.empty();
  }

  addItem(element) {
    this._container.prepend(element);
  }

  empty() {
    this._container.innerHTML = "";
  }
}
