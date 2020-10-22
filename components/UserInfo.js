import {userName, aboutSelf, nameInputEdit, jobInputEdit} from '../utils/constants.js';

export default class UserInfo {
  constructor({ name, 'about-self': job}) {
    this._name = name;
    this._job = job;

  }

  getUserInfo() {
    nameInputEdit.value = this._name;
    jobInputEdit.value = this._job;
  }

  setUserInfo() {
    userName.textContent = this._name;
    aboutSelf.textContent = this._job;
  }
}
