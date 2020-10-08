import Card from './Card.js';
import FormValidator from './FormValidator.js';

//объявление глобальных переменных
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const aboutSelf = profile.querySelector('.profile__about-self');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
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

const inputData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formList = Array.from(document.querySelectorAll(inputData.formSelector));

// инициализация карточек
function render(item) {
    const card = new Card(item, '#places');
    const cardElement = card.generateCard();

    return cardElement;
}

//заполнение формы редактирования профиля при открытии
function initProfileFormPopupHandler() {

  togglePopup(profileFormPopup);
  resetInputError(profileFormElement);
  submitButtonEdit.classList.add('popup__button_disabled');

  nameInputEdit.value = userName.textContent;
  jobInputEdit.value = aboutSelf.textContent;
}

//заполнение формы добавления карточек при открытии
function initCardFormPopupHandler() {

  togglePopup(cardFormPopup);
  cardFormElement.reset();
  resetInputError(cardFormElement);
  submitButtonAdd.classList.add('popup__button_disabled')
}

//обнуление ошибок
function resetInputError(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(inputData.inputSelector));

  inputList.forEach((inputElement) => {
    const form = new FormValidator(inputData, formElement);
    const formValidator = form.resetInputError(inputElement);
  });
}

//открытие-закрытие форм
export function togglePopup(element) {
  element.classList.toggle('popup_opened');
  if (element.classList.contains('popup_opened')) {
    document.addEventListener('keydown', handleEscPress);
  } else {
    document.removeEventListener('keydown', handleEscPress);
  }
}

//закрытие форм кнопкой Esc
function handleEscPress(evt) {
  if (evt.key === keyEscape) {
    togglePopup(document.querySelector('.popup_opened'));
  }
}

//закрытие форм при клике на оверлей
const clickOnPopupOverlay = (evt) => {
  if (evt.target == evt.currentTarget) {

    togglePopup(evt.target);
  }
}


//обработчик события submit формы редактирований
const editProfileFormSubmitHandler = (evt) => {

  evt.preventDefault();

  userName.textContent = nameInputEdit.value;
  aboutSelf.textContent = jobInputEdit.value;

  togglePopup(profileFormPopup);
}

//обработчик события submit формы добавления карточки
const addCardFormSubmitHandler = (evt) => {

  evt.preventDefault();

  const item = {
    name: popupImageName.value,
    link: popupImageUrl.value
  }

  const placeElement = render(item);
  placeContainer.prepend(placeElement);

  togglePopup(cardFormPopup);
}
console.log(cardFormPopup)
editButton.addEventListener('click', initProfileFormPopupHandler);
addButton.addEventListener('click', initCardFormPopupHandler);
closeButtonEdit.addEventListener('click', () => togglePopup(profileFormPopup));
closeButtonAdd.addEventListener('click', () => togglePopup(cardFormPopup));
closeButtonCard.addEventListener('click', () => togglePopup(cardElementFormPopup));
profileFormPopup.addEventListener('submit', editProfileFormSubmitHandler);
cardFormPopup.addEventListener('submit', addCardFormSubmitHandler);
popups.forEach(el => el.addEventListener('click', clickOnPopupOverlay));

document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  popups.forEach(el => el.classList.add('popup__load'));
}, false);

formList.forEach((formElement) => {
  const form = new FormValidator(inputData, formElement);
  const formValidator = form.enableValidation();
});

initialCards.forEach(item => {
  const placeElement = render(item);
  placeContainer.append(placeElement);
});

