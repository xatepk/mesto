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
    const placeElement = addHandler(item.link, item.name);
    placeContainer.append(placeElement);
  });
}

// добавление карточек
function addHandler(link, name) {
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

  formStatus(formElementCard);

}

//открытие-закрытие форм
function formStatus(element) {
  element.classList.toggle('popup_opened');
  if (element.classList.contains('popup_opened')) {

    document.addEventListener('keydown', keyHandler);
    element.addEventListener('click', popupClickOnOverlay);

    //закрытие форм кнопкой Esc
    function keyHandler(evt) {
      if (evt.key === 'Escape') {
        formStatus(element);
      }
      document.removeEventListener('keydown', keyHandler);
    }
  }

  if (formElementEdit.classList.contains('popup_opened')) {

    nameInputEdit.value = userName.textContent;
    jobInputEdit.value = aboutSelf.textContent;

  }
}

//закрытие форм при клике на оверлей
const popupClickOnOverlay = (evt) => {
  if (evt.target = evt.currentTarget) {
    formStatus(evt.target);
  }
}


//обработчик события submit формы
const formSubmitHandler = (evt, element) => {

  evt.preventDefault();

    if (element.classList.contains('popup_el_edit')) {
      userName.textContent = nameInputEdit.value;
      aboutSelf.textContent = jobInputEdit.value;
    } else if (element.classList.contains('popup_el_add')) {
      const placeElement = addHandler(popupImageUrl.value, popupImageName.value);
      const formElement = element.querySelector('.popup__form');
      placeContainer.prepend(placeElement);
      formElement.reset();
    };

    formStatus(element);
}

editButton.addEventListener('click', () => formStatus(formElementEdit));
addButton.addEventListener('click', () => formStatus(formElementAdd));
closeButtonEdit.addEventListener('click', () => formStatus(formElementEdit));
closeButtonAdd.addEventListener('click', () => formStatus(formElementAdd));
closeButtonCard.addEventListener('click', () => formStatus(formElementCard));
formElementEdit.addEventListener('submit', evt => formSubmitHandler(evt, formElementEdit));
formElementAdd.addEventListener('submit', evt => formSubmitHandler(evt, formElementAdd));

render();
document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  popup.forEach(el => {
    el.classList.add('popup__load');
  });
}, false);
