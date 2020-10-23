import {keyEscape} from '../utils/constants.js';

export default class Popup {
  constructor ({ popupSelector }) {
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add('popup_opened');
    if (this._element.querySelector('.popup__button')) {
      this._element.querySelector('.popup__button').classList.add('popup__button_disabled');
    }
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === keyEscape) {
      this.close();
    }
  }

  //закрытие форм при клике на оверлей
  _clickOnPopupOverlay(evt) {
    if (evt.target == evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._element.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this._element.addEventListener('click', this._clickOnPopupOverlay.bind(this));
  }
}
