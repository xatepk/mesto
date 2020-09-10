const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const aboutSelf = profile.querySelector('.profile__about-self');
const editButton = profile.querySelector('.profile__edit-button');

const formElements = document.querySelector('.popup');
const nameInput = formElements.querySelector('.popup__item_el_name');
const jobInput = formElements.querySelector('.popup__item_el_about-self');

const closeButton = formElements.querySelector('.popup__close');
const submitButton = formElements.querySelector('.popup__button');

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

initialCards.forEach(item => {
  const placeTemplate = document.querySelector('#places').content;
  const placeElement = placeTemplate.cloneNode(true);

  placeElement.querySelector('.place__image').src = item.link;
  placeElement.querySelector('.place__name').textContent = item.name;
  placeContainer.append(placeElement);

});

const formStatus = () => {
  formElements.classList.toggle('popup_opened');
  if (formElements.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = aboutSelf.textContent;
  }
}


const formSubmitHandler = (evt) => {
    evt.preventDefault();

    userName.textContent = nameInput.value;
    aboutSelf.textContent = jobInput.value;
    formStatus()
}


editButton.addEventListener('click', formStatus);
closeButton.addEventListener('click', formStatus);
formElements.addEventListener('submit', formSubmitHandler);

