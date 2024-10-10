import Modal from "./Modal";

export default class ModalWithConfirmDelete extends Modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
    this._modalSubmitButton = this._modalElement.querySelector(
      ".modal__submit-button"
    );
    this._modalSubmitButtonText = this._modalSubmitButton.textContent;
    this._modalForm = this._modalElement.querySelector(".modal__form");
  }

  renderLoading(isLoading, loadingMessage = "Deleting...") {
    if (isLoading) {
      return (this._modalSubmitButton.textContent = loadingMessage);
    }
    this._modalSubmitButton.textContent = this._modalSubmitButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleRemoveVerify();
    });
  }

  handleRemoveVerify(recall) {
    this._handleRemoveVerify = recall;
  }
}
