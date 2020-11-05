//объявление глобальных переменных
const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileAbout = profile.querySelector('.profile__about-self');
export const profileAvatar = profile.querySelector('.profile__edit-avatar');
export const editButton = profile.querySelector('.profile__edit-button');
export const addButton = profile.querySelector('.profile__add-button');

export const popups = document.querySelectorAll('.popup');
const profileFormPopup = document.querySelector('.popup_el_edit');
export const profileFormElement = profileFormPopup.querySelector('.popup__form');
export const nameInputEdit = profileFormPopup.querySelector('.popup__item_el_name');
export const jobInputEdit = profileFormPopup.querySelector('.popup__item_el_about-self');

export const cardFormPopup = document.querySelector('.popup_el_add');
export const cardFormElement = cardFormPopup.querySelector('.popup__form');

const avatarFormPopup = document.querySelector('.popup_el_avatar');
export const avatarFormElement = avatarFormPopup.querySelector('.popup__form');

export const placeContainer = '.places__list';

export const keyEscape = 'Escape';

export const inputData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//массив карточек
export const initialCards = [
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

