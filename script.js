let profile = document.querySelector('.profile');
let UserName = profile.querySelector('.profile__name');
let AboutSelf = profile.querySelector('.profile__about-self');
let editButton = profile.querySelector('.profile__edit-button');

let formElements = document.querySelector('.popup');
let nameInput = formElements.querySelector('.popup__item_el_name');
let jobInput = formElements.querySelector('.popup__item_el_about-self');

let closeButton = formElements.querySelector('.popup__close');
let submitButton = formElements.querySelector('.popup__button');

editButton.addEventListener('click', formOpen);
closeButton.addEventListener('click', formClose);
formElements.addEventListener('submit', formSubmitHandler);

function formOpen() {
  formElements.classList.add('popup_opened');
  nameInput.value = UserName.textContent;
  jobInput.value = AboutSelf.textContent;
}

function formClose() {
  formElements.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    UserName.textContent = nameInput.value;
    AboutSelf.textContent = jobInput.value;
    formElements.classList.remove('popup_opened');
}

