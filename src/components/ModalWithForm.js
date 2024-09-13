import Modal from "./Modal.js";

export default class ModalWithForms extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._modalForm.querySelectorAll(".modal__form-input");
    const formInputValues = {};

    inputList.forEach((input) => {
      formInputValues[input.name] = input.value;
    });
    return formInputValues;
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
