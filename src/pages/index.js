// All Imports

import {
  initialCards,
  profileEditForm,
  profileInputText,
  profileInputSubText,
  addNewCardButton,
  profileEditButton,
  addCardForm,
  options,
} from "../utils/constants.js";

import ModalWithImages from "../components/ModalWithImages.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import ModalWithForms from "../components/ModalWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

// Passing Functionality for Card

function generateCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardsSection.addItem(generateCard(data));
    },
  },
  ".elements__list"
);
cardsSection.renderItems();

// Instantiated FormValidator class
const editFormValidator = new FormValidator(options, profileEditForm);
const addFormValidator = new FormValidator(options, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Instantiated UserInfo class
const userInfo = new UserInfo({
  profileName: "#profile-text",
  profileJob: "#profile-sub-text",
});

// Instantiated ModalWithForm class
const addCardModal = new ModalWithForms(
  "#profile-add-modal",
  handleAddCardElementSubmit
);
addCardModal.setEventListeners();

const editProfileModal = new ModalWithForms(
  "#profile-edit-modal",
  handleProfileEditElementSubmit
);
editProfileModal.setEventListeners();

// Instantiated ModalWithImage class
const imagePreviewModal = new ModalWithImages({
  modalSelector: "#preview-image-modal",
});
imagePreviewModal.setEventListeners();

// Adding Functionality to the class Instance
function handleImageClick(data) {
  imagePreviewModal.open(data);
}

function handleAddCardElementSubmit({ title, url }) {
  const data = { name: title, link: url };
  cardsSection.addItem(generateCard(data));
  addCardModal.close();
  addFormValidator.disableButton();
}

function handleProfileEditElementSubmit(userdata) {
  userInfo.setUserInfo({
    profileText: userdata.text,
    profileSubText: userdata["sub-text"],
  });
  editProfileModal.close();
}

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileInputText.value = currentUserInfo.profileText;
  profileInputSubText.value = currentUserInfo.profileSubText;
  editProfileModal.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});
