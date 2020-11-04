export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      'about-self': this._job.textContent,
    }
  }

  setUserInfo({ name, 'about-self': job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
