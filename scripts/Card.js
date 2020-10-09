import {togglePopup, cardElementFormPopup} from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true)
      .children[0];

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
    this._element.querySelector('.place__delete').addEventListener('click', () => {
      this._delHandler();
    });
    this._element.querySelector('.place__icon').addEventListener('click', () => {
      this._likeHandler();
    });
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._cardPopupHandler();
    });
  }

  // удаление карточки
  _delHandler() {
    this._element.remove();
  }

  // установка-сброс лайка с карточки
  _likeHandler() {
    this._element.querySelector('.place__icon').classList.toggle('place__icon_is-active');
  }

  //открытие попап формы с карточкой
  _cardPopupHandler() {
    const elementCardClick = this._element.querySelector('.place__image');
    const elementCardPopup = cardElementFormPopup.querySelector('.popup__card-image');
    elementCardPopup.src = elementCardClick.src;
    elementCardPopup.alt = elementCardClick.alt;
    cardElementFormPopup.querySelector('.popup__card-heading').textContent =
      this._element.querySelector('.place__name').textContent;

    togglePopup(cardElementFormPopup);
  }
}
