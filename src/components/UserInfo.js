export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    return {
      profileText: this._profileName.textContent,
      profileSubText: this._profileJob.textContent,
    };
  }

  setUserInfo({ profileText, profileSubText }) {
    this._profileName.textContent = profileText;
    this._profileJob.textContent = profileSubText;
  }
}
