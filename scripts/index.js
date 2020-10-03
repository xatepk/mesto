//объявление глобальных переменных
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const aboutSelf = profile.querySelector('.profile__about-self');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const popup = document.querySelectorAll('.popup');
const profileFormPopup = document.querySelector('.popup_el_edit');
const profileFormElement = profileFormPopup.querySelector('.popup__form');
const nameInputEdit = profileFormPopup.querySelector('.popup__item_el_name');
const jobInputEdit = profileFormPopup.querySelector('.popup__item_el_about-self');
const closeButtonEdit = profileFormPopup.querySelector('.popup__close');
const submitButtonEdit = profileFormPopup.querySelector('.popup__button');

const cardFormPopup = document.querySelector('.popup_el_add');
const cardFormElement = cardFormPopup.querySelector('.popup__form');
const popupImageName = cardFormPopup.querySelector('.popup__item_el_name');
const popupImageUrl = cardFormPopup.querySelector('.popup__item_el_url')
const closeButtonAdd = cardFormPopup.querySelector('.popup__close');
const submitButtonAdd = cardFormPopup.querySelector('.popup__button');

const cardElementFormPopup = document.querySelector('.popup_el_card');
const cardHeading = cardElementFormPopup.querySelector('.popup__card-heading');
const elementCardPopup = cardElementFormPopup.querySelector('.popup__card-image');
const closeButtonCard = cardElementFormPopup.querySelector('.popup__close');

const placeContainer= document.querySelector('.places__list');

const placeTemplate = document.querySelector('#places').content;


const keyEscape = 'Escape';


//массив карточек
const initialCards = [
  {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1556891323-d4da7a4af388?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
  },
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Владивосток',
      link: 'https://images.unsplash.com/photo-1563943078-d83d3fb86468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

  }
];

// инициализация карточек
function render() {
  initialCards.forEach(item => {
    const placeElement = getCardElement(item.link, item.name);
    placeContainer.append(placeElement);
  });
}

// добавление карточек
function getCardElement(link, name) {
  const element = placeTemplate.cloneNode(true);
  const elementAddImg = element.querySelector('.place__image');
  elementAddImg.src = link;
  elementAddImg.alt = name;
  element.querySelector('.place__name').textContent = name;

  // установка обработчиков событий для карточек
  element.querySelector('.place__delete').addEventListener('click', delHandler);
  element.querySelector('.place__icon').addEventListener('click', likeHandler);
  element.querySelector('.place__image').addEventListener('click', cardPopupHandler);

  return element;
}

// удаление карточки
function delHandler(evt) {
  evt.target.parentNode.remove();
}

// установка-сброс лайка с карточки
function likeHandler(evt) {
  evt.target.classList.toggle('place__icon_is-active');
}

//открытие попап формы с карточкой
function cardPopupHandler(evt) {
  const elementCardClick = evt.target.parentNode.querySelector('.place__image');
  elementCardPopup.src = elementCardClick.src;
  elementCardPopup.alt = elementCardClick.alt;
  cardHeading.textContent = evt.target.parentNode.querySelector('.place__name').textContent;

  togglePopup(cardElementFormPopup);
}

//заполнение формы редактирования профиля при открытии
function profileFormPopupHandler() {

  togglePopup(profileFormPopup);
  resetInputError(profileFormElement);
  submitButtonEdit.classList.add('popup__button_disabled');

  nameInputEdit.value = userName.textContent;
  jobInputEdit.value = aboutSelf.textContent;
}

//заполнение формы добавления карточек при открытии
function cardFormPopupHandler() {

  togglePopup(cardFormPopup);
  cardFormElement.reset();
  resetInputError(cardFormElement);
  submitButtonAdd.classList.add('popup__button_disabled')
}

//обнуление ошибок
function resetInputError(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(inputData.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

//открытие-закрытие форм
function togglePopup(element) {
  element.classList.toggle('popup_opened');
  if (element.classList.contains('popup_opened')) {
    document.addEventListener('keydown', keyHandler);
  }
}

//закрытие форм кнопкой Esc
function keyHandler(evt) {
  if (evt.key === keyEscape) {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
  }
}

//закрытие форм при клике на оверлей
const popupClickOnOverlay = (evt) => {
  if (evt.target == evt.currentTarget) {

    togglePopup(evt.target);
  }
}


//обработчик события submit формы редактирований
const profileFormSubmitHandler = (evt) => {

  evt.preventDefault();

  userName.textContent = nameInputEdit.value;
  aboutSelf.textContent = jobInputEdit.value;

  togglePopup(profileFormPopup);
}

//обработчик события submit формы добавления карточки
const cardFormSubmitHandler = (evt) => {

  evt.preventDefault();

  const placeElement = getCardElement(popupImageUrl.value, popupImageName.value);
  placeContainer.prepend(placeElement);

  togglePopup(cardFormPopup);
}

editButton.addEventListener('click', profileFormPopupHandler);
addButton.addEventListener('click', cardFormPopupHandler);
closeButtonEdit.addEventListener('click', () => togglePopup(profileFormPopup));
closeButtonAdd.addEventListener('click', () => togglePopup(cardFormPopup));
closeButtonCard.addEventListener('click', () => togglePopup(cardElementFormPopup));
profileFormPopup.addEventListener('submit', profileFormSubmitHandler);
cardFormPopup.addEventListener('submit', cardFormSubmitHandler);
popup.forEach(el => el.addEventListener('click', popupClickOnOverlay));

render();
document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  popup.forEach(el => el.classList.add('popup__load'));
}, false);
