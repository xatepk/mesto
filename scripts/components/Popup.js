export default class Popup {
  constructor (popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  open() {
    this._element.classList.add('popup_opened');
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

  setEventListeners() {
    this._element.querySelector('.popup__close').addEventListener('click', this._close);
  }
}
