export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".element__composite-like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _handleDeleteButton() {
    this._cardElement.remove(".element");
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".element__composite-like-button")
      .classList.toggle("element__composite-like-button_active");
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

    this._cardTitleElement.textContent = this._data.name;
    this._cardImageElement.src = this._data.link;
    this._cardTitleElement.alt = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
