import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, card }) {
    super({ popupSelector, card });
    this._card = card;
  }

  open() {
    super.open();
    const elementCardClick = this._card.querySelector('.place__image');
    const elementCardPopup = this._element.querySelector('.popup__card-image');
    elementCardPopup.src = elementCardClick.src;
    elementCardPopup.alt = elementCardClick.alt;
    this._element.querySelector('.popup__card-heading').textContent =
    this._card.querySelector('.place__name').textContent;
  }
}
