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

export const initialCards = [
  cardData1,
  cardData2,
  cardData3,
  cardData4,
  cardData5,
  cardData6,
];

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileAddCardModal = document.querySelector("#profile-add-modal");
export const profileText = document.querySelector("#profile-text");
export const profileSubText = document.querySelector("#profile-sub-text");
export const profileInputText = document.querySelector("[name='text']");
export const profileInputSubText = document.querySelector("[name='sub-text']");
export const profileEditForm = document.forms["modal-form"];
export const cardListElement = document.querySelector(".elements__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const addNewCardButton = document.querySelector("#profile-add-button");
export const addCardForm = document.forms["add-card-modal-form"];
export const cardTitleInput = profileAddCardModal.querySelector(
  "#form-profile-title"
);
export const cardUrlInput =
  profileAddCardModal.querySelector("#form-profile-url");
export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewModalImage = previewImageModal.querySelector(
  ".modal__for-preview-image"
);
export const previewModalCaption = previewImageModal.querySelector(
  ".modal__for-preview-caption"
);

export const allCloseButtons = document.querySelectorAll(
  ".modal__close-button"
);

export const changePictureform = document.forms["chng-picture-modal-form"];
export const confirmDeleteForm = document.forms["areusure-modal-form"];
export const changeProfilePic = document.querySelector(".profile__avatar");
export const profilePictureChngBtn = document.querySelector(
  "#profile-avatar-edit"
);

export const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__form-error_visible",
};
