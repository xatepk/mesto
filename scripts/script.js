//объявление глобальных переменных
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const aboutSelf = profile.querySelector('.profile__about-self');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const formElementEdit = document.querySelector('.popup_el_edit');
const nameInputEdit = formElementEdit.querySelector('.popup__item_el_name');
const jobInputEdit = formElementEdit.querySelector('.popup__item_el_about-self');
const closeButtonEdit = formElementEdit.querySelector('.popup__close');
const submitButtonEdit = formElementEdit.querySelector('.popup__button');

const formElementAdd = document.querySelector('.popup_el_add');
const closeButtonAdd = formElementAdd.querySelector('.popup__close');
const submitButtonAdd = formElementAdd.querySelector('.popup__button');

const formElementCard= document.querySelector('.popup_el_card');
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

//инициализация карточек с местами
function render() {
  //placeContainer.innerHTML = "";
  initialCards.forEach(item => {
    const placeElement = placeTemplate.cloneNode(true);
    const placeElementImage = placeElement.querySelector('.place__image');
    placeElementImage.src = item.link;
    placeElementImage.alt = item.name;;
    placeElement.querySelector('.place__name').textContent = item.name;
    placeContainer.append(placeElement);
  });

  //установка обработчиков событий для карточек
  setListeners();
}

//добавление карточек
function handlerAdd(evt) {
  const placeElementAdd = placeTemplate.cloneNode(true);
  const placeElementAddImage = placeElementAdd.querySelector('.place__image');
  placeElementAddImage.src = evt.target.querySelector('.popup__item_el_url').value;
  placeElementAddImage.alt = evt.target.querySelector('.popup__item_el_name').value;
  placeElementAdd.querySelector('.place__name').textContent = evt.target.querySelector('.popup__item_el_name').value;
  placeContainer.prepend(placeElementAdd);

  placeContainer.querySelector('.place__delete').addEventListener('click', handlerDelete);
  placeContainer.querySelector('.place__icon').addEventListener('click', handlerLike);
  placeContainer.querySelector('.place__image').addEventListener('click', handlerCardPopup);

}

//удаление карточки
function handlerDelete(evt) {
  evt.target.parentNode.remove();
}

//установка-сброс лайка с карточки
function handlerLike(evt) {
  evt.target.classList.toggle('place__icon_is-active');
}

//открытие попап формы с карточкой
function handlerCardPopup(evt) {
  formElementCard.querySelector('.popup__card-image').src = evt.target.parentNode.querySelector('.place__image').src;
  formElementCard.querySelector('.popup__card-image').alt = evt.target.parentNode.querySelector('.place__image').alt;
  formElementCard.querySelector('.popup__card-heading').textContent = evt.target.parentNode.querySelector('.place__name').textContent;

  formStatus(evt, formElementCard);

}

//открытие-закрытие форм
function formStatus(evt, element) {
  element.classList.toggle('popup_opened');
  if (formElementEdit.classList.contains('popup_opened')) {
    nameInputEdit.value = userName.textContent;
    jobInputEdit.value = aboutSelf.textContent;
  } else if (formElementAdd.classList.contains('popup_opened')) {
    element.querySelector('.popup__item_el_name').value = "";
    element.querySelector('.popup__item_el_url').value = "";
  }
}

//обработчик события submit формы
const formSubmitHandler = (evt, element) => {
    evt.preventDefault();

    if (element.classList.contains('popup_el_edit')) {
      userName.textContent = nameInputEdit.value;
      aboutSelf.textContent = jobInputEdit.value;
    } else if (element.classList.contains('popup_el_add')) {

      handlerAdd(evt);

    };

    formStatus(evt, element);
}

//установка обработчиков событий для карточек
function setListeners() {
  document.querySelectorAll('.place__delete').forEach(btn => {
    btn.addEventListener('click', handlerDelete);
  });
  document.querySelectorAll('.place__icon').forEach(btn => {
    btn.addEventListener('click', handlerLike);
  });
  document.querySelectorAll('.place__image').forEach(btn => {
    btn.addEventListener('click', handlerCardPopup);
  });

}

editButton.addEventListener('click', evt => formStatus(evt, formElementEdit));
addButton.addEventListener('click', evt => formStatus(evt, formElementAdd));
closeButtonEdit.addEventListener('click', evt => formStatus(evt, formElementEdit));
closeButtonAdd.addEventListener('click', evt => formStatus(evt, formElementAdd));
closeButtonCard.addEventListener('click', evt => formStatus(evt, formElementCard));
formElementEdit.addEventListener('submit', evt => formSubmitHandler(evt, formElementEdit));
formElementAdd.addEventListener('submit', evt => formSubmitHandler(evt, formElementAdd));

render();
document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  document.querySelectorAll('.popup').forEach(el => {
    el.classList.add('popup__load');
  });
}, false);
