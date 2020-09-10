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


const placeContainer= document.querySelector('.places__list');
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
function render() {
    placeContainer.innerHTML = "";
    initialCards.forEach(item => {
    const placeTemplate = document.querySelector('#places').content;
    const placeElement = placeTemplate.cloneNode(true);

    placeElement.querySelector('.place__image').src = item.link;
    placeElement.querySelector('.place__name').textContent = item.name;
    placeContainer.append(placeElement);
  });

  setListeners();
}

function handlerDelete(evt) {
  evt.target.parentNode.remove();
}

function handlerLike(evt) {
  evt.target.classList.toggle('place__icon_is-active');
}

function formStatus(evt, element) {
  element.classList.toggle('popup_opened');
  if (formElementEdit.classList.contains('popup_opened')) {
    nameInputEdit.value = userName.textContent;
    jobInputEdit.value = aboutSelf.textContent;
  }
}


const formSubmitHandler = (evt, element) => {
    evt.preventDefault();

    if (element.classList.contains('popup_el_edit')) {
      userName.textContent = nameInputEdit.value;
      aboutSelf.textContent = jobInputEdit.value;
    } else if (element.classList.contains('popup_el_add') && evt.target.querySelector('.popup__item_el_name').value && evt.target.querySelector('.popup__item_el_url').value) {
      initialCards.unshift({name: evt.target.querySelector('.popup__item_el_name').value, link: evt.target.querySelector('.popup__item_el_url').value});
      render();
    };
    formStatus(evt, element);
}


function setListeners() {
  document.querySelectorAll('.place__delete').forEach(btn => {
    btn.addEventListener('click', handlerDelete);
  });
  document.querySelectorAll('.place__icon').forEach(btn => {
    btn.addEventListener('click', handlerLike);
  });
}

editButton.addEventListener('click', evt => formStatus(evt, formElementEdit));
  addButton.addEventListener('click', evt => formStatus(evt, formElementAdd));
  closeButtonEdit.addEventListener('click', evt => formStatus(evt, formElementEdit));
  closeButtonAdd.addEventListener('click', evt => formStatus(evt, formElementAdd));
  formElementEdit.addEventListener('submit', evt => formSubmitHandler(evt, formElementEdit));
  formElementAdd.addEventListener('submit', evt => formSubmitHandler(evt, formElementAdd));

render();
