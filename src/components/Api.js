export default class APi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;
    const options = { headers: this._headers };
    return this._request(url, options);
  }

  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;
    const options = { headers: this._headers };
    return this._request(url, options);
  }

  loadAllData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  createNewCard({ name, link }) {
    const url = `${this._baseUrl}/cards`;
    const options = {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    };
    return this._request(url, options);
  }

  setUserUpdate({ profileText, profileSubText }) {
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profileText,
        about: profileSubText,
      }),
    };
    return this._request(url, options);
  }

  deleteCards(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    const options = {
      method: "DELETE",
      headers: this._headers,
    };
    return this._request(url, options);
  }

  addLikeforCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    const options = {
      method: "PUT",
      headers: this._headers,
    };
    return this._request(url, options);
  }

  removeLikefromCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    const options = {
      method: "DELETE",
      headers: this._headers,
    };
    return this._request(url, options);
  }

  setPictureUpdate({ pictureUrl }) {
    const url = `${this._baseUrl}/users/me/avatar`;
    const options = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: pictureUrl,
      }),
    };
    return this._request(url, options);
  }
}
