import {togglePopup, cardElementFormPopup} from './index.js';

export default class Card {
  constructor(link, name, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const placeImage = this._element.querySelector('.place__image');
    placeImage.src = this._link;
    placeImage.alt = this._name;
  	this._element.querySelector('.place__name').textContent = this._name;

    // установка обработчиков событий для карточек
    this._setEventListeners();

  	return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.place__delete').addEventListener('click', (evt) => {
      this._delHandler(evt);
    });
    this._element.querySelector('.place__icon').addEventListener('click', (evt) => {
      this._likeHandler(evt);
    });
    this._element.querySelector('.place__image').addEventListener('click', (evt) => {
      this._cardPopupHandler(evt);
    });
  }

  // удаление карточки
  _delHandler(evt) {
    evt.target.parentNode.remove();
  }

  // установка-сброс лайка с карточки
  _likeHandler(evt) {
    evt.target.classList.toggle('place__icon_is-active');
  }

  //открытие попап формы с карточкой
  _cardPopupHandler(evt) {
    const elementCardClick = evt.target.parentNode.querySelector('.place__image');
    const elementCardPopup = cardElementFormPopup.querySelector('.popup__card-image');
    elementCardPopup.src = elementCardClick.src;
    elementCardPopup.alt = elementCardClick.alt;
    cardElementFormPopup.querySelector('.popup__card-heading').textContent = evt.target.parentNode.querySelector('.place__name').textContent;

    togglePopup(cardElementFormPopup);
  }
}
