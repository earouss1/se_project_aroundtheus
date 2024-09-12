export default class UserInfo {
  constructor({ profileName, jobName }) {
    this._profileName = document.querySelector(profileName);
    this._jobName = document.querySelector(jobName);
  }

  getUserInfo() {
    return {
      profileText: this._profileName.textContent,
      profileSubText: this._jobName.textContent,
    };
  }

  setUserInfo({ profileText, profileSubText }) {
    this._profileName.textContent = profileText;
    this._jobName.textContent = profileSubText;
  }
}
