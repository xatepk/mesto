import Card from './Card.js';

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

export const cardElementFormPopup = document.querySelector('.popup_el_card');
const closeButtonCard = cardElementFormPopup.querySelector('.popup__close');

const placeContainer= document.querySelector('.places__list');

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
    const place = new Card(item.link, item.name, '#places');
    const placeElement = place.generateCard();

    placeContainer.append(placeElement);
  });
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
export function togglePopup(element) {
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

  const place = new Card(popupImageUrl.value, popupImageName.value, '#places');
  const placeElement = place.generateCard();

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
