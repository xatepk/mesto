import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  editButton, addButton,
  popups, profileFormElement, cardFormElement, placeContainer,
  inputData, initialCards, nameInputEdit, jobInputEdit
} from '../utils/constants.js';

const zoomPopup = new PopupWithImage({ popupSelector: '.popup_el_card' });
zoomPopup.setEventListeners();

const createCard = (item) => {
  const cardElement = new Card({
    item,
    handleCardClick: () => {
      zoomPopup.open(item);
    }
  }, '#places').generateCard();
  return cardElement
}

const cardsList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
    }
  }, placeContainer
);

const editPopup = new PopupWithForm({
  popupSelector: '.popup_el_edit',
  handleFormSubmit: (item) => {
    user.setUserInfo(item);
    editPopup.close();
  }
});
editPopup.setEventListeners();


editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  nameInputEdit.value = userInfo.name;
  jobInputEdit.value = userInfo['about-self'];
  editPopup.open();

  //обнуление ошибок
  profileForm.resetInputError();
});

const addPopup = new PopupWithForm({
  popupSelector: '.popup_el_add',
  handleFormSubmit: (item) => {
    const {
      place: name,
      'place-url': link
    } = item;

    const cardElement = createCard({name, link})
    cardsList.addItem(cardElement);

    addPopup.close();

  }
});
addPopup.setEventListeners();

addButton.addEventListener('click', () => {
  addPopup.open();

  //обнуление ошибок
  cardForm.resetInputError();
});

document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  popups.forEach(el => el.classList.add('popup__load'));
}, false);


const cardForm = new FormValidator(inputData, cardFormElement);
const profileForm = new FormValidator(inputData, profileFormElement);
profileForm.enableValidation();
cardForm.enableValidation();

const user = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__about-self'});

// отрисовка карточек
cardsList.renderItems();

