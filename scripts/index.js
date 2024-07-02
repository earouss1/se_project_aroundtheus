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
const profileExitButton = document.querySelector("#modal-close-button");
const profileText = document.querySelector("#profile-text");
const profileSubText = document.querySelector("#profile-sub-text");
const profileInputText = document.querySelector("#form-profile-text");
const profileInputSubText = document.querySelector("#form-profile-sub-text");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".elements__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions

function closePoppup() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileEditform() {
  profileInputText.value = profileText.textContent;
  profileInputSubText.value = profileSubText.textContent;
  profileEditModal.classList.add("modal_opened");
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileText.textContent = profileInputText.value;
  profileSubText.textContent = profileInputSubText.value;
  closePoppup();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".element__image");
  const cardTitleElement = cardElement.querySelector(
    ".element__composite-title"
  );
  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardTitleElement.alt = data.name;
  return cardElement;
}

// Event Listener

profileEditButton.addEventListener("click", handleProfileEditform);

profileExitButton.addEventListener("click", closePoppup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Loops

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListElement.append(cardElement);
});

/*for (let i = 0; i < initialCards.length; i++) {
  const data = initialCards[i];

  const cardElement = cardTemplate.cloneNode(true);

  const cardImageElement = cardElement.querySelector(".element__image");
  const cardTitleElement = cardElement.querySelector(
    ".element__composite-title"
  );

  cardListElement.prepend(cardElement);

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardTitleElement.alt = data.name;
}*/
