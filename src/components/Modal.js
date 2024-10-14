export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._handleCloseButtons = this._modalElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    //console.log("close");
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._modalElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
    });

    this._handleCloseButtons.addEventListener("click", () => this.close());
  }
}
