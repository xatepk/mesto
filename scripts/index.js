//объявление глобальных переменных
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const aboutSelf = profile.querySelector('.profile__about-self');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const popup = document.querySelectorAll('.popup');
const formElementEdit = document.querySelector('.popup_el_edit');
const nameInputEdit = formElementEdit.querySelector('.popup__item_el_name');
const jobInputEdit = formElementEdit.querySelector('.popup__item_el_about-self');
const closeButtonEdit = formElementEdit.querySelector('.popup__close');
const submitButtonEdit = formElementEdit.querySelector('.popup__button');

const formElementAdd = document.querySelector('.popup_el_add');
const popupImageName = formElementAdd.querySelector('.popup__item_el_name');
const popupImageUrl = formElementAdd.querySelector('.popup__item_el_url')
const closeButtonAdd = formElementAdd.querySelector('.popup__close');
const submitButtonAdd = formElementAdd.querySelector('.popup__button');

const formElementCard = document.querySelector('.popup_el_card');
const cardHeading = formElementCard.querySelector('.popup__card-heading');
const elementCardPopup = formElementCard.querySelector('.popup__card-image');
const closeButtonCard = formElementCard.querySelector('.popup__close');

const placeContainer= document.querySelector('.places__list');

const placeTemplate = document.querySelector('#places').content;


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

  togglePopup(evt, formElementCard);
}

//заполнение в форме профайла данных
function profileFormPopupHandler(evt) {
  if (formElementEdit.classList.contains('popup_opened') && (editButton === evt.currentTarget)) {

    nameInputEdit.value = userName.textContent;
    jobInputEdit.value = aboutSelf.textContent;
  }
}


//открытие-закрытие форм
function togglePopup(evt, element) {
  element.classList.toggle('popup_opened');
  if (element.classList.contains('popup_opened')) {
    element.querySelector('.popup__button').classList.add('popup__button_disabled');
    document.addEventListener('keydown', keyHandler);
  }

  profileFormPopupHandler(evt);
}

//закрытие форм кнопкой Esc
function keyHandler(evt) {
  const key = 'Escape';
  if (evt.key === key) {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
  document.removeEventListener('keydown', keyHandler);
}

//закрытие форм при клике на оверлей
const popupClickOnOverlay = (evt) => {
  if (evt.target == evt.currentTarget) {

    togglePopup(evt, evt.target);
  }
}


//обработчик события submit формы редактирований
const profileFormSubmitHandler = (evt, element) => {

  evt.preventDefault();

  userName.textContent = nameInputEdit.value;
  aboutSelf.textContent = jobInputEdit.value;

  togglePopup(evt, element);
}

//обработчик события submit формы добавления карточки
const cardFormSubmitHandler = (evt, element) => {

  evt.preventDefault();

  const placeElement = getCardElement(popupImageUrl.value, popupImageName.value);
  const formElement = element.querySelector('.popup__form');
  placeContainer.prepend(placeElement);
  formElement.reset();

  togglePopup(evt, element);
}

editButton.addEventListener('click', evt => togglePopup(evt, formElementEdit));
addButton.addEventListener('click', evt => togglePopup(evt, formElementAdd));
closeButtonEdit.addEventListener('click', evt => togglePopup(evt, formElementEdit));
closeButtonAdd.addEventListener('click', evt => togglePopup(evt, formElementAdd));
closeButtonCard.addEventListener('click', evt => togglePopup(evt, formElementCard));
formElementEdit.addEventListener('submit', evt => profileFormSubmitHandler(evt, formElementEdit));
formElementAdd.addEventListener('submit', evt => cardFormSubmitHandler(evt, formElementAdd));
popup.forEach(el => {
  el.addEventListener('click', popupClickOnOverlay);
});

render();
document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  popup.forEach(el => el.classList.add('popup__load'));
}, false);
