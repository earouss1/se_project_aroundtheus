import Modal from "./Modal.js";

export default class ModalWithImages extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._image = this._modalElement.querySelector(".modal__for-preview-image");
    this._caption = this._modalElement.querySelector(
      ".modal__for-preview-caption"
    );
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
