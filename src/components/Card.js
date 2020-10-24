export default class Card {
  constructor({ item, handleCardClick }, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._handleCardClick = handleCardClick;
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
    this._placeImage = this._element.querySelector('.place__image');
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
  	this._element.querySelector('.place__name').textContent = this._name;

    // установка обработчиков событий для карточек
    this._setEventListeners();

  	return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.place__delete').addEventListener('click', () => {
      this._delHandler();
    });
    this._element.querySelector('.place__icon').addEventListener('click', (evt) => {
      this._likeHandler(evt);
    });
    this._placeImage.addEventListener('click', () => {
      this._handleCardClick(this._element);
    });
  }

  // удаление карточки
  _delHandler() {
    this._element.remove();
  }

  // установка-сброс лайка с карточки
  _likeHandler(evt) {
    evt.target.classList.toggle('place__icon_is-active');
  }
}
