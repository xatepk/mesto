let profile = document.querySelector('.profile');
let userName = profile.querySelector('.profile__name');
let aboutSelf = profile.querySelector('.profile__about-self');
let editButton = profile.querySelector('.profile__edit-button');

let formElements = document.querySelector('.popup');
let nameInput = formElements.querySelector('.popup__item_el_name');
let jobInput = formElements.querySelector('.popup__item_el_about-self');

let closeButton = formElements.querySelector('.popup__close');
let submitButton = formElements.querySelector('.popup__button');

function formStatus() {
  formElements.classList.toggle('popup_opened');
  if (formElements.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = aboutSelf.textContent;
  }
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    userName.textContent = nameInput.value;
    aboutSelf.textContent = jobInput.value;
    formStatus()
}


editButton.addEventListener('click', formStatus);
closeButton.addEventListener('click', formStatus);
formElements.addEventListener('submit', formSubmitHandler);

