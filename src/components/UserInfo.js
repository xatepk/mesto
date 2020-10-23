import {nameInputEdit, jobInputEdit} from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    nameInputEdit.value = this._name.textContent;
    jobInputEdit.value = this._job.textContent;
    return {
      name: this._name.textContent,
      'about-self': this._job.textContent,
    }
  }

  setUserInfo({ name, 'about-self': job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
