export default class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._options.inputSelector),
    ];
    this._submitButtonElement = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(
          this._inputElements,
          this._submitButtonElement,
          this._options
        );
      });
    });
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._options.inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._options.errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._options.inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._options.errorClass);
  }

  _toggleButtonState() {
    let hasInvalidInput = false;

    this._inputElements.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        hasInvalidInput = true;
      }
    });

    if (hasInvalidInput) {
      this._submitButtonElement.classList.add(
        this._options.inactiveButtonClass
      );
      return (this._submitButtonElement.disabled = true);
    }

    this._submitButtonElement.classList.remove(
      this._options.inactiveButtonClass
    );
    this._submitButtonElement.disabled = false;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
