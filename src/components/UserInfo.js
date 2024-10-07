export default class UserInfo {
  constructor({ profileName, profileJob, profilePicture }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profilePicture = document.querySelector(profilePicture);
  }

  getUserInfo() {
    return {
      profileText: this._profileName.textContent,
      profileSubText: this._profileJob.textContent,
      picture: this._profilePicture.src,
    };
  }

  setUserInfo({ profileText, profileSubText, picture }) {
    this._profileName.textContent = profileText;
    this._profileJob.textContent = profileSubText;
    this.setUserPicture(picture);
  }

  setUserPicture({ picture }) {
    this._profilePicture.src = picture;
  }
}
