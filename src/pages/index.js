// All Imports

import {
  profileInputText,
  profileInputSubText,
  addNewCardButton,
  profileEditButton,
  options,
  changePictureform,
  changeProfilePic,
  confirmDeleteForm,
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

function handleChangePictureElementSubmit(userdata) {
  const pictureUlr = userdata.picture;
  if (!pictureUlr) {
    console.error("Link is missing");
  }
  changePictureModal.renderLoadingMessage(true);

  api
    .setPictureUpdate(pictureUlr)
    .then((pictureData) => {
      userInfo.setUserPicture(pictureData);
      formValidators["profile-pic-chng"].disableButton();
      changePictureModal.close();
    })
    .catch((error) => {
      console.error(
        `An error happened when updating user information: ${error}`
      );
    })
    .finally(() => {
      changePictureModal.renderLoadingMessage();
    });
}

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

// Instantiated ModalWithConfirmDelete class
const confirmDeleteModal = new ModalWithConfirmDelete(
  "#chng-img-qt-modal",
  handleCardDeleteClick
);
confirmDeleteModal.setEventListeners();

// Adding Functionality and API to the class Instance

function handleImageClick(data) {
  imagePreviewModal.open(data);
}

function handleAddCardElementSubmit({ title, url }) {
  const data = { name: title, link: url };
  addCardModal.renderLoadingMessage(true);
  api
    .createNewCard(data)
    .then((cardCreated) => {
      cardsSection.addItem(generateCard(cardCreated));
      addCardModal.close();
      //addFormValidator.disableButton();
      formValidators["add-cards"].disableButton();
    })
    .catch((error) => {
      console.error("Error occured while adding card", error);
    })
    .finally(() => {
      addCardModal.renderLoadingMessage();
    });

  // cardsSection.addItem(generateCard(data));
  // addCardModal.close();
  // //addFormValidator.disableButton();
  // formValidators["add-cards"].disableButton();
}

function handleProfileEditElementSubmit(userdata) {
  userInfo.setUserInfo({
    profileText: userdata.text,
    profileSubText: userdata["sub-text"],
  });
  editProfileModal.renderLoadingMessage(true);

  api
    .setUserUpdate(userdata)
    .then((newData) => {
      userInfo.setUserInfo(newData.userdata);

      editProfileModal.close();
      formValidators["edit-profile"].disableButton();
    })
    .catch((error) => {
      console.error("Error has occured", error);
    })
    .finally(() => {
      editProfileModal.renderLoadingMessage();
    });
}

function handleCardDeleteClick(card) {
  confirmDeleteModal.handleRemoveVerify(() => {
    confirmDeleteModal.renderLoading(true);
    api
      .deleteCards(card._id)
      .then(() => {
        card.handleDeleteCard();
        confirmDeleteModal.close();
      })
      .catch((error) => {
        console.error("Error occured while deleting card", error);
      })
      .finally(() => {
        confirmDeleteModal.renderLoading();
      });
  });
}

function handleCardLikeClick(card) {
  if (!card.getIsLike()) {
    api
      .addLikeforCard(card.getId())
      .then(() => {
        card.handleLikeButton();
      })
      .catch((error) => {
        console.error(`Can't add like. Please check again: ${error}`);
      });
  } else {
    api
      .removeLikefromCard(card.getId())
      .then(() => {
        card.handleLikeButton();
      })
      .catch((error) => {
        console.error(`Can't remove like. Check again: ${error}`);
      });
  }
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
  .loadAllData()
  .then(([cards, userData]) => {
    cardsSection.renderItems(cards);
    userInfo.setUserInfo(userData);
    userInfo.setUserPicture(userData);
  })
  .catch((error) => {
    // console.error(`Error: Need a picture: ${error}`);
  });
