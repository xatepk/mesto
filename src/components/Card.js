export default class Card {
  constructor({ item, id, handleCardClick, handleCardDelete, handleCardLike }, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._id = id;
    this._owner = item.owner._id;
    this._likes = item.likes && item.likes.length || 0;
    this._likesArr = item.likes || [];
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    this._element.querySelector('.place__likes-count').textContent = this._likes;
    if (this._id == this._owner) {
      this._element.querySelector('.place__delete').classList.add('place__delete_visible');
    }
    const arrLikes = this._likesArr.map(({ _id }) => _id)
    if (arrLikes.includes(this._id)) {
      this._element.querySelector('.place__icon').classList.add('place__icon_is-active');
    }

    // установка обработчиков событий для карточек
    this._setEventListeners();

  	return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.place__delete').addEventListener('click', () => {
      // this._delHandler();
      this._handleCardDelete();
    });
    this._element.querySelector('.place__icon').addEventListener('click', (evt) => {
      // this._likeHandler(evt);
      this._handleCardLike(evt);
    });
    this._placeImage.addEventListener('click', () => {
      this._handleCardClick(this._element);
    });
  }

  // удаление карточки
  // _delHandler() {
  //   this._element.remove();
  // }

  // установка-сброс лайка с карточки
  _likeHandler(evt) {
    evt.target.classList.toggle('place__icon_is-active');
  }

  //установка нового значения о количетве лайках
   upgrateCardLikes(likes) {
    this._element.querySelector('.place__likes-count').textContent = likes;
   }
}
