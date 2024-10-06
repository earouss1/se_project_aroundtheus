// All Imports

import {
  initialCards,
  profileInputText,
  profileInputSubText,
  addNewCardButton,
  profileEditButton,
  options,
  changePictureform,
  changeProfilePic,
  areYouSureForm,
  profilePictureChngBtn,
} from "../utils/constants.js";

import ModalWithImages from "../components/ModalWithImages.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import ModalWithForms from "../components/ModalWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import APi from "../components/Api.js";
import ModalWithConfirmDelete from "../components/ModalAreYouSure.js";

// API set-up

const api = new APi({
  baseUrl: " https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "85fd4e98-2985-4ae5-a23e-063a04cf6983",
    "Content-Type": "application/json",
  },
});

// Passing Functionality for Card

function generateCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleCardDeleteClick,
    handleCardLikeClick
  );
  return card.getView();
}

const cardsSection = new Section(
  {
    //items: initialCards,
    renderer: (data) => {
      cardsSection.addItem(generateCard(data));
    },
  },
  ".elements__list"
);

// Instantiated FormValidator class
const formValidators = {};

const enableValidation = (options) => {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    const validator = new FormValidator(options, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(options);

// Instantiated UserInfo class
const userInfo = new UserInfo({
  profileName: "#profile-text",
  profileJob: "#profile-sub-text",
  pictureSelector: ".profile__avatar",
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

const changePictureModal = new ModalWithForms(
  "#profile-chng-modal",
  handleChangePictureElementSubmit
);
changePictureModal.setEventListeners();

// Instantiated ModalWithImage class
const imagePreviewModal = new ModalWithImages({
  modalSelector: "#preview-image-modal",
});
imagePreviewModal.setEventListeners();

// Adding Functionality to the class Instance

function handleChangePictureElementSubmit({ link }) {}

function handleImageClick(data) {
  imagePreviewModal.open(data);
}

function handleAddCardElementSubmit({ title, url }) {
  const data = { name: title, link: url };
  cardsSection.addItem(generateCard(data));
  addCardModal.close();
  //addFormValidator.disableButton();
  formValidators["add-cards"].disableButton();
}

function handleProfileEditElementSubmit(userdata) {
  userInfo.setUserInfo({
    profileText: userdata.text,
    profileSubText: userdata["sub-text"],
  });
  editProfileModal.close();
  formValidators["edit-profile"].disableButton();
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

profilePictureChngBtn.addEventListener("click", () => {
  changePictureModal.open();
});

// Get CArd and Profile modal
api
 .loadAllData().then(([cards, userData]) => {
  cardsSection.renderItems(cards);
  userInfo.setUserInfo(userData);
  userInfo.getUserInfo(userData);
});
 .catch((error) => {
   console.error("Error Loading", error);
});

//function handleImageClick(data) {
//imagePreviewModal.open(data);
//}

//
