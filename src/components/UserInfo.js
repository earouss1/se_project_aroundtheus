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
      avatar: this._profilePicture.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    //this.setUserPicture(avatar);
  }

  setUserPicture({ avatar }) {
    this._profilePicture.src = avatar;
  }
}
