export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCardClick,
    handleLikeCardClick
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._id = data._id;
    this._isLiked = data._isLiked;
    this._handleLikeCardClick = handleLikeCardClick;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeCardClick(this);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCardClick(this);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getId() {
    return this._id;
  }

  getIsliked() {
    return this._isLiked;
  }

  _handleDeleteButton() {
    this._cardElement.remove(this._cardElement);
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle(
      "element__composite-like-button_active"
    );
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  getView() {
    this._cardElement = this._getCardTemplate();
    this._cardImageElement = this._cardElement.querySelector(".element__image");
    this._cardTitleElement = this._cardElement.querySelector(
      ".element__composite-title"
    );
    this._cardDeleteButton = this._cardElement.querySelector(
      ".element__delete-button"
    );
    this._cardLikeButton = this._cardElement.querySelector(
      ".element__composite-like-button"
    );

    this._cardTitleElement.textContent = this._data.name;
    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;

    if (this._isLiked) {
      this._cardLikeButton.classList.add(
        "element__composite-like-button_active"
      );
    } else {
      this._cardLikeButton.classList.remove(
        "element__composite-like-button_active"
      );
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
