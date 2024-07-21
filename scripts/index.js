const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ELements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddCardModal = document.querySelector("#profile-add-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileText = document.querySelector("#profile-text");
const profileSubText = document.querySelector("#profile-sub-text");
const profileInputText = document.querySelector("[name='text']");
const profileInputSubText = document.querySelector("[name='sub-text']");
const profileEditForm = profileEditModal.querySelector("#modal-form");
const cardListElement = document.querySelector(".elements__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModalCloseButton = profileAddCardModal.querySelector(
  "#modal-close-button"
);
const addCardForm = profileAddCardModal.querySelector("#add-card-modal-form");
const cardTitleInput = profileAddCardModal.querySelector("#form-profile-title");
const cardUrlInput = profileAddCardModal.querySelector("#form-profile-url");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalImage = previewImageModal.querySelector(
  ".modal__for-preview-image"
);
const previewModalCaption = previewImageModal.querySelector(
  ".modal__for-preview-caption"
);
const previewCloseButton = previewImageModal.querySelector(
  ".modal__for-preview-btn"
);

// Functions

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardListElement.prepend(cardElement);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileText.textContent = profileInputText.value;
  profileSubText.textContent = profileInputSubText.value;
  closePopup(profileEditModal);
}

function handleAddCardElementSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  closePopup(profileAddCardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".element__image");
  const cardTitleElement = cardElement.querySelector(
    ".element__composite-title"
  );
  const likeButton = cardElement.querySelector(
    ".element__composite-like-button"
  );
  const deleteButton = cardElement.querySelector(".element__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__composite-like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewModalImage.src = data.link;
    openModal(previewImageModal);
    previewModalCaption.textContent = data.name;
  });
  previewCloseButton.addEventListener("click", () => {
    closePopup(previewImageModal);
  });

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardTitleElement.alt = data.name;
  return cardElement;
}

// Event Listener

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardElementSubmit);

profileEditButton.addEventListener("click", () => {
  profileInputText.value = profileText.textContent;
  profileInputSubText.value = profileSubText.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

addNewCardButton.addEventListener("click", () =>
  openModal(profileAddCardModal)
);

addCardModalCloseButton.addEventListener("click", () =>
  closePopup(profileAddCardModal)
);

// Loops

initialCards.forEach((data) => renderCard(data));
