import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._elementCardPopup = this._element.querySelector('.popup__card-image');
    this._elementCardHeading = this._element.querySelector('.popup__card-heading');
  }
  open({name, link}) {
    super.open();
    this._elementCardPopup.src = link;
    this._elementCardPopup.alt = name;
    this._elementCardHeading.textContent = name
  }
}
