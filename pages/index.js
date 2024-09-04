import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const cardData1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const cardData2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

const cardData3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

const cardData4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

const cardData5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

const cardData6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

const initialCards = [
  cardData1,
  cardData2,
  cardData3,
  cardData4,
  cardData5,
  cardData6,
];

// ELements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddCardModal = document.querySelector("#profile-add-modal");
const profileText = document.querySelector("#profile-text");
const profileSubText = document.querySelector("#profile-sub-text");
const profileInputText = document.querySelector("[name='text']");
const profileInputSubText = document.querySelector("[name='sub-text']");
const profileEditForm = document.forms["modal-form"];
const cardListElement = document.querySelector(".elements__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardForm = document.forms["add-card-modal-form"];
const cardTitleInput = profileAddCardModal.querySelector("#form-profile-title");
const cardUrlInput = profileAddCardModal.querySelector("#form-profile-url");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalImage = previewImageModal.querySelector(
  ".modal__for-preview-image"
);
const previewModalCaption = previewImageModal.querySelector(
  ".modal__for-preview-caption"
);

const allCloseButtons = document.querySelectorAll(".modal__close-button");

// Functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleOverlay);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", handleOverlay);
}

// function renderCard(data, method = "prepend") {
//   const cardElement = getCardElement(data);
//   cardListElement[method](cardElement);
// }

function generateCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(data, method = "prepend") {
  cardListElement[method](generateCard(data));
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileText.textContent = profileInputText.value;
  profileSubText.textContent = profileInputSubText.value;
  closeModal(profileEditModal);
}

function handleAddCardElementSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  evt.target.reset();
  closeModal(profileAddCardModal);
}

function handleImageClick(data) {
  previewModalImage.src = data.link;
  previewModalImage.alt = data.name;
  previewModalCaption.textContent = data.name;
  openModal(previewImageModal);
}

initialCards.forEach((data) => renderCard(data));

// Event Listener

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardElementSubmit);

profileEditButton.addEventListener("click", () => {
  profileInputText.value = profileText.textContent;
  profileInputSubText.value = profileSubText.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () =>
  openModal(profileAddCardModal)
);

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
};

const handleOverlay = (evt) => {
  if (evt.target.classList.contains("modal_opened")) {
    const currentClickModal = evt.target;
    closeModal(currentClickModal);
  }
};

allCloseButtons.forEach((button) => {
  // Find the closest popup only once
  const modal = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(modal));
});

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__form-error_visible",
};

const editFormValidator = new FormValidator(options, profileEditForm);
const addFormValidator = new FormValidator(options, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
