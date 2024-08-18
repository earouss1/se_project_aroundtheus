// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }

  hideInputError(formElement, inputElement, options);
}

function toggleButtonState(
  inputElements,
  submitButtonElement,
  { inactiveButtonClass }
) {
  let hasInvalidInput = false;

  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      hasInvalidInput = true;
    }
  });

  if (hasInvalidInput) {
    submitButtonElement.classList.add(inactiveButtonClass);
    return (submitButtonElement.disabled = true);
  }

  submitButtonElement.classList.remove(inactiveButtonClass);
  submitButtonElement.disabled = false;
}

/*function hasInvalidInput(inputLists) {
  return !inputLists.every((inputElement) => inputElement.validity.valid);
}

function disabledButtonELement(submitButtonElement, options) {
  const { inactiveButtonClass } = options;
  submitButtonElement.classList.add(inactiveButtonClass);
  submitButtonElement.disabled = true;
  return;
}

function enabledButtonELement(submitButtonElement, options) {
  const { inactiveButtonClass } = options;
  submitButtonElement.classList.remove(inactiveButtonClass);
  submitButtonElement.disabled = false;
  return;
}

function toggleButtonState(inputElements, submitButtonElement, options) {
  if (hasInvalidInput) {
    disabledButtonELement(submitButtonElement, options);
  }

  enabledButtonELement(submitButtonElement, options);
}*/

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButtonElement = formElement.querySelector(
    options.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButtonElement, options);
    });
  });
}

function enableValidation(options) {
  const formELements = [...document.querySelectorAll(options.formSelector)];
  formELements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__form-error_visible",
};

enableValidation(settings);
