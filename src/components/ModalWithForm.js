import Modal from "./Modal.js";

export default class ModalWithForms extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._modalForm.querySelectorAll(".modal__form-input");
    this._modalSubmitButton = this._modalElement.querySelector(
      ".modal__submit-button"
    );
    this._modalSubmitButtonText = this._modalSubmitButton.textContent;
  }

  renderLoadingMessage(isLoading, loadingMessage = "Saving...") {
    if (isLoading) {
      return (this._modalSubmitButton.textContent = loadingMessage);
    }
    this._modalSubmitButton.textContent = this._modalSubmitButtonText;
  }

  getForm() {
    return this._modalForm;
  }

  _getInputValues() {
    const formInputValues = {};
    this._inputList.forEach((input) => {
      formInputValues[input.name] = input.value;
    });
    return formInputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._modalForm.reset();
      this.close();
    });
  }
}
